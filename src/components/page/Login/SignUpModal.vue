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
                placeholder="4~20자(숫자, 영문 조합)"
              />
              <button
                class="idCheckBtn"
                :disabled="idDisabledBtn"
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
              >비밀번호 <span class="required">*</span>
            </label>
          </th>
          <td>
            <input
              type="password"
              id="userPwd"
              v-model="userPwd"
              placeholder="4~18자(숫자, 영문, 특수문자 조합)"
            />
            <div class="userPwdStatus">사용가능</div>
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
            <div class="userPwdCkStatus">일치</div>
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
        <button class="signUpBtn">가입하기</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { kakaoPostcode } from "@/common/kakaoPostCodeApi";
import { toast } from "@/common/toastMessage";
import { useModalStore } from "@/stores/modalState";
import { ref, watch } from "vue";
import { useSignUpIdCheck } from "../../../hook/signUp/useSignUpIdCheck";

const modalStore = useModalStore();
const idDisabledBtn = ref(true); // 아이디 중복확인 버튼
const userId = ref("");
const isChecked = ref(false); // 아이디 중복 체크 상수
const userPwd = ref("");
const postCode = ref("");
const address = ref("");
const userBirthday = ref("");

// 아이디 변경될 때 실행되어 중복확인 버튼 색상 변경 로직
watch(userId, () => {
  const idCheckBtn = document.querySelector(".idCheckBtn");

  if (idCheckBtn) {
    if (userId.value.length >= 6 && userId.value.length <= 20) {
      idCheckBtn.disabled = false;
      idCheckBtn.style.backgroundColor = "gray";
    } else {
      idCheckBtn.disabled = true;
      idCheckBtn.style.backgroundColor = "gainsboro";
    }
  }
});

// 아이디 중복 체크
const { mutate: handlerIdCheck } = useSignUpIdCheck(userId, isChecked);

// 비밀번호 사용 가능 여부 체크
watch(userPwd, () => {
  const userPwdStatus = document.querySelector(".userPwdStatus");

  /*
  (?=(.*[a-zA-Z])) : 문자를 포함해야 함
  (?=(.*\d)) : 숫자를 포함해야함
  (?=(.*[!@#$%^&*])) : 특수문자를 포함해야함
  [a-zA-Z0-9!@#$%^&*] : 여기 있는 글자만 사용한다.
  {4,18} : 4~18 글자
  */
  const regEx =
    /^(?=(.*[a-zA-Z]))(?=(.*\d))(?=(.*[!@#$%^&*]))[a-zA-Z0-9!@#$%^&*]{4,18}$/;

  if (regEx.test(userPwd)) {
    userPwdStatus.style.display = "inline-flex";
  } else {
    userPwdStatus.style.display = "none";
  }
});

// 생년월일 유효성 체크(과거~오늘 선택가능, 미래 선택불가)
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

//  모달창 닫기 버튼(ESC로도 닫기 가능)
const signUpModalCloseBtn = () => {
  modalStore.setModalState();
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
label {
  display: inline-flex;
  white-space: nowrap;
  margin-right: 20px;
}

.signupTitle {
  text-align: center;
}
input[type="text"],
input[type="password"],
input[type="date"] {
  width: 220px;
  height: 20px;
  border: 1px solid darkgray;
  border-radius: 4px;
}
::placeholder {
  font-size: 12px;
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

.userPwdStatus,
.userPwdCkStatus {
  width: 95.34px;
  height: 30px;
  background-color: green;
  color: white;
  margin-left: 10px;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  display: none;
}
</style>
