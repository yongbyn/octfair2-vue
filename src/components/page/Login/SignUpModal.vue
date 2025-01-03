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
            <b-form-radio-group
              v-model="signUpUserInfo.userType"
              :options="[
                { value: 'A', text: '일반회원' },
                { value: 'B', text: '기업회원' },
              ]"
              button-variant="outline-primary"
              name="radio-btn-outline"
              buttons
            ></b-form-radio-group>
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
                :variant="
                  idState === null
                    ? 'secondary'
                    : idState
                      ? 'success'
                      : 'danger'
                "
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
                placeholder="비밀번호는 숫자,영어 4~40자 입력"
                v-model="signUpUserInfo.password"
                @input="pwdValid"
              ></b-form-input>
            </b-col>
            <div v-show="pwdState === false" class="statusPwd">
              숫자,영어 4~40자 입력
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
                @input="pwdCkValid"
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
                @input="nameValid"
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
              button-variant="outline-primary"
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
                @input="emailValid"
              />
              <span>@</span>
              <input
                list="emailDomains"
                id="emailDomain"
                name="emailDomain"
                v-model="signUpUserInfo.emailDomain"
                class="form-control ms-1 emailDomain"
                placeholder="이메일 도메인 입력"
                @input="emailValid"
              />
              <datalist id="emailDomains">
                <option value="gmail.com"></option>
                <option value="naver.com"></option>
                <option value="daum.net"></option>
              </datalist>
            </div>
          </td>
        </tr>

        <tr>
          <th>우편번호 <span class="required">*</span></th>
          <td class="d-flex align-items-center zipCodeDiv">
            <b-form-input
              type="text"
              class="zipCodeInput w-200"
              :state="signUpUserInfo.zipCode ? true : null"
              v-model="signUpUserInfo.zipCode"
              readonly
            />
            <b-button
              variant="warning"
              class="zipCodeBtn ms-2"
              @click="handlerKakaoPost"
            >
              우편번호 찾기
            </b-button>
          </td>
        </tr>

        <tr>
          <th>주소 <span class="required">*</span></th>
          <td>
            <b-form-input
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
            <b-form-input
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
        <b-button variant="outline-danger" @click="signUpModalCloseBtn()"
          >닫기</b-button
        >
        <b-button
          class="signUpBtn ms-2"
          variant="primary"
          @click="signUpValid()"
        >
          가입하기
        </b-button>
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

