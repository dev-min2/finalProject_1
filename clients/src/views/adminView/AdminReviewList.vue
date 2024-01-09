<template>
    <div id="container">
        <!-- 변경: 검색창 및 전체 리뷰 막대기 -->
        <div class="review-toolbar">
            <!-- 드롭다운 박스 추가 -->
            <div class="display-options">
                <label for="reviewsPerPage"> 표시할 리뷰 갯수 </label>
                <select v-model="reviewsPerPage" @change="updateReviewsPerPage" style="margin-left:10px">
                    <option value="5">5개</option>
                    <option value="10">10개</option>
                    <option value="20">20개</option>
                    <!-- 다른 필요한 리뷰 갯수의 옵션을 추가하세요 -->
                </select>
            </div>
            <div class="total-reviews">
                <h4>전체 리뷰</h4>
            </div>
            <div class="search-bar">
                <input type="text" placeholder="리뷰 내용 검색" v-model="search" />
                <button @click="searchAdminReview(search)" style="border-radius:8px">검색</button>
            </div>
        </div>

        <table class="adminReview">
            <thead>
                <tr>
                    <th>닉네임</th>
                    <th>상품명</th>
                    <th>리뷰내용</th>
                    <th>좋아요 수</th>
                    <th>리뷰 삭제</th>
                </tr>
            </thead>
            <tbody>
                <tr :key="i" v-for="(review, i) in displayedReviews">
                    <td class="Name">{{ review.user_name }}</td>
                    <td class="pName">{{ review.product_name }}</td>
                    <td><router-link :to="{path : '/myreview/info', query : {rno : review.review_no }}">{{ review.content }}</router-link></td>
                    <td class="likecnt">{{ review.review_like_cnt }}</td>
                    <td class="Del"><button @click="deleteReview(review.review_no)">리뷰 삭제</button></td>
                </tr>
            </tbody>
        </table>
        <PaginationComp v-if="page !== null" :page="page" @go-page="getAdminReview" />

    </div>
</template>

<script>
    import PaginationComp from '../../components/common/PaginationComp.vue'
    import axios from 'axios';

    export default {
        data() {
            return {

                adminReviewList: [],
                search: '',
                reviewsPerPage: 5,
                currentPage: 1,
                page: null
            };
        },
        components: {
            PaginationComp
        },
        created() {
            this.getAdminReview(1);
        },
        computed: {
            displayedReviews() {
                const startIndex = (this.currentPage - 1) * this.reviewsPerPage;
                const endIndex = startIndex + this.reviewsPerPage;
                return this.adminReviewList.slice(startIndex, endIndex);
            },
        },
        watch: {
            reviewsPerPage(newVal, oldVal) {
                if (newVal != oldVal) {
                    this.getAdminReview(1);
                }
            }
        },
        methods: {
            async getAdminReview(pageNo) {
                this.$showLoading();
                const userNo = 1;

                const result = await axios.get(
                    `/api/product/AdminReviewList?pg=${pageNo}&showCnt=${this.reviewsPerPage}`);
                if (result.status == 200) {
                    this.adminReviewList = result.data.selectResult;
                    this.page = result.data.pageDTO;

                }
                //this.adminReviewList = result.data;
                this.$hideLoading();
            },
            //리뷰검색
            async searchAdminReview(search) {
                let result = '';

                const userNo = 1;
                try {
                    result = await axios.get(`/api/product/AdminReviewList/${userNo}/${search}`)

                } catch (e) {
                    console.log(e);
                }
                this.adminReviewList = result.data;
            },

            //리뷰삭제
            async deleteReview(reviewNo) {
                let result = ''
                try {
                    result = await axios.delete(`/api/product/DeleteAdminReview/${reviewNo}`)
                    if (result.data.affectedRows > 0) {
                        this.$showSuccessAlert('리뷰가 삭제되었습니다.')
                       
                        this.getAdminReview(this.currentPage);
                    } else {
                        this.$showFailAlert('리뷰를 삭제하지 못했습니다.');
                    }
                } catch (error) {
                    console.error(error);
                    this.$showFailAlert('리뷰 삭제 중 오류가 발생했습니다.');
                }

            },
            // 페이지를 첫 번째 페이지로 초기화
            updateReviewsPerPage() {
                this.currentPage = 1;
            },
        },
    };
</script>

<style scoped>
    .review-toolbar {
        display: flex;
        justify-content: space-between;
        background-color: #363636;
        padding: 10px;
        color: white;
        margin: 10px;
    }

    .total-reviews {
        font-weight: bold;
    }

    .search-bar {
        display: flex;
    }

    .search-bar input {
        margin-right: 10px;
        border-radius: 8px;
    }


    .display-options {
        display: flex;
        align-items: center;
        margin-right: 10px;
    }

    .reviews-per-page {
        margin-left: 10px;
    }

    .Name {
        width: 100px;
    }

    .pName {
        width: 200px;
    }

    .likecnt {
        width: 150px;
    }

    .Del {
        width: 200px;
    }

    .table-header {
        background-color: #5f5f5f;
        color: rgb(255, 255, 255);
        padding: 10px;
        margin-bottom: 10px;
        margin-top: 5px;
        margin-left: 5px;
        font-weight: bold;
        font-size: 18px;
        text-shadow: -1px 0px rgb(0, 0, 0), 0px 1px rgb(0, 0, 0), 1px 0px rgb(0, 0, 0), 0px -1px rgb(0, 0, 0);

    }


    table {
        border-collapse: collapse;
        width: 100%;
        border: 2px solid #000000;
        text-align: center;
        margin-left: 10px;
    }

    th,
    td {
        border-collapse: collapse;
        padding: 8px;
        text-align: center;
        border: 2px solid #000000;
    }

    th {
        border: 2px solid #000000;
        background-color: #f2f2f2;

    }
</style>