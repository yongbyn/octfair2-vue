<template>
  <ContextBox>이력서 작성</ContextBox>
  <div>
    <br />

    <div class="sero_wrapper" v-if="resumeNew?.result">
      <div class="garo_wrapper">
        <label class="title-input">제목: </label>
        <input type="text" v-model="resumeNew.payload.resTitle" />
      </div>
      <div class="garo_wrapper">
        <label class="readonly-input">이름: </label>
        <input type="text" v-model="resumeNew.payload.userNm" readonly />
      </div>
      <div class="garo_wrapper">
        <label class="readonly-input">이메일: </label>
        <input type="text" v-model="resumeNew.payload.email" readonly />
      </div>
      <div class="garo_wrapper">
        <label class="readonly-input">전화번호: </label>
        <input type="text" v-model="resumeNew.payload.phone" readonly />
      </div>
    </div>

    <div class="sero_wrapper">
      <div class="resumeDetail_header">간단소개글</div>
      <div class="resumeDetail_border" />
      <div class="sero_wrapper">
        <p class="resumeDetail_guidetext">
          • 본인의 업무 경험을 기반으로 핵심역량과 업무 스킬을 간단히
          작성해주세요. <br />
          • 3~5줄로 요약하여 작성하는 것을 추천합니다!
        </p>
        <textarea placeholder="소개글을 입력해 주세요."></textarea>
      </div>
    </div>

    <div class="sero_wrapper">
      <div class="resumeDetail_header">경력</div>
      <div class="resumeDetail_border" />
      <div class="sero_wrapper">
        <p class="resumeDetail_guidetext">
          • 담당하신 업무 중 우선순위가 높은 업무를 선별하여 최신순으로
          작성해주세요. <br />
          • 신입의 경우, 직무와 관련된 대외활동, 인턴, 계약직 경력 등이 있다면
          작성해주세요. <br />
          • 업무 또는 활동 시 담당했던 역할과 과정, 성과에 대해 자세히
          작성해주세요. <br />
          • 현재 재직중이면 퇴사일을 해당월로 입력해주세요.
        </p>
        <div class="career_table_list">
          <!-- <div class="career_table_list" v-for="(item, key) in careerList" :key="key"> -->
          <div class="career_table_input">
            <div style="grid-area: start-date; display: flex; justify-content: space-between; align-items: center;">
              <label style="text-align: left">입사일:</label>
              <input style="flex: 1" placeholder="입사일" type="month"></input>
            </div>
            <div style="grid-area: company; display: flex; justify-content: space-between; align-items: center;">
              <label style="text-align: left">회사명:</label>
              <input style="flex: 1" placeholder="회사명"></input>
            </div>
            <div style="grid-area: dept; display: flex; justify-content: space-between; align-items: center;">
              <label style="text-align: left">부서명:</label>
              <input style="flex: 1" placeholder="부서명"></input>
            </div>
            <div style="grid-area: end-date; display: flex; justify-content: space-between; align-items: center;">
              <label style="text-align: left">퇴사일:</label>
              <input style="flex: 1" placeholder="퇴사일" type="month"></input>
            </div>
            <div style="grid-area: position; display: flex; justify-content: space-between; align-items: center;">
              <label style="text-align: left">직급/직책:</label>
              <input style="flex: 1" placeholder="직급/직책"></input>
            </div>
            <div style="grid-area: reason; display: flex; justify-content: space-between; align-items: center;">
              <label style="text-align: left">퇴사사유:</label>
              <input style="flex: 1" placeholder="퇴사사유"></input>
            </div>
            <div style="grid-area: crr-desc; display: flex; justify-content: space-between; align-items: center;">
              <label style="text-align: left">담당업무:</label>
              <textarea style="flex: 1" placeholder="담당업무"></textarea>
            </div>
          </div>
          <!-- </div> -->
        </div>
        <button @click="isAddCareer = true" style="border-radius: 5px; margin-bottom: 10px;">+ 추가</button>
        <div>
          <div class="career_table_input" v-if="isAddCareer">
            <div style="grid-area: start-date; display: flex; justify-content: space-between; align-items: center;">
              <label style="text-align: left">입사일:</label>
              <input style="flex: 1" placeholder="입사일" type="month"></input>
            </div>
            <div style="grid-area: company; display: flex; justify-content: space-between; align-items: center;">
              <label style="text-align: left">회사명:</label>
              <input style="flex: 1" placeholder="회사명"></input>
            </div>
            <div style="grid-area: dept; display: flex; justify-content: space-between; align-items: center;">
              <label style="text-align: left">부서명:</label>
              <input style="flex: 1" placeholder="부서명"></input>
            </div>
            <div style="grid-area: end-date; display: flex; justify-content: space-between; align-items: center;">
              <label style="text-align: left">퇴사일:</label>
              <input style="flex: 1" placeholder="퇴사일" type="month"></input>
            </div>
            <div style="grid-area: position; display: flex; justify-content: space-between; align-items: center;">
              <label style="text-align: left">직급/직책:</label>
              <input style="flex: 1" placeholder="직급/직책"></input>
            </div>
            <div style="grid-area: reason; display: flex; justify-content: space-between; align-items: center;">
              <label style="text-align: left">퇴사사유:</label>
              <input style="flex: 1" placeholder="퇴사사유"></input>
            </div>
            <div style="grid-area: crr-desc; display: flex; justify-content: space-between; align-items: center;">
              <label style="text-align: left">담당업무:</label>
              <textarea style="flex: 1" placeholder="담당업무"></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="sero_wrapper">
      <div class="resumeDetail_header">링크</div>
      <div class="resumeDetail_border" />
      <div class="sero_wrapper">
        <p class="resumeDetail_guidetext">
          • 깃허브, 노션으로 작성한 포트폴리오, 구글 드라이브 파일 등 업무 성과를 보여줄 수 있는 링크가 있다면 작성해주세요. <br />
        </p>
        <textarea placeholder="소개글을 입력해 주세요."></textarea>
      </div>
    </div>

    <div class="sero_wrapper">
      <div class="resumeDetail_header">자기소개서</div>
      <div class="resumeDetail_border" />
      <div class="sero_wrapper">
        <p class="resumeDetail_guidetext">
          • 지원동기, 직무역량, 직무관련 성과와 경험, 포부 등 자유롭게 작성해 주세요. <br />
        </p>
        <textarea placeholder="자기소개서를 입력해 주세요."></textarea>
      </div>
    </div>

    <div class="sero_wrapper">
      <div class="resumeDetail_header">첨부파일</div>
      <div class="resumeDetail_border" />
      <div class="sero_wrapper">
        <p class="resumeDetail_guidetext">
          • 포트폴리오, 경력기술서 등 첨부파일이 있다면 등록해주세요. <br />
        </p>
        <textarea placeholder="소개글을 입력해 주세요."></textarea>
      </div>
    </div>
    
    <div class="resumeDetail_endLine"/>
    <div class="resumeDetail_endButtons">
      <CommonButton>목록으로</CommonButton>
      <CommonButton>저장하기</CommonButton>
      <CommonButton>미리보기</CommonButton>
    </div>
  </div>
