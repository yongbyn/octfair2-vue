<!-- AddOn컴포넌트에서 설정된 폴더(@/assets/backgrounds) 내 이미지를 배경화면으로 깔아주는 코드 -->
<template>
  <div class="skin-container" :style="{ backgroundImage: backgroundImage }" />
</template>

<script setup>
const props = defineProps(["url"]);
const backgroundImage = computed(() => {
  const changeAtToAbs = props.url.replace(/^@/, "/src"); // '@/assets'방식 별칭경로 -> '/src/assets'방식 절대경로
  const changeRelToAbs = new URL(changeAtToAbs, import.meta.url).href; // ''../../../assets'방식 상대경로 -> '/src/assets'방식 절대경로
  return `url(${changeRelToAbs})`;
});
</script>

<style>
.skin-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -2;
  overflow: hidden;
  background: #001a33; /* 어두운 배경 */
  background-size: cover;
}
</style>
