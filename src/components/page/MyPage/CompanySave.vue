<template>
  <div class="align-items-center companySaveContent">
    <table class="table-striped table-hover text-center align-middle">
      <tr>
        <th>사업자명 <span class="text-danger">*</span></th>
        <td>
          <b-form-input
            class="form-control"
            ref="bizName"
            v-model="companySave.bizName.value"
            :state="companySave.bizName.state"
            placeholder="사업자명을 입력하세요."
            @input="inputValid('bizName')"
          />
        </td>
        <th>사업자 대표 <span class="text-danger">*</span></th>
        <td>
          <b-form-input
            class="form-control"
            ref="bizCeoName"
            v-model="companySave.bizCeoName.value"
            :state="companySave.bizCeoName.state"
            placeholder="사업자 대표명 입력하세요."
            @input="inputValid('bizCeoName')"
          />
        </td>
      </tr>

      <tr>
        <th>전화번호 <span class="text-danger">*</span></th>
        <td>
          <input
            id="bizContact"
            class="form-control is-invalid"
            ref="bizContact"
            v-model="companySave.bizContact"
            placeholder="연락처를 입력하세요.(숫자만 입력)"
          />
        </td>
        <th>사업자 주소 <span class="text-danger">*</span></th>
        <td>
          <div class="d-flex">
            <b-form-input
              class="form-control"
              ref="bizAddr"
              v-model="companySave.bizAddr.value"
              :state="companySave.bizAddr.state"
              placeholder="사업자 주소를 입력하세요."
              @input="inputValid('bizAddr')"
            />
            <b-button variant="warning" class="ms-2" @click="handlerKakaoPost"
              >주소 검색</b-button
            >
          </div>
        </td>
      </tr>

      <tr>
        <th>사원수 <span class="text-danger">*</span></th>
        <td>
          <b-form-select
            class="input_gray mb-3"
            ref="bizEmpCount"
            v-model="companySave.bizEmpCount.value"
            :state="companySave.bizEmpCount.state"
            @input="inputValid('bizEmpCount')"
          >
            <b-form-select-option value="" hidden
              >선택하세요</b-form-select-option
            >
            <b-form-select-option value="10명이하"
              >10명이하</b-form-select-option
            >
            <b-form-select-option value="50명이하"
              >50명이하</b-form-select-option
            >
            <b-form-select-option value="100명이하"
              >100명이하</b-form-select-option
            >
            <b-form-select-option value="1000명이하"
              >1000명이하</b-form-select-option
            >
            <b-form-select-option value="1000명이상"
              >1000명이상</b-form-select-option
            >
          </b-form-select>
        </td>
        <th>홈페이지 주소 <span class="text-danger">*</span></th>
        <td>
          <b-form-input
            class="form-control"
            ref="bizWebUrl"
            v-model="companySave.bizWebUrl.value"
            :state="companySave.bizWebUrl.state"
            placeholder="홈페이지 주소를 입력하세요."
            @input="inputValid('bizWebUrl')"
          />
        </td>
      </tr>

      <tr>
        <th>설립일 <span class="text-danger">*</span></th>
        <td>
          <b-form-input
            type="date"
            class="form-control"
            ref="bizFoundDate"
            v-model="companySave.bizFoundDate.value"
            :state="companySave.bizFoundDate.state"
            @input="bizFoundDateValid"
          />
        </td>
        <th>매출액 <span class="text-danger">*</span></th>
        <td>
          <b-form-select
            class="mb-3"
            ref="bizRevenue"
            v-model="companySave.bizRevenue.value"
            :state="companySave.bizRevenue.state"
            @input="inputValid('bizRevenue')"
          >
            <b-form-select-option hidden value=""
              >선택하세요</b-form-select-option
            >
            <b-form-select-option value="10억 이하"
              >10억 이하</b-form-select-option
            >
            <b-form-select-option value="100억 이하"
              >100억 이하</b-form-select-option
            >
            <b-form-select-option value="1000억 이하"
              >1000억 이하</b-form-select-option
            >
            <b-form-select-option value="1000억 이상"
              >1000억 이상</b-form-select-option
            >
          </b-form-select>
        </td>
      </tr>

      <tr>
        <th>기업소개</th>
        <td colspan="3">
          <b-form-textarea
            class="form-textarea"
            v-model="companySave.bizIntro"
            :state="null"
            placeholder="2000자 이내로 입력하세요."
            maxlength="2000"
          ></b-form-textarea>
        </td>
      </tr>

      <tr>
        <th>기업로고 <span class="text-danger">*</span></th>
        <td colspan="3">
          <input
            type="file"
            id="fileInput"
            class="form-control is-invalid"
            ref="fileInfo"
            @change="fileInput"
          />
          <div class="d-flex justify-content-between">
            <span class="text-start">
              {{ fileName ? `현재 파일 : ${fileName}` : "이전 파일 : 없음" }}
            </span>
            <span class="text-end text-primary">
              10MB이하의 파일만 업로드 가능합니다.</span
            >
          </div>
        </td>
      </tr>

      <tr>
        <th>로고 미리보기</th>
        <td colspan="3">
          <img
            v-if="fileName"
            :src="logoPreview"
            alt="미리보기 이미지"
            style="max-width: 300px"
          />
        </td>
      </tr>
    </table>
    <div class="d-flex justify-content-center align-items-center mt-4">
      <b-button @click="router.go(-1)" class="me-2">뒤로가기</b-button>
      <b-button variant="danger" class="me-2">삭제하기</b-button>
      <b-button variant="primary" @click="companySaveValid">등록하기</b-button>
    </div>
  </div>
