<template>
    <div class="meal-plan-container">
        <div class="meal-plan-content">
            <div class="tag">RECIPE GENERATOR</div>
                <div class="meal-plan-header">
                    <h1 class="title">MEAL PLAN</h1>
                </div>
                <p class="description">
                If you're looking for a meal plan based on the allergens, diets, and
                nutrition info set in your profile, try out our Recipe Generator and get a
                curated recipe plan for the week.
                </p>
                <button class="generate-btn" @click="goToMealPlanGenerator">
                Regenerate
                </button>
        </div>
        <div v-for="(day, index) in days" :key="day" class="day-section">
            <h2 class="day-title">{{ day }}</h2>
            <div class="cards-container">
                <RecipeCard
                    v-for="recipe in recipesForDay[index]"
                    :key="recipe.recipeId"
                    :title="recipe.title"
                    :description="recipe.description"
                    :tags="recipe.tags"
                    :recipeId="recipe.recipeId"
                    @view-recipe="viewRecipeHandler"
                />
            </div>
        </div>
    </div>
</template>
  
<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import RecipeCard from '../src/components/RecipeCard.vue';

const router = useRouter();

const goToMealPlanGenerator = () => {
    router.push('/meal-plan');
};

const days = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY'];

// Placeholder for recipes fetched for each day
const recipesForDay = ref([]);

// Mock backend API response to demonstrate dynamic data handling
const fetchRecipesForDays = async () => {
    try {
        const response = await fetch('http://localhost:3000/generate-meal-plan', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ uid: "FcjaGlsgX8XoznstAi25JSiN1du2" }), // Sending the uid in the request body
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error('Error:', errorData.message);
          alert(errorData.message);
          return;
        }

        // Get the meal plan from the backend response
        const weeklyMealPlan = await response.json();

        // Update recipesForDay with the data
        recipesForDay.value = weeklyMealPlan;
      } catch (error) {
        console.error('Request failed:', error);
        alert('There was an error generating the meal plan.');
      }

};

// View recipe handler
const viewRecipeHandler = (recipeId) => {
router.push(`/recipes/${recipeId}`); // Replace with actual route
};

// Fetch recipes when component is mounted
onMounted(fetchRecipesForDays);
</script>

<style scoped>
.meal-plan-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    padding: 20px;
}

.meal-plan-content {
    text-align: center;
    max-width: 600px;
    margin-bottom: 40px;
    padding: 40px;
    border-radius: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    margin-top: 30px;
}

.meal-plan-header {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
}

.title {
    font-size: 36px;
    font-weight: bold;
    color: #262522;
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

.description {
    font-size: 18px;
    color: #262522;
    opacity: 0.6;
    margin-bottom: 40px;
}

.generate-btn {
    background-color: #f29c33;
    color: #262522;
    font-size: 18px;
    font-weight: bold;
    padding: 12px 24px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.generate-btn:hover {
    background-color: #c47e2a;
}

.day-section {
    width: 100%;
    max-width: 1200px;
    margin: 20px 0;
}

.day-title {
    font-size: 24px;
    font-weight: bold;
    color: #262522;
    margin-bottom: 20px;
}

.cards-container {
    display: flex;
    gap: 20px;
    justify-content: center;
}
</style>
  