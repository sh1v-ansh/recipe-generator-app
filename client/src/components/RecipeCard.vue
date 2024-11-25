<template>
    <div class="recipe-card">
        <img src="https://picsum.photos/id/102/300/200" alt="Recipe Image" class="recipe-image" />
        <div class="recipe-content">
            <h3 class="recipe-title">{{ title }}</h3>
            <p class="recipe-description">{{ description }}</p>
                <div class="recipe-tags">
                    <span v-for="tag in tags" :key="tag" class="recipe-tag">{{ tag }}</span>
                </div>
            <button @click="viewRecipe" class="view-recipe-button">View Recipe</button>
        </div>
    </div>
</template>

<script setup>
defineProps({
    title: String,
    description: String,
    image: String,
    tags: Array,
    recipeId: Number,
});

const emit = defineEmits(['view-recipe']);
const viewRecipe = () => {
    emit('view-recipe', recipeId);
};
</script>
  
<style scoped>
.recipe-card {
display: flex;
flex-direction: column;
align-items: flex-start;
background-color: #fff;
border-radius: 24px;
padding: 24px, 24px, 16px, 24px;
overflow: hidden;
box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.recipe-card:hover{
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}


.recipe-image {
width: 100%;
height: 150px;
object-fit: cover;
}

.recipe-content {
padding: 15px;
}

.recipe-title {
font-size: 18px;
margin-bottom: 5px;
}

.recipe-description {
font-size: 14px;
color: #666;
margin-bottom: 12px;
}

.recipe-tags {
display: flex;
gap: 5px;
margin-bottom: 10px;
}

.recipe-tag {
background-color: #f0ebd8;
color: #555;
font-size: 12px;
padding: 5px 8px;
border-radius: 5px;
}

.view-recipe-button {
background-color: #ee6352;
color: white;
border: none;
padding: 10px 15px;
border-radius: 5px;
cursor: pointer;
font-size: 14px;
}

.view-recipe-button:hover {
background-color: #d9534f;
}
</style>
  