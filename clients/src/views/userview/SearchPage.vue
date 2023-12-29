<template>
    <section class="py-3">
        <div class="container px-4 px-lg-5 mt-5">
            <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                <Product v-for="(product2,idx) in productList" :key="idx" :product="product2" />
            </div>
            <nav aria-label="Page navigation example">
                <ul class="pagination justify-content-center">
                    <li class="page-item">
                        <li class="page-item active"><a class="page-link" v-for="(pageno2, idx) in pageNo" :key="idx"
                                @click="nextPage(pageno)" style="background-color:#fc97bf; border-color:#dee2e6;"></a></li>
                        <li class="page-item"><a class="page-link" style="color:black"></a></li>
                    </li>
                </ul>
            </nav>
        </div>
    </section>
</template>

<script>
    import axios from 'axios'
    import Product from '../../components/userview/Product.vue';

    export default {
        components: {
            Product,
        },
        data() {
            return {
                productList: []
            }
        },
        created() {
            let action = this.$route.query.action;

            if (action == "categorySearch") {
                this.getCategoryProductList(this.$route.query.categoryNo, 1)
            } else {
                this.getProductList(this.$route.query.keyword, 1);
            }
        },
        methods: {

            async getCategoryProductList(cno, pageno) {
                console.log(cno, pageno);
                const result = await axios.get(
                    `/api/product/search/category?cno=${cno}&type=${this.$store.state.curShowPetType}&pageno=${pageno}`
                );
                this.productList = result.data; //저장
                console.log(result);
            },
            async getProductList(keyword, pageno) {
                const result = await axios.get(
                    `/api/product/search?q=${keyword}&type=${this.$store.state.curShowPetType}&pageno=${pageno}`
                );
                this.productList = result.data; //저장
                console.log(result);
            },
            async nextPage(pageno) {
                this.pageno += 1;
            },
            async prevPage(pageno) {
                this.pageno -= 1;
            }
        }
    }
</script>