<template>
  <div class="divNoticeList">
    <h4>
      <b-badge variant="light">
        총
        <b-badge pill variant="primary">
          {{ noticeList?.noticeCnt }}
        </b-badge>
        개의 글
      </b-badge>
    </h4>
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
        <template v-if="isLoading">...로딩중</template>
        <template v-if="isSuccess">
          <template v-if="noticeList.noticeCnt > 0">
            <tr
              v-for="notice in noticeList.notice"
              :key="notice.noticeIdx"
              @click="handlerDetail(notice.noticeIdx)"
            >
              <td>{{ notice.noticeIdx }}</td>
              <td>{{ notice.title }}</td>
              <td>{{ notice.createdDate.substr(0, 10) }}</td>
              <td>{{ notice.author }}</td>
            </tr>
          </template>
          <template v-else>
            <tr>
              <td colspan="7">일치하는 검색 결과가 없습니다</td>
            </tr>
          </template>
        </template>
      </tbody>
    </table>
    <Pagination
      :totalItems="noticeList?.noticeCnt || 0"
      :items-per-page="5"
      :max-pages-shown="5"
      :onClick="searchList"
      v-model="cPage"
    />
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useNoticeListSearchQuery } from "../../../../hook/notice/useNoticeListSearchQuery";
import Pagination from "../../../common/Pagination.vue";

const router = useRouter();
const cPage = ref(1);
const injectedValue = inject("providedValue");

const {
  data: noticeList,
  isLoading,
  isStale,
  refetch,
  isSuccess,
} = useNoticeListSearchQuery(injectedValue, cPage);

const handlerDetail = (param) => {
  router.push({
    name: "noticeDetail",
    params: { idx: param },
  });
};
</script>

<style>
.listCountBadge {
  font-weight: 600;
  font-size: 16px;
}

.listCountBadge:hover,
.listCountBadge:active,
.listCountBadge:visited {
  cursor: default;
  background-color: rgb(253, 253, 253);
  border: 1px solid rgb(253, 253, 253);
}
</style>

<style lang="scss" scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin: 80px 0px 0px 0px;
  font-size: 18px;
  text-align: left;

  th,
  td {
    padding: 8px;
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
