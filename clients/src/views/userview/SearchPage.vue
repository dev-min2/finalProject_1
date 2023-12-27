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
            myKeyword : '',
            productList : []
        }
    },
    created() {
        this.myKeyword = this.$route.params.keyword;
        this.getProductList(this.myKeyword);
        console.log(this.myKeyword);
    },
    methods : {
        async getProductList(keyword) {
            const result = await axios.get(`/api/product/search?q=${keyword}&type=${this.$store.state.curShowPetType}`);
            this.productList = result.data; //저장
            console.log(result);
        }
    }
}
</script>
