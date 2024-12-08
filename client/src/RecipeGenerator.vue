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
  Generate
</button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goToMealPlanGenerator = () => {
  router.push('/meal-plan')
};
</script>

<style scoped>
.meal-plan-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(72vh);
}

.meal-plan-content {
  text-align: center;
  max-width: 600px;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.meal-plan-header {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.logo {
  width: 30px;
  height: 30px;
  margin-right: 10px;
}

.title {
  font-size: 36px;
  font-weight: bold;
  color: #262522;
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

.description {
  font-size: 18px;
  color: #262522;
  opacity: 0.6;
  margin-bottom: 40px;
}

.generate-btn {
  background-color: #9FDC26;
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
  background-color: #81B218;
}
</style>