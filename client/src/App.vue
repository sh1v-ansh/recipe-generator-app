/** Components to create: - Navbar - Recipe Card - Description Card - Filtered
Recipe Menu - Footer */ /** Pages: - Home Page (Explore) - Recipes Page -
Specific Recipe Page - Profile Page */

<template>
  <div style="width: 100vw; padding: 0">
    <!-- <NavBar></NavBar>
    <h1 style="font-weight: 800">RECIPES</h1>
    <RecipeFilter @update-filter="filterRecipes" />
    <div
      v-for="recipe in filteredRecipes"
      :key="recipe.id"
    >
      <Recipe :recipe="recipe" />
    </div> -->
    {{ recipes }}

    <button @click="getRecipes">
      get recipes
    </button>
  </div>
</template>

<script>
  import Recipe from "./components/Recipe.vue";
  import RecipeFilter from "./components/Filter.vue";
  import NavBar from "./components/NavBar.vue";
  import axios from "axios";

  export default {
    components: { Recipe, RecipeFilter, NavBar },

    data() {
      return {
        recipes: [],
        filter: "",
      };
    },
    computed: {
      filteredRecipes() {
        return this.recipes.filter((recipe) =>
          recipe.tags.some((tag) =>
            tag.toLowerCase().includes(this.filter.toLowerCase())
          )
        );
      },
    },
    methods: {
      filterRecipes(keyword) {
        this.filter = keyword;
      },
      async getRecipes() {
        const url = "http://localhost:3000/api/recipes/search/";
        const recipes = await axios.post(url, {
          conditions: [
            {
              field: "nutrition",
              op: "<=",
              value: 500,
              field_type: "calories",
            },
          ],
        });

        this.recipes = recipes.data.recipes;
      },
    },
  };
</script>
