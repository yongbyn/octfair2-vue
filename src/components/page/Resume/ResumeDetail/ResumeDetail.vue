<template>
  <div>
    <ContextBox>이력서 수정/작성</ContextBox>
    <div className="container">
      <div className="detailHeader">
        <label>
          <input
            id="resumeTitle"
            type="text"
            placeholder="이력서 제목"
            v-model="detailValue"
          />
          <div id="userName">이름</div>
          <div id="userEmail">메일</div>
          <div id="userPhone">번호</div>
        </label>
      </div>

      <div className="detailBody">
        <div className="detailBodyHeader">간단 소개글</div>
        <div></div>
      </div>
    </div>
  </div>
</template>

<script setup>
const detailValue = ref({});
</script>

<style></style>
