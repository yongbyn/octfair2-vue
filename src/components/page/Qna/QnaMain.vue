<template>
  <div class="divNoticeList">
    현재 페이지: {{ cPage }} 총 개수: {{ qnaListData?.noticeCnt }} 현재
    유저타입: {{ type }}
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
        <template v-if="isLoading">로딩중...</template>
        <template v-else-if="isSuccess">
          <template v-if="qnaListData.qnaCnt > 0">
            <tr v-for="list in qnaListData.qna">
              <td>{{ list.qnaIdx }}</td>
              <td>{{ list.title }}</td>
              <td>{{ list.createdDate.substr(0, 10) }}</td>
              <td>{{ list.author }}</td>
            </tr>
          </template>
          <template v-else>
            <tr>
              <td colspan="7">일치하는 검색 결과가 없습니다</td>
            </tr>
          </template>
        </template>
        <template v-else-if="isError">에러발생</template>
      </tbody>
    </table>
    <VueAwesomePaginate
      :totalItems="qnaListData?.qnaCnt || 0"
      :items-per-page="5"
      :max-pages-shown="5"
      v-model="cPage"
    />
  </div>

  <div></div>
</template>

<script setup>
import { useQnaListSearchQuery } from "../../../hook/qna/useQnaListSearchQuery";
import { useUserInfo } from "../../../stores/userInfo";
const cPage = ref(1);

const injectedValue = inject("providedQnaValue");
const type = useUserInfo().user.userType;
// const searchKey = ref({ Type: type });
// injectedValue.value = { ...searchKey.value };

console.log("Type : " + type);

const {
  data: qnaListData,
  isLoading,
  refetch,
  isSuccess,
  isError,
} = useQnaListSearchQuery(cPage, injectedValue, type);
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

  /* 테이블 올렸을 때 */
  tbody tr:hover {
    background-color: #d3d3d3;
    opacity: 0.9;
    cursor: pointer;
  }
}
</style>
