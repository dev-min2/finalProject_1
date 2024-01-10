<template>
  <div class="px-4 py-1 my-5 text-center">
		<h4 class="fw-bold text-body-emphasis mb-3">구매가 정상적으로 완료되었습니다!</h4>
    <div class="d-flex justify-content-center">
    	<hr class="w-50">
    </div>
    <div class="col-lg-6 mx-auto">
      <div class="d-grid gap-6 d-sm-flex justify-content-between py-5">
        <div>
        	<h5>상품명</h5>
        </div>
        <div>
        	<h6>{{paymentInfo.product}}</h6>
        </div>
      </div>
      <div class="d-grid gap-6 d-sm-flex justify-content-between py-5">
        <div>
        	<h5>주문번호</h5>
        </div>
        <div>
        	<h6>{{paymentInfo.orderNo}}</h6>
        </div>
      </div>
      <div class="d-grid gap-6 d-sm-flex justify-content-between py-5">
        <div>
        	<h5>결제일</h5>
        </div>
        <div>
        	<h6>{{paymentInfo.orderDate}}</h6>
        </div>
      </div>
      <div class="d-grid gap-6 d-sm-flex justify-content-between py-5">
        <div>
        	<h5>주문금액</h5>
        </div>
        <div>
        	<h6>{{paymentInfo.orderPrice}}</h6>
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-center">
    	<hr class="w-50">
    </div>
    
    <div class="col-lg-6 mx-auto">
      <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
        <button type="button" class="btn text-white" style="background-color: #fab3cc;"><a @click="$router.push('/orderdetail')" >주문내역 확인하기</a></button>
        <button type="button" class="btn text-white" style="background-color: #acb1f8;"><a @click="$router.push('/main')" >메인으로 가기</a></button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
		paymentInfo : {}
	},
	created (){
		this.paymentInfo = this.$route.query;
    console.log('paymentComplete.vue',this.paymentInfo);
	}
}
</script>

<style>

</style>