<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light"> <!-- bg-light -->
            <div class="container px-4 px-lg-5">
                <template v-if="curShowPetType == '0'">
                    <router-link class="navbar-brand m-0" to="/" style="font-family: 'Single Day', cursive;font-size:28px;font-weight:bold;color:#f0768b">마이디어 독</router-link>
                    <img class ="mx-2" src="../assets/commonResource/dogIcon.png" alt="dog" style="width:40px;height:40px;">
                </template>
                <template v-else>
                    <router-link class="navbar-brand m-0" to="/" style="font-family: 'Single Day', cursive;font-size:28px;font-weight:bold;color:#f0768b">마이디어 캣</router-link>
                    <img class ="mx-2" src="../assets/commonResource/catIcon.png" alt="dog" style="width:40px;height:40px;">
                </template>
                
                
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
                <div class="collapse navbar-collapse d-flex justify-content-between" id="navbarSupportedContent">
                    <div class="input-group w-50">
                    <input type="text" class="form-control" placeholder="Search" aria-label="Username" aria-describedby="basic-addon1" id="searchBar">
                    <div class="input-group-append">
                        <button class="input-group-text" id="searchBtn"><i class="fa fa-search pt-2"></i></button>
                    </div>
				</div>	
                <div class="d-flex gap-3">
                    <template v-if="curShowPetType == '0'">
                        <button @click="changePetType" class="btn" type="button" >
                            <i class="fas fa-cat fa-2x"></i>
                        </button>
                    </template>
                    <template v-else>
                        <button @click="changePetType" class="btn" type="button" >
                            <i class="fas fa-dog fa-2x"></i>
                        </button>
                    </template>
                    <button class="btn" type="button">
                        <i class="far fa-user fa-2x"></i>
                    </button>
                    <button class="btn" type="button">
                        <i class="bi-cart-fill me-1"></i>
                        <span class="badge bg-dark text-white ms-1 rounded-pill" id="cartCnt">
                            0 <!-- 변경해야함 -->
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
                    <a class="nav-link dropdown-toggle" id="multiDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">카테고리</a>
                    <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <li class="dropdown-submenu dropend">
                            <a class="dropdown-item dropdown-toggle" href="#">사료</a>
                            <ul class="dropdown-menu" >
                                <li><a class="dropdown-item" href="#">건식사료</a></li>
                                <li><a class="dropdown-item" href="#">습식사료</a></li>
                            </ul>
                        </li>
                        <li class="dropdown-submenu dropend">
                            <a class="dropdown-item dropdown-toggle" href="#">간식</a>
                            <ul class="dropdown-menu" >
                                <li><a class="dropdown-item" href="#">수제간식</a></li>
                                <li><a class="dropdown-item" href="#">캔/파우치</a></li>
                                <li><a class="dropdown-item" href="#">통살</a></li>
                            </ul>
                        </li>
                        <li class="dropdown-submenu dropend">
                            <a class="dropdown-item dropdown-toggle" href="#">건강관리</a>
                            <ul class="dropdown-menu" >
                                <li><a class="dropdown-item" href="#">종합영양제</a></li>
                                <li><a class="dropdown-item" href="#">피부/모질</a></li>
                                <li><a class="dropdown-item" href="#">뼈/관절</a></li>
                            </ul>
                        </li>
                        <li class="dropdown-submenu dropend">
                            <a class="dropdown-item dropdown-toggle" href="#">미용/목욕</a>
                            <ul class="dropdown-menu" >
                                <li><a class="dropdown-item" href="#">샴푸/린스</a></li>
                                <li><a class="dropdown-item" href="#">브러쉬</a></li>
                                <li><a class="dropdown-item" href="#">발톱/발관리</a></li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li class="nav-item"><a class="nav-link" aria-current="page" href="#">신상품</a></li>
                <li class="nav-item"><a class="nav-link" href="#">베스트상품</a></li>
                <li class="nav-item"><a class="nav-link" href="#">추천상품</a></li>
            </ul>
            <ul class="navbar-nav">
                <li class="nav-item"><a class="nav-link" aria-current="page" href="#">공지사항</a></li>
                <li class="nav-item"><a class="nav-link" href="#">고객센터</a></li>
                <li class="nav-item">
                    <router-link v-if="$store.state.userNo == -1" to="/login" class="nav-link">로그인</router-link>
                    <router-link v-else to="/" class="nav-link">로그아웃</router-link>
                </li>
            </ul>
            </div>
        </nav>
    </div>
</template>

<script>
export default {
    computed : {
        curShowPetType() {
            return this.$store.state.curShowPetType;
        }
    },
    created() {
    },
    methods : {
        changePetType() {
            if(this.curShowPetType == '0')
                this.$store.commit('reversePetType','1');
            else
                this.$store.commit('reversePetType','0');
        }
    }
}
// 카테고리 Dropdown관련 
$(document).ready(function(){
	$('.dropdown-submenu a.dropdown-item').on("click", function(e){
        var $submenu = $(this).next('ul');
        $('.dropdown-submenu ul.show').not($submenu).removeClass('show');
        $submenu.toggleClass('show');
        e.stopPropagation();
        e.preventDefault();
	});

	$(document).on('click', function(e){
        if(!$(e.target).closest('.dropdown-submenu').length){
            $('.dropdown-submenu ul.show').removeClass('show');
        }
	});
});
</script>
