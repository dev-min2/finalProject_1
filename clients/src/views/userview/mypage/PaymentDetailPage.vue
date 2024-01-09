<template>
    <div class="container my-5 ml-3" id="layoutSidenav_content">
        <div class="container">
            <div class="d-flex justify-content-between">
                <!-- 결제번호 -->
                <h3>주문번호 {{paymentNo}}</h3>
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
        <!---->
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
                                        <p>{{(product.product_price)}}원 {{product.buy_cnt}}개</p>
                                    </div>
                                    <div>
                                        <h5 class="mx-4" style="display:inline-block;" >{{product.delivery_state}}</h5>
                                    </div>
                                    <div>
                                        <button class="btn btn-primary" @click="cancelSelectPayment()" style="background-color: #fab3cc; border: none; margin : 5px;">후기작성</button>
                                        <br>
                                        <button class="btn btn-primary" style="background-color: #acb1f8; border: none; margin : 5px;">주문취소</button>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <hr style="border: 1px solid black;">

                    </li>
                </ul>
            </div>
            <!--주문취소버튼-->
            <div v-if= "orderState == 'C1'">
                <div class="d-flex justify-content-center mt-5">
                    <button class="btn btn-primary" @click="cancelAllPayment(paymentNo)" style="background-color:#acb1f8; color:white; border:none; height:60px;">전체 상품 주문 취소</button>        
                </div>
            </div>
            <div v-else>
                <div class="d-flex justify-content-center mt-5">
                    <button class="btn btn-primary"  style="background-color:#bbbbbb; color:white; border:none; height:60px;">주문 취소 불가능</button>        
                </div>
            </div>
            <div class="d-flex justify-content-center mt-2">
                <p style="color:gray;">주문취소는[주문완료] 상태일 경우에만 가능합니다.</p>
            </div>

            <!-- 주문 및 배송정보 -->
                        <div class="mt-5">
                <h4 class="text-left">결제정보</h4>
                <hr style="border: 1px solid black;">
                <table class="table">
                    <tr>
                        <th>주문번호</th>
                        <td>{{paymentNo}}</td>
                    </tr>
                    <tr>
                        <th>결제일시</th>
                        <td>{{this.$dateFormat(paymentDate)}}</td>
                    </tr>
                    <tr>
                        <th>주문금액</th>
                        <td>{{this.$printPriceComma(paymentPrice)}}원</td>
                    </tr>
                     <tr>
                        <th>할인금액</th>
                        <td style="color:red;">{{this.$printPriceComma(paymentDiscountPrice)}}원</td>
                    </tr>
                    <tr>
                        <th>배송비</th>
                        <td>{{this.$printPriceComma(totalDeliveryFee)}}원</td>
                    </tr>
                    <tr>
                        <th>결제금액</th>
                        <td>{{this.$printPriceComma(realPaymentPrice)}}원</td>
                    </tr>
                </table>
            </div>
            <div class="mt-5">
                <h4 class="text-left">배송정보</h4>
                <hr style="border: 1px solid black;">
                <table class="table">
                    <tr>
                        <th>받는분</th>
                        <td>{{receiverName}}</td>
                    </tr>
                    <tr>
                        <th>전화번호</th>
                        <td>{{receiverPhone}}</td>
                    </tr>
                    <tr>
                        <th>주소</th>
                        <td>{{receiverAddr}} {{receiverPostCode}}</td>
                    </tr>
                    <tr>
                        <th>요청사항</th>
                        <td>{{deliveryRequest}}</td>
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
                test: '...',
                paymentList : [],
                paymentProductsList : [], //주문내역 전체
                paymentProductsListByCompany : {}, //업체별로 분류

                //주문정보
                userNo:'',
                paymentNo : '',
                paymentSubNo : '',
                userNo : '',
                orderState : '',
                myCouponNo : '',
                paymentDate : '',
                paymentProduct : '',
                totalProductCnt : '',

                //금액
                paymentPrice : '',
                paymentDiscountPrice : '',
                totalDeliveryFee : '',
                realPaymentPrice : '',

                //배송정보
                receiverName : '',
                receiverPhone : '',
                receiverAddr : '',
                receiverPostCode : '',
                deliveryRequest : '',
            }
        },
         created() {
            this.userNo = this.$store.state.userNo;
            this.paymentNo = this.$route.query.paymentNo;
            
            this.getSelectPayment();
            this.getSelectPaymentDetail();
        },
        methods : {
            //주문전체정보 가져오기(payment)
            async getSelectPayment(){
			let result 
				= await axios.get(`/api/product/paymentdetail/all/${this.userNo}`)
							.catch(err => console.log(err));
			this.paymentList = result.data;
            let payment = this.paymentList[0];
            //주문정보
            this.orderState = payment.order_state;
            this.myCouponNo = payment.my_coupon_no;
            this.paymentDate = payment.payment_date;
            this.paymentProduct = payment.payment_product;
            this.totalProductCnt = payment.total_product;

            //결제정보
            this.paymentPrice = payment.payment_amount;
            this.paymentDiscountPrice = payment.payment_discount_amount;
            this.totalDeliveryFee = payment.total_delivery_fee;
            this.realPaymentPrice = payment.real_payment_amount;

            //배송정보
            this.receiverName = payment.receiver_name;
            this.receiverPhone = payment.receiver_phone;
            this.receiverAddr = payment.receiver_addr;
            this.receiverPostCode = payment.receiver_postcode;
            this.deliveryRequest = payment.delivery_request;
		    },

            //주문상세내역 전체 가져오기
            async getSelectPaymentDetail(){
                let result 
                    = await axios.get(`/api/product/paymentdetail/${this.paymentNo}`)
                                .catch(err => console.log(err));
                this.paymentProductsList = result.data;
                const company = this.groupBy(this.paymentProductsList, 'user_no');
                this.paymentProductsListByCompany = company;
		    },
            groupBy: function (data, key) {
                return data.reduce(function (carry, el) {
                    var group = el[key];
                    if (carry[group] === undefined) {
                        carry[group] = []
                    }
                    carry[group].push(el)
                    return carry
                }, {})
            },
            //전체 주문취소
            async cancelAllPayment(paymentNo){
            console.log(paymentNo);
            this.$showLoading();
            let result = await axios.put(`/api/product/paymentdetail/cancel/${this.paymentNo}`)
                                     .catch(err=>console.log(err));
            if(result.data.affectedRows > 0){
                this.$showSuccessAlert('전체 주문이 취소되었습니다. ');
            }else{
                this.$showFailAlert('취소에 실패했습니다. ');
            }
            this.$hideLoading();

            this.$router.push({ path: '/paymentdetail'});
            },
            //일부 주문 취소
            cancelSelectPayment(){

            }
         
            
        },
       
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