<template>
  <div class="tab-wrapper">
    <button
      class="tab-button all-button"
      :class="isAllActive"
      @click="toggleAll()"
    >
      All
    </button>
    <div class="dropdown" @mouseenter="setHover('allergens')" @mouseleave="clearHover('allergens')" @click="toggleDropdown('allergens')">
      <button class="tab-button" :class="{ active: dropdowns.allergens || isCategoryActive('allergens'), hover: hoveredTab === 'allergens' }">
        Allergens
        <img src="../assets/chevron-down.svg" alt="Chevron Icon" :class="{ rotated: dropdowns.allergens }" />
      </button>
      <div v-if="dropdowns.allergens" class="dropdown-menu">
        <label>
          Gluten
          <img :src="getIconSrc('Gluten')" @click="toggleFilter('Gluten')" class="filter-icon" />
        </label>
        <label>
          Dairy
          <img :src="getIconSrc('Dairy')" @click="toggleFilter('Dairy')" class="filter-icon" />
        </label>
        <label>
          Nuts
          <img :src="getIconSrc('Nuts')" @click="toggleFilter('Nuts')" class="filter-icon" />
        </label>
        <label>
          Shellfish
          <img :src="getIconSrc('Shellfish')" @click="toggleFilter('Shellfish')" class="filter-icon" />
        </label>
      </div>
    </div>
    <div class="dropdown" @mouseenter="setHover('diet')" @mouseleave="clearHover('diet')" @click="toggleDropdown('diet')">
      <button class="tab-button" :class="{ active: dropdowns.diet || isCategoryActive('diet'), hover: hoveredTab === 'diet' }">
        Diet
        <img src="../assets/chevron-down.svg" alt="Chevron Icon" :class="{ rotated: dropdowns.diet }" />
      </button>
      <div v-if="dropdowns.diet" class="dropdown-menu">
        <label>
          Keto
          <img :src="getIconSrc('Keto')" @click="toggleFilter('Keto')" class="filter-icon" />
        </label>
        <label>
          Paleo
          <img :src="getIconSrc('Paleo')" @click="toggleFilter('Paleo')" class="filter-icon" />
        </label>
        <label>
          Vegetarian
          <img :src="getIconSrc('Vegetarian')" @click="toggleFilter('Vegetarian')" class="filter-icon" />
        </label>
        <label>
          Vegan
          <img :src="getIconSrc('Vegan')" @click="toggleFilter('vegan')" class="filter-icon" />
        </label>
        <label>
          Mediterranean
          <img :src="getIconSrc('Mediterranean')" @click="toggleFilter('Mediterranean')" class="filter-icon" />
        </label>
      </div>
    </div>
    <div class="dropdown" @mouseenter="setHover('mealCategory')" @mouseleave="clearHover('mealCategory')" @click="toggleDropdown('mealCategory')">
      <button class="tab-button" :class="{ active: dropdowns.mealCategory || isCategoryActive('mealCategory'), hover: hoveredTab === 'mealCategory' }">
        Meal Category
        <img src="../assets/chevron-down.svg" alt="Chevron Icon" :class="{ rotated: dropdowns.mealCategory }" />
      </button>
      <div v-if="dropdowns.mealCategory" class="dropdown-menu">
        <label>
          Breakfast
          <img :src="getIconSrc('Breakfast')" @click="toggleFilter('Breakfast')" class="filter-icon" />
        </label>
        <label>
          Lunch
          <img :src="getIconSrc('Lunch')" @click="toggleFilter('Lunch')" class="filter-icon" />
        </label>
        <label>
          Dinner
          <img :src="getIconSrc('Dinner')" @click="toggleFilter('Dinner')" class="filter-icon" />
        </label>
        <label>
          Snack
          <img :src="getIconSrc('Snack')" @click="toggleFilter('Snack')" class="filter-icon" />
        </label>
        <label>
          Dessert
          <img :src="getIconSrc('Dessert')" @click="toggleFilter('Dessert')" class="filter-icon" />
        </label>
      </div>
    </div>
    <div class="dropdown" @mouseenter="setHover('nutrition')" @mouseleave="clearHover('nutrition')" @click="toggleDropdown('nutrition')">
      <button class="tab-button" :class="{ active: dropdowns.nutrition || isCategoryActive('nutrition'), hover: hoveredTab === 'nutrition' }">
        Nutrition
        <img src="../assets/chevron-down.svg" alt="Chevron Icon" :class="{ rotated: dropdowns.nutrition }" />
      </button>
      <div v-if="dropdowns.nutrition" class="dropdown-menu">
        <label>
          High Protein
          <img :src="getIconSrc('High Protein')" @click="toggleFilter('High Protein')" class="filter-icon" />
        </label>
        <label>
          High Carbs
          <img :src="getIconSrc('High Carbs')" @click="toggleFilter('High Carbs')" class="filter-icon" />
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import checkedIcon from '../assets/checked.svg';
import uncheckedIcon from '../assets/unchecked.svg';
export default {
  props: ['selectedFilters', 'dropdowns', 'hoveredTab'],
  data() {
    return {
      filterCategories: {
        diet: ['Keto', 'Paleo', 'Vegetarian', 'Vegan', 'Mediterranean'],
        nutrition: ['High Protein', 'High Carbs'],
        mealCategory: ['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Dessert'],
        allergens: ['Gluten', 'Dairy', 'Nuts', 'Shellfish']
      }
    }
  },
  computed: {
    isAllActive() {
      return this.selectedFilters.length === 0 ? 'active' : '';
    },
    isCategoryActive() {
    return (category) => this.selectedFilters.some(filter => this.filterCategories[category].includes(filter));
    }
  },
  methods: {
    toggleAll() {
      this.selectedFilters = [];
    },
    toggleDropdown(category) {
      this.dropdowns[category] = !this.dropdowns[category];
    },
    toggleFilter(filter) {
      const index = this.selectedFilters.indexOf(filter);
      if (index === -1) {
        this.selectedFilters.push(filter);
      } else {
        this.selectedFilters.splice(index, 1);
      }
    },
    setHover(tab) {
      this.hoveredTab = tab;
    },
    clearHover() {
      this.hoveredTab = null;
    },
    getIconSrc(filter) {
      return this.selectedFilters.includes(filter) ? checkedIcon : uncheckedIcon;
    }
  }
};
</script>

