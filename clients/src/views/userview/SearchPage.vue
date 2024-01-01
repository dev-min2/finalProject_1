<template>
    <section class="py-3">
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
                page: null
            }
        },
        created() {
            let action = this.$route.query.action;

            if (action == "categorySearch") {
                this.getCategoryProductList(this.$route.query.categoryNo, 1)
            } else {
                this.getProductList(this.$route.query.keyword, );
            }
        },
        methods: {
            async getCategoryProductList(cno, pageno) {
                console.log(cno, pageno);
                const result = await axios.get(
                    `/api/product/search/category?cno=${cno}&type=${this.$store.state.curShowPetType}&pageno=${pageno}`
                );
                console.log(productList);
                this.productList = result.data.selectResult;
                this.page = result.data.pageDTO;
            },
            async getProductList(keyword, pageno) {
                const result = await axios.get(
                    `/api/product/search?q=${keyword}&type=${this.$store.state.curShowPetType}&pageno=${pageno}`
                );
                console.log(productList);
                this.productList = result.data.selectResult;
                this.page = result.data.pageDTO;
            },
            async getSearchPageList(pageno) {
                let action = this.$route.query.action;
                if (action == "categorySearch") {
                    this.getCategoryProductList(this.$route.query.categoryNo, pageno)
                } else {
                    this.getProductList(this.$route.query.keyword, pageno);
                }
            },

        }
    }
</script>