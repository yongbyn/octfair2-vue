<template>
  <div>
    <ContextBox>FAQ 등록</ContextBox>
  </div>
  <div class="board-detail">
    <div class="board-contents">
      <table>
        <tr>
          <td>유형</td>
          <td>
           
            <input
              type="radio"
              id="individual"
              value="1"
              v-model="detailValue.faq_type"
            />
            <label for="individual">개인회원</label>
          </td>
          <td>
          
            <input
              type="radio"
              id="company"
              value="2"
              v-model="detailValue.faq_type"
            />
            <label for="company">기업회원</label>
          </td>
        </tr>
        <tr>
          <td>제목</td>
          <td>
            <input type="text" v-model="detailValue.title" />
          </td>
        </tr>
        <tr>
          <td>내용</td>
          <td>
            <input type="text" v-model="detailValue.content" />
          </td>
        </tr>
      </table>
      <div>
        <button @click="actionHandler">
          {{ actionLabel }}
        </button>
        <button v-if="params.faq_idx" @click="handleDelete">삭제</button>
        <button @click="$router.go(-1)">닫기</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { useFAQDetailDelete } from "../../../hook/faq/useFAQDetailDelete";
import { useFAQDetailInsert } from "../../../hook/faq/useFAQDetailInsert";
import { useFAQDetailSearch } from "../../../hook/faq/useFAQDetailSearch";
import { useFAQDetailUpdate } from "../../../hook/faq/useFAQDetailUpdate";
import { ref, computed, watchEffect } from "vue";
import { useUserInfo } from "../../../stores/userInfo";


const { params } = useRoute();


const detailValue = ref({
  faq_type: "", 
  title: "",
  content: "",
});


const userInfo = useUserInfo();


const { data: FAQDetail, isSuccess } = useFAQDetailSearch(params);


watchEffect(() => {
  if (isSuccess && FAQDetail.value) {
    detailValue.value = { ...FAQDetail.value.detail };
  }
});


const actionLabel = computed(() => (params.faq_idx ? "수정" : "등록"));


const validateInputs = () => {
  if (!detailValue.value.faq_type) {
    alert("회원유형을 선택해주세요.");
    return false;
  }
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


const { mutate: handlerUpdateBtn } = useFAQDetailUpdate(
  detailValue,
  params.faq_idx,
);


const { mutate: handlerInsertBtn } = useFAQDetailInsert(
  detailValue,
  
  userInfo.user.loginId
);


const { mutate: handlerDeleteBtn } = useFAQDetailDelete(params);


const actionHandler = () => {
  if (!validateInputs()) return;

  if (params.faq_idx) {
    if (confirm("수정하시겠습니까?")) {
      handlerUpdateBtn();
    }
  } else {
    if (confirm("등록하시겠습니까?")) {
    handlerInsertBtn();
  }
}
};

const handleDelete = () => {
  if (confirm("삭제하시겠습니까?")) {
    handlerDeleteBtn();
  }
};
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