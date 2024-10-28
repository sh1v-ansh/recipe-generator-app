<template>
    <div>
        <label>Filter by keyword:</label>
        <input v-model="keyword" @input="$emit('update-filter', keyword)" />
    </div>
</template>
  
<script>
    export default {
        data() {
            return {
            keyword: ''
            };
        }
    }
</script>
  