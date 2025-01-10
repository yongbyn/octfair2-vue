<template>
  <ContextBox>이력서</ContextBox>
  <br />

  <div id="print-area">
    <ApplyInfo :resume="resume" :isShow="isShow" />
    <ShortintroInfo :resume="resume" :isShow="isShow" />
    <CareerList :resume="resume" :isShow="isShow" />
    <EduList :resume="resume" :isShow="isShow" />
    <SkillList :resume="resume" :isShow="isShow" />
    <CertList :resume="resume" :isShow="isShow" />
    <LinkInfo :resume="resume" :isShow="isShow" />
    <SelfintroInfo :resume="resume" :isShow="isShow" />

    <InnerFrame v-if="isShow || (fileData || resume.logicalPath)" :title="'첨부파일'">
      <p v-if="isShow" class="resumeDetail_guidetext">
        • 포트폴리오, 경력기술서 등 첨부파일이 있다면 등록해주세요. <br />
      </p>
      <div>
        <div v-if="isShow && (!fileData && !resume.logicalPath)">
          <label class="resume_label" htmlFor="fileInput" style="flex: 0 0 30px">파일 첨부</label>
          <input class="resume_input" id="fileInput" type="file" @change="handlerSelectFileBtn" style="margin-bottom: 20px; border: 0px;"></input>
        </div>
        <div v-if="(fileData || resume.logicalPath)" class="garo_wrapper_lr">
          <label class="resume_label" style="flex: 1">파일명: {{ fileData?.name || resume.fileName }}</label>
          <CommonButton v-if="isShow" @click="{ handlerDeleteFileBtn(); fileData=null; fileImgSrc=null; resume.logicalPath=''; }">파일 삭제</CommonButton>
        </div>
        <p style="margin: 5px" />
        <div v-if="fileImgSrc || ['jpg', 'jpeg', 'png', 'bmp', 'webp', 'gif'].includes(resume.fileExt?.toLowerCase())">
          <a :href="fileImgSrc || resume.logicalPath" :download="fileData?.name || resume.fileName">
            <img :src="fileImgSrc || resume.logicalPath" class="resume_img" style="width: 100%"/>
          </a>
        </div>
      </div>
    </InnerFrame>

    <div class="resumeDetail_endLine" />
    <div class="resumeDetail_endButtons" v-show="isPrint">
      <CommonButton @click="handlerBackBtn">목록으로</CommonButton>
      <CommonButton @click="{handlerUpdateResumeBtn(); handlerBackBtn();}" v-if="isEditor">저장하기</CommonButton>
      <CommonButton @click="handlerPreviewBtn" v-if="isEditor">{{ isPreview ? "미리보기" : "미리보기 종료" }}</CommonButton>
      <CommonButton @click="handlerPrintBtn" v-if="true">인쇄하기</CommonButton>
    </div>
  </div>
</template>

<script setup>
import "@/components/page/Apply/Resume/ResumeStyle.css";
import printJS from "print-js";
import { onActivated, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useResumeDetailReadQuery } from "../../../../hook/apply/resume/useResumeDetailReadQuery";
import { useResumeDetailUpdateMutation } from "../../../../hook/apply/resume/useResumeDetailUpdateMutation";
import { useResumeFileDeleteMutation } from "../../../../hook/apply/resume/useResumeFileDeleteMutation";
import { useResumeFileSelectMutation } from "../../../../hook/apply/resume/useResumeFileSelectMutation";
import { useModalStore } from "../../../../stores/modalState";
import CommonButton from "../../../common/CommonButton.vue";

const modalStore = useModalStore();
const props = defineProps(["resIdx", "modalReculsiveCnt"]);
const route = useRoute();
const router = useRouter();
const resIdx = ref("");
const resumeDefault = { userIdx: "", resIdx: "", resTitle: "", userNm: "", email: "", phone: "", shortIntro: "", pfoLink: "", perStatement: "", fileName: "", fileExt: "", logicalPath: "" };
const resume = ref({ ...resumeDefault });
const fileImgSrc = ref("");
const fileData = ref("");

const isEditor = ref(true);
const isPreview = ref(true);
const isPrint = ref(true);
const isShow = computed(() => (isEditor.value && isPreview.value && isPrint.value ? true : false));

const { data: resumeDetail } = useResumeDetailReadQuery(resIdx, resume, isEditor);
const { mutate: handlerUpdateResumeBtn } = useResumeDetailUpdateMutation(resIdx, resume, fileData);
const { mutate: handlerSelectFileBtn } = useResumeFileSelectMutation(fileData, fileImgSrc);
const { mutate: handlerDeleteFileBtn } = useResumeFileDeleteMutation(resIdx);

const handlerPreviewBtn = () => {
  isPreview.value = !isPreview.value;
};

const handlerPrintBtn = () => {
  isPrint.value = false;

  setTimeout(() => {
    printJS({
      printable: "print-area", // 인쇄할 영역의 id
      type: "html", // 인쇄할 내용의 형식 (html 형식)
      targetStyles: ["*"], // 스타일을 모두 적용 (스타일을 포함하여 인쇄)
      maxWidth: "100%", // 인쇄할 내용의 최대 너비 설정
    });

    isPrint.value = true;
  }, 100);
};

const handlerBackBtn = () => {
  if (modalStore.modalState) modalStore.modalState = false;
  else router.go(-1);
};

onMounted(() => {
  resIdx.value = props.resIdx || route.query.resIdx;
});

onActivated(() => {
  resIdx.value = props.resIdx || route.query.resIdx;
  fileImgSrc.value = "";
  fileData.value = "";
});
</script>

<style lang="scss" scoped></style>
