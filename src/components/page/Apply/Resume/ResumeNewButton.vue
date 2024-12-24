<template>
  <CommonButton
    @click="() => $router.push('resume.do/new')"
    style="float: inline-end"
    >새 이력서 작성</CommonButton
  >
</template>

<script setup>
import CommonButton from "../../../common/CommonButton.vue";
</script>

<style></style>
