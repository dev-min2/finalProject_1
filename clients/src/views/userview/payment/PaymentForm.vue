<template>
    <div class="container">
        <div class="row g-5">
            <!--쿠폰 모달창-->
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel"> 사용하실 쿠폰을 선택해주세요 </h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <p style="color:red;line-height: 1.8;">쿠폰을 사용할 경우 부분취소를 할 수 없습니다.</p>
                            <select name="coupon" v-model="coupon" class="form-select" >
                                <option disabled value="">쿠폰을 선택해주세요</option>
                                <option value="coupon"> 쿠폰 취소 </option>
                                <option :key="i" :value="coupon"  v-for="(coupon, i) in selectMyCouponQuery">
                                   <div style="display:none;"> {{coupon.my_coupon_no}} </div>
                                   [ {{coupon.coupon_name}} ]    할인율: {{coupon.discount_pct}} % 
                                    | 발급 : {{this.$dateFormat(coupon.receive_date)}} ~ 만료: {{this.$dateFormat(coupon.expire_date)}}
                                </option>
                            </select>
                        </div>
                        <div class="modal-footer">
                            <button type="button" @click="CouponBtn()" class="btn btn-primary" data-bs-dismiss="modal">확인</button>
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
                        </div>
                    </div>
                </div>
            </div>
            <!--장바구니 폼-->
            <div class="col-md-5 col-lg-4 order-md-last">
                <h4 class="d-flex justify-content-between align-items-center mb-3">
                    <span class="text-primary" style="color:gray;"> 장바구니</span>
                    <span class="badge bg-primary rounded-pill" style="background-color: #fab3cc;">{{totalCount}}</span>
                </h4>
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

                    <li class="list-group-item d-flex justify-content-between bg-body-tertiary">
                        <div >
                            <h6 id="discount" style="color:red;">할인율</h6>
                        </div>
                        <span style="color:red;"> - {{couponPrice}} 원 </span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between bg-body-tertiary">
                        <div class="text-success">
                            <h6 class="my-0" id="fee">배송비</h6>
                        </div>
                        <span class="text-success"> {{totalDelivery}} 원 </span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between">
                        <span>총 결제금액</span>
                        <strong id="priceTag">{{ realTotalPrice }}원</strong>
                    </li>
                </ul>

                <form class="card p-2">
                    <div class="input-group">
                        <input type="text" class="form-control" placeholder="" id="couponNameBox"
                            style="font-size:10px;" v-model="couponName" >
                        <button type="button" class="btn btn-secondary" data-bs-toggle="modal"
                            data-bs-target="#exampleModal" data-target="#couponmodal" >쿠폰선택</button>
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
                            <input type="text" class="form-control" id="firstName" v-model="selectUserQuery.user_name"
                                readonly>
                        </div>

                        <div class="col-12">
                            <label for="email" class="form-label"> 주문자 이메일 
                                <span class="text-muted">(Optional)</span>
                            </label>
                            <input type="email" class="form-control" id="email" v-model="selectUserQuery.user_email" readonly>
                        </div>

                        <div class="col-12">
                            <label for="phone" class="form-label">주문자 연락처</label>
                            <input type="text" class="form-control" id="phone" v-model="selectUserQuery.user_phone" readonly>
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
                            <input type="text" v-model="receiverName" class="form-control" id="firstName"
                                placeholder="이름을 입력해주세요" required>
                            <div class="invalid-feedback">
                                이름 입력해주세요.
                            </div>
                        </div>

                        <div class="col-12">
                            <label for="address" class="form-label">주소</label>
                            <input type="text" v-model="receiverAddr" class="form-control" id="address"
                                placeholder="주소를 입력해주세요" value="" required>
                        </div>

                        <div class="col-12">
                            <label for="phone" class="form-label">연락처</label>
                            <input type="text" v-model="receiverPhone" class="form-control" id="phone"
                                placeholder="연락처를 입력해주세요" value="c" required>
                        </div>

                        <div class="col-12">
                            <label for="requestDelivery" class="form-label">배송 요청사항</label>
                            <select name="delivery" v-model="deliveryRequest" class="form-select">
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
                            <input type="radio" v-model="selectPayment" @change="Paymentmethod" value="credit"
                                name="paymentMethod" class="form-check-input" checked required>
                            <label class="form-check-label" for="credit">신용카드</label>
                        </div>
                    </div>

                    <div class="my-3">
                        <div class="form-check">
                            <input type="radio" v-model="selectPayment" @change="Paymentmethod" value="toss"
                                name="paymentMethod" class="form-check-input" required>
                            <label class="form-check-label" for="credit">토스페이</label>
                        </div>
                    </div>
                    <div class="my-3">
                        <div class="form-check">
                            <input type="radio" v-model="selectPayment" @change="Paymentmethod" value="kakao"
                                name="paymentMethod" class="form-check-input" required>
                            <label class="form-check-label" for="credit">카카오페이</label>
                        </div>
                    </div>

                    <hr class="my-4">

                    <div class="form-check">
                        <input type="checkbox" class="form-check-input" v-model="orderCheck">
                        <label class="form-check-label" for="confirmPayment">위 주문 내용을 확인하였으며 결제에 동의합니다.</label>
                    </div>

                    <hr class="my-4">
                    <button @click="PaymentBtn" class="w-100 btn btn-primary btn-lg" id="paymentBtn"
                        style="background-color: #fab3cc;border-style:none;">결제하기</button>
                    <hr>
                </div>
            </div>
            <!--주문 폼 끝-->
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    var IMP = window.IMP; //결제 IMP
    IMP.init('imp04630170'); //가맹점 식별코드

    export default {
        data() {
            return {
                cartData: [], //장바구니에서 선택한 상품번호 넘겨받기
                deliveryData: [], //업체별 배송비

                userNo: '',
                selectCartQuery: [], //장바구니 목록
                selectMyCouponQuery: [], //내 쿠폰 목록
                selectUserQuery: [], //회원정보
                testCartQuery: [], //카트 테스트 (수정할 것!!)

                //결제관련 정보
                coupon:'', // 쿠폰 정보
                couponNo: null, //사용 쿠폰 번호
                couponName:'',
                couponPercent: 0, //선택한 쿠폰 퍼센트 / ex)10
                selectPayment: 'html5_inicis', //결제방식
                orderCheck: '', //주문동의 확인

                //총금액, 수량, 배송비, 쿠폰사용금액
                totalPrice: 0,
                totalCount: 0,
                delivery: 0, //각각 배송비
                couponPrice: 0, //할인 금액
                realTotalPrice: 0, //진짜 결제 금액
                totalDelivery: 0, //업체별 배송비 합계
                //주문정보
                deliveryRequest: '',
                userEmail: '',
                receiverName: '',
                receiverPhone: '',
                receiverAddr: '',
                receiverPostcode: '',
                orderNo: 0, //주문번호
                orderDate: '', //주문날짜
                orderProduct: '', //주문품목
                impUid: 0,
            }
        },
        async created() {
            //장바구니 데이터 넘겨받기
            this.cartData = this.$route.query[0];
            this.deliveryData = this.$route.query[1];
            this.userNo = this.$store.state.userNo;

            //주문자정보, 장바구니, 쿠폰 / 배송지정보
            await this.getUserInfo();
            this.receiverName = this.selectUserQuery.user_name;
            this.receiverPhone = this.selectUserQuery.user_phone;
            this.receiverAddr = this.selectUserQuery.user_addr;
            this.userEmail = this.selectUserQuery.user_email;

            //결제 데이터
            this.total();
            this.orderInfo();
        },
        methods: {
            //데이터 만들기 테스트용 (html 버튼과 함수 둘 다 삭제할 것!!!)
            TestBtn: async function () {
                console.log(this.coupon);
                console.log(this.couponPercent);
                console.log('쿠폰번호', this.couponNo);
            },
            //쿠폰 적용버튼
            CouponBtn : async function(){
                if( this.coupon.discount_pct == undefined){
                    this.couponPercent = 0;
                }else {
                    this.couponPercent = this.coupon.discount_pct;
                }
                this.couponNo = this.coupon.my_coupon_no; //사용한 쿠폰 번호
                this.couponName = this.coupon.coupon_name;                
                this.couponPrice = this.totalPrice * this.couponPercent/100;
                this.realTotalPrice = this.totalPrice + this.totalDelivery - this.couponPrice;
                if(this.coupon.my_coupon_no === undefined ){
                    this.couponNo = null; //쿠폰 사용 안할 경우
                }
                console.log('할수잇당',this.coupon);
                console.log('퍼센트',this.couponPercent);
                console.log(this.coupon.my_coupon_no)
                console.log('쿠폰번호', this.couponNo);
                // if(this.couponPercent = 0){
                //     this.my_coupon_no = '';

                // }
            },
            //회원 장바구니, 쿠폰리스트, 회원정보 가져오기
            async getUserInfo() {
                let url = `/api/product/paymentform?userNo=${this.userNo}&`;

                let length = Object.keys(this.cartData).length;
                let i = 0;
                for (const object in this.cartData) {
                    if (i == length - 1) {
                        url += `cno=${this.cartData[object]}`;
                    } else {
                        url += `cno=${this.cartData[object]}&`;
                    }
                    ++i;
                }
                let result = await axios.get(url)
                    .catch(err => console.log(err));
                this.selectUserPaymentQuery = result.data;
                //0 장바구니, 1 쿠폰, 2 회원정보 //각각 변수에 담기
                this.selectCartQuery = this.selectUserPaymentQuery[0];
                this.selectMyCouponQuery = this.selectUserPaymentQuery[1];
                this.selectUserQuery = this.selectUserPaymentQuery[2];
            },
            //금액 계산 / 총 금액, 총 수량, 배송비
            total() {
                //총 배송비
                for (const i in this.deliveryData) {
                    this.totalDelivery += Number(this.deliveryData[i]);
                }
                for (let i = 0; i < this.selectCartQuery.length; i++) { // 총 금액, 총 수량
                    this.totalPrice += this.selectCartQuery[i].price_sum;
                    this.totalCount += this.selectCartQuery[i].product_sel_cnt;
                }
                this.realTotalPrice += this.totalPrice + this.totalDelivery;
            },
            //결제방식 선택
            Paymentmethod: function () {
                if (this.selectPayment == "kakao") {
                    this.selectPayment = 'kakaopay';
                } else if (this.selectPayment == "credit") {
                    this.selectPayment = 'html5_inicis';
                } else {
                    this.selectPayment = 'tosspay';
                }
            },
            //주문번호, 주문날짜 , 주문품목 생성 (~포함 총 n건)
            orderInfo() {
                this.orderNo = String(new Date().getTime()) + this.userNo;
                this.orderDate = this.$dateFormat(new Date());
                if (this.selectCartQuery.length > 1) {
                    this.orderProduct = this.selectCartQuery[0].product_name + ' 포함 총 ' + this.selectCartQuery.length + '건';
                } else if (this.selectCartQuery.length == 1) {
                    this.orderProduct = this.selectCartQuery[0].product_name; //단건주문
                } else {
                    //this.$router.push({ path: '/main'});//장바구니 비어있음 > 메인으로 이동
                    //this.$showWarningAlert('장바구니가 비어있습니다.');
                }
            },
            //결제 완료 데이터 처리
            async getPaymentInfo() {
                //payment 테이블
                let paymentObj = {
                    payment_no: this.orderNo,
                    user_no: this.userNo,
                    payment_product: this.orderProduct,
                    my_coupon_no: this.couponNo,
                    payment_sub_unique_no: this.impUid, //imp_uid,
                    payment_date: this.orderDate,
                    payment_amount: this.totalPrice,
                    payment_discount_amount: this.couponPrice, 
                    real_payment_amount: this.realTotalPrice,
                    order_state: 'C1', //기본적으로 주문완료상태
                    total_product: this.totalCount,
                    total_delivery_fee: this.totalDelivery,
                    receiver_phone: this.receiverPhone,
                    receiver_name: this.receiverName,
                    receiver_addr: this.receiverAddr,
                    receiver_postcode: this.receiverPostcode,
                    delivery_request: this.deliveryRequest
                };

                const cart = this.groupBy(this.selectCartQuery, 'user_no');
                this.testCartQuery = cart;

                let paymentData = [];
                for (let object in this.testCartQuery) {
                    let companyDelivery = 0;
                    let fee = 0;
                    //업체별 합계 > 배송비 계산
                    for (let i = 0; i < this.testCartQuery[object].length; i++) {
                        companyDelivery += this.testCartQuery[object][i].price_sum;
                    }
                    if (companyDelivery >= 30000) {
                        fee = 0;
                    } else {
                        fee = 3000;
                    }
                    console.log(object, '번 ', companyDelivery);
                    //payment_product에 데이터 넣어주기
                    for (let i = 0; i < this.testCartQuery[object].length; i++) {
                        let cartProduct = {
                            payment_no: this.orderNo,
                            product_no: this.testCartQuery[object][i].product_no,
                            buy_cnt: this.testCartQuery[object][i].product_sel_cnt,
                            payment_amount: this.testCartQuery[object][i].price_sum,
                            payment_discount_amount: this.testCartQuery[object][i].price_sum * this.couponPercent/100,
                            real_payment_amount: this.testCartQuery[object][i].price_sum - this.testCartQuery[object][i].price_sum * this.couponPercent/100,
                            delivery_state: 'C1',
                            delivery_fee: fee
                        };
                        paymentData.push(cartProduct);
                    }
                }

                let userNo = this.userNo;
                let cartNo = this.cartData;
                let couponNo = this.couponNo;
                const sendObj = {
                    param: {
                        paymentObj: paymentObj,
                        paymentData: paymentData,
                        userNo: userNo,
                        cartNo: cartNo,
                        couponNo: couponNo
                    }
                }
                this.$showLoading();
                let result = await axios.post("/api/product/payment", sendObj)
                    .catch(err => console.log(err));
                console.log('결제완료', result);
                this.$hideLoading();
                return result.data;
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
            //결제 버튼 클릭
            PaymentBtn: function () {
                //결제 동의 체크박스 확인
                if (this.orderCheck == false) {
                    this.$showWarningAlert('결제 동의란을 확인하고 체크해주세요. ');
                    return;
                }

                //주문번호, 주문날짜 , 주문품목 데이터 불러오기
                this.orderInfo();

                //IMP 결제정보 담기
                let paymentInfo = {
                    pg: this.selectPayment, //결제방식
                    pay_method: "card",
                    merchant_uid: this.orderNo, //주문번호
                    name: this.orderProduct, //주문품목
                    amount: this.realTotalPrice,
                    buyer_email: this.userEmail,
                    buyer_name: this.receiverName,
                    buyer_tel: this.receiverPhone,
                    buyer_addr: this.receiverAddr,
                    buyer_postcode: this.receiverPostcode
                };

                //결제 넘기기
                const myThis = this;
                IMP.request_pay(paymentInfo, async rsp => { // callback
                    if (rsp.success) {
                        //결제완료 페이지에 넘길 정보
                        let paymentDetail = {
                            product: myThis.orderProduct,
                            orderNo: myThis.orderNo,
                            orderDate: myThis.orderDate,
                            orderPrice: myThis.realTotalPrice
                        }
                        //주문 DB저장, 장바구니 비우기
                        myThis.impUid = rsp.imp_uid;
                        const result = await this.getPaymentInfo();
                        console.log('ProductService에서 넘겨받은' ,result);
                        if (result == true){
                            myThis.$router.push({
                                name: 'paymentcomplete',
                                query: paymentDetail
                            }); //주문완료 페이지 이동
                        }
                        else{
                            myThis.$showWarningAlert('결제 실패');
                            //결제 환불 (수정하기)

                        }
                    } else {
                        myThis.$showWarningAlert('결제 실패');
                        console.log("결제 실패");
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .modal-dialog {
        max-width: 55%;
    }

</style>