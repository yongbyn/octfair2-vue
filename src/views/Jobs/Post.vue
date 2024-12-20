<template>
  <ContextBox>채용 공고</ContextBox>
  <PostSearch />
  <PostMain />
</template>

<script setup>
const providedValue = ref();

provide("providedValue", providedValue);
</script>
