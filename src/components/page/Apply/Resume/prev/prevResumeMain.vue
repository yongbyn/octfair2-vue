<template>
  <div>
    <table>
      <colgroup>
        <col width="50%" />
        <col width="30%" />
        <col width="10%" />
      </colgroup>

      <thead>
        <tr>
          <th scope="col">이력서 제목</th>
          <th scope="col">관리</th>
          <th scope="col">최종 수정일</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="resumeList">
          <tr v-for="resume in resumeList" :key="resume.resIdx">
            <td>
              <p @click="handlerDetail(resume.resIdx)">{{ resume.resTitle }}</p>
              <p v-if="resume.filename">첨부파일 : {{ resume.filename }}</p>
            </td>
            <td>
              <button @click="handlerCopy(resume.resIdx)">복사하기</button>
              <button @click="handlerDelete(resume.resIdx)">삭제하기</button>
            </td>
            <td>{{ resume.updatedDate }}</td>
          </tr>
        </template>
        <template>
          <tr>
            <td colspan="7">일치하는 검색 결과가 없습니다</td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import axios from "axios";
import { useRouter } from "vue-router";
import { useModalStore } from "../../../../../../stores/modalState";

const router = useRouter();
const resumeList = ref();
const modalState = useModalStore();

const searchList = () => {
  axios.post("/prx/api/apply/resumeList", {}).then((res) => {
    resumeList.value = res.data.payload;
    console.log(res.data.payload);
  });
};

const handlerDetail = (idx) => {
  router.push({
    name: "resumeDetail",
    params: { idx },
  });
};

const handlerCopy = (idx) => {
  axios.post("/prx/api/apply/resumeCopy", { resIdx: idx }).then((res) => {
    alert("복사가 완료되었습니다.");
    searchList();
  });
};

const handlerDelete = (idx) => {
  axios.post("/prx/api/apply/resumeDelete", { resIdx: idx }).then((res) => {
    alert("삭제가 완료되었습니다.");
    searchList();
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

  tbody {
    background-color: #ddd;
    color: #2676bf;
  }
  /* 테이블 올렸을 때 */
  tbody tr:hover {
    background-color: #d3d3d3;
    opacity: 0.9;
    cursor: pointer;
  }

  button {
    text-align: center;
    text-decoration: none;
    display: inline-block;
    border: none;
    color: white;
    width: 70px;
    padding-top: 8px;
    padding-bottom: 8px;
    font-size: 12px;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 12px;
    box-shadow: 0 4px #999;
    background-color: #3bb2ea;

    &:hover {
      background-color: #45a049;
    }

    &:active {
      background-color: #3e8e41;
      box-shadow: 0 2px #666;
      transform: translateY(2px);
    }
  }
}
</style>
