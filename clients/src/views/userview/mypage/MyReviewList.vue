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
                                <th scope="col">리뷰내용</th>
                                <th scope="col">리뷰날짜</th>
                                <th scope="col">리뷰별점</th>
                                <th scope="col">리뷰좋아요갯수</th>
                            </tr>
                        </thead>
                        <tbody>

                            <tr>
                                <td>{{ reviewList.product_no }}</td>
                                <td><a href=""></a></td>
                                <td></td>
                                <td></td>
                                <td></td>
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
    export default {
        data() {
            return {
                reviewList : []
            }
        },
        created (){
            this.getMyReviewList();
        },
        methods: {
            async getMyReviewList() {
                const result = await axios.get(`/api/user/myreview?userNo=${this.$store.state.userNo}`);
                this.reviewList = result.data;
            }
        }
    }
</script>

<style>

</style>