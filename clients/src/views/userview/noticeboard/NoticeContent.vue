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
                            <p class="card-text" style="text-align='right'; display:inline-block;">조회 {{boardInfo.view_cnt + 1}} | 댓글 {{noticeReplyCount}}</p>
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
        <BoardReply v-if="noticeReply !== null" :noticeReply="noticeReply" :noticeReplyCount="noticeReplyCount" :showContent="showContent" @regist-reply="registReply"/>
    </div>
</template>

<script>
    import Viewer from '@toast-ui/editor/dist/toastui-editor-viewer'; /* ES6 모듈 방식 */
    import '@toast-ui/editor/dist/toastui-editor.css'; // Editor 스타일
    import axios from 'axios'
    import BoardReply from '../../../components/common/BoardReply.vue'

    let toastViewer = null;
    export default {
        components : {
            BoardReply
        },
        data() {
            return {
                boardNo : 0,
                boardInfo : null,
                noticeReply : null, // 이건 props로 건내야함.
                noticeReplyCount : 0, // 마찬가지.
                showContent : [], // 이건 내부에만 있으면 될듯.
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
                if(result.status == 200) {
                    this.boardInfo = result.data.noticeBoard;
                    this.boardInfo.created_date = this.$dateTimeFormat(this.boardInfo.created_date);
                    this.noticeReply = result.data.reply;
                    this.noticeReplyCount = result.data.replyCount;

                    await axios.put(`/api/board/notice/${this.boardNo}`)
                }
                else {
                    this.$showFailAlert('데이터를 불러오는데 실패했습니다.');
                    this.$router.push({path : "/notice"});
                }
                this.$hideLoading();
                return 1;
            },
            async registReply(pno, replyContent) {
                const myThis = this;
                const sendObj = {
                    param : {
                        notice_board_no : myThis.boardNo,
                        comment : replyContent,
                        user_no : myThis.$store.state.userNo,
                        notice_reply_pno : pno
                    }
                }
                const result = await axios.post('/api/board/notice-reply',sendObj,{headers : {'ContentType' : 'application/json'}})
                if(result.status == 200) {
                    await this.getNoticeData();
                }
                else {
                    this.$showFailAlert('댓글등록에 실패했습니다. 사유 : ', result.status);
                }
            }
        }
    }
</script>

<style scoped>
    textarea {
        resize: none;
    }
</style>