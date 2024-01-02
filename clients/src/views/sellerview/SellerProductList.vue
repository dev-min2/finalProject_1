<template>
    <div id="container">
        <div class="product-toolbar">
            <div class="display-options">
                <label for="productsPerPage"> 표시할 상품 갯수 </label>
                <select v-model="productsPerPage" @change="updateProductsPerPage" style="margin-left:10px">
                    <option value="5">5개</option>
                    <option value="10">10개</option>
                    <option value="20">20개</option>
                </select>
            </div>
            <div class="total-product">
                <h4>상품 목록</h4>
            </div>
            <div class="search-bar">
                <input type="text" placeholder="       상품명 검색" v-model="search" />
                <button @click="sellerProductSearchName()" style="border-radius:8px">검색</button>
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

    export default {
        data() {
            return {
                sellerProductList: [],
                search: '',
                productsPerPage: 5,
                currentPage: 1,
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
                    result = await axios.get(
                        `/api/product/SellerProductList/${userNo}`);
                   

                } catch (e) {
                    console.log(e);
                }

                this.sellerProductList = result.data;
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

<style>
.product-toolbar {
        display: flex;
        justify-content: space-between;
        background-color: #363636;
        padding: 10px;
        color: white;
        margin: 10px;
    }
</style>