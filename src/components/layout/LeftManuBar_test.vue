<style lang="scss" scoped>
.logo-box {
  display: flex;
  align-items: center; /* 수직 중앙 정렬 */
  justify-content: space-between; /* 양쪽 끝 정렬 */
  background: #307de0;
  border-radius: 10px;
  padding: 10px;
}

img {
  width: 50px;
  height: 50px;
  border-radius: 50%; /* 원형 이미지 */
}

.user-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%; /* 부모 요소의 전체 너비를 차지 */
}

.login-id {
  font-size: 18px;
  color: white;
  font-weight: bold;
}

.logoutBtn button {
  background-color: white;
  color: black;
  border: none;
  border-radius: 50px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition:
    background-color 0.3s,
    transform 0.2s;
}
</style>

<template>
  <div class="card">
    <div class="image">
      <img src="Profile.jpg" alt="" class="profile-image" />
    </div>
    <div class="text-data">
      <span class="name"> Spanking Solutions </span>
      <span class="job"> Web-Developer & IT-Trainer </span>
    </div>
    <div class="media-buttons">
      <a href="#" style="background: #4766a3" class="link">
        <i class="bx bxl-tiktok"></i>
      </a>
      <a href="#" style="background: #1083ca" class="link">
        <i class="bx bxl-facebook"></i>
      </a>
      <a href="#" style="background: #b42756" class="link">
        <i class="bx bxl-twitter"></i>
      </a>
      <a href="#" style="background: #e40f0f" class="link">
        <i class="bx bxl-youtube"></i>
      </a>
    </div>
    <div class="buttons">
      <button class="button">Subscribe</button>
      <button class="button">Message</button>
    </div>
    <div class="data-analytics">
      <div class="data">
        <i class="bx bxs-heart"></i>
        <span class="number">150k</span>
      </div>
      <div class="data">
        <i class="bx bxs-message-dots"></i>
        <span class="number">9k</span>
      </div>
      <div class="data">
        <i class="bx bxs-share"></i>
        <span class="number">1.5k</span>
      </div>
    </div>
  </div>
</template>
