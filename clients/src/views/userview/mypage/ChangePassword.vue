<template>
    <div class="container my-5">
        <div id="box">
            <div class="input-form-backgroud row">
                <div class="input-form col-md-12 mx-auto">
                    <h4 class="mb-3" style="text-align:center">비밀번호를 입력하세요</h4>
                    <div class="row">
                        <div class="mb-3">
                            <label for="name">회원명</label> <input type="text" v-model="userName" class="form-control" id="name" name="name" value="" required>
                        </div>
                        <div class="mb-3">
                            <label for="email">이메일</label> <input type="email" v-model="email" class="form-control" id="email" name="email" placeholder="abc@naver.com" value="" required>
                        </div>
                        <div class="mb-4"></div>
                        <input class="btn btn-primary btn-lg btn-block" @click="sendMail" type="button" value="이메일 전송" style="background-color:pink;border:1px white;width:200px;margin:auto;">
                    </div>
                <footer class="my-3 text-center text-small"> </footer>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        data() {
            return {
                forgotType : '',
                email : '',
                userId : '',
                userName : ''
            }
        },
        created() {

        },
        methods : {
            async sendMail() {
                let sendObj = {
                    forgotType : this.forgotType,
                    user_email : this.email,
                    user_name : this.userName,
                    user_id : this.userId
                };
                this.$showLoading();
                const result = await axios.post('/api/user/forgot-account', { forgotInfo : sendObj}, { headers : {"Content-Type" : "application/json"}});
                if(result.status == 200) {
                    this.$showSuccessAlert('메일 전송완료. 메일을 확인해주세요.',null);        
                    this.$router.push({path : '/login'});
                }
                else {
                    this.$showFailAlert('오류 발생 : ' + result.status,null);
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
	width:600px;
	margin:auto;
}
</style>