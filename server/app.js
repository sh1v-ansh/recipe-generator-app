const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors')
const serviceAccount = require('./service_key.json')
const fs = require('fs'); 

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const app = express();
app.use(express.json());
app.use(cors())



const buildQuery = (tags) => {
  let query = db.collection('recipes'); 
  
  Object.keys(tags).forEach((tag) => {
    if (tags[tag] === true) {

      query = query.where(tag, '==', true);
    } else if (tags[tag] === false) {

      query = query.where(tag, '==', false);
    }
  });

  return query;
};


app.post('/generate-meal-plan', async (req, res) => {

  const { uid } = response.body;

  const response = await fetch(`http://localhost:3000/api/users/filters?uid=${uid}`);

  const { tags } = await response.json();

  try {

    const query = buildQuery(tags);

    const snapshot = await query.get();
    if (snapshot.empty) {
      return res.status(404).json({ message: 'No recipes found with these filters.' });
    }

    const meals = {
      breakfast: [],
      lunch_dinner: [],
    };

    snapshot.forEach((doc) => {
      const recipe = doc.data();


      if (recipe.breakfast) {
        meals.breakfast.push(recipe);
      } else if (recipe.lunch) {
        meals.lunch_dinner.push(recipe);
      }
    });


    if (meals.breakfast.length < 7 || meals.lunch_dinner.length < 14) {
      return res.status(400).json({
        message: 'Insufficient recipes for a full weekly meal plan.',
      });
    }


    const selectedBreakfasts = getRandomItems(meals.breakfast, 7);
    const selectedLunchDinners = getRandomItems(meals.lunch_dinner, 14);


    const weeklyMealPlan = [];
    for (let i = 0; i < 7; i++) {
      weeklyMealPlan.push([
        selectedBreakfasts[i],        
        selectedLunchDinners[i * 2],  
        selectedLunchDinners[i * 2 + 1] 
      ]);
    }

    return res.json(weeklyMealPlan);
  } catch (error) {
    console.error('Error generating meal plan:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


const getRandomItems = (array, count) => {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};



/* Endpoint to fetch 9 data points with pagination from the database

   In the request body, one can add the optional  "tag" to the request body 
   in which filtering by said tag will occur


*/
app.post('/api/recipes/fetch-any', async (req, res) => {
  const { pageSize = 18, lastVisibleId, tag } = req.body;
  const tagFields = [
    "vegetarian", "vegan", "gluten-free", "diabetic", "kosher",
    "low-carb", "low-protein", "low-fat", "low-calorie", "high-protein", "high-calcium",
    "egg-free", "lactose", "nuts", "shellfish"
  ];

  try {
    let query = db.collection("recipes").limit(pageSize);

    if (tag != '' && tagFields.includes(tag)) {
      query = query.where(tag, "==", true);
    }

    if (lastVisibleId) {
      const lastVisibleDoc = await db.collection("recipes").doc(lastVisibleId).get();
      if (lastVisibleDoc.exists) {
        query = query.startAfter(lastVisibleDoc);
      } else {
        return res.status(400).json({ error: 'Invalid lastVisibleId' });
      }
    }

    const snapshot = await query.get();
    const recipes = [];
    snapshot.forEach(doc => {
      const data = doc.data();
      const tags = tagFields.filter(field => data[field] === true);
      

      const capitalizedName = data.name
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
    

      recipes.push({ id: doc.id, name: capitalizedName, description: data.description, tags });
    });

    const lastVisible = snapshot.docs[snapshot.docs.length - 1];
    res.status(200).json({
      recipes,
      lastVisibleId: lastVisible ? lastVisible.id : null,
    });
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



app.post('/api/users/signin', async (req, res) => {
  const { uid, filters } = req.body;
  if (!uid) {
    return res.status(400).json({ error: 'UID required' });
  }

  try {
    const userRef = db.collection('users').doc(uid);
    const userDoc = await userRef.get();


    if (userDoc.exists) {
      const updateData = {
        lastSignIn: admin.firestore.FieldValue.serverTimestamp(),
      };


      if (filters && typeof filters === 'object') {
        updateData.filters = filters;
      }

      await userRef.update(updateData);
      console.log(`User ${uid} signed in, last sign-in and filters updated.`);
    } else {

      const userData = {
        uid,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        lastSignIn: admin.firestore.FieldValue.serverTimestamp(),
      };

      if (filters && typeof filters === 'object') {
        userData.filters = filters;
      }

      await userRef.set(userData);
      console.log(`User ${uid} created and signed in.`);
    }

    res.status(200).json({ message: 'User sign-in logged successfully' });
  } catch (error) {
    console.error('Error logging user sign-in:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.get('/api/users/filters', async (req, res) => {
  const { uid } = req.query;


  if (!uid) {
    return res.status(400).json({ error: 'UID is required' });
  }

  try {
    const userRef = db.collection('users').doc(uid);
    const userDoc = await userRef.get();


    if (userDoc.exists) {
      const userData = userDoc.data();

   
      const filters = userData.filters || {};

      console.log(`Filters for user ${uid} retrieved successfully.`);
      return res.status(200).json({ filters });
    } else {

      return res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error retrieving user filters:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});




app.post('/api/users/get-recipes', async (req, res) => {
  const { uid } = req.body; 

  try {

    const userRef = db.collection('users').doc(uid);
    const userDoc = await userRef.get();

    if (userDoc.exists) {

      const userData = userDoc.data();
      const recipeIds = userData.recipes || []; 

      if (recipeIds.length === 0) {
        return res.status(200).json({ message: 'No recipes found for this user', recipes: [] });
      }

      console.log(recipeIds);
      
      const recipesCollection = db.collection('recipes');
      const recipesPromises = recipeIds.map(id => recipesCollection.doc(String(id)).get());
      const recipeDocs = await Promise.all(recipesPromises);

      const recipes = recipeDocs
        .filter(doc => doc.exists)
        .map(doc => ({ id: doc.id, ...doc.data() }));

      res.status(200).json({ message: 'Recipes retrieved successfully', recipes });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user recipes:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});