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
            <b-form-group>
              <b-form-radio-group
                v-model="signUpUserInfo.userType"
                :options="[
                  { value: 'A', text: '일반회원' },
                  { value: 'B', text: '기업회원' },
                ]"
                button-variant="outline-info"
                name="radio-btn-outline"
                buttons
              ></b-form-radio-group>
            </b-form-group>
          </td>
        </tr>

        <tr>
          <th>
            <label for="loginId">아이디 <span class="required">*</span> </label>
          </th>
          <td>
            <b-col class="d-flex align-items-center">
              <b-form-input
                id="loginId"
                class="userId"
                :state="idState"
                placeholder="아이디는 숫자, 영문 조합(4~20자)"
                v-model="signUpUserInfo.loginId"
              ></b-form-input>
              <b-button
                id="idCheckBtn"
                variant="outline-secondary"
                class="idCheckBtn"
                @click="idValid"
              >
                중복 확인
              </b-button>
            </b-col>
          </td>
        </tr>

        <tr>
          <th>
            <label for="password"
              >비밀번호
              <span class="required">*</span>
            </label>
          </th>
          <td>
            <b-col class="d-flex align-items-center">
              <b-form-input
                id="password"
                type="password"
                :state="pwdState"
                placeholder="비밀번호는 숫자,영어 포함 4~40자 입력"
                v-model="signUpUserInfo.password"
                @blur="pwdValid"
              ></b-form-input>
            </b-col>
            <div v-show="pwdState === false" class="statusPwd">
              숫자,영어 포함 4~40자 입력
            </div>
          </td>
        </tr>

        <tr>
          <th>
            <label for="passwordCk"
              >비밀번호 확인
              <span class="required">*</span>
            </label>
          </th>
          <td>
            <b-col class="d-flex align-items-center">
              <b-form-input
                id="passwordCk"
                type="password"
                :state="pwdCkState"
                placeholder="비밀번호를 다시 입력하세요."
                v-model="signUpUserInfo.passwordCk"
                @blur="pwdCkValid"
              ></b-form-input>
            </b-col>
            <div v-show="pwdCkState === false" class="statusPwdCk">
              올바른 비밀번호를 입력해주세요.
            </div>
          </td>
        </tr>

        <tr>
          <th>
            <label for="name"
              >이름
              <span class="required">*</span>
            </label>
          </th>
          <td>
            <b-col class="d-flex align-items-center">
              <b-form-input
                id="name"
                type="name"
                :state="nameState"
                placeholder="이름을 입력하세요.(한글2자 이상)"
                v-model="signUpUserInfo.name"
                @blur="nameValid"
              ></b-form-input>
            </b-col>
            <div v-show="nameState === false" class="name">
              한글 2자 이상으로 입력하세요.
            </div>
          </td>
        </tr>

        <tr>
          <th>성별 <span class="required">*</span></th>
          <td>
            <b-form-radio-group
              v-model="signUpUserInfo.sex"
              :options="[
                { value: '1', text: '남자' },
                { value: '2', text: '여자' },
              ]"
              button-variant="outline-info"
              name="radio-btn-outline"
              buttons
            ></b-form-radio-group>
          </td>
        </tr>

        <tr>
          <th>
            <label for="birthday"
              >생년월일 <span class="required">*</span></label
            >
          </th>
          <td>
            <b-form-input
              type="date"
              :state="birthdayState"
              v-model="signUpUserInfo.birthday"
              @input="birthdayValid"
            ></b-form-input>
          </td>
        </tr>

        <tr>
          <th>
            <label for="phone">전화번호 <span class="required">*</span></label>
          </th>
          <td>
            <input
              id="phone"
              class="form-control"
              v-model="signUpUserInfo.phone"
              :state="phoneState"
              placeholder="전화번호를 입력하세요.(숫자만 입력하세요.)"
            />
          </td>
        </tr>

        <tr>
          <th>
            <label for="emailId">이메일 <span class="required">*</span></label>
          </th>
          <td>
            <div class="d-flex align-items-center">
              <b-form-input
                type="text"
                id="emailId"
                class="emailId form-control me-1"
                v-model="signUpUserInfo.emailId"
                placeholder="이메일을 입력하세요."
              />
              <span>@</span>
              <span v-if="signUpUserInfo.emailDomain === 'userCustomDomain'">
                <b-form-input
                  type="text"
                  class="inputEmail ms-2"
                  placeholder="입력하세요."
                  v-model="signUpUserInfo.userCustomDomain"
                />
              </span>
              <b-form-select
                id="emailDomain"
                class="form-control">
                  <option value="" disabled>선택하세요</option>
                  <option value="gmail.com">gmail.com</option>
                  <option value="naver.com">naver.com</option>
                  <option value="daum.net">daum.net</option>
                  <option value="userCustomDomain">직접입력</option>
              </b-form-select>
              <!-- <select id="emailDomain" class="form-control ms-1 emailDomain" v-model="signUpUserInfo.emailDomain">
                <option value="" disabled>선택하세요.</option>
                <option value="gmail.com">gmail.com</option>
                <option value="naver.com">naver.com</option>
                <option value="daum.net">daum.net</option>
                <option value="userCustomDomain">직접입력</option>
              </select> -->
            </div>
          </td>
        </tr>

        <tr>
          <th>우편번호 <span class="required">*</span></th>
          <td>
            <input
              type="text"
              class="zipCodeInput"
              v-model="signUpUserInfo.zipCode"
              readonly
            />
            <button class="zipCodeBtn" @click="handlerKakaoPost">
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
              v-model="signUpUserInfo.address"
              readonly
            />
          </td>
        </tr>

        <tr>
          <th><label for="detailAddress">상세주소</label></th>
          <td>
            <input
              type="text"
              id="detailAddress"
              class="detailAddressInput"
              v-model="signUpUserInfo.detailAddress"
            />
          </td>
        </tr>

        <tr>
          <td colspan="2"><hr /></td>
        </tr>
      </table>
      <div class="buttons">
        <button @click="signUpModalCloseBtn()">닫기</button>
        <button class="signUpBtn" @click="handlerSignUp" disabled>
          가입하기
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { kakaoPostcode } from "@/common/kakaoPostCodeApi";
import { toast } from "@/common/toastMessage";
import { useModalStore } from "@/stores/modalState";
import { ref, watch } from "vue";
import { signUp } from "../../../hook/Login/signUp";
import { useSignUpIdCheck } from "../../../hook/Login/useSignUpIdCheck";

