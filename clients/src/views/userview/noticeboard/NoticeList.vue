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
                <tr v-for="(notice) in noticeList" :key="notice.notice_board_no" @click="goNoticeBoard(notice.notice_board_no)" >
                    <td>{{notice.notice_board_no}}</td>
                    <td>{{notice.title}}</td>
                    <td>관리자</td>
                    <td>{{notice.created_date}}</td>
                    <td>{{notice.view_cnt}}</td>
                </tr>
            </tbody>
        </table>

        <!-- 서버에 비동기 통신으로 데이터 요청 응답이 오기전에 컴포넌트에 prop이 전달될 수 있으므로 null 이 아닐때만 전달되게끔 해야함.-->
        <PaginationComp v-if="page !== null" :page="page" @go-page="getNoticeBoardList" />
    </div>
</template>

<script>
    import PaginationComp from '../../../components/common/PaginationComp.vue'
    import axios from 'axios'
    export default {
        data() {
            return {
                noticeList : [],
                page : null
            }
        },
        components : {
            PaginationComp,
        },
        created() {
            this.getNoticeBoardList(1);
        },
        methods : {
            async getNoticeBoardList(pageNo) {
                this.$showLoading();
                const result = await axios.get(`/api/board/notice?pg=${pageNo}`);
                if(result.status == 200) {
                    this.noticeList = result.data.selectResult;
                    this.page = result.data.pageDTO;
                }
                this.$hideLoading();
            },
            goWriteNotice() {
                if(this.$store.state.userPermission != 'F3')
                    return;
                
                this.$router.push({path : "/notice/write"});
            },
            goNoticeBoard(boardNo) {
                this.$router.push({path : `/notice/${boardNo}`});
            }
        }
    }
</script>

<style scoped>
    tbody tr {
        cursor : pointer;
    }
</style>