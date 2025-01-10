<template>
  <div class="profile-card">
    <div class="profile-header">
      <img
        v-if="userInfo.user.userType === 'B' || userInfo.user.userType === 'M'"
        :src="vue_logo"
        alt="logoImage"
      />
      <img v-if="userInfo.user.userType === 'A'" :src="mang" alt="userImage" />
    </div>
    <div class="profile-body">
      <h2 class="profile-name">
        {{ userInfo.user.loginId }}
      </h2>
      <div class="profile-action">
        <button @click="handlerLogout" class="logout-btn">로그아웃</button>
      </div>
    </div>
  </div>

  <div class="ul-class">
    <ul>
      <li
        v-for="menu in userInfo.user.usrMnuAtrt"
        :key="menu.grp_num"
        class="parent-menu"
      >
        <span class="parent-menu-text">{{ menu.mnu_nm }}</span>

        <div
          class="child-menu-box"
          @click="handlerClick(menu.mnu_id, $event)"
          :id="menu.mnu_id"
        >
          <template v-for="node in menu.nodeList" :key="node.mnu_id">
            <router-link :to="'/vue' + node.mnu_url" class="router-link">
              <div
                class="child-menu-link"
                :id="node.mnu_id"
                @click="handlerMenuLinkClick(node.mnu_id, $event)"
              >
                {{ node.mnu_nm }}
              </div>
            </router-link>
          </template>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import mang from "../../assets/utilcons/mang_gom.png";
import vue_logo from "../../assets/utilcons/vue_logo.png";
import { useUserInfo } from "../../stores/userInfo";

const userInfo = useUserInfo();
const router = useRouter();
const emits = defineEmits(["clickPageLink"]);

const handlerClick = (menuId, e) => {
  const childMenuId = document.getElementById(menuId);
  const childMenuClass = document.getElementsByClassName("child-menu-box");
  Array.from(childMenuClass).forEach((childMenu) => {
    childMenu.classList.remove("active");
  });

  if (e) {
    if (e.currentTarget.id === menuId) {
      childMenuId?.classList.toggle("active");
    } else {
      childMenuId?.classList.remove();
    }
  }
};

const handlerMenuLinkClick = (menuId, e) => {
  const childLinkId = document.getElementById(menuId);
  const childLinkClass = document.getElementsByClassName("child-menu-link");
  Array.from(childLinkClass).forEach((childLink) => {
    childLink.classList.remove("active-link");
  });

  if (e.currentTarget.id === menuId) {
    childLinkId?.classList.toggle("active-link");
  } else {
    childLinkId?.classList.remove();
  }

  emits("clickPageLink"); // 모바일 크기일때 메뉴링크 이동 동시에 메뉴가 숨겨지도록 처리하기 위한 값을 전송
};

const handlerLogout = () => {
  sessionStorage.setItem("userInfo", "");
  router.push("/");
};
</script>

<style lang="scss" scoped>
.profile-card {
  width: 250px;
  margin: 20px 0px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.profile-header {
  padding: 15px;
  text-align: center;
}

.profile-image {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.profile-body {
  padding-bottom: 20px;
  text-align: center;
}

.profile-name {
  font-size: 24px;
  font-weight: bold;
  // margin: 10px 0;
  color: #333;
}

.profile-title {
  font-size: 16px;
  color: #666;
  margin-bottom: 20px;
}

img {
  width: 60px;
  height: 60px;
  border-radius: 50%; /* 원형 이미지 */
}

.user-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.login-id {
  font-size: 18px;
  color: white;
  font-weight: bold;
}

a {
  cursor: pointer;
}

button {
  background-color: white;
  color: black;
  border: none;
  border-radius: 50px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  padding: 3px 10px 3px 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition:
    background-color 0.3s,
    transform 0.2s;
}
button:hover {
  background-color: #ffffff;
  transform: translateY(-2px);
}
button:active {
  background-color: ivory;
  transform: translateY(0);
}

.logoutBtn {
  float: right;
  margin-right: 20px;
}

.ul-class {
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 250px;
}

ul {
  border-radius: 10px;
  background: rgb(255, 255, 255);
  list-style-type: none;
  padding: 0;
}

.parent-menu {
  font-weight: 700;
  font-size: 20px;
  // padding: 20px 10px 20px 20px;
  padding-top: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #f5f5f5;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  color: black;

  .parent-menu-text {
    margin-left: 20px;
    @media (max-width: 900px) {
      margin-left: 0px;
    }
  }

  &:hover {
    transition: 1s;
    .child-menu-box {
      opacity: 1;
      display: block;
      height: 100%;
      margin-top: 30px;
    }
  }

  .child-menu-link {
    font-weight: 600;
    color: black;
  }

  .child-menu-box {
    display: none;
    opacity: 0;
    transition:
      opacity 0.2s,
      visibility 0s;
    height: 0;
    padding-left: 20px;
    padding-top: 10px;
    padding-bottom: 10px;
    margin: 0;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;

    div {
      margin: 10px 0 10px 0;

      &:hover {
        cursor: pointer;

        background-image: linear-gradient(120deg, #a8f2ffcb 0%, #d8f2ffec 100%);
        background-repeat: no-repeat;
        background-size: 60% 40%;
        background-position: 0 88%;
        transition: background-size 0.25s ease-in;
      }
    }
  }

  .active {
    opacity: 1;
    display: block;
    height: 100%;
    margin-top: 30px;
  }

  .active-link {
    color: black;
    background-image: linear-gradient(120deg, #97c4ffc9 0%, #d1f0ffec 100%);
    background-repeat: no-repeat;
    background-size: 60% 40%;
    background-position: 0 88%;
    transition: background-size 0.25s ease-in;
    &:hover {
      background-size: 60% 88%;
    }
  }

  img {
    padding-left: 10px;
    padding-right: 10px;
  }

  .router-link {
    color: #602e2e;
    text-decoration: none;

    visibility: visible;
    height: 100%;
    margin-top: 30px;
  }
}

@media (max-width: 900px) {
  .logo-box {
    display: flex;
    justify-content: center;
    align-items: center;

    .user-info {
      margin-top: 0;
      margin-right: 0;
      font-size: clamp(12px, 2vw, 15px);

      button {
        font-size: clamp(8px, 2vw, 10px);
      }
    }
  }

  ul {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .parent-menu {
    text-align: center;
    overflow: hidden;

    &:hover {
      .child-menu-box {
        margin-top: 0;
      }
    }

    .child-menu-box {
      padding-right: 20px;
    }
  }
}
</style>