const modalStore = useModalStore();

const idState = ref(null);
const pwdState = ref(null);
const pwdCkState = ref(null);
const nameState = ref(null);
const birthdayState = ref(null);
const phoneState = ref(null);

const signUpUserInfo = ref({
  // 회원가입 사용자 정보
  action: "I",
  userType: "",
  loginId: "",
  password: "",
  passwordCk: "",
  name: "",
  sex: "",
  birthday: "",
  phone: "",
  email: "",
  emailId: "",
  emailDomain: "",
  userCustomDomain: "",
  zipCode: "",
  address: "",
  detailAddress: "",
});

// 1. 아이디 중복체크
const idValid = () => {
  const regExId = /^(?=.*[A-Za-z])(?=.*\d)[a-zA-Z0-9]{4,20}$/;

  if (!regExId.test(signUpUserInfo.value.loginId)) {
    toast.error("아이디는 영문, 숫자 모두 포함해야 하며 4~20자리여야 합니다.");
    idState.value = false;
    document.getElementById("loginId").focus();
    return;
  } else {
    handlerIdCheck();
  }
};
watch(
  () => signUpUserInfo.value.loginId,
  () => {
    if (idState.value !== null) {
      idState.value = false;
    }
  }
);
const { mutate: handlerIdCheck } = useSignUpIdCheck(signUpUserInfo, idState);

const regExPwd =
  /^(?=.*[A-Za-z])(?=.*\d)[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]{4,20}$/;
// 2. 비밀번호 유효성 검사
const pwdValid = () => {
  if (regExPwd.test(signUpUserInfo.value.password)) {
    pwdState.value = true;
    pwdCkValid();
  } else {
    pwdState.value = false;
    pwdCkState.value = false;
  }
};
const pwdCkValid = () => {
  if (
    signUpUserInfo.value.password === signUpUserInfo.value.passwordCk &&
    regExPwd.test(signUpUserInfo.value.password) &&
    regExPwd.test(signUpUserInfo.value.passwordCk)
  ) {
    pwdCkState.value = true;
  } else {
    pwdCkState.value = false;
  }
};

// 3. 이름 유효성 검사
const nameValid = () => {
  const regExName = /^[가-힣]{2,}$/;

  if (!regExName.test(signUpUserInfo.value.name)) {
    nameState.value = false;
  } else {
    nameState.value = true;
  }
};

