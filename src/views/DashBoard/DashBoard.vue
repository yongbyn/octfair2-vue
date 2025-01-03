<template>
  <ul class="dashboard-ul">
    <li class="align-center">
      <button @click="isShow = !isShow"></button>
    </li>
    <li class="menu-bar">
      <LeftManuBar v-show="isShow" />
      <AddOn class="add-on" :isShow="isShow" />
    </li>
    <li class="content">
      <keep-alive><router-view></router-view></keep-alive>
    </li>
  </ul>
</template>

<script setup>
import LeftManuBar from "../../components/layout/LeftManuBar.vue";

const isShow = ref(true);
let previousWidth = window.innerWidth; // 이전 창 너비를 저장
let currentWidth = 0; // 현재 창 너비를 저장할 예정

const updateMenuVisibility = () => {
  currentWidth = window.innerWidth;

  if (currentWidth >= 900 && previousWidth < 900) isShow.value = true;
  else if (currentWidth < 900 && previousWidth >= 900) isShow.value = false;

  previousWidth = currentWidth;
};

onMounted(() => {
  updateMenuVisibility(); // 초기화
  window.addEventListener("resize", updateMenuVisibility); // 리사이즈 이벤트 추가
});

onUnmounted(() => {
  window.removeEventListener("resize", updateMenuVisibility); // 이벤트 제거
});
</script>

<style scoped>
.dashboard-ul {
  list-style-type: none;
  display: flex;
  overflow: hidden;
}

.align-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

button {
  display: none; /* 숨김 */
  width: 50px;
  height: 50px;
  margin-bottom: 10px;
  background-color: transparent; /* 투명배경, 즉 배경을 부모배경으로 */
  background-image: url("@/assets/menu.png");
  background-size: cover;
  background-position: center;
  border: none;
}

.menu-bar {
  float: left;
}

.content {
  float: left;
  padding-left: 50px;
  padding-right: 10%;
  width: 77%;
  flex: 1;
}

@media (max-width: 900px) {
  .dashboard-ul {
    flex-direction: column;
    margin: 5px;
    padding: 5px;
  }

  button {
    display: block; /* 숨김해제 */
  }

  .content {
    padding: 25px;
    width: 100%;
  }
}
</style>
