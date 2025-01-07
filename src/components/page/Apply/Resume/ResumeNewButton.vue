<template>
  <CommonButton @click="handlerNewResumeBtn">새 이력서 작성</CommonButton>
</template>

<script setup>
import { useResumeDetailCreateMutation } from "../../../../hook/apply/resume/useResumeDetailCreateMutation";
import CommonButton from "../../../common/CommonButton.vue";

const { mutate: handlerNewResumeBtn } = useResumeDetailCreateMutation();
</script>

<style></style>
