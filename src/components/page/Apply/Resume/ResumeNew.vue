<template>
  <ContextBox>이력서 작성</ContextBox>
  <div>
    <br />

    <div class="sero_wrapper" v-if="resumeNew?.payload">
      <div class="garo_wrapper">
        <label class="title-input">제목: </label>
        <input type="text" v-model="resume.resTitle" />
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
          • 본인의 업무 경험을 기반으로 핵심역량과 업무 스킬을 간단히 작성해주세요. <br />
          • 3~5줄로 요약하여 작성하는 것을 추천합니다!
        </p>
        <textarea placeholder="소개글을 입력해 주세요." v-model="resume.shortIntro"></textarea>
      </div>
    </div>

    <div class="sero_wrapper">
      <div class="resumeDetail_header">경력</div>
      <div class="resumeDetail_border" />
      <div class="sero_wrapper">
        <p class="resumeDetail_guidetext">
          • 담당하신 업무 중 우선순위가 높은 업무를 선별하여 최신순으로 작성해주세요. <br />
          • 신입의 경우, 직무와 관련된 대외활동, 인턴, 계약직 경력 등이 있다면 작성해주세요. <br />
          • 업무 또는 활동 시 담당했던 역할과 과정, 성과에 대해 자세히 작성해주세요. <br />
          • 현재 재직중이면 퇴사일을 해당월로 입력해주세요.
        </p>
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
              <CommonButton @click="handlerDeleteCareerBtn({ resIdx: resumeNew.payload.resIdx, crrIdx: item.crrIdx })">삭제</CommonButton>
            </div>
          </div>
        </template>
        <button @click="isAddCareer = !isAddCareer" style="border-radius: 5px; margin-bottom: 10px;">+ 추가</button>
        <div>
          <div class="career_table" v-if="isAddCareer">
            <div style="grid-area: startDate; display: flex; justify-content: space-between; align-items: center;">
              <label style="text-align: left">입사일:</label>
              <input style="flex: 1" placeholder="입사일" v-model=career.startDate type="month"></input>
            </div>
            <div style="grid-area: company; display: flex; justify-content: space-between; align-items: center;">
              <label style="text-align: left">회사명:</label>
              <input style="flex: 1" placeholder="회사명" v-model=career.company></input>
            </div>
            <div style="grid-area: dept; display: flex; justify-content: space-between; align-items: center;">
              <label style="text-align: left">부서명:</label>
              <input style="flex: 1" placeholder="부서명" v-model=career.dept></input>
            </div>
            <div style="grid-area: endDate; display: flex; justify-content: space-between; align-items: center;">
              <label style="text-align: left">퇴사일:</label>
              <input style="flex: 1" placeholder="퇴사일" v-model=career.endDate type="month"></input>
            </div>
            <div style="grid-area: position; display: flex; justify-content: space-between; align-items: center;">
              <label style="text-align: left">직급/직책:</label>
              <input style="flex: 1" placeholder="직급/직책" v-model=career.position></input>
            </div>
            <div style="grid-area: reason; display: flex; justify-content: space-between; align-items: center;">
              <label style="text-align: left">퇴사사유:</label>
              <input style="flex: 1" placeholder="퇴사사유" v-model=career.reason></input>
            </div>
            <div style="grid-area: crrDesc; display: flex; justify-content: space-between; align-items: center;">
              <label style="text-align: left">담당업무:</label>
              <textarea style="flex: 1" placeholder="담당업무" v-model=career.crrDesc></textarea>
            </div>
            <div style="grid-area: button; display: flex; justify-content: right; align-items: center;">
              <CommonButton @click="{ handlerCreateCareerBtn({ resIdx: resumeNew.payload.resIdx, career: career }); career={ ...careerDefault } }">저장</CommonButton>
              <CommonButton @click="isAddCareer = false">취소</CommonButton>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="sero_wrapper">
      <div class="resumeDetail_header">학력</div>
      <div class="resumeDetail_border" />
      <div class="sero_wrapper">
        <p class="resumeDetail_guidetext">
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
              <select style="flex: 1" :value="item.eduLevel" placeholder="학력구분" disabled>
                <option value="학력구분" selected disabled>학력구분</option>
                <option value="고등학교" disabled>고등학교</option>
                <option value="대학교" disabled>대학교</option>
                <option value="대학원(석사)" disabled>대학원(석사)</option>
                <option value="대학원(박사)" disabled>대학원(박사)</option>
              </select>
            </div>
            <div style="grid-area: grdStatus; display: flex; justify-content: space-between; align-items: center;">
              <label style="text-align: left">졸업여부:</label>
              <input style="flex: 1" :value="item.grdStatus" placeholder="졸업여부" disabled>
                <option value="학력구분" selected disabled>학력구분</option>
                <option value="졸업" disabled>졸업</option>
                <option value="재학" disabled>재학</option>
                <option value="휴학" disabled>휴학</option>
                <option value="중퇴" disabled>중퇴</option>
              </input>
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
              <CommonButton @click="handlerDeleteEduBtn({ resIdx: resumeNew.payload.resIdx, eduIdx: item.eduIdx })">삭제</CommonButton>
            </div>
          </div>
        </template>
        <button @click="isAddEdu = !isAddEdu" style="border-radius: 5px; margin-bottom: 10px;">+ 추가</button>
        <div>
          <div class="edu_table" v-if="isAddEdu">
            <div style="grid-area: admDate; display: flex; justify-content: space-between; align-items: center;">
              <label style="text-align: left">입학연도:</label>
              <input style="flex: 1" placeholder="입학연도" v-model=edu.admDate type="month"></input>
            </div>
            <div style="grid-area: eduLevel; display: flex; justify-content: space-between; align-items: center;">
              <label style="text-align: left">학력구분:</label>
              <select style="flex: 1" placeholder="학력구분" v-model=edu.eduLevel>
                <option value="학력구분" selected disabled>학력구분</option>
                <option value="고등학교">고등학교</option>
                <option value="대학교">대학교</option>
                <option value="대학원(석사)">대학원(석사)</option>
                <option value="대학원(박사)">대학원(박사)</option>
              </select>
            </div>
            <div style="grid-area: grdStatus; display: flex; justify-content: space-between; align-items: center;">
              <label style="text-align: left">졸업여부:</label>
              <select style="flex: 1" placeholder="졸업여부" v-model=edu.grdStatus>
                <option value="학력구분" selected disabled>학력구분</option>
                <option value="졸업">졸업</option>
                <option value="재학">재학</option>
                <option value="휴학">휴학</option>
                <option value="중퇴">중퇴</option>
              </select>
            </div>
            <div style="grid-area: grdDate; display: flex; justify-content: space-between; align-items: center;">
              <label style="text-align: left">졸업연도:</label>
              <input style="flex: 1" placeholder="졸업연도" v-model=edu.grdDate type="month"></input>
            </div>
            <div style="grid-area: schoolName; display: flex; justify-content: space-between; align-items: center;">
              <label style="text-align: left">학교명:</label>
              <input style="flex: 1" placeholder="학교명" v-model=edu.schoolName></input>
            </div>
            <div style="grid-area: major; display: flex; justify-content: space-between; align-items: center;">
              <label style="text-align: left">전공명:</label>
              <input style="flex: 1" placeholder="전공명" v-model=edu.major></input>
            </div>
            <div style="grid-area: button; display: flex; justify-content: right; align-items: center;">
              <CommonButton @click="{ handlerCreateEduBtn({ resIdx: resumeNew.payload.resIdx, edu: edu }); edu={ ...eduDefault } }">저장</CommonButton>
              <CommonButton @click="isAddEdu = false">취소</CommonButton>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="sero_wrapper">
      <div class="resumeDetail_header">스킬</div>
      <div class="resumeDetail_border" />
      <div class="sero_wrapper">
        <p class="resumeDetail_guidetext">
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
              <CommonButton @click="handlerDeleteSkillBtn({ resIdx: resumeNew.payload.resIdx, skillIdx: item.skillIdx })">삭제</CommonButton>
            </div>
          </div>
        </template>
        <button @click="isAddSkill = !isAddSkill" style="border-radius: 5px; margin-bottom: 10px;">+ 추가</button>
        <div>
          <div class="skill_table" v-if="isAddSkill">
            <div style="grid-area: skillName; display: flex; justify-content: space-between; align-items: center;">
              <label style="text-align: left">스킬명:</label>
              <input style="flex: 1" placeholder="스킬명" v-model=skill.skillName></input>
            </div>
            <div style="grid-area: skillDetail; display: flex; justify-content: space-between; align-items: center;">
              <label style="text-align: left">스킬상세:</label>
              <input style="flex: 1" placeholder="스킬상세" v-model=skill.skillDetail></input>
            </div>
            <div style="grid-area: button; display: flex; justify-content: right; align-items: center;">
              <CommonButton @click="{ handlerCreateSkillBtn({ resIdx: resumeNew.payload.resIdx, skill: skill }); skill={ ...skillDefault } }">저장</CommonButton>
              <CommonButton @click="isAddSkill = false">취소</CommonButton>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="sero_wrapper">
      <div class="resumeDetail_header">자격증 및 외국어</div>
      <div class="resumeDetail_border" />
      <div class="sero_wrapper">
        <p class="resumeDetail_guidetext">
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
              <CommonButton @click="handlerDeleteCertBtn({ resIdx: resumeNew.payload.resIdx, certIdx: item.certIdx })">삭제</CommonButton>
            </div>
          </div>
        </template>
        <button @click="isAddCert = !isAddCert" style="border-radius: 5px; margin-bottom: 10px;">+ 추가</button>
        <div>
          <div class="cert_table" v-if="isAddCert">
            <div style="grid-area: acqDate; display: flex; justify-content: space-between; align-items: center;">
              <label style="text-align: left">취득일:</label>
              <input style="flex: 1" placeholder="취득일" v-model=cert.acqDate type="month"></input>
            </div>
            <div style="grid-area: certName; display: flex; justify-content: space-between; align-items: center;">
              <label style="text-align: left">자격증명:</label>
              <input style="flex: 1" placeholder="자격증명" v-model=cert.certName></input>
            </div>
            <div style="grid-area: grade; display: flex; justify-content: space-between; align-items: center;">
              <label style="text-align: left">등급:</label>
              <input style="flex: 1" placeholder="등급" v-model=cert.grade></input>
            </div>
            <div style="grid-area: issuer; display: flex; justify-content: space-between; align-items: center;">
              <label style="text-align: left">발행처:</label>
              <input style="flex: 1" placeholder="발행처" v-model=cert.issuer></input>
            </div>
            <div style="grid-area: button; display: flex; justify-content: right; align-items: center;">
              <CommonButton @click="{ handlerCreateCertBtn({ resIdx: resumeNew.payload.resIdx, cert: cert }); cert={ ...certDefault } }">저장</CommonButton>
              <CommonButton @click="isAddCert = false">취소</CommonButton>
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
        <textarea placeholder="소개글을 입력해 주세요." v-model="resume.pfoLink"></textarea>
      </div>
    </div>

    <div class="sero_wrapper">
      <div class="resumeDetail_header">자기소개서</div>
      <div class="resumeDetail_border" />
      <div class="sero_wrapper">
        <p class="resumeDetail_guidetext">
          • 지원동기, 직무역량, 직무관련 성과와 경험, 포부 등 자유롭게 작성해 주세요. <br />
        </p>
        <textarea placeholder="자기소개서를 입력해 주세요." v-model="resume.perStatement"></textarea>
      </div>
    </div>

    <div class="sero_wrapper">
      <div class="resumeDetail_header">첨부파일</div>
      <div class="resumeDetail_border" />
      <div class="sero_wrapper" style="justify-content: space-between;">
        <p class="resumeDetail_guidetext">
          • 포트폴리오, 경력기술서 등 첨부파일이 있다면 등록해주세요. <br />
        </p>
        <div>
          <template v-if="!fileData">
            <label htmlFor="fileInput" style="flex: 0 0 30px">파일 첨부</label>
            <input id="fileInput" type="file" @change="handlerSelectFileBtn" style="margin-bottom: 20px; border: 0px;"></input>
          </template>
          <template v-else="fileData">
            <label>파일명: {{ fileData.name }}</label>
            <CommonButton @click="fileData=null">파일 삭제</CommonButton>
          </template>
        </div>
      </div>
    </div>
    
    <div class="resumeDetail_endLine"/>
    <div class="resumeDetail_endButtons">
      <CommonButton @click="$router.go(-1)">목록으로</CommonButton>
      <CommonButton @click="{handlerUpdateResumeBtn({ resIdx: resumeNew.payload.resIdx, resume: resume }); $router.go(-1)}">저장하기</CommonButton>
      <CommonButton>미리보기</CommonButton>
    </div>
  </div>
