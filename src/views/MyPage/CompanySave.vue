<template>
  <ContextBox>기업등록</ContextBox>
  <CompanySaveMain />
</template>

<script setup>
import CompanySaveMain from "../../components/page/MyPage/CompanySave.vue";
const providedValue = ref();
provide("providedValue", providedValue);
</script>
