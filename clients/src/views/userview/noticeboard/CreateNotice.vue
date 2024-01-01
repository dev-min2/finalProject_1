<template>
    <section class="pt-2 pb-4">
		<div class="container px-4 px-lg-5 mt-3">
			<h3>공지사항 작성</h3>
			<form @submit.prevent="uploadProduct" ref="uploadForm" class="row">
				<table class="table">
					<tr>
						<th>제목</th>
						<td colspan="2"><input type="text" name="productName" class="form-control" v-model="noticeBoardInfo.title"></td>
					</tr>
					<tr>
						<th>중요도</th>
						<td colspan="2">
							<select v-model="noticeBoardInfo.sel" class="form-select" aria-label="Default select example">
                                <option v-for="sub in subCodes" :value="sub.sub_code" :key="sub.sub_code" >{{sub.sub_code_name}}</option>
							</select>
						</td>
					</tr>
					<template v-if="showDate">
						<tr>
							<th>노출기간</th>
							<td>
								<input type="date" name="productName" class="form-control" v-model="noticeBoardInfo.startDate">
							</td>
							<td>
								<input type="date" name="productName" class="form-control" v-model="noticeBoardInfo.endDate">
							</td>
						</tr>
                    </template>
					<tr ref="target">
						<th>내용</th>
						<!-- <td colspan="3"><textarea cols="100" rows="6" name="productDesc"
								class="form-control"></textarea></td> -->
						<td colspan="2">
							<TextEditor :boardType="'notice'" :userNo="$store.state.userNo" :randBoardValue="randNoticeValue" :curTimeVal="curTimeVal" ref="editor"/>
						</td>
					</tr>
						<tr>
							<th>파일 첨부</th>
							<td colspan="2">
								<InsertAttachFileList :boardType="'notice'" :userNo="$store.state.userNo" :randBoardValue="randNoticeValue" :curTimeVal="curTimeVal" />
							</td>
						</tr>
					<tr>
						<td colspan="2" style="text-align:center;">
							<input type="submit" value="저장" class="btn btn-primary mx-3" @click="registPost"> 
							<router-link class="btn btn-warning" to="/notice">작성취소</router-link>
						</td>
					</tr>
				</table>
			</form>
		</div>
	</section>
</template>

<script>
import TextEditor from '../../../components/common/TextEditor.vue'
import InsertAttachFileList from '../../../components/common/InsertAttachFileList.vue'
import axios from 'axios'

export default {
	components : {
		TextEditor,
		InsertAttachFileList
	},
    data() {
        return {
			noticeBoardInfo : {
				title : '',
				startDate : null,
				endDate : null,
				html : '',
				sel : ''
			},
            subCodes : {},

			// 꼭 부모에서 초기화해서 TextEditor 및 InsertAttachFileList 컴포넌트에 바인딩해야함.
			randNoticeValue : '',
			curTimeVal : ''
        }
    },
    created() {
        if(this.$store.state.userPermission != 'F3') {
            this.$showWarningAlert('권한이 없습니다.');
            this.$router.push({path : "/main"});
        }
		
        this.getSubcode();
		// 111111 ~ 999999 랜덤 값.
		this.randNoticeValue = Math.floor(Math.random() * (999999 - 111111 + 1)) + 111111;
		this.curTimeVal = new Date().getTime();
    },
    computed : {
        showDate() {
            return this.noticeBoardInfo.sel == "J1";
        }
    },
    methods : {
        async getSubcode() {
            const result = await axios.post('/api/main-code',{ mainCodeName : "공지사항중요도범위코드" }, { headers : { "Content-Type" : "application/json"}});
            if(result.status != 200) {
                this.$showFailAlert("데이터를 불러오는데 실패했습니다.",null);
                this.$router.push({path : "/main"});
                return;
            }
            this.subCodes = result.data;
        },
		async registPost() {
			if(!this.checkValidation()) {
				return false;
			}

			const editor = this.$refs.editor.editor;
			this.noticeBoardInfo.html = editor.getHTML();
			this.noticeBoardInfo.importanceLevel = this.noticeBoardInfo.sel;
			const sendObj = {
				param : {
					randNoticeValue : this.randNoticeValue,
					curTimeVal : this.curTimeVal,
					noticeBoardInfo : this.noticeBoardInfo
				}
			}
			const result = await axios.post('/api/board/notice', sendObj, { headers : {"Content-Type" : "application/json"}});
			if(result.status == 200) {
				this.$showSuccessAlert('등록성공',null);
				this.$router.push({path : '/notice'});
			}
		},

		checkValidation() {
			if(this.noticeBoardInfo.title == '') {
				this.$showWarningAlert('제목을 입력해주세요.');
				return false;
			}

			if(this.noticeBoardInfo.sel == '') {
				this.$showWarningAlert('공지사항 중요도 선택해주세요.');
				return false;
			}

			if(this.noticeBoardInfo.sel == 'J1') {
				const startDate = this.noticeBoardInfo.startDate;
				const endDate = this.noticeBoardInfo.endDate;
				if(startDate == null || endDate == null) {
					this.$showWarningAlert('공지사항 중요도 기간을 선택해주세요.');
					return false;
				}
			}

			return true;
		}
    },
	watch : {
		noticeBoardInfo(newVal, oldVal) {
			if(newVal.sel == 'J1' && newVal.startDate != null && newVal.endDate != null) {
				//new Date(newVal.startDate);
			}
		}
	}
}
</script>

<style scoped>
	.scroll_ul {
		border : 1px solid black;
		overflow-y:scroll;
		list-style: none;
		height : 100px;
	}
</style>
