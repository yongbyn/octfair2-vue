<template>
    <div class="findPwdModal">
        <div class="findPwdModalContent">
            <div class="findPwdModalTitle">
                <h2>비밀번호 수정</h2>
                <span>
                    <img
                        src="../../../../public/icon_close.png"
                        class="closeModalBtn"
                        @click="updatePwdModalCloseBtn"
                        alt="close"
                    />
                </span>
            </div>
            <table>
                <tr>
                    <td colspan="3">
                        <hr />
                    </td>
                </tr>

                <tr class="findIdTr">
                    <th>
                        <label for="pwd">현재 비밀번호</label>
                    </th>
                    <td>
                        <input
                            type="password"
                            id="pwd"
                            v-model="updatePwd.passwd"
                            placeholder="현재 비밀번호를 입력하세요."
                        />
                    </td>
                </tr>

                <tr class="findIdTr">
                    <th>
                        <label for="newPwd">새 비밀번호</label>
                    </th>
                    <td>
                        <input
                            type="password"
                            id="newPwd"
                            v-model="updatePwd.newPasswd"
                            placeholder="숫자, 영문, 특수문자 조합(4~20자)"
                        />
                    </td>
                </tr>

                <tr class="findIdTr">
                    <th>
                        <label for="newPwdCk">새 비밀번호 확인</label>
                    </th>
                    <td>
                        <input
                            type="password"
                            id="newPwdCk"
                            v-model="updatePwd.newPasswdConfirm"
                            placeholder="새 비밀번호를 다시 입력하세요."
                        />
                    </td>
                </tr>
            </table>
            <button
                class="handlerFindPwdBtn"
                @click="handlerUpdatePwdValid"
            >
            수정
            </button>
        </div>
    </div>
</template>

<script setup>
import { toast } from "@/common/toastMessage";
import { useModalStore } from "@/stores/modalState";
import { ref } from "vue";
import { useUpdatePwd } from "../../../hook/mypage/useUpdatePwd";

const modalStore = useModalStore();
const updatePwd = ref({
    passwd: "",
    newPasswd: "",
    newPasswdConfirm: "",
});

// 비밀번호 정규식(4~20자리)
const regExPwd = /^[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]{4,20}$/;

// 비밀번호 수정 유효성 검사
const handlerUpdatePwdValid = () => {
    const { passwd, newPasswd, newPasswdConfirm } = updatePwd.value;

    if (!passwd || !newPasswd || !newPasswdConfirm) {
        toast.error("빈칸을 모두 입력해주세요.");
        return;
    }
    if (newPasswd !== newPasswdConfirm) {
        toast.error("새 비밀번호가 일치하지 않습니다.");
        return;
    }
    if (!regExPwd.test(newPasswd)) {
        toast.error("비밀번호는 4~20자fh");
        return;
    }
    handlerUpdatePwd();
}

// 비밀번호 수정
const { mutate: handlerUpdatePwd } = useUpdatePwd(updatePwd);

// 모달창 닫기 버튼
const updatePwdModalCloseBtn = () => {
    modalStore.setModalState();
};
</script>

<style scoped>
  /* 모달 전체 스타일 */
.findPwdModal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

  /* 모달 내용 박스 */
.findPwdModalContent {
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    width: 480px;
    height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.findPwdModalTitle {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 20px;
    padding: 10px 20px;
    border-radius: 10px 10px 0 0;
}

.closeModalBtn {
    width: 40px;
    cursor: pointer;
    transition:
    transform 0.2s ease,
    opacity 0.2s ease;
}

.closeModalBtn:hover {
    opacity: 0.7;
    transform: scale(1.1);
}

hr {
    border: 0;
    border-top: 1px solid gray;
    margin-bottom: 40px;
}
table {
    width: 100%;
}

th {
    background-color: rgb(220, 220, 220);
    width: 30%;
    text-align: center;
}

input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 14px;
    box-sizing: border-box;
}

button {
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    transition:
    background-color 0.3s ease,
    transform 0.2s ease;
}

button:hover {
    background-color: #0056b3;
    transform: scale(1.05);
}
</style>
