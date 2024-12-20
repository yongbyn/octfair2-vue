<template>
  <div class="qnaListWrapper">
    <NoticeModal />
    <!-- {{ qnaList.qna }} -->
    <table>
      <colgroup>
        <col width="10%" />
        <col width="50%" />
        <col width="30%" />
        <col width="10%" />
      </colgroup>

      <thead>
        <tr>
          <th scope="col">번호</th>
          <th scope="col">제목</th>
          <th scope="col">작성일</th>
          <th scope="col">작성자</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="qnaList">
          <tr v-for="contents in qnaList.qna">
            <td>{{ contents.qnaIdx }}</td>
            <td>{{ contents.title }}</td>
            <td>{{ contents.createdDate }}</td>
            <td>{{ contents.author }}</td>
          </tr>

          <!-- <tr>
            <td colspan="7">일치하는 검색 결과가 없습니다</td>
          </tr> -->

          <div v-for="currentPage in 10">
            <button @click="searchList(currentPage)">
              {{ i }}
            </button>
          </div>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import axios from "axios";
import { useRoute } from "vue-router";
import { useUserInfo } from "../../../stores/userInfo";
import { paginCalculation } from "../../../JavaScriptutil/pagingUtil";

// const route = useRoute();
const qnaList = ref({});

const currentPage = ref(1);

// const modalState = useModalStore();
// const noticeIdx = ref(0);

// 페이지 진입시 필요한 파람 데이터 paramMap: {currentPage=1, pageSize=5, qna_type=B, requestType=all}
const PageData = ref({
  currentPage: 1,
  pageSize: 5,
  startSeq: 0,
  qna_type: "B",
  requestType: "all",
});

const searchList = async () => {
  const pagingData = { ...PageData.value };

  console.log("currentPage: " + PageData.value.currentPage);

  await axios.post("/vue/api/board/qnaListBody.do", pagingData).then((res) => {
    qnaList.value = { qna: res.data.qna, qnaCnt: res.data.qnaCnt };

    //paging 계산 함수를 여기서 계속 호출하면 될듯
    let totalRows = res.data.qnaCnt;

    let calculObj = paginCalculation(currentPage, totalRows, 5, 10);

    console.log(calculObj);

    // pagingBtn.value = calculObj.totalPage;
    // unitIndex.value = calculObj.unit_num;
    // nextPageBtn.value = calculObj.nextPage;
    // EndFlag.value = calculObj.endFlag;
  });
};

// const handlerModal = (idx) => {
//   noticeIdx.value = idx;
//   modalState.setModalState();
// };

// watch(route, searchList);
// // watch(modalState, searchList); // emit 대신 이거 해도 됐었음 (용빈)

// 화면이 초기에 열렸을 때 실행
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
  background-color: #d3d3d3;
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

  /* 테이블 올렸을 때 */
  tbody tr:hover {
    background-color: #2676bf;
    opacity: 0.9;
    cursor: pointer;
  }
}
</style>
