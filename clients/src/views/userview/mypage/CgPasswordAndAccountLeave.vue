<template>
    <div class="container my-5">
        <div id="box">
            <div class="input-form-backgroud row">
                <div class="input-form col-md-12 mx-auto">
                    <template v-if="curPath == '/user-pass'">
                        <h4 class="mb-3" style="text-align:center">비밀번호를 입력하세요</h4>
                        <div class="row">
                            <div class="col-md-10 mb-3">
                                <label for="prevPass">기존 비밀번호</label> <input type="password" v-model="prevPassword" class="form-control" id="prevPass" name="prevPass" value="" style="width:93%;" required>
                            </div>
                            <div class="col-md-10 mb-3">
                                <label for="newPass">변경할 비밀번호</label> 
                                <input v-if="showPassword == false" type="password" v-model="nextPassword" class="form-control" id="newPass" name="newPass"  value="" style="width:93%;" required>
                                <input v-else type="text" v-model="nextPassword" class="form-control" id="newPass" name="newPass"  value="" style="width:93%;" required>
                                <input v-if="showPassword == false" type="password" v-model="nextPasswordConfirm" class="form-control mt-1" id="newPass" name="newPass"  value="" style="width:93%;" required>
                                <input v-else type="text" v-model="nextPasswordConfirm" class="form-control mt-1" id="newPass" name="newPass"  value="" style="width:93%;" required>
                            </div>
                            <i v-if="showPassword == false" class="fas fa-eye-slash" type="button" @click="showPassword = !showPassword" value="보기" style="margin-top:42px;width:55px;height:30px;color:gray;"></i>
                            <i v-else class="fas fa-eye" type="button" @click="showPassword = !showPassword" value="보기" style="margin-top:42px;width:55px;height:30px;color:gray;"></i>
                            <p class="ml-1" v-if="userPwCheck == false" id='alert' style="color:red;font-size:12px">비밀번호: 8~16자의 영문 대/소문자, 숫자, 특수문자(!@#$%^)를 사용해 주세요.</p>
                            <p class="ml-1" v-else id='alert' style="color:green;font-size:12px">비밀번호가 일치합니다.</p>
                            <div class="mb-4"></div>
                            <input class="btn btn-primary btn-lg btn-block" @click="sendMail" type="button" value="비밀번호 변경하기" style="background-color:pink;border:1px white;width:200px;margin:auto;">
                        </div>
                    </template>
                    <template v-else>
                        <h4 class="mb-3" style="text-align:center">회원 탈퇴</h4>
                        <div class="row">
                            <template v-if="$store.state.socialId <= 0">
                                <div class="mb-3">
                                    <label for="idText">탈퇴할 아이디 입력</label> <input type="text" v-model="prevPassword" class="form-control" id="idText" name="idText" value="" required>
                                </div>
                                <div class="mb-5">
                                    <label for="newPass">비밀번호 입력</label> <input type="password" v-model="nextPassword" class="form-control" id="newPass" name="newPass"  value="" required>
                                </div>
                            </template>
                            <div class="mb-3">
                                <b><strong>*주의</strong><br>회원 탈퇴 시 해당 계정을 통한 로그인 시 정상적인 서비스 이용이 불가능하며, 30일간의 유예 기간동안 회원 탈퇴 철회가 가능합니다.<br>유예기간이 지난 후 실제 계정정보가 제거 되오니 유의 바랍니다.</b>
                            </div>
                            <div class="mb-4"></div>
                            <input class="btn btn-primary btn-lg btn-block" @click="leaveAccount" type="button" value="회원 탈퇴" style="background-color:#fab3cc;border:1px white;width:200px;margin:auto;">
                        </div>
                    </template>
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
                nextPassword : '',
                nextPasswordConfirm : '',
                curPath : '',
                showPassword : false,
                pwCheckReg : /^(?=.*[a-zA-Z])(?=.*[!@#$%^])(?=.*[0-9]).{8,15}$/,
            }
        },
        computed : {
            userPwCheck() {
                if(this.nextPassword == '' || this.nextPasswordConfirm == '') {
                    return false;
                }
                if(!this.pwCheckReg.test(this.nextPassword)) {
                    return false;
                }               
                return this.nextPassword == this.nextPasswordConfirm;
            }
        },
        created() {
            this.curPath = this.$route.path;
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
            },
            async leaveAccount() {
                this.$showLoading();
                const result = await axios.put('/api/user/leave');
                if(result.data.changedRows > 0) {
                    this.$showSuccessAlert('회원탈퇴 완료.');
                    let result = await axios.get("/api/user/logout");
                    if (result.status == 200 && result.data == "OK") {
                        this.$store.commit("setUserNo", -1);
                        this.$store.commit("setUserPermission", '');
                        this.$router.push({
                        path: "/"
                    });
                }
                }
                else {
                    this.$showSuccessAlert('오류발생');
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