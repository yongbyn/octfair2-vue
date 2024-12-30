<template>
  <p class="resumeDetail_guidetext" v-if="props.isEditable">
    • 담당하신 업무 중 우선순위가 높은 업무를 선별하여 최신순으로 작성해주세요. <br />
    • 신입의 경우, 직무와 관련된 대외활동, 인턴, 계약직 경력 등이 있다면 작성해주세요. <br />
    • 업무 또는 활동 시 담당했던 역할과 과정, 성과에 대해 자세히 작성해주세요. <br />
    • 현재 재직중이면 퇴사일을 해당월로 입력해주세요.
  </p>
  {{ careerList }}
  <template v-for="(item, key) in careerList?.payload" :key="key">
    <div class="career_table">
      <div style="grid-area: startDate; display: flex; justify-content: space-between; align-items: center;">
        <label style="text-align: left">입사일:</label>
        <input style="flex: 1" :value="item.startDate.slice(0, 7)" placeholder="입사일" type="month" disabled></input>
      </div>
      <div style="grid-area: company; display: flex; justify-content: space-between; align-items: center;">
        <label style="text-align: left">회사명:</label>
        <input style="flex: 1" :value="item.company" placeholder="회사명" disabled></input>
      </div>
      <div style="grid-area: dept; display: flex; justify-content: space-between; align-items: center;">
        <label style="text-align: left">부서명:</label>
        <input style="flex: 1" :value="item.dept" placeholder="부서명" disabled></input>
      </div>
      <div style="grid-area: endDate; display: flex; justify-content: space-between; align-items: center;">
        <label style="text-align: left">퇴사일:</label>
        <input style="flex: 1" :value="item.endDate.slice(0, 7)" placeholder="퇴사일" type="month" disabled></input>
      </div>
      <div style="grid-area: position; display: flex; justify-content: space-between; align-items: center;">
        <label style="text-align: left">직급/직책:</label>
        <input style="flex: 1" :value="item.position" placeholder="직급/직책" disabled></input>
      </div>
      <div style="grid-area: reason; display: flex; justify-content: space-between; align-items: center;">
        <label style="text-align: left">퇴사사유:</label>
        <input style="flex: 1" :value="item.reason" placeholder="퇴사사유" disabled></input>
      </div>
      <div style="grid-area: crrDesc; display: flex; justify-content: space-between; align-items: center;">
        <label style="text-align: left">담당업무:</label>
        <textarea style="flex: 1" :value="item.crrDesc" placeholder="담당업무" disabled></textarea>
      </div>
      <div style="grid-area: button; display: flex; justify-content: right; align-items: center;">
        <CommonButton @click="handlerDeleteCareerBtn({ resIdx: props.resume.resIdx, crrIdx: item.crrIdx })" v-if="props.isEditable">삭제</CommonButton>
      </div>
    </div>
  </template>
  <button class="add_btn" @click="isAddCareer = !isAddCareer" style="border-radius: 5px; margin-bottom: 10px;" v-if="props.isEditable">+ 추가</button>
  <div>
    <div class="career_table" v-if="isAddCareer && props.isEditable">
      <div style="grid-area: startDate; display: flex; justify-content: space-between; align-items: center;">
        <label style="text-align: left">입사일:</label>
        <input style="flex: 1" v-model=career.startDate placeholder="입사일" type="month"></input>
      </div>
      <div style="grid-area: company; display: flex; justify-content: space-between; align-items: center;">
        <label style="text-align: left">회사명:</label>
        <input style="flex: 1" v-model=career.company placeholder="회사명"></input>
      </div>
      <div style="grid-area: dept; display: flex; justify-content: space-between; align-items: center;">
        <label style="text-align: left">부서명:</label>
        <input style="flex: 1" v-model=career.dept placeholder="부서명"></input>
      </div>
      <div style="grid-area: endDate; display: flex; justify-content: space-between; align-items: center;">
        <label style="text-align: left">퇴사일:</label>
        <input style="flex: 1" v-model=career.endDate placeholder="퇴사일" type="month"></input>
      </div>
      <div style="grid-area: position; display: flex; justify-content: space-between; align-items: center;">
        <label style="text-align: left">직급/직책:</label>
        <input style="flex: 1" v-model=career.position placeholder="직급/직책"></input>
      </div>
      <div style="grid-area: reason; display: flex; justify-content: space-between; align-items: center;">
        <label style="text-align: left">퇴사사유:</label>
        <input style="flex: 1" v-model=career.reason placeholder="퇴사사유"></input>
      </div>
      <div style="grid-area: crrDesc; display: flex; justify-content: space-between; align-items: center;">
        <label style="text-align: left">담당업무:</label>
        <textarea style="flex: 1" v-model=career.crrDesc placeholder="담당업무"></textarea>
      </div>
      <div style="grid-area: button; display: flex; justify-content: right; align-items: center;">
        <CommonButton @click="{ handlerCreateCareerBtn({ resIdx: props.resume.resIdx, career: career }); career={ ...careerDefault } }">저장</CommonButton>
        <CommonButton @click="isAddCareer = false">취소</CommonButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import "@/components/page/Apply/Resume/ResumeStyle.css";
import { useCareerListReadQuery } from "../../../../../hook/apply/resume/career/useCareerListReadQuery";
import { useCareerNewCreateMutation } from "../../../../../hook/apply/resume/career/useCareerNewCreateMutation";
import { useCareerNewDeleteMutation } from "../../../../../hook/apply/resume/career/useCareerNewDeleteMutation";

const props = defineProps(["resume", "isEditable"]);
const careerDefault = { startDate: '', company: '', dept: '', endDate: '', position: '', reason: '', crrDesc: ''};
const career = ref({ ...careerDefault });
const isAddCareer = ref(false);

const { data: careerList } = useCareerListReadQuery(props.resume.resIdx);
const { mutate: handlerCreateCareerBtn } = useCareerNewCreateMutation();
const { mutate: handlerDeleteCareerBtn } = useCareerNewDeleteMutation();
</script>

<style></style>
