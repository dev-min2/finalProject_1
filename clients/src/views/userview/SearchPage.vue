<template>
    <section class="py-3">
            <div class="container px-4 px-lg-5 mt-5">
                <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                    <Product v-for="(product2,idx) in productList" :key="idx" :product="product2" />    
                </div>
            </div>
    </section>
</template>

<script>
import axios from 'axios'
import Product from '../../components/userview/Product.vue';

export default {
    components : {
        Product
    },
    data() {
        return {
            productList : []
        }
    },
    created() {
        let action = this.$route.query.action;

        if(action == "categorySearch") {
            this.getCategoryProductList(this.$route.query.categoryNo)
        }
        else {
            this.getProductList(this.$route.query.keyword);
        }
    },
    methods : {
        
        async getCategoryProductList(cno) {
            console.log('카테고리 검색');
            console.log(cno);
            const result = await axios.get(`/api/product/search/category?cno=${cno}&type=${this.$store.state.curShowPetType}`);
            this.productList = result.data; //저장
            console.log(result);
        },
        async getProductList(keyword) {
            const result = await axios.get(`/api/product/search?q=${keyword}&type=${this.$store.state.curShowPetType}`);
            this.productList = result.data; //저장
            console.log(result);
        }
    }
}
</script>
