<template>
  <div class="signUpModal">
    <div class="signUpModalContent">
      <h1 class="signUpTitle">회원가입</h1>
      <table>
        <tr>
          <td colspan="2"><hr /></td>
        </tr>

        <tr>
          <th>회원 유형 <span class="text-danger">*</span></th>
          <td>
            <b-form-radio-group
              v-model="signUpUserInfo.userType"
              :options="[
                { value: 'A', text: '일반회원' },
                { value: 'B', text: '기업회원' },
              ]"
              button-variant="outline-primary"
              buttons
            ></b-form-radio-group>
          </td>
        </tr>

        <tr>
          <th>
            <label for="loginId"
              >아이디 <span class="text-danger">*</span>
            </label>
          </th>
          <td>
            <div class="d-flex align-items-center">
              <b-form-input
                id="loginId"
                :state="signUpUserInfo.loginId.state"
                placeholder="아이디는 숫자, 영문 조합(4~20자)"
                v-model="signUpUserInfo.loginId.value"
                ref="loginId"
              ></b-form-input>
              <b-button
                id="idCheckBtn"
                :variant="
                  signUpUserInfo.loginId.state === null
                    ? 'secondary'
                    : signUpUserInfo.loginId.state
                      ? 'success'
                      : 'danger'
                "
                class="idCheckBtn"
                @click="idValid"
              >
                중복 확인
              </b-button>
            </div>
          </td>
        </tr>

        <tr>
          <th>
            <label for="password"
              >비밀번호
              <span class="text-danger">*</span>
            </label>
          </th>
          <td>
            <b-col class="d-flex align-items-center">
              <b-form-input
                id="password"
                type="password"
                :state="signUpUserInfo.password.state"
                placeholder="비밀번호는 4~40자로 입력"
                v-model="signUpUserInfo.password.value"
                @input="pwdValid"
                ref="password"
              ></b-form-input>
            </b-col>
            <div
              v-show="signUpUserInfo.password.state === false"
              class="statusPwd"
            >
              비밀번호는 4~40자로 입력
            </div>
          </td>
        </tr>

        <tr>
          <th>
            <label for="passwordCk"
              >비밀번호 확인
              <span class="text-danger">*</span>
            </label>
          </th>
          <td>
            <b-col class="d-flex align-items-center">
              <b-form-input
                id="passwordCk"
                type="password"
                :state="signUpUserInfo.passwordCk.state"
                placeholder="비밀번호를 다시 입력하세요."
                v-model="signUpUserInfo.passwordCk.value"
                @input="pwdCkValid"
                ref="passwordCk"
              ></b-form-input>
            </b-col>
            <div
              v-show="signUpUserInfo.passwordCk.state === false"
              class="statusPwdCk"
            >
              올바른 비밀번호를 입력해주세요.
            </div>
          </td>
        </tr>

        <tr>
          <th>
            <label for="name"
              >이름
              <span class="text-danger">*</span>
            </label>
          </th>
          <td>
            <b-col class="d-flex align-items-center">
              <b-form-input
                id="name"
                :state="signUpUserInfo.name.state"
                placeholder="이름을 입력하세요.(한글2자 이상)"
                v-model="signUpUserInfo.name.value"
                @blur="nameValid"
                ref="name"
              ></b-form-input>
            </b-col>
            <div v-show="signUpUserInfo.name.state === false" class="name">
              한글 2자 이상으로 입력하세요.
            </div>
          </td>
        </tr>

        <tr>
          <th>성별 <span class="text-danger">*</span></th>
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
              >생년월일 <span class="text-danger">*</span></label
            >
          </th>
          <td>
            <b-form-input
              type="date"
              :state="signUpUserInfo.birthday.state"
              v-model="signUpUserInfo.birthday.value"
              @input="birthdayValid"
              ref="birthday"
            ></b-form-input>
          </td>
        </tr>

        <tr>
          <th>
            <label for="phone"
              >전화번호 <span class="text-danger">*</span></label
            >
          </th>
          <td>
            <input
              id="phone"
              class="form-control"
              v-model="signUpUserInfo.phone"
              placeholder="전화번호를 입력하세요.(숫자만 입력하세요.)"
              ref="phone"
            />
          </td>
        </tr>

        <tr>
          <th>
            <label for="emailId"
              >이메일 <span class="text-danger">*</span></label
            >
          </th>
          <td>
            <div class="d-flex align-items-center">
              <b-form-input
                id="emailId"
                class="emailId me-1"
                :state="signUpUserInfo.emailId.state"
                v-model="signUpUserInfo.emailId.value"
                placeholder="이메일을 입력하세요."
                @input="emailValid"
                ref="emailId"
              />
              <span>@</span>
              <b-form-input
                list="emailDomains"
                id="emailDomain"
                name="emailDomain"
                :state="signUpUserInfo.emailDomain.state"
                v-model="signUpUserInfo.emailDomain.value"
                class="form-control ms-1 emailDomain"
                placeholder="이메일 도메인 입력"
                @input="emailValid"
                ref="emailDomain"
              />
              <datalist id="emailDomains">
                <option value="gmail.com"></option>
                <option value="naver.com"></option>
                <option value="daum.net"></option>
                <option value="nate.com"></option>
                <option value="hotmail.com"></option>
              </datalist>
            </div>
          </td>
        </tr>

        <tr>
          <th>우편번호 <span class="text-danger">*</span></th>
          <td class="d-flex align-items-center zipCodeDiv">
            <b-form-input
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
          <th>주소 <span class="text-danger">*</span></th>
          <td>
            <b-form-input
              class="addressInput"
              :state="signUpUserInfo.address ? true : null"
              v-model="signUpUserInfo.address"
              readonly
            />
          </td>
        </tr>

        <tr>
          <th><label for="detailAddress">상세주소</label></th>
          <td>
            <b-form-input
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
import { useSignUp } from "../../../hook/Login/useSignUp";
import { useSignUpIdCheck } from "../../../hook/Login/useSignUpIdCheck";

