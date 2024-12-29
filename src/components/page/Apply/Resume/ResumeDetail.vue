<template>
  <div id="print-area">
    <div class="sero_wrapper" style="box-shadow: 0 4px 8px skyblue" v-if="resumeDetail?.payload">
      <div class="garo_wrapper">
        <label class="title-input">제목: </label>
        <input type="text" v-model="resume.resTitle" :disabled="!isEditable"/>
      </div>
      <div class="garo_wrapper">
        <label class="readonly-input">이름: </label>
        <input type="text" v-model="resumeDetail.payload.userNm" disabled />
      </div>
      <div class="garo_wrapper">
        <label class="readonly-input">이메일: </label>
        <input type="text" v-model="resumeDetail.payload.email" disabled />
      </div>
      <div class="garo_wrapper">
        <label class="readonly-input">전화번호: </label>
        <input type="text" v-model="resumeDetail.payload.phone" disabled />
      </div>
    </div>

    <div class="sero_wrapper" style="box-shadow: 0 4px 8px skyblue">
      <div class="resumeDetail_header">간단소개글</div>
      <div class="resumeDetail_border" />
      <div class="sero_wrapper">
        <p class="resumeDetail_guidetext" v-if="isEditable">
          • 본인의 업무 경험을 기반으로 핵심역량과 업무 스킬을 간단히 작성해주세요. <br />
          • 3~5줄로 요약하여 작성하는 것을 추천합니다!
        </p>
        <textarea v-model="resume.shortIntro" :placeholder="isPrintable ? '간단소개글을 입력해 주세요.' : ''" @input="(event) => { const textarea = event.target; textarea.style.height = 'auto'; textarea.style.height = `${textarea.scrollHeight}px`; }" :disabled="!isEditable"></textarea>
      </div>
    </div>

    <div class="sero_wrapper" style="box-shadow: 0 4px 8px skyblue">
      <div class="resumeDetail_header">경력</div>
      <div class="resumeDetail_border" />
      <div class="sero_wrapper">
        <p class="resumeDetail_guidetext" v-if="isEditable">
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
              <CommonButton @click="handlerDeleteCareerBtn({ resIdx: resumeDetail.payload.resIdx, crrIdx: item.crrIdx })" v-if="isEditable">삭제</CommonButton>
            </div>
          </div>
        </template>
        <button class="add_btn" @click="isAddCareer = !isAddCareer" style="border-radius: 5px; margin-bottom: 10px;" v-if="isEditable">+ 추가</button>
        <div>
          <div class="career_table" v-if="isAddCareer">
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
              <CommonButton @click="{ handlerCreateCareerBtn({ resIdx: resumeDetail.payload.resIdx, career: career }); career={ ...careerDefault } }">저장</CommonButton>
              <CommonButton @click="isAddCareer = false">취소</CommonButton>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="sero_wrapper" style="box-shadow: 0 4px 8px skyblue">
      <div class="resumeDetail_header">학력</div>
      <div class="resumeDetail_border" />
      <div class="sero_wrapper">
        <p class="resumeDetail_guidetext" v-if="isEditable">
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
              <CommonButton @click="handlerDeleteEduBtn({ resIdx: resumeDetail.payload.resIdx, eduIdx: item.eduIdx })" v-if="isEditable">삭제</CommonButton>
            </div>
          </div>
        </template>
        <button class="add_btn" @click="isAddEdu = !isAddEdu" style="border-radius: 5px; margin-bottom: 10px;" v-if="isEditable">+ 추가</button>
        <div>
          <div class="edu_table" v-if="isAddEdu">
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
              <CommonButton @click="{ handlerCreateEduBtn({ resIdx: resumeDetail.payload.resIdx, edu: edu }); edu={ ...eduDefault } }">저장</CommonButton>
              <CommonButton @click="isAddEdu = false">취소</CommonButton>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="sero_wrapper" style="box-shadow: 0 4px 8px skyblue">
      <div class="resumeDetail_header">스킬</div>
      <div class="resumeDetail_border" />
      <div class="sero_wrapper">
        <p class="resumeDetail_guidetext" v-if="isEditable">
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
              <CommonButton @click="handlerDeleteSkillBtn({ resIdx: resumeDetail.payload.resIdx, skillIdx: item.skillIdx })" v-if="isEditable">삭제</CommonButton>
            </div>
          </div>
        </template>
        <button class="add_btn" @click="isAddSkill = !isAddSkill" style="border-radius: 5px; margin-bottom: 10px;" v-if="isEditable">+ 추가</button>
        <div>
          <div class="skill_table" v-if="isAddSkill">
            <div style="grid-area: skillName; display: flex; justify-content: space-between; align-items: center;">
              <label style="text-align: left">스킬명:</label>
              <input style="flex: 1" v-model=skill.skillName placeholder="스킬명"></input>
            </div>
            <div style="grid-area: skillDetail; display: flex; justify-content: space-between; align-items: center;">
              <label style="text-align: left">스킬상세:</label>
              <input style="flex: 1" v-model=skill.skillDetail placeholder="스킬상세"></input>
            </div>
            <div style="grid-area: button; display: flex; justify-content: right; align-items: center;">
              <CommonButton @click="{ handlerCreateSkillBtn({ resIdx: resumeDetail.payload.resIdx, skill: skill }); skill={ ...skillDefault } }">저장</CommonButton>
              <CommonButton @click="isAddSkill = false">취소</CommonButton>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="sero_wrapper" style="box-shadow: 0 4px 8px skyblue">
      <div class="resumeDetail_header">자격증 및 외국어</div>
      <div class="resumeDetail_border" />
      <div class="sero_wrapper">
        <p class="resumeDetail_guidetext" v-if="isEditable">
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
              <CommonButton @click="handlerDeleteCertBtn({ resIdx: resumeDetail.payload.resIdx, certIdx: item.certIdx })" v-if="isEditable">삭제</CommonButton>
            </div>
          </div>
        </template>
        <button class="add_btn" @click="isAddCert = !isAddCert" style="border-radius: 5px; margin-bottom: 10px;" v-if="isEditable">+ 추가</button>
        <div>
          <div class="cert_table" v-if="isAddCert">
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
              <CommonButton @click="{ handlerCreateCertBtn({ resIdx: resumeDetail.payload.resIdx, cert: cert }); cert={ ...certDefault } }">저장</CommonButton>
              <CommonButton @click="isAddCert = false">취소</CommonButton>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="sero_wrapper" style="box-shadow: 0 4px 8px skyblue">
      <div class="resumeDetail_header">링크</div>
      <div class="resumeDetail_border" />
      <div class="sero_wrapper">
        <p class="resumeDetail_guidetext" v-if="isEditable">
          • 깃허브, 노션으로 작성한 포트폴리오, 구글 드라이브 파일 등 업무 성과를 보여줄 수 있는 링크가 있다면 작성해주세요. <br />
        </p>
        <input v-model="resume.pfoLink" :placeholder="isPrintable ? '링크를 입력해 주세요.' : ''" :disabled="!isEditable"></input>
      </div>
    </div>

    <div class="sero_wrapper" style="box-shadow: 0 4px 8px skyblue">
      <div class="resumeDetail_header">자기소개서</div>
      <div class="resumeDetail_border" />
      <div class="sero_wrapper">
        <p class="resumeDetail_guidetext" v-if="isEditable">
          • 지원동기, 직무역량, 직무관련 성과와 경험, 포부 등 자유롭게 작성해 주세요. <br />
        </p>
        <textarea v-model="resume.perStatement" :placeholder="isPrintable ? '자기소개서를 입력해 주세요.' : ''" :disabled="!isEditable"></textarea>
      </div>
    </div>

    <div class="sero_wrapper" style="box-shadow: 0 4px 8px skyblue">
      <div class="resumeDetail_header">첨부파일</div>
      <div class="resumeDetail_border" />
      <div class="sero_wrapper" style="justify-content: space-between;">
        <p class="resumeDetail_guidetext" v-if="isEditable">
          • 포트폴리오, 경력기술서 등 첨부파일이 있다면 등록해주세요. <br />
        </p>
        <div>
          <div v-if="!fileData && !resume.logicalPath && isEditable">
            <label htmlFor="fileInput" style="flex: 0 0 30px">파일 첨부</label>
            <input id="fileInput" type="file" @change="handlerSelectFileBtn" style="margin-bottom: 20px; border: 0px;"></input>
          </div>
          <div v-if="(fileData || resume.logicalPath) && isEditable" style="display: flex; justify-content: space-between; align-items: center;">
            <label style="flex: 1">파일명: {{ fileData?.name || resume.fileName }}</label>
            <CommonButton @click="{ handlerDeleteFileBtn(); fileData=null; fileImgSrc=null; resume.logicalPath=''; }">파일 삭제</CommonButton>
          </div>
          <p style="margin: 5px" />
          <div v-if="fileImgSrc || ['jpg', 'jpeg', 'png', 'bmp', 'webp', 'gif'].includes(resume.fileExt?.toLowerCase())">
            <a :href="fileImgSrc || resume.logicalPath" :download="fileData?.name || resume.fileName">
              <img :src="fileImgSrc || resume.logicalPath" style="width: 100%"/>
            </a>
          </div>
        </div>
      </div>
    </div>
    
    <div class="resumeDetail_endLine"/>
    <div class="resumeDetail_endButtons" v-if="isPrintable">
      <CommonButton @click="handlerBackBtn()">목록으로</CommonButton>
      <CommonButton @click="{ handlerUpdateResumeBtn({ resIdx: resumeDetail.payload.resIdx, resume: resume }); handlerBackBtn() }" v-if="isEditable">저장하기</CommonButton>
      <CommonButton @click="modalStore.modalState = true" v-if="!modalStore.modalState">미리보기</CommonButton>
      <CommonButton @click="handlerPrintBtn()" v-if="true">인쇄하기</CommonButton>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useModalStore } from "../../../../stores/modalState";
