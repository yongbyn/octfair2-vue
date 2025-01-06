<template>
  <div :style="{ width: props.width }">
    <img
      v-if="imageUrl === 'loading'"
      src="../../../assets/loading_circle.gif"
      alt="로딩 이미지"
      class="styled-image"
    />
    <img
      v-else-if="imageUrl === 'error'"
      src="../../../assets/noImage.jpg"
      alt="빈 이미지"
      class="styled-image"
    />
    <img v-else :src="imageUrl" alt="오늘의 메뉴" class="styled-image" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const props = defineProps(["url", "width"]);
const imageUrl = ref("loading");

onMounted(async () => {
  const proxyURL = "/vue";
  const apiURL = "/dashboard/menu.do";
  const menuURL = props.url;
  const queryParam = `?menuURL=${menuURL}`;

  try {
    const response = await axios.get(`${proxyURL}${apiURL}${queryParam}`);
    imageUrl.value = `${proxyURL}${response.data.imageUrl}`;
  } catch (error) {
    imageUrl.value = "error";
  }
});
</script>

<style scoped>
.styled-image {
  max-width: 100%;
  height: auto;
  border-radius: 10px;
  border: 3px solid #d4af37;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  object-fit: cover;
}
</style>
