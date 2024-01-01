<template>
    <div class="container">
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
                <tr :key="i" v-for="(product,i) in sellerProductList">
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
                sellerProductList: []
            };
        },
        created() {
            this.getMyProductList();
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
            }
        }
    }
</script>

<style>

</style>