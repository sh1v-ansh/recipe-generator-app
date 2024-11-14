<template>
  <div class="hero-section">
    <div class="tag">RECIPES</div>
    <h1 class="hero-title">EMBARK ON A JOURNEY</h1>
    <p class="hero-subtitle">
      With our diverse collection of recipes we have something to satisfy every palate.
    </p>
  </div>
  <div class="category-container">
    <button 
      class="all-button" 
      :class="{ active: isAllActive }"
      @click="resetFilters"
    > 
      All
    </button>
    <div v-for="(tabSetValues, tabSetTitle) in filterState" :key="tabSetTitle">
      <TabWrapper :title="tabSetTitle" :tabs="tabSetValues" />
    </div>
  </div>
  <div style="width: 100vw; padding: 0;">
    <RecipeFilter @update-filter="filterRecipes" />
    <div v-for="recipe in filteredRecipes" :key="recipe.id">
      <Recipe :recipe="recipe" />
    </div>
  </div>
</template>
<script setup lang="ts">
import Recipe from './components/Recipe.vue';
import RecipeFilter from './components/Filter.vue';
import { reactive, computed } from 'vue';
import TabWrapper from './components/TabWrapper.vue';

const filterState = reactive({
  Allergens: {
    Gluten: false,
    Dairy: false,
    Nuts: false,
    Shellfish: false,
  },
  Diet: {
    Keto: false,
    Paleo: false,
    Vegetarian: false,
    Vegan: false,
  },
  'Meal Category': {
    Breakfast: false,
    Lunch: false,
    Dinner: false,
    Dessert: false,
  },
  Nutrition: {
    'High Protein': false,
    'High Carbs': false,
  }
});

const isAllActive = computed(() => {
  return !Object.values(filterState).some(category =>
    Object.values(category).some(active => active)
  );
});

const resetFilters = () => {
  Object.keys(filterState).forEach(category => {
    Object.keys(filterState[category]).forEach(filter => {
      filterState[category][filter] = false;
    });
  });
};
 

</script>

<style scoped>

.hero-section {
  text-align: center;
  padding: 30px;
}
.category-container {
  display: flex;
  gap: 15px; 
  flex-wrap: wrap; 
  justify-content: center;
}
.all-button{
  justify-content: space-between;
  align-items: center;
  gap: 20px; 
  padding: 12px 24px;
  background-color: transparent;
  color: rgba(38, 37, 34, 0.4);
  border: 1.5px solid rgba(38, 37, 34, 0.4);
  border-radius: 24px;
  cursor: pointer;
  font-weight: bold;
  text-transform: uppercase;
}

.all-button.hover,
.all-button:hover {
  background-color: rgba(159, 220, 38, 0.3); 
}

.all-button.active {
  background-color: rgba(159, 220, 38, 1);
  border: 1.5px solid rgba(38, 37, 34, 1);
  color: rgba(38, 37, 34, 1);
}

.tag {
  display: inline-block;
  background-color: #EE6352;
  border-radius: 12px;
  color: white;
  font-size: 12px;
  font-weight: bold;
  padding: 4px 8px;
}

h1 {
  font-size: 1.5em;
  margin: 10px 0;
}

.hero-title {
  font-size: 36px;
  padding: 12px;
  font-weight: 800;
  color: #262522;
  margin: 0;
}

.hero-subtitle {
  font-size: 16px;
  color: #262522;
  opacity: 0.60;
  margin-top: 0px;
  margin-bottom: 0px;
}

</style>
  