const regExPwd = /^[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]{4,20}$/;
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
      if (regExPhoneReplace.length > 2 && regExPhoneReplace.length <= 3) {
        regExPhoneReplace = regExPhoneReplace.replace(
          /^(\d{2})(\d{1})$/,
          "$1-$2"
        );
      } else if (regExPhoneReplace.length <= 4) {
        regExPhoneReplace = regExPhoneReplace.replace(
          /^(\d{2})(\d{2})$/,
          "$1-$2"
        );
      } else if (regExPhoneReplace.length <= 5) {
        regExPhoneReplace = regExPhoneReplace.replace(
          /^(\d{2})(\d{3})$/,
          "$1-$2"
        );
      } else if (regExPhoneReplace.length <= 6) {
        regExPhoneReplace = regExPhoneReplace.replace(
          /^(\d{2})(\d{3})(\d{1})$/,
          "$1-$2-$3"
        );
      } else if (regExPhoneReplace.length <= 7) {
        regExPhoneReplace = regExPhoneReplace.replace(
          /^(\d{2})(\d{3})(\d{2})$/,
          "$1-$2-$3"
        );
      } else if (regExPhoneReplace.length <= 8) {
        regExPhoneReplace = regExPhoneReplace.replace(
          /^(\d{2})(\d{3})(\d{3})$/,
          "$1-$2-$3"
        );
      } else if (regExPhoneReplace.length <= 9) {
        regExPhoneReplace = regExPhoneReplace.replace(
          /^(\d{2})(\d{3})(\d{4})$/,
          "$1-$2-$3"
        );
      } else if (regExPhoneReplace.length <= 10) {
        regExPhoneReplace = regExPhoneReplace.replace(
          /^(\d{2})(\d{4})(\d{4})$/,
          "$1-$2-$3"
        );
      } else {
        regExPhoneReplace = regExPhoneReplace.slice(0, 10);
      }
    } else if (
      /^(010|070|031|032|033|041|042|043|044|051|052|053|054|055|061|062|063|064)/.test(
        regExPhoneReplace
      )
    ) {
      if (
        regExPhoneReplace.startsWith("010") ||
        regExPhoneReplace.startsWith("070")
      ) {
        if (regExPhoneReplace.length > 3 && regExPhoneReplace.length <= 7) {
          regExPhoneReplace = regExPhoneReplace.replace(
            /^(\d{3})(\d{1,4})$/,
            "$1-$2"
          );
        } else if (regExPhoneReplace.length <= 11) {
          regExPhoneReplace = regExPhoneReplace.replace(
            /^(\d{3})(\d{4})(\d{1,4})$/,
            "$1-$2-$3"
          );
        } else {
          regExPhoneReplace = regExPhoneReplace.slice(0, 11);
        }
      } else {
        if (regExPhoneReplace.length > 3 && regExPhoneReplace.length <= 4) {
          regExPhoneReplace = regExPhoneReplace.replace(
            /^(\d{3})(\d{1})$/,
            "$1-$2"
          );
        } else if (regExPhoneReplace.length <= 5) {
          regExPhoneReplace = regExPhoneReplace.replace(
            /^(\d{3})(\d{2})$/,
            "$1-$2"
          );
        } else if (regExPhoneReplace.length <= 6) {
          regExPhoneReplace = regExPhoneReplace.replace(
            /^(\d{3})(\d{3})$/,
            "$1-$2"
          );
        } else if (regExPhoneReplace.length <= 7) {
          regExPhoneReplace = regExPhoneReplace.replace(
            /^(\d{3})(\d{3})(\d{1})$/,
            "$1-$2-$3"
          );
        } else if (regExPhoneReplace.length <= 8) {
          regExPhoneReplace = regExPhoneReplace.replace(
            /^(\d{3})(\d{3})(\d{2})$/,
            "$1-$2-$3"
          );
        } else if (regExPhoneReplace.length <= 9) {
          regExPhoneReplace = regExPhoneReplace.replace(
            /^(\d{3})(\d{3})(\d{3})$/,
            "$1-$2-$3"
          );
        } else if (regExPhoneReplace.length <= 10) {
          regExPhoneReplace = regExPhoneReplace.replace(
            /^(\d{3})(\d{3})(\d{4})$/,
            "$1-$2-$3"
          );
        } else if (regExPhoneReplace.length <= 11) {
          regExPhoneReplace = regExPhoneReplace.replace(
            /^(\d{3})(\d{4})(\d{4})$/,
            "$1-$2-$3"
          );
        } else {
          regExPhoneReplace = regExPhoneReplace.slice(0, 11);
        }
      }
    } else if (/^\d{4,8}$/.test(regExPhoneReplace)) {
      if (regExPhoneReplace.length > 4) {
        regExPhoneReplace = regExPhoneReplace.replace(
          /^(\d{4})(\d{1,4})$/,
          "$1-$2"
        );
      }
    } else {
      regExPhoneReplace = regExPhoneReplace.slice(0, 8);
    }

    signUpUserInfo.value.phone = regExPhoneReplace;

    const regExPhone =
      /^(02-\d{3,4}-\d{4}|010-\d{4}-\d{4}|070-\d{4}-\d{4}|\d{3}-\d{3,4}-\d{4}|\d{4}-\d{4})$/.test(
        regExPhoneReplace
      );

    const phoneInput = document.getElementById("phone");

    if (regExPhone) {
      phoneInput.classList.add("is-valid");
      phoneInput.classList.remove("is-invalid");
    } else {
      phoneInput.classList.add("is-invalid");
      phoneInput.classList.remove("is-valid");
    }
  }
);

