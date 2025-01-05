<template>
    <ContextBox>회원탈퇴</ContextBox>
    <Withdraw />
</template>

<script setup>
import Withdraw from "../../components/page/MyPage/WithdrawMain.vue";
const providedValue = ref();
provide("providedValue", providedValue);
</script>
