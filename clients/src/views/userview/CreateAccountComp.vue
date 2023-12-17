<template>
    <div>
        <form @submit.prevent="createAccount">
		<div class="cont">
			<div class="input-form-backgroud row">
				<div class="input-form col-md-12 mx-auto">
					<h4 class="hello">회원가입</h4>
					<div class="row">
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
                        
							<div class="col-md-6 mb-3">
								<label for="nick">이름</label> 
                                <input type="text" class="form-control" v-model="userNickname" id="nick" name="nick" placeholder="이름 입력" value="" required>
								<div class="invalid-feedback">이름을 입력해주세요.</div>
							</div>
						</div>
						<div class="mb-3" >
							<label for="email">이메일</label> 
                            <input type="email" style="width:250px" class="form-control" v-model="userEmail" id="email" name="email" placeholder="you@example.com" required>
							<div class="invalid-feedback">이메일을 입력해주세요.</div>
						</div>
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
                            <div class="mb-3">
                                <label for="business_number">사업자 등록증</label> 
                                <input type="text" class="form-control" id="business_number" name="business_number" placeholder="111-11-11111" required>
                                <div class="invalid-feedback">사업자 등록증 입력해주세요</div>
                            </div>

                            <div class="mb-3">
                                <label for="company_name">회사명</label> 
                                <input type="text" class="form-control" name="company_name" placeholder="" required>
                                <div class="invalid-feedback">회사명 입력해주세요</div>
                            </div>

                            <div class="mb-3">
                                <label for="ceo_name">대표자명</label> 
                                <input type="text" class="form-control" id="ceo_name" name="ceo_name" placeholder="" required>
                                <div class="invalid-feedback">대표자명 입력해주세요</div>
                            </div>
                        </template>

						<hr class="mb-4">
						<div class="custom-control custom-checkbox">
							<input type="checkbox" class="custom-control-input" id="aggrement" required> <label class="custom-control-label" for="aggrement">개인정보 수집 및 이용에 동의합니다.</label>
						</div>
						<div class="mb-4"></div>
						<button class="btn btn-primary btn-lg btn-block" id="submit" type="submit" style="background-color:pink;border:none;">회원가입하기</button>
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
            }
        },
        computed : {
            userPwCheck() {
                return this.pwCheckReg.test(this.userPw) == true ? true : false;
            }
        },
        created() {
            this.isSeller = this.$route.params.sellerJoin;
            console.log("isSeller:", this.isSeller)
        },
        methods : {
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
                    alert('아이디 양식 확인해주세요');
                    return;
                }

                this.$showLoading();
                let result = await axios.post('/api/user/checkId',{ id : this.userId }, {'Content-Type' : 'application/json'});
                console.log(result);
                this.$hideLoading();

                if(result.data) {
                    alert('사용할 수 있는 아이디입니다!');
                    this.userIdDuplicateCheck = true;
                }
                else {
                    alert('사용할 수 없는 아이디입니다.');
                }
            },
            async createAccount() {
                // 데이터 송신전에 한번더 체크
                if(!this.userIdDuplicateCheck) {
                    alert('아이디 중복체크 해주세요');
                    return;
                }

                if(!this.pwCheckReg.test(this.userPw)) {
                    alert('비밀번호 양식 확인해주세요');
                    return;
                }

                if(!this.emailCheckReg.test(this.userEmail)) {
                    alert('이메일 양식 확인해주세요');
                    return;
                }

                if(!this.phoneCheckReg.test(this.userPhone)) {
                    alert('전화번호 양식 확인해주세요');
                    return;
                }

                // 사업자쪽
                if(this.isSeller == 1) {
                    if(!this.busiCheckReg.test(this.businessNumber)) {
                        alert('사업자 등록증 확인해주세요');
                        return;
                    }
                }
                
                const userObj = {
                    user_id : this.userId,
                    user_pw : this.userPw, // 암호화
                    nickname : this.userNickname,
                    user_birth : this.userBirth,
                    user_email : this.userEmail,
                    user_phone : this.userPhone,
                    user_addr : this.roadAddress + ' ' + this.detailAddress,
                    user_permission : this.isSeller == true ? '1' : '0',
                }

                this.$showLoading();
                let result = await axios.post('/api/user/join',{ user : userObj},{ 'Content-Type' : 'application/json'});
                if(result.status == 200) {
                    alert('계정 생성 성공!');
                    this.$router.push({path : '/login'});
                }
                else {
                    alert('계정 생성에 실패 했습니다.');
                }
                this.$hideLoading();
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