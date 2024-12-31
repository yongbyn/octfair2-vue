<template>
  <HistorySearch />
  <ContextBox>입사지원 내역</ContextBox>
  <HistoryMain />
</template>

<script setup>
const providedHistorySearchValue = ref({});
provide("providedHistorySearchValue", providedHistorySearchValue);
</script>

<style scoped></style>
