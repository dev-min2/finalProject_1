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
                                        <p>{{$printPriceComma(product.product_price)}}원 {{product.buy_cnt}}개</p>
                                    </div>
                                    <div>
                                        <h5 class="mx-4" style="display:inline-block;">{{$getSubCodeName(product.delivery_state)}}</h5>
                                    </div>
                                    <div>
                                        <!--테스트
                                        -->
                                        <button @click="testBtn(objectIdx)" class="btn btn-primary" style="background-color: #bbbbbb; border: none; margin : 5px;">테스트</button>
                                        <br>
                                        <!---->
                                        <div name="reviewBtn" v-if= "product.delivery_state == 'C1' && myCouponNo == null" >
                                            <button class="btn btn-primary" style="background-color: #fab3cc; border: none; margin : 5px;"><router-link :to="{ path: '/myreview/write/${this.reviewBoardInfo/${this.product_no}}', params : {reviewBoardInfo : this.reviewBoardInfo, product_no : this.reviewBoardInfo.product_no}}" >후기작성</router-link></button>
                                            <button class="btn btn-primary" @click="cancelSelectPayment(product)" style="background-color: #acb1f8; border: none; margin : 5px;">주문취소</button>
                                        <!--주문취소상태일 경우 리뷰버튼 비활성화-->
                                        </div>
                                        <div name="reviewBtn" v-else-if= "product.delivery_state == 'C5'">
                                            <button disabled class="btn btn-primary" style="background-color: #bbbbbb; border: none; margin : 5px;">후기작성</button>
                                            <button disabled class="btn btn-primary" style="background-color: #bbbbbb; border: none; margin : 5px;">환불완료</button>
                                        </div>
                                        <!--쿠폰사용했을 경우 부분취소 불가능-->
                                        <div name="reviewBtn" v-else>
                                            <button class="btn btn-primary" style="background-color: #fab3cc; border: none; margin : 5px;">후기작성</button>
                                            <button disabled class="btn btn-primary" @click="cancelSelectPayment(product)" style="background-color: #bbbbbb; border: none; margin : 5px;">주문취소</button>
                                        </div>

                                    </div>
                                </div>
                            </li>
                        </ul>
                        <hr style="border: 1px solid black;">

                    </li>
                </ul>
            </div>
            <!--주문취소버튼 주문 상태에 따라 다르게-->
            <div v-if= "orderBtn == true">
                <div class="d-flex justify-content-center mt-5">
                    <button class="btn btn-primary" @click="cancelAllPayment()" style="background-color:#acb1f8; color:white; border:none; height:60px;">전체 상품 주문 취소</button>        
                </div>
            </div>
            <div v-else>
                <div class="d-flex justify-content-center mt-5">
                    <button disabled class="btn btn-primary" style="background-color:#bbbbbb; color:white; border:none; height:60px;">주문 취소 불가능</button>        
                </div>
            </div>
            <div class="d-flex justify-content-center mt-2">
                <p style="color:gray;"> 주문취소는 모든 주문이 [주문완료] 상태이거나 쿠폰을 사용하지 않았을 경우에만 가능합니다.</p>
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
                        <td style="color:red;">{{$printPriceComma(paymentDiscountPrice)}}원</td>
                    </tr>
                    <tr>
                        <th>배송비</th>
                        <td>{{$printPriceComma(totalDeliveryFee)}}원</td>
                    </tr>
                    <tr>
                        <th>환불금액</th>
                        <td>{{$printPriceComma(Number(refundPrice))}}원</td>
                    </tr>
                    <tr>
                        <th>실결제금액</th>
                        <td>{{$printPriceComma(realPaymentPrice)}}원</td>
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
    import axios from 'axios';

    export default {
        data() {
            return {
                test: '...',
                paymentList : [], //주문내역
                paymentProductsList : [], //상세품목 전체
                paymentProductsListByCompany : {}, //상세내역 업체별로 분류

                orderBtn : true,
                
                //주문정보
                sellerNo:'',
                userNo:'',
                impNo: '',
                paymentNo : '',
                accessToken:'',

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
                refundPrice : 0,

                //배송정보
                receiverName : '',
                receiverPhone : '',
                receiverAddr : '',
                receiverPostCode : '',
                deliveryRequest : '',
                reviewBoardInfo : { 
				content : '',
				star_cnt : '',
				product_no : '',
				html : null
			},
            }
        },
        async created() {
            this.userNo = this.$store.state.userNo;
            this.paymentNo = this.$route.query.paymentNo;
            this.reviewBoardInfo = this.$route.params.reviewBoardInfo;
            
            await this.getSelectPayment();
            await this.getSelectPaymentDetail();
            this.orderBtnStatus();
        },
        methods : {
            //부분주문취소 테스트 버튼
            testBtn: function(sellerNo){
                console.log(this.paymentProductsListByCompany);
                let productsListByCompany = this.paymentProductsListByCompany;
            },
           
            //버튼 비활성화 체크
            orderBtnStatus(){
                for(let company in this.paymentProductsList){
                    if(this.paymentProductsList[company].delivery_state != 'C1'){
                        this.orderBtn = false;
                    }
                }  
            },
            //주문전체정보 가져오기(payment)
            async getSelectPayment(){
                //모두 C1일 때만 취소 가능하게 수정
                let result 
                    = await axios.get(`/api/product/paymentdetail/all/${this.paymentNo}`)
                                .catch(err => console.log(err));
                console.log(result);
                this.paymentList = result.data;
                let payment = this.paymentList[0];
                console.log('할수잇당',payment.refund_price);

                //주문정보
                this.impNo = payment.payment_sub_unique_no;
                this.orderState = payment.order_state;
                this.myCouponNo = payment.my_coupon_no;
                // if(this.myCouponNo != null){
                //     this.orderBtn = false;
                // }
                this.paymentDate = payment.payment_date;
                this.paymentProduct = payment.payment_product;
                this.totalProductCnt = payment.total_product;

                //결제정보
                this.paymentPrice = payment.payment_amount;
                this.paymentDiscountPrice = payment.payment_discount_amount;
                this.totalDeliveryFee = payment.total_delivery_fee;
                this.realPaymentPrice = payment.real_payment_amount;
                this.refundPrice = payment.refund_price;
                if(payment.refund_price= null){
                    this.refundPrice = 0;
                }
                console.log(this.refundPrice);

                //배송정보
                this.receiverName = payment.receiver_name;
                this.receiverPhone = payment.receiver_phone;
                this.receiverAddr = payment.receiver_addr;
                this.receiverPostCode = payment.receiver_postcode;
                this.deliveryRequest = payment.delivery_request;
                console.log('test');
                console.log(this.myCouponNo);
                
		    },
            //주문상세내역 전체 가져오기, 업체별로 분류
            async getSelectPaymentDetail(){
                let result 
                    = await axios.get(`/api/product/paymentdetail/${this.paymentNo}`)
                                .catch(err => console.log(err));
                this.paymentProductsList = result.data;
                //업체별로 분류
                const company = this.groupBy(this.paymentProductsList, 'user_no');
                this.paymentProductsListByCompany = company;
                console.log('업체별로', this.paymentProductsListByCompany);
		    },
            //전체 주문취소
            async cancelAllPayment(){
                this.$showLoading();

                let productsListByCompany = this.paymentProductsListByCompany;
                for (let companyName in productsListByCompany) {
                   for(let i in productsListByCompany[companyName]){
                        if(productsListByCompany[companyName][i].delivery_state != 'C1'){
                            this.orderBtn = false;
                            this.$showFailAlert('전체 주문 취소가 불가능합니다');
                            this.$hideLoading();
                            return;
                        }
                   }
                }
                //api에 보낼 정보
                let paymentNo = this.paymentNo;
                let impUid = this.impNo;
                let cancelRequestAmount = this.realPaymentPrice;
                let cancelableAmount = this.realPaymentPrice;

                const sendObj = {
                     param: {
                        paymentNo: paymentNo,
                        impUid: impUid,
                        cancelRequestAmount: cancelRequestAmount,
                        cancelableAmount: cancelableAmount,
                    }
                }

                //아임포트 결제취소 성공하면> DB 주문상태 변경
                if (confirm("정말 취소하시겠습니까?") == true){
                    let result = await axios.post(`/api/product/paymentdetail/cancel`, sendObj)
                                            .catch(err=>console.log(err));
    
                    if(result.data.affectedRows > 0){
                        this.$showSuccessAlert('전체 주문이 취소되었습니다. ');
                    }else{
                        this.$showFailAlert('주문이 취소되지 않았습니다. ');
                    }
                    this.$router.go(this.$router.currentRoute); //새로고침
                }
                else{   //취소
                    this.$showFailAlert('','선택한 상품의 주문이 취소되지 않았습니다. ');
                }
                this.$hideLoading();
            },
            //일부 상품 주문 취소
            async cancelSelectPayment(product){
                //api에 보낼 정보
                let sellerNo = product.user_no;
                let paymentProductNo = product.payment_product_no;
                let paymentNo = this.paymentNo;
                let impUid = this.impNo;

                 const sendObj = {
                     param: {
                        //업체별 합계, 선택상품 계산, API
                        sellerNo: sellerNo,
                        paymentNo: paymentNo,
                        impUid: impUid,
                        paymentProductNo :paymentProductNo
                    }
                }
                
                if (confirm("정말 취소하시겠습니까?") == true){    //확인
                    this.$showLoading();
                    console.log(paymentProductNo);
                    let result = await axios.post(`/api/product/paymentdetail/cancelselect/`, sendObj)
                                            .catch(err=>console.log(err));
                    console.log(result);
                    if(result.data == true){
                        this.$showSuccessAlert('','선택한 상품의 주문이 취소되었습니다. ');
                        this.orderBtnStatus();
                    }else{
                        this.$showFailAlert('','선택한 상품의 주문이 취소되지 않았습니다. ');
                    }
                    this.$hideLoading();
                    
                }else{   //취소
                    this.$showFailAlert('','선택한 상품의 주문이 취소되지 않았습니다. ');
                    
                    return;
                }
                this.$router.go(this.$router.currentRoute); //새로고침
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
        },
       
    }
</script>

<style scoped>
   .reviewBtn{
        display : flex;
        flex-direction: column;
        padding-bottom: 0.5em;
    }
     /* 
    #deliveryDetail{
        display : flex;
        justify-content: center;
    } */
    ul li {
        list-style: none;
    }
    ul {
        padding-left : 15px;
    }
</style>