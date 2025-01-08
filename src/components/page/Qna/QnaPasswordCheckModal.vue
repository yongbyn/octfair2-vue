<template>

    <!-- {{ checkSuccess }} -->
    <template v-if="type=='M' && isSuccess">
        <QnaMyDetailModal :myQnaDetail="myQnaDetail "/>
    </template>
  <template v-else-if="!checkSuccess">
    <div class="passwordCheckWrapper">
      <div class="checkArea">
        <h1>비밀번호확인</h1>
        <input v-model="checkpwd" />{{ checkpwd }}
        <div class="btnArea">
          <div class="confrim" @click="checkPwdFnc">확인</div>
          <div class="discard" @click="discardFnc">취소</div>
        </div>
      </div>
    </div>
  </template>
  <template v-else>
<h1>옛다 비번 성공</h1>
<QnaMyDetailModal :myQnaDetail="myQnaDetail "/>

  </template>
</template>
<script setup>
import { onBeforeRouteLeave } from "vue-router";
import { useRoute,useRouter } from "vue-router";
import { MyQnaSearchDetailQuery } from "../../../hook/qna/MyQnaSearchDetailQuery";
import { useUserInfo } from "../../../stores/userInfo";
const type = useUserInfo().user.userType;
const { params } = useRoute();
const router=useRouter();
const checkpwd = ref("");
const checkSuccess = ref(false);

const { data: myQnaDetail, isSuccess } = MyQnaSearchDetailQuery(params.qnaIdx);



const checkPwdFnc=()=>{
  
    console.log(myQnaDetail.value.password)
    console.log(checkpwd.value)

if(checkpwd.value===myQnaDetail.value.password){
    checkSuccess.value=true;
}
else{
    alert("비밀번호가 틀렸습니다.")
}

}

const discardFnc=()=>{
    router.go(-1)
}



   // 
   onBeforeRouteLeave(() => {
    checkSuccess.value = false; 
    checkpwd.value=null;
      sessionStorage.removeItem('checkSuccess'); 
      sessionStorage.removeItem('checkpwd');
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
