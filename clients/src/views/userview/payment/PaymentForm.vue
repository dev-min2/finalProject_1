<template>
    <div class="container">
        <div class="row g-5">
            <!--장바구니 폼-->
            <div class="col-md-5 col-lg-4 order-md-last">
                <h4 class="d-flex justify-content-between align-items-center mb-3">
                    <span class="text-primary">장바구니</span>
                    <span class="badge bg-primary rounded-pill">{{totalCount}}</span>
                </h4>
                <h6>{{selectMyCouponQuery}}</h6>
                <ul class="list-group mb-3" id="pList">
                    <div :key="i" v-for="(cart, i) in selectCartQuery">
                        <li class="list-group-item d-flex justify-content-between lh-sm">
                            <div>
                                <input type="hidden" value="{{cart.product_no}}" class="prInfo"> <!-- productNo캐싱용 -->
                                <h6 class="my-0">{{cart.product_name}}</h6>
                                <small class="prSel">{{cart.product_sel_cnt}}</small><small>개</small>
                            </div>
                            <span class="text-muted">{{cart.price_sum}}원</span>
                        </li>
                    </div>
                    <!-- 
                    <c:if test="${!empty addrFee }"> -->
                        <li class="list-group-item d-flex justify-content-between bg-body-tertiary">
                            <div class="text-success">
                                <h6 class="my-0" id="fee">배송비</h6>
                            </div>
                            <span class="text-success"> {{delivery}} 원 </span>
                        </li>
                    
                    <!-- </c:if> -->
                    <li class="list-group-item d-flex justify-content-between">
                        <span>총 결제금액</span>
                        <strong id="priceTag">{{ totalPrice }}원</strong>
                    </li>
                </ul>

                <form class="card p-2">
                    <div class="input-group">
                        <input type="text" class="form-control" placeholder="" id="couponNameBox"
                            style="font-size:10px;">
                        <button type="button" class="btn btn-secondary" data-toggle="modal"
                            data-target="#couponmodal">쿠폰선택</button>
                    </div>
                </form>
            </div>
            <!--장바구니 폼 끝-->
            <!--주문 폼-->
            <div class="col-md-7 col-lg-8">
                <h3 class="mb-5">주문하기</h3>
                <div class="needs-validation" novalidate>
                    <!--주문자정보-->
                    <div class="row g-3">
                        <div class="col-12">
                            <h2>주문자 정보</h2>
                            <hr>
                        </div>

                        <div class="col-12">
                            <label for="firstName" class="form-label"> 주문자 이름</label>
                            <input type="text" class="form-control" id="firstName" placeholder=""
                                value="이름 불러오기" required>
                            <div class="invalid-feedback">
                                주문자이름
                            </div>
                        </div>

                        <div class="col-12">
                            <label for="email" class="form-label"> 주문자 이메일 <span class="text-muted">(Optional)</span></label>
                            <input type="email" class="form-control" id="email" placeholder="you@example.com"
                                value="$userInfo.userMail">
                            <div class="invalid-feedback">
                                Please enter a valid email address for shipping updates.
                            </div>
                        </div>

                        <div class="col-12">
                            <label for="phone" class="form-label">주문자 연락처</label>
                            <input type="text" class="form-control" id="phone" placeholder=""
                                value="$userInfo.userPhone" required>
                            <div class="invalid-feedback">
                                연락처 입력해주세요.
                            </div>
                        </div>
                    </div>
                    <hr class="my-4">
                    <br>

                    <!--배송지정보-->
                    <div class="row g-3">
                        <div class="col-12">
                            <h2>배송지 정보</h2>
                            <hr>
                        </div>

                        <div class="col-12">
                            <label for="firstName" class="form-label">이름</label>
                            <input type="text" v-model= "receiverName" class="form-control" id="firstName" placeholder="userName불러오기"
                                value="name" required>
                            <div class="invalid-feedback">
                                이름 입력해주세요.
                            </div>
                        </div>

                        <div class="col-12">
                            <label for="address" class="form-label">주소</label>
                            <input type="text" v-model= "receiverAddr" class="form-control" id="address" placeholder="userAddr불러오기"
                                value="" required>
                            <div class="invalid-feedback">
                                주소 입력해주세요.
                            </div>
                        </div>

                        <div class="col-12">
                            <label for="phone" class="form-label">연락처</label>
                            <input type="text" v-model= "receiverPhone" class="form-control" id="phone" placeholder="userTel불러오기"
                                value="c" required>
                            <div class="invalid-feedback">
                                연락처 입력해주세요.
                            </div>
                        </div>

                        <div class="col-12">
                            <label for="requestDelivery" class="form-label">배송 요청사항</label>
                            <select name="delivery" v-model= "deliveryRequest" class="form-select">
                                <option disabled value="">배송 요청 사항을 선택하세요</option>
                                <option value="배송 전 연락바랍니다.">배송 전 연락바랍니다.</option>
                                <option value="부재시 휴대전화로 연락주세요.">부재시 휴대전화로 연락주세요.</option>
                                <option value="부재시 경비실에 맡겨주세요.">부재시 경비실에 맡겨주세요.</option>
                                <option value="부재시 문앞에 놓아주세요.">부재시 문앞에 놓아주세요.</option>
                            </select>
                        </div>
                    </div>
                    <hr class="my-4">

                    <!--결제수단 선택-->
                    <h4 class="mb-3">결제수단</h4>
                    <div class="my-3">
                        <div class="form-check">
                            <input type="radio" v-model="selectPayment" @change="Paymentmethod" value="credit" name="paymentMethod" class="form-check-input" checked
                                required>
                            <label class="form-check-label" for="credit">신용카드</label>
                        </div>
                    </div>
                    
                    <div class="my-3">
                        <div class="form-check">
                            <input type="radio" v-model="selectPayment" @change="Paymentmethod" value="toss" name="paymentMethod" class="form-check-input" required>
                            <label class="form-check-label" for="credit">토스페이</label>
                        </div>
                    </div>
                    <div class="my-3">
                        <div class="form-check">
                            <input type="radio"  v-model="selectPayment"  @change="Paymentmethod" value="kakao" name="paymentMethod" class="form-check-input" required>
                            <label class="form-check-label" for="credit">카카오페이</label>
                        </div>
                    </div>

                    <hr class="my-4">

                    <div class="form-check">
                        <input type="checkbox" class="form-check-input" v-model="orderCheck">
                        <label class="form-check-label" for="confirmPayment">위 주문 내용을 확인하였으며 결제에 동의합니다.</label>
                    </div>

                    <hr class="my-4">
                    <button @click="PaymentBtn" class="w-100 btn btn-primary btn-lg" id="paymentBtn" >결제하기</button>
                    <hr><!--테스트버튼 나중에 지우기-->
                    <button @click="TestBtn" class="w-100 btn btn-primary btn-lg" id="test" >Test</button> 
                </div>
            </div>
            <!--주문 폼 끝-->
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    
    var IMP = window.IMP;  //결제 IMP
    IMP.init('imp04630170'); //가맹점 식별코드

    export default {
        data(){
            return {
                userNo : '',
                selectPayment : 'html5_inicis', //결제방식
                orderCheck:'', //주문동의 확인
                selectCartQuery : [], //장바구니 목록
                selectMyCouponQuery : [], //내 쿠폰 목록
                selectPayment: '', //결제수단
                //총금액, 수량, 배송비, 쿠폰사용금액
                totalPrice : 0, 
                totalCount: 0, 
                delivery : 0,
                couponPrice : 0,
                 //주문정보
                deliveryRequest : '',
                receiverName: '',
                receiverPhone: '',
                receiverAddr: '',
                orderNo: 0, //주문번호
                orderDate : '', //주문날짜
                orderProduct : '', //주문품목

            }
        },
        async created(){
            this.userNo = this.$store.state.userNo;
            //장바구니, 쿠폰
            await this.getSelectCartQuery();
            await this.getMyCouponQuery();

            //결제 데이터
            this.total();
            this.orderInfo();
        },
        // watch:{
        //     orderCheck(newValue,oldValue){
        //         console.log('watch',newValue);
        //     }
        // },
        methods: {
            //쿠폰 가져오기
            async getMyCouponQuery(){
                console.log('쿠폰 회원번호: ',this.userNo);
                //this.$showLoading();
                let result 
                    = await axios.get(`/api/product/paymentform/coupon/${this.userNo}`) 
                                .catch(err => console.log(err));
                this.selectMyCouponQuery = result.data;
                //this.$hideLoading();
                console.log('할수이따: ',this.selectMyCouponQuery);
            },
            //장바구니 가져오기
            async getSelectCartQuery(){
                this.$showLoading();
                let result 
                    = await axios.get(`/api/product/paymentform/${this.userNo}`)
                                .catch(err => console.log(err));
                this.selectCartQuery = result.data;
                this.$hideLoading();
                return 1;
            },
            //총 금액, 총 수량, 배송비, 
            total() {
                console.log('할수이따........(›´-`‹ )', this.selectCartQuery);

                for (let i = 0; i< this.selectCartQuery.length; i++){  // 총 금액, 총 수량
                    this.totalPrice += this.selectCartQuery[i].price_sum;
                    this.totalCount += this.selectCartQuery[i].product_sel_cnt;
                }
                if(this.totalPrice < 30000) { //배송비 추가: 3만원 이상 무료배송
                    this.delivery = 2500 ; 
                    this.totalPrice += this.delivery;
                    }
            },
             //결제방식 선택
            Paymentmethod: function(){
                if(this.selectPayment == "kakao"){
                    this.selectPayment = 'kakaopay';
                }else if(this.selectPayment == "credit"){
                    this.selectPayment = 'html5_inicis';
                }else {
                     this.selectPayment = 'tosspay';
                }
            },
            //데이터 만들기 테스트용 (html 버튼과 함수 둘 다 삭제할 것!!!)
            TestBtn: async function(){
                console.log('홧팅（っ ‘ ᵕ ‘ ｃ）');
                console.log('쫌만더하고자기: ', this.receiverName, '/', this.receiverAddr,'/', this.receiverPhone,'/' ,this.deliveryRequest );

                //주문품목 테스트
                console.log('졸리당: ', 
                    this.selectCartQuery[0].product_name + ' 포함 총 ' + this.selectCartQuery.length + '건');
                
                //결제 완료 데이터 처리 테스트
                let paymentObj = {
                        payment_no: this.orderNo, 
                        user_no: this.userNo, 
                        my_coupon_no: 2, //쿠폰 생성 후에 수정하기
                        payment_sub_unique_no: 0, //this.rsp.imp_uid,
                        payment_date: this.orderDate , 
                        payment_amount: this.totalPrice , 
                        payment_discount_amount: 0 , //쿠폰 생성 후에 수정하기
                        real_payment_amount: this.totalPrice , 
                        order_state: 'c1',
                        total_product: this.totalCount , 
                        total_delivery_fee: this.delivery, 
                        receiver_phone: this.receiverPhone , 
                        receiver_name: this.receiverName, 
                        receiver_addr: this.receiverAddr, 
                        delivery_request: this.deliveryRequest
                    
                };
                let paymentData = [];

                for (let i = 0; i < this.selectCartQuery.length; i++) {
                    let cartProduct = {
                        payment_no: this.orderNo, 
                        product_no: this.selectCartQuery[i].product_no, 
                        buy_cnt: this.selectCartQuery[i].product_sel_cnt, 
                        payment_amount: this.selectCartQuery[i].price_sum, 
                        payment_discount_amount: 0, 
                        real_payment_amount: this.selectCartQuery[i].price_sum, 
                        delivery_state: 'c1', 
                        delivery_fee: this.delivery 
                    };
                    //console.log(i,'번입니당:',cartProduct);
                    paymentData.push(cartProduct);
                    console.log('개별데이터',paymentData);
                }
                console.log('주문전체',paymentObj); 
                
                let userNo = this.userNo;
                const sendObj = {
                    param : {
                        paymentObj : paymentObj,
                        paymentData : paymentData,
                        userNo : userNo
                    }
                }
                let result = await axios.post("/api/product/paymentform", sendObj)
                                         .catch(err=>console.log(err));
                console.log('빠샤', result);
            
            },
            orderInfo(){
                //주문번호, 주문날짜 , 주문품목 생성 (~포함 총 n건)
                this.orderNo = String(new Date().getTime()) + this.userNo;
                this.orderDate = this.$dateFormat(new Date());
                if(this.selectCartQuery.length > 1 ){
                    this.orderProduct = this.selectCartQuery[0].product_name + ' 포함 총 ' + this.selectCartQuery.length + '건';
                } else if (this.selectCartQuery.length == 1){ 
                    this.orderProduct = this.selectCartQuery[0].product_name; //단건주문
                } else {
                    //상품정보 없음 > 메인으로 이동
                    this.orderProduct = '';
                }


            },

             //결제 버튼 클릭
            PaymentBtn: function(){ 
                //결제 동의 체크박스 확인
                if( this.orderCheck == false ) { 
                        this.$showWarningAlert('결제 동의란을 확인하고 체크해주세요. ');
                        return;
                }
                
                this.orderInfo();

                //IMP 결제정보 담기
                let paymentInfo = {
                    pg: this.selectPayment, //결제방식
                    pay_method: "card",
                    merchant_uid: this.orderNo, //주문번호
                    name: this.orderProduct, //주문품목
                    amount: this.totalPrice,
                    buyer_email: "funidea_woo@naver.com",
                    buyer_name: this.receiverName,
                    buyer_tel: this.receiverPhone,
                    buyer_addr: this.receiverAddr,
                };
            

                //결제 넘기기
                const myThis = this;
                IMP.request_pay(paymentInfo, rsp => { // callback
                    console.log(rsp);
                    if (rsp.success) {
                        //결제완료 페이지에 넘길 정보
                        let paymentDetail = { 
                            product: myThis.orderProduct,
                            orderNo: myThis.orderNo,
                            orderDate: myThis.orderDate
                        }
                        //주문 DB저장 여기서 (payment 추가, payment_product 추가, cart 비우기, coupon 상태 업데이트)

                        console.log('결제폼', rsp); //imp_uid, merchant_uid
                        console.log("결제 성공");
                        myThis.$router.push({ name : 'paymentcomplete', query: paymentDetail }); //주문완료 페이지 이동
                    } else {
                        myThis.$showWarningAlert('결제 실패');
                        console.log("결제 실패");
                    }
                });
            }
        }
    }
</script>

<style>

</style>