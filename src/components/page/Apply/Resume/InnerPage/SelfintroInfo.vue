<template>
  <p class="resumeDetail_guidetext" v-if="props.isEditable">
    • 지원동기, 직무역량, 직무관련 성과와 경험, 포부 등 자유롭게 작성해 주세요.
    <br />
  </p>
  <textarea
    v-model="props.resume.perStatement"
    :placeholder="props.isEditable ? '자기소개서를 입력해 주세요.' : ''"
    :disabled="!props.isEditable"
  ></textarea>
</template>

<script setup>
import "@/components/page/Apply/Resume/ResumeStyle.css";

const props = defineProps(["resume", "isEditable"]);
</script>

<style></style>
