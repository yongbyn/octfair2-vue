<template>
  <div class="d-flex justify-content-center align-items-center mypage">
    <div>
      <table>
        <tr>
          <th>
            <label for="loginId">아이디 </label>
          </th>
          <td>
            <div class="d-flex align-items-center">
              <b-form-input
                id="loginId"
                class="readonly"
                v-model="updateUserInfo.loginId"
                readonly
              ></b-form-input>
            </div>
          </td>
        </tr>

        <tr class="height">
          <th>비밀번호</th>
          <td>
            <b-button
              variant="danger"
              class="pwdUpdatebtn"
              @click="updatePwdModalOpen"
              >수정</b-button
            >
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
                ref="name"
                v-model="updateUserInfo.name.value"
                :state="updateUserInfo.name.state"
                placeholder="이름을 입력하세요.(한글2자 이상)"
                @blur="nameValid"
              ></b-form-input>
            </b-col>
            <div v-show="updateUserInfo.name.state === false" class="name">
              한글 2자 이상으로 입력하세요.
            </div>
          </td>
        </tr>

        <tr>
          <th>성별 <span class="text-danger">*</span></th>
          <td>
            <b-form-radio-group
              v-model="updateUserInfo.sex"
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
              ref="birthday"
              :state="updateUserInfo.birthday.state"
              v-model="updateUserInfo.birthday.value"
              @input="birthdayValid"
            ></b-form-input>
          </td>
        </tr>

        <tr>
          <th>
            <label for="phone"
              >전화번호 <span class="text-danger">*</span>
            </label>
          </th>
          <td>
            <input
              id="phone"
              class="form-control"
              ref="phone"
              v-model="updateUserInfo.phone"
              placeholder="전화번호를 입력하세요.(숫자만 입력하세요.)"
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
                ref="emailId"
                placeholder="이메일을 입력하세요."
                v-model="updateUserInfo.emailId.value"
                :state="updateUserInfo.emailId.state"
                @input="emailValid"
              />
              <span>@</span>
              <b-form-input
                list="emailDomains"
                id="emailDomain"
                name="emailDomain"
                class="form-control ms-1 emailDomain"
                placeholder="이메일 도메인 입력"
                v-model="updateUserInfo.emailDomain.value"
                :state="updateUserInfo.emailDomain.state"
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

        <tr v-if="updateUserInfo.userType === 'B'" class="height">
          <th>기업정보</th>
          <td>
            <b-button
              variant="info"
              class="bizInsertBtn"
              @click="goCompanyWritePage"
              >{{
                updateUserInfo.bizIdx === 0 ? "기업 등록" : "기업 수정"
              }}</b-button
            >
          </td>
        </tr>

        <tr>
          <th>우편번호 <span class="text-danger">*</span></th>
          <td class="d-flex align-items-center zipCodeDiv">
            <b-form-input
              class="zipCodeInput readonly"
              v-model="updateUserInfo.zipCode"
              :state="updateUserInfo.zipCode ? true : null"
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
              class="addressInput readonly"
              v-model="updateUserInfo.address"
              :state="updateUserInfo.address ? true : null"
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
              v-model="updateUserInfo.detailAddress"
            />
          </td>
        </tr>
      </table>
    </div>
    <div class="d-flex justify-content-center mt-3">
      <b-button
        class="me-2"
        @click="router.push('/vue')"
        variant="outline-primary"
        >메인으로</b-button
      >
      <b-button variant="primary" @click="updateValid()">정보수정</b-button>
    </div>
  </div>

  <!-- 모달 -->
  <UpdatePwdModal v-if="modalStore.modalState" />
</template>

<script setup>
import { kakaoPostcode } from "@/common/kakaoPostCodeApi";
import { toast } from "@/common/toastMessage";
import { useModalStore } from "@/stores/modalState";
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useGetUserInfo } from "../../../hook/mypage/useGetUserInfo";
import { useUpdateUser } from "../../../hook/mypage/useUpdateUser";
import { useUserInfo } from "../../../stores/userInfo";
import UpdatePwdModal from "./UpdatePwdModal.vue";

const router = useRouter();
const { user } = useUserInfo();
const modalStore = useModalStore();

const phone = ref("");
const emailId = ref("");
const emailDomain = ref("");

const updateUserInfo = ref({
  loginId: "",
  userType: "",
  name: {
    value: "",
    state: "",
  },
  sex: "",
  birthday: {
    value: "",
    state: "",
  },
  phone: "",
  email: "",
  emailId: {
    value: "",
    state: "",
  },
  emailDomain: {
    value: "",
    state: "",
  },
  zipCode: "",
  address: "",
  detailAddress: "",
  userIdx: user.userIdx,
  bizIdx: "",
});

// 정규식
const regExPatterns = {
  id: /^(?=.*[A-Za-z])(?=.*\d)[a-zA-Z0-9]{4,20}$/,
  pwd: /^[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]{4,40}$/,
  name: /^[가-힣]{2,}$/,
  domain: /^(?!-)[a-zA-Z0-9-]{1,63}(?<!-)(\.[a-zA-Z0-9-]{1,63})+$/,
};