// 4. 생년월일 유효성 검사(과거~오늘 선택가능, 미래 선택불가)
const birthdayValid = () => {
  const birthdayDate = new Date(signUpUserInfo.value.birthday);
  const today = new Date();

  birthdayDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  if (birthdayDate > today || signUpUserInfo.value.birthday === "") {
    toast.error("미래의 날짜로 선택 할 수 없습니다.");
    birthdayState.value = false;
    signUpUserInfo.value.birthday = "";
  } else {
    birthdayState.value = true;
  }
};

// 5. 전화번호 정규식
watch(
  () => signUpUserInfo.value.phone,
  () => {
    let regExPhoneReplace = signUpUserInfo.value.phone.replace(/[^0-9]/g, "");

    if (/^(02)/.test(regExPhoneReplace)) {
      if (regExPhoneReplace.length <= 2) {
        regExPhoneReplace = regExPhoneReplace;
      } else if (regExPhoneReplace.length <= 3) {
        regExPhoneReplace = regExPhoneReplace.replace(/^(\d{2})(\d{1})$/, "$1-$2");
      } else if (regExPhoneReplace.length <= 4) {
        regExPhoneReplace = regExPhoneReplace.replace(/^(\d{2})(\d{2})$/, "$1-$2");
      } else if (regExPhoneReplace.length <= 5) {
        regExPhoneReplace = regExPhoneReplace.replace(/^(\d{2})(\d{3})$/, "$1-$2");
      } else if (regExPhoneReplace.length <= 6) {
        regExPhoneReplace = regExPhoneReplace.replace(/^(\d{2})(\d{3})(\d{1})$/, "$1-$2-$3");
      } else if (regExPhoneReplace.length <= 7) {
        regExPhoneReplace = regExPhoneReplace.replace(/^(\d{2})(\d{3})(\d{2})$/, "$1-$2-$3");
      } else if (regExPhoneReplace.length <= 8) {
        regExPhoneReplace = regExPhoneReplace.replace(/^(\d{2})(\d{3})(\d{3})$/, "$1-$2-$3");
      } else if (regExPhoneReplace.length <= 9) {
        regExPhoneReplace = regExPhoneReplace.replace(/^(\d{2})(\d{3})(\d{4})$/, "$1-$2-$3");
      } else if (regExPhoneReplace.length <= 10) {
        regExPhoneReplace = regExPhoneReplace.replace(/^(\d{2})(\d{4})(\d{4})$/, "$1-$2-$3");
      } else {
        regExPhoneReplace = regExPhoneReplace.slice(0, 10);
      }
    }
    else if (/^(010|031|032|033|041|042|043|044|051|052|053|054|055|061|062|063|064)/.test(regExPhoneReplace)) {
    if (regExPhoneReplace.startsWith("010")) {
        if (regExPhoneReplace.length <= 3) {
            regExPhoneReplace = regExPhoneReplace;
        } else if (regExPhoneReplace.length <= 7) {
            regExPhoneReplace = regExPhoneReplace.replace(/^(\d{3})(\d{1,4})$/, "$1-$2");
        } else if (regExPhoneReplace.length <= 11) {
            regExPhoneReplace = regExPhoneReplace.replace(/^(\d{3})(\d{4})(\d{1,4})$/, "$1-$2-$3");
        } else {
          regExPhoneReplace = regExPhoneReplace.slice(0, 11);
        }
    } else {
        if (regExPhoneReplace.length <= 3) {
            regExPhoneReplace = regExPhoneReplace;
        } else if (regExPhoneReplace.length <= 4) {
            regExPhoneReplace = regExPhoneReplace.replace(/^(\d{3})(\d{1})$/, "$1-$2");
        } else if (regExPhoneReplace.length <= 5) {
            regExPhoneReplace = regExPhoneReplace.replace(/^(\d{3})(\d{2})$/, "$1-$2");
        } else if (regExPhoneReplace.length <= 6) {
            regExPhoneReplace = regExPhoneReplace.replace(/^(\d{3})(\d{3})$/, "$1-$2");
        } else if (regExPhoneReplace.length <= 7) {
            regExPhoneReplace = regExPhoneReplace.replace(/^(\d{3})(\d{3})(\d{1})$/, "$1-$2-$3");
        } else if (regExPhoneReplace.length <= 8) {
            regExPhoneReplace = regExPhoneReplace.replace(/^(\d{3})(\d{3})(\d{2})$/, "$1-$2-$3");
        } else if (regExPhoneReplace.length <= 9) {
            regExPhoneReplace = regExPhoneReplace.replace(/^(\d{3})(\d{3})(\d{3})$/, "$1-$2-$3");
        } else if (regExPhoneReplace.length <= 10) {
            regExPhoneReplace = regExPhoneReplace.replace(/^(\d{3})(\d{3})(\d{4})$/, "$1-$2-$3");
        } else if (regExPhoneReplace.length <= 11) {
            regExPhoneReplace = regExPhoneReplace.replace(/^(\d{3})(\d{4})(\d{4})$/, "$1-$2-$3");
        } else {
            regExPhoneReplace = regExPhoneReplace.slice(0, 11);
        }
    }
}
    else if (/^\d{4,8}$/.test(regExPhoneReplace)) {
      if (regExPhoneReplace.length <= 4) {
        regExPhoneReplace = regExPhoneReplace;
      } else {
        regExPhoneReplace = regExPhoneReplace.replace(/^(\d{4})(\d{1,4})$/, "$1-$2");
      }
    }
    else {
      regExPhoneReplace = regExPhoneReplace.slice(0, 8);
    }

    signUpUserInfo.value.phone = regExPhoneReplace;

    const phoneValid = /^(02-\d{3,4}-\d{4}|010-\d{4}-\d{4}|\d{3}-\d{3,4}-\d{4}|\d{4}-\d{4})$/.test(
      regExPhoneReplace
    );
    const inputElement = document.getElementById('phone');

    if (phoneValid) {
      inputElement.classList.add('is-valid');
      inputElement.classList.remove('is-invalid');
    } else {
      inputElement.classList.add('is-invalid');
      inputElement.classList.remove('is-valid');
    }
  }
);

