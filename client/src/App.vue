/**

Components to create:

- Navbar
- Recipe Card
- Description Card
- Filtered Recipe Menu
- Footer

*/

/**

Pages:

- Home Page (Explore)
- Recipes Page
- Specific Recipe Page
- Profile Page

*/

<template>
  <div>
    <h2>Recipe List</h2>
    <RecipeFilter @update-filter="filterRecipes" />
    <div v-for="recipe in filteredRecipes" :key="recipe.id">
      <Recipe :recipe="recipe" />
    </div>
  </div>
</template>

<script>
  import Recipe from './components/Recipe.vue';
  import RecipeFilter from './components/Filter.vue';

  export default {
    components: { Recipe, RecipeFilter },

    data() {
      return {
        recipes: [
          { id: 1, name: 'Pasta', description: 'Classic pasta.', ingredients: ['pasta', 'tomato', 'cheese'], tags: ["Gluten Free", "Vegetarian"] },
          { id: 2, name: 'Salad', description: 'Healthy salad.', ingredients: ['lettuce', 'tomato', 'cucumber'], tags: ["Vegan"] },
          { id: 2, name: 'Chicken Pot Pie', description: 'Delicious and meaty', ingredients: ['chicken', 'sauce', 'vegetables'], tags: ["Protein", "High Calorie"] }
        ],
        filter: ''
      };
    },
    computed: {
      filteredRecipes() {
        return this.recipes.filter(recipe =>
          recipe.tags.some(tag => tag.toLowerCase().includes(this.filter.toLowerCase()))
        );
      }
    },
    methods: {
      filterRecipes(keyword) {
        this.filter = keyword;
      }
    }
  };
</script>
