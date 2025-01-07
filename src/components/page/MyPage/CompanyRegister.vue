<template>
  <div class="align-items-center companyRegisterContent">
    <table class="table-striped table-hover text-center align-middle">
      <tr>
        <th>사업자명 <span class="text-danger">*</span></th>
        <td>
          <b-form-input
            class="form-control"
            ref="bizName"
            v-model="companyRegister.bizName.value"
            :state="companyRegister.bizName.state"
            placeholder="사업자명을 입력하세요."
          />
        </td>
        <th>사업자 대표 <span class="text-danger">*</span></th>
        <td>
          <b-form-input
            class="form-control"
            ref="bizCeoName"
            v-model="companyRegister.bizCeoName.value"
            :state="companyRegister.bizCeoName.state"
            placeholder="사업자 대표명 입력하세요."
          />
        </td>
      </tr>

      <tr>
        <th>연락처 <span class="text-danger">*</span></th>
        <td>
          <input
            class="form-control"
            ref="bizContact"
            v-model="companyRegister.bizContact.value"
            :state="companyRegister.bizContact.state"
            placeholder="연락처를 입력하세요.(숫자만 입력)"
          />
        </td>
        <th>사업자 주소 <span class="text-danger">*</span></th>
        <td>
          <div class="d-flex">
            <b-form-input
              class="form-control"
              ref="bizAddr"
              v-model="companyRegister.bizAddr.value"
              :state="companyRegister.bizAddr.state"
              placeholder="사업자 주소를 입력하세요."
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
            v-model="companyRegister.bizEmpCount.value"
            :state="companyRegister.bizEmpCount.state"
            @input="bizEmpCountValid"
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
            v-model="companyRegister.bizWebUrl.value"
            :state="companyRegister.bizWebUrl.state"
            placeholder="홈페이지 주소를 입력하세요."
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
            v-model="companyRegister.bizFoundDate.value"
            :state="companyRegister.bizFoundDate.state"
          />
        </td>
        <th>매출액 <span class="text-danger">*</span></th>
        <td>
          <b-form-select
            class="mb-3"
            ref="bizRevenue"
            v-model="companyRegister.bizRevenue.value"
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
        <th>기업소개 <span class="text-danger">*</span></th>
        <td colspan="3">
          <b-form-textarea
            class="form-textarea"
            v-model="companyRegister.companyIntro"
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
            class="form-control"
            @change="updateFile"
          />
          <div class="text-start">
            {{ fileName ? `현재 파일 : ${fileName}` : "이전 파일 : 없음" }}
          </div>
        </td>
      </tr>

      <tr>
        <th>로고 미리보기</th>
        <td colspan="3">
          <img
            :src="logoPreview"
            alt="미리보기 이미지"
            style="max-width: 300px"
          />
        </td>
      </tr>
    </table>
    <div class="d-flex justify-content-center align-items-center mt-4">
      <b-button variant="outline-danger" @click="router.go(-1)" class="me-3"
        >뒤로가기</b-button
      >
      <b-button variant="primary">등록하기</b-button>
    </div>
  </div>
</template>

<script setup>
import { kakaoPostcode } from "@/common/kakaoPostCodeApi";
import { toast } from "@/common/toastMessage";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const companyRegister = ref({
  bizName: {
    value: "",
    state: null,
  },
  bizAddr: {
    value: "",
    state: null,
  },
  bizContact: {
    value: "",
    state: null,
  },
  bizWebUrl: {
    value: "",
    state: null,
  },
  bizCeoName: {
    value: "",
    state: null,
  },
  bizFoundDate: {
    value: "",
    state: null,
  },
  bizEmpCount: {
    value: "",
    state: null,
  },
  bizRevenue: {
    value: "",
    state: null,
  },
  bizIntro: "",
  loginId: "",
  userIdx: "",
  logo: "",
  fileInfo: {
    fileName: "", // 이름
    fileLoc: "", // 일반 경로
    vrfileLoc: "", // 가상 경로
    fileSize: "", // 크기
    fileExtension: "", // 확장자
  },
});

// 포커스용 변수
const bizName = ref("");
const bizAddr = ref("");
const bizContact = ref("");
const bizWebUrl = ref("");
const bizCeoName = ref("");
const bizFoundDate = ref("");
const bizEmpCount = ref("");
const bizRevenue = ref("");

const fileName = ref("");
const logoPreview = ref("");

// 5. 사원수 확인
const bizEmpCountValid = () => {
  if (companyRegister.value.bizEmpCount.value) {
    companyRegister.value.bizEmpCount.state = true;
  }
};

const handlerKakaoPost = () => {
  kakaoPostcode((data) => {
    companyRegister.value.bizAddr.value = data.address;
  });
};

const updateFile = (event) => {
  const file = event.target.files[0];

  if (file) {
    if (!file.type.startsWith("image/")) {
      toast.error("이미지 파일만 업로드할 수 있습니다.");
      fileName.value = "";
      logoPreview.value = "";
      return;
    }

    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      toast.error("파일 용량은 10MB를 초과할 수 없습니다.");
      fileName.value = "";
      return;
    }
    fileName.value = file.name;
    logoPreview.value = URL.createObjectURL(file);
  }
};
</script>
<style scoped>
.companyRegisterContent {
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
  /* background-color: orange; */
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
.input_gray {
  border: 1px solid #d3d3d3;
}
</style>
