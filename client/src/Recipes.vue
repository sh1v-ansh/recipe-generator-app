<template>
  <div class="hero-section">
    <div class="tag">RECIPES</div>
    <h1 class="hero-title">EMBARK ON A JOURNEY</h1>
    <p class="hero-subtitle">
      With our diverse collection of recipes we have something to satisfy every palate.
    </p>
  </div>
  <TabWrapper
    :selectedFilters="selectedFilters"
    :dropdowns="dropdowns"
    :hoveredTab="hoveredTab"
    @select-all="selectAllTab"
    @toggle-dropdown="toggleDropdown"
    @toggle-filter="toggleFilter"
    @set-hover="setHover"
    @clear-hover="clearHover"
  />
  <div style="width: 100vw; padding: 0;">
    <RecipeFilter @update-filter="filterRecipes" />
    <div v-for="recipe in filteredRecipes" :key="recipe.id">
      <Recipe :recipe="recipe" />
    </div>
  </div>
</template>

<script>
import Recipe from './components/Recipe.vue';
import RecipeFilter from './components/Filter.vue';
import TabWrapper from './components/TabWrapper.vue';

export default {
  components: { Recipe, RecipeFilter, TabWrapper },
  data() {
    return {
      dropdowns: {
        allergens: false,
        diet: false,
        mealCategory: false,
        nutrition: false,
      },
      recipes: [
        { id: 1, name: 'Pasta', description: 'Tomato pasta.', ingredients: ['pasta', 'tomato', 'cheese'], tags: ["Gluten Free", "Vegetarian"] },
        { id: 2, name: 'Salad', description: 'Healthy salad.', ingredients: ['lettuce', 'tomato', 'cucumber'], tags: ["Vegan"] },
        { id: 3, name: 'Chicken Pot Pie', description: 'Delicious and meaty', ingredients: ['chicken', 'sauce', 'vegetables'], tags: ["Protein", "High Calorie"] },
        { id: 4, name: 'Pad Thai', description: 'Thai noodles', ingredients: ['peanuts', 'sauce', 'noodles'], tags: ["Protein", "Asian"] }
      ],
      filterKeyword: '',
      filterTag: '',
      filterSubTags: [],
      selectedFilters: [],
      hoveredTab: null,
    };
  },
  computed: {
    filteredRecipes() {
      const keyword = this.filterKeyword.toLowerCase();
      const tag = this.filterTag;
      const subTags = this.filterSubTags;
      const selectedFilters = this.selectedFilters;

      return this.recipes.filter(recipe => {
        const matchesKeyword =
          recipe.name.toLowerCase().includes(keyword) ||
          recipe.description.toLowerCase().includes(keyword) ||
          recipe.ingredients.some(ingredient => ingredient.toLowerCase().includes(keyword));
        const matchesTag = tag === "" || recipe.tags.includes(tag);
        const matchesSubTags =
          subTags.length === 0 ||
          subTags.every(subTag => recipe.tags && recipe.tags.includes(subTag));
        const matchesSelectedFilters =
          selectedFilters.length === 0 ||
          selectedFilters.every(filter => recipe.tags && recipe.tags.includes(filter));

        return matchesKeyword && matchesTag && matchesSubTags && matchesSelectedFilters;
      });
    }
  },
  methods: {
    selectAllTab() {
      this.dropdowns = {
        allergens: false,
        diet: false,
        mealCategory: false,
        nutrition: false,
      };
      this.selectedFilters = [];
    },
    toggleDropdown(tab) {
      for (const key in this.dropdowns) {
        this.dropdowns[key] = key === tab ? !this.dropdowns[key] : false;
      }
    },
    toggleFilter(filter) {
      if (this.selectedFilters.includes(filter)) {
        this.selectedFilters = this.selectedFilters.filter(f => f !== filter);
      } else {
        this.selectedFilters.push(filter);
      }
    },
    setHover(tab) {
      this.hoveredTab = tab;
    },
    clearHover(tab) {
      if (this.hoveredTab === tab) {
        this.hoveredTab = null;
      }
    }
  }
};
</script>
<style scoped>
.hero-section {
  text-align: center;
  padding: 50px 20px;
}

.tag {
  display: inline-block;
  background-color: #EE6352;
  border-radius: 12px;
  color: white;
  font-size: 12px;
  font-weight: bold;
  padding: 4px var(--Space-200, 8px);
  justify-content: center;
  align-items: center;
  gap: 10px;
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
  