</template>

<script setup>
import { kakaoPostcode } from "@/common/kakaoPostCodeApi";
import { toast } from "@/common/toastMessage";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useCompanySave } from "../../../hook/mypage/useCompanySave";

const router = useRouter();
const companySave = ref({
  bizName: {
    value: "",
    state: false,
  },
  bizAddr: {
    value: "",
    state: false,
  },
  bizContact: "",
  bizWebUrl: {
    value: "",
    state: false,
  },
  bizCeoName: {
    value: "",
    state: false,
  },
  bizFoundDate: {
    value: "",
    state: false,
  },
  bizEmpCount: {
    value: "",
    state: false,
  },
  bizRevenue: {
    // 연매출
    value: "",
    state: false,
  },
  bizIntro: "",
  logo: "",
});
const fileData = ref("");

// 포커스용 변수
const bizName = ref("");
const bizCeoName = ref("");
const bizAddr = ref("");
const bizContact = ref("");
const bizWebUrl = ref("");
const bizFoundDate = ref("");
const bizEmpCount = ref("");
const bizRevenue = ref("");
const fileInfo = ref("");
const fileName = ref("");
const logoPreview = ref("");

// 1. 사업자명, 사업자 대표, 주소, 홈페이지, 사원수, 매출액
const inputValid = (validName) => {
  if (companySave.value[validName].value) {
    companySave.value[validName].state = true;
  } else {
    companySave.value[validName].state = false;
  }
};

// 2. 연락처
watch(
  () => companySave.value.bizContact,
  () => {
    let regExPhoneReplace = companySave.value.bizContact.replace(/[^0-9]/g, "");

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

    companySave.value.bizContact = regExPhoneReplace;

    const regExPhone =
      /^(02-\d{3,4}-\d{4}|010-\d{4}-\d{4}|070-\d{4}-\d{4}|\d{3}-\d{3,4}-\d{4}|\d{4}-\d{4})$/.test(
        regExPhoneReplace
      );

    const phoneInput = document.getElementById("bizContact");

    if (regExPhone) {
      phoneInput.classList.add("is-valid");
      phoneInput.classList.remove("is-invalid");
    } else {
      phoneInput.classList.add("is-invalid");
      phoneInput.classList.remove("is-valid");
    }
  }
);

