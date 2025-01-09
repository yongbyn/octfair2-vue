<template>
  <div class="withdraw-sentence-container">
    사용하고 계신 아이디(세션ID)를 탈퇴할 경우 재사용 및 복구가 불가능합니다.
    <br />
    탈퇴 후 회원정보 및 개인형 서비스 이용기록은 모두 삭제됩니다.<br />
    안내 사항을 모두 확인하였으며, 이에 동의합니다.<br />
  </div>
  <div class="withdraw-button-container">
    <b-button @click="handlerUserDeleteModal">확인</b-button>
  </div>
  <WithdrawModal v-if="modalStore.modalState" />
</template>

<script setup>
import { useModalStore } from "../../../stores/modalState";
import WithdrawModal from "./WithdrawModal.vue";

const modalStore = useModalStore();

const handlerUserDeleteModal = () => {
  modalStore.setModalState();
};
</script>

<style scoped></style>
