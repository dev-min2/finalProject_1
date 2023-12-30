<template>
    <div class="container mt-3">
        <div class="row" v-if="boardInfo !== null">
            <div class="col-md-12 offset-md-0">
                <h1 class="my-3">공지사항</h1>
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">{{boardInfo.title}}</h3>
                        <div style="float:left">
                            <p class="card-text" style="text-align='right'; display:inline-block;">관리자 | {{boardInfo.created_date}}</p>
                        </div>
                        <div style="float:right">
                            <p class="card-text" style="text-align='right'; display:inline-block;">조회 {{boardInfo.view_cnt + 1}} | 댓글 {{0}} </p>
                        </div>
                    </div>
                    <div class="card-body">
                        <div ref="viewer">
                            
                        </div>
                    </div>
                    <div class="card-footer text-muted">
                        작성일 : {{boardInfo.created_date}}
                    </div>
                </div>
            </div>
        </div>
        <div class="conatiner mt-3">
            <div class="row">
                <h4 class="my-3">댓글 {{0}}</h4>
                <hr>
                <div class="mb-2">
                    <b>관리자</b>
                    <hr>
                </div>
                <textarea placeholder="댓글입력" type="text" style="height:120px;"></textarea>
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
                boardNo : 0,
                boardInfo : null
            }
        },
        async created() {
            this.boardNo = this.$route.params.no;
            await this.getNoticeData();
            
            const viewDiv = this.$refs.viewer;
            const html = this.boardInfo.content;
            toastViewer = new Viewer({
                el : viewDiv,
                initialValue : html
            });
        },
        methods: {
            async getNoticeData() {
                this.$showLoading();
                const result = await axios.get(`/api/board/notice/${this.boardNo}`);
                this.boardInfo = result.data;
                this.boardInfo.created_date = this.$dateTimeFormat(this.boardInfo.created_date);
                await axios.put(`/api/board/notice/${this.boardNo}`)
                this.$hideLoading();
                return 1;
            }
        }
    }
</script>

<style scoped>
    textarea {
        resize: none;
    }
</style>