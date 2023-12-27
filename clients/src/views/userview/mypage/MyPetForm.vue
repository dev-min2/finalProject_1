<template>
    <div id="layoutSidenav_content">
		<main>
			<div class="container-fluid px-4">
				<div class="px-4 py-1 my-3 text-center">
								<h2 class="fw-bold mb-3">내 반려동물 등록</h2>
				</div>
				<div class="d-flex justify-content-center">
					<form @submit.prevent>
						<table class="table w-85">
							<tr>
								<th>이름</th>
								<th>반려동물종류</th>
								<th>반려동물생일</th>
								<th>성별</th>
							</tr>
							<tr>
								<td>
                                    <input type="text" name="petName" class="form-control" v-model="petInfo.pet_name">
                                 </td>
								<td>
                                    <select class="form-select" name="petType" v-model="petInfo.pet_type" aria-label="Default select example">
										<option selected value="d1">강아지</option>
										<option value="d2">고양이</option>
								    </select>
                                </td>
								<td>
                                  <input type="date" name="petBirth" v-model="petInfo.pet_birth" class="form-control">
                                </td>
								<td>
                                     <select class="form-select" name="petGender" v-model="petInfo.pet_gender" aria-label="Default select example">
										<option selected value="e1">수컷</option>
										<option value="e2">암컷</option>
								    </select>
                                </td>
							</tr>
							<tr>
								<td colspan="4" align="center">
                                    <input type="submit" value="저장" class="btn text-white" style="background-color: #9999FF;" @click="insertPetQuery()"> 
                                    <input type="reset" value="초기화" class="btn btn-warning">
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
            petInfo: {
                user_no : '', 
                pet_name : '', 
                pet_type : '', 
                pet_birth : '', 
                pet_gender : ''
            }
        };
    },
    created(){
        this.userNo = this.$store.state.userNo;
    },
    methods : {
        async insertPetQuery(){
            let petObj = {
                param : {
                    user_no : this.userNo, 
                    pet_name : this.petInfo.pet_name, 
                    pet_type : this.petInfo.pet_type, 
                    pet_birth : this.petInfo.pet_birth, 
                    pet_gender : this.petInfo.pet_gender
                }
            }
            console.log(petObj);
            let result = await axios.post("/api/user/mypetform", petObj)
                                    .catch(err=>console.log(err));
            if(result.data.insertId > 0){
                alert('등록되었습니다');
            }
            this.$router.push({ path: '/mypetinfo'});
            console.log(petObj);
            console.log('펫 등록되나확인\'~\'*');
        },
    }
}
</script>

<style>

</style>