<template>
  <div id="print-area">
    <InnerFrame :title="'인적사항'">
      <ApplyInfo :resume="resume" :isEditable="isEditable" />
    </InnerFrame>
    <InnerFrame :title="'간단소개글'">
      <ShortintroInfo :resume="resume" :isEditable="isEditable" />
    </InnerFrame>
    <InnerFrame :title="'경력'"
      ><CareerList :resume="resume" :isEditable="isEditable" />
    </InnerFrame>
    <InnerFrame :title="'학력'">
      <EduList :resume="resume" :isEditable="isEditable" />
    </InnerFrame>
    <InnerFrame :title="'스킬'">
      <SkillList :resume="resume" :isEditable="isEditable" />
    </InnerFrame>
    <InnerFrame :title="'자격증 및 외국어'">
      <CertList :resume="resume" :isEditable="isEditable" />
    </InnerFrame>
    <InnerFrame :title="'링크'">
      <LinkInfo :resume="resume" :isEditable="isEditable" />
    </InnerFrame>
    <InnerFrame :title="'자기소개서'">
      <SelfintroInfo :resume="resume" :isEditable="isEditable" />
    </InnerFrame>
    <InnerFrame :title="'첨부파일'">
      <FileInfo
        :resume="resume"
        :isEditable="isEditable"
        :fileData="fileData"
      />
    </InnerFrame>

    <div class="resumeDetail_endLine" />
    <div class="resumeDetail_endButtons" v-if="isPrintable">
      <CommonButton @click="handlerBackBtn()">목록으로</CommonButton>
      <CommonButton
        @click="
          {
            handlerUpdateResumeBtn();
            handlerBackBtn();
          }
        "
        v-if="isEditable"
        >저장하기</CommonButton
      >
      <CommonButton
        @click="modalStore.modalState = true"
        v-if="!modalStore.modalState"
        >미리보기</CommonButton
      >
      <CommonButton @click="handlerPrintBtn()" v-if="true"
        >인쇄하기</CommonButton
      >
    </div>
  </div>
</template>

<script setup>
import "@/components/page/Apply/Resume/ResumeStyle.css";
import { onMounted } from "vue";
import { useModalStore } from "../../../../stores/modalState";
import { useRoute, useRouter } from "vue-router";
import { useResumeDetailReadQuery } from "../../../../hook/apply/resume/useResumeDetailReadQuery";
import { useResumeDetailUpdateMutation } from "../../../../hook/apply/resume/useResumeDetailUpdateMutation";
import CommonButton from "../../../common/CommonButton.vue";
import printJS from "print-js";

const modalStore = useModalStore();
const props = defineProps(["resIdx"]);
const route = useRoute();
const router = useRouter();
const resIdx = ref("");
const isEditable = ref(true);
const isPrintable = ref(true);
const resumeDefault = {
  userIdx: "",
  resIdx: "",
  resTitle: "",
  userNm: "",
  email: "",
  phone: "",
  shortIntro: "",
  pfoLink: "",
  perStatement: "",
  fileName: "",
  fileExt: "",
  logicalPath: "",
};
const resume = ref({ ...resumeDefault });
const fileData = ref(null);

const { data: resumeDetail } = useResumeDetailReadQuery(
  resIdx,
  resume,
  isEditable
);
const { mutate: handlerUpdateResumeBtn } = useResumeDetailUpdateMutation(
  resIdx,
  resume,
  fileData
);

const handlerPrintBtn = () => {
  const savedEditable = isEditable.value;
  isEditable.value = false;
  isPrintable.value = false;
  setTimeout(() => {
    printJS({
      printable: "print-area", // 인쇄할 영역의 id
      type: "html", // 인쇄할 내용의 형식 (html 형식)
      targetStyles: ["*"], // 스타일을 모두 적용 (스타일을 포함하여 인쇄)
      maxWidth: "100%", // 인쇄할 내용의 최대 너비 설정
    });
    isPrintable.value = true;
    isEditable.value = savedEditable;
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