import { useRoute, useRouter } from 'vue-router';
import { useCareerListReadQuery } from "../../../../hook/apply/resume/career/useCareerListReadQuery";
import { useCareerNewCreateMutation } from "../../../../hook/apply/resume/career/useCareerNewCreateMutation";
import { useCareerNewDeleteMutation } from "../../../../hook/apply/resume/career/useCareerNewDeleteMutation";
import { useCertListReadQuery } from "../../../../hook/apply/resume/cert/useCertListReadQuery";
import { useCertNewCreateMutation } from "../../../../hook/apply/resume/cert/useCertNewCreateMutation";
import { useCertNewDeleteMutation } from "../../../../hook/apply/resume/cert/useCertNewDeleteMutation";
import { useEduListReadQuery } from "../../../../hook/apply/resume/edu/useEduListReadQuery";
import { useEduNewCreateMutation } from "../../../../hook/apply/resume/edu/useEduNewCreateMutation";
import { useEduNewDeleteMutation } from "../../../../hook/apply/resume/edu/useEduNewDeleteMutation";
import { useSkillListReadQuery } from "../../../../hook/apply/resume/skill/useSkillListReadQuery";
import { useSkillNewCreateMutation } from "../../../../hook/apply/resume/skill/useSkillNewCreateMutation";
import { useSkillNewDeleteMutation } from "../../../../hook/apply/resume/skill/useSkillNewDeleteMutation";
import { useResumeDetailReadQuery } from "../../../../hook/apply/resume/useResumeDetailReadQuery";
import { useResumeDetailUpdateMutation } from "../../../../hook/apply/resume/useResumeDetailUpdateMutation";
import { useResumeFileSelectMutation } from "../../../../hook/apply/resume/useResumeFileSelectMutation";
import { useResumeFileDeleteMutation } from "../../../../hook/apply/resume/useResumeFileDeleteMutation";
import CommonButton from "../../../common/CommonButton.vue";
// import '@/components/page/Apply/Resume/ResumeStyle.css';
import printJS from "print-js";

