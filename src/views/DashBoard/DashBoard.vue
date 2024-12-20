<template>
  <ul class="dashboard-ul">
    <li class="menu-bar">
      <LeftManuBar></LeftManuBar>
    </li>
    <li class="content">
      <AddOn v-if="showAddOn"></AddOn>
      <keep-alive><router-view></router-view></keep-alive>
    </li>
  </ul>
</template>

<script setup>
import LeftManuBar from "../../components/layout/LeftManuBar.vue";
import { computed } from "vue";
import { useRoute } from "vue-router";
import AddOn from "@/components/layout/AddOn.vue";

const route = useRoute();

// AddOn을 /vue 경로에서만 렌더링
const showAddOn = computed(() => route.path === "/vue");
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
  padding-left: 50px;
  padding-right: 10%;
  width: 77%;
  flex: 1;
}
</style>
