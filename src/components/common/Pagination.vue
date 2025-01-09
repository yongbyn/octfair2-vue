<template>
  <VueAwesomePaginate
    :totalItems="totalItems"
    :items-per-page="itemsPerPage"
    :max-pages-shown="maxPagesShown"
    :onClick="onClick"
  ></VueAwesomePaginate>
</template>

<script setup>
import { VueAwesomePaginate } from "vue-awesome-paginate";
const { totalItems, itemsPerPage, maxPagesShown, onClick } = defineProps([
  "totalItems",
  "itemsPerPage",
  "maxPagesShown",
  "onClick",
  "cPage",
]);
</script>

<style lang="scss">
.pagination-container {
  display: flex;
  justify-content: center; // 하드코딩된 좌패딩 대신 가운데 정렬 설정
  column-gap: 10px;
  // padding-left: 35%; // 하드코딩된 좌패딩 제거
  padding-right: 32px; // 그럼에도 Pagination 내부의 건들 수 없는 좌패딩이 32px 남아서 부득이 우패딩 32px 설정
  padding-top: 30px;
  list-style-type: none;
}

.paginate-buttons {
  height: 40px;
  width: 40px;
  border-radius: 20px;
  cursor: pointer;
  background-color: white;
  border: 1px solid rgb(217, 217, 217);
  color: black;
}

.paginate-buttons:hover {
  background-color: #f3f3f3;
}

.active-page {
  background-color: #3498db;
  border: 1px solid #3498db;
  color: white;
}

.active-page:hover {
  background-color: #2988c8;
}
</style>
