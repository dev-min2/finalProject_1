<template>
    <section class="pt-2 pb-4">
		<div class="container px-4 px-lg-5 mt-3">
				<div v-if="curModifyForm == false">
			<h3>리뷰 작성</h3>
				</div>
			<div v-else>
				<h3>리뷰 수정</h3>
			</div>
			<form @submit.prevent="uploadProduct" ref="uploadForm" class="row">
				<table class="table">
					<tr>
						<th>상품이름</th>
						<td>{{ product_name }}</td>
						<th style="width:120px;">별점</th>
						<td>
							<fieldset class="rate">
                                <input type="radio" ref="ra5" id="rating5" name="rating" value="5" @click="insertStarCnt($event.target)"><label for="rating5" title="5점"></label>
                                <input type="radio" ref="ra4" id="rating4" name="rating" value="4" @click="insertStarCnt($event.target)"><label for="rating4" title="4점"></label>
                                <input type="radio" ref="ra3" id="rating3" name="rating" value="3" @click="insertStarCnt($event.target)"><label for="rating3" title="3점"></label>
                                <input type="radio" ref="ra2" id="rating2" name="rating" value="2" @click="insertStarCnt($event.target)"><label for="rating2" title="2점"></label>
                                <input type="radio" ref="ra" id="rating1" name="rating" value="1" @click="insertStarCnt($event.target)"><label for="rating1" title="1점"></label>
                            </fieldset>
						</td>
					</tr>
					<tr ref="target">
						<th>내용</th>
						<td colspan="2">
							<TextEditor v-if="curModifyForm == false" 
								:boardType="'review'" :userNo="$store.state.userNo" :curTimeVal="curTimeVal" ref="editor"/>
							<TextEditor v-else-if="curModifyForm == true && reviewBoardInfo.html !== null" 
								:html="reviewBoardInfo.html" :boardType="'review'" :userNo="$store.state.userNo" :curTimeVal="curTimeVal" ref="editor"/>
						</td>
					</tr>
					<tr>
						<td colspan="2" style="text-align:center;">
							<input v-if="curModifyForm == false" type="submit" value="저장" class="btn btn-primary mx-3" @click="registReviewBoard">
							<input v-else type="submit" value="수정" class="btn btn-primary mx-3" @click="modifyReviewPost">
							<router-link v-if="curModifyForm == false" class="btn btn-warning" to="/myreview">작성취소</router-link>
							<router-link v-else class="btn btn-warning" to="/myreview">수정취소</router-link>
						</td>
					</tr>
				</table>
			</form>
		</div>
	</section>
</template>
<script>
import TextEditor from '../../../components/common/TextEditor.vue'
import axios from 'axios'

export default {
	components : {
		TextEditor
	},
	data() {
        return {
			reviewBoardInfo : { 
				content : '',
				star_cnt : '',
				product_no : '',
				html : null,
				payment_no : ''
			},
			curTimeVal : '',
			curModifyForm : false,
			boardNo : '',
			product_name : '',
			starValue : '',
			reviewNo : ''

        }
    },
	created (){
		this.reviewBoardInfo.product_no = this.$route.query.pno;
		this.product_name = this.$route.query.pname;
		this.reviewNo = this.$route.query.modify;
		this.reviewBoardInfo.payment_no = this.$route.query.payno;
		if(this.reviewNo > 0) {
			this.curModifyForm = true;
			
			console.log(this.curModifyForm);
			this.getReviewBoardInfo(this.reviewNo);
		}

		this.randNoticeValue = Math.floor(Math.random() * (999999 - 111111 + 1)) + 111111;
		this.curTimeVal = new Date().getTime();
	},
	methods : {
		async registReviewBoard(){
			const editor = this.$refs.editor.editor;
			this.reviewBoardInfo.html = editor.getHTML();
			this.reviewBoardInfo.star_cnt = this.starValue;
			console.log(this.reviewBoardInfo);
			const sendObj = {
				param : {
					reviewBoardInfo : this.reviewBoardInfo,
					product_no : this.reviewBoardInfo.product_no,
					payment_no : this.reviewBoardInfo.payment_no
				}
			}
			const result = await axios.post(`/api/board/myreview/write`,sendObj);
			
			if(result.status == 200) {
				this.$showSuccessAlert('등록성공',null);
				this.$router.push({path : '/myreview'});
			}
		},
		test(target) {
			console.log(target);
		},
		async getReviewBoardInfo(reviewNo) {
			this.$showLoading();
            const result = await axios.get(`/api/board/myreview/info?rno=${reviewNo}`);
            if(result.status == 200) {
                this.reviewBoardInfo.product_name = this.product_name;
				this.reviewBoardInfo.html = result.data.content;
				this.reviewBoardInfo.product_no = result.data.product_no;
				this.reviewBoardInfo.star_cnt = result.data.star_cnt;
				this.starValue = this.reviewBoardInfo.star_cnt;
				if(this.reviewBoardInfo.star_cnt == 5) {
					this.$refs.ra5.checked = true;
				}
				else if(this.reviewBoardInfo.star_cnt == 4) {
					this.$refs.ra4.checked = true
				}
				else if(this.reviewBoardInfo.star_cnt == 3) {
					this.$refs.ra3.checked = true
				}
				else if(this.reviewBoardInfo.star_cnt == 2) {
					this.$refs.ra2.checked = true
				}
				else{
					this.$refs.ra.checked = true
				}	
            }
            else {
                this.$showFailAlert('데이터를 불러오는데 실패했습니다.');
                this.$router.push({path : "/myreview"});
            }
            this.$hideLoading();
            return 1;
		},
		insertStarCnt(target) {
			this.starValue = target.value;
		},
		//리뷰수정
		async modifyReviewPost(){
			const editor = this.$refs.editor.editor;
			this.reviewBoardInfo.html = editor.getHTML();
			this.reviewBoardInfo.star_cnt = this.starValue;
			const sendObj = {
					param : {
						reviewBoardInfo : this.reviewBoardInfo,
						review_no : this.reviewNo
				}
			}
			const result = await axios.put(`/api/board/myreview`, sendObj);
			if(result.status == 200) {
				this.$showSuccessAlert('수정성공',null);
				this.$router.push({path : `/myreview`});
			}
			
		}
	}
}
</script>

<style scoped>
th{
	padding-top : 25px;
}
@import url(//netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.css);
       .rate { display: inline-block;border: 0;margin-right: 15px;}
.rate > input {display: none;}
.rate > label {float: right;color: #ddd}
.rate > label:before {display: inline-block;font-size: 1rem;padding: .3rem .2rem;margin: 0;cursor: pointer;font-family: FontAwesome;content: "\f005 ";}
.rate .half:before {content: "\f089 "; position: absolute;padding-right: 0;}
.rate input:checked ~ label, 
.rate label:hover,.rate label:hover ~ label { color: #fab3cc !important;  } 
.rate input:checked + .rate label:hover,
.rate input input:checked ~ label:hover,
.rate input:checked ~ .rate label:hover ~ label,  
.rate label:hover ~ input:checked ~ label { color: #fab3cc !important;  } 
.scroll_ul {
		border : 1px solid black;
		overflow-y:scroll;
		list-style: none;
		height : 100px;
	}
</style>	