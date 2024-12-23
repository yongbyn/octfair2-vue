<template>
  <ContextBox>공고 관리</ContextBox>
  <HirePostMain />
</template>

<script setup>
const providedValue = ref();
provide("providedValue", providedValue);
</script>
