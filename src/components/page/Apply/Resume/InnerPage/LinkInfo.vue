<template>
  <p class="resumeDetail_guidetext" v-if="props.isEditable">
    • 깃허브, 노션으로 작성한 포트폴리오, 구글 드라이브 파일 등 업무 성과를 보여줄 수 있는 링크가 있다면 작성해주세요. <br />
  </p>
  <input 
    v-model="props.resume.pfoLink" 
    :placeholder="props.isEditable ? '링크를 입력해 주세요.' : ''" 
    :disabled="!props.isEditable"
  ></input>
</template>

<script setup>
import "@/components/page/Apply/Resume/ResumeStyle.css";

const props = defineProps(["resume", "isEditable"]);
</script>

<style></style>
