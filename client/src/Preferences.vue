<template>
    <div class="preferences-page">
      <div class="preferences-container">
        <div class="tag">PREFERENCES</div>
        <h1 class="preferences-title">DIETARY PREFERENCES</h1>
  
        <!-- Allergens Section -->
        <div class="preferences-section">
          <h2 class="preferences-category">Allergens</h2>
          <div class="preferences-options">
            <button
              v-for="(value, allergen) in preferences.Allergens"
              :key="allergen"
              :class="['preferences-option', { active: value }]"
              @click="togglePreference('Allergens', allergen)"
            >
              {{ allergen }}
            </button>
          </div>
        </div>
  
        <!-- Diet Section -->
        <div class="preferences-section">
          <h2 class="preferences-category">Diet</h2>
          <div class="preferences-options">
            <button
              v-for="(value, diet) in preferences.Diet"
              :key="diet"
              :class="['preferences-option', { active: value }]"
              @click="togglePreference('Diet', diet)"
            >
              {{ diet }}
            </button>
          </div>
        </div>
  
        <!-- Nutrition Section -->
        <div class="preferences-section">
          <h2 class="preferences-category">Nutrition</h2>
          <div class="preferences-options">
            <button
              v-for="(value, nutrition) in preferences.Nutrition"
              :key="nutrition"
              :class="['preferences-option', { active: value }]"
              @click="togglePreference('Nutrition', nutrition)"
            >
              {{ nutrition }}
            </button>
          </div>
        </div>
  
        <!-- Submit Button -->
        <button class="preferences-submit" @click="submitPreferences">
          Submit Preferences
        </button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { reactive } from "vue";
  
  // Reactive state for preferences
  const preferences = reactive({
    Allergens: {
      Wheat: false,
      Dairy: false,
      Nuts: false,
      Shellfish: false,
      Soy: false,
      Fish: false,
      Peanuts: false,
      Eggs: false,
    },
    Diet: {
      Keto: false,
      Paleo: false,
      Vegetarian: false,
      Vegan: false,
      Pescatarian: false,
    },
    Nutrition: {
      "high-protein": false,
      "low-carb": false,
    },
  });
  

  const togglePreference = (category: keyof typeof preferences, tag: string) => {
    preferences[category][tag] = !preferences[category][tag];
  };
  

  const submitPreferences = () => {
  const selectedPreferences: { [tag: string]: boolean } = {};


  for (const [category, tags] of Object.entries(preferences)) {

    Object.keys(tags).forEach((tag) => {
      if (tags[tag]) {
        selectedPreferences[tag.toLowerCase()]= true; 
      }
    });
  }

  console.log("Selected Preferences:", selectedPreferences);
  alert(
    `Your preferences have been saved:\n${JSON.stringify(
      selectedPreferences,
      null,
      2
    )}`
  );
};
  </script>
  
  <style scoped>
  .preferences-page {
    max-width: 700px;
    margin: 0 auto;
    padding: 16px;
    font-family: Arial, sans-serif;
  }
  
  .preferences-container {
    padding: 24px;
    border-radius: 16px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }
  
  .tag {
    display: inline-block;
    background-color: #ee6352;
    border-radius: 12px;
    color: white;
    font-size: 12px;
    font-weight: bold;
    padding: 4px 8px;
  }
  
  .preferences-title {
    text-align: center;
    font-size: 24px;
    margin: 16px 0;
  }
  
  .preferences-section {
    margin-bottom: 24px;
  }
  
  .preferences-category {
    font-size: 18px;
    text-align: center;
    margin-bottom: 12px;

    display: inline-block;
    background-color: #84b85c;
    border-radius: 12px;
    color: white;
    font-size: 12px;
    font-weight: bold;
    padding: 4px 8px;
  }
  
  .preferences-options {
    display: flex;
    flex-wrap: wrap;
    justify-content: center; /* Center-align the buttons */
    gap: 12px;
    color: black;
  }
  
  .preferences-option {
    padding: 8px 16px;
    border-radius: 20px;
    cursor: pointer;
    transition: all 0.3s ease;
    color: black;
    background-color: #fffbf2;
  }
  
  .preferences-option.active {
    background-color: #c4beae;
    color: black;
  }
  
  .preferences-option:hover {
    background-color: #c4beae;
    color: black;
    border: none;
  }
  
  .preferences-submit {
    display: block;
    margin: 24px auto 0;
    background-color: #f29c33;
    color: #262522;
    font-size: 18px;
    font-weight: bold;
    padding: 12px 24px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .preferences-submit:hover {
    background-color: #c47e2a;
  }
  </style>
  