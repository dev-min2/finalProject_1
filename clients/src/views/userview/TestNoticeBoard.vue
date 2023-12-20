<template>
    <section class="pt-2 pb-4">
		<div class="container px-4 px-lg-5 mt-3">
			<h3>공지사항 작성</h3>
			<form @submit.prevent="uploadProduct" ref="uploadForm" class="row">
				<table class="table">
					<tr>
						<th>제목</th>
						<td colspan="3"><input type="text" name="productName" class="form-control"></td>
					</tr>
					<tr>
						<th>중요도</th>
						<td>
							<select class="form-select" name="petType" v-model="petType" aria-label="Default select example">
                                <option selected value="dog">상</option>
                                <option value="cat">하</option>
							</select>
						</td>
						<th>노출기간</th>
						<td>
							<input type="date" name="productName" class="form-control">
						</td>
					</tr>
					<tr ref="target">
						<th>내용</th>
						<!-- <td colspan="3"><textarea cols="100" rows="6" name="productDesc"
								class="form-control"></textarea></td> -->
						<td>
							<div id="editor">
							</div>
						</td>
					</tr>
					<tr>
						<th>파일추가하기</th>
						<td><input ref="prImg" type="file" name="productImage" class="form-control" @change="uploadMultipleFile($event.target)"></td>
					</tr>
					<input type="hidden" ref="deschtml" name="deschtml">
					<tr>
						<td colspan="2">
							<input type="submit" value="저장" class="btn btn-primary"> 
							<input type="reset" value="초기화" class="btn btn-warning">
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
            petType : 'dog',
			fileCount : 0
        }
    },
    methods : {
        async uploadFile() {
            this.$refs.prImg.name = `productImage/${this.petType}`;
            this.$refs.prDeImg.name = `productDetailImage/${this.petType}`;
            
            const formData = new FormData(this.$refs.uploadForm);
            console.log(this.$refs.uploadForm);
            let result = await axios.post('/api/user/upload', formData);
            console.log(result);
        },
		async uploadProduct() {
			this.$refs.deschtml.value = editor.getHTML(); // html값 넣어주고
			this.$refs.prImg.name = `productImage/${this.petType}`;
			const formData = new FormData(this.$refs.uploadForm);
			let result = await axios.post('/api/user/uploadProduct', formData);
			console.log(result);
		},
		async uploadMultipleFile(file) {
			// 화면에 추가하기.(파일 첨부도 따로할려면 업로드할때마다 처리해줘야할듯?)
			// 이건조금 고민해봐야함.
			let inputTag = document.createElement('input');
			inputTag.setAttribute('type','hidden');
			inputTag.setAttribute('name',`uploadFile${this.fileCount}`);
			inputTag.setAttribute('class','form-control');

			// 파일복사
			const newFiles = new DataTransfer();
			for (let i = 0; i < file.files.length; i++) {
				newFiles.items.add(file.files[i]);
			}
			inputTag.files = newFiles.files;

			
			let trTag = document.createElement('tr');
			let thTag = document.createElement('th');
			let tdTag = document.createElement('td');
			let tdTag2 = document.createElement('td');
			let btnTag = document.createElement('button');

			trTag.appendChild(thTag);
			trTag.appendChild(tdTag);
			trTag.appendChild(tdTag2);
			tdTag2.appendChild(btnTag);
			thTag.innerHTML = `추가된파일`
			tdTag.innerHTML = file.value.substr(file.value.lastIndexOf('\\') + 1,file.value.length);
			btnTag.innerHTML = '삭제';
			btnTag.addEventListener('click',this.deleteUploadFile(inputTag.files));

			file.value ='';	
			this.$refs.target.insertAdjacentElement('afterend',trTag);
		},
		deleteUploadFile(target) {
			console.log(target);
		}
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
						console.log('?');
						const formData = new FormData();
						formData.append('image', blob);

						let result = await axios.post('/api/user/upload',formData,{"Content-Type": "multipart/form-data"});
						const fileName = result.data;
						console.log(result);
						
						let imageUrl = '';
						if(this.$store.state.testData) {
							imageUrl = `http://192.168.0.40:12532/uploads/productDescInImg/${fileName}`;
						}
						else {
							imageUrl = `http://localhost:12532/uploads/productDescInImg/${fileName}`;
						}

						callback(imageUrl, 'image alt attribute');
					}
				},
        });
	}
}
</script>
