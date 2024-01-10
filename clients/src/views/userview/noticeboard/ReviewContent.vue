<template>
    <div class="container mt-3">
        <div class="row">
            <div class="col-md-12 offset-md-0">
                <h2 class="my-3">리뷰내용</h2>
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title"></h3>
                        <div style="float:left">
                            <p class="card-text" style="text-align='right'; display:inline-block;">상품명 |
                                <router-link :to="{ path: '/productDetail', query : {pno : reviewInfo.product_no }}" >{{ product_name }}</router-link></p>
                        </div>
                        <div style="float:right">
                            <p v-if="reviewInfo.star_cnt == 5" class="card-text" style="text-align='right'; display:inline-block;">별점 | 
                                <p style="color:#fab3cc; display:inline-block;">★★★★★</p>
                            </p>
                            <p v-else-if="reviewInfo.star_cnt == 4" class="card-text" style="text-align='right'; display:inline-block;">별점 | 
                                <p style="color:#fab3cc; display:inline-block;">★★★★</p>
                            </p>
                            <p v-else-if="reviewInfo.star_cnt == 3" class="card-text" style="text-align='right'; display:inline-block;">별점 | 
                                <p style="color:#fab3cc; display:inline-block;">★★★</p>
                            </p>
                            <p v-else-if="reviewInfo.star_cnt == 2" class="card-text" style="text-align='right'; display:inline-block;">별점 | 
                                <p style="color:#fab3cc; display:inline-block;">★★</p>
                            </p>
                            <p v-else class="card-text" style="text-align='right'; display:inline-block;">별점 | 
                                <p style="color:#fab3cc; display:inline-block;">★</p>
                            </p>
                        </div>
                    </div>
                    <div class="card-body">
                        <div ref="viewer">

                        </div>
                    </div>
                </div>
                <div v-if="$store.state.userPermission == 'F1'" class="mt-1 text-right">
                    <button style="background-color:#fab3cc; border:0;" class="btn btn-primary"
                        @click="modifyReview">수정하기</button>
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
                reviewInfo: {},
                product_name: '',
            }
        },
        async created() {

            this.product_name = this.$route.query.pname;
            this.product_no = this.$route.query.pno;
            this.reviewNo = this.$route.query.rno;
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
                const result = await axios.get(`/api/board/myreview/info?rno=${this.reviewNo}`);
                if (result.status == 200) {
                    this.reviewInfo = result.data;
                    console.log(this.reviewInfo);

                } else {
                    this.$showFailAlert('데이터를 불러오는데 실패했습니다.');
                    this.$router.push({
                        path: "/myreview"});
                }
                this.$hideLoading();
                return result;

            },
            modifyReview(reviewNo) {
                this.$router.push({ path: '/myreview/write', query: { modify: this.reviewNo, pname : this.product_name }});
            },
        }
    }
</script>
<style scoped>
    textarea {
        resize: none;
    }
     .card-body {
        min-height: 500px;
    }

    .scroll_ul {
        overflow-y: scroll;
        list-style: none;
        height: 100px;
    }

    a {
        text-decoration-line: none;
    }
</style>