// 6. 이메일 유효성 검사
const emailValid = () => {
  signUpUserInfo.value.email =
    signUpUserInfo.value.emailId + "@" + signUpUserInfo.value.emailDomain;

  const emailIdInput = document.getElementById("emailId");
  const emailDomainInput = document.getElementById("emailDomain");

  const regExDomain =
    /^(?!-)[A-Za-z0-9-]{1,63}(?<!-)\.(?!-)[A-Za-z0-9-]{2,63}(?<!-)$/;

  if (signUpUserInfo.value.emailId.length >= 1) {
    emailIdInput.classList.add("is-valid");
    emailIdInput.classList.remove("is-invalid");
  } else {
    emailIdInput.classList.add("is-invalid");
    emailIdInput.classList.remove("is-valid");
  }

  if (regExDomain.test(signUpUserInfo.value.emailDomain)) {
    emailDomainInput.classList.add("is-valid");
    emailDomainInput.classList.remove("is-invalid");
  } else {
    emailDomainInput.classList.add("is-invalid");
    emailDomainInput.classList.remove("is-valid");
  }
};

// 7. 우편번호 찾기
const handlerKakaoPost = () => {
  kakaoPostcode((data) => {
    signUpUserInfo.value.zipCode = data.zonecode;
    signUpUserInfo.value.address = data.address;
  });
};

// 8. 회원가입 검증

const signUpValid = () => {
  const phone = document.getElementById("phone");
  const emailId = document.getElementById("emailId");
  const emailDomain = document.getElementById("emailDomain");

  if (!signUpUserInfo.value.userType) {
    toast.error("회원 유형을 선택하세요!");
    return;
  } else if (
    !signUpUserInfo.value.loginId ||
    idState.value === null ||
    idState.value === false
  ) {
    if (!signUpUserInfo.value.loginId) {
      toast.error("아이디를 입력하세요!");
    } else if (idState.value === null || idState.value === false) {
      toast.error("아이디를 중복 검사를 하세요!");
    }
    idState.value = false;
    document.getElementById("loginId").focus();
    return;
  } else if (!pwdState.value || !pwdCkState.value) {
    if (!pwdState.value) {
      toast.error("비밀번호를 다시 입력해주세요!");
      pwdState.value = false;
      document.getElementById("password").focus();
    } else {
      toast.error("비밀번호 확인을 다시 입력해주세요!");
      document.getElementById("passwordCk").focus();
    }
    return;
  } else if (nameState.value === null || nameState.value === false) {
    if (nameState.value === null) {
      toast.error("이름을 입력해주세요!");
    } else {
      toast.error("올바른 이름을 입력해주세요!");
    }
    document.getElementById("name").focus();
    nameState.value = false;
    return;
  } else if (!signUpUserInfo.value.sex) {
    toast.error("성별을 선택하세요!");
    return;
  } else if (!birthdayState.value) {
    if (birthdayState.value === null) {
      toast.error("생년월일을 선택하세요!");
      birthdayState.value = false;
    } else {
      toast.error("올바른 생년월일을 선택하세요!");
    }
    return;
  } else if (!phone.classList.contains("is-valid")) {
    if (!phone.classList.contains("is-invalid")) {
      toast.error("전화번호를 입력하세요!");
      phone.classList.add("is-invalid");
    } else {
      toast.error("올바른 전화번호를 입력하세요!");
    }
    phone.focus();
    return;
  } else if (
    !signUpUserInfo.value.emailId ||
    !signUpUserInfo.value.emailDomain ||
    !emailDomain.classList.contains("is-valid")
  ) {
    if (!signUpUserInfo.value.emailId) {
      toast.error("이메일을 입력하세요!");
      emailId.focus();
      emailId.classList.add("is-invalid");
    } else if (!signUpUserInfo.value.emailDomain) {
      toast.error("이메일 도메인을 입력하세요!");
      emailDomain.focus();
    } else {
      toast.error("올바른 이메일 도메인을 입력하세요!");
      emailDomain.focus();
    }
    return;
  } else if (!signUpUserInfo.value.zipCode) {
    toast.error("우편번호를 입력하세요!");
    return;
  } else {
    handlerSignUp();
  }
  toast.success("회원 가입 완료!!!");
};

// 9. 회원가입
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
  width: 520px;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
}

th,
label,
::placeholder {
  font-size: 14px;
}

input,
select {
  padding: 0 10px;
  font-size: 14x;
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

.emailId,
.emailDomain {
  width: 170px;
}

.w-200 {
  width: 200px;
}
.zipCodeDiv {
  width: 250px;
}

.zipCodeInput {
  width: 100px;
}

.zipCodeInput,
.addressInput {
  background-color: #e9ecef;
}
.zipCodeBtn {
  width: 120px;
  white-space: nowrap;
}
</style>
