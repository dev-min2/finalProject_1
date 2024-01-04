<template>
    <div class="container my-5">
        <div id="box">
            <div class="input-form-backgroud row">
                <div class="input-form col-md-12 mx-auto">
                    <h4 class="mb-3" style="text-align:center">비밀번호를 입력하세요</h4>
                    <div class="row">
                        <div class="mb-3">
                            <label for="prevPass">기존 비밀번호</label> <input type="password" v-model="prevPassword" class="form-control" id="prevPass" name="prevPass" value="" required>
                        </div>
                        <div class="mb-3">
                            <label for="newPass">변경할 비밀번호</label> <input type="password" v-model="nextPassword" class="form-control" id="newPass" name="newPass"  value="" required>
                        </div>
                        <div class="mb-4"></div>
                        <input class="btn btn-primary btn-lg btn-block" @click="sendMail" type="button" value="비밀번호 변경하기" style="background-color:pink;border:1px white;width:200px;margin:auto;">
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
                prevPassword : '',
                nextPassword : ''
            }
        },
        created() {
            console.log(this.$route.path);
        },
        methods : {
            async sendMail() {
                const userNo = this.$store.state.userNo;
                let sendObj = {
                    user_no : userNo,
                    prevPassword : this.$encryptAES256(this.prevPassword),
                    nextPassword : this.$encryptAES256(this.nextPassword)
                };
                this.$showLoading();
                const result = await axios.put('/api/user/password', sendObj, { headers : {"Content-Type" : "application/json"}});
                if(result.data === "FAIL") {
                    this.$showFailAlert('기존 비밀번호가 일치하지 않습니다.');
                }
                else {
                    if(result.data) {
                        this.$showSuccessAlert('비밀번호 변경 완료.');
                        this.$store.commit("setUserNo", -1);
                        this.$store.commit("setUserPermission", '');
                        this.$router.push({path : '/login'});
                    }
                    else {
                        this.$showFailAlert('오류 발생 : ' + result.status, null);
                    }
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