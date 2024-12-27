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
              <input
                type="radio"
                name="userType"
                value="apply"
                v-model="signUpUserInfo.userType"
              />일반회원
            </label>
            <label>
              <input
                type="radio"
                name="userType"
                value="biz"
                v-model="signUpUserInfo.userType"
              />기업회원
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
                v-model="signUpUserInfo.userId"
                placeholder="숫자, 영문 조합(4~20자)"
              />
              <button
                class="idCheckBtn"
                :disabled="idCheckBtn"
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
              v-model="signUpUserInfo.userPwd"
              placeholder="숫자, 영문, 특수문자 조합(4~18자)"
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
              v-model="signUpUserInfo.userPwdCk"
              placeholder="비밀번호를 다시 입력하세요."
            />
            <div class="userPwdCkStatus">
              {{ signUpUserInfo.userPwdCkStatus ? "일치" : "불일치" }}
            </div>
          </td>
        </tr>

        <tr>
          <th>
            <label for="userName">이름<span class="required">*</span></label>
          </th>
          <td>
            <input
              type="text"
              id="userName"
              v-model="signUpUserInfo.userName"
              placeholder="이름을 입력하세요.(한글 2자 이상)"
            />
          </td>
        </tr>

        <tr>
          <th>성별 <span class="required">*</span></th>
          <td>
            <form>
              <label>
                <input
                  type="radio"
                  name="userGender"
                  value="man"
                  v-model="signUpUserInfo.userGender"
                />남자
              </label>
              <label>
                <input
                  type="radio"
                  name="userGender"
                  value="women"
                  v-model="signUpUserInfo.userGender"
                />여자
              </label>
            </form>
          </td>
        </tr>

        <tr>
          <th>생년월일 <span class="required">*</span></th>
          <td>
            <input
              type="date"
              v-model="signUpUserInfo.userBirthday"
              @change="birthdayCheck"
            />
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
              v-model="signUpUserInfo.userPhone"
              placeholder="전화번호를 입력하세요.(숫자만 입력)"
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
              class="userEmail"
              v-model="signUpUserInfo.userEmail"
              placeholder="이메일을 입력하세요."
            />
            <span> @ </span>
            <span v-if="signUpUserInfo.emailDomain === 'userCustomDomain'">
              <input type="text" class="inputEmail" placeholder="입력하세요." />
            </span>
            <select id="emailDomain" v-model="signUpUserInfo.emailDomain">
              <option value="" disabled>선택하세요.</option>
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
              v-model="signUpUserInfo.postCode"
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
              v-model="signUpUserInfo.address"
              readonly
            />
          </td>
        </tr>

        <tr>
          <th><label for="addressDetail">상세주소</label></th>
          <td>
            <input
              type="text"
              id="addressDetail"
              class="addressDetailInput"
              v-model="signUpUserInfo.addressDetail"
            />
          </td>
        </tr>

        <tr>
          <td colspan="2"><hr /></td>
        </tr>
      </table>
      <div class="buttons">
        <button @click="signUpModalCloseBtn()">닫기</button>
        <button class="signUpBtn" @click="signUpBtn" disabled>가입하기</button>
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
const idCheckBtn = ref(true); // 아이디 중복검사 버튼 활성화
const isIdCheck = ref(false); // 아이디 중복여부
const signUpUserInfo = ref({
  // 회원가입 사용자 정보
  userType: "",
  userId: "",
  userPwd: "",
  userPwdCk: "",
  userName: "",
  userGender: "",
  userBirthday: "",
  userPhone: "",
  userEmail: "",
  emailDomain: "",
  postCode: "",
  address: "",
  addressDetail: "",
});

