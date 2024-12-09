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

app.post('/api/meal-plan/create', async (req, res) => {
  const { filters } = req.body;

  try {
    const recipes = await fetchFilteredRecipes(filters);

    console.log(recipes);
    
    const mealPlan = createWeeklyMealPlan(recipes, filters);

    res.status(200).json({
      mealPlan,
    });
  } catch (error) {
    console.error('Error creating meal plan:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


async function fetchFilteredRecipes(filters) {
  try {
    let query = db.collection("recipes");

    if (filters && Object.keys(filters).length > 0) {
      tagFields.forEach(tag => {
        if (filters[tag] !== undefined) {
          query = query.where(tag, "==", filters[tag]);
        }
      });
    }

    const snapshot = await query.get();
    const recipes = [];

    snapshot.forEach(doc => {
      const data = doc.data();

      recipes.push({
        id: doc.id, 
        ...data 
      });
    });

    return recipes;
  } catch (error) {
    throw new Error('Error fetching recipes from Firestore');
  }
}

function createWeeklyMealPlan(recipes) {

  const breakfastRecipes = [];
  const lunchRecipes = []; 

  recipes.forEach(recipe => {
    if (recipe.breakfast) {
      breakfastRecipes.push(recipe.name);
    }
    if (recipe.lunch) {

      lunchRecipes.push(recipe.name);
    }
  });

  const mealPlan = [];

  for (let i = 0; i < 7; i++) {
    const dailyMealPlan = [
      randomChoice(breakfastRecipes),
      randomChoice(lunchRecipes), 
      randomChoice(lunchRecipes)  
    ];
    mealPlan.push(dailyMealPlan);
  }

  return mealPlan;
}

function randomChoice(array) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}


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
        console.log(capitalizedName)

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
  const { uid, email, displayName, preferences } = req.body;


  if (!uid || !email || !preferences || typeof preferences !== 'object') {
    return res.status(400).json({ error: 'UID, email, and valid preferences are required' });
  }

  try {
    const userRef = db.collection('users').doc(uid);
    const userDoc = await userRef.get();

    if (userDoc.exists) {

      await userRef.update({
        lastSignIn: admin.firestore.FieldValue.serverTimestamp(),
        preferences, 
      });
      console.log(`User ${uid} signed in, preferences updated.`);
    } else {

      await userRef.set({
        uid,
        email,
        displayName,
        preferences, 
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        lastSignIn: admin.firestore.FieldValue.serverTimestamp(),
      });
      console.log(`User ${uid} created with initial preferences and signed in.`);
    }

    res.status(200).json({ message: 'User preferences logged successfully' });
  } catch (error) {
    console.error('Error logging user preferences:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.post('/api/users/filters', async (req, res) => {
  const { uid } = req.body;


  if (!uid) {
    return res.status(400).json({ error: 'UID is required' });
  }

  try {
    const userRef = db.collection('users').doc(uid);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userData = userDoc.data();
    const filters = userData.filters || {}; 
    res.status(200).json({ uid, filters });
  } catch (error) {
    console.error('Error retrieving user filters:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

