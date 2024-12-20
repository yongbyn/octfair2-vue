<template>
  <div class="searchwriteWrapper">
    <div class="userTypeArea">
      <div v-if="userType != 'M'">유저</div>
      <div v-else>관리자</div>
    </div>

    <div class="functionArea">
      <div v-if="userType === 'M'">관리자는 나중에 여기서 날자</div>

      <div class="btnArea">
        <div v-if="userType != 'M'">
          <button class="samebtncss">내가쓴글</button>
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
import axios from "axios";
import { useUserInfo } from "../../../stores/userInfo";
import { useModalStore } from "../../../stores/modalState";
import router from "../../../router";

const userType = ref();

onMounted(() => {
  const Type = useUserInfo().user.userType;
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
