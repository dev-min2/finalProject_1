!<template>
<div id="box">
    <form @submit.prevent>  
		<div class="container my-5">
			<div class="input-form-backgroud row">
				<div class="input-form col-md-12 mx-auto">
					<h4 class="mb-5" style="text-align: center;font-size:50px;color:pink">디어마이 펫</h4>
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
                                <span><router-link :to="{ name : 'forgotAccount', params : { forgot : 'id' }}">아이디 찾기 </router-link></span>
                                <span><router-link :to="{ name : 'forgotAccount', params : { forgot : 'pw' }}">| 비밀번호 찾기</router-link></span>
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
                            <a href="#" @click="kakaoLogin"><img src="../../assets/commonResource/kakaoLogo.png" alt="" style="width:48px; height:48px;"></a>
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
    export default {
        data() {
            return {
                userId : localStorage.getItem("userId") || "",
                userPw : '',
                idSaveChecked : localStorage.getItem("userId") != "" ? true : false
            }
        },
        methods : {
        async cartCount(){
            let result = await axios.get(`/api/user/cart-count/${this.$store.state.userNo}`).catch((err)=>console.log(err));
            console.log(result);
            this.$store.commit('setCartCnt',result.data.CNT);
        },
            async kakaoLogin() {
                let myThis = this;
                Kakao.Auth.loginForm({
                    scope : 'profile_nickname',
                    success : (authToken) => {
                        Kakao.API.request({
                            url: '/v2/user/me',
                            success: async (res) => {
                                const kakao_account= res.kakao_account;
                                const kakao_id = res.id;
                                this.$store.commit('setSocialId', kakao_id);
                                this.$store.commit('setAccessToken',authToken.access_token);
                                this.$store.commit('setRefreshToken',authToken.refresh_token);
                                // 가입한적이 있는지 체크.
                                let result = await axios.post('/api/user/checkId',{ id : kakao_id }, {'Content-Type' : 'application/json'});
                                if(result.data) { 
                                    myThis.$router.push({name : "join", params : { sellerJoin : "socialjoin" }})
                                }
                                else {
                                    //가입한적o
                                    this.$showLoading();
                                    const userObj = {
                                        userId : String(kakao_id),
                                        userPw : this.$encryptAES256("kakao")
                                    };
                                    
                                    let result = await axios.post('/api/user/login',{user : userObj}, {'Content-Type' : 'application/json'});
                                    if(result.status == 200 && result.data.length > 0 && result.data[0].user_no > 0) {
                                        this.$store.commit('setUserNo', result.data[0].user_no);
                                        this.$store.commit('setUserPermission', result.data[0].user_permission);
                                        this.cartCount();
                                        this.$router.push({path : '/main'});
                                    }
                                    else {
                                        console.log('실패?');
                                    }
                                    this.$hideLoading();
                                }
                            }
                        });
                    }
                })
            },
            async login() {
                this.$showLoading();
                
                const userObj = {
                    userId : this.userId,
                    userPw : this.$encryptAES256(this.userPw)
                };

                let result = await axios.post('/api/user/login',{user : userObj}, {'Content-Type' : 'application/json'});
                console.log(result);
                if(result.status == 200 && result.data.length > 0 && result.data[0].user_no > 0) {
                    if(this.idSaveChecked) {
                        localStorage.setItem("userId", this.userId);    
                    }
                    else {
                        localStorage.setItem("userId", "");
                    }
                    this.$store.commit('setUserNo', result.data[0].user_no);
                    this.$store.commit('setUserPermission', result.data[0].user_permission);
                    this.cartCount();
                    this.$router.push({path : '/main'});
                }
                else {
                    this.$showWarningAlert('아이디와 비밀번호를 확인해주세요',null);        
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