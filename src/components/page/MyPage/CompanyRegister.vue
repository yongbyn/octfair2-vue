<template>
  <div class="align-items-center companyRegisterContent">
    <table
      class="table table-bordered table-striped table-hover text-center align-middle"
    >
      <tr>
        <th>사업자명<span class="text-danger">*</span></th>
        <td>
          <input class="form-control" />
        </td>
        <th>사업자 대표<span class="text-danger">*</span></th>
        <td>
          <input class="form-control" />
        </td>
      </tr>

      <tr>
        <th>연락처<span class="text-danger">*</span></th>
        <td>
          <input class="form-control" />
        </td>
        <th>사업자주소<span class="text-danger">*</span></th>
        <td>
          <input class="form-control" />
        </td>
      </tr>

      <tr>
        <th>사원수<span class="text-danger">*</span></th>
        <td>
          <b-form-radio-group
            :options="[
              { value: '1', text: '10명이하' },
              { value: '2', text: '50명이하' },
              { value: '3', text: '100명이하' },
              { value: '4', text: '1000명이하' },
              { value: '5', text: '1000명이상' },
            ]"
            button-variant="outline-success"
            name="radio-btn-outline"
            class=""
            buttons
          ></b-form-radio-group>
        </td>
        <th>홈페이지 주소<span class="text-danger">*</span></th>
        <td>
          <input class="form-control" />
        </td>
      </tr>

      <tr>
        <th>설립일<span class="text-danger">*</span></th>
        <td>
          <input class="form-control" type="date" />
        </td>
        <th>매출액<span class="text-danger">*</span></th>
        <td>
          <input class="form-control" />
        </td>
      </tr>

      <tr>
        <th>기업소개<span class="text-danger">*</span></th>
        <td colspan="3">
          <b-form-textarea
            id="companyRegister.comapanyIntro"
            v-model="text"
            placeholder="Enter something..."
            rows="3"
            max-rows="6"
          ></b-form-textarea>
        </td>
      </tr>

      <tr>
        <th>기업로고<span class="text-danger">*</span></th>
        <td colspan="3">
          <b-form-file
            id="fileInput"
            v-model="companyRegister.file"
            @change="handleFileChange"
            placeholder="Choose a file or drop it here..."
            drop-placeholder="Drop file here..."
          />
        </td>
      </tr>

      <tr>
        <th>로고 미리보기</th>
        <td colspan="3">ㅇㅇㅇㅇ</td>
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
import "bootstrap-vue-3/dist/bootstrap-vue-3.css";
import "bootstrap/dist/css/bootstrap.css";

const companyRegister = ref({
  comapanyIntro: "",
  file: "",
});
</script>
<style scoped>
.companyRegisterContent {
  width: 100%;
}

table {
  width: 100%;
  margin-top: 20px;
  white-space: normal;
}
th {
  background-color: yellow;
  text-align: center;
  width: 150px;
}
td {
  background-color: orange;
  width: 35%;
}
</style>
