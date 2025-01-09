<template>
  <ContextBox>공고 심사</ContextBox>
  <ApprovalPostSearch />
  <ApprovalPostMain />
</template>

<script setup>
const providedValue = ref();
provide("providedValue", providedValue);
</script>