const modalStore = useModalStore();
const props = defineProps(["resIdx"]);
const route = useRoute();
const router = useRouter();
const resIdx = ref("");
const isEditable = ref(true);
const isPrintable = ref(true);
const resumeDefault = { userIdx: '', resIdx: '', resTitle: '', shortIntro: '', pfoLink: '', perStatement: '', fileName: '', fileExt: '', logicalPath: '' };
const careerDefault = { startDate: '', company: '', dept: '', endDate: '', position: '', reason: '', crrDesc: ''};
const eduDefault = { admDate: '', eduLevel: '', grdStatus: '', grdDate: '', schoolName: '', major: ''};
const skillDefault = { skillName: '', skillDetail: ''};
const certDefault = { acqDate: '', certName: '', grade: '', issuer: ''};
const resume = ref({ ...resumeDefault });
const career = ref({ ...careerDefault });
const edu = ref({ ...eduDefault });
const skill = ref({ ...skillDefault });
const cert = ref({ ...certDefault });
const isAddCareer = ref(false);
const isAddEdu = ref(false);
const isAddSkill = ref(false);
const isAddCert = ref(false);
const fileData = ref(null);
const fileImgSrc = ref(null);

const { data: resumeDetail } = useResumeDetailReadQuery(resIdx, resume, isEditable);
const { mutate: handlerSelectFileBtn } = useResumeFileSelectMutation(fileData, fileImgSrc);
const { mutate: handlerDeleteFileBtn } = useResumeFileDeleteMutation(resIdx);
const { mutate: handlerUpdateResumeBtn } = useResumeDetailUpdateMutation(fileData);
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

