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
            <b-button
              variant="warning"
              class="ms-2 addressBtn"
              @click="handlerKakaoPost"
              >주소 검색</b-button
            >
          </div>
        </td>
      </tr>

      <tr>
        <th>사원수 <span class="text-danger">*</span></th>
        <td>
          <b-form-select
            class="mb-3 b_form_select"
            ref="bizEmpCount"
            v-model="companySave.bizEmpCount.value"
            :state="companySave.bizEmpCount.state"
            @input="inputValid('bizEmpCount')"
          >
            <b-form-select-option value="" hidden
              >선택하세요</b-form-select-option
            >
            <b-form-select-option value="10명 이하"
              >10명 이하</b-form-select-option
            >
            <b-form-select-option value="50명 이하"
              >50명 이하</b-form-select-option
            >
            <b-form-select-option value="100명 이하"
              >100명 이하</b-form-select-option
            >
            <b-form-select-option value="1000명 이하"
              >1000명 이하</b-form-select-option
            >
            <b-form-select-option value="1000명 이상"
              >1000명 이상</b-form-select-option
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
          <div class="d-flex align-items-center">
            <input
              type="file"
              id="fileInput"
              class="form-control me-2"
              :class="fileName || fileData.bizLogo ? 'is-valid' : 'is-invalid'"
              ref="fileInfo"
              @change="fileInput"
            />
            <span class="text-primary text-end ms-auto"
              >10MB 이하의 파일만 업로드 가능합니다.</span
            >
          </div>
        </td>
      </tr>

      <tr class="logo_tr">
        <th>로고 미리보기</th>
        <td colspan="3">
          <img
            v-if="logoPreview"
            id="logoPreview"
            :src="logoPreview || fileData.bizLogo"
            alt="미리보기 이미지"
            class="logoPreview"
            :class="{
              'is-valid': fileData.logicalPath,
              'is-invalid': !fileData.logicalPath,
            }"
          />
        </td>
      </tr>
    </table>
    <div class="d-flex justify-content-center align-items-center mt-4">
      <b-button class="me-2" @click="router.go(-1)">뒤로가기</b-button>
      <b-button
        variant="danger"
        class="me-2"
        @click="handlerCompanyDelete"
        v-if="companySave.bizIdx !== 0"
        >삭제하기</b-button
      >
      <b-button variant="primary" @click="companySaveValid">{{
        companySave.bizIdx !== 0 ? "수정하기" : "등록하기"
      }}</b-button>
    </div>
  </div>
</template>

<script setup>
import { kakaoPostcode } from "@/common/kakaoPostCodeApi";
import { toast } from "@/common/toastMessage";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useCompanyDelete } from "../../../hook/mypage/useCompanyDelete";
import { useCompanySave } from "../../../hook/mypage/useCompanySave";
import { useCompanyUpdate } from "../../../hook/mypage/useCompanyUpdate";
import { useGetCompanyInfo } from "../../../hook/mypage/useGetCompanyInfo";
import { useUserInfo } from "../../../stores/userInfo";

const router = useRouter();

const { user } = useUserInfo();
const companySave = ref({
  bizName: {
    value: "",
    state: false,
  },
  bizCeoName: {
    value: "",
    state: false,
  },
  bizContact: "",
  bizAddr: {
    value: "",
    state: false,
  },
  bizEmpCount: {
    value: "",
    state: false,
  },
  bizWebUrl: {
    value: "",
    state: false,
  },
  bizFoundDate: {
    value: "",
    state: false,
  },
  bizRevenue: {
    // 연매출
    value: "",
    state: false,
  },
  bizIntro: "",
  userIdx: user.userIdx,
  loginId: user.loginId,
  userType: user.userType,
  bizIdx: 0,
});
const fileData = ref({
  bizLogo: "",
  logicalPath: "",
});

const logoPreview = ref("");
const fileName = ref("");

// 해당 api에서 db를 불러와서 변수에 값을 넣는다.
const { mutate: getCompanyInfo } = useGetCompanyInfo(companySave, fileData);

