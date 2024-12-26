<template>
  <div class="form-container">
    <table class="form-table">
      <colgroup>
        <col width="10%" />
        <col width="15%" />
        <col width="20%" />
        <col width="20%" />
        <col width="20%" />
        <col width="15%" />
      </colgroup>
      <thead>
        <tr>
          <th>회원번호</th>
          <th>회원ID</th>
          <th>회원명</th>
          <th>이메일</th>
          <th>회원가입날짜</th>
          <th>관리</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="applicantList">
          <template v-if="applicantList.applicantCnt > 0">
            <tr
              v-for="applicant in applicantList.applicant"
              :key="applicant.userIdx"
            >
              <td>{{ applicant.userIdx }}</td>
              <td>{{ applicant.loginId }}</td>
              <td>{{ applicant.name }}</td>
              <td>{{ applicant.email }}</td>
              <td>{{ applicant.regdate }}</td>
              <td><button>정보수정</button></td>
            </tr>
          </template>
        </template>
      </tbody>
    </table>
    <Pagination
      :totalItems="applicantList?.applicantCnt || 0"
      :items-per-page="5"
      :max-pages-shown="5"
      :onClick="applicantList"
      v-model="cPage"
    />
  </div>
</template>

<script setup>
import axios from "axios";
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { useModalStore } from "../../../../stores/modalState";

const route = useRoute();
const applicantList = ref();
const cPage = ref(1);
const modalState = useModalStore();
const applicantIdx = ref(0);

const searchList = async () => {
  const requestBody = {
    searchName: route.query.searchName || "",
    currentPage: cPage.value,
    pageSize: 5,
  };

  await axios
    .post("/prx/api/manage-user/applicantListBody.do", requestBody)
    .then((res) => {
      console.log(res.data.applicant);
      applicantList.value = res.data;
    });
};

onMounted(() => {
  searchList();
});
</script>

<style lang="scss" scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0px 0px 0px;
  font-size: 18px;
  text-align: left;

  th,
  td {
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid #ddd;
    text-align: center;
  }

  th {
    background-color: #2676bf;
    color: #ddd;
  }
}
button {
  padding: 6px 12px;
  margin: 5px;
  border-radius: 4px;
  border: none;
  background-color: #1378e4;
  color: white;
  cursor: pointer;
}

button:hover {
  background-color: #003d7e;
}
</style>
