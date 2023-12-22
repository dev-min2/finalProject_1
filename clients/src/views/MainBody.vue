<template>
<div>
    <Banner />
    <section class="py-5"> <!-- 상품 카드 데이터 임시 html. 따로 컴포넌트로 뺴두는게 좋음 -->
            <div class="container px-4 px-lg-5 mt-5">
                <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                    <div v-for="product in productList" :key="product.product_no" class="col mb-5">
                        <div class="card h-100">
                            <!-- Product image-->
                            <div class="hoverImg">
                                <img class="card-img-top" src="../assets/products/dog/ANF 치킨야채 캔 95g.png" alt="..." />
                            </div>
                            <!-- Product details-->
                            <div class="card-body p-4">
                                <div class="text-center">
                                    <!-- Product name-->
                                    <h5 class="fw-bolder">{{product.product_name}}</h5>
                                    <!-- Product price-->
                                    {{product.product_price}}
                                </div>
                            </div>
                            <!-- Product actions-->
                            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="#">상세보기</a></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
</div>
</template>

<script>
import axios from 'axios'
import Banner from '../layouts/Banner.vue'
// import { useLoading } from "vue3-loading-overlay/dist/index";
// import "vue3-loading-overlay/dist/vue3-loading-overlay.css"

export default {
    components : {
        Banner
    },
    data() {
        return {
            productList : []
        }
    },
    created() {
        //this.getMainItemList();
        
        
    },
    methods: {
        async getMainItemList() {
            this.$showLoading();
            let result = await axios.get('/api/main').catch(err => console.log(err));
            this.productList = result.data;
            console.log(this.productList);
            this.$hideLoading();
        },
    },
}

</script>
