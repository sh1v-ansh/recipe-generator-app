import { createRouter, createWebHistory } from 'vue-router';
import Recipes from './Recipes.vue';
import RecipeGenerator from './RecipeGenerator.vue';
import Chefs from './Chefs.vue';

import GeneratedRecipes from './GeneratedRecipes.vue';
import Preferences from './Preferences.vue';
import RecipePage from './components/RecipePage.vue';
import ChefProfile from './components/ChefProfile.vue';


const routes = [
    { path: '/', redirect: '/recipes' }, //Default page
    { path: '/recipes', component: Recipes },
    { path: '/recipe-generator', component: RecipeGenerator },
    { path: '/chefs', component: Chefs },
    { path: '/recipes/:id', component: RecipePage, props: true },
    { path: '/meal-plan', component: GeneratedRecipes },
    { path: '/preferences', component: Preferences },
    { path: '/chefs/:profileId', component: ChefProfile, props: true },


];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
