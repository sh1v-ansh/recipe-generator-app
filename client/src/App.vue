/**
 * Components to create:
 * - Navbar
 * - Recipe Card
 * - Description Card
 * - Filtered Recipe Menu
 * - Footer
 */

/**
 * Pages:
 * - Recipes Page
 * - Specific Recipe Page
 * - Profile Page
 */

<template>
  <div style="width: 100vw; padding: 0;">
    <NavBar v-if="!$route.meta?.hideNavbar" />
    <router-view />
    <div style="width: 100vw; padding: 0;">
      {{ recipes }}
      <button @click="getRecipes">Get Recipes</button>
    </div>
  </div>
</template>

<script>
import Recipe from "./components/Recipe.vue";
import RecipeFilter from "./components/Filter.vue";
import NavBar from "./components/NavBar.vue";
import axios from "axios";

export default {
  components: {
    NavBar,
    Recipe,
    RecipeFilter,
  },
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
      try {
        const response = await axios.post(url, {
          conditions: [
            {
              field: "nutrition",
              op: "<=",
              value: 500,
              field_type: "calories",
            },
          ],
        });
        this.recipes = response.data.recipes;
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    },
  },
};
</script>

<style>
</style>
