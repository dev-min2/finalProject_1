<template>
    <div id="layoutSidenav_content">
        <main>
            <div class="container-fluid px-4">
                <div class="px-4 py-1 my-3 text-center">
                    <h2 class="fw-bold mb-3">내 리뷰내역</h2>
                </div>
                <div class="d-flex justify-content-center">
                    <table class="table w-85">
                        <thead>
                            <tr>
                                <th scope="col">주문번호</th>
                                <th scope="col">상품명</th>
                                <th scope="col">가격</th>
                                <th scope="col">수량</th>
                                <th scope="col">결제일</th>
                                <th scope="col">비고</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(review, idx) in reviewList" :key="idx" :review="review">
                                <td>{{ review.payment_no }}</td>
                                <td><a href="#">{{ review.product_name }}</a></td>
                                <td>{{ review.product_price }}</td>
                                <td>{{ review.buy_cnt }}</td>
                                <td>{{ this.$dateTimeFormat(review.payment_date) }}</td>
                                <td><a href="myreview">리뷰작성</a></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <PaginationComp v-if="page !== null" :page="page" @go-page="getMyReviewList" />
            </div>
        </main>
    </div>
</template>

<script>
    import axios from 'axios'
    import PaginationComp from '../../../components/common/PaginationComp.vue';
    export default {
        components : {
            PaginationComp
        },

        data() {
            return {
                reviewList : [],
                page : null
            }
        },
        created (){
            this.getMyReviewList(1);
        },
        methods: {
            async getMyReviewList(pageNo) {
                const result = await axios.get(`/api/user/myreview?userNo=${this.$store.state.userNo}&pageNo=${pageNo}`);
                this.reviewList = result.data.selectResult;
                console.log(this.reviewList);
                this.page = result.data.pageDTO;

            }
        }
    }
</script>

<style scoped>
th {
    text-align: center;
}
td {
    text-align: center;
}
</style>