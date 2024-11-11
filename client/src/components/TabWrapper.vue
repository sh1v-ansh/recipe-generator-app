<template>
  <div class="tab-wrapper">
    <div class="dropdown" @mouseenter="setHover('allergens')" @mouseleave="clearHover('allergens')" @click="toggleDropdown('allergens')">
      <button class="tab-button" :class="{ active: dropdowns.allergens, hover: hoveredTab === 'allergens' }">
        Allergens
        <img src="../assets/chevron-down.svg" alt="Chevron Icon" :class="{ rotated: dropdowns.allergens }" />
      </button>
      <div v-if="dropdowns.allergens" class="dropdown-menu">
        <label>
          <img :src="selectedFilters.includes('Gluten') ? 'checked.png' : 'unchecked.png'" @click="toggleFilter('Gluten')" />
          Gluten
        </label>
        <label>
          <img :src="selectedFilters.includes('Dairy') ? 'checked.png' : 'unchecked.png'" @click="toggleFilter('Dairy')" />
          Dairy
        </label>
        <label>
          <img :src="selectedFilters.includes('Nuts') ? 'checked.png' : 'unchecked.png'" @click="toggleFilter('Nuts')" />
          Nuts
        </label>
        <label>
          <img :src="selectedFilters.includes('Shellfish') ? 'checked.png' : 'unchecked.png'" @click="toggleFilter('Shellfish')" />
          Shellfish
        </label>
      </div>
    </div>
    <div class="dropdown" @mouseenter="setHover('diet')" @mouseleave="clearHover('diet')" @click="toggleDropdown('diet')">
      <button class="tab-button" :class="{ active: dropdowns.diet, hover: hoveredTab === 'diet' }">
        Diet
        <img src="../assets/chevron-down.svg" alt="Chevron Icon" :class="{ rotated: dropdowns.diet }" />
      </button>
      <div v-if="dropdowns.diet" class="dropdown-menu">
        <label>
          <img :src="selectedFilters.includes('Keto') ? 'checked.png' : 'unchecked.png'" @click="toggleFilter('Keto')" />
          Keto
        </label>
        <label>
          <img :src="selectedFilters.includes('Paleo') ? 'checked.png' : 'unchecked.png'" @click="toggleFilter('Paleo')" />
          Paleo
        </label>
        <label>
          <img :src="selectedFilters.includes('Vegetarian') ? 'checked.png' : 'unchecked.png'" @click="toggleFilter('Vegetarian')" />
          Vegetarian
        </label>
        <label>
          <img :src="selectedFilters.includes('Vegan') ? 'checked.png' : 'unchecked.png'" @click="toggleFilter('Vegan')" />
          Vegan
        </label>
        <label>
          <img :src="selectedFilters.includes('Mediterranean') ? 'checked.png' : 'unchecked.png'" @click="toggleFilter('Mediterranean')" />
          Mediterranean
        </label>
      </div>
    </div>
    <div class="dropdown" @mouseenter="setHover('mealCategory')" @mouseleave="clearHover('mealCategory')" @click="toggleDropdown('mealCategory')">
      <button class="tab-button" :class="{ active: dropdowns.mealCategory, hover: hoveredTab === 'mealCategory' }">
        Meal Category
        <img src="../assets/chevron-down.svg" alt="Chevron Icon" :class="{ rotated: dropdowns.mealCategory }" />
      </button>
      <div v-if="dropdowns.mealCategory" class="dropdown-menu">
        <label>
          <img :src="selectedFilters.includes('Breakfast') ? 'checked.png' : 'unchecked.png'" @click="toggleFilter('Breakfast')" />
          Breakfast
        </label>
        <label>
          <img :src="selectedFilters.includes('Lunch') ? 'checked.png' : 'unchecked.png'" @click="toggleFilter('Lunch')" />
          Lunch
        </label>
        <label>
          <img :src="selectedFilters.includes('Dinner') ? 'checked.png' : 'unchecked.png'" @click="toggleFilter('Dinner')" />
          Dinner
        </label>
        <label>
          <img :src="selectedFilters.includes('Snack') ? 'checked.png' : 'unchecked.png'" @click="toggleFilter('Snack')" />
          Snack
        </label>
        <label>
          <img :src="selectedFilters.includes('Dessert') ? 'checked.png' : 'unchecked.png'" @click="toggleFilter('Dessert')" />
          Dessert
        </label>
      </div>
    </div>
    <div class="dropdown" @mouseenter="setHover('nutrition')" @mouseleave="clearHover('nutrition')" @click="toggleDropdown('nutrition')">
      <button class="tab-button" :class="{ active: dropdowns.nutrition, hover: hoveredTab === 'nutrition' }">
        Nutrition
        <img src="../assets/chevron-down.svg" alt="Chevron Icon" :class="{ rotated: dropdowns.nutrition }" />
      </button>
      <div v-if="dropdowns.nutrition" class="dropdown-menu">
        <label>
          <img :src="selectedFilters.includes('High Protein') ? 'checked.png' : 'unchecked.png'" @click="toggleFilter('High Protein')" />
          High Protein
        </label>
        <label>
          <img :src="selectedFilters.includes('High Carbs') ? 'checked.png' : 'unchecked.png'" @click="toggleFilter('High Carbs')" />
          High Carbs
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['selectedFilters', 'dropdowns', 'hoveredTab'],
  data() {
    return {
      dropdowns: this.dropdowns,
    };
  },
  computed: {
    isAllActive() {
      return !this.dropdowns.allergens &&
              !this.dropdowns.diet &&
              !this.dropdowns.mealCategory &&
              !this.dropdowns.nutrition;
    },
  },
  methods: {
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
  },
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
