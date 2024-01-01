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
                <button @click="searchSellerReview(search)" style="border-radius:8px">검색</button>
            </div>
        </div>

        <table class="sellerReview">
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
                    <td>{{ review.content }}</td>
                    <td class="likecnt">{{ review.review_like_cnt }}</td>
                    <td class="Del"><button @click="deleteReview">리뷰 삭제</button></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        data() {
            return {
                sellerReviewList: [],
                search: '',
                reviewsPerPage: 5,
                currentPage: 1,
            };
        },
        created() {
            this.getSellerReview();
        },
        computed: {
            displayedReviews() {
                const startIndex = (this.currentPage - 1) * this.reviewsPerPage;
                const endIndex = startIndex + this.reviewsPerPage;
                return this.sellerReviewList.slice(startIndex, endIndex);
            },
        },
        methods: {
            async getSellerReview() {
                let result = '';
                const userNo = 1;
                try {
                    result = await axios.get(`/api/product/SellerReviewList/${userNo}`);
                } catch (e) {
                    console.error(e);
                }
                this.sellerReviewList = result.data;
            },
            //리뷰검색
            async searchSellerReview(search) {
                let result = '';

                const userNo = 1;
                try {
                    result = await axios.get(`/api/product/SellerReviewList/${userNo}/${search}`)

                } catch (e) {
                    console.log(e);
                }
                this.sellerReviewList = result.data;
            },
            //리뷰삭제
            async deleteReview(reviewNo) {
                let result = '';

                try {
                    result = await axios.get(`/api/product/SellerReviewList/${reviewNo}`)
                } catch (e) {
                    console.log(e)
                }
                this.sellerReviewList = result.data;

            },
            // 페이지를 첫 번째 페이지로 초기화
            updateReviewsPerPage() {
                this.currentPage = 1;
            },
        },
    };
</script>

<style>
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


    .sellerReview {}

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
</style>