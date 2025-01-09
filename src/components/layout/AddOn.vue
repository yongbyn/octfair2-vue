<!-- 점심메뉴/배경음악/배경화면/눈내림 의 설정을 하고 On/Off토글로 켜고끄고 할 수 있는 코드 -->
<template>
  <div class="margin-left-20">
    <div
      v-show="props.addonShow"
      :style="{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 75px)',
        gap: '10px',
        width: width,
      }"
      class="wrapper"
    >
      <template v-for="(item, key) in items" :key="key">
        <CommonOnOff
          :isActive="item.isActive"
          @changeActive="item.onChangeActive()"
          >{{ item.name }}
        </CommonOnOff>
      </template>
    </div>
    <SnowAni v-if="items.snow.isActive" :snowConfig="snowConfig" />
    <SkinImage v-if="items.skin.isActive" :url="skinUrl" />
    <MusicBox
      v-if="items.music.isActive"
      v-show="props.addonShow"
      :url="musicUrl"
      :width="width"
      class="wrapper"
    />
    <LunchMenu
      v-show="items.lunch.isActive && props.addonShow"
      :url="lunchUrl"
      :width="width"
      class="wrapper"
    />
  </div>
</template>

<script setup>
import { reactive, watch } from "vue";
import CommonOnOff from "../common/CommonOnOff.vue";
import LunchMenu from "./AddOnPack/LunchMenu.vue";
import MusicBox from "./AddOnPack/MusicBox.vue";
import SkinImage from "./AddOnPack/SkinImage.vue";
import SnowAni from "./AddOnPack/SnowAni.vue";

const props = defineProps(["addonShow"]);

const items = reactive({
  snow: {
    name: "눈",
    isActive: false,
    onChangeActive() {
      this.isActive = !this.isActive;
    },
  },
  skin: {
    name: "배경",
    isActive: false,
    onChangeActive() {
      this.isActive = !this.isActive;
    },
  },
  music: {
    name: "음악",
    isActive: false,
    onChangeActive() {
      this.isActive = !this.isActive;
    },
  },
  lunch: {
    name: "점심",
    isActive: true,
    onChangeActive() {
      this.isActive = !this.isActive;
    },
  },
});

const skinUrlListImport = Object.keys(
  import.meta.glob("@/assets/backgrounds/*.{jpg,jpeg,png,bmp,webp,gif}") // backgrounds폴더의 이미지들 자동 import (단 이 방식은 Vite에서만 되고 WebPack에선 다른문법으로 해야함)
);
const skinUrlList = [
  ...skinUrlListImport,
  ...Array(4).fill("@/assets/backgrounds/christmas.gif"), // Array().fill: 해당함목 뽑힐 확률 n배 증가
];
const skinUrl = ref(skinUrlList[0]);
const musicUrlList = [
  "https://www.youtube.com/watch?v=tEm9EyEPMYM",
  "https://www.youtube.com/watch?v=a_80o2lDYec",
  "https://www.youtube.com/watch?v=EvWo0xDpQGU",
  "https://www.youtube.com/watch?v=6o_6PmjkoCM",
];
const musicUrl = ref(musicUrlList[0]);
const lunchUrl = ref("https://pf.kakao.com/_QLvRn"); // 이츠푸드='https://pf.kakao.com/_QLvRn', 벽산더이룸푸드='https://pf.kakao.com/_xdLzxgG'
const width = ref("clamp(50px, 250px, 280px)");
const snowConfig = ref({
  numSnow: 100,
  minRadius: 1,
  maxRadius: 4,
  minSpeed: 5,
  maxSpeed: 10,
});

watch(
  () => [items.skin.isActive],
  () => {
    const skinRandomIndex = Math.floor(Math.random() * skinUrlList.length);
    skinUrl.value = skinUrlList[skinRandomIndex];
  }
);

watch(
  () => [items.music.isActive],
  () => {
    const musicRandomIndex = Math.floor(Math.random() * musicUrlList.length);
    musicUrl.value = musicUrlList[musicRandomIndex];
  }
);
</script>

<style scoped>
.margin-left-20 {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin-left: 20px;
  width: 300px;

  @media (max-width: 900px) {
    justify-content: center;
    align-items: center;
    margin-left: 0px;
    width: auto;
  }
}

.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-top: 20px;
  padding: 5px;
  max-width: 100%;
  background-color: #f4f0e1;
  border: 5px solid #5ea3eee0;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  font-family: "Arial", sans-serif;
}
</style>