// 6. 이메일 유효성 검사
watch(
  () => [
    signUpUserInfo.value.emailId,
    signUpUserInfo.value.emailDomain,
    signUpUserInfo.value.userCustomDomain,
  ],
  () => {
    signUpUserInfo.value.emailId = regExEmailReplace;

    signUpUserInfo.value.email =
      signUpUserInfo.value.emailDomain === "userCustomDomain"
        ? signUpUserInfo.value.emailId +
          "@" +
          signUpUserInfo.value.userCustomDomain
        : signUpUserInfo.value.emailId + "@" + signUpUserInfo.value.emailDomain;
  }
);

// 7. 우편번호 찾기
const handlerKakaoPost = () => {
  kakaoPostcode((data) => {
    signUpUserInfo.value.zipCode = data.zonecode;
    signUpUserInfo.value.address = data.address;
  });
};

// 8. 회원가입 버튼 활성화
// watch([signUpUserInfo.value, () => isIdCheck.value], () => {
//   const signUpBtn = document.querySelector(".signUpBtn");
//   const phonePattern = /-\d{4}$/;
//   if (
//     signUpUserInfo.value.userType &&
//     isIdCheck.value === true &&
//     regExPwd.test(signUpUserInfo.value.password) &&
//     regExPwd.test(signUpUserInfo.value.passwordCk) &&
//     regExName.test(signUpUserInfo.value.name) &&
//     signUpUserInfo.value.sex &&
//     signUpUserInfo.value.birthday &&
//     phonePattern.test(signUpUserInfo.value.phone) &&
//     signUpUserInfo.value.phone.length >= 9 &&
//     signUpUserInfo.value.email &&
//     signUpUserInfo.value.emailDomain &&
//     signUpUserInfo.value.zipCode
//   ) {
//     signUpBtn.disabled = false;
//   } else {
//     signUpBtn.disabled = true;
//   }
// });
// 9. 회원가입 버튼
const { mutate: handlerSignUp } = signUp(signUpUserInfo);

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
  width: 550px;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
}

input {
  padding: 10px;
  font-size: 14px;
  height: 35px;
}

.required {
  color: red;
}

.idCheckBtn {
  margin-left: 10px;
}
.userId {
  width: 240px;
}

.statusPwd,
.statusPwdCk,
.name {
  color: red;
  font-size: 14px;
}

.emailId {
  width: 160px;
}

.inputEmail{
  background-color: burlywood;
  width: 80px;
}

.emailDomain{
  background-color: red;
  width: 20px;
}
b-form-select:hover{
}
</style>
