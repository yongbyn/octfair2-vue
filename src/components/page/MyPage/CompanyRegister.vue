<template>
  <div class="align-items-center companyRegisterContent">
    <table class="table-striped table-hover text-center align-middle">
      <tr>
        <th>사업자명<span class="text-danger">*</span></th>
        <td>
          <b-form-input class="form-control" :state="false" />
        </td>
        <th>사업자 대표<span class="text-danger">*</span></th>
        <td>
          <b-form-input class="form-control" :state="false" />
        </td>
      </tr>

      <tr>
        <th>연락처<span class="text-danger">*</span></th>
        <td>
          <b-form-input class="form-control" :state="false" />
        </td>
        <th>사업자주소<span class="text-danger">*</span></th>
        <td>
          <b-form-input class="form-control" :state="false" />
        </td>
      </tr>

      <tr>
        <th>사원수<span class="text-danger">*</span></th>
        <td>
          <b-form-select
            class="mb-3"
            v-model="companyRegister.empCount"
            :state="companyRegister.empCount ? true : false"
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
        <th>홈페이지 주소<span class="text-danger">*</span></th>
        <td>
          <b-form-input class="form-control" :state="false" />
        </td>
      </tr>

      <tr>
        <th>설립일<span class="text-danger">*</span></th>
        <td>
          <b-form-input type="date" class="form-control" :state="false" />
        </td>
        <th>매출액<span class="text-danger">*</span></th>
        <td>
          <b-form-select
            class="mb-3"
            v-model="companyRegister.revenue"
            :state="companyRegister.revenue ? true : false"
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
        <th>기업소개<span class="text-danger">*</span></th>
        <td colspan="3">
          <b-form-textarea
            class="form-textarea"
            v-model="companyRegister.comapanyIntro"
            placeholder="2000자 이내로 입력하세요."
            rows="10"
            max-rows="10"
          ></b-form-textarea>
        </td>
      </tr>

      <tr>
        <th>기업로고<span class="text-danger">*</span></th>
        <td colspan="3">
          <input
            type="file"
            id="fileInput"
            class="form-control is-invalid"
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
    <div class="d-flex align-items-center">
      <b-button variant="outline-danger" @click="router.go(-1)"
        >뒤로가기</b-button
      >
      <b-button variant="info">등록하기</b-button>
    </div>
  </div>
</template>

<script setup>
import { toast } from "@/common/toastMessage";
import { ref } from "vue";

const companyRegister = ref({
  foundDate: "",
  empCount: "",
  revenue: "",
  comapanyIntro: "",
  file: "",
  logo: "",
});

const fileName = ref("");
const logoPreview = ref("");

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

    const reader = new FileReader();
    reader.onload = (e) => {
      logoPreview.value = e.target.result;
    };
    reader.readAsDataURL(file);
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
  height: 100px;
}
.text-danger {
  background-color: transparent;
}
</style>
