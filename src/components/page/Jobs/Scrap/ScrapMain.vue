<template>
  <div class="divPostList">
    <PostApplyModal
      v-if="modalState.modalState"
      @modalClose="refetch()"
      :postIdx="detailValue.postIdx"
      :title="detailValue.postTitle"
      :bizName="detailValue.postBizName"
    />
    <h4>
      <b-badge variant="light">
        총
        <b-badge pill variant="primary">
          {{ scrapList?.scrapCnt }}
        </b-badge>
        개의 글
      </b-badge>
    </h4>
    <table>
      <colgroup>
        <col width="5%" />
        <col width="15%" />
        <col width="25%" />
        <col width="10%" />
        <col width="10%" />
        <col width="20%" />
        <col width="15%" />
      </colgroup>
      <thead>
        <tr>
          <th scope="col">
            <b-form-checkbox
              v-model="allSelected"
              :indeterminate="indeterminate"
              @change="toggleAll"
              style="resize: none"
            >
            </b-form-checkbox>
          </th>
          <th scope="col">기업명</th>
          <th scope="col">공고 제목</th>
          <th scope="col">자격 요건</th>
          <th scope="col">근무 지역</th>
          <th scope="col">마감일</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <template v-if="isLoading">로딩중...</template>
        <template v-else-if="isSuccess">
          <template v-if="scrapList.scrapCnt > 0">
            <tr v-for="scrap in scrapList.scrapList" :key="scrap.scrapIdx">
              <td>
                <b-form-checkbox
                  :checked="selectedScrapIdxList.includes(scrap.scrapIdx)"
                  @change="toggleSingle(scrap.scrapIdx)"
                  style="resize: none"
                ></b-form-checkbox>
              </td>
              <td>{{ scrap.postBizName }}</td>
              <td @click="handlerDetail(scrap.postIdx)">
                {{ scrap.postTitle }}
              </td>
              <td>{{ scrap.postStatus }}</td>
              <td>{{ scrap.postWorkLocation }}</td>
              <td>{{ scrap.postEndDate }}</td>
              <td>
                <b-button v-if="scrap.isApplyed" disabled>지원완료</b-button>
                <b-button
                  v-if="!scrap.isApplyed"
                  variant="primary"
                  @click="
                    handlerApply(
                      scrap.postIdx,
                      scrap.postBizName,
                      scrap.postTitle
                    )
                  "
                >
                  입사지원
                </b-button>
              </td>
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
      :totalItems="scrapList?.scrapCnt || 0"
      :items-per-page="5"
      :max-pages-shown="5"
      v-model="cPage"
    />
  </div>
</template>

<script setup>
import { ref, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useScrapListSearchQuery } from "../../../../hook/jobs/useScrapListSearchQuery";
import { useModalStore } from "../../../../stores/modalState";
import Pagination from "../../../common/Pagination.vue";
const router = useRouter();
const route = useRoute();
const modalState = useModalStore();
const cPage = ref(1);
const injectedValue = inject("providedValue");
const selectedScrapIdxList = inject("selectedScrapIdxList");
const allSelected = ref(false);
const indeterminate = ref(false);

const detailValue = ref({
  postIdx: null,
  postBizName: "",
  postTitle: "",
});

const {
  data: scrapList,
  isLoading,
  isSuccess,
  isError,
  refetch,
} = useScrapListSearchQuery(injectedValue, cPage);

const toggleAll = () => {
  if (allSelected.value) {
    selectedScrapIdxList.value = scrapList.value.scrapList.map(
      (scrap) => scrap.scrapIdx
    );
  } else {
    selectedScrapIdxList.value = [];
  }

  updatePart();
};

const toggleSingle = (scrapIdx) => {
  const index = selectedScrapIdxList.value.indexOf(scrapIdx);
  if (index === -1) {
    selectedScrapIdxList.value.push(scrapIdx);
  } else {
    selectedScrapIdxList.value.splice(index, 1);
  }
  updatePart();
};

const updatePart = () => {
  const total = scrapList.value?.scrapList.map((scrap) => scrap.scrapIdx) || [];
  const checked = selectedScrapIdxList.value.length;

  allSelected.value = checked > 0 && checked === total.length;
  indeterminate.value = checked > 0 && checked < total.length;
};

const handlerDetail = (idx) => {
  router.push({ name: "postDetail", params: { idx } });
};

const handlerApply = (idx, bizName, title) => {
  detailValue.value = {
    postIdx: idx,
    postBizName: bizName,
    postTitle: title,
  };

  modalState.setModalState();
};

watchEffect(() => {
  if (isSuccess.value && scrapList.value) {
    const total = scrapList.value.scrapList.map((scrap) => scrap.scrapIdx);

    if (allSelected.value) {
      selectedScrapIdxList.value = total;
    } else if (!indeterminate.value) {
      selectedScrapIdxList.value = [];
    }

    updatePart();
  }
});

watch(
  () => route.name,
  (newRoute) => {
    if (newRoute === "scrap") {
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
