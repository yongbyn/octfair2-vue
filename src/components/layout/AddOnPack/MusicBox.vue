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
