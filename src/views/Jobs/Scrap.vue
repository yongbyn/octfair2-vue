<template>
  <ContextBox>스크랩</ContextBox>
  <ScrapSearch />
  <ScrapMain />
</template>

<script setup>
const providedValue = ref();
const selectedScrapIdxList = ref();
provide("providedValue", providedValue);
provide("selectedScrapIdxList", selectedScrapIdxList);
</script>
