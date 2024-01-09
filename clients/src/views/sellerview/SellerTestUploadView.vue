<template>
    <section class="pt-2 pb-4">
		<div class="container px-4 px-lg-5 mt-3">
			<h3>상품 등록화면</h3>
			<form @submit.prevent="uploadProduct" ref="uploadForm" class="row">
				<table class="table">
					<tr>
						<th class="col-md-2">애완동물타입</th>
						<td class="col-md-4">
							<select class="form-select" name="petType" v-model="productInfo.pet_type" aria-label="Default select example">
                                <option selected value="d1">강아지</option>
                                <option value="d2">고양이</option>
							</select>
						</td>
						<th class="col-md-2">카테고리</th>
						<td class="col-md-4">
							<select class="form-select" name="categoryNo" v-model="productInfo.category_no" aria-label="Default select example">
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
						<td colspan="3"><input type="text" v-model="productInfo.product_name" name="productName" class="form-control"></td>
					</tr>
					<tr>
						<th>상품 간단 정보</th>
						<td colspan="3"><textarea name="productDetailDesc" class="form-control" v-model="productInfo.product_desc"></textarea></td>
					</tr>
					<tr>
						<th>가격</th>
						<td><input type="text" name="productPrice" class="form-control" v-model="productInfo.product_price"></td>
						<th>상품수량</th>
						<td><input type="number" name="productStock" class="form-control" v-model="productInfo.product_stock"></td>
					</tr>
					<tr>
						<th>상품설명</th>
						<!-- <td colspan="3"><textarea cols="100" rows="6" name="productDesc"
								class="form-control"></textarea></td> -->
						<td>
							<TextEditor :boardType="'productUploads'" :userNo="$store.state.userNo" :randBoardValue="randValue" :curTimeVal="curTimeVal" ref="editor"/>
						</td>
					</tr>
					<tr>
						<th>메인이미지</th>
						<td><input ref="prImg" type="file" name="productImage" class="form-control" ></td>
					</tr>
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
import TextEditor from '../../components/common/TextEditor.vue'
import axios from 'axios'

export default {
	components : {
		TextEditor
	},
    data() {
        return {
		productInfo:{			
 			 product_no : '',
             pet_type : '',
             product_name : '',
             product_price : '',
             product_detail_desc : '',
             product_image : '',
             product_stock : '',
             category_no : '',
             product_desc : '',
             product_public_state : '',
             user_no : ''
			},
        randValue : '',
	    curTimeVal : '',
        }
    },

	created(){

        //this.productInfo.user_no = this.$store.state.userNo;
        this.productInfo.user_no = 1;
		this.randValue = Math.floor(Math.random() * (999999 - 111111 + 1)) + 111111;
		this.curTimeVal = new Date().getTime();
	},

    methods : {
		async uploadProduct() {
			const formData = new FormData(this.$refs.uploadForm);
            const html = this.$refs.editor.editor.getHTML();
            console.log(html);
            formData.append('product_desc', html);
            formData.append('user_no', 1);
            formData.append('product_public_state', 'I1');
            this.$showLoading();
			let result = await axios.post('/api/product/uploadProduct', formData);
            this.$hideLoading();
            if(result.data.insertId > 0) {
                this.$showSuccessAlert('상품등록 성공');
                this.$router.push({path : '/SellerProductList'});
            }
            else {
                this.$showFailAlert('상품등록 실패');
            }
		},
    }
}
</script>
<style scoped>
 .table-header {
        background-color: #5f5f5f;
        color: rgb(255, 255, 255);
        padding: 10px;
        margin-bottom: 10px;
        margin-top: 5px;
        margin-left: 5px;
        font-weight: bold;
        font-size: 18px;
        text-shadow: -1px 0px rgb(0, 0, 0), 0px 1px rgb(0, 0, 0), 1px 0px rgb(0, 0, 0), 0px -1px rgb(0, 0, 0);

    }


    table {
        border-collapse: collapse;
        width: 100%;
        border: 2px solid #000000;
       
        margin-left: 10px;
    }

    th,
    td {
        border-collapse: collapse;
        padding: 8px;
       
        border: 2px solid #000000;
    }

    th {
        border: 2px solid #000000;
        background-color: #f2f2f2;

    }
</style>
