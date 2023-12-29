<template>
    <div class="container">
        <div class="row g-5">
            <!--장바구니 폼-->
            <div class="col-md-5 col-lg-4 order-md-last">
                <h4 class="d-flex justify-content-between align-items-center mb-3">
                    <span class="text-primary">장바구니</span>
                    <span class="badge bg-primary rounded-pill">총금액</span>
                </h4>
                <ul class="list-group mb-3" id="pList">
                    <div :key="i" v-for="(cart, i) in selectCartQuery">
                        <li class="list-group-item d-flex justify-content-between lh-sm">
                            <div>
                                <input type="hidden" value="${cart.productNo }" class="prInfo"> <!-- productNo캐싱용 -->
                                <h6 class="my-0">{{cart.product_name}}</h6>
                                <small class="prSel">{{cart.product_sel_cnt}}</small><small>개</small>
                            </div>
                            <span class="text-muted">$ {{cart.price_sum}}</span>
                        </li>
                    </div>
                    <!-- 
                    <c:if test="${!empty addrFee }"> -->
                        <li class="list-group-item d-flex justify-content-between bg-body-tertiary">
                            <div class="text-success">
                                <h6 class="my-0" id="fee">배송비</h6>
                            </div>
                            <span class="text-success">2500원</span>
                        </li>
                    <!-- </c:if> -->
                    <li class="list-group-item d-flex justify-content-between">
                        <span>총 결제금액</span>
                        <strong id="priceTag">$총가격 원</strong>
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
                <form class="needs-validation" novalidate>
                    <!--주문자정보-->
                    <div class="row g-3">
                        <div class="col-12">
                            <h2>주문자 정보</h2>
                            <hr>
                        </div>

                        <div class="col-12">
                            <label for="firstName" class="form-label"> 주문자 이름</label>
                            <input type="text" class="form-control" id="firstName" placeholder=""
                                value="이름넣기" required>
                            <div class="invalid-feedback">
                                주문자이름
                            </div>
                        </div>

                        <div class="col-12">
                            <label for="email" class="form-label"> 주문자 이메일 <span class="text-muted">(Optional)</span></label>
                            <input type="email" class="form-control" id="email" placeholder="you@example.com"
                                value="${userInfo.userMail }">
                            <div class="invalid-feedback">
                                Please enter a valid email address for shipping updates.
                            </div>
                        </div>

                        <div class="col-12">
                            <label for="phone" class="form-label">주문자 연락처</label>
                            <input type="text" class="form-control" id="phone" placeholder=""
                                value="${userInfo.userPhone }" required>
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
                            <input type="text" class="form-control" id="firstName" placeholder=""
                                value="${userInfo.nickName }" required>
                            <div class="invalid-feedback">
                                이름 입력해주세요.
                            </div>
                        </div>

                        <div class="col-12">
                            <label for="address" class="form-label">주소</label>
                            <input type="text" class="form-control" id="address" placeholder=""
                                value="${userInfo.userAddr }" required>
                            <div class="invalid-feedback">
                                주소 입력해주세요.
                            </div>
                        </div>

                        <div class="col-12">
                            <label for="phone" class="form-label">연락처</label>
                            <input type="text" class="form-control" id="phone" placeholder=""
                                value="${userInfo.userPhone }" required>
                            <div class="invalid-feedback">
                                연락처 입력해주세요.
                            </div>
                        </div>

                        <div class="col-12">
                            <label for="requestDelivery" class="form-label">배송 요청사항</label>
                            <select name="delivery" class="form-control" id="requestDelivery">
                                <option value="" disabled selected>배송 요청 사항을 선택하세요</option>
                                <option value="배송 전 연락바랍니다.">배송 전 연락바랍니다.</option>
                                <option value="부재시 휴대전화로 연락주세요.">부재시 휴대전화로 연락주세요.</option>
                                <option value="부재시 경비실에 맡겨주세요.">부재시 경비실에 맡겨주세요.</option>
                                <option value="부재시 문앞에 놓아주세요.">부재시 문앞에 놓아주세요.</option>
                            </select>
                        </div>
                    </div>
                    <hr class="my-4">

                    <!--결제수단-->
                    <h4 class="mb-3">결제수단</h4>

                    <div class="my-3">
                        <div class="form-check">
                            <input id="credit" name="paymentMethod" type="radio" class="form-check-input" checked
                                required>
                            <label class="form-check-label" for="credit">신용카드</label>
                        </div>
                    </div>

                    <div class="my-3">
                        <div class="form-check">
                            <input id="toss" name="paymentMethod" type="radio" class="form-check-input" required>
                            <label class="form-check-label" for="credit">토스페이</label>
                        </div>
                    </div>

                    <div class="my-3">
                        <div class="form-check">
                            <input id="kakao" name="paymentMethod" type="radio" class="form-check-input" required>
                            <label class="form-check-label" for="credit">카카오페이</label>
                        </div>
                    </div>

                    <hr class="my-4">

                    <div class="form-check">
                        <input type="checkbox" class="form-check-input" id="confirmPayment">
                        <label class="form-check-label" for="confirmPayment">위 주문 내용을 확인하였으며 결제에 동의합니다.</label>
                    </div>

                    <hr class="my-4">

                    <button class="w-100 btn btn-primary btn-lg" id="paymentBtn">결제하기</button>
                </form>
            </div>
            <!--주문 폼 끝-->
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        data(){
            return {
                userNo : '',
                selectCartQuery : []
            }
        },
        created(){
            this.userNo = this.$store.state.userNo;
            this.getSelectCartQuery();
        },
        methods: {
            //장바구니 가져오기
            async getSelectCartQuery(){
                console.log('할수잇다 ',this.userNo);
                //this.$showLoading();
                let result 
                    = await axios.get(`/api/product/paymentform/${this.userNo}`)
                                .catch(err => console.log(err));
                this.selectCartQuery = result.data;
                //this.$hideLoading();
            }

        }
    }
</script>

<style>

</style>