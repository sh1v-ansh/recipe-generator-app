<template>
  <div class="recipe-card">
    <h3>{{ recipe.name }}</h3>
    <p>{{ recipe.description }}</p>
    <p>Ingredients: {{ recipe.ingredients.join(', ') }}</p>
    <p>Tags: {{ recipe.tags.join(', ') }}</p>
  </div>
</template>

<script>
  export default {
    props: {
      recipe: Object
    }
  }
</script>

<style scoped>
.recipe-card {
  border: 1px solid #000000;
  border-radius: 25px;
  padding: 1em;
  margin: 0.5em 0;
  box-shadow: 3px 3px 3px gray;
}
</style>