const modalStore = useModalStore();

// 회원가입 사용자 정보
const signUpUserInfo = ref({
  action: "I",
  userType: "",
  loginId: {
    value: "",
    state: null,
  },
  password: {
    value: "",
    state: null,
  },
  passwordCk: {
    value: "",
    state: null,
  },
  name: {
    value: "",
    state: null,
  },
  sex: "",
  birthday: {
    value: "",
    state: null,
  },
  phone: "",
  email: "",
  emailId: {
    value: "",
    state: null,
  },
  emailDomain: {
    value: "",
    state: null,
  },
  zipCode: "",
  address: "",
  detailAddress: "",
});

// 정규식
const regExPatterns = {
  id: /^(?=.*[A-Za-z])(?=.*\d)[a-zA-Z0-9]{4,20}$/,
  pwd: /^[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]{4,40}$/,
  name: /^[가-힣]{2,}$/,
  domain: /^(?!-)[A-Za-z0-9-]{1,63}(?<!-)\.(?!-)[A-Za-z0-9-]{2,63}(?<!-)$/,
};

// 포커스용 변수
const loginId = ref("");
const password = ref("");
const passwordCk = ref("");
const name = ref("");
const birthday = ref("");
const phone = ref("");
const emailId = ref("");
const emailDomain = ref("");
const detailAdress = ref("");

// 1. 아이디 중복체크
const idValid = () => {
  if (!regExPatterns.id.test(signUpUserInfo.value.loginId.value)) {
    toast.error("아이디는 4~20자 이내로 영문과 숫자를 조합해 주세요.");
    signUpUserInfo.value.loginId.state = false;
    document.getElementById("loginId").focus();
  } else {
    handlerIdCheck();
  }
};
watch(
  () => signUpUserInfo.value.loginId.value,
  () => {
    if (signUpUserInfo.value.loginId.state !== null) {
      signUpUserInfo.value.loginId.state = false;
    }
  }
);
const { mutate: handlerIdCheck } = useSignUpIdCheck(signUpUserInfo);

// 2. 비밀번호 유효성 검사
const pwdValid = () => {
  if (regExPatterns.pwd.test(signUpUserInfo.value.password.value)) {
    signUpUserInfo.value.password.state = true;
    pwdCkValid();
  } else {
    signUpUserInfo.value.password.state = false;
    signUpUserInfo.value.passwordCk.state = false;
  }
};
const pwdCkValid = () => {
  if (
    signUpUserInfo.value.password.value ===
      signUpUserInfo.value.passwordCk.value &&
    regExPatterns.pwd.test(signUpUserInfo.value.password.value) &&
    regExPatterns.pwd.test(signUpUserInfo.value.passwordCk.value)
  ) {
    signUpUserInfo.value.passwordCk.state = true;
  } else {
    signUpUserInfo.value.passwordCk.state = false;
  }
};

// 3. 이름 유효성 검사
const nameValid = () => {
  if (!regExPatterns.name.test(signUpUserInfo.value.name.value)) {
    signUpUserInfo.value.name.state = false;
  } else {
    signUpUserInfo.value.name.state = true;
  }
};

