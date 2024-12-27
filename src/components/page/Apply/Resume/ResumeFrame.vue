<template>
  <!-- ResumeFrame: ResumeDetail을 모달 or 페이지 형식 중 어떤 형식으로 띄울질 결정 -->

  <!-- modalState에 true값을 받고 오면 모달창 형식으로 랜더링 -->
  <template v-if="!modalStore.modalState">
    <ContextBox>이력서 작성</ContextBox>
    <br />
    <ResumeDetail :resIdx="props.resIdx" />
  </template>

  <!-- modalState에 false값을 받고 오면 페이지 형식으로 랜더링 -->
  <template v-else>
    <teleport to="body">
      <div class="modal_overlay" @click="modalStore.modalState = false">
        <div class="modal_content" @click.stop="">
          <h1>이력서</h1>
          <br />
          <ResumeDetail :resIdx="props.resIdx" />
        </div>
      </div>
    </teleport>
  </template>
</template>

<script setup>
import { useModalStore } from "../../../../stores/modalState";
import ResumeDetail from "./ResumeDetail.vue";

const modalStore = useModalStore();
const props = defineProps(["resIdx"]);
</script>

<style>
.modal_overlay {
  /* 모달 오버레이: 모달 주위 암막 */
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
}

.modal_content {
  /* 모달 크기에 따른 모달 내부 컨텐츠 크기 조정 */
  width: 50%; /* 모달 너비 */
  max-height: 80%; /* 모달 최대 높이 */
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 221, 255, 0.8);
  background: #fff; /* 모달 배경 */
  overflow-y: auto; /* 세로 스크롤 */
}
</style>
