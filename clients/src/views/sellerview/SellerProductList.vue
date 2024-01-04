<template>
    <div id="container">
        <div class="table-header">검색 조건</div>
        <ProductFilterSearchBar @send-search="getMyProductListFilter" />

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
                    <th class = "th1">상품 번호</th>
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
                    <td v-if="product.product_public_state == 'I1'">공개</td>
                    <td v-else>비공개</td>
                    <td>{{product.Parent_category_name}}>>{{product.child_category_name}}</td>
                    <td>{{$dateFormat(product.product_registdate)}}</td>
                </tr>
            </tbody>
        </table>
    <!-- 상품등록,삭제,숨김 버튼 -->
    <button class = "b1" @click="upload" style="border-radius:5px"><router-link class="nav-link" to="/upload">상품등록</router-link></button>
    <button class = "b2" @click="productDelete" style="border-radius:5px"><router-link class="nav-link" to="/">삭제</router-link></button>
    <button class = "b3" @click="productHiding" style="border-radius:5px"><router-link class="nav-link" to="/">숨김</router-link></button>
        
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
               // getMyProductListFilter:[]
            };
        },
        created() {

            this.getMyProductList('I1');
        },
        computed: {
            displayedProduct() {
                const startIndex = (this.currentPage - 1) * this.productsPerPage;
                const endIndex = startIndex + this.productsPerPage;
                return this.sellerProductList.slice(startIndex, endIndex);
            },
        },
        methods: {
            async getMyProductList(publicStateNo) {
                let result = '';
                const userNo = 1;
                const state = publicStateNo
                try {
                    result = await axios.get(`/api/product/SellerProductList/${userNo}/${state}`);
                    console.log(userNo,state)
                } catch (e) {
                    console.log(e);
                }
                this.sellerProductList = result.data
            },
            //중분류가 선택되지 않았을때 전체조회 method로 공개상태를 인수로 보냄
            async getMyProductListFilter(sendObj) {
                if(sendObj.categoryArray == -1){
                    this.getMyProductList(sendObj.publicStateNo);
                    return;
                }
                sendObj.userNo = this.$store.state.userNo;
                let result = '';
                
                try {
                    result = await axios.post(
                        `/api/product/SellerProductList`, sendObj
                    );
                 
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
    .b1{
        margin-left: 10px;
        margin-top: 5px;
    }
    .b2{
        margin-left: 2px;
        margin-top: 5px;
    }
    .b3{
        margin-left: 2px;
        margin-top: 5px;
    }
</style>