</template>

<script setup>
import { useResumeNewGetQuery } from "../../../../hook/resume/useResumeNewGetQuery";
import CommonButton from "../../../common/CommonButton.vue";

const isCreated = ref(false);
const isAddCareer = ref(false);

const {
  // resIdx는 Spring-Mapper에서 useGeneratedKeys(=resIdx)로 생성후 받아져온다.
  data: resumeNew, // useQuery(useResumeListSearchQuery) 내 callback함수 return값이 입력된다
  isLoading,
  isSuccess,
  isError,
  isStale, // 캐시유지 주기
  refetch, // 자동갱신 주기
} = useResumeNewGetQuery(isCreated);
</script>

<style lang="scss" scoped>
.garo_wrapper {
  display: flex;
  align-items: center; /* 수직 정렬 */
  width: 100%; /* 부모 요소의 전체 너비 차지 */
  margin-bottom: 15px;
}

.sero_wrapper {
  display: flex;
  flex-direction: column; /* 세로 나열, 없으면 기본값 가로 나열 */
  justify-content: center; /* 수평 정렬 */
  width: 97%; /* 부모 요소의 전체 너비 차지 */
  margin-bottom: 15px;
  padding: 15px;
  border-radius: 10px;
  background-color: rgba(222, 184, 135, 0.849);
}

label {
  flex: 0 0 80px; /* 고정 너비 설정 (필요에 따라 조정) */
  margin-right: 10px; /* label과 input 사이 간격 */
  font-weight: bold; /* 라벨 강조 */
}

input,
textarea {
  flex: 1; /* 나머지 공간을 입력 필드가 차지 */
  box-sizing: border-box;
  border: 1px solid rgb(0, 0, 0);
  border-radius: 10px;
  padding: 10px;

  &:focus {
    flex: 1; /* 나머지 공간을 입력 필드가 차지 */
    box-sizing: border-box;
    border: 1px solid black;
    border-radius: 10px;
    border-color: #3498db; /* 포커스 시 테두리 색상 변경 (파란색) */
    background-color: #e6f7ff; /* 포커스 시 배경색 변경 (연한 파란색) */
    box-shadow: 0 0 5px rgba(52, 152, 219, 0.6); /* 파란색 그림자 추가 */
    padding: 10px;
    outline: none;
  }
}

.resumeDetail_header {
  margin-bottom: 1px;
  font-size: 1.2em;
  font-weight: bold;
}

.resumeDetail_border {
  border: 0;
  width: 98%;
  height: 1px;
  margin-bottom: 1px;
  background-color: black;
}

.resumeDetail_guidetext {
  border: 1px solid black;
  border-radius: 10px;
  margin-bottom: 10px;
  padding: 10px;
  color: black;
  font-size: 0.9em;
}

.career_table_list {
  border: 1px solid black;
  border-radius: 10px;
  margin-bottom: 10px;
  padding: 10px;
  color: black;
  font-size: 0.9em;
}

.career_table_row {
  border: 1px solid black;
  border-radius: 10px;
  margin-bottom: 10px;
  padding: 10px;
  color: black;
  font-size: 0.9em;

  display: grid;
  grid-template-areas:
    "start-date company dept"
    "end-date position reason"
    "crr-desc crr-desc delete";
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto auto auto;
  gap: 16px;
}

.career_table_input {
  border: 1px solid black;
  border-radius: 10px;
  margin-bottom: 10px;
  padding: 10px;
  color: black;
  font-size: 0.9em;

  display: grid;
  grid-template-areas:
    "start-date company dept"
    "end-date position reason"
    "crr-desc crr-desc crr-desc";
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto auto auto;
  gap: 16px;
}

.resumeDetail_endLine {
  border: 2px solid black;
  width: 100%;
  height: 1px;
  margin-top: 50px;
  margin-bottom: 50px;
  background-color: black;
}

.resumeDetail_endButtons {
  display: flex;
  justify-content: center; /* 수평 정렬 */
}
</style>
