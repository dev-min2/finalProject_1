<template>
    <div class="container mt-3">
        <div class="row" v-if="boardInfo !== null">
            <div class="col-md-12 offset-md-0">
                <h1 class="my-3">공지사항</h1>
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">{{boardInfo.title}}</h3>
                        <div style="float:left">
                            <p class="card-text" style="text-align='right'; display:inline-block;">관리자 | {{$dateTimeFormat(boardInfo.created_date)}}</p>
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
                        <h5 class="card-title">첨부파일 목록</h5>
						<DownloadAttachFile :realAttachFileNameList="realAttachFileNameList" :boardType="'notice'" :pk="boardNo" />
                    </div>
                </div>
                <div v-if="$store.state.userPermission == 'F3'" class="mt-1 text-right">
                    <button style="background-color:#fab3cc; border:0;" class="btn btn-primary" @click="modifyNotice(boardNo)" >수정하기</button>
                </div>
            </div>
        </div>
        <BoardReply v-if="noticeReply !== null" :noticeReply="noticeReply" :noticeReplyCount="noticeReplyCount"  
            @regist-reply="registReply"
            @delete-reply="deleteReply"
            @update-reply="updateReply"
            />
    </div>
</template>

<script>
    import Viewer from '@toast-ui/editor/dist/toastui-editor-viewer'; /* ES6 모듈 방식 */
    import '@toast-ui/editor/dist/toastui-editor.css'; // Editor 스타일
    import axios from 'axios'
    import BoardReply from '../../../components/common/BoardReply.vue'
    import DownloadAttachFile from '../../../components/common/DownloadAttachFile.vue'

    let toastViewer = null;
    export default {
        components : {
            BoardReply,
            DownloadAttachFile
        },
        data() {
            return {
                boardNo : 0,
                boardInfo : null,
                noticeReply : null, // 댓글 데이터를 가지는 데이터
                noticeReplyCount : 0,  // 댓글 갯수
                realAttachFileNameList : [], // 서버에서 고유한 처리를 위해 변경한 파일이름이 담긴 리스트
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
                    this.noticeReply = result.data.reply;
                    this.noticeReplyCount = result.data.replyCount;
                    this.realAttachFileNameList = result.data.attachFileList;
                    
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
            },
            async deleteReply(replyNo) {
                const result = await axios.put(`/api/board/notice-reply?replyNo=${replyNo}`);
                if(result.status == 200) {
                    await this.getNoticeData();
                }
                else {
                    this.$showFailAlert('댓글삭제에 실패했습니다. 사유 : ', result.status);
                }
            },
            async updateReply(recvObj) {
                const sendObj = {
                    notice_reply_no : recvObj.replyNo,
                    comment : recvObj.modifyComment
                }

                const result = await axios.put(`/api/board/notice-reply`, sendObj);
                if(result.status == 200) {
                    await this.getNoticeData();
                }
                else {
                    this.$showFailAlert('댓글삭제에 실패했습니다. 사유 : ', result.status);
                }
            },
            modifyNotice(boardNo) {
                if(this.$store.state.userPermission != 'F3') {
                    this.$showFailAlert('권한이 없습니다.')
                    return;
                }

                this.$router.push({path : '/notice/write', query : { modify : boardNo }});
            }
        }
    }
</script>

<style scoped>
    textarea {
        resize: none;
    }

    .scroll_ul {
		overflow-y:scroll;
		list-style: none;
		height : 100px;
	}

    a {
        text-decoration-line: none;
    }
</style>