<template>
  <ContextBox>기업등록</ContextBox>
  <CompanyRegisterMain />
</template>

<script setup>
import CompanyRegisterMain from "../../components/page/MyPage/CompanyRegister.vue";
const providedValue = ref();
provide("providedValue", providedValue);
</script>
