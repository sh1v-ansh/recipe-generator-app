<template>
    <div class="recipe-card">
        <img src="https://picsum.photos/id/102/300/200" alt="Recipe Image" class="recipe-image" />
        <img
            v-for="(tag, index) in tags"
            :key="tag"
            :src="iconMap[tag]"
            :alt="`Icon for ${tag}`"
            :style="{ right: `${index * 30}px`, zIndex: `${tags.length - index}` }"
            class="recipe-icon"
        />
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
import wheatIcon from '../assets/icons/wheat.png';
import dairyIcon from '../assets/icons/dairy.png';
import nutsIcon from '../assets/icons/nuts.png';
import shellfishIcon from '../assets/icons/shellfish.png';
import soyIcon from '../assets/icons/soy.png';
import fishIcon from '../assets/icons/fish.png';
import diabeticIcon from '../assets/icons/diabetic.png'
import peanutsIcon from '../assets/icons/peanuts.png';
import eggsIcon from '../assets/icons/eggs.png';
import ketoIcon from '../assets/icons/keto.png';
import paleoIcon from '../assets/icons/paleo.png';
import vegetarianIcon from '../assets/icons/vegetarian.png';
import veganIcon from '../assets/icons/vegan.png';
import pescatarianIcon from '../assets/icons/pescatarian.png';

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

const iconMap = {
  Wheat: wheatIcon,
  Dairy: dairyIcon,
  Nuts: nutsIcon,
  Shellfish: shellfishIcon,
  Soy: soyIcon,
  Fish: fishIcon,
  Diabetic: diabeticIcon,
  Peanuts: peanutsIcon,
  Eggs: eggsIcon,
  Keto: ketoIcon,
  Paleo: paleoIcon,
  Vegetarian: vegetarianIcon,
  Vegan: veganIcon,
  Pescatarian: pescatarianIcon,
};

</script>

<style scoped>
.recipe-card {
display: flex;
position: relative;
flex-direction: column;
align-items: flex-start;
background-color: #fff;
border-radius: 24px;
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
    display: block;
}


.recipe-icon {
    position: absolute;
    width: 50px;
    height: 50px;
    top: 120px;
    margin: 0px 10px;
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
  