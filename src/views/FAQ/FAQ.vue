<template>
  <ContextBox>FAQ</ContextBox>
  <FAQSearch />
  <FAQMain />
</template>

<script setup>
import FAQMain from "../../components/page/FAQ/FAQMain.vue";
import FAQSearch from "../../components/page/FAQ/FAQSearch.vue";
const providedValue = ref();

provide("providedValue", providedValue);
</script>