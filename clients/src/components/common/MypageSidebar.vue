<template>
		<section class="pt-2 pb-4">
			<div class="container px-4 px-lg-5 mt-3">
				<div class="container-fluid px-4">
					<div id="layoutSidenav">
						<!-- menu attribute-->
						<div id="layoutSidenav_nav" style="z-index: 0">
							<nav class="sb-sidenav accordion sb-sidenav-light" id="sidenavAccordion">
								<div class="sb-sidenav-menu">
									<div class="nav">
										<div class="sb-sidenav-menu-heading">@@님 환영합니다</div>
										<a @click="$router.push('/myinfo')" class="nav-link" >
											<div class="sb-nav-link-icon"><i class="bi bi-person"></i></div> 내정보관리
										</a>
										<a @click="$router.push('/orderdetail')" class="nav-link">
											<div class="sb-nav-link-icon"><i class="bi bi-basket3-fill"></i></div> 주문내역
										</a> 
										<a class="nav-link">
											<div class="sb-nav-link-icon"><i class="bi bi-upc-scan"></i></div> 내 쿠폰
										</a> 
										<a class="nav-link">
											<div class="sb-nav-link-icon"><i class="fas fa-heart"></i></div> 찜 목록
										</a> 
										<a class="nav-link" >
											<div class="sb-nav-link-icon"><i class="bi bi-box-seam"></i></div> 상품문의
										</a> 
										<a class="nav-link"><div class="sb-nav-link-icon"><i class="bi bi-chat-left-text"></i>
											</div> 내 리뷰보기
										</a>
										<a @click="$router.push('/mypetinfo')" class="nav-link">
											<div class="sb-nav-link-icon"><i class="bi bi-reddit"></i></div> 내반려동물정보
										</a><a @click="$router.push('/leave')" class="nav-link" href="#">
											<div class="sb-nav-link-icon"><i class="bi bi-person"></i></div> 회원 탈퇴
										</a>
										<a @click="$router.push('/paymentDetail')" class="nav-link" href="#">
											<div class="sb-nav-link-icon"><i class="bi bi-person"></i></div> 테스트 주문내역 상세페이지
										</a>
									</div>
								</div>
							</nav>
						</div>
						<router-view/>
					</div>
	       		 	<footer class="my-3 text-center text-small"> </footer>
				</div>
			</div>
		</section>
</template>

<script>
export default {
	name : 'MyPageSide'
}
</script>

<style>

</style>