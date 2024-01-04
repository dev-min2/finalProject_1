<template>
    <div class="container mt-3">
        <div class="row" v-if="reviewInfo !== null">
            <div class="col-md-12 offset-md-0">
                <h2 class="my-3">리뷰내용</h2>
                <div class="card">
                    <div class="card-header">
                        <!-- <h3 class="card-title">{{reviewInfo}}</h3> -->
                        <div style="float:left">
                            <p class="card-text" style="text-align='right'; display:inline-block;">작성자 |
                                {{$dateTimeFormat(reviewInfo.review_date)}}</p>
                        </div>
                        <!-- <div style="float:right">
                                    <p class="card-text" style="text-align='right'; display:inline-block;">조회 {{boardInfo.view_cnt + 1}} | 댓글 {{noticeReplyCount}}</p>
                                </div> -->
                    </div>
                    <div class="card-body">
                        <div ref="viewer">

                        </div>
                    </div>
                </div>
                <div v-if="$store.state.userPermission == 'F3'" class="mt-1 text-right">
                    <button style="background-color:#fab3cc; border:0;" class="btn btn-primary"
                        @click="modifyReview(reviewNo)">수정하기</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Viewer from '@toast-ui/editor/dist/toastui-editor-viewer'; /* ES6 모듈 방식 */
    import '@toast-ui/editor/dist/toastui-editor.css'; // Editor 스타일
    import axios from 'axios'

    let toastViewer = null;
    export default {
        data() {
            return {
                reviewNo: 0,
                reviewInfo: null
            }
        },
        async created() {
            this.reviewNo = this.$route.params.no;
            await this.getReviewInfo();

            const viewDiv = this.$refs.viewer;
            const html = this.reviewInfo.content;
            toastViewer = new Viewer({
                el: viewDiv,
                initialValue: html
            });
        },

        methods: {
            async getReviewInfo() {
                this.$showLoading();
                const result = await axios.get(`/api/board/myreview/info/${this.reviewNo}`);
                if (result.status == 200) {
                    this.reviewNo = result.data;
                } else {
                    this.$showFailAlert('데이터를 불러오는데 실패했습니다.');
                    this.$router.push({
                        path: "/myreview"
                    });
                }
                this.$hideLoading();
                return result;

            }
        }
    }
</script>
<style scoped>

</style>