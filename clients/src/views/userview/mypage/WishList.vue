<template>
{{this.$store.state.userNo}}
{{this.wishInfo}}
<div id="layoutSidenav_content">
		<main>
			<div class="container-fluid px-4">
				<div class="px-4 py-1 my-3 text-center">
					<h2 class="fw-bold mb-3">내 찜목록</h2>
				</div>
				<div class="d-flex justify-content-center">
					<table class="table w-85">
						<thead>
							<tr align="center">
								<th>상품명</th>
								<th>가격</th>
							</tr>
						</thead>
						<tbody>
							<tr :key="i" v-for="(order, i) in selectPaymentList" align="center" @click="goOrderDetail(order.payment_no)">
								<td>{{order.payment_product}}</td>
								<td>{{this.$printPriceComma(order.real_payment_amount)}}원</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</main>
	</div>
</template>

<script>
    import axios from 'axios'
    import Product from '../../../components/userview/Product.vue';
    import PaginationComp from '../../../components/common/PaginationComp.vue';

    export default {
        components: {
            Product,
            PaginationComp
        },
        data() {
            return {
                wishInfo: [],
                page: null,
            }
        },
        created() {
           this.wishResult();
        },
        methods: {
            async wishResult(){
                this.$showLoading();
                let result = await axios
                        .get(`/api/product/wish/${this.$store.state.userNo}`)
                        .catch(err => console.log(err));
                         this.wishInfo = result.data;
                this.$hideLoading();
            },
        }
    }
</script>