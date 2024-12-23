<template>
  <div :class="['toggle-switch', { active: isActive }]" @click="toggleOnOff">
    <div :class="['toggle-label', { active: isActive }]"></div>
    <slot></slot>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps(["isActive"]);
const emits = defineEmits(["changeActive"]);
const isActive = ref(props.isActive);

const toggleOnOff = () => {
  isActive.value = !isActive.value;
  emits("changeActive");
};
</script>

<style lang="scss" scoped>
/* 컨테이너 스타일 */
.toggle-switch {
  position: relative;
  width: 75px;
  height: 25px;
  background-color: #ccc;
  border-radius: 25px;
  cursor: pointer;
  transition: background-color 0.3s;
}

/* 활성화된 상태 */
.toggle-switch.active {
  background-color: #4caf50;
}

/* 동그라미 스타일 */
.toggle-label {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 19px;
  height: 19px;
  background-color: #fff;
  border-radius: 50%;
  transition: transform 0.3s;
}

/* 활성화된 상태 */
.toggle-label.active {
  transform: translateX(50px);
}
</style>
