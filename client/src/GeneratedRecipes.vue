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

    <div v-for="day in days" :key="day" class="day-section">
    <h2 class="day-title">{{ day }}</h2>
    <div class="cards-container">
        <div v-for="n in 3" :key="n" class="card-placeholder">
        <!-- Replace this with actual card component -->
        <div class="card-content">Card {{ n }}</div>
        </div>
    </div>
    </div>
</div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goToMealPlanGenerator = () => {
router.push('/meal-plan');
};

const days = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];
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

.card-placeholder {
background-color: #f5f5f5;
border-radius: 12px;
padding: 20px;
text-align: center;
width: 300px;
box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.card-content {
font-size: 16px;
font-weight: bold;
color: #262522;
}
</style>
