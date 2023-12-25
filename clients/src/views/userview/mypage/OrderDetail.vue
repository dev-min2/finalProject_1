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
								<a class="nav-link" href="">
									<div class="sb-nav-link-icon">
										<i class="bi bi-person"></i>
									</div> 내정보관리
								</a><a class="nav-link" href="">
									<div class="sb-nav-link-icon">
										<i class="bi bi-basket3-fill"></i>
									</div> 주문내역
								</a> <a class="nav-link" href="">
									<div class="sb-nav-link-icon">
										<i class="bi bi-upc-scan"></i>
									</div> 내 쿠폰
								</a> <a class="nav-link" href="">
									<div class="sb-nav-link-icon">
										<i class="bi bi-box-seam"></i>
									</div> 상품문의
								</a> <a class="nav-link" href="">
									<div class="sb-nav-link-icon">
										<i class="bi bi-chat-left-text"></i>
									</div> 내 리뷰보기
								</a><a class="nav-link" href="">
									<div class="sb-nav-link-icon">
										<i class="bi bi-reddit"></i>
									</div> 내반려동물정보
								</a><a class="nav-link" href="">
									<div class="sb-nav-link-icon">
										<i class="bi bi-person"></i>
									</div> 회원 탈퇴
								</a>
							</div>
						</div>
					</nav>
				</div>
				<div id="layoutSidenav_content">
					<main>
						<div class="container-fluid px-4">
							<div class="px-4 py-1 my-3 text-center">
								<h2 class="fw-bold mb-3">내 주문내역</h2>
							</div>
							<div class="d-flex justify-content-center">
								<table class="table w-85">
									<thead>
										<tr>
											<th scope="col">주문번호</th>
											<th scope="col">상품명</th>
											<th scope="col">가격</th>
											<th scope="col">수량</th>
											<th scope="col">결제일</th>
											<th scope="col">비고</th>
										</tr>
									</thead>
									<tbody>
									
											<tr>
												<td>test</td>
												<td><a href="">productName</a></td>
												<td></td>
												<td></td>
												<td></td>
											</tr>
									</tbody>
								</table>
							</div>
						</div>
					</main>
				</div>
			</div>
        </div>
		</div>
    </section>
</template>

<script>
export default {

}
</script>

<style>

</style>