const handlerPrintBtn = () => {
  const savedEditable = isEditable.value
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
}

const handlerBackBtn = () => {
  if (modalStore.modalState) modalStore.modalState = false;
  else router.go(-1);
}

onMounted(() => {
  resIdx.value = props.resIdx || route.query.resIdx;
})
</script>

<style lang="scss" scoped>
.garo_wrapper {
  display: flex;
  align-items: center; /* 세로방향 내 정렬 */
  width: 100%; /* 부모 요소의 전체 너비 차지 */
  margin-bottom: 15px;
}

.sero_wrapper {
  display: flex;
  flex-direction: column; /* 세로 나열, 없으면 기본값 가로 나열 */
  justify-content: center; /* 가로방향 내 정렬 */
  width: 100%; /* 부모 요소의 전체 너비 차지 */
  margin-bottom: 15px;
  padding: 15px;
  overflow-y: auto; /* 세로 방향으로 넘칠시 스크롤 기능 */
  resize: vertical;  /* 세로 방향으로만 크기 조정 가능 */
  border-radius: 10px;
  background-color: rgba(222, 184, 135, 0.849); /* 나무 원목 색 */
}

label {
  flex: 0 1 clamp(2vw, 5vw, 8vw); /* 1번째인자: 비례증가x, 2번째인자: 비례감소o, 3번재인자: 기본크기, */
  font-size: clamp(0.8vw, 0.9vw, 1vw); /* clamp(최소크기, 기본크기, 최대크기), vw: 1vw당 뷰포트(기기or브라우저창)의 1% */
  font-weight: bold; /* 굵은글씨 */
}

input,
textarea,
select {
  flex: 1 0 clamp(2vw, 5vw, 8vw);
  font-size: clamp(0.6vw, 0.7vw, 0.8vw);
  min-width: 0; /* 최소 크기 제한 제거 */
  box-sizing: border-box; /* 경계 포함 크기 계산 */
  border: 1px solid rgb(0, 0, 0);
  border-radius: 10px;
  padding: 10px;
  overflow-y: auto; /* 세로 방향으로 넘칠시 스크롤 기능 */
  resize: vertical;  /* 세로 방향으로만 크기 조정 가능 */

  &:focus,
  &:hover {
    flex: 1 0 clamp(2vw, 5vw, 8vw); /* 나머지 공간을 입력 필드가 차지 */
    box-sizing: border-box;
    border: 1px solid black;
    border-radius: 10px;
    border-color: rgb(52, 152, 219); /* 포커스 시 테두리 색상 변경 (파란색) */
    background-color: rgb(230, 247, 255); /* 포커스 시 배경색 변경 (연한 파란색) */
    box-shadow: 0 0 5px rgba(52, 152, 219, 0.6); /* 파란색 그림자 추가 */
    padding: 10px;
    outline: none;
  }
}