// 3. 주소검색
const handlerKakaoPost = () => {
  kakaoPostcode((data) => {
    companySave.value.bizAddr.value = data.address;
    companySave.value.bizAddr.state = true;
  });
};

// 4. 설립일
const bizFoundDateValid = () => {
  const foundDate = new Date(companySave.value.bizFoundDate.value);
  const today = new Date();

  foundDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  if (foundDate > today || companySave.value.bizFoundDate.value === "") {
    toast.error("미래의 날짜로 선택 할 수 없습니다.");
    companySave.value.bizFoundDate.state = false;
    companySave.value.bizFoundDate.value = "";
  } else {
    companySave.value.bizFoundDate.state = true;
  }
};

// 5. 파일 등록
const fileInput = () => {
  const fileInput = document.getElementById("fileInput");
  fileData.value = fileInput.files[0];

  if (fileData.value) {
    if (!fileData.value.type.startsWith("image/")) {
      toast.error("이미지 파일만 업로드할 수 있습니다.");
      fileName.value = "";
      logoPreview.value = "";
      fileInput.classList.add("is-invalid");
      fileInput.classList.remove("is-valid");
      return;
    }

    const maxSize = 10 * 1024 * 1024;
    if (fileData.value.size > maxSize) {
      toast.error("파일 용량은 10MB를 초과할 수 없습니다.");
      fileName.value = "";
      fileInput.classList.add("is-invalid");
      fileInput.classList.remove("is-valid");
      return;
    }

    fileName.value = fileData.value.name;
    logoPreview.value = URL.createObjectURL(fileData.value);
    fileInput.classList.add("is-valid");
    fileInput.classList.remove("is-invalid");
  } else {
    fileName.value = "";
    logoPreview.value = "";
    fileInput.classList.add("is-invalid");
    fileInput.classList.remove("is-valid");
  }
};

// 등록하기 유효성 검사
const companySaveValid = () => {
  if (!companySave.value.bizName.state) {
    toast.error("사업자명을 입력하세요!");
    bizName.value.focus();
  } else if (!companySave.value.bizCeoName.state) {
    toast.error("사업자 대표를 입력하세요!");
    bizCeoName.value.focus();
  } else if (!bizContact.value.classList.contains("is-valid")) {
    toast.error("전화번호를 입력하세요!");
    bizContact.value.focus();
  } else if (!companySave.value.bizAddr.state) {
    toast.error("사업자 주소를 입력하세요!");
    bizAddr.value.focus();
  } else if (!companySave.value.bizEmpCount.state) {
    toast.error("사원수를 선택하세요!");
    bizEmpCount.value.focus();
  } else if (!companySave.value.bizWebUrl.state) {
    toast.error("홈페이지 주소를 입력하세요!");
    bizWebUrl.value.focus();
  } else if (!companySave.value.bizFoundDate.state) {
    toast.error("설립일을 입력하세요!");
    bizFoundDate.value.focus();
  } else if (!companySave.value.bizRevenue.state) {
    toast.error("매출액을 선택하세요!");
    bizRevenue.value.focus();
  } else if (!fileInfo.value.classList.contains("is-valid")) {
    toast.error("기업로고를 첨부하세요!");
    fileInfo.value.focus();
  } else {
    handlerCompanySave();
  }
};
// 회사 등록
const { mutate: handlerCompanySave } = useCompanySave(companySave, fileData);
</script>
<style scoped>
.companySaveContent {
  width: 100%;
}

table {
  width: 100%;
  margin-top: 20px;
}
th {
  background-color: #fff3cd;
  text-align: center;
  width: 150px;
}
td {
  width: 35%;
}

input,
select,
textarea {
  padding: 0 10px;
  font-size: 14x;
  height: 35px;
}

.form-textarea {
  height: 150px;
}
.text-danger {
  background-color: transparent;
}
</style>
