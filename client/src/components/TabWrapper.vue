<script setup lang="ts">
import checked from '../assets/checked.svg';
import unchecked from '../assets/unchecked.svg';
import { reactive, computed, ref} from 'vue';

const emit = defineEmits<{
  (event: 'filter-changed', category: string, filter: string, isSelected: boolean): void;
  (event: 'update:dropdown', isOpen: boolean): void;
}>();
const props = defineProps<{ title: string; tabs: Record<string, boolean>; isDropdownOpen: boolean; }>();

//Toggle dropdown visibility
const toggleDropdown = () => {
  emit('update:dropdown', !props.isDropdownOpen); //Sends to toggleDropdown(tabSetTitle) in Recipes.vue
};

//Changes category button to active if isActive is true
const getIcon = (isActive: boolean) => (isActive ? checked : unchecked );

//Checker to see if Category button has any selected filter
const isActive = computed(() => {
  return Object.values(props.tabs).some((state) => state === true);
});

//Toggle each button's state (active/inactive)
const toggleTabState = (key: string) => {
  props.tabs[key] = !props.tabs[key];
  emit('filter-changed', props.title, key, props.tabs[key]); //Sends to updateSelectedFilters in Recipes.vue
};

</script>

<template>
  <div class="dropdown-menu-container">
    <div>
      <button class="main-category-button" 
      :class="{ 'diet-category-button': title === 'Diet', active: isDropdownOpen || isActive }" 
      @click="toggleDropdown">
        {{ title }}
        <img src="../assets/chevron-down.svg" alt="Chevron Icon" :class="{ rotated: isDropdownOpen}" />
      </button>
      <div v-if="props.isDropdownOpen" class="dropdown-menu">
        <button
          v-for="(value, key) in tabs"
          :key="key"
          @click="toggleTabState(key)"
          class="dropdown-item"
        >
          {{ key }}
          <img :src="getIcon(value)" class="filter-icon" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.main-category-button {
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

.diet-category-button {
  width: flex; 
  min-width: 150px
}

.main-category-button.hover,
.main-category-button:hover {
  background-color: rgba(159, 220, 38, 0.3); 
}

.main-category-button.active {
  background-color: rgba(159, 220, 38, 1);
  border: 1.5px solid rgba(38, 37, 34, 1);
  color: rgba(38, 37, 34, 1);
}

.dropdown-menu-container {
  position: relative;
  
}

.dropdown-menu {
  position: absolute;
  width: 100%; 
  background-color: #f3efe6;
  border-radius: 24px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000; 
}

.dropdown-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #333;
  background-color: #f3efe6;
  text-decoration: none;
  border-radius: 24px;
  width: 100%;

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

</style>