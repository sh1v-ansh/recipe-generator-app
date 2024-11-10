<template>
    <div style="width: 100vw; padding: 0;">
      <h1 style="font-weight: 800;">RECIPES</h1>
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
          { id: 1, name: 'Pasta', description: 'Tomato pasta.', ingredients: ['pasta', 'tomato', 'cheese'], tags: ["Gluten Free", "Vegetarian"] },
          { id: 2, name: 'Salad', description: 'Healthy salad.', ingredients: ['lettuce', 'tomato', 'cucumber'], tags: ["Vegan"] },
          { id: 3, name: 'Chicken Pot Pie', description: 'Delicious and meaty', ingredients: ['chicken', 'sauce', 'vegetables'], tags: ["Protein", "High Calorie"] },
          { id: 4, name: 'Pad Thai', description: 'Thai noodles', ingredients: ['peanuts', 'sauce', 'noodles'], tags: ["Protein", "Asian"] }
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
  