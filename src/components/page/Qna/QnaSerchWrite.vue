<template>
  <div class="searchwriteWrapper">
    <div class="userTypeArea">
      <div v-if="type != 'M'">유저</div>
      <div v-else>관리자</div>
    </div>

    <div class="functionArea">
      <div v-if="type === 'M'" class="search-box">
        <input v-model="searchKey.searchTitle" />
        <input type="date" v-model="searchKey.searchStartDate" />
        <input type="date" v-model="searchKey.searchEndDate" />

        <button @click="handlerSearch">검색</button>
        <button class="samebtncss" @click="questionModal">질문등록</button>
      </div>
      <div v-else>
        <button class="samebtncss" @click="myQnaList">내가쓴글</button>
        <button class="samebtncss" @click="questionModal">질문등록</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import router from "../../../router";
import { useUserInfo } from "../../../stores/userInfo";

const userType = ref();
const type = useUserInfo().user.userType;

const searchKey = ref({});

const providedQnaValue = inject("providedQnaValue");

const handlerSearch = () => {
  providedQnaValue.value = { ...searchKey.value };
};

const myQnaList = () => {
  searchKey.value.requestType = "my";
  providedQnaValue.value = { ...searchKey.value };
};

// onMounted(() => {
//   const Type = useUserInfo().user.userType;
//   console.log(Type);
//   userType.value = Type;
//   console.log(userType);
// });

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