.add_btn,
img {
  &:hover {
    border: 2px solid black;
    border-color: rgb(52, 152, 219); /* 포커스 시 테두리 색상 변경 (파란색) */
    background-color: rgb(230, 247, 255); /* 포커스 시 배경색 변경 (연한 파란색) */
    box-shadow: 0 0 5px rgba(52, 152, 219, 0.6); /* 파란색 그림자 추가 */
  }
}

.resumeDetail_header {
  margin-bottom: 1px;
  font-size: clamp(1.3vw, 1.4vw, 1.5vw);
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
  font-size: clamp(0.8vw, 0.9vw, 1vw);
}

.career_table {
  border: 1px solid black;
  border-radius: 10px;
  margin-bottom: 10px;
  padding: 10px;
  color: black;
  font-size: 0.9em;

  display: grid;
  grid-template-columns: 4fr 4fr 2fr 2fr;
  grid-template-areas:
    "startDate company dept dept "
    "endDate position reason reason "
    "crrDesc crrDesc crrDesc crrDesc "
    "empty empty empty button ";
  gap: 16px;
}

@media (max-width: 1500px) {
  .career_table {
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      "startDate endDate "
      "company dept "
      "position reason "
      "crrDesc crrDesc "
      "empty button ";
  }
}

@media (max-width: 900px) {
  .career_table {
    grid-template-columns: 1fr;
    grid-template-areas:
      "startDate "
      "endDate "
      "company "
      "dept "
      "position "
      "reason "
      "crrDesc "
      "button ";
  }
}

.edu_table {
  border: 1px solid black;
  border-radius: 10px;
  margin-bottom: 10px;
  padding: 10px;
  color: black;
  font-size: 0.9em;

  display: grid;
  grid-template-columns: 4fr 4fr 2fr 2fr;
  grid-template-areas:
    "admDate eduLevel grdStatus grdStatus "
    "grdDate schoolName major major "
    "empty empty empty button ";
  gap: 16px;
}

@media (max-width: 1500px) {
  .edu_table {
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      "admDate grdDate "
      "eduLevel grdStatus "
      "schoolName major "
      "empty button ";
  }
}

@media (max-width: 900px) {
  .edu_table {
    grid-template-columns: 1fr;
    grid-template-areas:
      "admDate "
      "grdDate "
      "eduLevel "
      "grdStatus "
      "schoolName "
      "major "
      "button ";
  }
}

.skill_table {
  border: 1px solid black;
  border-radius: 10px;
  margin-bottom: 10px;
  padding: 10px;
  color: black;
  font-size: 0.9em;

  display: grid;
  grid-template-columns: 4fr 6fr 2fr;
  grid-template-areas:
    "skillName skillDetail skillDetail "
    "empty empty button ";
  gap: 16px;
}

@media (max-width: 900px) {
  .skill_table {
    grid-template-columns: 1fr;
    grid-template-areas:
      "skillName "
      "skillDetail "
      "button ";
  }
}

.cert_table {
  border: 1px solid black;
  border-radius: 10px;
  margin-bottom: 10px;
  padding: 10px;
  color: black;
  font-size: 0.9em;

  display: grid;
  grid-template-columns: 4fr 8fr 2fr;
  grid-template-areas:
    "acqDate certName certName "
    "grade issuer issuer "
    "empty empty button ";
  gap: 16px;
}

@media (max-width: 900px) {
  .cert_table {
    grid-template-columns: 1fr;
    grid-template-areas:
      "acqDate "
      "certName "
      "grade "
      "issuer "
      "button ";
  }
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