// 1-1. 아이디 변경될 때 중복확인 버튼 사용 할 수 있게
watch(
  () => signUpUserInfo.value.userId,
  () => {
    isIdCheck.value = false;
    const idCheckBtn = document.querySelector(".idCheckBtn");
    let regExIdReplace = signUpUserInfo.value.userId.replace(
      /[^a-zA-Z0-9]/g,
      ""
    );

    signUpUserInfo.value.userId = regExIdReplace;

    const regExId = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z0-9]{4,20}$/;

    if (regExId.test(signUpUserInfo.value.userId)) {
      idCheckBtn.disabled = false;
      idCheckBtn.style.backgroundColor = "gray";
    } else {
      idCheckBtn.disabled = true;
      idCheckBtn.style.backgroundColor = "gainsboro";
    }
  }
);
// 1-2. 아이디 중복 체크 버튼
const regExPwd =
  /^(?=(.*[a-zA-Z]))(?=(.*\d))(?=(.*[!@#$%^&*]))[a-zA-Z0-9!@#$%^&*]{4,18}$/;
const { mutate: handlerIdCheck } = useSignUpIdCheck(signUpUserInfo, isIdCheck);

// 2. 비밀번호 사용 가능 여부 및 확인
watch(
  () => [signUpUserInfo.value.userPwd, signUpUserInfo.value.userPwdCk],
  () => {
    const userPwdStatus = document.querySelector(".userPwdStatus");
    const userPwdCkStatus = document.querySelector(".userPwdCkStatus");

    // 비밀번호 사용 가능하면 "사용가능" 표시
    if (regExPwd.test(signUpUserInfo.value.userPwd)) {
      userPwdStatus.style.display = "inline-flex";
    } else {
      userPwdStatus.style.display = "none";
    }

    if (signUpUserInfo.value.userPwd) {
      userPwdCkStatus.style.setProperty("display", "inline-flex");
    }

    // 비밀번호가 일치할 경우 "일치 | 불일치" 표시
    if (
      signUpUserInfo.value.userPwd === signUpUserInfo.value.userPwdCk &&
      signUpUserInfo.value.userPwdCk !== ""
    ) {
      userPwdCkStatus.style.backgroundColor = "green";
      signUpUserInfo.value.userPwdCkStatus = true;
    } else {
      userPwdCkStatus.style.backgroundColor = "red";
      signUpUserInfo.value.userPwdCkStatus = false;
    }
    console.log(
      "signUpUserInfo.value.userPwdCkStatus : ",
      signUpUserInfo.value.userPwdCkStatus
    );
  }
);

// 3. 이름 유효성 검사
const regExName = /^[가-힣]{2,}$/;
watch(
  () => signUpUserInfo.value.userName,
  () => {
    if (!regExName.test(signUpUserInfo.value.userName)) {
      let userNameReplace = signUpUserInfo.value.userName.replace(
        /[^가-힣]/g,
        ""
      );

      signUpUserInfo.value.userName = userNameReplace;
    }
  }
);

// 4. 생년월일 유효성 체크(과거~오늘 선택가능, 미래 선택불가)
const birthdayCheck = () => {
  const userBirthdayDate = new Date(signUpUserInfo.value.userBirthday);
  const today = new Date();

  if (userBirthdayDate >= today) {
    toast.error("다시 선택해주세요!");
    signUpUserInfo.value.userBirthday = "";
  }
};

// 5. 전화번호 정규식 적용
watch(
  () => signUpUserInfo.value.userPhone,
  () => {
    let regExPhoneReplace = signUpUserInfo.value.userPhone.replace(
      /[^0-9]/g,
      ""
    );
    // 2자리 지역번호 처리
    if (/^(02)/.test(regExPhoneReplace)) {
      if (regExPhoneReplace.length <= 2) {
        regExPhoneReplace = regExPhoneReplace.replace(/^(\d{2})$/, "$1");
      } else if (regExPhoneReplace.length <= 3) {
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
          /^(\d{2})(\d{4})$/,
          "$1-$2"
        );
      } else if (regExPhoneReplace.length <= 7) {
        regExPhoneReplace = regExPhoneReplace.replace(
          /^(\d{2})(\d{4})(\d{1})$/,
          "$1-$2-$3"
        );
      } else if (regExPhoneReplace.length <= 8) {
        regExPhoneReplace = regExPhoneReplace.replace(
          /^(\d{2})(\d{4})(\d{2})$/,
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
      } else if (regExPhoneReplace.length <= 11) {
        regExPhoneReplace = regExPhoneReplace.slice(0, 10);
      }
    }
    // 3자리 지역번호 처리
    else if (
      /^(010|031|032|033|041|042|043|044|051|052|053|054|055|061|062|063|064)/.test(
        regExPhoneReplace
      )
    ) {
      if (regExPhoneReplace.length <= 3) {
        regExPhoneReplace = regExPhoneReplace.replace(/^(\d{3})$/, "$1");
      } else if (regExPhoneReplace.length <= 4) {
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
          /^(\d{3})(\d{4})$/,
          "$1-$2"
        );
      } else if (regExPhoneReplace.length <= 8) {
        regExPhoneReplace = regExPhoneReplace.replace(
          /^(\d{3})(\d{4})(\d{1})$/,
          "$1-$2-$3"
        );
      } else if (regExPhoneReplace.length <= 9) {
        regExPhoneReplace = regExPhoneReplace.replace(
          /^(\d{3})(\d{4})(\d{2})$/,
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
      } else if (regExPhoneReplace.length <= 12) {
        regExPhoneReplace = regExPhoneReplace.slice(0, 11);
      }
    }
    // 지정된 번호가 아닌경우
    else if (/^\d{4,8}$/.test(regExPhoneReplace)) {
      if (regExPhoneReplace.length <= 4) {
        regExPhoneReplace = regExPhoneReplace.replace(/^(\d{4})$/, "$1");
      } else if (regExPhoneReplace.length <= 5) {
        regExPhoneReplace = regExPhoneReplace.replace(
          /^(\d{4})(\d{1})$/,
          "$1-$2"
        );
      } else if (regExPhoneReplace.length <= 6) {
        regExPhoneReplace = regExPhoneReplace.replace(
          /^(\d{4})(\d{2})$/,
          "$1-$2"
        );
      } else if (regExPhoneReplace.length <= 7) {
        regExPhoneReplace = regExPhoneReplace.replace(
          /^(\d{4})(\d{3})$/,
          "$1-$2"
        );
      } else if (regExPhoneReplace.length <= 8) {
        regExPhoneReplace = regExPhoneReplace.replace(
          /^(\d{4})(\d{4})$/,
          "$1-$2"
        );
      }
    } else {
      regExPhoneReplace = regExPhoneReplace.slice(0, 8);
    }
    signUpUserInfo.value.userPhone = regExPhoneReplace;
  }
);
// 6. 이메일 유효성 검사
watch(signUpUserInfo.value.userEmail, () => {
  let regExEmailReplace = signUpUserInfo.value.userEmail.replace(
    /[^a-zA-Z0-9._%+-]/g,
    ""
  );
  signUpUserInfo.value.userEmail = regExEmailReplace;
});

// 7. 우편번호 찾기
const handlerKakaoPost = () => {
  kakaoPostcode((data) => {
    signUpUserInfo.value.postCode = data.zonecode;
    signUpUserInfo.value.address = data.address;
  });
};

// 8. 회원가입 버튼 활성화
watch([signUpUserInfo.value, () => isIdCheck], () => {
  const signUpBtn = document.querySelector(".signUpBtn");
  const phonePattern = /-\d{4}$/;
  if (
    // signUpUserInfo.value.userType &&
    // isIdCheck.value &&
    // regExPwd.test(signUpUserInfo.value.userPwd) &&
    // regExPwd.test(signUpUserInfo.value.userPwdCk) &&
    // regExName.test(signUpUserInfo.value.userName) &&
    // signUpUserInfo.value.userGender &&
    // signUpUserInfo.value.userBirthday &&
    phonePattern.test(signUpUserInfo.value.userPhone) &&
    signUpUserInfo.value.userPhone.length >= 9
  ) {
    signUpBtn.disabled = false;
  } else {
    signUpBtn.disabled = true;
  }
});

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
.userEmail {
  width: 120px !important;
}
.inputEmail {
  width: 80px !important;
  margin: 0 5px 0 0;
}
</style>
