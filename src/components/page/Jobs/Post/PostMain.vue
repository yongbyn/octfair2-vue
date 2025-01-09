<template>
  <div class="divPostList">
    <h4>
      <b-badge variant="light">
        총
        <b-badge pill variant="primary">
          {{ postList?.approvalPostCnt }}
        </b-badge>
        개의 글
      </b-badge>
    </h4>
    <table>
      <colgroup>
        <col width="10%" />
        <col width="30%" />
        <col width="20%" />
        <col width="10%" />
        <col width="15%" />
        <col width="15%" />
      </colgroup>
      <thead>
        <tr>
          <th scope="col">번호</th>
          <th scope="col">제목</th>
          <th scope="col">근무지역</th>
          <th scope="col">경력여부</th>
          <th scope="col">마감일</th>
          <th scope="col">등록일</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="isLoading">로딩중...</template>
        <template v-else-if="isSuccess">
          <template v-if="postList.approvalPostCnt > 0">
            <tr
              v-for="post in postList.approvalList"
              :key="post.postIdx"
              @click="handlerDetail(post.postIdx)"
            >
              <td>{{ post.postIdx }}</td>
              <td>{{ post.title }}</td>
              <td>{{ post.workLocation }}</td>
              <td>{{ post.expRequired }}</td>
              <td>{{ post.endDate.substr(0, 10) }}</td>
              <td>{{ post.postDate.substr(0, 10) }}</td>
            </tr>
          </template>
          <template v-else>
            <tr>
              <td colspan="6">일치하는 검색 결과가 없습니다</td>
            </tr>
          </template>
        </template>
        <template v-else-if="isError">에러발생</template>
      </tbody>
    </table>
    <Pagination
      :totalItems="postList?.approvalPostCnt || 0"
      :items-per-page="5"
      :max-pages-shown="5"
      v-model="cPage"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { usePostListSearchQuery } from "../../../../hook/jobs/usePostListSearchQuery";
import Pagination from "../../../common/Pagination.vue";

const router = useRouter();
const cPage = ref(1);
const injectedValue = inject("providedValue");
const route = useRoute();

const {
  data: postList,
  isLoading,
  isSuccess,
  isError,
  refetch,
} = usePostListSearchQuery(injectedValue, cPage);

const handlerDetail = (idx) => {
  router.push({
    name: "postDetail",
    params: { idx },
  });
};

watch(
  () => route.name,
  (newRoute) => {
    if (newRoute === "post") {
      refetch();
    }
  }
);
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
    background-color: #337fd1;
    color: white;
  }

  /* 테이블 올렸을 때 */
  tbody tr:hover {
    background-color: #f7f7f7;
    opacity: 0.9;
    cursor: pointer;
  }
}
</style>
