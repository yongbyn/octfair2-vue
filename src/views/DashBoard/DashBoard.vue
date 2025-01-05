<template>
  <ul class="dashboard-ul" @click="isBtnClicked = false">
    <li class="menu-bar">
      <div class="align-center">
        <button @click.stop="isBtnClicked = !isBtnClicked"></button>
        <img :src="happyjobLogo" @click="$router.push('/vue')" />
      </div>
      <LeftManuBar
        v-if="!isMobile || isBtnClicked"
        @clickPageLink="isBtnClicked = false"
      />
      <AddOn
        class="add-on"
        :addonShow="!isMobile || (!isBtnClicked && $route.path == '/vue')"
      />
    </li>
    <li class="content" v-show="!isMobile || !isBtnClicked">
      <!-- <keep-alive><router-view></router-view></keep-alive> -->
      <!-- 위 방식은  Vue Router v4 이상에서 <router-view>를 <transition> 또는 <keep-alive> 안에 직접 사용하는 것이 더 이상 지원되지 않아 아래와 같이 수정 -->
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </li>
  </ul>
</template>

<script setup>
import happyjobLogo from "../../assets/utilcons/logo.png";
import LeftManuBar from "../../components/layout/LeftManuBar.vue";
import { useModalStore } from "../../stores/modalState";

let previousWidth = window.innerWidth; // 이전 창 너비를 저장
let currentWidth = 0; // 현재 창 너비를 저장할 예정
const isMobile = ref(false);
const isBtnClicked = ref(false);
const modalStore = useModalStore();

// 창 크기에따라 숨김상태로 시작할지를, 즉 isMobile 정하는 함수
const updateMenuVisibility = () => {
  currentWidth = window.innerWidth;
  if (previousWidth < 900 && currentWidth >= 900) {
    // 900px 이상으로 커질때
    isMobile.value = false;
    isBtnClicked.value = false;
  } else if (previousWidth >= 900 && currentWidth < 900) {
    // 900px 이하로 작아질때
    isMobile.value = true;
    isBtnClicked.value = true;
  }
  previousWidth = currentWidth;
};

// 대부분의 페이지와 함께 랜더링되는 DashBoard 여기에 작성되는 이벤트들은, 즉 일괄적용 효과
const handlerKeyEvent = (event) => {
  if (event.key === "Escape") modalStore.modalState = false; // ESC 누를시 모달닫기 작동
};

onMounted(() => {
  if (window.innerWidth < 900) isMobile.value = true;
  window.addEventListener("resize", updateMenuVisibility); // 리사이즈 이벤트 추가
  document.addEventListener("keyup", handlerKeyEvent); // 키보드 이벤트 추가
});

onUnmounted(() => {
  window.removeEventListener("resize", updateMenuVisibility); // 이벤트 제거
  document.removeEventListener("keyup", handlerKeyEvent); // 키보드 이벤트 제거
});
</script>

<style scoped>
.dashboard-ul {
  list-style-type: none;
  display: flex;
  overflow: hidden;
}

.menu-bar {
  float: left;
}

.content {
  float: left;
  padding-left: 2%;
  padding-right: 2%;
  width: 77%;
  flex: 1;
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
  margin-right: 3px;
  margin-bottom: 10px;
  background-color: transparent; /* 투명배경, 즉 배경을 부모배경으로 */
  background-image: url("@/assets/utilcons/menu.png");
  background-size: cover;
  background-position: center;
  border: none;
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
