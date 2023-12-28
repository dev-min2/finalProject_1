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
							<select v-model="sel" class="form-select" aria-label="Default select example">
                                <option v-for="sub in subCodes" :value="sub.sub_code_name" :key="sub.sub_code" >{{sub.sub_code_name}}</option>
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
							<div id="editor">
							</div>
						</td>
					</tr>
						<tr>
							<th>파일 첨부</th>
							<td colspan="2">
								<ul class="scroll_ul">
									<li v-for="(attachFile,idx) in fileList" :key="idx" style="height:30px;">
										{{attachFile.displayName}}
										<button style="float:right;" @click="deleteAttachFile(attachFile.originName)">삭제</button>
									</li>
								</ul>
							</td>
						</tr>
					
					<tr>
						<th>파일추가하기</th>
						<td colspan="2"><input ref="prImg" type="file" name="noticeFile" class="form-control" @change="uploadMultipleFile($event.target)"></td>
					</tr>
					<input type="hidden" ref="deschtml" name="deschtml">
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
import Editor from '@toast-ui/editor'; /* ES6 모듈 방식 */
import '@toast-ui/editor/dist/toastui-editor.css'; // Editor 스타일
import axios from 'axios'

let editor = null;
export default {
    data() {
        return {
			noticeBoardInfo : {
				title : '',
				startDate : null,
				endDate : null,
				html : ''
			},
			attachFileCount : 0,
            subCodes : {},
            sel : '',
			randNoticeValue : '',
			curTimeVal : '',
			descFileCount : 0,
			fileList : [],
			file : { // 이런형태로 넣으란 의미로 선언
				originName : '',
				displayName : '',
			}
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
            return this.sel == "상";
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
		async uploadMultipleFile(file) {
			// 파일복사(이렇게 해야 파일 전송이댐)
			const newFiles = new DataTransfer();
			for (let i = 0; i < file.files.length; i++) {
				newFiles.items.add(file.files[i]);
			}
			file.value = '';
			let realFile = newFiles.files;
			const curFileName = realFile[0].name;
			
			const formData = new FormData();
						
			const sendFileName = 'notice_' + String(this.randNoticeValue) +'_'+ String(this.curTimeVal) + '_' + (this.attachFileCount++) + '_' + curFileName;
			const boardType = "notice";
			formData.append('fileName',sendFileName);
			formData.append('board',boardType);
			formData.append('attachFile', realFile[0]);

			let result = await axios.post('/api/file/uploadAttachFile',formData,{"Content-Type": "multipart/form-data"});
			
			this.fileList.push({
				originName : sendFileName,
				displayName : curFileName
			});
		},
		async deleteAttachFile(fileOriginName) {
			const result = await axios.delete(`/api/file/uploadAttachFile/notice/${fileOriginName}`);
			if(result.data == "OK") {
				for(let i = 0; i < this.fileList.length; ++i) {
					if(this.fileList[i].originName == fileOriginName) {
						this.fileList.splice(i,1);
						break;
					}
				}
			}
		},
		async registPost() {
			this.noticeBoardInfo.html = editor.getHTML();
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
		}
    },
	// 해당 라우트 뷰를 벗어날 때.
	beforeRouteLeave() {
		axios.delete(`/api/file/uploadAttachFile/notice/-1`);
	},
	mounted() {
			editor = new Editor({
				el: document.querySelector('#editor'),
				height: '600px',
				initialEditType: 'wysiwyg',
				previewStyle: 'vertical',
				hooks: {
					// 이미지가 올라오면 해당 이미지가 blob매개변수에 담김
					addImageBlobHook: async (blob, callback) => {
						const formData = new FormData();
						
						const sendFileName = 'notice_' + String(this.randNoticeValue) +'_'+ String(this.curTimeVal) + '_' + (this.descFileCount++) + '_' + blob.name;
						const boardType = "notice";
						formData.append('fileName',sendFileName);
						formData.append('board',boardType);
						formData.append('image', blob);

						let result = await axios.post('/api/file/uploadDescImg',formData,{"Content-Type": "multipart/form-data"});
						const fileName = result.data;
						console.log(result);
						
						let imageUrl = '';
						// if(this.$store.state.testData) {
						// 	imageUrl = `http://192.168.0.40:12532/uploads/productDescInImg/${fileName}`;
						// }
						// else {
						// 	imageUrl = `http://localhost:12532/uploads/productDescInImg/${fileName}`;
						// }
						imageUrl = `${this.$store.state.curIp + result.data}`;
						console.log(imageUrl);
						callback(imageUrl, 'image alt attribute');
					}
				},
        });
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
