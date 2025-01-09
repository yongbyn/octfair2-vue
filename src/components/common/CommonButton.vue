<!-- hover시 파스텔번짐효과가 있는 효과버튼 -->
<template>
  <button><slot></slot></button>
</template>

<script setup></script>

<style lang="scss" scoped>
button {
  text-align: center;
  text-decoration: none;
  display: inline-block;
  border: none;
  color: white;
  padding-top: 8px;
  padding-bottom: 8px;
  font-size: 12px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 12px;
  box-shadow: 0 4px #999;
  background-color: #3bb2ea;

  &:hover {
    background-color: #45a049;
    border-color: #646cff;
    filter: drop-shadow(0 0 2em #00ff33aa); // 번짐효과
    transform: scale(1.2); // 확대효과
    transition: transform 0.05s; // 효과를 시간차
  }

  &:active {
    background-color: #3e8e41;
    box-shadow: 0 2px #666;
    transform: translateY(2px);
  }
}
</style>
