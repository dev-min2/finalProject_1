<template>
<div>
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
                            <button @click="registReply(reply[0].parent_reply_no)" class="btn btn-primary" style="background-color:pink;">댓글 작성</button>
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
                <button @click="registReply(null)" class="btn btn-primary" style="background-color:pink;">댓글 작성</button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>

</style>