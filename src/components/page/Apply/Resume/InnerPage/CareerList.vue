<template>
  <InnerFrame :title="'경력'" v-show="isShow || careerList?.payload?.length">
    <p v-if="props.isShow" class="resumeDetail_guidetext">
      • 담당하신 업무 중 우선순위가 높은 업무를 선별하여 최신순으로 작성해주세요. <br />
      • 신입의 경우, 직무와 관련된 대외활동, 인턴, 계약직 경력 등이 있다면 작성해주세요. <br />
      • 업무 또는 활동 시 담당했던 역할과 과정, 성과에 대해 자세히 작성해주세요. <br />
      • 현재 재직중이면 퇴사일을 해당월로 입력해주세요.
    </p>
    <template v-for="(item, key) in careerList?.payload" :key="key">
      <div class="career_table">
        <div class="garo_wrapper_lr" style="grid-area: startDate">
          <label class="resume_label">입사일:</label>
          <textarea class="resume_textarea" :value="item.startDate.slice(0, 7)" placeholder="입사일" type="month" disabled />
        </div>
        <div class="garo_wrapper_lr" style="grid-area: company">
          <label class="resume_label">회사명:</label>
          <textarea class="resume_textarea" :value="item.company" placeholder="회사명" disabled />
        </div>
        <div class="garo_wrapper_lr" style="grid-area: dept">
          <label class="resume_label">부서명:</label>
          <textarea class="resume_textarea" :value="item.dept" placeholder="부서명" disabled />
        </div>
        <div class="garo_wrapper_lr" style="grid-area: endDate">
          <label class="resume_label">퇴사일:</label>
          <textarea class="resume_textarea" :value="item.endDate.slice(0, 7)" placeholder="퇴사일" type="month" disabled />
        </div>
        <div class="garo_wrapper_lr" style="grid-area: position">
          <label class="resume_label">직급/직책:</label>
          <textarea class="resume_textarea" :value="item.position" placeholder="직급/직책" disabled />
        </div>
        <div class="garo_wrapper_lr" style="grid-area: reason">
          <label class="resume_label">퇴사사유:</label>
          <textarea class="resume_textarea" :value="item.reason" placeholder="퇴사사유" disabled />
        </div>
        <div class="garo_wrapper_lr" style="grid-area: crrDesc">
          <label class="resume_label">담당업무:</label>
          <textarea class="resume_textarea" :value="item.crrDesc" placeholder="담당업무" disabled />
        </div>
        <div class="garo_wrapper_r" style="grid-area: button">
          <CommonButton @click="handlerDeleteCareerBtn({ resIdx: props.resume.resIdx, crrIdx: item.crrIdx })" v-if="props.isShow">삭제</CommonButton>
        </div>
      </div>
    </template>
    <button class="add_btn" @click="isAddCareer = !isAddCareer" v-if="props.isShow">+ 추가</button>
    <div>
      <div class="career_table" v-if="isAddCareer && props.isShow">
        <div class="garo_wrapper_lr" style="grid-area: startDate">
          <label class="resume_label">입사일:</label>
          <input class="resume_input" v-model=career.startDate id="startDate" placeholder="입사일" type="month"></input>
        </div>
        <div class="garo_wrapper_lr" style="grid-area: company">
          <label class="resume_label">회사명:</label>
          <input class="resume_input" v-model=career.company id="company" placeholder="회사명"></input>
        </div>
        <div class="garo_wrapper_lr" style="grid-area: dept">
          <label class="resume_label">부서명:</label>
          <input class="resume_input" v-model=career.dept id="dept" placeholder="부서명"></input>
        </div>
        <div class="garo_wrapper_lr" style="grid-area: endDate">
          <label class="resume_label">퇴사일:</label>
          <input class="resume_input" v-model=career.endDate id="endDate" placeholder="퇴사일" type="month"></input>
        </div>
        <div class="garo_wrapper_lr" style="grid-area: position">
          <label class="resume_label">직급/직책:</label>
          <input class="resume_input" v-model=career.position id="position" placeholder="직급/직책"></input>
        </div>
        <div class="garo_wrapper_lr" style="grid-area: reason">
          <label class="resume_label">퇴사사유:</label>
          <input class="resume_input" v-model=career.reason id="reason" placeholder="퇴사사유"></input>
        </div>
        <div class="garo_wrapper_lr" style="grid-area: crrDesc">
          <label class="resume_label">담당업무:</label>
          <textarea class="resume_textarea" v-model=career.crrDesc id="crrDesc" placeholder="담당업무"></textarea>
        </div>
        <div class="garo_wrapper_r" style="grid-area: button">
          <CommonButton @click="handlerCreateCareerBtn({ resIdx: props.resume.resIdx, career: career })">저장</CommonButton>
          <CommonButton @click="isAddCareer = false">취소</CommonButton>
        </div>
      </div>
    </div>
  </InnerFrame>
</template>

<script setup>
import "@/components/page/Apply/Resume/ResumeStyle.css";
import { onActivated } from "vue";
import { useCareerListReadQuery } from "../../../../../hook/apply/resume/career/useCareerListReadQuery";
import { useCareerNewCreateMutation } from "../../../../../hook/apply/resume/career/useCareerNewCreateMutation";
import { useCareerNewDeleteMutation } from "../../../../../hook/apply/resume/career/useCareerNewDeleteMutation";

const props = defineProps(["resume", "isShow"]);
const resIdx = ref("");
const careerDefault = { startDate: '', company: '', dept: '', endDate: '', position: '', reason: '', crrDesc: ''};
const career = ref({ ...careerDefault });
const isAddCareer = ref(false);

const { data: careerList } = useCareerListReadQuery(resIdx);
const { mutate: handlerCreateCareerBtn } = useCareerNewCreateMutation();
const { mutate: handlerDeleteCareerBtn } = useCareerNewDeleteMutation();

watch(() => [props.resume.resIdx], () => {
  resIdx.value = props.resume.resIdx;
});

onActivated(() => {
  isAddCareer.value = false;
  career.value = { ...careerDefault }
});
</script>

<style></style>
