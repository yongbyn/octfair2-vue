<template>
  <div class="divFAQList">
    현재 페이지:{{ cPage }} 총 개수:{{ faqList?.faqCnt }} 유저타입: {{ type }}
    <div class="button-box">
      <button :class="{ active: type === '1' }" @click="updateFaqType('1')">
        개인회원
      </button>
      <button :class="{ active: type === '2' }" @click="updateFaqType('2')">
        기업회원
      </button>
    </div>
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
          <th scope="col">작성자</th>
          <th scope="col">등록일</th>
          <th v-if="userType === 'M'" scope="col">관리</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="isLoading">로딩중...</template>
        <template v-else-if="isSuccess">
          <template v-if="faqList.faqCnt > 0">
            <tr v-for="faq in faqList.faq" :key="faq.faq_idx">
              <td>{{ faq.faq_idx }}</td>
              <td @click="handlerShowContent(faq.faq_idx)">{{ faq.title }}</td>
              <td>{{ faq.author }}</td>
              <td>{{ faq.created_date.substring(0, 10) }}</td>

              <td v-if="userType === 'M'">
                <button type="button" @click="faqDetail(faq.faq_idx)">
                  관리
                </button>
              </td>
            </tr>
              <tr
                v-for="faq in faqList.faq"
                :key="faq.faq_idx"
                :class="style === faq.faq_idx ? 'show' : 'hide'"
              >
                <td colspan="5">{{ faq.content }}</td>
            </tr>
           
          </template>
          <template v-else>
            <tr>
              <td colspan="4">일치하는 검색 결과가 없습니다</td>
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
import { computed, inject, ref } from "vue";
import { useRouter } from "vue-router";
import { useFAQListQuery } from "../../../hook/faq/useFAQListQuery";
import { useUserInfo } from "../../../stores/userInfo";
import Pagination from "../../common/Pagination.vue";

const cPage = ref(1);
//const faqType = ref("1");
const injectedValue = inject("providedValue");
//const type = ref();
const type = ref();
const style = ref(null);
const userInfo = useUserInfo();
const userType = computed(() => userInfo.user.userType);
const router = useRouter();
const {
  data: faqList,
  isLoading,
  isSuccess,
  isError,
} = useFAQListQuery(injectedValue, cPage, type);

const faqDetail = (faq_idx) => {
  router.push({
    name: "faqDetail",
    params: { faq_idx },
  });
};

const updateFaqType = (newType) => {
  type.value = newType;
};

const handlerShowContent = (faq_idx) => {
  style.value = style.value === faq_idx ? null : faq_idx;
};

//watch([faqType, cPage], () => {});
</script>

<style lang="scss" scoped>
.show {
  display: table-row;
}
.hide {
  display: none;
}

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