</template>

<script setup>
import { useCareerListReadQuery } from "../../../../hook/resume/career/useCareerListReadQuery";
import { useCareerNewCreateMutation } from "../../../../hook/resume/career/useCareerNewCreateMutation";
import { useCareerNewDeleteMutation } from "../../../../hook/resume/career/useCareerNewDeleteMutation";
import { useCertListReadQuery } from "../../../../hook/resume/cert/useCertListReadQuery";
import { useCertNewCreateMutation } from "../../../../hook/resume/cert/useCertNewCreateMutation";
import { useCertNewDeleteMutation } from "../../../../hook/resume/cert/useCertNewDeleteMutation";
import { useEduListReadQuery } from "../../../../hook/resume/edu/useEduListReadQuery";
import { useEduNewCreateMutation } from "../../../../hook/resume/edu/useEduNewCreateMutation";
import { useEduNewDeleteMutation } from "../../../../hook/resume/edu/useEduNewDeleteMutation";
import { useSkillListReadQuery } from "../../../../hook/resume/skill/useSkillListReadQuery";
import { useSkillNewCreateMutation } from "../../../../hook/resume/skill/useSkillNewCreateMutation";
import { useSkillNewDeleteMutation } from "../../../../hook/resume/skill/useSkillNewDeleteMutation";
import { useResumeFileSelectMutation } from "../../../../hook/resume/useResumeFileSelectMutation";
import { useResumeNewCreateQuery } from "../../../../hook/resume/useResumeNewCreateQuery";
import { useResumeNewUpdateMutation } from "../../../../hook/resume/useResumeNewUpdateMutation";
import CommonButton from "../../../common/CommonButton.vue";

