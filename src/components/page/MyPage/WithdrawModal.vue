<template>
  <div class="modal-container">
    <div class="modal-content">
      <div class="modal-header">
        <h3>비밀번호 확인</h3>
      </div>

      <div class="modal-body">
        <div class="form-group">
          <label for="password">비밀번호 <span class="font-red">*</span></label>
          <input
            id="password"
            type="password"
            v-model="password"
            placeholder="비밀번호 입력"
          />
        </div>
      </div>

      <div class="modal-footer">
        <b-button variant="primary" @click="handlerClickUserDelete"
          >확인</b-button
        >
        <b-button variant="secondary" @click="handlerModalClose">취소</b-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserDeleteMutation } from "../../../hook/mypage/useUserDeleteMutation";
import { useModalStore } from "../../../stores/modalState";
import { useUserInfo } from "../../../stores/userInfo";

const modalStore = useModalStore();
const { user } = useUserInfo();
const password = ref("");

const { mutate: handlerUserDelete } = useUserDeleteMutation();

const handlerClickUserDelete = () => {
  handlerUserDelete({ loginId: user.loginId, password: password.value });
};

const handlerModalClose = () => {
  modalStore.setModalState();
};
</script>

<style scoped>
.modal-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: #f4f4f4;
  width: 400px;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.modal-header {
  background: #354a5f;
  color: white;
  padding: 15px;
  text-align: center;
  font-size: 1.2rem;
  font-weight: bold;
}

.modal-body {
  padding: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

.form-group .font-red {
  color: red;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.modal-footer {
  display: flex;
  justify-content: center;
  padding: 15px;
  background: #e9e9e9;
  gap: 10px;
}

.modal-footer b-button {
  flex: 1;
  margin: 0 5px;
}
</style>
