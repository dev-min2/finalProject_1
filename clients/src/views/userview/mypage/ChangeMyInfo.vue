<template>
    <div class="container my-5">
        <form @submit.prevent="changeMyInfo">
		<div class="cont">
			<div class="input-form-backgroud row">
				<div class="input-form col-md-12 mx-auto">
					<h4 class="text-center mb-4">회원정보 수정</h4>
					<div class="row">
						<div class="col-md-6 mb-3">
							<label for="nick">이름</label> 
                            <input type="text" class="form-control" v-model="userNickname" id="nick" name="nick" placeholder="이름 입력" value="" required>
							<div class="invalid-feedback">이름을 입력해주세요.</div>
						</div>
						
                        <label for="email">이메일</label> 
						<div class="mb-3 d-flex gap-3" >
                            <input type="email" style="width:250px; height:40px;" class="form-control align-self-center" v-model="userEmail" id="email" name="email" placeholder="you@example.com" required>
							<div class="invalid-feedback">이메일을 입력해주세요.</div>
                            <input v-if="showEmailAuth == false" type="button" @click="sendEmailAuthMail" value="이메일 인증" style="border-radius: 20px; margin-top:5px;width:150px;height:30px">
                            <input v-else type="button" value="이메일 인증" style="border-radius: 20px; margin-top:5px;width:150px;height:30px" disabled>
						</div>  
                        <template v-if="showEmailAuth == true">
                            <label for="emailAuth">이메일인증</label> 
                            <div class="mb-3 d-flex gap-3">
                                <input v-if="completedEmailAuth== false" type="text" style="width:250px; height:40px;" class="form-control align-self-center" id="emailAuth" name="emailAuth" v-model="authCode" required>
                                <input v-else type="text" style="width:250px; height:40px;" class="form-control align-self-center" id="emailAuth" name="emailAuth" v-model="authCode" readonly required>
                                <div class="invalid-feedback">이메일 인증값을 입력해주세요.</div>
                                <input v-if="completedEmailAuth == false" type="button" @click="confirmEmailAuth" value="인증하기" style="border-radius: 20px; margin-top:5px;width:150px;height:30px">
                                <input v-else type="button" value="인증하기" style="border-radius: 20px; margin-top:5px;width:150px;height:30px" disabled>
                            </div>
                            <div>
                                <p v-show="completedEmailAuth == false" style="color:red;">유효시간 : {{showCount}}</p>
                            </div>
                        </template>
						<div class="mb-3">
							<label for="birth">생년월일</label> 
                            <input type="date" class="form-control" id="birth" name="birth" v-model="userBirth" placeholder="" required>
							<div class="invalid-feedback">생년월일을 입력해주세요.</div>
						</div>

						<div class="mb-3">
							<label for="phone">전화번호</label> 
                            <input type="text" class="form-control" id="phone" name="phone" v-model="userPhone" placeholder="010-1234-1234" required>
							<div class="invalid-feedback">전화번호를 입력해주세요.</div>
						</div>
						
                        <div class="mb-3">
                            <input type="text" v-model="postcode" placeholder="우편번호"  style="margin:5px 0" readonly>
                            <input class="ml-2" type="button" @click="callDaumAddressAPI" value="우편번호 찾기" style="margin:5px 0"><br> 
                            <input class="w-100" type="text" v-model="roadAddress" placeholder="도로명주소" name="addr" style="margin:5px 0" readonly> 
                            <span id="guide" style="color: #999; display: none"></span>
                            <input class="w-100" type="text" v-model="detailAddress" name="addr_detail" placeholder="상세주소" style="margin:5px 0">
                        </div>

						<hr class="mb-4">
						<button class="btn btn-primary btn-lg btn-block" id="submit" type="submit" style="background-color:#fc97bf;;border:none;">수정완료</button>
                    </div>
                    </div>
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
                showEmailAuth : false,
                completedEmailAuth : false,
                showCount: 0,
                roadAddress : '',
                detailAddress : '',
                userPhone : '',
                userBirth : '',
                userNickname : '',
                userEmail : '',
                authCode : '',
                postcode : '',
                userNo : '',
            }
        },
        created() {
            this.getUserInfo();
        },
        methods : {
            async getUserInfo() {
                this.$showLoading();
                const result = await axios.get(`/api/user/info?userNo=${this.$store.state.userNo}`);
                this.userNo = result.data.user_no;
                this.userNickname = result.data.user_name;
                this.userBirth = this.$dateFormat(result.data.user_birth);
                this.userEmail = result.data.user_email;
                this.userPhone = result.data.user_phone;
                this.$hideLoading();
            },
            updateEmailTimer() {
                let result = false;
                if(this.$route.path == '/changeInfo') {
                    result = true;
                }  
                
                // 라우터뷰가 달라져도 인터벌은 살아있기때문에 지워줘야함.
                if(!result) {
                    clearInterval(this.emailInterval);
                    return;
                }

                if(this.completedEmailAuth) {
                    clearInterval(this.emailInterval);
                    return;
                }

                let min = Math.floor(this.emailTimerCount/60);
                let sec = this.emailTimerCount - (60 * min);
                
                if(sec > 9)
                    this.showCount = min + ":" + sec;
                else
                    this.showCount = min + ":0" + sec;

                if(this.emailTimerCount <= 0) {
                    clearInterval(this.emailInterval);
                    this.$showWarningAlert('다시 인증시도 해주세요.',null);
                    this.showEmailAuth = false;
                    this.completedEmailAuth = false;
                }

                --this.emailTimerCount;
            },
            callDaumAddressAPI(e) {
                new daum.Postcode( {
					oncomplete : (data) => {
						// 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

						// 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
						// 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
						var roadAddr = data.roadAddress; // 도로명 주소 변수
						var extraRoadAddr = ''; // 참고 항목 변수

						// 법정동명이 있을 경우 추가한다. (법정리는 제외)
						// 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
						if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
							extraRoadAddr += data.bname;
						}
						// 건물명이 있고, 공동주택일 경우 추가한다.
						if (data.buildingName !== '' && data.apartment === 'Y') {
							extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
						}
						// 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
						if (extraRoadAddr !== '') {
							extraRoadAddr = ' (' + extraRoadAddr + ')';
						}

						// 우편번호와 주소 정보를 해당 필드에 넣는다.
                        
						this.postcode = data.zonecode;
						this.roadAddress = roadAddr;

						var guideTextBox = document.getElementById('guide');
						// 사용자가 '선택 안함'을 클릭한 경우, 예상 주소라는 표시를 해준다.
						if (data.autoRoadAddress) {
							var expRoadAddr = data.autoRoadAddress + extraRoadAddr;
							guideTextBox.innerHTML = '(예상 도로명 주소 : ' + expRoadAddr + ')';
							guideTextBox.style.display = 'block';

						} else {
							guideTextBox.innerHTML = '';
							guideTextBox.style.display = 'none';
						}
					}
				}).open();
            },
            async sendEmailAuthMail(){
                const emailCheckReg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
                if(!emailCheckReg.test(this.userEmail)) {
                    this.$showWarningAlert('이메일 양식 확인해주세요',null);
                    return;
                }

                const result = await axios.post('/api/user/email-auth', { email : this.userEmail }, {'Content-Type' : 'application/json'});
                if(result.data) {
                    this.showEmailAuth = true;
                }
                else {
                    this.$showFailAlert('이메일 인증값 생성에 실패했습니다. 다시 시도해주세요',null);
                }
            },
            async confirmEmailAuth() {
                if(!this.showEmailAuth) {
                    return;
                }

                const result = await axios.post('/api/user/email-auth/confirm', {email : this.userEmail, authcode : this.authCode}, {'Content-Type' : 'application/json'});
                if(!result.data) {
                    this.$showFailAlert('인증실패',null);
                    return;
                }
                
                this.$showSuccessAlert('인증성공!',null);
                this.completedEmailAuth = true;
            },
            checkValidation() {
                if(!this.completedEmailAuth) {
                    this.$showWarningAlert('이메일 인증 진행해주세요.');
                    return false;
                }

                if(this.postcode == '') {
                    this.$showWarningAlert('주소 입력해주세요');
                    return false;
                }

                return true;
            },
            async changeMyInfo() {
                if(!this.checkValidation()) {
                    return;
                }
                const userObj = {
                    user_no : this.userNo,
                    user_name : this.userNickname,
                    user_birth : this.userBirth,
                    user_email : this.userEmail,
                    user_phone : this.userPhone,
                    user_addr : (this.roadAddress + this.detailAddress)
                };

                const result = await axios.put('/api/user/info',userObj, { headers : {'Content-Type' : 'application/json'}});
                if(result.status == 200) {
                    this.$showSuccessAlert('수정완료!');
                    this.$router.push({path : '/myinfo'});
                }
            }
        },
        watch : {
            showEmailAuth(newValue, oldValue) {
                this.showCount = "2:59";
                this.emailTimerCount = 179;
                this.emailInterval = setInterval(this.updateEmailTimer,1000);
            }
        }
    }
</script>

<style scoped>
.cont{
	width:800px;
}
.input-form {
	max-width: 600px;
	padding: 32px;
	background: #e6c1c161;
	-webkit-border-radius: 10px;
	-moz-border-radius: 10px;
	border-radius: 10px;
}
.hello {
	text-align:center;
	font-size:30px;
	margin: 20px;
}
</style>