<template>
{{qnaDetail}}
    <section class="py-5">
	<div class="container px-4 px-lg-5 mt-5">
		<div class="container-fluid">
			<form action="modifyUserQnaForm.do" name="userQnaDetailForm" method="post" style=text-align:center;>
				<input type="hidden" name="qnaNo" value="">
				<h3>문의글</h3>
				<br><hr>
				<table class="table" border="1">
					<tr>
						<th>글번호</th>
							<td>{{qnaDetail.qna_board_no}}</td>	
						<th colspan="2">작성자</th>
							<td>{{qnaDetail.user_name}}</td>
						<th colspan="2">작성일시</th>
							<td>{{$dateFormat(qnaDetail.created_date)}}</td>
						<th colspan="2">문의상태</th>
							<td v-if="qnaDetail.qna_state == 'K2' " >
							<span><b style="color: blue;">답변완료</b></span>
							</td>
							<td v-else >
							<span><b style="color: red;">답변대기중</b></span>		
							</td>
					</tr>


					<tr>
						<th colspan="1">문의종류</th>
							<td v-if="qnaDetail.qna_category == 'G1'">상품문의</td>
							<td v-else-if="qnaDetail.qna_category == 'G2'">배송문의</td>
							<td v-else-if="qnaDetail.qna_category == 'G3'">교환/환불문의</td>
							<td v-else-if="qnaDetail.qna_category == 'G4'">기타문의</td>
						<th colspan="2">글제목</th>
							<td>{{qnaDetail.title}}</td>
							
						
							<th colspan="2">상품명</th>
								<td>{{qnaDetail.product_name}}</td>
							<th colspan="2">공개여부</th>
								<td v-if="qnaDetail.board_public == 'H1'">공개글</td>
								<td v-else-if="qnaDetail.board_public == 'H2'">비공개글</td>
					</tr>
					<tr>
						<td colspan="14"><textarea rows="10" cols="40"
								class="form-control" disabled>{{qnaDetail.content}}</textarea></td>
					</tr>
					<tr>
						<td v-if="qnaDetail.user_no == this.$store.state.userNo && qnaDetail.qna_admin_reply == null" colspan="14" align="center" >
										<router-link :to="{
											path : '/modqnaform',
											query: {qno: qnaDetail.qna_board_no, pname : this.pname}
											}">
										<input type="button" value="수정">
										</router-link>
										<input type="button" value="삭제" @click="delqna()">
						</td>
					</tr>
				</table>
			</form>
			
			
			<br><br>
			<form style=text-align:center method="post">
				<input type="hidden" name="qnaNo" value="">
				<h3>문의답변</h3>
				<br><hr>
				<table class="table">
								<tr v-if="this.$store.state.userPermission == 'F3'">
									<td v-if="qnaDetail.qna_admin_reply == null"><textarea rows="10" cols="40" class="form-control" name="reply" v-model="content"></textarea></td>
									<td v-else><textarea rows="10" cols="40" class="form-control" name="reply" v-model="content"></textarea></td>
								</tr>
								<tr v-else>	
									<td v-if="qnaDetail.qna_admin_reply == null"><textarea rows="" cols="40" class="form-control" disabled>*아직 답변이 달리지 않았습니다.*</textarea></td>							
									<td v-else><textarea rows="10" cols="40" class="form-control" disabled>{{qnaDetail.qna_admin_reply}}</textarea></td>
								</tr>
								<tr v-if="this.$store.state.userPermission == 'F3'">
									<td><input type="button" value="등록하기" @click="reqna()"></td>
								</tr>
								<tr v-else>
									<!-- <td><input type="button" value="등록하기" @click="reqna()" disabled></td> -->
								</tr>
				</table>
				<!-- <p>
					<a href="">목록으로</a>
				</p> -->
			</form>
			
			
		</div>
	</div>
</section>
</template>
<script>
import axios from 'axios';
export default {
    data(){
        return{
            qno : '',
			pname : '',
            qnaDetail:[],
        };
    },
    created(){
        this.qno = this.$route.query.qno;
		this.pname = this.$route.query.pname;
        this.getDetailQna();
    },
    methods:{
        async getDetailQna(){
            this.$showLoading();
            let result = await axios
                        .get(`/api/board/qna?qno=${this.qno}`)
                        .catch(err => console.log(err));
            this.qnaDetail = result.data;
			if(this.qnaDetail.qna_admin_reply != null){
				this.content = this.qnaDetail.qna_admin_reply;
			}
            this.$hideLoading();
        },
		async delqna(){
			this.$showLoading();
			if (confirm("정말 삭제하시겠습니까?") == true){  
                this.$showSuccessAlert('','문의가 삭제되었습니다. ');
                }else{ 
					this.$hideLoading();
                    return;
                }
            let result = await axios
                        .delete(`/api/board/qnadel?qno=${this.qno}`)
                        .catch(err => console.log(err));
            this.qnaDetail = result.data;
			if(result.data.affectedRows > 0){
				this.$router.go(-1);
            this.$hideLoading();
			}
    },
		async reqna(){
			this.$showLoading();
			let obj = {
				content : this.content,
				qno : this.qno,
			}
			let result = await axios
						.post(`/api/board/reqna`,obj)
						.catch(err => console.log(err));
			if(result.data.affectedRows > 0){
				this.$showSuccessAlert("문의답변이 등록되었습니다.")
			}
			this.$hideLoading();
		}
	}  
}
</script>
<style scoped>
th, td{
	vertical-align: middle;
}
</style>