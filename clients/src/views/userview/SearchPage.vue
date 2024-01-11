<template>
    <section class="py-3">
        <div>
            <h3 class="text-center">"{{ keyword }}" 에 대한 상품은</h3>
            <h3 class="text-center" v-if="page !== null"> 총 {{ page.total }} 건 입니다.</h3>
        </div>
        <div class="container px-4 px-lg-5 mt-5">
            <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                <Product v-for="(product2,idx) in productList" :key="idx" :product="product2" />
            </div>
            <PaginationComp v-if="page !== null" :page="page" @go-page="getSearchPageList" />
        </div>
    </section>
</template>

<script>
    import axios from 'axios'
    import Product from '../../components/userview/Product.vue';
    import PaginationComp from '../../components/common/PaginationComp.vue';

    export default {
        components: {
            Product,
            PaginationComp
        },
        data() {
            return {
                productList: [],
                page: null,
                keyword : '',
            }
        },
        created() {
            let action = this.$route.query.action;
            
            if (action == "categorySearch") {
                this.getCategoryProductList(this.$route.query.categoryNo, 1)
                this.keyword = this.$route.query.category_name;
            } else if (action == "newProduct"){
                    this.getNewProductList(1);
                    this.keyword = "신상품";
            } else if (action == "bestProduct"){
                    this.getBestProductList(1);
                    this.keyword = "베스트상품";
            } else if (action == "recProduct"){
                    this.getRecProductList(1);
                    this.keyword = "추천상품";
            } else {
                this.keyword = this.$route.query.keyword;
                this.getProductList(this.$route.query.keyword, 1);
            }
        },
        methods: {
            async getCategoryProductList(cno, pageno) {
                this.$showLoading();
                const result = await axios.get(
                    `/api/product/search/category?cno=${cno}&type=${this.$store.state.curShowPetType}&pageno=${pageno}`
                );
                this.productList = result.data.selectResult;
                this.page = result.data.pageDTO;
                this.$hideLoading();
            },

            async getProductList(keyword, pageno) {
                this.$showLoading();
                const result = await axios.get(
                    `/api/product/search?q=${keyword}&type=${this.$store.state.curShowPetType}&pageno=${pageno}`
                );
                this.productList = result.data.selectResult;
                this.page = result.data.pageDTO;
                this.$hideLoading();
            },
            async getSearchPageList(pageno) {
                let action = this.$route.query.action;
                if (action == "categorySearch") {
                    this.getCategoryProductList(this.$route.query.categoryNo, pageno)
                } 
                else if (action == "newProduct"){
                    this.getNewProductList(pageno);
                }
                else  {
                    this.getProductList(this.$route.query.keyword, pageno);
                }
            },
            async getNewProductList(pageno){
                this.$showLoading();
                const result = await axios.get(
                    `/api/product/search/newproduct?type=${this.$store.state.curShowPetType}&pageno=${pageno}`
                );
                this.productList = result.data.selectResult;
                this.page = result.data.pageDTO;
                this.$hideLoading();

            },
            async getBestProductList(pageno){
                this.$showLoading();
                const result = await axios.get(
                    `/api/product/search/bestproduct?type=${this.$store.state.curShowPetType}&pageno=${pageno}`
                );
                this.productList = result.data.selectResult;
                this.page = result.data.pageDTO;
                this.$hideLoading();

            },
            async getRecProductList(pageno){
                this.$showLoading();
                const result = await axios.get(
                    `/api/product/search/recproduct?type=${this.$store.state.curShowPetType}&pageno=${pageno}`
                );
                this.productList = result.data.selectResult;
                this.page = result.data.pageDTO;
                this.$hideLoading();

            }
        }
    }
</script>