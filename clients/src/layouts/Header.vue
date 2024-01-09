<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light">
      <!-- bg-light -->
      <div class="container px-4 px-lg-5">
        <template v-if="curShowPetType == 'd1'">
          <router-link to="/main"><img class="mx-2" src="../assets/commonResource/doglogo.png" alt="dog"
              style="width: 140px" /></router-link>
        </template>
        <template v-else>
          <router-link to="/main"><img class="mx-2" src="../assets/commonResource/catlogo.png" alt="cat"
              style="width: 140px" /></router-link>
        </template>
        <!-- 검색창 -->
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse d-flex justify-content-between" id="navbarSupportedContent">
          <div class="input-group w-50">
            <input type="text" class="form-control" placeholder="검색어를 입력하세요" v-model="keyword" aria-label="Username"
              aria-describedby="basic-addon1" id="searchBar" @keyup.enter="searchshow(keyword)"/>
            <div class="input-group-append">
              <button class="input-group-text" id="searchBtn" @click="searchshow(keyword)">
                <i class="fa fa-search pt-2"></i>
              </button>
            </div>
          </div>
          <div class="d-flex gap-3">
            <template v-if="curShowPetType == 'd1'">
              <button @click="changePetType" class="btn" type="button">
                <!-- <i class="fas fa-cat fa-2x"></i> -->
                <img src="../assets/commonResource/catIcon.png" style="width: 70px" />
              </button>
            </template>
            <template v-else>
              <button @click="changePetType" class="btn" type="button">
                <img src="../assets/commonResource/dogIcon.png" style="width: 70px" />
              </button>
            </template>
            <button v-if="$store.state.userNo == -1" @click="$router.push('/login')" class="btn" type="button"> 
              <i class="far fa-user fa-2x"></i>
            </button>
            <button v-else @click="$router.push('/myinfo')" class="btn" type="button">
              <i class="far fa-user fa-2x"></i>
            </button>
            <button @click="$router.push('/cart')" class="btn" type="button">
              <i class="bi-cart-fill me-1"> </i>
              <span class="badge bg-dark text-white ms-1 rounded-pill" id="cartCnt" v-if="$store.state.userNo == -1">
                0
              </span>
              <span class="badge bg-dark text-white ms-1 rounded-pill" id="cartCnt" v-else>
                {{$store.state.cartCnt}}
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
            <a class="nav-link dropdown-toggle" id="multiDropdown" href="#" role="button" data-bs-toggle="dropdown"
              aria-expanded="false">카테고리</a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li class="dropdown-submenu dropend" v-for="(category, idx, index) in categoryList" :key="idx">
                <a class="dropdown-item dropdown-toggle" href="#" @click.prevent.stop="isSelected(index)">{{ category[0].parent_category_name }}</a>
                <ul class="dropdown-menu" v-bind:class="{ show : selectedMenu[index] }">
                  <li v-for="(category2, idx2) in categoryList[idx]" :key="idx2"><a class="dropdown-item"
                      href="#"  @click="getCategorySearch(category2.children_no,category2.children_category_name)" >{{ category2.children_category_name}}</a></li>
                </ul>
              </li>
            </ul>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" aria-current="page" @click="this.getNewProduct()">신상품</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" @click="this.getBestProduct()" >베스트상품</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" @click="this.getRecProduct()">추천상품</a>
          </li>

        </ul>
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" aria-current="page" to="/notice">공지사항</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/allqna" style="text-decoration : none">
            <a class="nav-link" href="#">고객센터</a></router-link>
            </li>
          <li class="nav-item">
            <router-link v-if="$store.state.userNo == -1" to="/login" class="nav-link">로그인</router-link>
            <a v-else class="nav-link" @click="logout" href="#">로그아웃</a>
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
    data() {
      return {
        keyword: '',
        categoryList: [],
        productList: [],
        selectedMenu : []
      }
    },


    computed: {
      curShowPetType() {
        return this.$store.state.curShowPetType;
      },
    },
    created() {
      this.getCategoryData();
    },
    methods: {
      async getCategoryData() {
        // 서버에 요청
        const result = await axios.get(`/api/product/category`).catch((err) => console.log(err));
        this.categoryList = result.data; //저장

        const groupBy = function (data, key) {
          return data.reduce(function (carry, el) {
            var group = el[key];
            if (carry[group] === undefined) {
              carry[group] = []
            }
            carry[group].push(el)
            return carry
          }, {})
        }

        this.categoryList = groupBy(this.categoryList, "parent_no");

        for(let category in this.categoryList){
           this.selectedMenu.push(false);
        }   

      },
      //신상품
      async getNewProduct(){
        this.$router.push({path : '/search', query : { action : "newProduct" } })
      },
      //베스트상품
      async getBestProduct(){
        this.$router.push({path : '/search', query : { action : "bestProduct" } })
      },
      //추천상품
      async getRecProduct(){
        this.$router.push({path : '/search', query : { action : "recProduct" } })
      },
      async getCategorySearch(cno, category_name) {
        // 카테고리넘버
        this.$router.push({path : '/search', query : { categoryNo : cno, action : "categorySearch", category_name : category_name} })
      },
      searchshow(keyword) {
        const query = keyword;
        if (keyword !== '') {
          this.keyword = '';
          this.$router.push({
            path: 'search',
            query: {
              keyword: query,
              action : "Keywordsearch"
            }
          });
        } else {
          this.$showBasicAlert(null, '검색어를 입력하세요!');
        }
      },
      changePetType() {
        if (this.curShowPetType == "d1") this.$store.commit("reversePetType", "d2");
        else this.$store.commit("reversePetType", "d1");

        this.$router.push({path: '/main'});
      },
      async logout() {
        const userNo = this.$store.state.userNo;
        if (this.$store.state.userNo < 0) return;

        let result = await axios.get("/api/user/logout");
        if (result.status == 200 && result.data == "OK") {
          this.$showSuccessAlert("로그아웃 완료");
          this.$store.commit('setUserName', '');
          this.$store.commit("setUserNo", -1);
          this.$store.commit("setUserPermission", '');
          this.$router.push({
            path: "/"
          });
        }

        // 카카오로그아웃
        if (this.$store.state.socialId > 0) {
          const accessToken = this.$store.state.accessToken;
          const logoutResult = await axios({
            method: 'post',
            url: 'https://kapi.kakao.com/v1/user/logout',
            headers: {
              'Authorization': `Bearer ${accessToken}`
            }
          });
          this.$store.commit('setSocialId', 0);
          this.$store.commit('setAccessToken', '');
          this.$store.commit('setRefreshToken', '');
        }
      },
      isSelected(idx){
        for(let i = 0 ; i< this.selectedMenu.length; i++){
          if(i == idx) {
            this.selectedMenu[i] = !this.selectedMenu[i];
          }else{
            this.selectedMenu[i] = false;
          }
        }
        
      }
    },
  };
  // 카테고리 Dropdown관련
  // $(document).ready(function () {
  //   $(".dropdown-submenu a.dropdown-item").on("click", function (e) {
  //     var $submenu = $(this).next("ul");
  //     $(".dropdown-submenu ul.show").not($submenu).removeClass("show");
  //     $submenu.toggleClass("show");
  //     e.stopPropagation();
  //     e.preventDefault();
  //   });

  //   $(document).on("click", function (e) {
  //     if (!$(e.target).closest(".dropdown-submenu").length) {
  //       $(".dropdown-submenu ul.show").removeClass("show");
  //     }
  //   });
  // });
</script>
<style scoped>
</style>