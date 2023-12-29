<template>
    <div class="container py-3">
        <h1 class="py-4" style="text-align:center;">공지사항</h1>
        <button v-if="$store.state.userPermission == 'F3'" 
            class="btn btn-primary my-2 float-right" style="text-align:right; background-color:#fc97bf; border:0;"
            @click="goWriteNotice"
            >
            글쓰기
        </button>
        <table class="table table-hover">
            <thead>
                <tr>
                    <th>번호</th>
                    <th class="w-50">제목</th>
                    <th>글쓴이</th>
                    <th>작성일</th>
                    <th>조회</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(notice) in noticeList" :key="notice.notice_board_no">
                    <td>{{notice.notice_board_no}}</td>
                    <td>{{notice.title}}</td>
                    <td>관리자</td>
                    <td>{{notice.created_date}}</td>
                    <td>{{notice.view_cnt}}</td>
                </tr>
            </tbody>
        </table>
        <PagingComp v-bind:pageDTO="pageDTO" />
        
    </div>
</template>

<script>
    import PagingComp from '../../../components/common/PagingComp.vue'
    import axios from 'axios'
    export default {
        data() {
            return {
                noticeList : [],
                pageDTO : {}
            }
        },
        components : [
            PagingComp,
        ],
        created() {
            this.getNoticeBoardList(1);
        },
        methods : {
            async getNoticeBoardList(pageNo) {
                this.$showLoading();
                const result = await axios.get(`/api/board/notice?pg=${pageNo}`);
                if(result.status == 200) {
                    this.noticeList = result.data.selectResult;
                    this.pageDTO = result.data.pageDTO;
                }
                this.$hideLoading();
            },
            goWriteNotice() {
                if(this.$store.state.userPermission != 'F3')
                    return;
                
                this.$router.push({path : "/notice/write"});
            }
        }
    }
</script>

<style scoped>
    tbody tr {
        cursor : pointer;
    }
</style>