const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors')
const serviceAccount = require('./service_key.json')

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const app = express();
app.use(express.json());
app.use(cors())


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
        recipes: [],
        diet: [],
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


app.post('/api/users/query-preferences', async (req, res) => {
  const { pref, pageSize = 10, lastVisibleId } = req.body;

  if (!pref) {
    return res.status(400).json({ error: 'Preferences are required' });
  }

  try {
    // Step 1: Start Firestore query with limit and optional start point
    let query = db.collection("recipes").limit(pageSize);

    // Add the last document snapshot to start after, if provided (for pagination)
    if (lastVisibleId) {
      const lastVisibleDoc = await firebase.firestore().collection("recipes").doc(lastVisibleId).get();
      if (lastVisibleDoc.exists) {
        query = query.startAfter(lastVisibleDoc);
      }
    }

    const snapshot = await query.get();

    // Step 2: Filter documents based on the 'pref' fields
    const matchingDocuments = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      
      // Check if all required fields in 'pref' are present in the document
      const profile = data.profile || {};
      const hasAllFields = pref.every(field => profile.hasOwnProperty(field));

      if (hasAllFields) {
        matchingDocuments.push(pref);
      }
    });

    // Determine the last visible document for pagination
    const lastVisible = snapshot.docs[snapshot.docs.length - 1];

    res.status(200).json({ 
      matchingDocuments,
      lastVisibleId: lastVisible ? lastVisible.id : null // Send back the last document ID
    });

  } catch (error) {
    console.error('Error querying preferences:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.post('/api/users/preferences', async (req, res) => {
  const { uid, pref } = req.body;

  if (!uid || !pref) {
    return res.status(400).json({ error: 'UID and diet preference are required' });
  }

  try {
    const userRef = db.collection('users').doc(uid);
    const userDoc = await userRef.get();

    if (userDoc.exists) {
 
      await userRef.update({
        diet: admin.firestore.FieldValue.arrayUnion(pref),
        lastSignIn: admin.firestore.FieldValue.serverTimestamp(),
      });
      console.log(`User ${uid} diet updated with preference: ${pref}`);
      res.status(200).json({ message: 'Diet preference added successfully' });
    } else {

      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error updating diet preference:', error);
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