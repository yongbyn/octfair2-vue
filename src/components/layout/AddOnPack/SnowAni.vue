<template>
  <div class="night-container"></div>
  <div class="snow-container">
    <canvas ref="snowCanvas"></canvas>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";

// 눈송이 관련 상태 및 변수 선언
const props = defineProps(["snowConfig"]);
let canvas, context;
const snowCanvas = ref(null);
const snowflakes = []; // 눈송이
const snowGround = []; // 눈이 쌓이는 영역

// 캔버스 초기화
const initCanvas = () => {
  canvas = snowCanvas.value;
  context = canvas.getContext("2d");
  resizeCanvas();
  createSnowflakes();
};

// 캔버스 크기 재조정
const resizeCanvas = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  snowGround.length = 0; // 화면 크기 변경 시 눈 쌓임 초기화
};

// 눈송이 생성
const createSnowflakes = () => {
  const numFlakes = props.snowConfig.numSnow;
  for (let i = 0; i < numFlakes; i++) {
    snowflakes.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius:
        Math.random() * props.snowConfig.maxRadius + props.snowConfig.minRadius,
      speed:
        Math.random() * props.snowConfig.maxSpeed + props.snowConfig.minSpeed,
    });
  }
};

// 눈송이 애니메이션
const animateSnow = () => {
  const draw = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);

    // 눈송이들 그리기 및 움직임
    snowflakes.forEach((flake) => {
      context.beginPath();
      context.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
      context.fillStyle = "white";
      context.fill();

      // 눈송이 이동
      flake.x += flake.speed * 0.15;
      flake.y += flake.speed;

      // 눈송이가 화면 아래로 지나가면
      if (flake.y > canvas.height) {
        flake.y = -flake.radius; // 화면 위에서 재시작
        flake.x = Math.random() * canvas.width;
      }

      // 눈송이가 화면을 넘어가면 반대편으로
      if (flake.x > canvas.width) {
        flake.x = -flake.radius;
      }

      // 눈이 쌓이는 위치 기록
      if (
        flake.y > canvas.height - 20 &&
        flake.x > 0 &&
        flake.x < canvas.width
      ) {
        const groundX = Math.floor(flake.x);
        const groundY = Math.floor(flake.y);
        if (!snowGround[groundY]) snowGround[groundY] = [];
        snowGround[groundY][groundX] = { radius: flake.radius };
      }
    });

    // 눈이 쌓이는 부분을 그리기
    for (let y = canvas.height - 1; y >= 0; y--) {
      for (let x = 0; x < canvas.width; x++) {
        if (snowGround[y] && snowGround[y][x]) {
          context.beginPath();
          context.arc(x, y, snowGround[y][x].radius, 0, Math.PI * 2);
          context.fillStyle = "white";
          context.fill();
        }
      }
    }

    requestAnimationFrame(draw);
  };

  draw();
};

// 컴포넌트 마운트 시 실행
onMounted(() => {
  initCanvas();
  window.addEventListener("resize", resizeCanvas);
  animateSnow();
});

// 컴포넌트 언마운트 시 이벤트 제거
onBeforeUnmount(() => {
  window.removeEventListener("resize", resizeCanvas);
});
</script>

<style>
.night-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -3;
  overflow: hidden;
  background-size: cover;
  background: #001a33; /* 눈을 돋보이게 하는 어두운 밤 배경 */
}

.snow-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
  background-size: cover;
}

canvas {
  display: block;
}
</style>
