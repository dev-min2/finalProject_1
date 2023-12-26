<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light">
      <!-- bg-light -->
      <div class="container px-4 px-lg-5">
        <template v-if="curShowPetType == '0'">
          <router-link to="/main"
            ><img
              class="mx-2"
              src="../assets/commonResource/doglogo.png"
              alt="dog"
              style="width: 140px"
          /></router-link>
        </template>
        <template v-else>
          <router-link to="/main"
            ><img
              class="mx-2"
              src="../assets/commonResource/catlogo.png"
              alt="cat"
              style="width: 140px"
          /></router-link>
        </template>

        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div
          class="collapse navbar-collapse d-flex justify-content-between"
          id="navbarSupportedContent"
        >
          <div class="input-group w-50">
            <input
              type="text"
              class="form-control"
              placeholder="Search"
              aria-label="Username"
              aria-describedby="basic-addon1"
              id="searchBar"
            />
            <div class="input-group-append">
              <button class="input-group-text" id="searchBtn">
                <i class="fa fa-search pt-2"></i>
              </button>
            </div>
          </div>
          <div class="d-flex gap-3">
            <template v-if="curShowPetType == '0'">
              <button @click="changePetType" class="btn" type="button">
                <!-- <i class="fas fa-cat fa-2x"></i> -->
                <img
                  src="../assets/commonResource/catIcon.png"
                  style="width: 70px"
                />
              </button>
            </template>
            <template v-else>
              <button @click="changePetType" class="btn" type="button">
                <img
                  src="../assets/commonResource/dogIcon.png"
                  style="width: 70px"
                />
              </button>
            </template>
            <button class="btn" type="button">
              <i class="far fa-user fa-2x"></i>
            </button>
            <button @click="$router.push('/cart')" class="btn" type="button">
              <i class="bi-cart-fill me-1"> </i>
              <span
                class="badge bg-dark text-white ms-1 rounded-pill"
                id="cartCnt"
              >
                0
                <!-- 변경해야함 -->
              </span>
            </button>
          </div>
        </div>
      </div>
    </nav>
    <nav class="navbar navbar-expand-lg navbar-light">
      <div class="container px-4 px-lg-5 d-flex justify-content-between">
        <ul class="navbar-nav">
          <li class="nav-item dropdown d-flex">
            <i class="fas fa-bars custom-padding"></i>
            <a
              class="nav-link dropdown-toggle"
              id="multiDropdown"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              >카테고리</a
            >
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li class="dropdown-submenu dropend">
                <a class="dropdown-item dropdown-toggle" href="#">사료</a>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="#">건식사료</a></li>
                  <li><a class="dropdown-item" href="#">습식사료</a></li>
                </ul>
              </li>
              <li class="dropdown-submenu dropend">
                <a class="dropdown-item dropdown-toggle" href="#">간식</a>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="#">수제간식</a></li>
                  <li><a class="dropdown-item" href="#">캔/파우치</a></li>
                  <li><a class="dropdown-item" href="#">통살</a></li>
                </ul>
              </li>
              <li class="dropdown-submenu dropend">
                <a class="dropdown-item dropdown-toggle" href="#">건강관리</a>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="#">종합영양제</a></li>
                  <li><a class="dropdown-item" href="#">피부/모질</a></li>
                  <li><a class="dropdown-item" href="#">뼈/관절</a></li>
                </ul>
              </li>
              <li class="dropdown-submenu dropend">
                <a class="dropdown-item dropdown-toggle" href="#">미용/목욕</a>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="#">샴푸/린스</a></li>
                  <li><a class="dropdown-item" href="#">브러쉬</a></li>
                  <li><a class="dropdown-item" href="#">발톱/발관리</a></li>
                </ul>
              </li>
            </ul>
          </li>
          <li class="nav-item">
            <a class="nav-link" aria-current="page" href="#">신상품</a>
          </li>
          <li class="nav-item"><a class="nav-link" href="#">베스트상품</a></li>
          <li class="nav-item"><a class="nav-link" href="#">추천상품</a></li>
          <li class="nav-item">
            <router-link class="nav-link" to="/upload"
              >업로드테스트</router-link
            >
          </li>
          <!-- 지워야함-->
          <li class="nav-item">
            <router-link class="nav-link" to="/uploadView"
              >상품카드테스트</router-link
            >
          </li>
          <!-- 지워야함-->
        </ul>
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" aria-current="page" href="#">공지사항</a>
          </li>
          <li class="nav-item"><a class="nav-link" href="#">고객센터</a></li>
          <li class="nav-item">
            <router-link
              v-if="$store.state.userNo == -1"
              to="/login"
              class="nav-link"
              >로그인</router-link
            >
            <a v-else class="nav-link" @click="logout">로그아웃</a>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/admin">관리자테스트</router-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import axios from "axios";
export default {
  computed: {
    curShowPetType() {
      return this.$store.state.curShowPetType;
    },
  },

  created() {},
  methods: {
    changePetType() {
      if (this.curShowPetType == "0") this.$store.commit("reversePetType", "1");
      else this.$store.commit("reversePetType", "0");
    },
    async logout() {
      const userNo = this.$store.state.userNo;
      if (this.$store.state.userNo < 0) return;

      let result = await axios.get("/api/user/logout");
      if (result.status == 200 && result.data == "OK") {
        alert("로그아웃 완료");
        this.$store.commit("setUserNo", -1);
        this.$router.push({ path: "/" });
      }

      // 카카오로그아웃
      if(this.$store.state.socialId > 0) {
        const accessToken = this.$store.state.accessToken;
        const logoutResult = await axios({
            method:'post',
            url:'https://kapi.kakao.com/v1/user/logout',
            headers:{
              'Authorization': `Bearer ${accessToken}`
            }
        });
        this.$store.commit('setSocialId',0);
        this.$store.commit('setAccessToken','');
        this.$store.commit('setRefreshToken','');
      }
    },
  },
};
// 카테고리 Dropdown관련
$(document).ready(function () {
  $(".dropdown-submenu a.dropdown-item").on("click", function (e) {
    var $submenu = $(this).next("ul");
    $(".dropdown-submenu ul.show").not($submenu).removeClass("show");
    $submenu.toggleClass("show");
    e.stopPropagation();
    e.preventDefault();
  });

  $(document).on("click", function (e) {
    if (!$(e.target).closest(".dropdown-submenu").length) {
      $(".dropdown-submenu ul.show").removeClass("show");
    }
  });
});
</script>
<style scoped></style>
