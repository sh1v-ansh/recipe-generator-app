<template>
  <div v-if="recipeData" class="recipe-page">
    <div class="tag">RECIPE</div>
    <div class="recipe-header">
      <h1>{{ recipeData.name }}</h1>
      <p class="description">{{ recipeData.description }}</p>
    </div>
    <div class="fine-details" v-if="recipeData.lunch || recipeData.breakfast || recipeData.dinner || recipeData.snack">
      <p><strong>Meal Type: </strong>
        <span v-if="recipeData.breakfast">Breakfast </span>
        <span v-if="recipeData.lunch">Lunch </span>
        <span v-if="recipeData.dinner">Dinner </span>
        <span v-if="recipeData.snack">Snack</span>
      </p>
      <p><strong>Time:</strong> {{ recipeData.minutes }} minutes</p>
      <p><strong>Number of Steps:</strong> {{ recipeData.n_steps }}</p>
    </div>
    <div class="recipe-body">
      <div class="left-section">
        <h3>Directions</h3>
        <ol class="steps">
          <div v-for="(step, index) in recipeData.steps" :key="index" class="step">
            <strong>Step {{ index + 1 }}:</strong>
            <p>{{ step }}</p>
          </div>
        </ol>
      </div>

      <div class="right-section">
        <div class="details-box">
          <h4>Ingredients</h4>
          <ul>
            <li v-for="(ingredient, index) in recipeData.ingredients" :key="index">{{ ingredient }}</li>
          </ul>
        </div>

        <div class="details-box">
          <h4>Dietary Information</h4>
          <ul>
            <li v-if="recipeData['keto']">Keto-Friendly</li>
            <li v-if="recipeData['paleo']">Paleo-Friendly</li>
            <li v-if="recipeData['vegetarian']">Vegetarian</li>
            <li v-if="recipeData['vegan']">Vegan</li>
            <li v-if="recipeData['pescatarian']">Pescatarian</li>
            <li v-if="recipeData['diabetic']">Diabetic-Friendly</li>
          </ul>
        </div>

        <div class="details-box">
          <h4>Allergens</h4>
          <ul>
            <li v-if="recipeData['dairy']">Contains Dairy</li>
            <li v-if="recipeData['wheat']">Contains Wheat</li>
            <li v-if="recipeData['nuts']">Contains Nuts</li>
            <li v-if="recipeData['shellfish']">Contains Shellfish</li>
            <li v-if="recipeData['soy']">Contains Soy</li>
            <li v-if="recipeData['fish']">Contains Fish</li>
            <li v-if="recipeData['eggs']">Contains Eggs</li>
          </ul>
        </div>

        <div class="details-box">
          <h4>Nutritional Information</h4>
          <p><strong>Calories:</strong> {{ recipeData.calories }} kcal</p>
          <p><strong>Total Fat:</strong> {{ recipeData.total_fat_grams }}g</p>
          <p><strong>Saturated Fat:</strong> {{ recipeData.saturated_fat_grams }}g</p>
          <p><strong>Sugar:</strong> {{ recipeData.sugar_grams }}g</p>
          <p><strong>Sodium:</strong> {{ recipeData.sodium_grams }}g</p>
          <p><strong>Protein:</strong> {{ recipeData.protein_grams }}g</p>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <p>Error loading recipe...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const recipeData = ref(null);

const fetchRecipeData = async (id) => {
  try {
    const response = await fetch(`http://localhost:3000/api/recipe?uid=${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch recipe data: ${response.statusText}`);
    }
    recipeData.value = await response.json(); // Properly parse JSON response
  } catch (error) {
    console.error("Error fetching recipe data:", error);
  }
};
onMounted(() => {
  const recipeId = route.params.id;
  fetchRecipeData(recipeId);
});
</script>

<style scoped>
.recipe-page {
  flex-direction: column;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.fine-details {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
  font-size: 16px;
  justify-content: center;
}

.fine-details strong {
  font-weight: bold;
}

.recipe-header {
  text-align: center;
  padding: 0px 200px;
}

.description {
  font-style: italic;
  color: #666;
}

.recipe-body {
  display: flex;
  gap: 20px;
}

.left-section {
  flex: 2;
}

.right-section {
  flex: 1;
}

.steps {
  padding-left: 20px;
  text-align: left;
}

.details-box {
  margin-bottom: 24px;
  padding: 20px 16px;
  background-color: #FFFBF2;
  border-radius: 24px;
  border: 1px solid rgba(38, 37, 34, 0.24);
  text-align: left;
}

.details-box h4 {
  margin-bottom: 10px;
  font-size: 16px;
  color: #e63946;
  text-align: center;
}

.details-box ul {
  padding-left: 20px;
  list-style: disc;
}

.tag {
  display: inline-block;
  background-color: #EE6352;
  border-radius: 12px;
  color: white;
  font-size: 12px;
  margin-top: 5px;
  font-weight: bold;
  padding: 4px 8px;
}
</style>
