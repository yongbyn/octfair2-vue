<template>
  <InnerFrame :title="'자격증 및 외국어'" v-show="isShow || certList?.payload?.length">
    <p v-if="props.isShow" class="resumeDetail_guidetext">
      • 직무 관련 자격증, 외국어 자격증이나 수료한 교육 등이 있다면 간략히 작성해주세요. <br />
      • 지원하는 회사에서 요구하는 경우가 아니라면 운전면허증과 같은 자격증은 생략하는 것이 좋습니다!
    </p>
    <template v-for="(item, key) in certList?.payload" :key="key">
      <div class="cert_table">
        <div class="garo_wrapper_lr" style="grid-area: acqDate">
          <label class="resume_label">취득일:</label>
          <textarea class="resume_textarea" :value="item.acqDate.slice(0, 7)" placeholder="취득일" type="month" disabled />
        </div>
        <div class="garo_wrapper_lr" style="grid-area: certName">
          <label class="resume_label">자격증명:</label>
          <textarea class="resume_textarea" :value="item.certName" placeholder="자격증명" disabled />
        </div>
        <div class="garo_wrapper_lr" style="grid-area: grade">
          <label class="resume_label">등급:</label>
          <textarea class="resume_textarea" :value="item.grade" placeholder="등급" disabled />
        </div>
        <div class="garo_wrapper_lr" style="grid-area: issuer">
          <label class="resume_label">발행처:</label>
          <textarea class="resume_textarea" :value="item.issuer" placeholder="발행처" disabled />
        </div>
        <div class="garo_wrapper_r" style="grid-area: button">
          <CommonButton @click="handlerDeleteCertBtn({ resIdx: props.resume.resIdx, certIdx: item.certIdx })" v-if="props.isShow">삭제</CommonButton>
        </div>
      </div>
    </template>
    <button class="add_btn" @click="isAddCert = !isAddCert" style="border-radius: 5px; margin-bottom: 10px;" v-if="props.isShow">+ 추가</button>
    <div>
      <div class="cert_table" v-if="isAddCert && props.isShow">
        <div class="garo_wrapper_lr" style="grid-area: acqDate">
          <label class="resume_label">취득일:</label>
          <input class="resume_input" v-model=cert.acqDate id="acqDate" placeholder="취득일" type="month"></input>
        </div>
        <div class="garo_wrapper_lr" style="grid-area: certName">
          <label class="resume_label">자격증명:</label>
          <input class="resume_input" v-model=cert.certName id="certName" placeholder="자격증명"></input>
        </div>
        <div class="garo_wrapper_lr" style="grid-area: grade">
          <label class="resume_label">등급:</label>
          <input class="resume_input" v-model=cert.grade id="grade" placeholder="등급"></input>
        </div>
        <div class="garo_wrapper_lr" style="grid-area: issuer">
          <label class="resume_label">발행처:</label>
          <input class="resume_input" v-model=cert.issuer id="issuer" placeholder="발행처"></input>
        </div>
        <div class="garo_wrapper_r" style="grid-area: button">
          <CommonButton @click="handlerCreateCertBtn({ resIdx: props.resume.resIdx, cert: cert })">저장</CommonButton>
          <CommonButton @click="isAddCert = false">취소</CommonButton>
        </div>
      </div>
    </div>
  </InnerFrame>
</template>

<script setup>
import "@/components/page/Apply/Resume/ResumeStyle.css";
import { onActivated } from "vue";
import { useCertListReadQuery } from "../../../../../hook/apply/resume/cert/useCertListReadQuery";
import { useCertNewCreateMutation } from "../../../../../hook/apply/resume/cert/useCertNewCreateMutation";
import { useCertNewDeleteMutation } from "../../../../../hook/apply/resume/cert/useCertNewDeleteMutation";

const props = defineProps(["resume", "isShow"]);
const resIdx = ref("");
const certDefault = { acqDate: '', certName: '', grade: '', issuer: ''};
const cert = ref({ ...certDefault });
const isAddCert = ref(false);

const { data: certList } = useCertListReadQuery(resIdx);
const { mutate: handlerCreateCertBtn } = useCertNewCreateMutation();
const { mutate: handlerDeleteCertBtn } = useCertNewDeleteMutation();

watch(() => [props.resume.resIdx], () => {
  resIdx.value = props.resume.resIdx;
});

onActivated(() => {
  isAddCert.value = false;
  cert.value = { ...certDefault }
});
</script>

<style></style>
