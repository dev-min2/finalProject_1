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
                                <input type="radio" id="rating5" name="rating" v-model="star_cnt_radio[4]"><label for="rating5" title="5점"></label>
                                <input type="radio" id="rating4" name="rating" v-model="star_cnt_radio[3]"><label for="rating4" title="4점"></label>
                                <input type="radio" id="rating3" name="rating" v-model="star_cnt_radio[2]"><label for="rating3" title="3점"></label>
                                <input type="radio" id="rating2" name="rating" v-model="star_cnt_radio[1]"><label for="rating2" title="2점"></label>
                                <input type="radio" id="rating1" name="rating" v-model="star_cnt_radio[0]"><label for="rating1" title="1점"></label>
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
							<input v-if="curModifyForm == false" type="submit" value="저장" class="btn btn-primary mx-3" @click="registPost">
							<input v-else type="submit" value="수정" class="btn btn-primary mx-3" @click="modifyReviewPost">
							<router-link class="btn btn-warning" to="/myreview">수정취소</router-link>
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
				html : null
			},
			curTimeVal : '',
			curModifyForm : false,
			boardNo : '',
			product_name : '',
			star_cnt_radio : []
        }
    },
	created (){
		console.log(this.curModifyForm);
		this.reviewBoardInfo.product_no = this.$route.query.pno;
		this.product_name = this.$route.query.pname;
		this.reviewNo = this.$route.query.modify;
		
		if(this.reviewNo > 0) {
			this.curModifyForm = true;
			this.getReviewBoardInfo(this.reviewNo);
		}

		this.randNoticeValue = Math.floor(Math.random() * (999999 - 111111 + 1)) + 111111;
		this.curTimeVal = new Date().getTime();
	},
	methods : {
		async registPost(){
			const editor = this.$refs.editor.editor;
			this.reviewBoardInfo.html = editor.getHTML();
			const sendObj = {
				param : {
					reviewBoardInfo : this.reviewBoardInfo,
					product_no : this.reviewBoardInfo.product_no
				}
			}
			const result = await axios.post(`/api/board/myreview/write`,sendObj);
			
			if(result.status == 200) {
				this.$showSuccessAlert('등록성공',null);
				this.$router.push({path : '/myreview'});
			}
		},
		async getReviewBoardInfo(reviewNo) {
			this.$showLoading();
            const result = await axios.get(`/api/board/myreview/info?rno=${reviewNo}`);
            if(result.status == 200) {
                this.reviewBoardInfo.product_name = this.product_name;
				this.reviewBoardInfo.html = result.data.content;
            }
            else {
                this.$showFailAlert('데이터를 불러오는데 실패했습니다.');
                this.$router.push({path : "/myreview"});
            }
            this.$hideLoading();
            return 1;
		},
		//리뷰수정
		async modifyReviewPost(){
			const editor = this.$refs.editor.editor;
			this.reviewBoardInfo.html = editor.getHTML();
			const sendObj = {
					param : {
						reviewBoardInfo : this.reviewBoardInfo,
						review_no : this.reviewBoardInfo.review_no
				}
			}
			const result = await axios.put(`/api/board/myreview/write`, sendObj);
			if(result.status == 200) {
				this.$showSuccessAlert('수정성공',null);
				this.$router.push({path : `/myreview/write/${this.reviewNo}`});
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
.rate label:hover,.rate label:hover ~ label { color: #f73c32 !important;  } 
.rate input:checked + .rate label:hover,
.rate input input:checked ~ label:hover,
.rate input:checked ~ .rate label:hover ~ label,  
.rate label:hover ~ input:checked ~ label { color: #f73c32 !important;  } 
.scroll_ul {
		border : 1px solid black;
		overflow-y:scroll;
		list-style: none;
		height : 100px;
	}
</style>	