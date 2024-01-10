<!-- 게시판 댓글 컴포넌트 -->
<!-- noticeReply(props) 객체의 프로퍼티명에 맞춰서 데이터를 넣어줘야함. noticeBoardDAO코드 참고.-->
<!-- 이 컴포넌트(BoardReply)는 부모쪽 전달 이벤트(emit)로 댓글/답글 작성(registReply), 댓글 삭제(deleteReply), 댓글 수정(updateReply)에 대한 구현이 되어야함.-->
<template>
<div>
    <div class="conatiner mt-5">
        <div class="row">
            <h2>댓글 {{replyCount}}</h2>
        </div>
        <hr>
    </div>
    <div class="media">
        <div class="media-body">
            <div v-for="(reply, objIdx, idx ) in boardReply" :key="idx" class="mt-1">
                <div style="float:left;">
                    <h5 class="mt-0" style="display:inline-block;">{{reply[0].parent_user_name}}</h5>
                </div>
                <div class="text-right">
                    <p style="display:inline-block;">{{$dateTimeFormat(reply[0].parent_reply_date)}}</p>
                </div>
                <p v-if="reply[0].parent_delete_date == null" class="ml-3">{{reply[0].parent_comment}}</p>
                <p v-else class="ml-3" style="color:red;"><b>삭제된 댓글입니다.</b></p>
                <button class="ml-3" style="border : 1px solid #e4e4e4; background-color:#fafafa;" @click="showContent[idx] = !showContent[idx]">답글</button>
                <button v-if="$store.state.userNo == reply[0].parent_user_no && reply[0].parent_delete_date == null" class="ml-2" style="border : 1px solid #e4e4e4; background-color:#fafafa;" @click="modifyContent[reply[0].parent_reply_no] = !modifyContent[reply[0].parent_reply_no]">수정</button>
                <button v-if="$store.state.userNo == reply[0].parent_user_no && reply[0].parent_delete_date == null" class="ml-2" style="border : 1px solid #e4e4e4; background-color:#fafafa;" @click="deleteReply(reply[0].parent_reply_no)">삭제</button>
                <hr style="color:#e4e4e4; margin-bottom:0;">
                <!-- 댓글 수정-->
                <template v-if="$store.state.userNo == reply[0].parent_user_no && modifyContent[reply[0].parent_reply_no]"> 
                    <div class="my-2">
                        <h3>댓글 수정</h3>
                        <div>
                            <div class="form-group">
                            <textarea v-model="modifyContentReply[reply[0].parent_reply_no]" class="form-control" id="comment" rows="3" placeholder="댓글을 입력하세요"></textarea>
                            </div>
                            <div class="text-right">
                                <button @click="updateReply(reply[0].parent_reply_no)" class="btn btn-primary" style="background-color:#fab3cc; border:0;">댓글 수정</button>
                            </div>
                        </div>
                    </div>
                </template>
                <template v-if="showContent[idx]"> <!-- 답글 -->
                    <div class="my-2">
                        <h3>답글 작성</h3>
                        <div>
                            <div class="form-group">
                                <textarea v-model="commentReply[idx]" class="form-control" id="comment" rows="3" placeholder="댓글을 입력하세요"></textarea>
                            </div>
                            <div class="text-right">
                                <button @click="registReply(reply[0].parent_reply_no,idx)" class="btn btn-primary" style="background-color:#fab3cc; border:0;">댓글 작성</button>
                            </div>
                        </div>
                    </div>
                </template>
                <!-- 자식컴포넌트 영역 -->

                <template v-if="reply[0].child_reply_no !== null">
                    <div class="ml-5" style="background-color:#fafafa" v-for="(childReply,idx) in boardReply[objIdx]" :key="idx">
                        <div style="float:left;">
                            <h5 class="mt-0" style="display:inline-block;">{{childReply.child_name}}</h5>
                        </div>
                        <div class="text-right">
                            <p style="display:inline-block;">{{$dateTimeFormat(childReply.child_reply_date)}}</p>
                        </div>
                        <p v-if="childReply.child_delete_date == null" class="ml-3">{{childReply.child_comment}}</p>
                        <p v-else class="ml-3" style="color:red;"><b>삭제된 댓글입니다.</b></p>
                        <button v-if="$store.state.userNo == childReply.child_user_no && childReply.child_delete_date == null" class="ml-3" style="border : 1px solid #e4e4e4; background-color:#fafafa;" @click="modifyContent[childReply.child_reply_no] = !modifyContent[childReply.child_reply_no]">수정</button>
                        <button v-if="$store.state.userNo == childReply.child_user_no && childReply.child_delete_date == null" class="ml-2" style="border : 1px solid #e4e4e4; background-color:#fafafa;" @click="deleteReply(childReply.child_reply_no)">삭제</button>
                        <hr>
                        <!-- 댓글 수정-->
                        <template v-if="$store.state.userNo == reply[0].parent_user_no && modifyContent[childReply.child_reply_no]"> 
                            <div class="my-2">
                                <h3>댓글 수정</h3>
                                <div>
                                    <div class="form-group">
                                        <textarea v-model="modifyContentReply[childReply.child_reply_no]" class="form-control" id="comment" rows="3" placeholder="댓글을 입력하세요"></textarea>
                                    </div>
                                    <div class="text-right">
                                        <button @click="updateReply(childReply.child_reply_no)" class="btn btn-primary" style="background-color:#fab3cc; border:0;">댓글 수정</button>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </div>
                </template>
            </div>
        </div>0
    </div>
    <div class="mt-2">
        <h3>댓글 작성</h3>
        <div>
            <div class="form-group">
                <textarea v-model="comment" class="form-control" id="comment" rows="3" placeholder="댓글을 입력하세요"></textarea>
            </div>
            <div class="text-right">
                <button @click="registReply(null,-1)" class="btn btn-primary" style="background-color:#fab3cc; border:0;">댓글 작성</button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
    export default {
        data() {
            return {
                comment : '',
                commentReply : [],
                showContent : [], // 답글 박스를 보여줄(true,false) 배열
                modifyContent : {}, // 댓글 수정 박스를 보여줄(true,false) 객체(해시테이블역할)
                modifyContentReply : {}
            }
        },
        props : {
            boardReply : Object,
            replyCount : Number       
        },
        watch : {
            boardReply(newVal,oldVal) {
                this.initReply();
            }
        },
        created() {
            this.initReply();
        },
        methods : {
            initReply() {
                this.comment = '';
                this.commentReply = [];
                this.showContent = []; // 답글 박스를 보여줄(true,false) 배열
                this.modifyContent = {}; // 댓글 수정 박스를 보여줄(true,false) 객체(해시테이블역할)
                this.modifyContentReply = {};

                for(const obj in this.boardReply) { // obj -> parent_reply_no
                    this.showContent.push(false);
                    this.commentReply.push('');
                
                    this.modifyContent[obj] = false;
                    this.modifyContentReply[obj] = this.boardReply[obj][0].parent_comment;
                    for(const innerObj of this.boardReply[obj]) {
                        this.modifyContent[innerObj.child_reply_no] = false
                        this.modifyContentReply[innerObj.child_reply_no] = innerObj.child_comment;
                    }
                }
            },
            registReply(pno,idx) {
                if(idx >= 0 && this.commentReply[idx] == '') {
                    this.$showWarningAlert('빈 내용은 작성이 불가능합니다.');
                    return;
                }

                if(idx < 0 && this.comment == '') {
                    this.$showWarningAlert('빈 내용은 작성이 불가능합니다.');
                    return;
                }

                if(this.$store.state.userNo < 0) {
                    this.$showWarningAlert('로그인 후 이용가능합니다.');
                    return;
                }
                
                // pno가 null이면 일반 댓글작성. pno가 null이 아니면 답글 작성임.
                const comment = pno != null ? this.commentReply[idx] : this.comment;
                this.$emit('registReply', pno, comment);

                if(idx >= 0) {
                    this.commentReply[idx] = '';
                    this.showContent[idx] = !this.showContent[idx];
                }
                else {
                    this.comment = '';
                }
            },
            deleteReply(replyNo) {
                this.$emit('deleteReply', replyNo);
            },
            updateReply(replyNo) {
                const sendObj = {
                    replyNo : replyNo,
                    modifyComment : this.modifyContentReply[replyNo]
                };
                
                this.$emit('updateReply',sendObj);
                this.modifyContent[replyNo] = false;
            }
        }
    }
</script>

<style scoped>

</style>