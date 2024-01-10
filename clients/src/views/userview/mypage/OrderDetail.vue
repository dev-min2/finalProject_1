<template>
	<div id="layoutSidenav_content">
		<main>
			<div class="container-fluid px-4">
				<div class="px-4 py-1 my-3 text-center">
					<h2 class="fw-bold mb-3">내 주문내역</h2>
				</div>
				<div class="d-flex justify-content-center">
					<table class="table table-hover">
						<thead>
							<tr align="center">
								<th>주문번호</th>
								<th>상품명</th>
								<th>결제금액</th>
								<th>수량</th>
								<th>결제일</th>
								<th>주문상태</th>
							</tr>
						</thead>
						<tbody>
							<tr :key="i" v-for="(order, i) in selectPaymentList" align="center" @click="goOrderDetail(order.payment_no)">
								<td>{{order.payment_no}}</td>
								<td>{{order.payment_product}}</td>
								<td>{{$printPriceComma(order.real_payment_amount)}}원</td>
								<td>총 {{order.total_product}}개</td>
								<td>{{$dateFormat(order.payment_date)}}</td>
								<td>{{$getSubCodeName(order.order_state)}}</td>
							</tr>
						</tbody>
					</table>
				</div>
				<PaginationComp v-if="page !== null" :page="page" @go-page="getSelectPayment" />
				<!--

				-->
			</div>
		</main>
	</div>
</template>

<script>
import axios from 'axios'
import PaginationComp from '../../../components/common/PaginationComp.vue';

export default {
    components: {
        PaginationComp
    },
	data() {
		return {
			userNo: '',
			selectPaymentList : [],
			page: null,
		}
	},
	created(){
		this.userNo = this.$store.state.userNo;
		this.getSelectPayment(1);
	},
	methods: {
		//주문정보 가져오기
		async getSelectPayment(pageNo){
            this.$showLoading();
			let result 
				= await axios.get(`/api/product/orderdetail?userNo=${this.userNo}&pageNo=${pageNo}`)
							.catch(err => console.log(err));
			this.selectPaymentList = result.data.selectResult; 
			this.page = result.data.pageDTO;
            this.$hideLoading();

		},
		//주문상세페이지로 이동
		goOrderDetail(paymentNo){
			this.$router.push({ path : '/paymentdetail', query :  { paymentNo: paymentNo} });
		}

	}
}
</script>

<style>

</style>