<template>
  <div class="signUpModal">
    <div class="signUpModalContent">
      <h1 class="signupTitle">회원가입</h1>
      <table>
        <tr>
          <td colspan="2"><hr /></td>
        </tr>

        <tr>
          <th>회원 유형 <span class="required">*</span></th>
          <td>
            <label>
              <input type="radio" name="userType" value="apply" />일반회원
            </label>
            <label>
              <input type="radio" name="userType" value="biz" />기업회원
            </label>
          </td>
        </tr>

        <tr>
          <th>
            <label for="userId">아이디 <span class="required">*</span></label>
          </th>
          <td>
            <div class="table_span">
              <input
                type="text"
                id="userId"
                v-model="userId"
                placeholder="아이디를 입력하세요.(숫자,영어 조합 4~10자)"
                @input="handlerIdCheckBtn"
              />
              <button
                class="idCheckBtn"
                :disabled="idDisabled"
                @click="handlerIdCheck"
              >
                중복 확인
              </button>
            </div>
          </td>
        </tr>

        <tr>
          <th>
            <label for="userPwd"
              >비밀번호 <span class="required">*</span></label
            >
          </th>
          <td>
            <input
              type="password"
              id="userPwd"
              placeholder="숫자, 영어, 특수문자 포함 4~10자"
            />
          </td>
        </tr>

        <tr>
          <th>
            <label for="userPwdCk"
              >비밀번호 확인 <span class="required">*</span></label
            >
          </th>
          <td>
            <input
              type="password"
              id="userPwdCk"
              placeholder="비밀번호를 다시 입력하세요."
            />
          </td>
        </tr>

        <tr>
          <th>
            <label for="userName">이름 <span class="required">*</span></label>
          </th>
          <td>
            <input type="text" id="userName" placeholder="이름을 입력하세요." />
          </td>
        </tr>

        <tr>
          <th>성별 <span class="required">*</span></th>
          <td>
            <form>
              <label>
                <input type="radio" name="userType" value="man" />남자
              </label>
              <label>
                <input type="radio" name="userType" value="women" />여자
              </label>
            </form>
          </td>
        </tr>

        <tr>
          <th>생년월일 <span class="required">*</span></th>
          <td>
            <input type="date" v-model="userBirthday" @change="birthdayCheck" />
          </td>
        </tr>

        <tr>
          <th>
            <label for="userPhone"
              >전화번호 <span class="required">*</span></label
            >
          </th>
          <td>
            <input
              type="text"
              id="userPhone"
              placeholder="전화번호를 입력하세요."
            />
          </td>
        </tr>

        <tr>
          <th>
            <label for="userEmail"
              >이메일 <span class="required">*</span></label
            >
          </th>
          <td>
            <input
              type="text"
              id="userEmail"
              placeholder="이메일을 입력하세요."
            />
            <span v-if="emailDomain !== 'userCustomDomain'"> @ </span>
            <!-- <select id="emailDomain"> -->
            <select id="emailDomain" v-model="emailDomain">
              <option value="">선택하세요.</option>
              <option value="gmail.com">gmail.com</option>
              <option value="naver.com">naver.com</option>
              <option value="daum.net">daum.net</option>
              <option value="userCustomDomain">직접입력</option>
            </select>
          </td>
        </tr>

        <tr>
          <th>우편번호 <span class="required">*</span></th>
          <td>
            <input
              type="text"
              class="postCodeInput"
              v-model="postCode"
              readonly
            />
            <button class="postCodeBtn" @click="handlerKakaoPost">
              우편번호 찾기
            </button>
          </td>
        </tr>

        <tr>
          <th>주소 <span class="required">*</span></th>
          <td>
            <input
              type="text"
              class="addressInput"
              v-model="address"
              readonly
            />
          </td>
        </tr>

        <tr>
          <th><label for="addressDetail">상세주소</label></th>
          <td>
            <input type="text" id="addressDetail" class="addressDetailInput" />
          </td>
        </tr>

        <tr>
          <td colspan="2"><hr /></td>
        </tr>
      </table>
      <div class="buttons">
        <button @click="signUpModalCloseBtn()">닫기</button>
        <button class="signUpBtn" disabled>가입하기</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { kakaoPostcode } from "@/common/kakaoPostCodeApi";
import { toast } from "@/common/toastMessage";
import { useModalStore } from "@/stores/modalState";
import { ref } from "vue";
import { useSignUpIdCheck } from "../../../hook/signUp/useSignUpIdCheck";

const modalStore = useModalStore();
const idDisabled = ref(true);
const postCode = ref("");
const address = ref("");
const userBirthday = ref("");
const userId = ref("");

//아이디 중복 체크 버튼 활성화
const handlerIdCheckBtn = () => {
  idDisabled.value = !(userId.value.length >= 4 && userId.value.length <= 10);
};

// 아이디 중복 체크
//toast.success("중복체크 눌림");
/* 유즈쿼리 get id하나 오는것은 success
  유즈뮤테이션 post나 update, delete  
  */
//const { mutate: handlerIdCheck, } = useSignUpIdCheck(userId, idCheckResult);
const { mutate: handlerIdCheck } = useSignUpIdCheck(userId);

// 생년월일 유효성
const birthdayCheck = () => {
  const userBirthdayDate = new Date(userBirthday.value);
  const today = new Date();

  if (userBirthdayDate >= today) {
    toast.error("다시 선택해주세요!");
    userBirthday.value = "";
  }
};

// 우편번호 찾기
const handlerKakaoPost = () => {
  kakaoPostcode((data) => {
    postCode.value = data.zonecode;
    address.value = data.address;
  });
};

//  모달창 닫기 버튼
const signUpModalCloseBtn = () => {
  modalStore.setModalState();
  toast.success("회원가입 완료");
};
</script>

<style scoped>
/* 모달 전체 스타일 */
.signUpModal {
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
.signUpModalContent {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  width: 480px;

  display: inline-flex;
  flex-direction: column;
  align-items: center;
}

.required {
  color: red;
}

th {
  width: 100px;
  text-align: left;
  height: 33px;
}
th,
td,
input[type="text"],
input[type="password"] {
  font-size: 12px;
}

.signupTitle {
  text-align: center;
}
input[type="text"],
input[type="password"] {
  width: 220px;
  height: 20px;
  border: 1px solid darkgray;
  border-radius: 4px;
}
::placeholder {
  font-size: 10px;
}

.addressInput,
.addressDetailInput {
  width: 250px !important;
}

hr {
  border: 0;
  border-top: 1px solid gray;
}
button {
  width: 120px;
  padding: 10px 20px;
  background-color: #3bb2ea;
  color: #ffffff;
  border: 2px solid transparent;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  transition:
    background-color 0.3s,
    transform 0.2s ease,
    box-shadow 0.3s;
}

.postCodeInput {
  width: 70px !important;
}

.postCodeInput,
.addressInput {
  background-color: gainsboro;
}

button:hover {
  background-color: #87ceeb;
  transform: scale(1.05);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
.buttons {
  margin-top: 20px;
  gap: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.idCheckBtn,
.postCodeBtn {
  font-size: 12px;
  width: auto;
  height: 30px;
  background-color: gray;
  margin-left: 10px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
}
.idCheckBtn:disabled {
  background-color: gainsboro;
}
.postCodeBtn {
  width: 100px;
  white-space: nowrap;
}
.idCheckBtn:hover,
.postCodeBtn:hover {
  background-color: darkgray;
}
.signUpBtn:disabled {
  background-color: #a3e4ff;
}
</style>
