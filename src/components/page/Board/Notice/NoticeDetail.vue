<template>
  <div>
    <ContextBox>공지사항</ContextBox>
  </div>
  <label> 제목 :<input type="text" v-model="detailValue.title" /> </label>
  <label>
    내용 :
    <input type="text" v-model="detailValue.content" />
  </label>
  <div v-if="userType === 'M'">
    파일 :<input
      type="file"
      style="display: none"
      id="fileInput"
      @change="handlerFile"
    />
    <label class="img-label" htmlFor="fileInput"> 파일 첨부하기 </label>
  </div>
  <div v-if="imageUrl">
    <label style="margin-top: 5px">파일명:</label>
    <label style="border: 2px solid grey; margin-top: 5px; margin-bottom: 5px">
<<<<<<< HEAD
      {{ fileData.name || detailValue.fileName }}</label
    >
=======
      {{ fileData.name || detailValue.fileName }}</label>
>>>>>>> 318471cf2f9b3920a387480e1d24b91fe9de085a
    <!-- <input type="text" :value="" readonly /> -->
    <label label style="margin-top: 5px">미리보기:</label>
    <img :src="imageUrl" />
  </div>
  <div v-else>
    파일명:
    <label style="border: 1px solid black; margin-top: 5px; margin-bottom: 5px">
      {{ fileData.name || detailValue.fileName }}</label>
  </div>

  <div class="button-box" v-if="userType === 'M'">
    <button @click="actionHandler">
      {{ actionLabel }}
    </button>
    <button v-if="detailValue.noticeIdx" @click="handleDelete">삭제</button>
    <button @click="$router.go(-1)">뒤로가기</button>
  </div>
</template>

<script setup>
import { computed, onActivated, ref, watchEffect } from "vue";
import { useRoute } from "vue-router";
import { noticeImageGetApi } from "../../../../api/notice/noticeImageGetApi";
import { useNoticeDelete } from "../../../../hook/notice/useNoticeDelete";
import { useNoticeDetail } from "../../../../hook/notice/useNoticeDetail";
import { useNoticeDetailUpdateMutation } from "../../../../hook/notice/useNoticeDetailUpdateMutation";
import { useNoticeImage } from "../../../../hook/notice/useNoticeImage";
import { useNoticeInsert } from "../../../../hook/notice/useNoticeInsert";
import { useUserInfo } from "../../../../stores/userInfo";
const userInfo = useUserInfo();
const userType = computed(() => userInfo.user.userType);
const { params } = useRoute();
const detailValue = ref({});
const imageUrl = ref("");
const fileData = ref("");
const route = useRoute();
const noticeIdx = ref("");

const {
  data: NoticeDetail,
  refetch,
  isSuccess,
} = useNoticeDetail(detailValue, noticeIdx, fileData);

const { mutate: handlerUpdateBtn } = useNoticeDetailUpdateMutation(
  detailValue,
  noticeIdx,
  fileData
);

const { mutate: handlerInsertBtn } = useNoticeInsert(
  detailValue,
  noticeIdx,
  fileData
);

const { mutate: handlerFile } = useNoticeImage(
  detailValue,
  noticeIdx,
  fileData,
  imageUrl
);

const { mutate: handlerDeleteBtn } = useNoticeDelete(noticeIdx);

watchEffect(() => {
  if (isSuccess.value && NoticeDetail.value && noticeIdx) {
    detailValue.value = { ...NoticeDetail.value.detail };
    if (["jpg", "gif", "png", "webp"].includes(detailValue.value.fileExt)) {
      noticeImageGetApi(imageUrl, noticeIdx); // Blob방식URL: logicalPath와 달리 클라이언트에 미리 다운시킨 캐시이미지를 보게되는 방식
      // imageUrl.value = '/api'+noticeDetail.value.detail.logicalPath;
    }
  }
});

const actionLabel = computed(() =>
  noticeIdx.value === "insert" ? "등록" : "수정"
);

const validateInputs = () => {
  if (!detailValue.value.title) {
    alert("제목을 입력해주세요.");
    return false;
  }
  if (!detailValue.value.content) {
    alert("내용을 입력해주세요.");
    return false;
  }
  return true;
};

const actionHandler = () => {
  if (!validateInputs()) return;

  if (noticeIdx.value === "insert") {
    if (confirm("등록하시겠습니까?")) {
      handlerInsertBtn();
    }
  } else {
    if (confirm("수정하시겠습니까?")) {
      handlerUpdateBtn();
    }
  }
};

const handleDelete = () => {
  if (confirm("삭제하시겠습니까?")) {
    handlerDeleteBtn();
  }
};

//신규등록 버튼을 눌렀을때
onActivated(() => {
  let pathSegments = window.location.pathname.split("/"); // URL을 '/'로 분리
  noticeIdx.value = pathSegments[pathSegments.length - 1]; // 맨 끝 값 추출
  if (noticeIdx.value === "insert") {
    detailValue.value.title = "";
    detailValue.value.content = "";
    fileData.value = "";
    imageUrl.value = "";
  }
});
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
  margin-top: 10px;
  width: 200px;
  height: 200px;
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

.button-box {
  text-align: right;
  margin-top: 10px;
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
</style>
