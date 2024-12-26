<template>
  <div>
    <div v-if="isLoading">기다려주세요</div>
    <div v-else>
      <ContextBox>FAQ</ContextBox>
      <table>
        <tr>
          <th>제목</th>
          <td v-model="detailValue.title"></td>
        </tr>
        <tr>
          <th>작성자</th>
          <td v-model="detailValue.author"></td>
        </tr>
        <tr>
          <th>작성일</th>
          <td v-model="detailValue.created_date"></td>
        </tr>
        <tr>
          <th>내용</th>
          <td v-model="detailValue.content"></td>
        </tr>
      </table>

      <div class="button-box">
        <button
          @click="params.faq_idx ? handlerUpdateBtn() : handlerInsertBtn()"
        >
          {{ params.faq_idx ? "수정" : "등록" }}
        </button>
        <button v-if="params.faq_idx" @click="handlerDeleteBtn">삭제</button>
        <button @click="$router.go(-1)">뒤로가기</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { useRoute } from "vue-router";
import { useUserInfo } from "../../../../stores/userInfo";
import { useFAQDetailDelete } from "../../../hook/faq/useFAQDetailDelete";
import { useFAQDetailInsert } from "../../../hook/faq/useFAQDetailInsert";
import { useFAQDetailSearch } from "../../../hook/faq/useFAQDetailSearch";
import { useFAQDetailUpdate } from "../../../hook/faq/useFAQDetailUpdate";

const { params } = useRoute();
const detailValue = ref({});
const userInfo = useUserInfo();

const { data: FAQDetail, isLoading, isSuccess } = useFAQDetailSearch(params);

watchEffect(() => {
  if (isSuccess.value && FAQDetail.value) {
    detailValue.value = toRaw(FAQDetail.value.detail);
    // detailValue.value = {... noticeDetail.value.detail}; // 이거도 가능
  }
});

const { mutate: handlerUpdateBtn } = useFAQDetailUpdate(
  detailValue,
  params.faq_idx
);

const { mutate: handlerInsertBtn } = useFAQDetailInsert(
  detailValue,
  userInfo.user.loginId
);

const deleteFAQDetail = async () => {
  await axios.post("/api/board/faqDeleteBody.do", { faqSeq: params.faq_idx });
};

const { mutate: handlerDeleteBtn } = useFAQDetailDelete(params);
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
