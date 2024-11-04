const express = require('express');
const admin = require('firebase-admin');
const serviceAccount = require('./service-key.json');

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const app = express();
app.use(express.json());

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

// Routes
app.post('/api/recipes/search', async (req, res) => {
  try {
    const { conditions } = req.body;
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