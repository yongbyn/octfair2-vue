<template>
  <p class="resumeDetail_guidetext" v-if="props.isEditable">
    • 직무 관련 자격증, 외국어 자격증이나 수료한 교육 등이 있다면 간략히 작성해주세요. <br />
    • 지원하는 회사에서 요구하는 경우가 아니라면 운전면허증과 같은 자격증은 생략하는 것이 좋습니다!
  </p>
  <template v-for="(item, key) in certList?.payload" :key="key">
    <div class="cert_table">
      <div style="grid-area: acqDate; display: flex; justify-content: space-between; align-items: center;">
        <label style="text-align: left">취득일:</label>
        <input style="flex: 1" :value="item.acqDate.slice(0, 7)" placeholder="취득일" type="month" disabled></input>
      </div>
      <div style="grid-area: certName; display: flex; justify-content: space-between; align-items: center;">
        <label style="text-align: left">자격증명:</label>
        <input style="flex: 1" :value="item.certName" placeholder="자격증명" disabled></input>
      </div>
      <div style="grid-area: grade; display: flex; justify-content: space-between; align-items: center;">
        <label style="text-align: left">등급:</label>
        <input style="flex: 1" :value="item.grade" placeholder="등급" disabled></input>
      </div>
      <div style="grid-area: issuer; display: flex; justify-content: space-between; align-items: center;">
        <label style="text-align: left">발행처:</label>
        <input style="flex: 1" :value="item.issuer" placeholder="발행처" disabled></input>
      </div>
      <div style="grid-area: button; display: flex; justify-content: right; align-items: center;">
        <CommonButton @click="handlerDeleteCertBtn({ resIdx: props.resume.resIdx, certIdx: item.certIdx })" v-if="props.isEditable">삭제</CommonButton>
      </div>
    </div>
  </template>
  <button class="add_btn" @click="isAddCert = !isAddCert" style="border-radius: 5px; margin-bottom: 10px;" v-if="props.isEditable">+ 추가</button>
  <div>
    <div class="cert_table" v-if="isAddCert && props.isEditable">
      <div style="grid-area: acqDate; display: flex; justify-content: space-between; align-items: center;">
        <label style="text-align: left">취득일:</label>
        <input style="flex: 1" v-model=cert.acqDate placeholder="취득일" type="month"></input>
      </div>
      <div style="grid-area: certName; display: flex; justify-content: space-between; align-items: center;">
        <label style="text-align: left">자격증명:</label>
        <input style="flex: 1" v-model=cert.certName placeholder="자격증명"></input>
      </div>
      <div style="grid-area: grade; display: flex; justify-content: space-between; align-items: center;">
        <label style="text-align: left">등급:</label>
        <input style="flex: 1" v-model=cert.grade placeholder="등급"></input>
      </div>
      <div style="grid-area: issuer; display: flex; justify-content: space-between; align-items: center;">
        <label style="text-align: left">발행처:</label>
        <input style="flex: 1" v-model=cert.issuer placeholder="발행처"></input>
      </div>
      <div style="grid-area: button; display: flex; justify-content: right; align-items: center;">
        <CommonButton @click="{ handlerCreateCertBtn({ resIdx: props.resume.resIdx, cert: cert }); cert={ ...certDefault } }">저장</CommonButton>
        <CommonButton @click="isAddCert = false">취소</CommonButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import "@/components/page/Apply/Resume/ResumeStyle.css";
import { useCertListReadQuery } from "../../../../../hook/apply/resume/cert/useCertListReadQuery";
import { useCertNewCreateMutation } from "../../../../../hook/apply/resume/cert/useCertNewCreateMutation";
import { useCertNewDeleteMutation } from "../../../../../hook/apply/resume/cert/useCertNewDeleteMutation";

const props = defineProps(["resume", "isEditable"]);
const certDefault = { acqDate: '', certName: '', grade: '', issuer: ''};
const cert = ref({ ...certDefault });
const isAddCert = ref(false);

const { data: certList } = useCertListReadQuery(props.resume.resIdx);
const { mutate: handlerCreateCertBtn } = useCertNewCreateMutation();
const { mutate: handlerDeleteCertBtn } = useCertNewDeleteMutation();
</script>

<style></style>
