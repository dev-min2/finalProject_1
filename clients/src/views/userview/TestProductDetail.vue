
<template>
<div>
    <hr />
    <section class="py-5">
            <div class="container px-4 px-lg-5 my-5">
                <div class="row gx-4 gx-lg-5 align-items-center">
                    <div class="col-md-6" v-if="productDetail.product_stock > 0">
                    <img class="card-img-top mb-5 mb-md-0" v-if="productDetail.pet_type == 'd1'"
                    :src="$store.state.prImg + `dog/` + productDetail.product_image" alt="..." />
                    <img class="card-img-top mb-5 mb-md-0" v-else
                    :src="$store.state.prImg + `cat/` + productDetail.product_image" alt="..." />
                    </div>
                    <div class="col-md-6" v-else>
                    <img class="card-img-top mb-5 mb-md-0" style="opacity : 0.3" v-if="productDetail.pet_type == 'd1'"
                    :src="$store.state.prImg + `dog/` + productDetail.product_image" alt="..." />
                    <img class="card-img-top mb-5 mb-md-0" style="opacity : 0.3" v-else
                    :src="$store.state.prImg + `cat/` + productDetail.product_image" alt="..." />
                    <h2 style="color : red; font-weight: bold;text-align : center; position:absolute;top:50%;left:50%;transform: translate(-50%, -50%)"
                    v-if="productDetail.product_stock == 0">
                        현재 상품은 <br />품절되었습니다.
                    </h2>
                    <h2 style="color : red; font-weight: bold;text-align : center; position:absolute;top:50%;left:50%;transform: translate(-50%, -50%)"
                    v-else-if="productDetail.product_stock < 0">
                        현재 상품은 판매가 종료되었습니다.
                    </h2>
                    </div>
                    <div class="col-md-6">
                        <!--<div class="small mb-1">
                            <span style="font-size : 25px">별점 : {{productDetail.star_cnt}} </span>
                        </div>
                        <div class="d-flex justify-content-center small text-warning mb-2" style="font-size : 20px;">
                                        <div class="bi-star-fill"></div>
                                        <div class="bi-star-fill"></div>
                                        <div class="bi-star-fill"></div>
                                        <div class="bi-star-fill"></div>
                                        <div class="bi-star-fill"></div>
                        </div>-->
                        <h1 class="display-5 fw-bolder">{{productDetail.product_name}}</h1>
                        <br />
                        <p style="text-align : left; color : gray">♥ 3만원 이상 구매시 무료 배송♥</p>
                        <div class="fs-5 mb-5">
                            <!-- <span class="text-decoration-line-through">$45.00</span> -->
                            <h4 style="font-size : 30px; color : gray; text-align : left">\ {{$printPriceComma(Number(productDetail.product_price))}}</h4>
                        </div>
                        <p class="lead">{{productDetail.product_desc}}</p>
                        <br />
                        <div class="d-flex">
                            <input class="form-control text-center me-3" id="inputQuantity" type="number" min="1" max="99" value="1" style="max-width: 6rem" 
                            v-if="productDetail.product_stock > 0"
                            @input="inputNumber($event)"/> 
                            
                            <h3 v-else-if="productDetail.product_stock == 0" style="color : red; margin: auto;">"현재 상품은 품절되었습니다." </h3> 
                            
                            <h3 v-else-if="productDetail.product_stock < 0" style="color : red; margin: auto;">"현재 상품은 판매가 종료되었습니다." </h3>
                            
                            &nbsp;
                            <h4 v-if="productDetail.product_stock > 0" style="color : #fc97bc; font-weight : bold; font-size: 2rem; margin-inline-start: auto">총 상품 금액 \ {{$printPriceComma(this.cnt * productDetail.product_price)}}</h4>
                        </div>
                            <br />
                            <br />
                            <button class="btn btn-outline-dark flex-shrink-0" type="button"  @click="addWishfunction()" style="width : 48%; height : 50px"
                            v-if="productDetail.product_stock >= 0">
                                <i></i>
                                ♥ Add to wish list
                            </button>
                            &nbsp;
                            <button class="btn btn-outline-dark flex-shrink-0" type="button" @click="addCartfunction()" style="width : 48%; height : 50px"
                            v-if="productDetail.product_stock >= 0">
                                <i class="bi-cart-fill me-1"></i>
                                Add to cart
                            </button>
                            <br />
                            <br />
                    </div>
                </div>
                    <div class="container px-4 px-lg-5 my-5" style="text-align:center;">
			<a
				style="border: none; padding: 10px 50px; color: black; font-size: 18px; text-decoration-line: none"
				href="#detail">상품 정보</a> <a v-if="page !== null" 
				style="border: none; padding: 10px 50px; color: black; font-size: 18px; text-decoration-line: none"
				href="#review">구매 후기({{page.total}})</a> <a v-if="qnaPage !== null"
				style="border: none; padding: 10px 50px; color: black; font-size: 18px; text-decoration-line: none"
				href="#qna">문의 게시판({{qnaPage.total}})</a> <a
				style="border: none; padding: 10px 50px; color: black; font-size: 18px; text-decoration-line: none"
				href="#order">취소/교환/반품 안내</a>
			<hr>
		</div>
        <!-- 상품정보 -->
        <div class="cardBody">
            <div ref="viewer">

            </div>   
        </div>   
        <!-- 구매후기  -->
        <div id="review" class="reviewTable">
        <h2 style="font: bolder; font-size: 30px; text-align: left">구매 후기</h2>
        <table class = "table table-hover" style= text-align:center>
                    <thead >
                        <tr style=text-align:center>
                            <th>리뷰내용</th>
                            <th>별점</th>
                            <th>작성자</th>
                            <th>작성일</th>
                            <th>좋아요</th>
                        </tr>
                    </thead>
                    <tbody>
                    <tr v-if="reviewList == null || reviewList.length <= 0"><td style=color:gray; colspan="6">아직 작성된 리뷰가 없습니다.</td></tr>
                            <tr v-else v-for="(review, idx) in reviewList" :key="idx">
                                <td @click="setViewer(review)" data-bs-target="#exampleModal" data-bs-toggle="modal">
                                    {{ review.content }}</td>
                                <td @click="setViewer(review)" data-bs-target="#exampleModal" data-bs-toggle="modal">
                                    {{ review.star_cnt }}</td>
                                <td @click="setViewer(review)" data-bs-target="#exampleModal" data-bs-toggle="modal">
                                    {{ review.user_name }}</td>
                                <td @click="setViewer(review)" data-bs-target="#exampleModal" data-bs-toggle="modal">
                                    {{ $dateFormat(review.review_date) }}</td>
                                <!-- 리뷰좋아요버튼 -->
                                <td v-if="review.like_click == 0">
                                    <button @click="addReviewLikeCnt(review.review_no)"
                                        style="border:0;background:none;">🤍</button>
                                    {{ review.review_like_cnt }} </td>
                                <td v-else><button @click="cancleReviewLikeCnt(review.review_no)"
                                        style="border:0;background:none;">❤</button>
                                    {{ review.review_like_cnt }} </td>

                            </tr>
                    </tbody>
                    </table>
                    <PaginationComp v-if="page !== null" :page="page" @go-page="showReviewList" />
		</div>
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                    aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel"> 리뷰 상세내용 </h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <div class="container mt-3">
                                    <div class="row">
                                        <div class="col-md-12 offset-md-0">
                                            <div class="card">
                                                <div class="card-header">
                                                    <h3 class="card-title"></h3>
                                                    <div style="float:left" ref="title">

                                                    </div>
                                                    <div style="float:right" ref="starPos">

                                                    </div>
                                                </div>
                                                <div class="card-body">
                                                    <div ref="viewer2">

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
                            </div>
                        </div>
                    </div>
                </div>
        <!-- 문의게시판 -->
		<form >
		<div id="qna" class="qnaTable">
			<h2 style="font: bolder; font-size: 30px; text-align: left">문의
				게시판</h2>
			<table class="table" style="text-align: center">
				<thead>
					<tr>
						<th>공개여부</th>
                        <th>문의정보</th>
                        <th>제목</th>
                        <th>작성자</th>
                        <th>작성일</th>
                        <th>문의상태</th>
					</tr>
				</thead>
				<tbody>
					<tr v-if="qnaInfo.length <= 0"><td style=color:gray; colspan="7">아직 작성된 문의가 없습니다.</td></tr>
                    <tr v-else v-for="(qna,idx) in qnaInfo" :key="idx">
                        <td v-if="qna.board_public == 'H1'">공개글</td>
                        <td v-else-if="qna.board_public == 'H2'">비공개글</td>
                        <td v-if="qna.qna_category == 'G1'">상품문의</td>
                        <td v-else-if="qna.qna_category == 'G2'">배송문의</td>
                        <td v-else-if="qna.qna_category == 'G3'">교환/환불문의</td>
                        <td v-else-if="qna.qna_category == 'G4'">기타문의</td>
                        <td v-if="this.$store.state.userPermission == 'F3'">
                            <router-link style="text-decoration : none" 
                            :to="{
                                path: '/detailqnaform',
                                query: {qno: qna.qna_board_no, pname : this.productDetail.product_name},
                                }">{{qna.title}}</router-link></td>
                        <td v-else-if="qna.board_public == 'H2' && qna.user_no != this.$store.state.userNo">{{qna.title}}</td>
                        <td v-else><router-link style="text-decoration : none" 
                            :to="{
                                path: '/detailqnaform',
                                query: {qno: qna.qna_board_no, pname : this.productDetail.product_name},
                                }">{{qna.title}}</router-link></td>
                        <td>{{qna.user_name}}</td>
                        <td>{{$dateFormat(qna.created_date)}}</td>
                        <td v-if="qna.qna_state == 'K1'" style="color : red">답변대기중</td>
                        <td v-if="qna.qna_state == 'K2'" style="color : blue">답변완료</td>
                    </tr>
				</tbody>
			</table>
            <div class="text-right">
			<button @click="toAddQnaForm" class="btn btn-primary my-2" style="text-align:right; background-color: #fab3cc; border:0;">
                문의글 작성
            </button>
            </div>
            <PaginationComp2 v-if="qnaPage !== null" :page="qnaPage" @go-page="getQnaResult"/>
		</div>
		<hr>
		</form>
        <div id="order">
			<div id="arrow"></div>
			<h2 id="text1" onclick="openDiv()" style="font: bolder; font-size: 30px; text-align: left">취소/교환/반품안내</h2>
			<ul>
				<li>주문취소는 모든 주문이 '주문완료' 상태일 경우에만 가능합니다.</li>
				<li>쿠폰을 사용할 경우 주문 내 일부 상품의 부분취소는 불가능합니다. </li>
				<li>주문취소는 '마이페이지 - 주문내역' 내의 주문 상세 내역 페이지를 통해 직접 취소하실 수 있습니다. </li>
				<li>교환 및 반품은 배송 완료일 기준으로 7일 이내 신청 가능합니다.</li>
				<li>단순변심으로 인한 교환/반품은 고객님께서 배송비를 부담하셔야 합니다.</li>
			</ul>
		</div>
            </div>

        </section>
        <!-- Related items section-->
        <section class="py-5 bg-light">
            <div class="container px-4 px-lg-5 mt-5">
                <h2 class="fw-bolder mb-4">관련 상품</h2>
                <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                    <div v-for="(product,idx) in relationCategoryList" :key="idx">
                        <Product :product="product" />
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>



