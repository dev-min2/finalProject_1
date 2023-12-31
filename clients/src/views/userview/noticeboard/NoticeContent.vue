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
        <div class="conatiner mt-5">
            <div class="row">
                <h2>댓글 {{noticeReplyCount}}</h2>
            </div>
            <hr>
        </div>
        <div class="media">
            <div class="media-body">
                <div v-for="(reply, objIdx, idx ) in noticeReply" :key="idx" class="mt-1">
                    <div style="float:left;">
                        <h5 class="mt-0" style="display:inline-block;">{{reply[0].parent_user_name}}</h5>
                    </div>
                    <div class="text-right">
                        <p style="display:inline-block;">{{$dateTimeFormat(reply[0].parent_reply_date)}}</p>
                    </div>
                    <p class="ml-3">{{reply[0].parent_comment}}</p>
                    <button class="ml-3" style="border : 1px solid #e4e4e4; background-color:#fafafa;" @click="showContent[idx] = !showContent[idx]">답글</button>
                    <hr style="color:#e4e4e4; margin-bottom:0;">
                    <template v-if="showContent[idx]">
                        <div class="my-2">
                            <h3>댓글 작성</h3>
                            <div>
                                <div class="form-group">
                                <textarea v-model="replyContent" class="form-control" id="comment" rows="3" placeholder="댓글을 입력하세요"></textarea>
                            </div>
                            <div class="text-right">
                                <button @click="registReply(reply[0].parent_reply_no,idx)" class="btn btn-primary" style="background-color:pink;">댓글 작성</button>
                            </div>
                        </div>
                    </div>
                    </template>
                    <!-- 자식컴포넌트 영역 -->

                    <template v-if="reply[0].child_reply_no !== null">
                        <div class="ml-5" style="background-color:#fafafa" v-for="(childReply,idx) in noticeReply[objIdx]" :key="idx">
                            <div style="float:left;">
                                <h5 class="mt-0" style="display:inline-block;">{{childReply.child_name}}</h5>
                            </div>
                            <div class="text-right">
                                <p style="display:inline-block;">{{$dateTimeFormat(childReply.child_reply_date)}}</p>
                            </div>
                            <p class="ml-3">{{childReply.child_comment}}</p>
                            <hr>
                        </div>
                    </template>
                </div>
            </div>
        </div>
        <div class="mt-2">
            <h3>댓글 작성</h3>
            <div>
                <div class="form-group">
                    <textarea v-model="replyContent" class="form-control" id="comment" rows="3" placeholder="댓글을 입력하세요"></textarea>
                </div>
                <div class="text-right">
                    <button @click="registReply(null,-1)" class="btn btn-primary" style="background-color:pink;">댓글 작성</button>
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
                boardNo : 0,
                boardInfo : null, 
                replyContent : '', // reply 컴포넌트 내부에만 있으면 됨. 그리고 송신할 떄 보내주기만하면 끝
                noticeReply : [], // 이건 props로 건내야함.
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
                    for(const obj in this.noticeReply) {
                        this.showContent.push(false);
                    }

                    await axios.put(`/api/board/notice/${this.boardNo}`)
                }
                else {
                    this.$showFailAlert('데이터를 불러오는데 실패했습니다.');
                    this.$router.push({path : "/notice"});
                }
                this.$hideLoading();
                return 1;
            },
            async registReply(pno,idx) {
                if(this.$store.state.userNo < 0) {
                    this.$showWarningAlert('로그인 후 이용가능합니다.');
                    return;
                }
                const myThis = this;
                const sendObj = {
                    param : {
                        notice_board_no : myThis.boardNo,
                        comment : myThis.replyContent,
                        user_no : myThis.$store.state.userNo,
                        notice_reply_pno : pno
                    }
                }
                const result = await axios.post('/api/board/notice-reply',sendObj,{headers : {'ContentType' : 'application/json'}})
                if(result.status == 200) {
                    this.replyContent = '';
                    this.showContent[idx] = !this.showContent[idx];
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