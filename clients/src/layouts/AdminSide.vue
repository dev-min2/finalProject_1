<template>
            <div id="layoutSidenav_nav">
                <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                    <div class="sb-sidenav-menu">
                        <div class="nav">
                            <div class="sb-sidenav-menu-heading">menu</div>
                            <router-link class="nav-link" to="/adminMain">
                                <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                                Charts
                            </router-link><hr>
                            <div class="sb-sidenav-menu-heading">Interface</div>
                           
                            <router-link class="nav-link" to="/adminMemberList">회원 관리</router-link><hr>
                            <li class="nav-item"><router-link class="nav-link" to="/SellerProductList">상품 관리</router-link></li><hr>
                            <li class="nav-item"><router-link class="nav-link" to="/AdminReviewList">리뷰 관리</router-link></li><hr>
                            
                           
                            <li class="nav-item"><router-link class="nav-link" to="/AdminCoupon">쿠폰 관리</router-link></li><hr>
                            

            
              
                            
                           
                        </div>
                    </div>
                    <div class="sb-sidenav-footer">
                        <div class="small">=====</div>
                        <b>Seller</b>
                    </div>
                </nav>
            </div>
</template>

<script>
export default {

}
</script>

<style>

</style>