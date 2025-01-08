<template>
  <div class="garo_wrapper">
    <label class="resume_label">제목: </label>
    <input
      class="resume_input"
      v-model="props.resume.resTitle"
      :disabled="!props.isShow"
    />
  </div>
  <div class="garo_wrapper">
    <label class="resume_label">이름: </label>
    <input class="resume_input" v-model="props.resume.userNm" disabled />
  </div>
  <div class="garo_wrapper">
    <label class="resume_label">이메일: </label>
    <input class="resume_input" v-model="props.resume.email" disabled />
  </div>
  <div class="garo_wrapper">
    <label class="resume_label">전화번호: </label>
    <input class="resume_input" v-model="props.resume.phone" disabled />
  </div>
</template>

<script setup>
import "@/components/page/Apply/Resume/ResumeStyle.css";

const props = defineProps(["resume", "isShow"]);
</script>

<style></style>
