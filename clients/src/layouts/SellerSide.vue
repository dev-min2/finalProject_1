<template>
            <div id="layoutSidenav_nav">
                <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                    <div class="sb-sidenav-menu">
                        <div class="nav">
                            <div class="sb-sidenav-menu-heading">menu</div>
                            <router-link class="nav-link" to="/sellerMain">
                                <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                                Charts
                            </router-link><hr>
                            <div class="sb-sidenav-menu-heading">Interface</div>
                           
                            <div class="collapse" id="collapseLayouts" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                                <nav class="sb-sidenav-menu-nested nav">
                                    <a class="nav-link" href="layout-static.html">Static Navigation</a>
                                    <a class="nav-link" href="layout-sidenav-light.html">Light Sidenav</a>
                                </nav>
                            </div>
                             <li class="nav-item"><router-link class="nav-link" to="/SellerProductList">상품 관리</router-link></li>
                             <hr>
                            <li class="nav-item"><router-link class="nav-link" to="/SellerReviewList">리뷰 조회</router-link></li>
                            <hr>
                            <li class="nav-item"><router-link class="nav-link" to="/SellerDelivery">배송 관리</router-link></li>
                            <hr>
            
              
                            
                           
                        </div>
                    </div>
                    <div class="sb-sidenav-footer">
                        <div class="small"></div>
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