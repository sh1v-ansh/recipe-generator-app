<script setup lang="ts">
import filledIcon from '../assets/checked.svg';
import outlinedIcon from '../assets/unchecked.svg';
import { computed, ref, type StyleValue } from 'vue';

const props = defineProps<{ title: string; tabs: Record<string, boolean> }>();

//Track dropdown visibility
const isDropdownOpen = ref(false);

//Toggle dropdown visibility
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

//Toggle each button's state (active/inactive)
const toggleTabState = (key: string) => {
  props.tabs[key] = !props.tabs[key];

  //Integration with the backend; use activeFilters to figure out filters are activated
  const activeFilters = Object.keys(props.tabs).filter((key) => props.tabs[key]);
  console.log(activeFilters)
};
const getIcon = (isActive: boolean) => (isActive ? filledIcon : outlinedIcon);
const isActive = computed(() => {
  return Object.values(props.tabs).some((state) => state === true);
});
</script>

<template>
  
  <div>
    <button class="main-category-button" 
    :class="{ active: isDropdownOpen || isActive }" 
    @click="toggleDropdown">
      {{ title }}
      <img src="../assets/chevron-down.svg" alt="Chevron Icon" :class="{ rotated: isDropdownOpen}" />
    </button>

    <div v-if="isDropdownOpen" class="dropdown-menu">
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

.main-category-button.hover,
.main-category-button:hover {
  background-color: rgba(159, 220, 38, 0.3); 
}

.main-category-button.active {
  background-color: rgba(159, 220, 38, 1);
  border: 1.5px solid rgba(38, 37, 34, 1);
  color: rgba(38, 37, 34, 1);
}

.dropdown-menu {
  display: flex;
  flex-direction: column;
  position: absolute;
  background-color: #f3efe6;
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
  border-radius: 10px;
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