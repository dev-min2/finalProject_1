<template>
  <div class="container py-3">
        <h1 class="py-4" style="text-align:center;">자유게시판</h1>
        <BoardSearchBar @board-search="getFreeBoardList" />
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
                <!--free_board_no, user_no, title, content,view_cnt,created_date-->
                <tr v-for="(freeBoard) in freeBoardList" :key="freeBoard.notice_board_no" @click="goFreeBoard(freeBoard.free_board_no)" >
                    <td>{{freeBoard.free_board_no}}</td>
                    <td>{{freeBoard.title}}</td>
                    <td>{{freeBoard.user_name}}</td>
                    <td>{{$dateFormat(freeBoard.created_date)}}</td>
                    <td>{{freeBoard.view_cnt}}</td>
                </tr>
            </tbody>
        </table>
        <div class="text-right">
        <button v-if="$store.state.userNo > 0 " @click="goWriteFree"
                class="btn btn-primary my-2" 
                style="text-align:right;background-color:#fab3cc; border:0;"
            >
            글쓰기
        </button>
        </div>
        <!-- 서버에 비동기 통신으로 데이터 요청 응답이 오기전에 컴포넌트에 prop이 전달될 수 있으므로 null 이 아닐때만 전달되게끔 해야함.-->
        <PaginationComp v-if="page !== null" :page="page" @go-page="getFreeBoardList" />
    </div>
</template>

<script>
import PaginationComp from '../../../components/common/PaginationComp.vue'
import BoardSearchBar from '../../../components/common/BoardSearchBar.vue'
import axios from 'axios'

export default {
    components : {
        PaginationComp,
        BoardSearchBar      
    },
    data() {
        return {
            userNo : '',
            freeBoardList : [],
            page : null
        }
    },
    created() {
        this.userNo = this.$store.state.userNo;
        this.getFreeBoardList(1, '');
        console.log(this.userNo);
        
    },
    methods: {
        //리스트 띄워주기
            async getFreeBoardList(pageNo,keyword) {
                this.$showLoading();
                if(typeof keyword == "undefined" ){
                    keyword = '';
                }
                const result = await axios.get(`/api/board/freeboard?pg=${pageNo}&keyword=${keyword}`);
                if(result.status == 200) {
                    this.freeBoardList = result.data.selectResult;
                    this.page = result.data.pageDTO;
                }
                this.$hideLoading();
            },
            goWriteFree() {
                this.$router.push({path : "/freeboard/write"});
            },
            goFreeBoard(boardNo) {
                this.$router.push({name : `freeboardInfo`, params : { no : `${boardNo}`}});
            }       
    }

}
</script>

<style scoped>
    tbody tr {
        cursor : pointer;
    }
</style>