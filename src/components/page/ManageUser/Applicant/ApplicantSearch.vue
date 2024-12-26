<template>
  <div class="search-box">
    <input v-model.lazy="keyword" />
    <button>검색</button>
  </div>
</template>

<script setup>
const keyword = ref("");
</script>

<style lang="scss" scoped></style>