// 4. 생년월일 유효성 검사(과거~오늘 선택가능, 미래 선택불가)
const birthdayValid = () => {
  const birthdayDate = new Date(signUpUserInfo.value.birthday.value);
  const today = new Date();

  birthdayDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  if (birthdayDate > today || signUpUserInfo.value.birthday.value === "") {
    toast.error("미래의 날짜로 선택 할 수 없습니다.");
    signUpUserInfo.value.birthday.state = false;
    signUpUserInfo.value.birthday.value = "";
  } else {
    signUpUserInfo.value.birthday.state = true;
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
    signUpUserInfo.value.emailId.value +
    "@" +
    signUpUserInfo.value.emailDomain.value;

  if (signUpUserInfo.value.emailId.value.length >= 1) {
    signUpUserInfo.value.emailId.state = true;
  } else {
    signUpUserInfo.value.emailId.state = false;
    signUpUserInfo.value.emailDomain.state = false;
  }

  if (regExPatterns.domain.test(signUpUserInfo.value.emailDomain.value)) {
    signUpUserInfo.value.emailDomain.state = true;
  } else {
    signUpUserInfo.value.emailDomain.state = false;
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
  const signUpFocus = ref({
    loginId: loginId,
    password: password,
    passwordCk: passwordCk,
  });
  // 8.1 회원 유형
  if (!signUpUserInfo.value.userType) {
    toast.error("회원 유형을 선택하세요!");
    return;

    // 8.2 아이디
  } else if (!signUpUserInfo.value.loginId.state) {
    if (!signUpUserInfo.value.loginId.value) {
      toast.error("아이디를 입력하세요!");
    } else if (
      signUpUserInfo.value.loginId.value === null ||
      signUpUserInfo.value.loginId.state === false
    ) {
      toast.error("아이디를 중복 검사를 하세요!");
    }
    signUpUserInfo.value.loginId.state = false;
    signUpFocus.value.loginId.focus();
    return;

    // 8.3 비밀번호
  } else if (
    !signUpUserInfo.value.password.value ||
    !signUpUserInfo.value.passwordCk.value
  ) {
    if (!signUpUserInfo.value.password.state) {
      toast.error("비밀번호를 확인해 주세요!");
      signUpUserInfo.value.password.state = false;
      signUpFocus.value.password.focus();
    } else {
      toast.error("비밀번호 확인을 확인해 주세요!");
      signUpFocus.value.passwordCk.focus();
    }
    return;

    // 8.4 이름
  } else if (!signUpUserInfo.value.name.state) {
    if (signUpUserInfo.value.name.state === null) {
      toast.error("이름을 입력해주세요!");
      name.value.focus();
    } else {
      toast.error("올바른 이름을 입력해주세요!");
    }
    document.getElementById("name").focus();
    return;

    // 8.5 성별
  } else if (!signUpUserInfo.value.sex) {
    toast.error("성별을 선택하세요!");
    return;

    // 8.6 생년월일
  } else if (!signUpUserInfo.value.birthday.state) {
    signUpUserInfo.value.birthday.state = false;
    if (signUpUserInfo.value.birthday.state === null) {
      toast.error("생년월일을 선택하세요!");
    } else {
      toast.error("올바른 생년월일을 선택하세요!");
    }
    return;

    // 8.7 전화번호
  } else if (!phone.value.classList.contains("is-valid")) {
    if (!phone.value.classList.contains("is-invalid")) {
      toast.error("전화번호를 입력하세요!");
      phone.value.classList.add("is-invalid");
    } else {
      toast.error("올바른 전화번호를 입력하세요!");
    }
    phone.value.focus();
    return;

    // 8.8 이메일
  } else if (
    !signUpUserInfo.value.emailId.value ||
    !signUpUserInfo.value.emailDomain.value ||
    !emailDomain.value.classList.contains("is-valid")
  ) {
    if (!signUpUserInfo.value.emailId.value) {
      toast.error("이메일을 입력하세요!");
      emailId.value.focus();
      emailId.value.classList.add("is-invalid");
    } else if (!signUpUserInfo.value.emailDomain) {
      toast.error("이메일 도메인을 입력하세요!");
      emailDomain.value.focus();
    } else {
      toast.error("올바른 이메일 도메인을 입력하세요!");
      emailDomain.value.focus();
    }
    return;

    // 8.9 우편번호
  } else if (!signUpUserInfo.value.zipCode) {
    toast.error("우편번호를 입력하세요!");
    signUpUserInfo.value.zipCode.state = false;
    signUpUserInfo.value.zipCode.state = false;
    return;
  } else {
    handlerSignUp();
    toast.success("회원 가입 완료!!!");
  }
};

// 9. 회원가입
const { mutate: handlerSignUp } = useSignUp(signUpUserInfo);

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
.signUpTitle {
  margin-top: 10px;
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

.idCheckBtn {
  margin-left: 10px;
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
