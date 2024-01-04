<template>
    <div id="layoutSidenav_content">
        <main>
            <div class="container-fluid px-4">
                <div class="px-4 py-1 my-3 text-center">
                    <h2 class="fw-bold mb-3">내 리뷰내역</h2>
                </div>
                <div class="d-flex justify-content-center">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">리뷰번호</th>
                                <th scope="col">상품명</th>
                                <th scope="col">가격</th>
                                <th scope="col">수량</th>
                                <th scope="col">결제일</th>
                                <th colspan="2" scope="col">비고</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(review, idx) in reviewList" :key="idx" :review="review" @click="goReviewBoard(review.review_no,review.product_name)">
                                <td>{{ review.review_no }}</td>
                                <td>{{ review.product_name }}</td>
                                <td>{{ review.product_price }}</td>
                                <td>{{ review.buy_cnt }}</td>
                                <td>{{ this.$dateFormat(review.payment_date) }}</td>
                                <td><button class="btn btn-primary my-2" style="background-color:#fc97bf; border:0;"
                                        @click="goReviewBoard(review.review_no,review.product_name)">리뷰수정</button>
                                </td>
                                <td><button class="btn btn-primary my-2" style="background-color:#fc97bf; border:0;"
                                        @click="goReviewBoard(review.review_no,review.product_name)">삭제</button>
                                </td>
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
        components: {
            PaginationComp
        },

        data() {
            return {
                reviewList: [],
                page: null
            }
        },
        created() {
            this.getMyReviewList(1);
        },
        methods: {
            async getMyReviewList(pageNo) {
                const result = await axios.get(
                    `/api/user/myreview?userNo=${this.$store.state.userNo}&pageNo=${pageNo}`);
                this.reviewList = result.data.selectResult;
                console.log(this.reviewList);
                this.page = result.data.pageDTO;
                console.log(this.page);
            },
            //리뷰작성
            // goWriteReview(product_no, product_name){
            //     console.log(product_name)
            //     this.$router.push({path : "/myreview/write", query : {pno: product_no, pname : product_name}});
            // },
            goReviewBoard(reviewNo, product_name){
                console.log(reviewNo,product_name);
                this.$router.push({path : "/myreview/info", query : {rno: reviewNo, pname : product_name }});
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