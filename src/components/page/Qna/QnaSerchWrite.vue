<template>
  <ContextBox>QNA{{ type == "M" ? "관리자" : "" }}</ContextBox>
  <div class="searchwriteWrapper">
    <div class="userTypeArea">
      <div :style="getUserTypeStyle(userType, 'A')" @click="typeCahnge('A')">
        개인회원
      </div>
      <div :style="getUserTypeStyle(userType, 'B')" @click="typeCahnge('B')">
        기업회원
      </div>
    </div>

    <div class="functionArea">
      <div v-if="type === 'M'" class="search-box">
        <input v-model="searchKey.searchTitle" />
        <input type="date" v-model="searchKey.searchStartDate" />
        <input type="date" v-model="searchKey.searchEndDate" />

        <button class="samebtncss" @click="handlerSearch">검색</button>
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

const userType = inject("providedChangeType");
//편의상 로그인 된 유저의 타입을 기본값으로 하자.
//그걸 기반으로 위 태그의 생상과, 게시글을 타입으로 불러오도록
const type = useUserInfo().user.userType;
userType.value = type;
const chageType = ref("");

const searchKey = ref({});

const providedQnaValue = inject("providedQnaValue");

const handlerSearch = () => {
  providedQnaValue.value = { ...searchKey.value };
};

const myQnaList = () => {
  searchKey.value.requestType = "my";
  providedQnaValue.value = { ...searchKey.value };
};

const questionModal = () => {
  router.push("qnaInsert.do/insert");
};
const getUserTypeStyle = (type, meseeage) => {
  return {
    backgroundColor: type === meseeage ? "blue" : "transparent",
    color: "white",
    padding: "10px",
  };
};

const typeCahnge = (message) => {
  userType.value = type;
  if (type != message) {
    userType.value = message;
  }
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
  background-color: #34aadc;
  color: white;
  font-weight: 600;
  border: none;
  padding: 20px 20px;
}
</style>
