<template>
    <div id="container">
        <div class="table-header">검색 조건</div>
        <product-filter-search-bar @send-search="getMyProductListFilter" />

        <div class="product-toolbar">
            <div class="display-options">
                <label for="productsPerPage"> 표시할 상품 갯수 </label>
                <select v-model="productsPerPage" @change="updateProductsPerPage" style="margin-left:10px">
                    <option value="5">5개</option>
                    <option value="10">10개</option>
                    <option value="20">20개</option>
                    <option value="100">100개</option>
                </select>
            </div>
            <div class="total-product">
                <h4>상품 목록</h4>
            </div>
            <div class="search-bar">
                <input type="text" placeholder="       상품명 검색" v-model="search" />
                <button @click="sellerProductSearchName" style="border-radius:8px">검색</button>
            </div>
        </div>
        <table class="productList">
            <thead>
                <tr>
                    <th>상품 번호</th>
                    <th>상품이미지</th>
                    <th>상품명</th>
                    <th>판매가</th>
                    <th>판매상태</th>
                    <th>카테고리</th>
                    <th>상품등록일</th>
                </tr>
            </thead>
            <tbody>
                <tr :key="i" v-for="(product,i) in displayedProduct">
                    <td>{{product.product_no}}</td>
                    <td>{{product.product_image}}</td>
                    <td>{{product.product_name}}</td>
                    <td>{{product.product_price}}</td>
                    <td>{{product.product_public_state}}</td>
                    <td>{{product.Parent_category_name}}>>{{product.child_category_name}}</td>
                    <td>{{product.product_registdate}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import axios from 'axios';
    import ProductFilterSearchBar from './ProductFilterSearchBar.vue';

    export default {
        components: {
            ProductFilterSearchBar
        },
        data() {
            return {
                sellerProductList: [],
                search: '',
                productsPerPage: 5,
                currentPage: 1,
                getMyProductListFilter:[]
            };
        },
        created() {

            this.getMyProductList();
        },
        computed: {
            displayedProduct() {
                const startIndex = (this.currentPage - 1) * this.productsPerPage;
                const endIndex = startIndex + this.productsPerPage;
                return this.sellerProductList.slice(startIndex, endIndex);
            },
        },
        methods: {
            async getMyProductList() {

                let result = '';
                const userNo = 1;
                try {
                    result = await axios.get(`/api/product/SellerProductList/${userNo}`);
                    console.log(userNo)
                } catch (e) {
                    console.log(e);
                }
                this.sellerProductList = result.data
            },
            async getMyProductListFilter(userNo, publicStateNo, categoryNo1, categoryNo2, categoryNo3) {
                 let result = '';
                
                try {
                    result = await axios.post(
                        `/api/product/SellerProductList/${userNo}`, {
                            publicStateNo: publicStateNo,
                            categoryNo1: categoryNo1,
                            categoryNo2: categoryNo2,
                            categoryNo3: categoryNo3
                        }
                    );

                    console.log('categoryNo', categoryNo1, categoryNo2, categoryNo3);
                    console.log('publicStateNo', publicStateNo);

                    
                    this.sellerProductList = result.data;
                    
                } catch (e) {
                    console.log(e);
                }


            },
            //상품이름으로 검색
            async sellerProductSearchName() {
                let result = '';
                try {
                    result = await axios.get(`/api/product/sellerProductSearchName/${this.search}`)
                    console.log('상품이름검색 :' + result);

                } catch (e) {
                    console.log(e);
                }

                this.sellerProductList = result.data;
            },

            updateProductsPerPage() {
                this.currentPage = 1;
            },
        }
    }
</script>

<style scoped>
    .product-toolbar {
        display: flex;
        justify-content: space-between;
        background-color: #363636;
        padding: 10px;
        color: white;
        margin: 10px;
    }

    .table-header {
        background-color: #5f5f5f;
        color: rgb(255, 255, 255);
        padding: 10px;
        margin-bottom: 10px;
        margin-top: 5px;
        margin-left: 5px;
        font-weight: bold;
        font-size: 18px;
        text-shadow: -1px 0px rgb(0, 0, 0), 0px 1px rgb(0, 0, 0), 1px 0px rgb(0, 0, 0), 0px -1px rgb(0, 0, 0);

    }


    table {
        border-collapse: collapse;
        width: 100%;
        border: 2px solid #000000;
        text-align: center;
        margin-left: 10px;
    }

    th,
    td {
        border-collapse: collapse;
        padding: 8px;
        text-align: center;
        border: 2px solid #000000;
    }

    th {
        border: 2px solid #000000;
        background-color: #f2f2f2;

    }
</style>