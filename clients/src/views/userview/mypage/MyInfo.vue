<template>
	<div id="layoutSidenav_content">
		<main>
						<!--마이페이지 폼-->
						<div class="container-fluid px-4">
							<h3 class="mt-4" style= text-align:center>나의 정보</h3>
                            <br>
                            <hr>
							<div class="mb-3">
								<label for="userId">아이디</label> 
								<input type="text" class="form-control" name="userId" readonly :value="userInfo.user_id">
							</div>
							<div class="mb-3">
								<label for="userName">이름</label> 
								<input type="text" class="form-control" name="userName"  readonly :value="userInfo.user_name">
							</div>
							<div class="mb-3">
								<label for="email">이메일</label> 
								<input type="text" class="form-control" name="email" :value="userInfo.user_email" readonly>
							</div>
							<div class="mb-3">
								<label for="birthday">생년월일</label> 
								<input type="date" class="form-control" name="birthday" :value="$dateFormat(userInfo.user_birth)" readonly >
							</div>
							<div class="mb-3">
								<label for="phoneNumber">전화번호</label> 
								<input type="text" class="form-control" name="phoneNumber" :value="userInfo.user_phone" readonly>
							</div>
							<div class="mb-3">
								<label for="addr">주소</label> 
								<input type="text" class="form-control" name="addr" :value="userInfo.user_addr" readonly>
							</div>
							<div class="mb-3">
								<label for="joinDate">가입일</label> 
								<input type="text" class="form-control" name="joinDate" :value="$dateFormat(userInfo.user_joindate)" readonly>
							</div>
						</div>
						<!--버튼-->
						<div class="mb-4" style="text-align:center;">
                            <button type="button" @click="changeMyInfo" class="btn text-white" style="margin:10px;padding:8px; background-color: #fab3cc;">내 정보 변경</button>
                            <button type="button" @click="changePassword" class="btn text-white" style="margin:10px;padding:8px; background-color: #acb1f8;" >비밀번호 변경</button>
                            <button type="button" class="btn text-white" style="margin:10px;padding:8px; background-color: #bbbbbb;"><router-link :to="{path : '/main'}" style="text-decoration:none; color:white;">돌아가기</router-link></button>
                        </div>
		</main>
	</div>

</template>

<script>
import axios from 'axios'
export default {
	data() {
		return {
			userInfo : {
				user_no : 0,
				user_id : '',
				user_name : '',
				user_birth : '',
				user_email : '',
				user_phone : '',
				user_addr : '',
				user_joindate : ''
			}
		}
	},
	created() {
		this.getUserInfo();
	},
	methods : {
		async getUserInfo() {
			this.$showLoading();
			const result = await axios.get(`/api/user/info?userNo=${this.$store.state.userNo}`);
			this.userInfo.user_no = result.data.user_no;
			this.userInfo.user_id = result.data.user_id;
			this.userInfo.user_name = result.data.user_name;
			this.userInfo.user_birth = result.data.user_birth;
			this.userInfo.user_email = result.data.user_email;
			this.userInfo.user_phone = result.data.user_phone;
			this.userInfo.user_addr = result.data.user_addr;
			this.userInfo.user_joindate = result.data.user_joindate;
			this.$hideLoading();
		},
		changeMyInfo() {
			this.$router.push({path : '/changeInfo'});
		},
		changePassword() {
			if(this.$store.state.socialId > 0) {
				this.$showWarningAlert('소셜 로그인은 비밀번호 변경이 불가능합니다.');
				return;
			}
			this.$router.push({ path : '/user-pass'});
		}
	}
}
</script>

<style>

</style>
