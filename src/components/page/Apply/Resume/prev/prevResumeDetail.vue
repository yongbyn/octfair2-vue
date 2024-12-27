<template>
  <div>
    <ContextBox>이력서 수정/작성</ContextBox>
    <div class="container">
      <div class="detailHeader">
        <label>
          <input
            id="resumeTitle"
            type="text"
            placeholder="이력서 제목"
            v-model="resumeDetail.resTitle"
            ref="resTitle"
          />
          <div id="userName">{{ resumeDetail.userNm }}</div>
          <div id="userEmail">{{ resumeDetail.email }}</div>
          <div id="userPhone">{{ resumeDetail.phone }}</div>
        </label>
      </div>

      <div class="detailBody">
        <div class="detailBodyHeader">간단 소개글</div>
        <div class="detailBodyGuideText">
          <p>
            • 본인의 업무 경험을 기반으로 핵심 역량과 업무 스킬을 간단히 작성해
            주세요. <br />
            • 3~5줄로 요약하여 작성하는 것을 추천합니다!
          </p>
        </div>
      </div>
      <div>
        <textarea
          class="form-control"
          placeholder="소개글을 입력해 주세요."
          rows="5"
          v-model="resumeDetail.shortIntro"
          ref="shortIntro"
          @input="TextareaAutoResize"
          :style="{ overflow: 'hidden' }"
        />
      </div>

      <!-- 경력 -->
      <!-- 학력 -->
      <!-- 스킬 -->
      <!-- 자격증 및 외국어 -->
      <div class="detailBody">
        <div class="detailBodyHeader">링크</div>
        <div class="detailBodyGuideText">
          • 깃허브, 노션으로 작성한 포트폴리오, 구글 드라이브 파일 등 업무
          성과를 보여줄 수 있는 링크가 있다면 작성해 주세요.
        </div>
        <div>
          <input
            class="form-control"
            type="text"
            placeholder="https://"
            v-model="resumeDetail.proLink"
            ref="proLink"
          />
        </div>
      </div>

      <div class="detailBody">
        <div class="detailBodyHeader">자기소개서</div>
        <div class="detailBodyGuideText">
          • 지원 동기, 직무 역량, 직무 관련 성과와 경험, 포부 등 자유롭게 작성해
          주세요.
        </div>
        <div>
          <textarea
            class="form-control"
            plcaeholder="자기소개서를 입력해 주세요."
            rows="5"
            v-model="resumeDetail.perStatement"
            ref="perStatement"
            @input="TextareaAutoResize"
            :style="{ overflow: 'hidden' }"
          />
        </div>
      </div>

      <div class="detailBody">
        <div class="detailBodyHeader">첨부파일</div>
        <div class="detailBodyGuideText">
          • 포트폴리오, 경력 기술서 등 첨부 파일이 있다면 등록해 주세요.
        </div>
        <div v-if="resumeDetail.fileName">
          <div class="form-control" :style="{ cursor: 'pointer' }">
            <span id="fileName">
              {{ resumeDetail.fileName }}
            </span>
            <button id="deleteIcon">삭제</button>
          </div>
          <input type="file" className="form-control" ref="fileInputRef" />
        </div>
        <div v-else>
          <input type="file" className="form-control" ref="fileInputRef" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { useRoute } from "vue-router";
import { useResumeStore } from "../../../../../stores/resumeStore";

const resumeDetail = ref({});
const { params } = useRoute();
const resTitle = ref(null);
const shortIntro = ref(null);
const proLink = ref(null);
const perStatement = ref(null);
const resumeStore = useResumeStore();

const searchDetail = (resIdx) => {
  axios.post("/prx/api/apply/resumeDetail.do", { resIdx }).then((res) => {
    resumeDetail.value = res.data.payload;
  });
};

const TextareaAutoResize = (event) => {
  const target = event.target;
  target.style.height = "auto"; // 높이 초기화
  target.style.height = `${target.scrollHeight}px`; // 스크롤 높이 재설정
};

onMounted(() => {
  searchDetail(params.idx);
  resumeStore.setResIdx(params.idx);
});
</script>

<style>
textarea {
  width: 100%;
  resize: none; /* 크기 조절 금지 */
  box-sizing: border-box; /* 패딩과 테두리를 포함한 크기 설정 */
}

input {
  width: 100%;
}

#resumeTitle {
  width: 100%;
  height: 50px;
  font-size: 30px;
  margin-top: 10px;
}
</style>
