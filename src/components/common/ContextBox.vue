<template>
  <div class="context-box">
    <div class="context-slot">
      <!-- react의 children과 같은 역할 -->
      <slot></slot>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.context-box {
  margin: 20px 10px 30px 10px;
  font-size: 55px;
  font-weight: 1000;
  background-image: linear-gradient(120deg, #99c7f0b9 40%, #add2f7d7 100%);
  background-repeat: no-repeat;
  background-size: 380px 30%;
  background-position: 0 88%;
  transition: background-size 0.8s;
  color: #000;
}

.context-slot {
  width: max-content;
  // font-size: 40px;
  margin-left: 10px;
  position: relative;
  z-index: 0px;
}
</style>
