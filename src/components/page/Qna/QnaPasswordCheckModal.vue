<template>
  <template v-if="type == 'M'">
    <!-- <h1></h1>
    <QnaMyDetailModal :myQnaDetail="myQnaDetail" /> -->
    <template v-if="myQnaDetail">
      <QnaMyDetailModal :myQnaDetail="myQnaDetail" />
    </template>
    <template v-else>
      <div>로딩 중...</div>
    </template>
  </template>
  <template v-else-if="type != 'M' && !checkSuccess">
    <div class="passwordCheckWrapper">
      <div class="checkArea">
        <h1>비밀번호확인</h1>
        <input type="password" v-model="checkpwd" />
        <div class="btnArea">
          <div class="confrim" @click="checkPwdFnc">확인</div>
          <div class="discard" @click="$router.go(-1)">취소</div>
        </div>
      </div>
    </div>
  </template>
  <template v-else>
    <h1>옛다 비번 성공</h1>
    <QnaMyDetailModal :myQnaDetail="myQnaDetail" />
  </template>
</template>
<script setup>
import { toast } from "@/common/toastMessage";
import axios from "axios";
import { useRoute } from "vue-router";
import { Notice } from "../../../api/api";
import { useUserInfo } from "../../../stores/userInfo";
const type = useUserInfo().user.userType;
const route = useRoute();
const checkpwd = ref("");
const checkSuccess = ref(false);
const myQnaDetail = ref();

const searchDetail = async () => {
  await axios
    .post(Notice.SearchMyQnaDetail, { qnaSeq: route.params.qnaIdx })
    .then((res) => {
      myQnaDetail.value = res.data.detail;
    });
};

// const {
//   data: myQnaDetail,
//   isSuccess,
//   refetch,

const checkPwdFnc = () => {
  if (checkpwd.value === myQnaDetail.value.password) {
    checkSuccess.value = true;
  } else {
    toast.warning("비밀번호가 틀렸습니다.");
  }
};

onActivated(() => {
  checkpwd.value = "";
  checkSuccess.value = false;
  myQnaDetail.value = null;
  searchDetail(); // 새 데이터 로드
});
</script>
<style>
.passwordCheckWrapper {
  height: 100vh;
  width: 720px;
  max-width: 960px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 100px;
  padding-left: 100px;
}

.checkArea {
  width: 70%;
  padding: 20px 20px;
  display: flex;
  flex-direction: column;
}

.btnArea {
  display: flex;
}

.btnArea > .confrim {
  width: 30%;
  background-color: #2189ff;
  color: #fff;
  margin: 0px 0px;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  line-height: 56px;
  border-radius: 10px;
}
.btnArea > .discard {
  background-color: #ff5862;
  color: #fff;
  text-align: center;
  border-radius: 5px;
  width: 30%;

  font-size: 16px;
  font-weight: bold;
  line-height: 56px;
}
</style>
