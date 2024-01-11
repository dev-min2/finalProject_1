<template>
<div >
		<main>
			<div class="container px-4">
				<div class="px-4 py-1 my-3 text-center">
					<h2 class="fw-bold mb-3">고객센터</h2>
				</div>
				<div class="d-flex justify-content-center">
					<table class="table w-85">
						<thead>
							<tr align="center">
								<th>공개여부</th>
								<th>글번호</th>
								<th>문의정보</th>
								<th>제목</th>
                                <th>작성자</th>
								<th>작성일</th>
								<th>문의상태</th>
							</tr>
						</thead>
						<tbody>
					<tr v-if="allQnaList.length <= 0"><td style=color:gray; colspan="7">아직 작성된 문의가 없습니다.</td></tr>
                    <tr v-else v-for="(qna,idx) in allQnaList" :key="idx">
                        <td v-if="qna.board_public == 'H1'">공개글</td>
                        <td v-else-if="qna.board_public == 'H2'">비공개글</td>
                        <td>{{qna.qna_board_no}}</td>
                        <td v-if="qna.qna_category == 'G1'">상품문의</td>
                        <td v-else-if="qna.qna_category == 'G2'">배송문의</td>
                        <td v-else-if="qna.qna_category == 'G3'">교환/환불문의</td>
                        <td v-else-if="qna.qna_category == 'G4'">기타문의</td>
                        <td v-if="this.$store.state.userPermission == 'F3'">
                            <router-link style="text-decoration : none" 
                            :to="{
                                path: '/detailqnaform',
                                query: {qno: qna.qna_board_no, pname : qna.product_name},
                                }">{{qna.title}}</router-link></td>
                        <td v-else-if="qna.board_public == 'H2' && qna.user_no != this.$store.state.userNo">{{qna.title}}</td>
                        <td v-else><router-link style="text-decoration : none" 
                            :to="{
                                path: '/detailqnaform',
                                query: {qno: qna.qna_board_no, pname : qna.product_name},
                                }">{{qna.title}}</router-link></td>
                        <td>{{qna.user_name}}</td>
                        <td>{{$dateFormat(qna.created_date)}}</td>
                        <td v-if="qna.qna_state == 'K1'" style="color : red">답변대기중</td>
                        <td v-if="qna.qna_state == 'K2'" style="color : blue">답변완료</td>
                    </tr>
                    
				</tbody>
                
			</table>
                
				</div>
            <div class="text-right">
			<button @click="toAddQnaForm" class="btn btn-primary my-2" style="text-align:right; background-color: #fab3cc; border:0;">
                문의글 작성
            </button>
            </div>
                <PaginationComp v-if="qnaPage !== null" :page="qnaPage" @go-page="getAllQna"/>       
			</div>
		</main>
	</div>
</template>

<script>
    import axios from 'axios'
    import PaginationComp from '../components/common/PaginationComp.vue';
    export default {
        components: {
            PaginationComp
        },
        data() {
            return {
                allQnaList : [],
                qnaPage : null,
                qnaPageNo : 1,
            }
        },
        created() {
            this.getAllQna(this.qnaPageNo);
        },
        methods: {
            async getAllQna(qnaPage){
                this.$showLoading();
                const result = await axios
                                    .get(`/api/board/allqna/${qnaPage}`)
                                    .catch(err => console.log(err));
                this.allQnaList = result.data.selectResult;
                this.qnaPage = result.data.page;
                this.$hideLoading();
            },
            toAddQnaForm(){
            if(this.$store.state.userNo <= 0) {
                    this.$showWarningAlert('로그인을 해주세요.');
                    this.$router.push({path: '/login'});
                    return;
            }
            this.$router.push({
                path:`/addqnaform`,
            })
        },
    }
}    
</script>
<style scoped>
td{
    text-align: center;
    vertical-align: middle;
}
</style>