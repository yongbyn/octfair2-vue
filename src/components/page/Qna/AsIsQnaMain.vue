<template>
  <div class="boardWrapper">
    <div class="boardContentArea" id="idboardContentArea">
      <!-- 번호	제목	작성자	등록일 
      
       qna_idx as qnaIdx
			, title
			, content 
			, author 
			, created_date as createdDate
			, ans_content
      
      -->
      <div class="boardheaderArea">
        <div>번호</div>
        <div>제목</div>
        <div>작성자</div>
        <div>등록일</div>
      </div>
      <!-- {{ qnaListData.paginCalCulData }} -->
      <div v-if="isSuccess">
        <div v-if="qnaListData.data.qna.length == 0">
          작성하신 글이 없습니다.
        </div>

        <div class="boardContentList" v-for="list in qnaListData.data.qna">
          <div>{{ list.qnaIdx }}</div>
          <div>{{ list.title }}</div>
          <div>{{ list.author }}</div>
          <div>{{ list.createdDate }}</div>
        </div>
      </div>
    </div>
    <div class="btnArea">
      <button
        @click="
          getBoardFnc(
            qnaListData.paginCalCulData.backPage,
            qnaListData.paginCalCulData.startFlage
          )
        "
      >
        이전페이지로
      </button>
      <template v-if="isSuccess">
        <div
          class="pagebtn"
          v-for="pages in qnaListData.paginCalCulData.endPage"
          :key="qnaListData.paginCalCulData.startPage"
        >
          <button
            v-if="qnaListData.paginCalCulData.startPage <= pages"
            @click="getBoardFnc(pages)"
          >
            {{ pages }}
          </button>
        </div>
      </template>
      <button
        @click="
          getBoardFnc(
            qnaListData.paginCalCulData.nextPage,
            qnaListData.paginCalCulData.endFlage
          )
        "
      >
        다음페이지로
      </button>
    </div>
  </div>
</template>

<script setup>
import { useQnaListSearchQuery } from "../../../hook/qna/useQnaListSearchQuery";
// const route = useRoute();
import { useUserInfo } from "../../../stores/userInfo";
const qnaList = ref({});
const startIndex = ref(1);
const paginCalCulData = ref({});
const paginData = ref({
  currentPage: 1,
  pageSize: 5,
  startSeq: 0,
  qna_type: "B",
  requestType: useUserInfo().user.userType,
  searchTitle: "",
  searchStDate: "",
  searchEdDate: "",
});

const injectedValue = inject("providedQnaValue");

const {
  data: qnaListData,
  isLoading,
  refetch,
  isSuccess,
  isError,
} = useQnaListSearchQuery(paginData, injectedValue, qnaList, startIndex);

const getBoardFnc = async (pages, flagMessage) => {
  console.log(`flagMessage : ${flagMessage}`);

  if (flagMessage) {
    alert("더이상 페이지가 없습니다.");
    return;
  }

  if (flagMessage) {
    alert("마지막 페이지 입니다.");
    return;
  }

  paginData.value.currentPage = pages;
};
</script>

<style>
.boardWrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  /* max-width: 786px; */
  background-color: whitesmoke;
}

.boardContentArea {
  display: flex;
  flex-direction: column;
  width: 80%;
}

.boardheaderArea {
  display: grid;
  grid-template-columns: 10% 10% 60% 20%;
}
.boardContentList {
  display: grid;
  grid-template-columns: 10% 10% 60% 20%;
  height: 48px;
}

.btnArea {
  display: flex;
}
</style>
