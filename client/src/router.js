import { createRouter, createWebHistory } from 'vue-router';
import Recipes from './Recipes.vue';
import RecipeGenerator from './RecipeGenerator.vue';
import Chefs from './Chefs.vue';

const routes = [
    { path: '/', redirect: '/recipes' }, //Default page
    { path: '/recipes', component: Recipes },
    { path: '/recipe-generator', component: RecipeGenerator },
    { path: '/chefs', component: Chefs },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