<style scoped>
.tab-wrapper {
display: flex;
gap: 20px; 
justify-content: center;
align-items: center;
width: 100%;
margin-top: 0px;
}

.tab-button {
  justify-content: space-between;
  align-items: center;
  width: 185px;
  padding: 12px 24px;
  background-color: transparent;
  color: rgba(38, 37, 34, 0.4);
  border: 1.5px solid rgba(38, 37, 34, 0.4);
  border-radius: 24px;
  cursor: pointer;
  font-weight: bold;
  text-transform: uppercase;
  width: 100%;
}


.tab-button.all-button {
  width: 80px; 
}

.tab-button.hover,
.tab-button:hover {
  background-color: rgba(159, 220, 38, 0.3); 
}
.tab-button.active {
  background-color: rgba(159, 220, 38, 1);
  border: 1.5px solid rgba(38, 37, 34, 1);
  color: rgba(38, 37, 34, 1);
}

.filter-icon {
  width: 20px;
  height: 20px;
}

.dropdown {
  position: relative;
}

.dropdown-menu {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #f3efe6;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 10px 10px;
  min-width: 185px;
  z-index: 1000;
}

.dropdown-menu a {
  color: #333;
  padding: 8px;
  text-decoration: none;
  font-size: 14px;
  border-radius: 5px;
}

.dropdown-menu a:hover {
  background-color: #e2e2e2;
}

.dropdown-menu label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 8px 0;
}

img.rotated {
  margin-left: 10px;
  transform: rotate(180deg);
  transition: transform 0.3s ease; 
}
img {
  margin-left: 10px;
  transform: rotate(0deg);
  transition: transform 0.3s ease;
}
.dropdown {
  position: relative;
  display: flex;
  align-items: center;
}

.tab-button img {
  margin-left: 10px;
  flex-shrink: 0;
}

</style>
