<template>
  <div style="display: flex; justify-content: space-between">
    <h4>
      <b-badge variant="light">
        총
        <b-badge pill variant="primary">
          {{ resumeList?.resumeCnt || 0 }}
        </b-badge>
        개의 글
      </b-badge>
    </h4>
    <ResumeNewButton />
  </div>
  <div class="gallery-container" v-if="resumeList?.resumeCnt > 0">
    <div
      class="image-cardbox"
      v-for="resume in resumeList.payload"
      :key="resume.resIdx"
      @click="
        {
          modalStore.modalState = true;
          resIdx = resume.resIdx;
        }
      "
    >
      <div class="image-wrapper">
        <img
          class="image-one"
          v-if="
            resume.logicalPath &&
            /\.(jpg|jpeg|png|bmp|webp|gif)$/i.test(resume.logicalPath)
          "
          :src="`/prx${resume.logicalPath}`"
        />
        <img
          class="image-one"
          v-else
          src="../../../../assets/utilcons/logo.png"
        />
      </div>
      <div class="title_and_file">
        <div>
          {{ resume.resTitle }}
        </div>
        <div>
          <span class="title_above_file">첨부파일: </span>
          <span
            class="file_below_title"
            v-if="resume.fileName"
            @click.stop="
              handlerDownImageBtn({
                resIdx: resume.resIdx,
                fileName: resume.fileName,
              })
            "
            >{{ resume.fileName }}</span
          >
          <span v-else> - </span>
        </div>
      </div>
      <div style="margin-left: 5px; font-size: clamp(8px, 2vw, 11px)">
        {{ resume.updatedDate }}
      </div>
      <div>
        <CommonButton @click.stop="handlerCopyResumeBtn(resume.resIdx)"
          >복사하기</CommonButton
        >
        <CommonButton @click.stop="handlerDeleteResumeBtn(resume.resIdx)"
          >삭제하기</CommonButton
        >
      </div>
    </div>
  </div>
  <div v-else>일치하는 검색 결과가 없습니다</div>

  <!-- 페이지네이션 -->
  <Pagination
    :totalItems="resumeList?.resumeCnt || 0"
    :items-per-page="itemPerPage"
    :max-pages-shown="5"
    v-model="currentPage"
  />

  <!-- 모달 -->
  <CommonModalFrame>
    <ResumeDetail :resIdx="resIdx" />
  </CommonModalFrame>
</template>

<script setup>
import { useQueryClient } from "@tanstack/vue-query";
import { useResumeFileDownMutation } from "../../../../hook/apply/resume/useResumeFileDownMutation";
import { useResumeListReadQuery } from "../../../../hook/apply/resume/useResumeListReadQuery";
import { useResumeOneCopyMutation } from "../../../../hook/apply/resume/useResumeOneCopyMutation";
import { useResumeOneDeleteMutation } from "../../../../hook/apply/resume/useResumeOneDeleteMutation";
import { useModalStore } from "../../../../stores/modalState";

const itemPerPageDefault = 12;
const itemPerPage = ref(itemPerPageDefault * 2);
const currentPage = ref(1);
const queryClient = useQueryClient();
const resIdx = ref("");
const modalStore = useModalStore();

const {
  data: resumeList, // useQuery(useResumeListSearchQuery) 내 callback함수 return값이 입력된다
} = useResumeListReadQuery(itemPerPage, currentPage);
const { mutate: handlerDownImageBtn } = useResumeFileDownMutation();
const { mutate: handlerCopyResumeBtn } = useResumeOneCopyMutation();
const { mutate: handlerDeleteResumeBtn } = useResumeOneDeleteMutation();

// 화면크기 변경시 반응형으로, itemPerRow의 배수이면서 12(itemPerPageDefault)이상인 값을 itemPerPage로 정하는 계산함수
const calculateItemPerPage = () => {
  const gridContainer = document.querySelector(".gallery-container");
  const gridItems = document.querySelectorAll(".image-cardbox");

  if (gridContainer && gridItems.length > 0) {
    const containerWidth = gridContainer.offsetWidth;
    const itemWidth = gridItems[0].offsetWidth;
    let itemPerRow = Math.floor(containerWidth / itemWidth);

    itemPerPage.value = Math.ceil(itemPerPageDefault / itemPerRow) * itemPerRow;
    queryClient.invalidateQueries({ queryKey: ["resumeList"] });
  }
};

onMounted(() => {
  setTimeout(() => {
    calculateItemPerPage();
  }, 500); // mount가 완료될때쯤 까지 delay건 후 calculateItemPerPage 함수 실행
  window.addEventListener("resize", calculateItemPerPage); // 리사이즈 이벤트 리스너 등록
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", calculateItemPerPage); // 리사이즈 이벤트 리스너 제거
});
</script>

<style lang="scss" scoped></style>
