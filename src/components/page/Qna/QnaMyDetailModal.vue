<template>
  <ContextBox>Qna등록</ContextBox>
  <!-- 질문등록  모달이랑 유사하나 조건문으로 도배되니 그냥 따로 하다 더 만들자. -->
  <!-- 주의: 단 작성자만 삭제, 수정 , 버튼이 있음도 주의한다. -->
  <div class="modalWrapper">
    <div v-if="QnaDetail != undefined">
      <label>제목 :<input type="text" v-model="QnaDetail.title" /> </label>

      <label>
        <!-- <input type="hidden" v-model="" /> -->
        내용 :
        <input type="text" v-model="QnaDetail.content" />
      </label>
      파일 :<input
        type="file"
        style="display: none"
        id="fileInput"
        @change="fileChange"
      />
      <label class="img-label" htmlFor="fileInput"> 파일 첨부하기 </label>
      <label> 미리보기 </label>
      <img
        :src="imageURL || QnaDetail.logicalPath"
        v-if="imageURL || QnaDetail.logicalPath"
        alt="image preview"
      />
      <label>파일명: {{ fileName || QnaDetail.fileName }}</label>
      <div>
        <label>
          비밀번호입력 :
          <input type="password" v-model="QnaDetail.password" />
        </label>
        <label v-if="type == 'M'">
          답변하기 :
          <input type="ans_content" v-model="QnaDetail.ans_content" />
        </label>

        <label v-if="type != 'M' && QnaDetail.ans_conten != ''">
          <span class="ans_content"> 질문에대한 관리자님의 답변입니다. : </span>
          <input
            type="text"
            v-model="QnaDetail.ans_content"
            :disabled="type != 'M'"
          />
        </label>
      </div>
      <div class="updateDeleteArea">
        <div
          class="myArea"
          v-if="
            userInfo.user.loginId == QnaDetail.author ||
            userInfo.user.userType === 'M'
          "
        >
          <b-button variant="primary" class="update" @click="myQnaUpdate">
            {{ type == "M" ? "답변하기" : "수정하기" }}
          </b-button>
          <b-button
            variant="danger"
            class="delete"
            @click="handlerDeleteBtn(QnaDetail.qnaIdx)"
          >
            삭제
          </b-button>
        </div>
        <b-button variant="secondary" class="goback" @click="$router.go(-1)">
          뒤로가기
        </b-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref } from "vue";
import { useRoute } from "vue-router";
import { useMyQnaDeleteMutation } from "../../../hook/qna/useMyQnaDeleteMutation";
import { useQnaMyUpdateMutation } from "../../../hook/qna/useQnaMyUpdateMutation";
import { useUserInfo } from "../../../stores/userInfo";

const type = useUserInfo().user.userType;
const props = defineProps({
  myQnaDetail: {
    type: Object,
    required: true,
  },
});

const { params } = useRoute();
const qnaIdx = params.qnaIdx;
const imageURL = ref("");
const fileInfo = ref(null);
const fileData = ref("");
const userInfo = useUserInfo();
const QnaDetail = ref({});
const fileName = ref("");

QnaDetail.value = { ...props.myQnaDetail };

const handlerDeleteBtn = (qnaIdx) => {
  myQnaDelete(qnaIdx);
};

const fileChange = (e) => {
  fileInfo.value = e.target.files;
  fileName.value = fileInfo.value[0].name;
  const fileInfoSplit = fileInfo.value[0].name.split(".");
  const fileExtension = fileInfoSplit[1].toLowerCase();

  if (
    fileExtension === "jpg" ||
    fileExtension === "gif" ||
    fileExtension === "png" ||
    fileExtension === "webp"
  ) {
    fileData.value = fileInfo.value[0];
    imageURL.value = URL.createObjectURL(fileInfo.value[0]);
  }
};

const { mutate: myQnaUpdate } = useQnaMyUpdateMutation(
  fileData,
  userInfo,
  QnaDetail
);
const { mutate: myQnaDelete } = useMyQnaDeleteMutation(qnaIdx);
</script>

<style lang="scss" scoped>
.backdrop {
  top: 0%;
  left: 0%;
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  flex-flow: row wrep;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
  font-weight: bold;
}

.modalWrapper {
  background: #ccc;
}

label {
  display: flex;
  flex-direction: column;
}

input[type="text"] {
  padding: 8px;
  margin-top: 5px;
  margin-bottom: 5px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.container {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
  position: relative;
  width: 400px;
}

img {
  width: 100px;
  height: 100px;
}

.img-label {
  margin-top: 10px;
  padding: 6px 25px;
  background-color: #ccc;
  border-radius: 4px;
  color: rgba(0, 0, 0, 0.9);
  cursor: pointer;

  &:hover {
    background-color: #45a049;
    color: white;
  }

  &:active {
    background-color: #3e8e41;
    box-shadow: 0 2px #666;
    transform: translateY(2px);
  }
}

.updateDeleteArea {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.myArea {
  display: flex;
}

.update {
  background-color: rgba(106, 130, 236, 0.8);
  color: #fff;
  text-align: center;
  // border-radius: 5px;
  // width: 100%;
  /* height: 80%; */
  font-size: 16px;
  font-weight: bold;
  // line-height: 56px;
  // border-radius: 10px;
}

.delete {
  background-color: #ff5862;
  color: #fff;
  text-align: center;
  // border-radius: 5px;
  // width: 100%;
  // height: 80%;
  font-size: 16px;
  font-weight: bold;
  // line-height: 56px;
  // border-radius: 10px;
}

.goback {
  background-color: rgba(106, 130, 236, 0.8);
  color: #fff;
  font-size: 16px;
  font-weight: bold;
}

button {
  background-color: #3bb2ea;
  border: none;
  color: white;
  padding: 10px 22px;
  text-align: right;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 12px;
  box-shadow: 0 4px #999;
  transition: 0.3s;

  &:hover {
    background-color: #45a049;
  }

  &:active {
    background-color: #3e8e41;
    box-shadow: 0 2px #666;
    transform: translateY(2px);
  }
}

.ans_content {
  display: inline-block;
  text-align: center;
  width: 40%;
  background-color: #ff5862;
  color: white;
  font-size: 16px;
  font-weight: 600;
  border-radius: 20px 20px 20px 20px;
}
</style>
