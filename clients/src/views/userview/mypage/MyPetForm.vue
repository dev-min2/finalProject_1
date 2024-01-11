<template>
    <div id="layoutSidenav_content">
		<main>
			<div class="container-fluid px-4">
				<div class="px-4 py-1 my-3 text-center">
								<h2 class="fw-bold mb-3">반려동물 정보입력</h2>
				</div>
				<div class="d-flex justify-content-center">
					<form @submit.prevent>
						<table class="table w-85">
							<tr align="center">
								<th>이 름</th>
								<th>반려동물종류</th>
								<th>반려동물생일</th>
								<th>성 별</th>
							</tr>
							<tr>
								<td>
                                    <input type="text" name="petName" class="form-control" v-model="petInfo.pet_name">
                                 </td>
								<td>
                                    <select class="form-select" name="petType" v-model="petInfo.pet_type">
                                        <option value="" selected disabled hidden>선택</option>
										<option value="d1">강아지</option>
										<option value="d2">고양이</option>
								    </select>
                                </td>
								<td>
                                  <input type="date" name="petBirth" v-model="petInfo.pet_birth" class="form-control">
                                </td>
								<td>
                                    <select class="form-select" name="petGender" v-model="petInfo.pet_gender"  style="width:90px">
                                        <option value="" selected disabled hidden>선택</option>
										<option value="e1">수컷</option>
										<option value="e2">암컷</option>
								    </select>
                                </td>
							</tr>
							<tr>
								<td colspan="4" align="center">
                                    <input type="submit" value="저장" class="btn text-white" style="background-color: #fab3cc; margin : 10px;" @click="isUpdated? updatePetQuery() : insertPetQuery()">
                                    <input type="reset" value="초기화" class="btn text-white" style="background-color: #bbbbbb;">
                                </td>
							</tr>
						</table>
					</form>
				</div>
			</div>
		</main>
	</div>
</template>

<script>
import axios from 'axios';

export default {
    data(){
        return {
            userNo : '',
            petNo : '',
            petInfo: {
                user_no : '', 
                pet_name : '', 
                pet_type : '', 
                pet_birth : '', 
                pet_gender : ''
            },
            isUpdated : false
        };
    },
    created(){
        this.userNo = this.$store.state.userNo;
        this.petNo = this.$route.query.petNo;
        //this.infoPetQuery();
        if(this.petNo > 0){
            //수정
            this.infoPetQuery();
            this.isUpdated = true;
        }
    },
    methods : {
        //단건조회
        async infoPetQuery(){
            this.$showLoading();
            let result = await axios.get(`/api/user/mypetform/${this.petNo}`)
                                    .catch(err => console.log(err));
            this.petInfo = result.data[0];
            this.petInfo.pet_birth = this.$dateFormat(this.petInfo.pet_birth);
            this.$hideLoading();
        },
        //수정
        async updatePetQuery(){
            if(!this.validation()) return;

            let petObj = {
                param : {
                    user_no : this.userNo, 
                    pet_name : this.petInfo.pet_name, 
                    pet_type : this.petInfo.pet_type, 
                    pet_birth : this.petInfo.pet_birth, 
                    pet_gender : this.petInfo.pet_gender
                }
            }
            this.$showLoading();
            let result = await axios.put(`/api/user/mypetform/${this.petNo}`, petObj)
                                     .catch(err=>console.log(err));
            if(result.data.affectedRows > 0){
                this.$showSuccessAlert('수정되었습니다. ');
            }else{
                this.$showFailAlert('수정에 실패했습니다. ');
            }
            this.$hideLoading();
            this.$router.push({ path: '/mypetinfo'});
        },
        //등록
        async insertPetQuery(){
            if(!this.validation()) return; //입력안된 값 없는지 확인

            let petObj = {
                param : {
                    user_no : this.userNo, 
                    pet_name : this.petInfo.pet_name, 
                    pet_type : this.petInfo.pet_type, 
                    pet_birth : this.petInfo.pet_birth, 
                    pet_gender : this.petInfo.pet_gender
                }
            }
            this.$showLoading();
            let result = await axios.post("/api/user/mypetform", petObj)
                                    .catch(err=>console.log(err));
            console.log(result.data);
            if(result.data.insertId > 0){
                this.$showSuccessAlert('등록되었습니다');
            }else{
               this.$showErrorAlert('등록에 실패했습니다. ');
            }
            this.$hideLoading();
            this.$router.push({ path: '/mypetinfo'});
        },
        //유효성검사
        validation(){ 
            if(this.petInfo.pet_name == '' || 
                this.petInfo.pet_type == '' ||
                this.petInfo.pet_birth == '' ||
                this.petInfo.pet_gender == '' ){
                this.$showWarningAlert('값을 입력해주세요. ');
                return false;
            }
            return true;
        }
    }
}
</script>

<style>

</style>