<!-- AddOn컴포넌트에서 설정된 YouTube주소를 틀어주는 코드 -->
<template>
  <iframe
    :src="playUrl"
    allow="autoplay; encrypted-media"
    allowfullscreen
    :style="{ width: props.width, aspectRatio: '1.7' }"
  />
</template>

<script setup>
const props = defineProps(["url", "width"]);
const pattern =
  /(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/;
const playUrl = computed(() => {
  const videoId = props.url.match(pattern)?.[4] || "";
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;
  return `${embedUrl}?start=1&autoplay=1&mute=0`;
});
</script>

<style scoped></style>
