<template>
  <div class="hero-section">
    <div class="tag">CHEFS</div>
    <h1 class="hero-title">EXPLORE OTHER COOKS</h1>
    <p class="hero-subtitle">
      Meet other chefs creating masterpieces and changing people's plate one dish at a time.
    </p>
  </div>
  <div class="profile-card-container">
      <ProfileCard
        v-for="chef in paginatedChefs"
        :key="chef.profileId"
        :name="chef.name"
        :description="chef.description"
        :background="chef.background"
        :profilePicture="chef.profilePicture"
        @click.native="navigateToProfile(chef.profileId)"

      />
    </div>
  <div class="pagination">
    <button
      class="prev-next"
      :disabled="currentPage.value === 1"
      @click="prevPage"
    >
      Previous
    </button>
    <button
      v-for="page in totalPages"
      :key="page"
      :class="{ active: currentPage.value === page }"
      @click="changePage(page)"
    >
      {{ page }}
    </button>
    <button
      class="prev-next"
      :disabled="currentPage.value === totalPages.value"
      @click="nextPage"
    >
      Next
    </button>
  </div>
</template>

<script setup lang="ts">
import ProfileCard from './components/ProfileCard.vue';
import { reactive, computed, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const chefs = reactive([
  {
    profileId: 'isabella-russo',
    name: 'Isabella Russo',
    description: 'An Italian chef with a passion for fresh ingredients...',
    background: 'efinen.jpg',
    profilePicture: 'isabella-russo.jpg',
  },
  {
    profileId: 'gordon-ramsay',
    name: 'Gordon Ramsay',
    description: 'World-renowned Michelin-star chef. Follow me for more content and interesting stuff.',
    background: 'efinen.jpg',
    profilePicture: 'gordon-ramsay.jpg',
  },
]);

//add fetch profiles

const currentPage = ref(1);
const profilesPerPage = 6; //Change as needed

const totalPages = computed(() => Math.ceil(chefs.length / profilesPerPage));
const paginatedChefs = computed(() => {
  const start = (currentPage.value - 1) * profilesPerPage;
  const end = start + profilesPerPage;
  return chefs.slice(start, end);
});

const changePage = (page: number) => {
  currentPage.value = page;
  console.log('Current page:', currentPage.value);
  console.log(totalPages.value);
  console.log(page)
};
const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value -= 1;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value += 1;
  }
};

const navigateToProfile = (profileId: string) => {
  router.push(`/chefs/${profileId}`);
};

</script>

<style scoped>
.hero-section {
  text-align: center;
  padding: 30px;
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

h1 {
  font-size: 1.5em;
  margin: 10px 0;
}

.hero-title {
  font-size: 36px;
  padding: 12px;
  font-weight: 800;
  color: #262522;
  margin: 0;
}

.hero-subtitle {
  font-size: 16px;
  color: #262522;
  opacity: 0.60;
  margin-top: 0px;
  margin-bottom: 0px;
}

.profile-card-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr); 
  gap: 20px;
  padding: 20px;
}

.pagination {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
  margin-bottom: 20px;
}

.pagination button {
  padding: 10px 15px;
  border-radius: 5px;
  border: 1px solid #ddd;
  background-color: #f9f9f9;
  cursor: pointer;
}

.pagination button.active {
  background-color: #ee6352;
  border-color: #ee6352;
}

.pagination button:hover {
  background-color: #d9534f;
  color: white;
}

.pagination .prev-next {
  padding: 10px 15px;
  border-radius: 5px;
  border: 1px solid #ddd;
  background-color: #f9f9f9;
  cursor: pointer;
}

.pagination .prev-next:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.pagination .prev-next:hover:not(:disabled) {
  background-color: #d9534f;
  color: white;
}

</style>