// // 포커스용 변수
const bizName = ref("");
const bizCeoName = ref("");
const bizAddr = ref("");
const bizContact = ref("");
const bizWebUrl = ref("");
const bizFoundDate = ref("");
const bizEmpCount = ref("");
const bizRevenue = ref("");
const fileInfo = ref("");

// 1. 사업자명,  사업자 대표, 주소, 홈페이지, 사원수, 매출액
const inputValid = (validName) => {
  if (companySave.value[validName].value) {
    companySave.value[validName].state = true;
  } else {
    companySave.value[validName].state = false;
  }
};

// 2. 전화번호(연락처)
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

// 3. 사업자 주소 (다음 카카오 api 주소 검색)
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
// DB에서 가져온 이미지 파일 처리
watch(
  () => fileData.value.bizLogo,
  () => {
    if (fileData.value.bizLogo) {
      logoPreview.value = fileData.value.logicalPath;
    }
  }
);

// 등록하기 유효성 검사
const companySaveValid = () => {
  if (!companySave.value.bizName.state) {
    toast.error("사업자명을 입력하세요!");
    bizName.value.focus();
    return;
  } else if (!companySave.value.bizCeoName.state) {
    toast.error("사업자 대표를 입력하세요!");
    bizCeoName.value.focus();
    return;
  } else if (!bizContact.value.classList.contains("is-valid")) {
    toast.error("전화번호를 입력하세요!");
    bizContact.value.focus();
    return;
  } else if (!companySave.value.bizAddr.state) {
    toast.error("사업자 주소를 입력하세요!");
    bizAddr.value.focus();
  } else if (!companySave.value.bizEmpCount.state) {
    toast.error("사원수를 선택하세요!");
    bizEmpCount.value.focus();
    return;
  } else if (!companySave.value.bizWebUrl.state) {
    toast.error("홈페이지 주소를 입력하세요!");
    bizWebUrl.value.focus();
    return;
  } else if (!companySave.value.bizFoundDate.state) {
    toast.error("설립일을 입력하세요!");
    bizFoundDate.value.focus();
    return;
  } else if (!companySave.value.bizRevenue.state) {
    toast.error("매출액을 선택하세요!");
    bizRevenue.value.focus();
    return;
  } else if (!fileInfo.value.classList.contains("is-valid")) {
    toast.error("기업로고를 첨부하세요!");
    fileInfo.value.focus();
    return;
  } else {
    if (companySave.value.bizIdx === 0) {
      handlerCompanySave();
      toast.success("기업을 등록하였습니다.");
      companySave.value.bizIdx = 1;
    } else {
      handlerCompanyUpdate();
      toast.success("기업을 수정하였습니다.");
    }
  }
};
// 회사 등록
const { mutate: handlerCompanySave } = useCompanySave(companySave, fileData);

// 회사 수정
const { mutate: handlerCompanyUpdate } = useCompanyUpdate(
  companySave,
  fileData
);

// 회사 삭제
const handlerCompanyDelete = () => {
  companyDelete();
  toast.success("회사 정보가 삭제되었습니다.");
  companySave.value = {
    bizContact: "",
    bizName: "",
    bizCeoName: "",
    bizAddr: "",
    bizEmpCount: "",
    bizWebUrl: "",
    bizFoundDate: "",
    bizRevenue: "",
  };
  fileData.value = {
    bizLogo: "",
  };
  logoPreview.value = "";
  document.getElementById("fileInput").value = "";
  const fileInput = document.getElementById("fileInput");
  fileInput.classList.add("is-invalid");
  fileInput.classList.remove("is-valid");
};
const { mutate: companyDelete } = useCompanyDelete(companySave, fileData);

// 값을 초기화한다.
onActivated(() => {
  getCompanyInfo();
});
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
  width: 300px;
}
td {
  width: 550px;
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
.addressBtn {
  width: 150px;
}
input[type="file"] {
  width: 500px;
}
.logo_tr {
  min-height: 500px;
}
.logoPreview {
  margin-top: 20px;
  width: 500px;
}
.b_form_select {
  height: 35px;
}
</style>
