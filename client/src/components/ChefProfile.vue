<template>
  <div class="chef-profile">
    <div class="hero-section">
      <div class="title-introduction">
        <h1 class="chef-title">About This <br>Chef</h1>
        <p class="chef-introduction">{{ chef?.introduction }}</p>
      </div>
    </div>
    <div class="about-section">
      <img src="../assets/Chef_image.jpg" alt="Chef Image" class="profile-image" />
      <div class="profile-header">
        <h1 class="chef-name">{{ chef?.name }}</h1>
        <p class="bio">{{ chef?.description }}</p>
        <p class="bio">Warmest regards,</p>
        <div class="signature">
          <p class="chef-signature">{{ chef?.name }}</p>
      </div>
    </div>
    </div>
    <section class="featured-recipes">
      <h2>Featured Recipes by {{ chef?.name }}</h2>
      <div v-for="recipe in chef?.recipes" :key="recipe.id" class="recipe-card">
        <img :src="recipe.image" alt="Recipe Image" />
        <h3>{{ recipe.title }}</h3>
        <p>{{ recipe.summary }}</p>
        <button @click="viewRecipe(recipe.id)">View Recipe</button>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const chef = ref(null);

//Function to fetch the chef data dynamically based on profileId
const fetchChefData = async (profileId: string) => {
  try {
    //Replace with actual API or mock data fetch
    const mockData = {
      'isabella-russo': {
        name: 'Isabella Russo',
        image: 'path/to/isabella-image.jpg',
        introduction: 'Bonjour and welcome to my kitchen...',
        description: 'An Italian chef with a passion for fresh ingredients...hr khw kw ekfjbwkjebfjkwbekfjbwkejfbkw efk wekfjbwej fkjw ejkf wke fjw ekjf wjef jwo efjo wejofnjwoenfjonwejof  f weofnwefbwoje f woeujfnwoe fweojfnw fojwnef',
        recipes: [
          {
            id: 203889,
            title: 'Savory Herb-Infused Chicken',
            summary: 'Indulge in the rich and savory symphony...',
            image: 'path/to/recipe1.jpg',
          },
        ],
      },
      'gordon-ramsay': {
        name: 'Gordon Ramsay',
        image: 'path/to/gordon-image.jpg',
        introduction: 'Welcome to my culinary world...',
        description: 'World-renowned Michelin-star chef.',
        recipes: [
          {
            id: 2,
            title: 'Classic Beef Wellington',
            summary: 'A classic dish full of flavors...',
            image: 'path/to/recipe2.jpg',
          },
        ],
      },
    };

    chef.value = mockData[profileId] || null;
  } catch (error) {
    console.error('Error fetching chef data:', error);
  }
};

// Watch for changes in the route and update the chef data accordingly
watch(() => route.params.profileId, (newProfileId) => {
  fetchChefData(newProfileId);
});

onMounted(() => {
  const profileId = route.params.profileId as string;
  fetchChefData(profileId);
});

const viewRecipe = (recipeId: number) => {
  router.push(`/recipes/${recipeId}`);
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600;700&display=swap');

.title-introduction {
  display: flex;
  align-items: center;
  gap: 20px; 
}
.about-section{
  display: flex;
  border-radius: 32px;
  border: 1px solid rgba(38, 37, 34, 0.24);
  gap: 40px;
}

.chef-title {
  font-size: 5vw;
  width: 50%;
  margin: 0px;
}
.chef-name{
  text-align: left;
}
.bio{
  text-align: left;
  margin-bottom: 0px;
  color:rgba(51, 51, 51, 0.60);
}

.chef-introduction {
  font-size: 1em;
  margin: 0;
  color: rgba(38, 37, 34, 0.60);
  width: 50%;
}


.signature {
  text-align: left;
}

.chef-signature {
  font-family: 'Dancing Script', cursive;
  font-size: 21px;
  letter-spacing: 0.21px;
  color: #262522;
  font-style: normal;
  margin: 6px 0px;
}

.hero-section{
  margin: 48px 64px 48px 64px;
  text-align: left;
}

.chef-profile {
  padding: 20px;
}

.profile-header {
  text-align: center;
  margin-bottom: 20px;
  
}

.profile-image {
  width: 620px;
  height: 480px;
  border-radius: 12px;

}

.featured-recipes {
  margin-top: 30px;
}

.recipe-card {
  margin: 10px 0;
  border: 1px solid rgba(38, 37, 34, 0.24);
  border-radius: 32px;
  padding: 10px;
}
</style>
