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
                v-model="signUpValid.userType"
              />일반회원
            </label>
            <label>
              <input
                type="radio"
                name="userType"
                value="biz"
                v-model="signUpValid.userType"
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
                v-model="signUpValid.userId"
                placeholder="4~20자(숫자, 영문 조합)"
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
              v-model="signUpValid.userPwd"
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
              v-model="signUpValid.userPwdCk"
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
            <input
              type="text"
              id="userName"
              v-model="signUpValid.userName"
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
                  name="gender"
                  value="man"
                  v-model="signUpValid.gender"
                />남자
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="women"
                  v-model="signUpValid.gender"
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
              v-model="signUpValid.userBirthday"
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
              v-model="signUpValid.userPhone"
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
              v-model="signUpValid.userEmail"
              placeholder="이메일을 입력하세요."
            />
            <span> @ </span>
            <select id="emailDomain" v-model="signUpValid.emailDomain">
              <option value="">선택하세요.</option>
              <option value="gmail.com">gmail.com</option>
              <option value="naver.com">naver.com</option>
              <option value="daum.net">daum.net</option>
              <option value="userCustomDomain">직접입력</option>
            </select>
            <span v-if="emailDomain === 'userCustomDomain'">
              <input type="text" class="inputEmail" placeholder="입력하세요." />
            </span>
          </td>
        </tr>

        <tr>
          <th>우편번호 <span class="required">*</span></th>
          <td>
            <input
              type="text"
              class="postCodeInput"
              v-model="signUpValid.postCode"
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
              v-model="signUpValid.address"
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
              v-model="signUpValid.addressDetail"
            />
          </td>
        </tr>

        <tr>
          <td colspan="2"><hr /></td>
        </tr>
      </table>
      <div class="buttons">
        <button @click="signUpModalCloseBtn()">닫기</button>
        <button class="signUpBtn" @click="signUpBtn">가입하기</button>
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
const idCheckBtn = ref(true);

/*
const userType = ref("");
const userId = ref("");
const isChecked = ref(false);
const userPwd = ref("");
const userPwdCk = ref("");
const userName = ref("");
const userBirthday = ref("");
const userPhone = ref("");
const emailDomain = ref("");
const postCode = ref("");
const address = ref("");
*/
const isChecked = ref(false);

const signUpValid = ref({
  userType: ref(""),
  userId: ref(""),
  userPwd: ref(""),
  userPwdCk: ref(""),
  userName: ref(""),
  userGender: ref(""),
  userBirthday: ref(""),
  userPhone: ref(""),
  userEmail: ref(""),
  emailDomain: ref(""),
  postCode: ref(""),
  address: ref(""),
  addressDetail: ref(""),
});

// 1-1. 아이디 변경될 때 실행되어 중복확인 버튼 색상 변경 로직
watch(signUpValid.value.userId, () => {
  const idCheckBtn = document.querySelector(".idCheckBtn");
  let regExIdReplace = signUpValid.value.userId.replace(/[^a-zA-Z0-9]/g, "");

  if (regExIdReplace) {
    if (
      signUpValid.value.userId.length >= 4 &&
      signUpValid.value.userId.length <= 20
    ) {
      idCheckBtn.disabled = false;
      idCheckBtn.style.backgroundColor = "gray";
    } else {
      idCheckBtn.disabled = true;
      idCheckBtn.style.backgroundColor = "gainsboro";
    }
  }
});
// 1-2. 아이디 중복 체크
const { mutate: handlerIdCheck } = useSignUpIdCheck(
  signUpValid.value.userId,
  isChecked
);

// 2. 비밀번호 사용 가능 여부 및 확인
watch([signUpValid.value.userPwd, signUpValid.value.userPwdCk], () => {
  const userPwdStatus = document.querySelector(".userPwdStatus");
  const userPwdCkStatus = document.querySelector(".userPwdCkStatus");

  const regExPwd =
    /^(?=(.*[a-zA-Z]))(?=(.*\d))(?=(.*[!@#$%^&*]))[a-zA-Z0-9!@#$%^&*]{4,18}$/;

  // 비밀번호 사용 가능하면 "사용가능" 표시
  if (regExPwd.test(signUpValid.value.userPwd)) {
    // userPwdStatus.style.display = "inline-flex"; // 이 방식은 충돌나서 적용안됨
    userPwdStatus.style.setProperty("display", "inline-flex");
  } else {
    userPwdStatus.style.display = "none";
  }
  // 비밀번호가 일치할 경우 "일치" 표시
  if (
    signUpValid.value.userPwd === signUpValid.value.userPwdCk &&
    signUpValid.value.userPwdCk !== ""
  ) {
    userPwdCkStatus.style.setProperty("display", "inline-flex");
  } else {
    userPwdCkStatus.style.display = "none";
  }
});

// 3. 이름 유효성 검사
watch(signUpValid.value.userName, () => {
  const regExName = /^[가-힣]{2,}$/;

  // 한글만 입력하도록 처리 그 외 글자는 빈값으로 바꿈
  if (!regExName.test(signUpValid.value.userName)) {
    const userNameReplace = signUpValid.value.userName.replace(
      /[^ㄱ-ㅎ가-힣]/g,
      ""
    );
    signUpValid.value.userName = userNameReplace;
  }
});

// 4. 생년월일 유효성 체크(과거~오늘 선택가능, 미래 선택불가)
const birthdayCheck = () => {
  const userBirthdayDate = new Date(signUpValid.value.userBirthday);
  const today = new Date();

  if (userBirthdayDate >= today) {
    toast.error("다시 선택해주세요!");
    signUpValid.value.userBirthday = "";
  }
};

// 5. 전화번호 정규식 적용
watch(signUpValid.value.userPhone, () => {
  let regExPhoneReplace = signUpValid.value.userPhone.replace(/[^0-9]/g, "");

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
  signUpValid.value.userPhone = regExPhoneReplace;
});

// 6. 우편번호 찾기
const handlerKakaoPost = () => {
  kakaoPostcode((data) => {
    signUpValid.value.postCode = data.zonecode;
    signUpValid.value.address = data.address;
  });
};

// 7. 회원가입 버튼 활성화
const signUpBtn = () => {
  console.log("==========================");
  console.log("userType : ", signUpValid.value.userType);
  console.log("userId : ", signUpValid.value.userId);
  console.log("userPwd : ", signUpValid.value.userPwd);
  console.log("userPwdCk : ", signUpValid.value.userPwdCk);
  console.log("userName : ", signUpValid.value.userName);
  console.log("userBirthday : ", signUpValid.value.userBirthday);
  console.log("emailDomain : ", signUpValid.value.emailDomain);
  console.log("postCode : ", signUpValid.value.postCode);
  console.log("address : ", signUpValid.value.address);
  console.log("addressDetail : ", signUpValid.value.addressDetail);
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
.userEmail {
  width: 120px !important;
}
.inputEmail {
  width: 80px !important;
  margin-left: 5px;
}
</style>
