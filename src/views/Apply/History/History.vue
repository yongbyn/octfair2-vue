<template>
  <ContextBox>입사지원 내역</ContextBox>
  <HistorySearch style="float: inline-end; margin: 10.5px" />
  <HistoryMain />
</template>

<script setup>
const providedHistorySearchValue = ref({});
provide("providedHistorySearchValue", providedHistorySearchValue);
</script>

<style scoped></style>
