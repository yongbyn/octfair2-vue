<template>
  <div class="divFAQList">
    현재 페이지:{{ cPage }} 총 개수:{{ faqList?.faqCnt }} 유저타입:
    {{ userType }}
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
          <template v-if="faqList.faqCnt > 0">
            <tr
              v-for="faq in faqList.faq"
              :key="faq.faq_idx"
              @click="faqDetail(faq.faq_idx)"
            >
              <td>{{ faq.faq_idx }}</td>
              <td>{{ faq.title }}</td>
              <td>{{ faq.author }}</td>
              <td>{{ faq.created_date.substr(0, 10) }}</td>
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
    <Pagination
      :totalItems="faqList?.faqCnt || 0"
      :items-per-page="5"
      :max-pages-shown="5"
      :onClick="searchList"
      v-model="cPage"
    />
  </div>
</template>

<script setup>
import { inject, ref } from "vue";
import { useRouter } from "vue-router";
import { useFAQListQuery } from "../../../hook/faq/useFAQListQuery";
import { useUserInfo } from "../../../stores/userInfo";
import Pagination from "../../common/Pagination.vue";

const cPage = ref(1);
const injectedValue = inject("providedFaqValue");
const userType = useUserInfo().user.userType;
const router = useRouter();
const {
  data: faqList,
  isLoading,
  isSuccess,
  isError,
} = useFAQListQuery(injectedValue, cPage, userType);

const faqDetail = (faq_idx) => {
  router.push({
    name: "FAQDetailModal",
    params: { faq_idx },
  });
};
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
