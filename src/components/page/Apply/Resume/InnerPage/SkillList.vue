<template>
  <p class="resumeDetail_guidetext" v-if="props.isEditable">
    • 개발 스택, 디자인 툴, 마케팅 툴 등 가지고 있는 직무와 관련된 스킬을 추가해보세요. <br />
    • 데이터 분석 툴이나 협업 툴 등의 사용해본 경험이 있으신 툴들도 추가해보세요
  </p>
  <template v-for="(item, key) in skillList?.payload" :key="key">
    <div class="skill_table">
      <div style="grid-area: skillName; display: flex; justify-content: space-between; align-items: center;">
        <label style="text-align: left">스킬명:</label>
        <input style="flex: 1" :value="item.skillName" placeholder="스킬명" disabled></input>
      </div>
      <div style="grid-area: skillDetail; display: flex; justify-content: space-between; align-items: center;">
        <label style="text-align: left">스킬상세:</label>
        <input style="flex: 1" :value="item.skillDetail" placeholder="스킬상세" disabled></input>
      </div>
      <div style="grid-area: button; display: flex; justify-content: right; align-items: center;">
        <CommonButton @click="handlerDeleteSkillBtn({ resIdx: props.resume.resIdx, skillIdx: item.skillIdx })" v-if="props.isEditable">삭제</CommonButton>
      </div>
    </div>
  </template>
  <button class="add_btn" @click="isAddSkill = !isAddSkill" style="border-radius: 5px; margin-bottom: 10px;" v-if="props.isEditable">+ 추가</button>
  <div>
    <div class="skill_table" v-if="isAddSkill && props.isEditable">
      <div style="grid-area: skillName; display: flex; justify-content: space-between; align-items: center;">
        <label style="text-align: left">스킬명:</label>
        <input style="flex: 1" v-model=skill.skillName placeholder="스킬명"></input>
      </div>
      <div style="grid-area: skillDetail; display: flex; justify-content: space-between; align-items: center;">
        <label style="text-align: left">스킬상세:</label>
        <input style="flex: 1" v-model=skill.skillDetail placeholder="스킬상세"></input>
      </div>
      <div style="grid-area: button; display: flex; justify-content: right; align-items: center;">
        <CommonButton @click="{ handlerCreateSkillBtn({ resIdx: props.resume.resIdx, skill: skill }); skill={ ...skillDefault } }">저장</CommonButton>
        <CommonButton @click="isAddSkill = false">취소</CommonButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import "@/components/page/Apply/Resume/ResumeStyle.css";
import { useSkillListReadQuery } from "../../../../../hook/apply/resume/skill/useSkillListReadQuery";
import { useSkillNewCreateMutation } from "../../../../../hook/apply/resume/skill/useSkillNewCreateMutation";
import { useSkillNewDeleteMutation } from "../../../../../hook/apply/resume/skill/useSkillNewDeleteMutation";

const props = defineProps(["resume", "isEditable"]);
const skillDefault = { skillName: '', skillDetail: ''};
const skill = ref({ ...skillDefault });
const isAddSkill = ref(false);

const { data: skillList } = useSkillListReadQuery(props.resume.resIdx);
const { mutate: handlerCreateSkillBtn } = useSkillNewCreateMutation();
const { mutate: handlerDeleteSkillBtn } = useSkillNewDeleteMutation();
</script>

<style></style>