<script>
import axios from 'axios'
import Viewer from '@toast-ui/editor/dist/toastui-editor-viewer';

import PaginationComp2 from '../../components/common/PaginationComp.vue';
import PaginationComp from '../../components/common/PaginationComp.vue';
import Product from '../../components/userview/Product.vue';
import Viewer2 from '@toast-ui/editor/dist/toastui-editor-viewer';
let toastViewer = null;
let toastViewerModal = null;

export default {
    components : {
        PaginationComp2,
        PaginationComp,
        Product,
    },
    data(){
        return{
            productDetail:[],
            cartInfo:[],
            cnt: 1,
            wishInfo : [],
            qnaInfo : [],
            qnaPage : null,
            qnaPageNo : 1,
            reviewList: null,
            product_no: 0,
            reviewLikeArray: [],
            page: null,
            relationCategoryList: [],
        };
    },
    async created(){
        this.product_no = this.$route.query.pno;
        await this.showReviewList(1);

        await this.getProductDetail(this.$route.query.pno);
        await this.getQnaResult(this.qnaPageNo);
        const viewDiv = this.$refs.viewer;
        const html = this.productDetail.product_detail_desc;
        toastViewer = new Viewer({
            el : viewDiv,
            initialValue : html
        });
    },
    methods:{
        async getProductDetail(pno){
            this.$showLoading();
            let result = await axios
                        .get(`/api/product/productDetail?pno=${pno}&ptype=${this.$store.state.curShowPetType}`)
                        .catch(err => console.log(err));
            this.productDetail = result.data.selectResult;
            this.relationCategoryList = result.data.relationResult;

            const cartResult = await axios
                        .get(`/api/product/productDetail/${this.$store.state.userNo}/${pno}`)
                        .catch(err => console.log(err));
            const wishResult = await axios
                        .get(`/api/product/wish/${this.$store.state.userNo}`)
                        .catch(err => console.log(err)); 
            this.cartInfo = cartResult.data;
            this.wishInfo = wishResult.data;
            this.$hideLoading();
        },
        async getQnaResult(qnaPage) {
            const qnaResult = await axios
                        .get(`/api/board/qna/${this.productDetail.product_no}/${qnaPage}`)
                        .catch(err => console.log(err));           
            this.qnaInfo = qnaResult.data.selectResult;
            this.qnaPage = qnaResult.data.page;
        },
        async addWishfunction(){
            if(this.$store.state.userNo <= 0) {
                this.$showWarningAlert('로그인 먼저 해주세요.');
                this.$router.push({path: '/login'});
                return;
                }
            for(let i =0; i< this.wishInfo.length; ++i){
                if(this.productDetail.product_no == this.wishInfo[i].product_no){
                    this.$showWarningAlert("이미 찜목록에 있는 상품입니다.");
                    return;
                }
            }
            this.$showLoading();
            let obj = {
                pno : this.productDetail.product_no,
                uno : this.$store.state.userNo
            }
            let result = await axios
                        .post(`/api/product/wish`,obj)
                        .catch(err => console.log(err));
            if(result.data.affectedRows > 0){
                this.$showSuccessAlert("찜에 등록되었습니다."); 
                const wishResult = await axios
                        .get(`/api/product/wish/${this.$store.state.userNo}`)
                        .catch(err => console.log(err));
                        this.wishInfo = wishResult.data;
            }
                this.$hideLoading();   
        },
        async addCartfunction(){
            if(this.$store.state.userNo <= 0) {
                this.$showWarningAlert('로그인 먼저 해주세요.');
                this.$router.push({path: '/login'});
                return;
                }
            if(this.cnt <= 0){
                this.$showWarningAlert("상품을 1개 이상 담아주세요.");
                return 
            }
            if(this.productDetail.product_stock == 0){
                this.$showWarningAlert("현재 상품은 품절 상태입니다.");
                    return;
            }
            if(this.cartInfo.length >= 1) {
                if(Number(this.cnt) + Number(this.cartInfo[0].product_sel_cnt) > Number(this.productDetail.product_stock)){
                    this.$showWarningAlert("상품의 재고보다 많이 담았습니다.");
                    return;
                }    
            }
            else {
                if(Number(this.cnt) > Number(this.productDetail.product_stock)){
                    this.$showWarningAlert("상품의 재고보다 많이 담았습니다.");
                    return;
                }    
            }
            this.$showLoading();
            let obj = {
                pno : this.productDetail.product_no,
                cnt : this.cnt,
                userNo : this.$store.state.userNo
            }
            let result = await axios
                        .post(`/api/product/productDetail`,obj)
                        .catch(err => console.log(err));
            this.$hideLoading();
            if(result.data.affectedRows > 0){
                this.$showSuccessAlert("성공적으로 장바구니에 담겼습니다."); 
                    this.$showLoading();
                    const showcartcnt = await axios.get(`/api/user/cart-count/${this.$store.state.userNo}`).catch((err)=>console.log(err));
                    this.$store.commit('setCartCnt',showcartcnt.data.CNT);
                    const cartResult = await axios
                        .get(`/api/product/productDetail/${this.$store.state.userNo}/${this.productDetail.product_no}`)
                        .catch(err => console.log(err));
                    this.cartInfo = cartResult.data;
                    this.$hideLoading();   
            }
        },
        //장바구니 수량 입력
        inputNumber(event){
            this.cnt = event.target.value
            if(this.cnt <= 0){
                this.cnt = this.resetCnt;
                this.$showWarningAlert('상품을 1개 이상 담아주세요.');
                event.target.value = 1;
                this.cnt = 1;
                return;
            }
            else {
                if(this.cartInfo.length >= 1) {
                    if(Number(this.cnt) + Number(this.cartInfo[0].product_sel_cnt) > this.productDetail.product_stock) {
                        this.$showWarningAlert('상품의 재고보다 많이 담았습니다.');
                        event.target.value = 1;
                        this.cnt = 1;
                        return;
                    }
                }
                else {
                    if(Number(this.cnt) > Number(this.productDetail.product_stock)) {
                        this.$showWarningAlert('상품의 재고보다 많이 담았습니다.');
                        event.target.value = 1;
                        this.cnt = 1;
                        return;
                    }   
                }
            }
        },
        async showReviewList(pageno) {
            this.$showLoading();
                const result = await axios.get(`/api/product/productdetails/review/${this.product_no}/${pageno}`)
                    .catch((err) =>
                        console.log(err));
                this.reviewList = result.data.selectResult;
                this.page = result.data.pageDTO;
                // html 태그 삭제하고 리뷰내용 보이기
                for (let i = 0; i < this.reviewList.length; ++i) {
                    const div = document.createElement('div');
                    this.reviewList[i].realContent = this.reviewList[i].content;
                    div.innerHTML = this.reviewList[i].content;
                    this.reviewList[i].content = div.textContent || div.innerText || '';
                    if (this.reviewList[i].content.length >= 10) {
                        this.reviewList[i].content = this.reviewList[i].content.substr(0, 10) + '...';
                    }
                }
                this.$hideLoading();
                
            },
            async addReviewLikeCnt(rno) {
                if(this.$store.state.userNo <= 0) {
                    this.$showWarningAlert('로그인을 해주세요.');
                    return;
                }
                this.$showLoading();
                const result = await axios.put(`/api/product/productdetails/review/${rno}`)
                    .catch((err) => console.log(err));
                    result;
                this.$hideLoading();
                this.showReviewList(this.page.curPage);
            },
            async cancleReviewLikeCnt(rno) {
                if(this.$store.state.userNo <= 0) {
                    this.$showWarningAlert('로그인을 해주세요.');
                    return;
                }

                this.$showLoading();
                const result = await axios.delete(`/api/product/productdetails/review/${rno}`)
                    .catch((err) => console.log(err));
                    result;
                this.$hideLoading();
                this.showReviewList(this.page.curPage);
            },
            setViewer(review) {
                const viewDiv = this.$refs.viewer2;
                const modalTitle = this.$refs.title;
                const modalStar = this.$refs.starPos;
                modalStar.innerHTML = '';
                modalTitle.innerHTML = '';

                modalTitle.innerHTML = `<p>${this.productDetail.product_name}</p>`;
                let starTag = "<p style='color:#fab3cc; display:inline-block;'>별점 | ";
                for (let i = 0; i < review.star_cnt; ++i) {
                    starTag += '★';
                }
                starTag += '</p>';

                modalStar.innerHTML = starTag;
                const html = review.realContent;

                toastViewerModal = new Viewer2({
                    el: viewDiv,
                    initialValue: html
                });
            },
        toAddQnaForm(){
            if(this.$store.state.userNo <= 0) {
                    this.$showWarningAlert('로그인을 해주세요.');
                    this.$router.push({path: '/login'});
                    return;
            }
            this.$router.push({
                path:`/addqnaform`,
                query: { pno: this.productDetail.product_no , pname : this.productDetail.product_name},
            })
        },
    }
}    
</script>
<style scoped>
.modal-dialog {
        max-width: 50%;
    }
</style>