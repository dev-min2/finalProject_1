<template>
    <hr />
    <section class="py-5">
            <div class="container px-4 px-lg-5 my-5">
                <div class="row gx-4 gx-lg-5 align-items-center">
                    {{product}}
                    <div class="col-md-6">
                    <!-- <img class="card-img-top mb-5 mb-md-0" v-if="type == 'd1'"
                    :src="$store.state.prImg + `dog/` + product.product_image" alt="..." />
                    <img class="card-img-top mb-5 mb-md-0" v-else
                    :src="$store.state.prImg + `cat/` + product.product_image" alt="..." /> -->
                    </div>
                    <div class="col-md-6">
                        <div class="small mb-1">
                            <span style="font-size : 25px">★ 별점</span>
                        </div>
                        <h1 class="display-5 fw-bolder">ANF 치킨야채 캔 95g</h1>
                        <br />
                        <div class="fs-5 mb-5">
                            <!-- <span class="text-decoration-line-through">$45.00</span> -->
                            <span style="font-size : 30px">\ 상품가격</span>
                        </div>
                        <p class="lead">상품 설명</p>
                        <br />
                        <div class="d-flex">
                            <input class="form-control text-center me-3" id="inputQuantity" type="num" value="1" style="max-width: 5rem" />
                            <button class="btn btn-outline-dark flex-shrink-0" type="button">
                                <i class="bi-cart-fill me-1"></i>
                                Add to cart
                            </button>
                        </div>
                    </div>
                </div>
                    <div class="container px-4 px-lg-5 my-5" style="text-align:center;">
			<a
				style="border: none; padding: 10px 50px; color: black; font-size: 18px; text-decoration-line: none"
				href="#detail">상품 정보</a> <a
				style="border: none; padding: 10px 50px; color: black; font-size: 18px; text-decoration-line: none"
				href="#review">구매 후기</a> <a
				style="border: none; padding: 10px 50px; color: black; font-size: 18px; text-decoration-line: none"
				href="#qna">문의 게시판</a> <a
				style="border: none; padding: 10px 50px; color: black; font-size: 18px; text-decoration-line: none"
				href="#order">취소/교환/반품 안내</a>
			<hr>
		</div>
        <!-- 구매후기  -->
        <div id="review" class="reviewTable">
         <h2 style="font: bolder; font-size: 30px; text-align: left">구매 후기</h2>
         <table class = "table" style= text-align:center>
                       <thead >
                          <tr style=text-align:center>
                             <th>리뷰번호</th>
                             <th>상품이름</th>
                             <th>별점</th>
                             <th>작성자</th>
                             <th>등록날짜</th>
                             <th>좋아요</th>
                          </tr>
                       </thead>
                       <tbody>
                       
		                    
	                    		
	                    			<tr><td style=color:gray; colspan="6">아직 작성된 리뷰가 없습니다.</td></tr>
	                    		
	                    
                       </tbody>
                    </table>
		</div>
        <!-- 문의게시판 -->
		<form action=addUserQnaForm.do name=productDetail method="post">
		<div id="qna" class="qnaTable">
			<h2 style="font: bolder; font-size: 30px; text-align: left">문의
				게시판</h2>
			<table class="table" style="text-align: center">
				<thead>
					<tr>
						<th>공개여부</th>
                   		<th>글번호</th>
                   		<th>문의정보</th>
                   		<th>제목</th>
                   		<th>작성자</th>
                   		<th>작성일</th>
                   		<th>문의상태</th>
					</tr>
				</thead>
				<tbody>
				
		          
				
					<tr><td style=color:gray; colspan="7">아직 작성된 문의가 없습니다.</td></tr>
				
				
				</tbody>
			</table>
			 <p><input type="submit" value="문의글 작성" >
				<input type="hidden" name=pName value="ANF 치킨야채 캔 95g" >
				<input type="hidden" name=pNo value="11">
			</p>
		</div>
		<hr>
		</form>
        <div id="order">
			<div id="arrow"></div>
			<h2 id="text1" onclick="openDiv()" style="font: bolder; font-size: 30px; text-align: left">취소/교환/반품안내</h2>
			<ul>
				<li>주문취소는 '입금대기, 입금완료' 단계에서만 가능합니다.</li>
				<li>주문 내 일부 상품의 부분 취소는 불가능합니다.</li>
				<li>주문취소는 '마이페이지 -> 주문 · 배송 -> 주문취소 -> 주문 상세 보기' 를 통해 직접 취소하실 수 있습니다.</li>
				<li>교환 및 반품은 배송 완료일 기준으로 7일 이내 신청 가능합니다.</li>
				<li>단순변심으로 인한 교환/반품은 고객님께서 배송비를 부담하셔야 합니다.</li>
			</ul>
			<ul id="list" style="display:none">
				<li>제주, 도서산간 지역은 추가 배송비가 발생할 수 있습니다.</li>
				<li>브랜드배송 상품은 판매자 및 상품에 따라 교환/반품 배송비가 다를 수 있으므로 강아지대통령 고객센터로 문의해 주시기 바랍니다.</li>
				<li>교환/반품하려는 상품은 처음 배송한 택배사에서 수거하므로 다른 택배사 이용은 불가능합니다.</li>
				<li>'발송준비중, 발송처리완료' 단계에서는 상품 수령 후 교환 또는 반품만 가능합니다.</li>
				<li>교환/반품 요청 기간이 지난 경우, 주문제작 상품으로 재판매가 불가능한 경우 교환/반품이 불가능합니다</li>
			</ul>
		</div>
            </div>

        </section>
        <!-- Related items section-->
        <section class="py-5 bg-light">
            <div class="container px-4 px-lg-5 mt-5">
                <h2 class="fw-bolder mb-4">관련 상품</h2>
                <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                    <div class="col mb-5">
                        <div class="card h-100">
                            <!-- Product image-->
                            <img class="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." />
                            <!-- Product details-->
                            <div class="card-body p-4">
                                <div class="text-center">
                                    <!-- Product name-->
                                    <h5 class="fw-bolder">Fancy Product</h5>
                                    <!-- Product reviews-->
                                    <div class="d-flex justify-content-center small text-warning mb-2">
                                        <div class="bi-star-fill"></div>
                                        <div class="bi-star-fill"></div>
                                        <div class="bi-star-fill"></div>
                                        <div class="bi-star-fill"></div>
                                        <div class="bi-star-fill"></div>
                                    </div>
                                    <!-- Product price-->
                                    $80.00
                                </div>
                            </div>
                            <!-- Product actions-->
                            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="#">자세히 보기</a></div>
                            </div>
                        </div>
                    </div>
                    <div class="col mb-5">
                        <div class="card h-100">
                            <!-- Sale badge-->
                            <div class="badge bg-dark text-white position-absolute" style="top: 0.5rem; right: 0.5rem">Sale</div>
                            <!-- Product image-->
                            <img class="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." />
                            <!-- Product details-->
                            <div class="card-body p-4">
                                <div class="text-center">
                                    <!-- Product name-->
                                    <h5 class="fw-bolder">Special Item</h5>
                                    <!-- Product reviews-->
                                    <div class="d-flex justify-content-center small text-warning mb-2">
                                        <div class="bi-star-fill"></div>
                                        <div class="bi-star-fill"></div>
                                        <div class="bi-star-fill"></div>
                                        <div class="bi-star-fill"></div>
                                        <div class="bi-star-fill"></div>
                                    </div>
                                    <!-- Product price-->
                                    $18.00
                                </div>
                            </div>
                            <!-- Product actions-->
                            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="#">자세히 보기</a></div>
                            </div>
                        </div>
                    </div>
                    <div class="col mb-5">
                        <div class="card h-100">
                            <!-- Sale badge-->
                            <div class="badge bg-dark text-white position-absolute" style="top: 0.5rem; right: 0.5rem">Sale</div>
                            <!-- Product image-->
                            <img class="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." />
                            <!-- Product details-->
                            <div class="card-body p-4">
                                <div class="text-center">
                                    <!-- Product name-->
                                    <h5 class="fw-bolder">Sale Item</h5>
                                    <!-- Product reviews-->
                                    <div class="d-flex justify-content-center small text-warning mb-2">
                                        <div class="bi-star-fill"></div>
                                        <div class="bi-star-fill"></div>
                                        <div class="bi-star-fill"></div>
                                        <div class="bi-star-fill"></div>
                                        <div class="bi-star-fill"></div>
                                    </div>
                                    <!-- Product price-->
                                    $25.00
                                </div>
                            </div>
                            <!-- Product actions-->
                            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="#">자세히 보기</a></div>
                            </div>
                        </div>
                    </div>
                    <div class="col mb-5">
                        <div class="card h-100">
                            <!-- Product image-->
                            <img class="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." />
                            <!-- Product details-->
                            <div class="card-body p-4">
                                <div class="text-center">
                                    <!-- Product name-->
                                    <h5 class="fw-bolder">Popular Item</h5>
                                    <!-- Product reviews-->
                                    <div class="d-flex justify-content-center small text-warning mb-2">
                                        <div class="bi-star-fill"></div>
                                        <div class="bi-star-fill"></div>
                                        <div class="bi-star-fill"></div>
                                        <div class="bi-star-fill"></div>
                                        <div class="bi-star-fill"></div>
                                    </div>
                                    <!-- Product price-->
                                    $40.00
                                </div>
                            </div>
                            <!-- Product actions-->
                            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="#">자세히 보기</a></div>
                            </div>
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
<style scoped>

</style>