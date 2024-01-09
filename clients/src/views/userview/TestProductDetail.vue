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
                        <img class="card-img-top mb-5 mb-md-0" style="opacity : 0.3"
                            v-if="productDetail.pet_type == 'd1'"
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
                        <p style="text-align : right; color : gray">♥ 3만원 이상 구매시 무료 배송♥</p>
                        <div class="fs-5 mb-5">
                            <!-- <span class="text-decoration-line-through">$45.00</span> -->
                            <h4 style="font-size : 30px; text-align : right">\ {{productDetail.product_price}}</h4>
                        </div>
                        <p class="lead">{{productDetail.product_desc}}</p>
                        <br />
                        <div class="d-flex">
                            <input class="form-control text-center me-3" id="inputQuantity" type="number" min="1"
                                max="99" value="1" style="max-width: 6rem" v-if="productDetail.product_stock > 0"
                                @input="inputNumber($event)" />

                            <h3 v-else-if="productDetail.product_stock == 0" style="color : red">"현재 상품은 품절되었습니다." </h3>

                            <h3 v-else-if="productDetail.product_stock < 0" style="color : red">"현재 상품은 판매가 종료되었습니다."
                            </h3>

                            &nbsp;
                            <h4 v-if="productDetail.product_stock > 0" style="color : gray; margin-inline-start: auto">총
                                상품
                                금액 \ {{this.cnt * productDetail.product_price}}</h4>
                        </div>
                        <br />
                        <br />
                        <button class="btn btn-outline-dark flex-shrink-0" type="button" @click="addWishfunction()"
                            style="width : 48%; height : 50px" v-if="productDetail.product_stock >= 0">
                            <i></i>
                            ♥ Add to wish list
                        </button>
                        &nbsp;
                        <button class="btn btn-outline-dark flex-shrink-0" type="button" @click="addCartfunction()"
                            style="width : 48%; height : 50px" v-if="productDetail.product_stock >= 0">
                            <i class="bi-cart-fill me-1"></i>
                            Add to cart
                        </button>
                        <br />
                        <br />

                        <button class="btn btn-outline-dark flex-shrink-0" type="button"
                            style="width : 100%; height : 50px" v-if="productDetail.product_stock >= 0">
                            <i></i>
                            ▶ Buy Now
                        </button>
                    </div>
                </div>
                <div class="container px-4 px-lg-5 my-5" style="text-align:center;">
                    <a style="border: none; padding: 10px 50px; color: black; font-size: 18px; text-decoration-line: none"
                        href="#detail">상품 정보</a> <a v-if="page !== null"
                        style="border: none; padding: 10px 50px; color: black; font-size: 18px; text-decoration-line: none"
                        href="#review">구매 후기 ({{page.total}}) </a> <a
                        style="border: none; padding: 10px 50px; color: black; font-size: 18px; text-decoration-line: none"
                        href="#qna">문의 게시판</a> <a
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
                    <table class="table" style=text-align:center>
                        <thead>
                            <tr style=text-align:center>
                                <th>리뷰번호</th>
                                <th>리뷰내용</th>
                                <th>별점</th>
                                <th>작성자</th>
                                <th>등록날짜</th>
                                <th>좋아요</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-if="reviewList == null">
                                <td>아직 작성된 리뷰가 없습니다.</td>
                            </tr>
                            <tr v-else v-for="(review, idx) in reviewList" :key="idx">
                                <td>{{ review.review_no }}</td>
                                <td>{{ review.content }}</td>
                                <td>{{ review.star_cnt }}</td>
                                <td>{{ review.user_name }}</td>
                                <td>{{ $dateFormat(review.review_date) }}</td>
                                <td><input type="button" class="button" @click="addReviewLikeCnt(review.review_no)">
                                    {{ review.review_like_cnt }} </td>
                            </tr>
                        </tbody>
                    </table>
                    <PaginationComp v-if="page !== null" :page="page" @go-page="showReviewList" />
                </div>
                <!--리뷰 모달창-->
                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                    aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel"> 작성된 review </h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <select name="review" v-model="review" class="form-select">
                                    <div :key="i" :value="review" v-for="(review, i) in reviewList">
                                        <div style="display:none;"> {{ review.review_no }} </div>
                                        [ {{ review.content }} ] 작성자: {{review.user_name}} %
                                        | 작성일자 : {{this.$dateFormat(review.review_date)}}
                                    </div>
                                </select>
                            </div>
                            <div class="modal-footer">
                                <button type="button" @click="ReviewBtn()" class="btn btn-primary"
                                    data-bs-dismiss="modal">확인</button>
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
                            </div>
                        </div>
                    </div>
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
                                <tr>
                                    <td style=color:gray; colspan="7">아직 작성된 문의가 없습니다.</td>
                                </tr>
                            </tbody>
                        </table>
                        <p><input type="submit" value="문의글 작성">
                            <input type="hidden" name=pName value="ANF 치킨야채 캔 95g">
                            <input type="hidden" name=pNo value="11">
                        </p>
                    </div>
                    <hr>
                </form>
                <div id="order">
                    <div id="arrow"></div>
                    <h2 id="text1" onclick="openDiv()" style="font: bolder; font-size: 30px; text-align: left">
                        취소/교환/반품안내
                    </h2>
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
    import PaginationComp from '../../components/common/PaginationComp.vue';
    import Product from '../../components/userview/Product.vue';
    let toastViewer = null;
    export default {
        components: {
            PaginationComp,
            Product
        },
        data() {
            return {
                productDetail: [],
                cartInfo: [],
                cnt: 1,
                wishInfo: [],
                reviewList: null,
                product_no: 0,
                reviewLikeArray: [],
                page: null,
                relationCategoryList: []
            };
        },
        async created() {
            this.product_no = this.$route.query.pno;
            await this.getProductDetail(this.$route.query.pno);
            await this.showReviewList(1);
            const viewDiv = this.$refs.viewer;
            const html = this.productDetail.product_detail_desc;
            toastViewer = new Viewer({
                el: viewDiv,
                initialValue: html
            });
        },
        methods: {
            async getProductDetail(pno) {
                this.$showLoading();
                let result = await axios
                    .get(`/api/product/productDetail?pno=${pno}`)
                    .catch(err => console.log(err));
                this.productDetail = result.data.selectResult;
                this.relationCategoryList = result.data.relationResult
                const cartResult = await axios
                    .get(`/api/product/productDetail/${this.$store.state.userNo}/${this.productDetail.product_no}`)
                    .catch(err => console.log(err));
                const wishResult = await axios
                    .get(`/api/product/wish/${this.$store.state.userNo}`)
                    .catch(err => console.log(err));
                this.cartInfo = cartResult.data;
                this.wishInfo = wishResult.data;
                this.$hideLoading();
            },
            async addWishfunction() {
                if (this.$store.state.userNo <= 0) {
                    this.$showWarningAlert('로그인 먼저 해주세요.');
                    this.$router.push({
                        path: '/login'
                    });
                    return;
                }
                for (let i = 0; i < this.wishInfo.length; ++i) {
                    if (this.productDetail.product_no == this.wishInfo[i].product_no) {
                        this.$showWarningAlert("이미 찜목록에 있는 상품입니다.");
                        return;
                    }
                }
                this.$showLoading();
                let obj = {
                    pno: this.productDetail.product_no,
                    uno: this.$store.state.userNo
                }
                let result = await axios
                    .post(`/api/product/wish`, obj)
                    .catch(err => console.log(err));
                if (result.data.affectedRows > 0) {
                    this.$showSuccessAlert("찜에 등록되었습니다.");
                    const wishResult = await axios
                        .get(`/api/product/wish/${this.$store.state.userNo}`)
                        .catch(err => console.log(err));
                    this.wishInfo = wishResult.data;
                }
                this.$hideLoading();
            },
            async addCartfunction() {
                if (this.$store.state.userNo <= 0) {
                    this.$showWarningAlert('로그인 먼저 해주세요.');
                    this.$router.push({
                        path: '/login'
                    });
                    return;
                }
                if (this.cnt <= 0) {
                    this.$showWarningAlert("상품을 1개 이상 담아주세요.");
                    return
                }
                if (this.productDetail.product_stock == 0) {
                    this.$showWarningAlert("현재 상품은 품절 상태입니다.");
                    return;
                }
                if (this.cartInfo.length >= 1) {
                    if (Number(this.cnt) + Number(this.cartInfo[0].product_sel_cnt) > Number(this.productDetail
                            .product_stock)) {
                        this.$showWarningAlert("상품의 재고보다 많이 담았습니다.");
                        return;
                    }
                } else {
                    if (Number(this.cnt) > Number(this.productDetail.product_stock)) {
                        this.$showWarningAlert("상품의 재고보다 많이 담았습니다.");
                        return;
                    }
                }
                this.$showLoading();
                let obj = {
                    pno: this.productDetail.product_no,
                    cnt: this.cnt,
                    userNo: this.$store.state.userNo
                }
                let result = await axios
                    .post(`/api/product/productDetail`, obj)
                    .catch(err => console.log(err));
                this.$hideLoading();
                if (result.data.affectedRows > 0) {
                    this.$showSuccessAlert("성공적으로 장바구니에 담겼습니다.");
                    this.$showLoading();
                    const cartResult = await axios
                        .get(
                            `/api/product/productDetail/${this.$store.state.userNo}/${this.productDetail.product_no}`
                        )
                        .catch(err => console.log(err));
                    this.cartInfo = cartResult.data;
                    this.$store.state.cartCnt += 1;
                    this.$hideLoading();
                }
            },
            //장바구니 수량 입력
            inputNumber(event) {
                this.cnt = event.target.value
                if (this.cnt <= 0) {
                    this.cnt = this.resetCnt;
                    this.$showWarningAlert('상품을 1개 이상 담아주세요.');
                    event.target.value = 1;
                    this.cnt = 1;
                    return;
                } else {
                    if (this.cartInfo.length >= 1) {
                        if (Number(this.cnt) + Number(this.cartInfo[0].product_sel_cnt) > this.productDetail
                            .product_stock) {
                            this.$showWarningAlert('상품의 재고보다 많이 담았습니다.');
                            event.target.value = 1;
                            this.cnt = 1;
                            return;
                        }
                    } else {
                        if (Number(this.cnt) > Number(this.productDetail.product_stock)) {
                            this.$showWarningAlert('상품의 재고보다 많이 담았습니다.');
                            event.target.value = 1;
                            this.cnt = 1;
                            return;
                        }
                    }
                }
            },

            async showReviewList(pageno) {
                console.log(pageno);
                this.$showLoading();
                const result = await axios.get(`/api/product/productdetails/review/${this.product_no}/${pageno}`)
                    .catch((err) =>
                        console.log(err));
                this.reviewList = result.data.selectResult;
                this.page = result.data.pageDTO;
                // html 태그 삭제하고 리뷰내용 보이기
                for (let i = 0; i < this.reviewList.length; ++i) {
                    const div = document.createElement('div');
                    div.innerHTML = this.reviewList[i].content;
                    this.reviewList[i].content = div.textContent || div.innerText || '';
                    if (this.reviewList[i].content.length >= 10) {
                        this.reviewList[i].content = this.reviewList[i].content.substr(0, 10) + '...';
                    }

                }
                this.$hideLoading();
            },
            async addReviewLikeCnt(rno) {
                this.$showLoading();
                const result = await axios.put(`/api/product/productdetails/review/${rno}/${this.product_no}`)
                    .catch((err) => console.log(err));
                this.showReviewList(this.page.curPage);

            },
            ReviewBtn : async function(){
                
                this.review_no = this.reviewList.review_no;
            }
        }
    }
</script>
<style scoped>

</style>