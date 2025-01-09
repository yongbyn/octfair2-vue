<template>
  <ContextBox>회원탈퇴</ContextBox>
  <WithdrawMain />
</template>

<script setup>
import WithdrawMain from "../../components/page/MyPage/WithdrawMain.vue";

const providedValue = ref();
provide("providedValue", providedValue);
</script>
