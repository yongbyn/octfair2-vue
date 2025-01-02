<template>
  <ul class="dashboard-ul">
    <li>
      <button @click="isShowMenu = !isShowMenu" />
    </li>
    <li class="menu-bar" v-show="isShowMenu">
      <LeftManuBar></LeftManuBar>
    </li>
    <li class="content">
      <keep-alive><router-view></router-view></keep-alive>
    </li>
  </ul>
</template>

<script setup>
import LeftManuBar from "../../components/layout/LeftManuBar.vue";

const isShowMenu = ref("false");
</script>

<style scoped>
.dashboard-ul {
  list-style-type: none;
  display: flex;
  overflow: hidden;
}

.button {
  display: none;
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

@media (max-width: 900px) {
  .dashboard-ul {
    flex-direction: column;
  }

  .button {
    display: block;
  }

  .menu-bar {
    float: inline-start;
    opacity: 0.6;
  }

  .content {
    padding: 25px;
    width: 100%;
  }
}
</style>
