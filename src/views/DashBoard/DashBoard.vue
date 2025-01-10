<template>
  <ul class="dashboard-ul" @click="isBtnClicked = false">
    <li class="menu-bar">
      <div class="margin-left-20">
        <button @click.stop="isBtnClicked = !isBtnClicked"></button>
        <img
          :src="happyjobLogo"
          @click="$router.push('/vue')"
          class="happyjoblogo"
        />
      </div>
      <transition name="dropdown">
        <div
          v-show="!isMobile || isBtnClicked"
          @clickPageLink="isBtnClicked = false"
          class="leftmenu"
        >
          <LeftManuBar />
        </div>
      </transition>
      <AddOn
        :addonShow="!isMobile || (!isBtnClicked && $route.path == '/vue')"
        class="add-on"
      />
    </li>
    <li v-show="!isMobile || !isBtnClicked" class="content">
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
    isBtnClicked.value = false;
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
  margin-top: 20px;
}

.menu-bar {
  float: left;
}

.leftmenu {
  margin-left: 20px;
}

.happyjoblogo {
  width: 250px;
  cursor: pointer;
}

.content {
  float: left;
  padding-left: 2%;
  padding-right: 2%;
  width: 77%;
  flex: 1;
  transition: 1s;
}

.margin-left-20 {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  margin-left: 20px;

  @media (max-width: 900px) {
    justify-content: center;
    align-items: center;
  }
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
    display: flex; /* 숨김해제 */

    &:active {
      background-color: goldenrod;
      transform: scale(1.4);
    }
  }

  /* 시작상태, 아래 trasition애니메이션이 시작하기 전 상태를 의미 */
  .leftmenu.dropdown-enter-active {
    opacity: 0.1;
    transform: translateY(-100px);
  }

  /* 애니메이션상태, 애니메이션과 도달목표상태를 의미, but 도달목표달성 후 유지상태는 아래 기본상태가 된다. */
  .leftmenu.dropdown-enter-to {
    opacity: 1;
    transform: translateY(0px);
    transition:
      transform 0.5s ease,
      opacity 1s ease;
  }

  /* 기본상태, 위 transition애니메이션이 끝나고 유지되는 상태를 의미 */
  .leftmenu {
    opacity: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .content {
    padding: 25px;
    width: 100%;
  }
}
</style>
