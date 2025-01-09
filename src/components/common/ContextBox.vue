<template>
  <div class="context-box">
    <div class="context-slot">
      <!-- react의 children과 같은 역할 -->
      <slot></slot>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
// .context-box {
//   background-color: #e0e0e0;
//   padding: 10px 100% 10px 0px;
//   border: 1px solid #ccc;
//   box-sizing: border-box;
//   display: block;
// }

.context-box {
  // border: solid 1px black;
  margin: 20px 10px 30px 10px;
  font-size: 55px;
  font-weight: 1000;
  background-image: linear-gradient(120deg, #a7d6ffe1 40%, #add2f7d7 100%);
  background-repeat: no-repeat;
  background-size: 50% 30%;
  background-position: 0 88%;
  transition: background-size 0.8s;
  color: #000;
}

// .context-box {
//   margin: 20px 10px 30px 10px;
//   font-size: 55px;
//   font-weight: 1000;
//   background-image: linear-gradient(120deg, #87b5e0 0%, #ffffff 100%);
//   background-repeat: no-repeat;
//   background-size: 45% 35%;
//   background-position: 0 88%;
//   transition: background-size 0.25s ease-in;
//   &:hover {
//     background-size: 45% 88%;
//   }
// }

// .context-box {
//   background-color: #e0e0e0;
//   padding: 10px; /* 기존에 주석 처리된 값 수정 */
//   border: 1px solid #ccc;
//   box-sizing: border-box;
//   display: flex; /* 콘텐츠 정렬을 위한 flex 사용 */
//   align-items: center; /* 수직 중앙 정렬 */
//   justify-content: flex-start; /* 필요에 따라 변경 가능 */
// }

.context-slot {
  width: max-content;
  // font-size: 40px;
  margin-left: 10px;
  position: relative;
  z-index: 0px;
}
</style>