// 사용자 정보 가져오기
const { mutate: handlerGetUserInfo } = useGetUserInfo(user, updateUserInfo);

// 1. 이름 유효성 검사
const nameValid = () => {
  if (!regExPatterns.name.test(updateUserInfo.value.name.value)) {
    updateUserInfo.value.name.state = false;
  } else {
    updateUserInfo.value.name.state = true;
  }
};

// 2. 생년월일 유효성 검사(과거~오늘 선택가능, 미래 선택불가)
const birthdayValid = () => {
  const birthdayDate = new Date(updateUserInfo.value.birthday.value);
  const today = new Date();

  birthdayDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  if (birthdayDate > today || updateUserInfo.value.birthday.value === "") {
    toast.error("미래의 날짜로 선택 할 수 없습니다.");
    updateUserInfo.value.birthday.state = false;
    updateUserInfo.value.birthday.value = "";
  } else {
    updateUserInfo.value.birthday.state = true;
  }
};

// 3. 전화번호 정규식
watch(
  () => updateUserInfo.value.phone,
  () => {
    let regExPhoneReplace = updateUserInfo.value.phone.replace(/[^0-9]/g, "");

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

    updateUserInfo.value.phone = regExPhoneReplace;

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
// 4. 이메일 유효성 검사
const emailValid = () => {
  updateUserInfo.value.email =
    updateUserInfo.value.emailId.value +
    "@" +
    updateUserInfo.value.emailDomain.value;

  if (updateUserInfo.value.emailId.value.length >= 1) {
    updateUserInfo.value.emailId.state = true;
  } else {
    updateUserInfo.value.emailId.state = false;
    updateUserInfo.value.emailDomain.state = false;
  }

  if (regExPatterns.domain.test(updateUserInfo.value.emailDomain.value)) {
    updateUserInfo.value.emailDomain.state = true;
  } else {
    updateUserInfo.value.emailDomain.state = false;
  }
};

// 5. 우편번호 찾기
const handlerKakaoPost = () => {
  kakaoPostcode((data) => {
    updateUserInfo.value.zipCode = data.zonecode;
    updateUserInfo.value.address = data.address;
  });
};

// 6. 정보수정 유효성 검사
const updateValid = () => {
  // 6.1 이름
  if (!updateUserInfo.value.name.state) {
    toast.error("올바른 이름을 입력해주세요!");
    document.getElementById("name").focus();
    return;

    // 6.2 생년월일
  } else if (!updateUserInfo.value.birthday.state) {
    updateUserInfo.value.birthday.state = false;
    if (updateUserInfo.value.birthday.state === null) {
      toast.error("생년월일을 선택하세요!");
    } else {
      toast.error("올바른 생년월일을 선택하세요!");
    }
    return;

    // 6.3 전화번호
  } else if (!phone.value.classList.contains("is-valid")) {
    toast.error("올바른 전화번호를 입력하세요!");
    phone.value.classList.add("is-invalid");
    phone.value.focus();
    return;
  }

  // 6.4 이메일
  else if (
    !updateUserInfo.value.emailId.value ||
    !updateUserInfo.value.emailDomain.value
  ) {
    if (!updateUserInfo.value.emailId.value) {
      toast.error("이메일을 입력하세요!");
      emailId.value.focus();
      emailId.value.classList.add("is-invalid");
    } else {
      toast.error("이메일 도메인을 입력하세요!");
      emailDomain.value.focus();
    }
    return;
  } else {
    handlerUpdate();
    toast.success("회원정보 수정 완료!!!");
  }
};

// 7. 회원정보수정
const { mutate: handlerUpdate } = useUpdateUser(updateUserInfo);

// 비밀번호변경 모달
const updatePwdModalOpen = () => {
  modalStore.setModalState();
};

// // 기업 등록, 수정 페이지로 이동
const goCompanyWritePage = () => {
  router.push("/vue/mypage/companyWritePage.do");
};

// 값을 초기화한다.
onActivated(() => {
  handlerGetUserInfo();
});
</script>

<style scoped>
.mypage {
  flex-direction: column;
  margin: 50px;
  width: 520px;
  padding: 30px 0;
  border: 1px solid darkgray;
  border-radius: 30px;
}

th,
label {
  width: 100px;
  font-size: 16px;
}
td {
  width: 350px;
}
input,
select {
  padding: 0 10px;
  font-size: 14x;
  height: 35px;
}

.readonly {
  background-color: #e9ecef;
}
.pwdUpdatebtn,
.bizInsertBtn {
  width: 100px;
}

.name {
  color: red;
  font-size: 14px;
}
::placeholder {
  font-size: 14px;
}
.height {
  height: 80px;
}
.zipCodeBtn {
  width: 200px;
}
</style>
