<template>
  <p class="resumeDetail_guidetext" v-if="props.isEditor">
    • 포트폴리오, 경력기술서 등 첨부파일이 있다면 등록해주세요. <br />
  </p>
  <div>
    <div v-if="!props.fileData && !props.resume.logicalPath && props.isEditor">
      <label htmlFor="fileInput" style="flex: 0 0 30px">파일 첨부</label>
      <input id="fileInput" type="file" @change="handlerSelectFileBtn" style="margin-bottom: 20px; border: 0px;"></input>
    </div>
    <div v-if="(props.fileData || props.resume.logicalPath) && props.isEditor" class="garo_wrapper_lr">
      <label style="flex: 1">파일명: {{ props.fileData?.name || props.resume.fileName }}</label>
      <CommonButton @click="{ handlerDeleteFileBtn(); props.fileData=null; fileImgSrc=null; props.resume.logicalPath=''; }">파일 삭제</CommonButton>
    </div>
    <p style="margin: 5px" />
    <div v-if="fileImgSrc || ['jpg', 'jpeg', 'png', 'bmp', 'webp', 'gif'].includes(props.resume.fileExt?.toLowerCase())">
      <a :href="fileImgSrc || props.resume.logicalPath" :download="props.fileData?.name || props.resume.fileName">
        <img :src="fileImgSrc || props.resume.logicalPath" class="resume_img" style="width: 100%"/>
      </a>
    </div>
  </div>
</template>

<script setup>
import "@/components/page/Apply/Resume/ResumeStyle.css";
import { useResumeFileDeleteMutation } from "../../../../../hook/apply/resume/useResumeFileDeleteMutation";
import { useResumeFileSelectMutation } from "../../../../../hook/apply/resume/useResumeFileSelectMutation";

const props = defineProps(["resume", "isEditor"]);
const emits = defineEmits(["fileChange"]);
const resIdx = ref("");
const fileData = ref("");
const fileImgSrc = ref("");

const { mutate: handlerSelectFileBtn } = useResumeFileSelectMutation(fileData, fileImgSrc);
const { mutate: handlerDeleteFileBtn } = useResumeFileDeleteMutation(resIdx);

watch(() => [props.resume.resIdx, fileData], () => {
  resIdx.value = props.resume.resIdx;
  emits('fileChange', fileData);
})
</script>

<style></style>