const resIdx = ref("");
const resumeDefault = { resIdx: '', resTitle: '', shortIntro: '', pfoLink: '', perStatement: '' };
const resume = ref({ ...resumeDefault });
const careerDefault = { startDate: '', company: '', dept: '', endDate: '', position: '', reason: '', crrDesc: ''};
const career = ref({ ...careerDefault });
const eduDefault = { admDate: '', eduLevel: '', grdStatus: '', grdDate: '', schoolName: '', major: ''};
const edu = ref({ ...eduDefault });
const skillDefault = { skillName: '', skillDetail: ''};
const skill = ref({ ...skillDefault });
const certDefault = { acqDate: '', certName: '', grade: '', issuer: ''};
const cert = ref({ ...certDefault });
const isAddCareer = ref(false);
const isAddEdu = ref(false);
const isAddSkill = ref(false);
const isAddCert = ref(false);
const fileData = ref(null);

// resIdx는 Spring-Mapper에서 useGeneratedKeys(=resIdx)로 생성후 받아져온다.
const { data: resumeNew } = useResumeNewCreateQuery(resIdx, resume);
const { mutate: handlerSelectFileBtn } = useResumeFileSelectMutation(fileData);
const { mutate: handlerUpdateResumeBtn } = useResumeNewUpdateMutation(fileData);
const { data: careerList } = useCareerListReadQuery(resIdx);
const { mutate: handlerCreateCareerBtn } = useCareerNewCreateMutation();
const { mutate: handlerDeleteCareerBtn } = useCareerNewDeleteMutation();
const { data: eduList } = useEduListReadQuery(resIdx);
const { mutate: handlerCreateEduBtn } = useEduNewCreateMutation();
const { mutate: handlerDeleteEduBtn } = useEduNewDeleteMutation();
const { data: skillList } = useSkillListReadQuery(resIdx);
const { mutate: handlerCreateSkillBtn } = useSkillNewCreateMutation();
const { mutate: handlerDeleteSkillBtn } = useSkillNewDeleteMutation();
const { data: certList } = useCertListReadQuery(resIdx);
const { mutate: handlerCreateCertBtn } = useCertNewCreateMutation();
const { mutate: handlerDeleteCertBtn } = useCertNewDeleteMutation();
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
textarea,
select {
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

.career_table {
  border: 1px solid black;
  border-radius: 10px;
  margin-bottom: 10px;
  padding: 10px;
  color: black;
  font-size: 0.9em;

  display: grid;
  grid-template-areas:
    "startDate company dept dept "
    "endDate position reason reason "
    "crrDesc crrDesc crrDesc button ";
  grid-template-columns: 4fr 4fr 3fr 1fr ;
  grid-template-rows: auto auto auto;
  gap: 16px;
}

.edu_table {
  border: 1px solid black;
  border-radius: 10px;
  margin-bottom: 10px;
  padding: 10px;
  color: black;
  font-size: 0.9em;

  display: grid;
  grid-template-areas:
    "admDate eduLevel grdStatus grdStatus "
    "grdDate schoolName major major "
    "empty empty empty button ";
  grid-template-columns: 4fr 4fr 3fr 1fr ;
  grid-template-rows: auto auto;
  gap: 16px;
}

.skill_table {
  border: 1px solid black;
  border-radius: 10px;
  margin-bottom: 10px;
  padding: 10px;
  color: black;
  font-size: 0.9em;

  display: grid;
  grid-template-areas:
    "skillName skillDetail button ";
  grid-template-columns: 4fr 7fr 1fr ;
  grid-template-rows: auto;
  gap: 16px;
}

.cert_table {
  border: 1px solid black;
  border-radius: 10px;
  margin-bottom: 10px;
  padding: 10px;
  color: black;
  font-size: 0.9em;

  display: grid;
  grid-template-areas:
    "acqDate certName certName "
    "grade issuer button ";
  grid-template-columns: 4fr 7fr 1fr ;
  grid-template-rows: auto;
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
