<template>
  <InnerFrame :title="'학력'" v-show="isShow || eduList?.payload?.length">
    <p v-if="props.isShow" class="resumeDetail_guidetext">
      • 최신순으로 작성해주세요.
    </p>
    <template v-for="(item, key) in eduList?.payload" :key="key">
      <div class="edu_table">
        <div class="garo_wrapper_lr" style="grid-area: admDate">
          <label class="resume_label">입학연도:</label>
          <textarea class="resume_textarea" :value="item.admDate.slice(0, 7)" placeholder="입학연도" type="month" disabled />
        </div>
        <div class="garo_wrapper_lr" style="grid-area: eduLevel">
          <label class="resume_label">학력구분:</label>
          <textarea class="resume_textarea" :value="item.eduLevel" placeholder="학력구분" disabled />
        </div>
        <div class="garo_wrapper_lr" style="grid-area: grdStatus">
          <label class="resume_label">졸업여부:</label>
          <textarea class="resume_textarea" :value="item.grdStatus" placeholder="졸업여부" disabled />
        </div>
        <div class="garo_wrapper_lr" style="grid-area: grdDate">
          <label class="resume_label">졸업연도:</label>
          <textarea class="resume_textarea" :value="item.grdDate.slice(0, 7)" placeholder="졸업연도" type="month" disabled />
        </div>
        <div class="garo_wrapper_lr" style="grid-area: schoolName">
          <label class="resume_label">학교명:</label>
          <textarea class="resume_textarea" :value="item.schoolName" placeholder="학교명" disabled />
        </div>
        <div class="garo_wrapper_lr" style="grid-area: major">
          <label class="resume_label">전공명:</label>
          <textarea class="resume_textarea" :value="item.major" placeholder="전공명" disabled />
        </div>
        <div class="garo_wrapper_r" style="grid-area: button; display: flex; justify-content: right; align-items: center;">
          <CommonButton @click="handlerDeleteEduBtn({ resIdx: props.resume.resIdx, eduIdx: item.eduIdx })" v-if="props.isShow">삭제</CommonButton>
        </div>
      </div>
    </template>
    <button class="add_btn" @click="isAddEdu = !isAddEdu" style="border-radius: 5px; margin-bottom: 10px;" v-if="props.isShow">+ 추가</button>
    <div>
      <div class="edu_table" v-if="isAddEdu && props.isShow">
        <div class="garo_wrapper_lr" style="grid-area: admDate">
          <label class="resume_label">입학연도:</label>
          <input class="resume_input" v-model=edu.admDate id="admDate" placeholder="입학연도" type="month"></input>
        </div>
        <div class="garo_wrapper_lr" style="grid-area: eduLevel">
          <label class="resume_label">학력구분:</label>
          <select class="resume_select" v-model=edu.eduLevel id="eduLevel" placeholder="학력구분">
            <option value="고등학교">고등학교</option>
            <option value="대학교">대학교</option>
            <option value="대학원(석사)">대학원(석사)</option>
            <option value="대학원(박사)">대학원(박사)</option>
          </select>
        </div>
        <div class="garo_wrapper_lr" style="grid-area: grdStatus">
          <label class="resume_label">졸업여부:</label>
          <select class="resume_select" v-model=edu.grdStatus id="grdStatus" placeholder="졸업여부">
            <option value="졸업">졸업</option>
            <option value="재학">재학</option>
            <option value="휴학">휴학</option>
            <option value="중퇴">중퇴</option>
          </select>
        </div>
        <div class="garo_wrapper_lr" style="grid-area: grdDate">
          <label class="resume_label">졸업연도:</label>
          <input class="resume_input" v-model=edu.grdDate id="grdDate" placeholder="졸업연도" type="month"></input>
        </div>
        <div class="garo_wrapper_lr" style="grid-area: schoolName">
          <label class="resume_label">학교명:</label>
          <input class="resume_input" v-model=edu.schoolName id="schoolName" placeholder="학교명"></input>
        </div>
        <div class="garo_wrapper_lr" style="grid-area: major">
          <label class="resume_label">전공명:</label>
          <input class="resume_input" v-model=edu.major id="major" placeholder="전공명"></input>
        </div>
        <div class="garo_wrapper_r" style="grid-area: button; display: flex; justify-content: right; align-items: center;">
          <CommonButton @click="handlerCreateEduBtn({ resIdx: props.resume.resIdx, edu: edu })">저장</CommonButton>
          <CommonButton @click="isAddEdu = false">취소</CommonButton>
        </div>
      </div>
    </div>
  </InnerFrame>
</template>

<script setup>
import "@/components/page/Apply/Resume/ResumeStyle.css";
import { onActivated } from "vue";
import { useEduListReadQuery } from "../../../../../hook/apply/resume/edu/useEduListReadQuery";
import { useEduNewCreateMutation } from "../../../../../hook/apply/resume/edu/useEduNewCreateMutation";
import { useEduNewDeleteMutation } from "../../../../../hook/apply/resume/edu/useEduNewDeleteMutation";

const props = defineProps(["resume", "isShow"]);
const resIdx = ref("");
const eduDefault = { admDate: '', eduLevel: '', grdStatus: '', grdDate: '', schoolName: '', major: ''};
const edu = ref({ ...eduDefault });
const isAddEdu = ref(false);

const { data: eduList } = useEduListReadQuery(resIdx);
const { mutate: handlerCreateEduBtn } = useEduNewCreateMutation();
const { mutate: handlerDeleteEduBtn } = useEduNewDeleteMutation();

watch(() => [props.resume.resIdx], () => {
  resIdx.value = props.resume.resIdx;
});

onActivated(() => {
  isAddEdu.value = false;
  edu.value = { ...eduDefault }
});
</script>

<style></style>
