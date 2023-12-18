<template>
    <section class="pt-2 pb-4">
		<div class="container px-4 px-lg-5 mt-3">
			<h3>상품 등록화면</h3>
			<form @submit.prevent="uploadProduct" ref="uploadForm" class="row">
				<table class="table">
					<tr>
						<th class="col-md-2">애완동물타입</th>
						<td class="col-md-4">
							<select class="form-select" name="petType" v-model="petType" aria-label="Default select example">
                                <option selected value="dog">강아지</option>
                                <option value="cat">고양이</option>
							</select>
						</td>
						<th class="col-md-2">카테고리</th>
						<td class="col-md-4">
							<select class="form-select" name="categoryNo" aria-label="Default select example">
                                <optgroup label="사료">
                                    <option value="5">건식사료</option>
                                    <option value="6">습식사료</option>
                                </optgroup>
                                <optgroup label="간식">
                                    <option value="7">수제간식</option>
                                    <option value="8">캔/파우치</option>
                                    <option value="9">통살</option>
                                </optgroup>
                                <optgroup label="건강관리">
                                    <option value="10">종합영양제</option>
                                    <option value="11">피부/모질</option>
                                    <option value="12">뼈/관절</option>
                                </optgroup>
                                <optgroup label="미용/목욕">
                                    <option value="13">샴푸/린스</option>
                                    <option value="14">브러쉬</option>
                                    <option value="15">발톱/발관리</option>
                                </optgroup>
							</select>
						</td>
					</tr>
					<tr>
						<th>상품명</th>
						<td colspan="3"><input type="text" name="productName" class="form-control"></td>
					</tr>
					<tr>
						<th>가격</th>
						<td><input type="text" name="productPrice" class="form-control"></td>
						<th>상품수량</th>
						<td><input type="text" name="productStock" class="form-control"></td>
					</tr>
					<tr>
						<th>상품설명</th>
						<!-- <td colspan="3"><textarea cols="100" rows="6" name="productDesc"
								class="form-control"></textarea></td> -->
						<td>
							<div id="editor">
							</div>
						</td>
					</tr>
					<tr>
						<th>메인이미지</th>
						<td><input ref="prImg" type="file" name="productImage" class="form-control"></td>
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
						const formData = new FormData();
						formData.append('image', blob);

						let result = await axios.post('/api/user/upload',formData,{"Content-Type": "multipart/form-data"});
						const fileName = result.data;
						console.log(result);
						// 나중에 storage서버를 따로 만들까..
						const imageUrl = `http://localhost:12532/uploads/productDescInImg/${fileName}`;

						callback(imageUrl, 'image alt attribute');
					}
				},
        });
	}
}
</script>
