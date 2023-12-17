!<template>
<div id="box">
    <form @submit.prevent>  
		<div class="container">
			<div class="input-form-backgroud row">
				<div class="input-form col-md-12 mx-auto">
					<h4 class="mb-5" style="text-align: center;font-size:50px;color:pink">마이디어 펫</h4>
					<div class="row">
						<div class="mb-3">
							<label for="userId">아이디</label> 
                            <input type="text" class="form-control" v-model="userId" id="userId" name="userId" placeholder="" value="" required>
							<div class="invalid-feedback">아이디를 입력해주세요.</div>
						</div>
						<div class="mb-3">
							<label for="userPw">비밀번호</label> 
                            <input type="password" class="form-control" v-model="userPw" id="userPw" name="userPw" placeholder="" value="" autoComplete="off" required>
							<div class="invalid-feedback">비밀번호를 입력해주세요.</div>
						</div>
                        <div class="d-flex justify-content-between mb-2">
                            <div class="box__login-save">
                                <input id="checkboxKIDBase" name="checkboxKIDBase" type="checkbox" v-model="idSaveChecked">
                                <label for="checkboxKIDBase">아이디 저장</label>
                            </div>
                            <div class="box__login-link">
                                <span><router-link to="/">아이디 찾기 </router-link></span>
                                <span><router-link to="/">| 비밀번호 찾기</router-link></span>
                            </div>
                        </div>
						
                        <div class="mt-4">
                            <input class="btn btn-primary btn-lg btn-block" type="submit" value="로그인" @click="login">
                            <router-link class="btn btn-primary btn-lg btn-block" :to="{ name : 'join', params : { sellerJoin : 0 } }" >회원가입</router-link>
                            <router-link class="btn btn-primary btn-lg btn-block" :to="{ name : 'join', params : { sellerJoin : 1 } }" >판매자 회원가입</router-link>
                        </div>

                        <div class="mt-4 d-flex justify-content-center">
                            <hr class="w-75" style="display:block;">
                        </div>
                        <div class="d-flex justify-content-center">
                            <p>SNS 로그인</p>
                        </div>
                        <div class="d-flex justify-content-center">
                            <router-link to="/"><img src="../../assets/commonResource/kakaoLogo.png" alt="" style="width:48px; height:48px;"></router-link>
                        </div>
                    </div>
                </div>
				<footer class="my-3 text-center text-small"> </footer>
			</div>
		</div>
    </form>
	</div>
</template>

<script>
    import axios from 'axios'
    import sha256 from 'crypto-js/sha256';
    export default {
        data() {
            return {
                userId : localStorage.getItem("userId") || "",
                userPw : '',
                idSaveChecked : false
            }
        },
        methods : {
            async login() {
                this.$showLoading();
                
                const userObj = {
                    userId : this.userId,
                    userPw : sha256(this.userPw).toString()
                };

                let result = await axios.post('/api/user/login',{user : userObj}, {'Content-Type' : 'application/json'});
                console.log(result);
                if(result.status == 200 && result.data.length > 0 && result.data[0].user_no > 0) {
                    alert('로그인 성공!');
                    if(this.idSaveChecked) {
                        localStorage.setItem("userId", this.userId);
                    }

                    this.$store.commit('setUserNo', result.data[0].user_no);
                    this.$router.push({path : '/'});
                }
                else {
                    alert('아이디와 비밀번호를 확인해주세요');
                }
                this.$hideLoading();
            }
        }
    }
</script>

<style scoped>
    .input-form {
	max-width: 500px;
	padding: 32px;
	background: #e6c1c161;
	-webkit-border-radius: 10px;
	-moz-border-radius: 10px;
	border-radius: 10px;
}
#box{
	border:1px;
}
.box__login-link span a {
    text-decoration-line: none;
    color: #999;
}
</style>