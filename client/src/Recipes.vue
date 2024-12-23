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
      :class="{ isAllActive }"
      @click="resetFilters"
    > 
      All
    </button>
    <div v-for="(tabSetValues, tabSetTitle) in filterState" :key="tabSetTitle">
      <TabWrapper :title="tabSetTitle" :tabs="tabSetValues" 
      :is-dropdown-open="dropdownState[tabSetTitle]" 
      @update:dropdown="toggleDropdown(tabSetTitle)"
      @filter-changed="updateSelectedFilters" />
    </div>
  </div>
  <div class="recipe-card-container">
    <RecipeCard
      v-for="recipe in paginatedRecipes"
      :key="recipe.id"
      :title="recipe.name"
      :description="recipe.description"
      :image="recipe.image"
      :tags="recipe.tags"
      :recipe-id="recipe.id"
      @view-recipe="viewRecipe"
    />
  </div>
  <div class="pagination">
      <button
        v-for="page in Array.from({ length: totalPages }, (_, i) => i + 1)"
        :key="page"
        :class="['pagination-button', { active: currentPage.value === page }]"
        @click="changePage(page)"
      >
    {{ page }}
  </button>
  </div>
</template>
<script setup lang="ts">
import Recipe from './components/Recipe.vue';
import RecipeFilter from './components/Filter.vue';
import { reactive, ref, computed } from 'vue';
import RecipeCard from './components/RecipeCard.vue';
import TabWrapper from './components/TabWrapper.vue';

import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();




const recipes = reactive([]); 

const loading = ref(false);


const fetchRecipes = async (tag = '') => {
  loading.value = true;
  try {
    const response = await fetch('http://localhost:3000/api/recipes/fetch-any', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        pageSize: 18,
        tags: tag
      }),
    });
    const data = await response.json();

    console.log('Fetched Recipes:', data.recipes); 

    
    

    recipes.splice(0, recipes.length, ...data.recipes || []);
  } catch (error) {
    console.error('Error fetching recipes:', error);
  } finally {
    loading.value = false;
  }
};

//fetchRecipes();


const filterState = reactive({
  Allergens: {
    Wheat: false,
    Dairy: false,
    Nuts: false,
    Shellfish: false,
    Soy: false,
    Fish: false,
    Eggs: false,
  },
  Diet: {
    Keto: false,
    Paleo: false,
    Vegetarian: false,
    Diabetic: false,
    Vegan: false,
    Pescatarian: false,
  },
  Nutrition: {
    'high-protein': false,
    'low-carb': false,
  }
});

const dropdownState = reactive({
  Allergens: false,
  Diet: false,
  'Meal Category': false,
  Nutrition: false,
});

const toggleDropdown = (category: string) => {
  dropdownState[category] = !dropdownState[category];
};

const selectedFilters = reactive<string[]>([]);

const updateSelectedFilters = (category: string, filter: string, isSelected: boolean) => {
  const filterKey = `${filter}`;
  if (isSelected) {
    if (!selectedFilters.includes(filterKey)) selectedFilters.push(filterKey.toLowerCase());
  } 
  else{
    const index = selectedFilters.indexOf(filterKey);
    if (index > -1) selectedFilters.splice(index, 1);
  }
  
  /***Integration with the backend; use selectedFilters to figure out filters are activated,
  check for formatting */
  console.log("All selected filters:", selectedFilters);
  let regularArray = Array.from(selectedFilters);
  console.log(regularArray)

  fetchRecipes(selectedFilters);
};

//Checker for the All button to determine if active
const isAllActive = computed(() => {
  return !Object.values(filterState).some(category =>
    Object.values(category).some(active => active)
  );
});

//Clears filters if All button is pressed
const resetFilters = () => {
  selectedFilters.length = 0;
  Object.keys(filterState).forEach(category => {
    Object.keys(filterState[category]).forEach(filter => {
      filterState[category][filter] = false;
    });
  });
  Object.keys(dropdownState).forEach(category => {
    dropdownState[category] = false;
  });
  console.log("All selected filters:", selectedFilters);
};
 

//Pagination state
const currentPage = ref(1);
const recipesPerPage = 9;

const totalPages = computed(() => {
  const pages = Math.ceil(recipes.length / recipesPerPage);
  return pages;
});

//Paginated recipes
const paginatedRecipes = computed(() => {
  const start = (currentPage.value - 1) * recipesPerPage;
  const end = start + recipesPerPage;
  return recipes.slice(start, end);
});

//Change the page
const changePage = (page: number) => {
  currentPage.value = page;
};

//Helper "View Recipe"
const viewRecipe = (recipeId: String) => {
  router.push(`/recipes/${recipeId}`);
};


 fetchRecipes();


</script>

<style scoped>

.hero-section {
  text-align: center;
  padding: 30px;
}
.category-container {
  display: flex;
  gap: 15px; 
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

.recipe-card-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 20px;
}


.pagination {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
  margin-bottom: 20px;
}

.pagination button {
  border-radius: 8px;
  background-color: rgba(44, 44, 44, 1);
  background: transparent;
  color: #1E1E1E;
  cursor: pointer;
}

.pagination button.active {
  background-color: #007bff; /* Highlight color for the active page */
  color: white; /* Text color for the active page */
  border: none; /* Remove border if desired */
  font-weight: bold; /* Emphasize the active button */
  cursor: default; /* Change cursor to indicate non-clickable */
}

.pagination button:hover {
  background-color: rgba(44, 44, 44, 0.50);
  color: white;
}

</style>
  