<template>
    <ContextBox>회원정보수정</ContextBox>
    <MyPageMain />
</template>

<script setup>
import MyPageMain from "../../components/page/MyPage/MyPageMain.vue";
const providedValue = ref();
provide("providedValue", providedValue);
</script>
