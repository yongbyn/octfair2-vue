<template>
  <ContextBox>지원자 관리</ContextBox>
  <HireApplicantMain />
</template>

<script setup>
const providedValue = ref();
provide("providedValue", providedValue);
</script>
