<template>
    <div class="container my-5">
        <form @submit.prevent="createAccount">
		<div class="cont">
			<div class="input-form-backgroud row">
				<div class="input-form col-md-12 mx-auto">
					<h4 v-if="isSeller === 'socialjoin'" class="hello">추가정보입력</h4>
                    <h4 v-else class="hello">회원가입</h4>
					<div class="row">
                        <template v-if="isSeller !== 'socialjoin'">
						<div class="col-md-6 mb-3">
								<label for="id">아이디</label> 
                                <input v-if="userIdDuplicateCheck == false" type="text" class="form-control" v-model="userId" id="id" name="id" placeholder="아이디" value="" required>
                                <input v-else type="text" class="form-control" v-model="userId" id="id" name="id" placeholder="아이디" value="" readonly required>
								<div class="invalid-feedback">아이디를 입력해주세요.</div>
							</div>
								<input v-if="userIdDuplicateCheck == false" type="button" @click="checkDuplicateId" value="아이디 중복확인" style="margin-top:35px;width:150px;height:30px">
                                <input v-else type="button" @click="checkDuplicateId" value="아이디 중복확인" style="margin-top:35px;width:150px;height:30px" disabled>
							<hr>
							<div class="col-md-6 mb-3">
								<label for="upw">비밀번호</label> 
                                <input type="password" class="form-control" v-model="userPw" id="upw" name="upw" placeholder="비밀번호" value="" autoComplete="off" required>
								<div class="invalid-feedback">비밀번호를 입력해주세요.</div>
							</div>
								<p class="ml-1" v-if="userPwCheck == false" id='alert' style="color:red;font-size:12px">비밀번호: 8~16자의 영문 대/소문자, 숫자, 특수문자(!@#$%^)를 사용해 주세요.</p>
                                <p class="ml-1" v-else id='alert' style="color:green;font-size:12px">통과!</p>
							<hr>
                        </template>
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
                        
                        <template v-if="isSeller == 1">
                            <label for="business_number">사업자 등록증</label> 
                            <div class="mb-3 d-flex gap-3">
                                <input v-if="completedBusinessAuth==false" type="text" class="form-control" id="business_number" name="business_number" v-model="businessNumber" placeholder="111-11-11111" required>
                                <input v-else type="text" class="form-control" id="business_number" name="business_number" v-model="businessNumber" readonly required>
                                <div class="invalid-feedback">사업자 등록증 입력해주세요</div>
                                <input v-if="completedBusinessAuth == false" type="button" @click="checkBusinessNumber" value="인증하기" style="border-radius: 20px; margin-top:5px;width:150px;height:30px">
                                <input v-else type="button" value="인증하기" style="border-radius: 20px; margin-top:5px;width:150px;height:30px" disabled>
                            </div>

                            <div class="mb-3">
                                <label for="company_name">회사명</label> 
                                <input type="text" class="form-control" name="company_name" v-model="companyName" placeholder="" required>
                                <div class="invalid-feedback">회사명 입력해주세요</div>
                            </div>

                            <div class="mb-3">
                                <label for="ceo_name">대표자명</label> 
                                <input type="text" class="form-control" id="ceo_name" name="ceo_name" v-model="ceoName" placeholder="" required>
                                <div class="invalid-feedback">대표자명 입력해주세요</div>
                            </div>
                        </template>

						<hr class="mb-4">
						<div class="custom-control custom-checkbox">
							<input type="checkbox" class="custom-control-input" id="aggrement" required> <label class="mx-2 custom-control-label" for="aggrement">개인정보 수집 및 이용에 동의합니다.</label>
						</div>
						<div class="mb-4"></div>
						<button class="btn btn-primary btn-lg btn-block" id="submit" type="submit" style="background-color:pink;border:none;">회원가입하기</button>
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
                socialAccount : false,
                socialSubCode : '',
                accessToken : '',
                refreshToken : '',
                subCodes : [],
                permissionSubcode : '',
                isSeller : 0,
                postcode : '',
                roadAddress : '',
                userId : '',
                userIdDuplicateCheck : false,
                userPw : '',
                userEmail : '',
                userPhone : '',
                userBirth : '',
                userNickname : '',
                detailAddress : '',
                businessNumber : '',
                userIdReg : /^(?=.*[a-z0-9])[a-z0-9]{3,16}$/, // 3자이상 16자 이하 영어또는 숫자로 구성
                pwCheckReg : /^(?=.*[a-zA-Z])(?=.*[!@#$%^])(?=.*[0-9]).{8,15}$/,
                emailCheckReg : /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                phoneCheckReg : /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/,
                busiCheckReg : /^[0-9]{3}-[0-9]{2}-[0-9]{5}$/,
                showEmailAuth : false,
                completedEmailAuth : false,
                emailTimerCount : 0,
                showCount : '',
                emailInterval : '',
                authCode : '',
                completedBusinessAuth : false,
                companyName : '',
                ceoName : '',
            }
        },
        computed : {
            userPwCheck() {                
                return this.pwCheckReg.test(this.userPw) == true ? true : false;
            }
        },
        created() {
            this.isSeller = this.$route.params.sellerJoin;
            if(this.isSeller === "socialjoin") {
                this.userId = this.$store.state.socialId;
                this.accessToken = this.$store.state.accessToken;
                this.refreshToken = this.$store.state.refreshToken;
            }
            this.getSubCode();
        },
        methods : {
            async getSubCode() {
                const result = await axios.post('/api/main-code',{ mainCodeName : "회원권한구분코드"}, { headers : { "Content-Type" : "application/json"}});
                if(result.status != 200) {
                    this.$showFailAlert("데이터를 불러오는데 실패했습니다.",null);
                    this.$router.push({path : "/main"});
                    return;
                }
                this.subCodes = result.data;
                for(let i = 0; i < this.subCodes.length; ++i) {
                    console.log(this.subCodes[i].sub_code);
                }
                let findName = '';
                if(this.isSeller === "socialjoin") {
                    findName = "일반회원";
                }
                else {
                    if(this.isSeller == 1)  
                        findName = "판매자";
                    else
                        findName = "일반회원";
                }
                
                for(const obj of this.subCodes) {
                    if(obj.sub_code_name == findName){
                        this.permissionSubcode = obj.sub_code;
                        break;
                    }
                }
                
                // 현재는 카카오밖에없음.
                if(this.isSeller === "socialjoin") {
                    const result = await axios.post('/api/main-code',{ mainCodeName : "SNS로그인구분코드"}, { headers : { "Content-Type" : "application/json"}});
                    for(const obj of result.data) {
                        if(obj.sub_code_name == "카카오"){
                            this.socialSubCode = obj.sub_code;
                            break;
                        }
                    }
                }
            },
            async checkBusinessNumber() {
                if(!this.busiCheckReg.test(this.businessNumber)) {
                    this.$showWarningAlert('사업자 등록번호 양식 확인해주세요.',null);
                    return;
                }
                let busi = this.businessNumber.replaceAll('-','');

                var sendObj = {
                    "b_no": [busi], // 사업자번호 "xxxxxxx" 로 조회 시,
                }; 
                this.$showLoading();
                const postURL = `https://api.odcloud.kr/api/nts-businessman/v1/status?serviceKey=${process.env.VUE_APP_DATA_PROTAL_BUSINESS_NUMBER_CHECK_KEY}`;
                const result = await axios.post(postURL,sendObj, {
                    headers: { "Content-Type" : "application/json" }
                });
                this.$hideLoading();
                
                if(result.data.data[0].tax_type === '국세청에 등록되지 않은 사업자등록번호입니다.') {
                    this.$showWarningAlert(result.data.data[0].tax_type,null);
                    return;
                }

                this.completedBusinessAuth = true;
                this.$showSuccessAlert('사업자 인증 성공',null);
            },
            async sendEmailAuthMail() {
                if(!this.emailCheckReg.test(this.userEmail)) {
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
            updateEmailTimer() {
                
                let result = false;
                if(this.$route.path == '/join/0' || this.$route.path == '/join/1' || this.$route.path == '/join/socialjoin') {
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
            async checkDuplicateId() {
                if(!this.userIdReg.test(this.userId)) {
                    this.$showWarningAlert('아이디 양식 확인해주세요',null);
                    return;
                }

                this.$showLoading();
                let result = await axios.post('/api/user/checkId',{ id : this.userId }, {'Content-Type' : 'application/json'});
                this.$hideLoading();

                
                if(result.data) {
                    this.$showSuccessAlert("사용할 수 있는 아이디입니다!",null);
                    this.userIdDuplicateCheck = true;
                }
                else {
                    this.$showFailAlert("사용할 수 있는 아이디입니다!",null);
                }
            },
            async createAccount() {
                let sendObj = {};
                let userObj = {
                };
                let snsObj = {

                } 

                // 데이터 송신전에 한번더 체크
                if(this.isSeller !== "socialjoin") {
                    if(!this.userIdDuplicateCheck) {
                        this.$showWarningAlert('아이디 중복체크 해주세요',null);
                        return;
                    }

                    if(!this.pwCheckReg.test(this.userPw)) {
                        this.$showWarningAlert('비밀번호 양식 확인해주세요',null);
                        return;
                    }

                    if(this.isSeller == 1) {
                        if(!this.completedBusinessAuth) {
                            this.$showWarningAlert('사업자 등록 인증해주세요',null);
                            return;
                        }
                        userObj.company_name = this.companyName;
                        userObj.business_number = this.businessNumber;
                        userObj.ceo_name = this.ceoName;
                    }
                    userObj.user_permission = this.permissionSubcode;
                }
                else {
                    // 소셜회원가입의 경우.
                    this.userPw = "kakao";
                    userObj.user_permission = this.socialSubCode;
                    snsObj.access_token = this.accessToken;
                    snsObj.refresh_token = this.refreshToken;

                    sendObj.sns = snsObj;
                }

                if(this.confirmEmailAuth == false) {
                    this.$showWarningAlert('이메일 인증 해주세요',null);
                    return;
                }

                if(!this.phoneCheckReg.test(this.userPhone)) {
                    this.$showWarningAlert('전화번호 양식 확인해주세요',null);
                    return;
                }

                userObj.user_id = this.userId;
                userObj.user_pw = this.$encryptAES256(this.userPw), // 암호화
                userObj.user_name = this.userNickname,
                userObj.user_birth = this.userBirth,
                userObj.user_email = this.userEmail,
                userObj.user_phone = this.userPhone,
                userObj.user_addr = this.roadAddress + ' ' + this.detailAddress,  
                sendObj.user = userObj;
                this.$showLoading();
                let result = await axios.post('/api/user/join',sendObj,{ 'Content-Type' : 'application/json'});
                if(result.status == 200) {
                    this.$showSuccessAlert('계정 생성 성공!',null);                    
                    this.$router.push({path : '/login'});
                }
                else {
                    this.$showFailAlert('계정 생성에 실패 했습니다.',null);
                }
                this.$hideLoading();
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
	margin:auto;
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