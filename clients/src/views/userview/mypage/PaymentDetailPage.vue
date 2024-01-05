<template>
    <div class="container my-5 ml-3" id="layoutSidenav_content">
        <div class="container">
            <div class="d-flex justify-content-between">
                <!-- 결제번호 -->
                <h1>주문번호 235235123662</h1>
                <p class="mt-4">
                    <span style="vertical-align: bottom;">
                        배송 또는 상품에 문제가 있나요? 
                        <router-link :to="'/main'" style="color:brown; text-decoration:none; font-weight:bold;">1:1문의 ></router-link>
                    </span>
                </p>
            </div>
            <hr style="border: 3px solid black;">
            <!-- 결제상품목록 -->
            <p class="text-left">결제 목록</p>
            <div class="mt-2 mb-4">
                <ul>
                    <li v-for="(companyName, objectIdx, idx) in paymentProductsListByCompany" :key="idx">
                        <!-- 업체명 -->
                        <h4>{{companyName[0].company_name}}</h4>
                        <ul class="mt-3">
                            <li v-for="(product, idx) in paymentProductsListByCompany[objectIdx]" :key="idx">
                                <div class="d-flex justify-content-between">
                                    <div>
                                        <!-- 상품명 가격 구매갯수-->
                                        <h5>{{product.product_name}}</h5>
                                        <p>{{$printPriceComma(product.product_price)}}원 {{product.buy_cnt}}개</p>
                                    </div>
                                    
                                    <div>
                                        <!-- 배송상태 및 후기작성등 버튼-->
                                        <h5 class="mx-4" style="display:inline-block;">배송완료</h5>
                                        <button class="btn btn-primary">후기작성</button>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <hr style="border: 1px solid black;">

                    </li>
                </ul>
            </div>
            <div class="d-flex justify-content-center mt-5">
                <button class="btn btn-primary" style="background-color:white; color:gray; border:1px solid gray; height:60px;">전체 상품 주문 취소</button>
            </div>
            <div class="d-flex justify-content-center mt-2">
                <p style="color:gray;">주문취소는[주문완료] 상태일 경우에만 가능합니다.</p>
            </div>

            <!-- 주문 및 배송정보 -->
            <div class="mt-5">
                <h4 class="text-left">주문정보</h4>
                <hr style="border: 1px solid black;">
                <table class="table">
                    <tr>
                        <th>주문번호</th>
                        <td>235235123662</td>
                    </tr>
                    <tr>
                        <th>보낸분</th>
                        <td>갓민교</td>
                    </tr>
                    <tr>
                        <th>결제일시</th>
                        <td>2024-01-05</td>
                    </tr>
                </table>
            </div>
            <div class="mt-5">
                <h4 class="text-left">배송정보</h4>
                <hr style="border: 1px solid black;">
                <table class="table">
                    <tr>
                        <th>받는분</th>
                        <td>박경석</td>
                    </tr>
                    <tr>
                        <th>전화번호</th>
                        <td>모름</td>
                    </tr>
                    <tr>
                        <th>주소</th>
                        <td>예담직업전문학교</td>
                    </tr>
                    <tr>
                        <th>요청사항</th>
                        <td>없음</td>
                    </tr>
                </table>
            </div>
        </div>

    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        data() {
            return {
                paymentNo : 0,
                paymentProductsListByCompany : {}
            }
        },
        methods : {

        },
        created() {
            this.paymentNo = this.$route.query.paymentNo;
            // 더미데이터
            this.paymentProductsListByCompany['다이소'] = [
                { company_name : "다이소", product_name : '칫솔', product_price : 50000, buy_cnt : 3 }, { company_name : "다이소", product_name : '치약', product_price : 20000, buy_cnt : 5 }
            ];
            this.paymentProductsListByCompany['예담직업전문학교'] = [
                { company_name : '예담직업전문학교',  product_name : '박경석', product_price : 30, buy_cnt : 1 }, { company_name : '예담직업전문학교', product_name : '강현진', product_price : 29, buy_cnt : 1 }
            ];
            this.paymentProductsListByCompany['한솥'] = [
                { company_name : '한솥', product_name : '치킨마요', product_price : 4900, buy_cnt : 1 }, { company_name : '한솥', product_name : '돈까스도련님', product_price : 6600, buy_cnt : 1 }
            ];

        }
    }
</script>

<style scoped>
    ul li {
        list-style: none;
    }
    ul {
        padding-left : 15px;
    }
</style>