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
  <div class="app-container">
    <NavBar v-if="!$route.meta?.hideNavbar" />
    <div class="main-content">
      <router-view />
    </div>
    <FooterBar v-if="!$route.meta?.hideFooterbar" />
  </div>
</template>

<script>
import Recipe from "./components/Recipe.vue";
import RecipeFilter from "./components/Filter.vue";
import NavBar from "./components/NavBar.vue";
import FooterBar from "./components/FooterBar.vue";
import GeneratedRecipes from './GeneratedRecipes.vue';
//import axios from "axios";

export default {
  components: {
    NavBar,
    Recipe,
    RecipeFilter,
    FooterBar,
    GeneratedRecipes,
  },
};
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  height: 100%;
}
.app-container {
  flex-direction: column;
  align-items: center;     
  justify-content: flex-start;
  min-height: 95vh;
}

</style>
