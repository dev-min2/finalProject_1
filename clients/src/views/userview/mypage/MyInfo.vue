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
								<input type="text" class="form-control" id="userId" name="userId" value="" >
							</div>
							<div class="mb-3">
								<label for="userName">이름</label> 
								<input type="text" class="form-control" id="userName" name="userName"  value="" >
							</div>
							<div class="mb-3">
								<label for="email">이메일</label> 
								<input type="text" class="form-control" id="email" name="email" value="" >
							</div>
							<div class="mb-3">
								<label for="birthday">생년월일</label> 
								<input type="date" class="form-control" id="birthday" name="birthday" value="" >
							</div>
							<div class="mb-3">
								<label for="phoneNumber">전화번호</label> 
								<input type="text" class="form-control" id="phoneNumber" name="phoneNumber" value="" >
							</div>
							<div class="mb-3">
								<label for="phoneNumber">전화번호</label> 
								<input type="text" class="form-control" id="phoneNumber" name="phoneNumber" value="" >
							</div>
						</div>
						<!--버튼-->
						<div class="mb-4" style="text-align:center;">
                            <button type="button"  style="margin:10px;padding:8px">내 정보 변경</button>
                            <button type="button" style="margin:10px;padding:8px">비밀번호 변경</button>
                            <button type="button" style="margin:10px;padding:8px">돌아가기</button>
                        </div>
				</main>
	</div>

</template>

<script>
export default {

}
</script>

<style>

</style>