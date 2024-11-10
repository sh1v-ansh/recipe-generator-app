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
- Recipes Page
- Specific Recipe Page
- Profile Page

*/

<template>
  <div style="width: 100vw; padding: 0;">
    <NavBar v-if="!$route.meta?.hideNavbar" />
    <router-view />
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'; 

export default {
  components: {
    NavBar,
  },
};

</script>

<style>

</style>

