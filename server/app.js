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
  const { uid, email, displayName } = req.body;

  if (!uid || !email) {
    return res.status(400).json({ error: 'UID and email are required' });
  }

  try {
    const userRef = db.collection('users').doc(uid);
    const userDoc = await userRef.get();

    if (userDoc.exists) {

      await userRef.update({
        lastSignIn: admin.firestore.FieldValue.serverTimestamp(),
      });
      console.log(`User ${uid} signed in, last sign-in updated.`);
    } else {

      await userRef.set({
        uid,
        email,
        displayName,
        filters: {},
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        lastSignIn: admin.firestore.FieldValue.serverTimestamp(),
      });
      console.log(`User ${uid} created and signed in.`);
    }

    res.status(200).json({ message: 'User sign-in logged successfully' });
  } catch (error) {
    console.error('Error logging user sign-in:', error);
    res.status(500).json({ error: 'Internal server error' });
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


class RecipeQueryPaginator {
  constructor(pageSize = 10) {
    this.pageSize = pageSize;
    this.lastDoc = null;
  }

  async compositeQuery(conditions) {
    let query = db.collection('recipes');

    // Separate in-memory and Firestore filters
    const inMemoryFilters = [];
    const firestoreFilters = [];

    conditions.forEach(condition => {
      const { field, op, value, field_type } = condition;

      if (field === 'nutrition' && field_type === 'calories') {
        inMemoryFilters.push(condition);
      } else {
        query = query.where(field, op, value);
      }
    });

    // Adjust limit based on in-memory filtering needs
    const limit = inMemoryFilters.length > 0 ? this.pageSize * 2 : this.pageSize;
    query = query.limit(limit);

    // Apply pagination if needed
    if (this.lastDoc) {
      query = query.startAfter(this.lastDoc);
    }

    // Execute query
    const snapshot = await query.get();
    const docs = snapshot.docs;
    const matchingRecipes = [];

    // Process results
    for (const doc of docs) {
      const recipe = doc.data();
      let matchesAll = true;

      for (const filter of inMemoryFilters) {
        if (filter.field_type === 'calories') {
          if (!recipe.nutrition || recipe.nutrition.length === 0) {
            matchesAll = false;
            break;
          }

          const calories = recipe.nutrition[0];
          if (filter.op === '<=' && calories > filter.value) {
            matchesAll = false;
            break;
          }
        }
      }

      if (matchesAll) {
        matchingRecipes.push(recipe);
        if (matchingRecipes.length === this.pageSize) break;
      }
    }

    // Update pagination state
    if (docs.length > 0) {
      this.lastDoc = docs[docs.length - 1];
    }

    return {
      recipes: matchingRecipes.slice(0, this.pageSize),
      hasMore: docs.length === limit
    };
  }

  reset() {
    this.lastDoc = null;
  }
}

// Create a paginator instance
const paginator = new RecipeQueryPaginator(5);

// app.get('/test', (req, res) => {
//   res.json({
//     'this': 'is a test'
//   })
// })

// Routes
app.post('/api/recipes/search', async (req, res) => {
  try {
    const { conditions } = req.body;
    console.log(conditions)
    if (!conditions || !Array.isArray(conditions)) {
      return res.status(400).json({ error: 'Invalid conditions format' });
    }

    const { recipes, hasMore } = await paginator.compositeQuery(conditions);
    res.json({ recipes, hasMore });
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/recipes/reset-pagination', (req, res) => {
  paginator.reset();
  res.json({ message: 'Pagination reset successful' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});