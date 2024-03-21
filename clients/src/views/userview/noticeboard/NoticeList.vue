<template>
    <div class="container py-3">
        <h1 class="py-4" style="text-align:center;">공지사항</h1>
        <BoardSearchBar @board-search="getNoticeBoardList" />
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
                <tr style="background-color:#fab3cc;" v-for="(notice) in noticeImportanceList" :key="notice.notice_board_no" @click="goNoticeBoard(notice.notice_board_no)" >
                    <td style="color:white;">{{notice.notice_board_no}}</td>
                    <td style="color:white;"><b>{{notice.title}}</b></td>
                    <td style="color:white;">관리자</td>
                    <td style="color:white;">{{notice.created_date}}</td>
                    <td style="color:white;">{{notice.view_cnt}}</td>
                </tr>
                <tr v-for="(notice) in noticeList" :key="notice.notice_board_no" @click="goNoticeBoard(notice.notice_board_no)" >
                    <td>{{notice.notice_board_no}}</td>
                    <td>{{notice.title}}</td>
                    <td>관리자</td>
                    <td>{{notice.created_date}}</td>
                    <td>{{notice.view_cnt}}</td>
                </tr>
            </tbody>
        </table>
        <div class="text-right">
        <button v-if="$store.state.userPermission == 'F3'" 
            class="btn btn-primary my-2" style="background-color:#fab3cc; border:0;"
            @click="goWriteNotice"
            >
            글쓰기
        </button>
        </div>
        <!-- 서버에 비동기 통신으로 데이터 요청 응답이 오기전에 컴포넌트에 prop이 전달될 수 있으므로 null 이 아닐때만 전달되게끔 해야함.-->
        <PaginationComp v-if="page !== null" :page="page" @go-page="getNoticeBoardList" />
        
    </div>
</template>

<script>
    import PaginationComp from '../../../components/common/PaginationComp.vue'
    import BoardSearchBar from '../../../components/common/BoardSearchBar.vue'
    import axios from 'axios'
    export default {
        data() {
            return {
                noticeList : [],
                noticeImportanceList : [],
                page : null
            }
        },
        components : {
            PaginationComp,
            BoardSearchBar
        },
        created() {
            this.getNoticeBoardList(1,'');
        },
        methods : {
            async getNoticeBoardList(pageNo,keyword) {
                this.$showLoading();
                if(typeof keyword == "undefined" ){
                    keyword = '';
                }
                const result = await axios.get(`/api/board/notice?pg=${pageNo}&keyword=${keyword}`);
                if(result.status == 200) {
                    this.noticeList = result.data.selectResult;
                    for(let i = 0; i < this.noticeList.length; ++i) {
                        this.noticeList[i].created_date = this.$dateFormat(this.noticeList[i].created_date);
                    }
                    this.noticeImportanceList = result.data.selectImportance;
                    for(let i = 0; i < this.noticeImportanceList.length; ++i) {
                        this.noticeImportanceList[i].created_date = this.$dateFormat(this.noticeImportanceList[i].created_date);
                    }
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
                this.$router.push({name : `noticeInfo`, params : { no : `${boardNo}`}});
            }
        }
    }
</script>

<style scoped>
    tbody tr {
        cursor : pointer;
    }
</style>