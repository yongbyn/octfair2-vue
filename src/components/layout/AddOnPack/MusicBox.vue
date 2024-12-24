<template>
  <iframe
    :src="playUrl"
    allow="autoplay; encrypted-media"
    allowfullscreen
    :style="{
      width: props.width + 'px',
      height: (props.width * 9) / 16 + 'px',
    }"
  />
</template>

<script setup>
const props = defineProps(["url", "width"]);
const musicUrl = props.url;
const pattern =
  /(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/;
const videoId = musicUrl.match(pattern)?.[4] || "";
const embedUrl = `https://www.youtube.com/embed/${videoId}`;
const playUrl = ref(embedUrl + "?start=12&autoplay=1&mute=0");
</script>

<style scoped></style>
