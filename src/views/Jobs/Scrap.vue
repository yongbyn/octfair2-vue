<template>
  <ContextBox>스크랩</ContextBox>
  <ScrapSearch />
  <ScrapMain />
</template>

<script setup>
const providedValue = ref();
const selectedScrapIdx = ref();
provide("providedValue", providedValue);
provide("selectedScrapIdx", selectedScrapIdx);
</script>
