<template>
  <p class="resumeDetail_guidetext" v-if="props.isEditable">
    • 최신순으로 작성해주세요.
  </p>
  <template v-for="(item, key) in eduList?.payload" :key="key">
    <div class="edu_table">
      <div style="grid-area: admDate; display: flex; justify-content: space-between; align-items: center;">
        <label style="text-align: left">입학연도:</label>
        <input style="flex: 1" :value="item.admDate.slice(0, 7)" placeholder="입학연도" type="month" disabled></input>
      </div>
      <div style="grid-area: eduLevel; display: flex; justify-content: space-between; align-items: center;">
        <label style="text-align: left">학력구분:</label>
        <input style="flex: 1" :value="item.eduLevel" placeholder="학력구분" disabled />
      </div>
      <div style="grid-area: grdStatus; display: flex; justify-content: space-between; align-items: center;">
        <label style="text-align: left">졸업여부:</label>
        <input style="flex: 1" :value="item.grdStatus" placeholder="졸업여부" disabled />
      </div>
      <div style="grid-area: grdDate; display: flex; justify-content: space-between; align-items: center;">
        <label style="text-align: left">졸업연도:</label>
        <input style="flex: 1" :value="item.grdDate.slice(0, 7)" placeholder="졸업연도" type="month" disabled></input>
      </div>
      <div style="grid-area: schoolName; display: flex; justify-content: space-between; align-items: center;">
        <label style="text-align: left">학교명:</label>
        <input style="flex: 1" :value="item.schoolName" placeholder="학교명" disabled></input>
      </div>
      <div style="grid-area: major; display: flex; justify-content: space-between; align-items: center;">
        <label style="text-align: left">전공명:</label>
        <input style="flex: 1" :value="item.major" placeholder="전공명" disabled></input>
      </div>
      <div style="grid-area: button; display: flex; justify-content: right; align-items: center;">
        <CommonButton @click="handlerDeleteEduBtn({ resIdx: props.resume.resIdx, eduIdx: item.eduIdx })" v-if="props.isEditable">삭제</CommonButton>
      </div>
    </div>
  </template>
  <button class="add_btn" @click="isAddEdu = !isAddEdu" style="border-radius: 5px; margin-bottom: 10px;" v-if="props.isEditable">+ 추가</button>
  <div>
    <div class="edu_table" v-if="isAddEdu && props.isEditable">
      <div style="grid-area: admDate; display: flex; justify-content: space-between; align-items: center;">
        <label style="text-align: left">입학연도:</label>
        <input style="flex: 1" v-model=edu.admDate placeholder="입학연도" type="month"></input>
      </div>
      <div style="grid-area: eduLevel; display: flex; justify-content: space-between; align-items: center;">
        <label style="text-align: left">학력구분:</label>
        <select style="flex: 1" v-model=edu.eduLevel placeholder="학력구분">
          <option value="고등학교">고등학교</option>
          <option value="대학교">대학교</option>
          <option value="대학원(석사)">대학원(석사)</option>
          <option value="대학원(박사)">대학원(박사)</option>
        </select>
      </div>
      <div style="grid-area: grdStatus; display: flex; justify-content: space-between; align-items: center;">
        <label style="text-align: left">졸업여부:</label>
        <select style="flex: 1" v-model=edu.grdStatus placeholder="졸업여부">
          <option value="졸업">졸업</option>
          <option value="재학">재학</option>
          <option value="휴학">휴학</option>
          <option value="중퇴">중퇴</option>
        </select>
      </div>
      <div style="grid-area: grdDate; display: flex; justify-content: space-between; align-items: center;">
        <label style="text-align: left">졸업연도:</label>
        <input style="flex: 1" v-model=edu.grdDate placeholder="졸업연도" type="month"></input>
      </div>
      <div style="grid-area: schoolName; display: flex; justify-content: space-between; align-items: center;">
        <label style="text-align: left">학교명:</label>
        <input style="flex: 1" v-model=edu.schoolName placeholder="학교명"></input>
      </div>
      <div style="grid-area: major; display: flex; justify-content: space-between; align-items: center;">
        <label style="text-align: left">전공명:</label>
        <input style="flex: 1" v-model=edu.major placeholder="전공명"></input>
      </div>
      <div style="grid-area: button; display: flex; justify-content: right; align-items: center;">
        <CommonButton @click="{ handlerCreateEduBtn({ resIdx: props.resume.resIdx, edu: edu }); edu={ ...eduDefault } }">저장</CommonButton>
        <CommonButton @click="isAddEdu = false">취소</CommonButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import "@/components/page/Apply/Resume/ResumeStyle.css";
import { useEduListReadQuery } from "../../../../../hook/apply/resume/edu/useEduListReadQuery";
import { useEduNewCreateMutation } from "../../../../../hook/apply/resume/edu/useEduNewCreateMutation";
import { useEduNewDeleteMutation } from "../../../../../hook/apply/resume/edu/useEduNewDeleteMutation";

const props = defineProps(["resume", "isEditable"]);
const eduDefault = { admDate: '', eduLevel: '', grdStatus: '', grdDate: '', schoolName: '', major: ''};
const edu = ref({ ...eduDefault });
const isAddEdu = ref(false);

const { data: eduList } = useEduListReadQuery(props.resume.resIdx);
const { mutate: handlerCreateEduBtn } = useEduNewCreateMutation();
const { mutate: handlerDeleteEduBtn } = useEduNewDeleteMutation();
</script>

<style></style>
