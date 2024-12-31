<template>
  <div v-if="!modalStore.modalState">
    <ContextBox>이력서 작성</ContextBox>
    <br />
  </div>
  <div id="print-area">
    <InnerFrame :title="'인적사항'">
      <ApplyInfo :resume="resume" :isEditor="isEditor" />
    </InnerFrame>
    <InnerFrame :title="'간단소개글'" v-show="exceptWhenPreview || resume.shortIntro">
      <ShortintroInfo :resume="resume" :isEditor="isEditor" />
    </InnerFrame>
    <InnerFrame :title="'경력'">
      <CareerList :resume="resume" :isEditor="isEditor" />
    </InnerFrame>
    <InnerFrame :title="'학력'">
      <EduList :resume="resume" :isEditor="isEditor" />
    </InnerFrame>
    <InnerFrame :title="'스킬'">
      <SkillList :resume="resume" :isEditor="isEditor" />
    </InnerFrame>
    <InnerFrame :title="'자격증 및 외국어'">
      <CertList :resume="resume" :isEditor="isEditor" />
    </InnerFrame>
    <InnerFrame :title="'링크'" v-show="exceptWhenPreview || resume.pfoLink">
      <LinkInfo :resume="resume" :isEditor="isEditor" />
    </InnerFrame>
    <InnerFrame :title="'자기소개서'" v-show="exceptWhenPreview || resume.perStatement">
      <SelfintroInfo :resume="resume" :isEditor="isEditor" />
    </InnerFrame>

    <InnerFrame :title="'첨부파일'">
      <p class="resumeDetail_guidetext" v-if="isEditor">
        • 포트폴리오, 경력기술서 등 첨부파일이 있다면 등록해주세요. <br />
      </p>
      <div>
        <div v-if="!fileData && !resume.logicalPath && isEditor">
          <label htmlFor="fileInput" style="flex: 0 0 30px">파일 첨부</label>
          <input id="fileInput" type="file" @change="handlerSelectFileBtn" style="margin-bottom: 20px; border: 0px;"></input>
        </div>
        <div v-if="(fileData || resume.logicalPath) && isEditor" class="garo_wrapper_lr">
          <label style="flex: 1">파일명: {{ fileData?.name || resume.fileName }}</label>
          <CommonButton @click="{ handlerDeleteFileBtn(); fileData=null; fileImgSrc=null; resume.logicalPath=''; }">파일 삭제</CommonButton>
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
    <div class="resumeDetail_endButtons" v-show="!exceptWhenPrint">
      <CommonButton @click="handlerBackBtn">목록으로</CommonButton>
      <CommonButton @click="{handlerBackBtn(); handlerUpdateResumeBtn();}" v-if="isEditor">저장하기</CommonButton>
      <CommonButton @click="exceptWhenPreview=!exceptWhenPreview">{{ exceptWhenPreview ? "미리보기" : "미리보기 취소" }}</CommonButton>
      <CommonButton @click="handlerPrintBtn" v-if="true">인쇄하기</CommonButton>
    </div>
  </div>
</template>

<script setup>
import "@/components/page/Apply/Resume/ResumeStyle.css";
import printJS from "print-js";
import { onMounted } from "vue";
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
const isEditor = ref(true);
const exceptWhenPreview = ref(true);
const exceptWhenPrint = ref(false);
const fileImgSrc = ref("");
const fileData = ref("");

const { data: resumeDetail } = useResumeDetailReadQuery(resIdx, resume, isEditor, exceptWhenPreview);
const { mutate: handlerUpdateResumeBtn } = useResumeDetailUpdateMutation(resIdx, resume, fileData);
const { mutate: handlerSelectFileBtn } = useResumeFileSelectMutation(fileData, fileImgSrc);
const { mutate: handlerDeleteFileBtn } = useResumeFileDeleteMutation(resIdx);

const handlerPrintBtn = () => {
  const savedEditable = isEditor.value;
  isEditor.value = false;
  exceptWhenPrint.value = true;

  setTimeout(() => {
    printJS({
      printable: "print-area", // 인쇄할 영역의 id
      type: "html", // 인쇄할 내용의 형식 (html 형식)
      targetStyles: ["*"], // 스타일을 모두 적용 (스타일을 포함하여 인쇄)
      maxWidth: "100%", // 인쇄할 내용의 최대 너비 설정
    });

    exceptWhenPrint.value = false;
    isEditor.value = savedEditable;
  }, 100);
};

const handlerBackBtn = () => {
  if (modalStore.modalState) modalStore.modalState = false;
  else router.go(-1);
};

onMounted(() => {
  resIdx.value = props.resIdx || route.query.resIdx;
});
</script>

<style lang="scss" scoped></style>
