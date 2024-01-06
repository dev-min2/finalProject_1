<template>
	<div id="layoutSidenav_content">
		<main>
			<div class="container-fluid px-4">
				<div class="px-4 py-1 my-3 text-center">
					<h2 class="fw-bold mb-3">내 주문내역</h2>
				</div>
				<div class="d-flex justify-content-center">
					<table class="table w-85">
						<thead>
							<tr align="center">
								<th>주문번호</th>
								<th>상품명</th>
								<th>가격</th>
								<th>수량</th>
								<th>결제일</th>
								<th>주문상태</th>
							</tr>
						</thead>
						<tbody>
							<tr :key="i" v-for="(order, i) in selectPaymentList" align="center" @click="goOrderDetail(order)">
								<td>{{order.payment_no}}</td>
								<td>{{order.payment_product}}</td>
								<td>{{this.$printPriceComma(order.real_payment_amount)}}원</td>
								<td>총 {{order.total_product}}개</td>
								<td>{{this.$dateFormat(order.payment_date)}}</td>
								<td>{{order.order_state}}</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</main>
	</div>
</template>

<script>
import axios from 'axios';

export default {
	data() {
		return {
			userNo: '',
			selectPaymentList : []
		}
	},
	created(){
		this.userNo = this.$store.state.userNo;
		this.getSelectPayment();
		console.log('할수잇당',this.selectPaymentList);
	},
	methods: {
		async getSelectPayment(){
			let result 
				= await axios.get(`/api/product/orderdetail/${this.userNo}`)
							.catch(err => console.log(err));
			this.selectPaymentList = result.data;
			console.log(this.selectPaymentList);
		},
		goOrderDetail(order){
			console.log(order);
			let paymentDetail = {
				userNo:order.user_no,
				paymentNo:order.payment_no,
				orderState:order.order_state,
				myCouponNo:order.my_coupon_no,
				paymentProduct:order.payment_product,
				totalProductCnt:order.total_product,
				paymentPrice:order.payment_amount,
				paymentDate:order.payment_date,
				paymentDiscountPrice:order.payment_discount_amount,
				totalDeliveryFee:order.total_delivery_fee,
				realPaymentPrice:order.real_payment_amount,
				paymentSubNo:order.payment_sub_unique_no,
				receiverAddr:order.receiver_addr,
				receiverName:order.receiver_name,
				receiverPhone:order.receiver_phone,
				receiverPostCode:order.receiver_postcode,
				deliveryRequest:order.delivery_request,
			}
			this.$router.push({ path : '/paymentdetail', query :  paymentDetail });
			//, params : { no : `${}` } 
		}

	}
}
</script>

<style>

</style>