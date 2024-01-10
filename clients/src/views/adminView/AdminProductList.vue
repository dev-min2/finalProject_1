<template>
    <div id="container">
        <div class="table-header">검색 조건</div>
        <ProductFilterSearchBar @send-search="getAdminProductListFilter" />

        <div class="product-toolbar">
            <div class="display-options">
                <label for="productsPerPage"> 표시할 상품 갯수 </label>
                <select v-model="productsPerPage" @change="updateProductsPerPage($event.target)" style="margin-left:10px">
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
                <button @click="adminProductSearchName()" style="border-radius:8px">검색</button>
            </div>
        </div>
        <table class="productList">
            <thead>
                <tr>
                    <th class = "th1">선택</th>
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
                    <td><input type = "checkbox" v-model = "product.selected" /></td>
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
        
       <PaginationComp v-if="page !== null" :page="page" @go-page="getAdminProductList" />
    </div>
</template>

<script>
    import PaginationComp from '../../components/common/PaginationComp.vue'
    import axios from 'axios';
    import ProductFilterSearchBar from './ProductFilterSearchBar.vue';

    export default {
        components: {
            ProductFilterSearchBar,
            PaginationComp
        },
        data() {
            return {
                adminProductList: [],
                search: '',
                productsPerPage: 5,
                currentPage: 1,
                pageNo : 1,
                page : null,
                publicStateNo : ''
               // getAdminProductListFilter:[]
            };
        },
        created() {
            if(this.$store.state.userPermission != 'F3') {
                this.$showFailAlert('권한이 없습니다.');
                this.$router.push({path : '/main'})
                return;
            }
            this.getAdminProductList2('I1');
        },
        computed: {
            displayedProduct() {
                const startIndex = (this.currentPage - 1) * this.productsPerPage;
                const endIndex = startIndex + this.productsPerPage;
                return this.adminProductList.slice(startIndex, endIndex);
            },
        },
        watch : {
            productsPerPage(newVal,oldVal) {
                if(newVal != oldVal) {
                    this.getAdminProductList2('I1');
                }
            }
        },
        methods: {
            async getAdminProductList(pageNo) {
                this.$showLoading();
                this.pageNo = pageNo;
                this.getAdminProductList2(this.publicStateNo)
            },
            test() {
                this.isModal = true;
            },
            async getAdminProductList2(publicStateNo) {
              
                const state = publicStateNo
                this.publicStateNo = state;
                
                const result = await axios.get(`/api/product/AdminProductList?pg=${this.pageNo}&showCnt=${this.productsPerPage}&state=${state}`);
                if(result.status == 200) {
                    this.adminProductList = result.data.selectResult;
                    this.page = result.data.pageDTO;
                }   
                this.$hideLoading();
                for(let product of this.adminProductList) {
                    product.selected = false;
                }
            },
            //중분류가 선택되지 않았을때 전체조회 method로 공개상태를 인수로 보냄
            async getAdminProductListFilter(sendObj) {
                if(sendObj.categoryArray == -1){
                    this.getAdminProductList2(sendObj.publicStateNo);
                    return;
                }
                let result = '';
                
                try {
                    result = await axios.post(
                        `/api/product/AdminProductList`, sendObj
                    );
                 
                } catch (e) {
                    console.log(e);
                }
               this.adminProductList = result.data;
            },
            //상품이름으로 검색
            async adminProductSearchName() {
                let result = '';
                try {
                    result = await axios.get(`/api/product/adminProductSearchName/${this.search}`)
                    console.log('상품이름검색 :', result);

                } catch (e) {
                    console.log(e);
                }

                this.adminProductList = result.data;
            },

            
       
          
            updateProductsPerPage(target) {
                this.currentPage = 1;
            },
        }
    }
</script>

<style scoped>
    .product-toolbar {
        display: flex;
        justify-content: space-between;
        background-color: #5f5f5f;
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
        border: 2px solid #bbbbbb;
    }

    th {
        border: 2px solid #bbbbbb;
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