<template>
  <div class="searchwriteWrapper">
    <div class="userTypeArea">
      <div v-if="userType != 'M'">유저</div>
      <div v-else>관리자</div>
    </div>

    <div class="functionArea">
      <div v-if="userType === 'M'">
        <div class="search-box">
          <input v-model="searchTitle" />
          <input type="date" />
          <input type="date" />
          <button>검색</button>
          <button>질문등록</button>
        </div>
      </div>

      <div class="btnArea">
        <div v-if="userType != 'M'">
          <button class="samebtncss" @click="myQnaFnc">내가쓴글</button>
        </div>
        <div v-else>
          <button class="samebtncss">검색</button>
        </div>
        <button class="samebtncss" @click="questionModal">질문등록</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserInfo } from "../../../stores/userInfo";

import router from "../../../router";

const injectedValue = inject("providedQnaValue");
const userType = ref();
const paginData = ref({
  currentPage: 1,
  pageSize: 5,
  startSeq: 0,
  qna_type: "B",
  requestType: "my",
});

const myQnaFnc = () => {
  injectedValue.value = "my";

  paginData.value.requestType = "my";
  console.log(paginData.value.requestType);
};

onMounted(() => {
  const Type = useUserInfo().user.userType;
  injectedValue.value = Type;
  console.log(userType);
  userType.value = Type;
});

const questionModal = () => {
  router.push("qnaInsert.do/insert");
};
</script>

<style>
.searchwriteWrapper {
  background: #ccc;
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.userTypeArea {
  display: flex;
}

.functionArea {
  display: flex;
  justify-content: space-between;
}
.btnArea {
  display: flex;
  justify-content: space-between;
}

.samebtncss {
  display: inline-block;
}
</style>
