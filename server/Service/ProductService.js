const productDAO = require('../DAO/product/ProductDAO');
const ReviewDAO = require('../DAO/user/ReviewDAO');
const DeliveryDAO = require('../DAO/user/DeliveryDAO');
const paymentDAO = require('../DAO/product/PaymentDAO');
const paymentProductsDAO = require('../DAO/product/PaymentProductsDAO');
const {
    getConnection
} = require('../config/dbPool');

const categoryDAO = require("../DAO/product/CategoryDAO");
const couponDAO = require("../DAO/product/CouponDAO");
const CouponDAO = require("../DAO/product/CouponDAO");
const userDAO = require("../DAO/user/UserDAO");
const PageDTO = require("../commonModule/PageDTO");
const fs = require('fs');
const reviewLikeDAO = require('../DAO/user/ReviewLikeDAO');
const axios = require('axios');


class ProductService {
    constructor() {

    }

    //결제폼 회원정보, 장바구니, 쿠폰 가져오기 합침
    async getUserPaymentInfo(userNo, cartNo) {
        const cartList = await paymentDAO.selectCartQuery(userNo, cartNo);
        const couponList = await couponDAO.selectMyCouponQuery(userNo);
        const userInfo = await userDAO.selectUserInfoQuery(userNo);
        let result = [cartList, couponList, userInfo[0]];
        return result;
    }

    //결제 완료 처리
    async completePayment(paymentObj, paymentData, userNo, cartNo, couponNo) {
        let isCompletePayment = true;

        const connection = await getConnection();
        try {
            //트랜잭션 시작
            await connection.beginTransaction();
            let result = await paymentDAO.insertPaymentQuery(paymentObj, connection); //결제정보 삽입
            for (let i = 0; i < paymentData.length; ++i) {
                let result2 = await paymentProductsDAO.insertPaymentQuery(paymentData[i], connection); //개별상품결제정보 삽입
            }
            let result3 = await paymentProductsDAO.deleteCartQuery(userNo, cartNo, connection); //장바구니 삭제
            if (couponNo != null) {
                let result4 = await couponDAO.updateMyCouponQuery(couponNo, connection);
            }

            await connection.commit(); //결제처리 성공
        } catch (e) {
            console.log(e);
            await connection.rollback(); //결제처리 실패
            isCompletePayment = false;
        } finally {
            connection.release(); //사용한 커넥션 다시 풀에 반납
        }

        return isCompletePayment;
    }

    //결제 환불취소를 위해 토큰 받아오기
    async getImpAccessToken() {
        const getToken = await axios({
            url: 'https://api.iamport.kr/users/getToken',
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                imp_key: '0833153213402854', // REST API
                imp_secret: 'hkzGl1ceMe9P7BqdugRuaoXji3Kpi2gAURNPZbmeb7uQ74xWPDvwQjLINIj1QCP1gS8MUPPw87QCUhqq' // REST API Secret
            }
        });

        const accessToken = getToken.data.response.access_token;
        return accessToken;
    }

     /* 결제 전체 취소 */
    async cancelAllPayment(refundPrice, realPaymentAmount, paymentNo, impUid, cancelRequestAmount, cancelableAmount){

        const accessToken = await this.getImpAccessToken();
        //deliveryState로 배송상태 검증하기 (수정하기)

        // 포트원 REST API로 결제환불 요청
        try {
            const getCancelData = await axios({
                url: "https://api.iamport.kr/payments/cancel",
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": accessToken // 포트원 서버로부터 발급받은 엑세스 토큰
                },
                data: {
                    reason: '주문 취소', // 가맹점 클라이언트로부터 받은 환불사유
                    imp_uid: impUid, // imp_uid를 환불 `unique key`로 입력
                    amount: cancelRequestAmount, // 가맹점 클라이언트로부터 받은 환불금액
                    checksum: cancelableAmount // [권장] 환불 가능 금액 입력
                }
            });
            console.log('포트원 데이터뽑아요', getCancelData);

            if (getCancelData.status != 200 || getCancelData.data.code != 0) {
                console.log('취소 실패');
                return;
            }

            //배송상태 변경
            const result = await paymentDAO.cancelAllPayment(refundPrice, realPaymentAmount, paymentNo);
            //재고 돌려주기
            return result;
        } catch (error) {
            console.log(error);
        }
    }


    /* 결제 부분 취소 */
    //1)전체/부분 가격 가져오기
    async cancelSelectPayPrice(paymentProductNo) {
        const result = await paymentDAO.cancelSelectPayPrice(paymentProductNo);
        return result;
    }

    //2)업체별 합계 가져오기
    async cancelCompanySum(sellerNo, paymentNo) {
        const result = await paymentDAO.cancelCompanySum(sellerNo, paymentNo);
        return result;
    }

    //3) REST API로 결제환불 요청
    async cancelSelectAPI(
        paymentNo, impUid, cancelRequestAmount, cancelableAmount,
        paymentObj, paymentProductNo, deliveryFee, sellerNo
    ) {
        let cancelOk = true;
        const connection = await getConnection();
        const accessToken = await this.getImpAccessToken();
        try {
            const getCancelData = await axios({
                url: "https://api.iamport.kr/payments/cancel",
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": accessToken // 포트원 서버로부터 발급받은 엑세스 토큰
                },
                data: {
                    reason: '주문 취소', // 가맹점 클라이언트로부터 받은 환불사유
                    imp_uid: impUid, // imp_uid를 환불 `unique key`로 입력
                    amount: cancelRequestAmount, // 가맹점 클라이언트로부터 받은 환불금액
                    checksum: cancelableAmount // [권장] 환불 가능 금액 입력
                }
            });

            if (getCancelData.status != 200 || getCancelData.data.code != 0) {
                console.log('취소 실패');
                return;
            }
            //트랜잭션 시작
            await connection.beginTransaction();
            const result1 = await paymentDAO.cancelUpdatePayment(paymentObj, paymentNo, connection); //update payment
            const result2 = await paymentDAO.cancelUpdatePaymentProduct(deliveryFee, paymentNo, sellerNo, connection);
            const result3 = await paymentDAO.cancelPaymentDelivery(paymentProductNo, connection);
            await connection.commit();
        } catch (error) {
            console.log(error);
            console.log('실패');
            await connection.rollback(); //결제취소처리 실패
            cancelOk = false;
        } finally {
            connection.release(); //사용한 커넥션 다시 풀에 반납
        }
        return cancelOk;
    }

    /* 주문내역 전제조회 */
    //주문 전체 내역 리스트 가져오기

    async getPaymentList(userNo, pageNo){
        const result = await paymentDAO.selectPaymentList(userNo, pageNo);
        const countResult = await paymentDAO.selectPaymentListCnt(userNo);
        const pageDTO = new PageDTO(countResult[0].cnt, Number(pageNo), 10);
        const resResult = {
            selectResult: result,
            pageDTO: pageDTO
        }
        return resResult;
    }

    /*주문내역 상세조회*/
    //주문 전체내역 중 단건 조회 
    async getPaymentInfo(paymentNo) {
        const result = await paymentDAO.selectPaymentInfo(paymentNo);
        return result;
    }

    //주문 세부 내역 가져오기
    async getPaymentDetail(paymentNo) {
        const result = await paymentProductsDAO.selectPaymentDetail(paymentNo);
        return result;
    }

    /*상품조회*/
    // 상품리스트 가져오기
    async getMainpageProductList(ptype) {
        let result = await productDAO.selectMainpageFirstProductQuery(ptype);
        let result2 = await productDAO.selectMainpageSecondProductQuery(ptype);
        let result3 = await productDAO.selectMainpageLastProductQuery(ptype);
        let resResult = [
            result, result2, result3
        ];
        return resResult;
    }
    //검색한 상품리스트
    async getSearchProductList(search, ptype, pageno) {
        let result = await productDAO.selectSearchProductQuery(search, ptype, pageno);
        return result;
    }
    //카테고리 정보
    async getCategoryData() {
        let result = await categoryDAO.selectCategoryDataQuery();
        return result;
    }
    // 카테고리 검색한 리스트
    async getCategorySearch(cno, ptype, pageno) {
        let result = await categoryDAO.selectCategorySearchQuery(cno, ptype, pageno);
        return result;
    }
    //검색한 상품 결과 개수
    async getSearchResultCnt(search, ptype, pageno) {
        const result = await productDAO.selectSearchProductQuery(search, ptype, pageno);
        const countResult = await productDAO.selectSearchProductCntQuery(search, ptype);
        const pageDTO = new PageDTO(countResult[0].cnt, Number(pageno), 8);
        const resResult = {
            selectResult: result,
            pageDTO: pageDTO
        }
        return resResult;
    }
    // 카테고리 상품 개수
    async getCategoryProductCnt(cno, ptype, pageno) {
        const result = await categoryDAO.selectCategorySearchQuery(cno, ptype, pageno);
        const countResult = await categoryDAO.selectCategorySearchCntQuery(cno, ptype);
        const pageDTO = new PageDTO(countResult[0].cnt, Number(pageno), 8);
        const resResult = {
            selectResult: result,
            pageDTO: pageDTO
        }
        return resResult;
    }
    //신상품
    async getNewProductList(ptype, pageno) {
        const result = await productDAO.selectNewProductQuery(ptype, pageno);
        const countResult = await productDAO.selectNewProductCntQuery(ptype, pageno);
        const pageDTO = new PageDTO(countResult[0].cnt, Number(pageno), 8);
        const resResult = {
            selectResult: result,
            pageDTO: pageDTO
        }
        return resResult;
    }
    //베스트
    async getBestProductList(ptype, pageno) {
        const result = await productDAO.selectBestProductQuery(ptype, pageno);
        //const countResult = await productDAO.selectBestProductCntQuery(ptype,pageno);
        const pageDTO = new PageDTO(result.length, Number(pageno), 8);
        const resResult = {
            selectResult: result,
            pageDTO: pageDTO
        }
        return resResult;
    }
    //////////////////
    /////관리자///////
    /////////////////

    //관리자 메인
    async selectQueryByPeriodAdmin(period, minPrice, maxPrice, pageNo) {
        let result = await productDAO.selectQueryByPeriodAdmin(period, minPrice, maxPrice, pageNo);
        let cntResult = await productDAO.selectQueryByPeriodCntAdmin(period, minPrice, maxPrice);
        const pageDTO = new PageDTO(cntResult[0].CNT, Number(pageNo), 10);
        const resResult = {
            selectResult: result,
            pageDTO: pageDTO

        }
        return resResult;

    }
    //관리자-회원조회
    async getAdminMemberList(permission, leave, pageNo) {
        let result = await productDAO.getAdminMemberList(permission, leave, pageNo);
        let cntResult = await productDAO.getAdminMemberListCnt(permission, leave);
        const pageDTO = new PageDTO(cntResult[0].CNT, Number(pageNo), 10);
        const resResult = {
            selectResult: result,
            pageDTO: pageDTO
        }

        return resResult;
    }

    //관리자 쿠폰 정보 조회
    async getAdminCouponList(pageNo) {
        let result = await CouponDAO.getAdminCouponInfo(pageNo);
        let cntResult = await CouponDAO.getAdminCouponInfoCnt();
        const pageDTO = new PageDTO(cntResult[0].CNT, Number(pageNo), 10);
        const resResult = {
            selectResult: result,
            pageDTO: pageDTO

        }

        return resResult;

    }
    //관리자-쿠폰생성
    async createAdminCouponInfo(sendObj) {
        const couponInfo = {
            coupon_name: sendObj.couponName,
            discount_pct: sendObj.discountPct,
            expire_date: sendObj.expireDate,
        }
        let result = await CouponDAO.createAdminCouponInfo(couponInfo);
        return result;
    }

    //관리자-쿠폰지급
    async giveAdminCoupon(sendObj) {
        const giveCouponInfo = {
            receive_date: sendObj.receiveDate,
            coupon_state: sendObj.couponState,
            user_no: sendObj.userNo,
            coupon_no: sendObj.couponNo
        }
        let result = await CouponDAO.giveAdminCoupon(giveCouponInfo);
        return result;
    }

    //판매자 메인-기간,가격으로 검색
    async selectQueryByPeriod(userNo, period, minPrice, maxPrice, pageNo) {
        let result = await productDAO.selectQueryByPeriod(userNo, period, minPrice, maxPrice, pageNo);
        let cntResult = await productDAO.selectQueryByPeriodCnt(userNo, period, minPrice, maxPrice);
        console.log('qweqwdsa', cntResult);
        const pageDTO = new PageDTO(cntResult[0].CNT, Number(pageNo), 10);
        const resResult = {
            selectResult: result,
            pageDTO: pageDTO
        }

        return resResult;
    }
    //판매자-상품리스트
    async getMyProductList(userNo, publicStateNo, pageNo, showCnt) {
        let result = await productDAO.getMyProductList(userNo, publicStateNo, pageNo, showCnt);
        let cntResult = await productDAO.sellerProductCnt(userNo, publicStateNo);
        const pageDTO = new PageDTO(cntResult[0].CNT, Number(pageNo), showCnt);

        const resResult = {
            selectResult: result,
            pageDTO: pageDTO
        }

        return resResult;
    }

    //판매자 상품관리-필터검색
    async getMyProductListFilter(userNo, publicStateNo, categoryArray) {
        let result = '';
        try {

            if (categoryArray == -1) //-1 특별한 의미는 없다..
                result = await productDAO.getMyProductList(userNo); //카테고리를 선택하지 않았을때 전체상품 리스트를 조회함
            else //카테고리를 선택했을때 공개상태와 categoryArray를 인수로 보냄
                result = await productDAO.getMyProductListFilter(userNo, publicStateNo, categoryArray);
        } catch (e) {
            console.log(e);
        }

        return result;
    }

    //판매자 상품삭제
    async deleteProduct(productArray) {
        let result = await productDAO.deleteProduct(productArray);
        return result;
    }

    //판매자 상품숨김
    async hidingProduct(productArray) {
        let result = await productDAO.hidingProduct(productArray);
        return result;
    }

    //상품등록
    async uploadProduct(sendObj, fileImage) {
        const productImage = fileImage;
        const petTypeName = sendObj.petType == 'd1' ? 'dog' : 'cat';

        let savePath = __dirname + `/../uploads/productImage/${petTypeName}/${productImage.originalFilename}`;
        const rs = fs.createReadStream(productImage.path);
        const ws = fs.createWriteStream(savePath);
        rs.pipe(ws);

        const object = {
            pet_type: sendObj.petType,
            category_no: sendObj.categoryNo,
            product_name: sendObj.productName,
            product_detail_desc: sendObj.productDetailDesc,
            product_price: sendObj.productPrice,
            product_stock: sendObj.productStock,
            product_desc: sendObj.product_desc,
            user_no: sendObj.user_no,
            product_public_state: sendObj.product_public_state,
            product_image: productImage.originalFilename
        }
        let result = await productDAO.uploadProduct(object);
        return result;
    }
    //판매자-리뷰조회
    async getSellerReview(userNo, pageNo, showCnt) {
        let result = await ReviewDAO.getSellerReview(userNo, pageNo, showCnt);
        let cntResult = await ReviewDAO.sellerReviewCnt(userNo);
        const pageDTO = new PageDTO(cntResult[0].CNT, Number(pageNo), showCnt);

        const resResult = {
            selectResult: result,
            pageDTO: pageDTO
        }

        return resResult;
    }

    //판매자-리뷰검색
    async searchSellerReview(search) {
        let result = await ReviewDAO.searchSellerReview(search);
        return result;
    }

    //판매자-리뷰삭제
    async removeSellerReview(reviewNo) {
        let result = await ReviewDAO.removeSellerReview(reviewNo);
        return result;
    }

    //판매자-배송관리
    async sellerDelivery(userNo, pageNo, showCnt) {
        let result = await DeliveryDAO.sellerDelivery(userNo, pageNo, showCnt);
        let cntResult = await DeliveryDAO.sellerDeliveryCnt(userNo);
        const pageDTO = new PageDTO(cntResult[0].CNT, Number(pageNo), showCnt);

        const resResult = {
            selectResult: result,
            pageDTO: pageDTO
        }

        return resResult;
    }

    //판매자-배송관리-회원이름으로 검색
    async sellerDeliverySearchUserName(search) {

        let result = await DeliveryDAO.sellerDeliverySearchUserName(search);
        console.log('asdasd', result)
        return result;

    }

    //판매자-배송관리-주소 업데이트
    async sellerDeliveryUpdate(deliveryNumber, paymentProductNo) {

        let result = await DeliveryDAO.sellerDeliveryNumberUpdate(deliveryNumber, paymentProductNo);
        return result;

    }

    //판매자-배송관리-C1에서 C2로
    async DeliveryStateChangeC2(paymentProductNo) {

        let result = await DeliveryDAO.DeliveryStateChangeC2(paymentProductNo);
        return result;

    }



    //트랜잭션 예시코드임
    // async completePayment() {
    //     const connection = await getConnection();
    //     // 트랜잭션 시작
    //     try {
    //         await connection.beginTransaction(); // 트랜잭션 시작
    //         let result = await paymentDAO.결제정보삽입(data);
    //         let result2 = await paymentProductsDAO.결제상품들삽입(data);
    //         let result3 = await MyCartDAO.장바구니삭제(data);
    //         await connection.commit(); // 트랜잭션 끝(성공)
    //     }
    //     catch(e) {
    //         await connection.rollback(); // 트랜잭션 끝(실패)
    //     }
    //     finally {
    //         connection.release(); // 사용한 커넥션은 다시 풀에 반납
    //     }
    // }
    // 추천상품
    async getRecProductList(ptype, pageno) {
        const result = await productDAO.selectRecProductQuery(ptype, pageno);
        //const countResult = await productDAO.selectRecProductCntQuery(ptype,pageno);
        const pageDTO = new PageDTO(result.length, Number(pageno), 8);
        const resResult = {
            selectResult: result,
            pageDTO: pageDTO
        }
        return resResult;
    }
    //하랑
    async showProdDetail(product_no, ptype) {
        let result = await productDAO.showProductDetailQuery(product_no);
        let result2 = await productDAO.relationProductListQuery(result[0].category_no, ptype);
        console.log('ㅎㅎ',result[0].category_no, ptype);
        const result3 = {
            selectResult: result[0],
            relationResult: result2
        }
        return result3;
    }
    async addCart(product_no, product_sel_cnt, user_no) {
        let cartProduct = await productDAO.showProductDetailQuery(product_no);
        let cartInresult = await productDAO.cartInfoQuery(user_no, product_no);

        let isExistCartProduct = false;
        for (let i = 0; i < cartInresult.length; ++i) {
            if (cartInresult[i].product_no == product_no) {
                isExistCartProduct = true;
                break;
            }
        }
        if (isExistCartProduct == true) {
            if (Number(cartInresult[0].product_sel_cnt) + Number(product_sel_cnt) <= Number(cartProduct[0].product_stock)) {
                let result = await productDAO.updateCartQuery(product_sel_cnt, user_no, product_no);
                return result;
            }
        } else {
            let result = await productDAO.addCartQuery(product_no, product_sel_cnt, user_no);
            return result;
        }
    }
    async showCartInfo(userNo, productNo) {
        let result = await productDAO.cartInfoQuery(userNo, productNo);
        return result;
    }

    async addWish(product_no, user_no) {
        let result = await productDAO.addWishQuery(product_no, user_no);
        return result;
    }
    async wishInfo(user_no) {
        let result = await productDAO.wishInfoQuery(user_no);
        return result;
    }
    async delWish(user_no, product_no) {
        let result = await productDAO.delWishQuery(user_no, product_no);
        return result;
    }
    //구매후기 리스트
    async showReviewList(product_no, pageno) {
        const result = await reviewLikeDAO.selectReviewLikeQuery(product_no, pageno);
        return result;
    }
    //구매후기 개수
    async showReviewListCnt(product_no, userNo, pageno) {
        const result = await reviewLikeDAO.selectReviewLikeQuery(userNo, product_no, pageno);
        const countResult = await reviewLikeDAO.selectReviewLikeCntQuery(product_no);
        const pageDTO = new PageDTO(countResult[0].cnt, Number(pageno), 5);
        const resResult = {
            selectResult: result,
            pageDTO: pageDTO
        }
        return resResult;
    }
    //리뷰좋아요 등록
    async addReviewLikeCnt(rno, user_no) {
        let result = await reviewLikeDAO.updateAddReviewLikeCntQuery(rno);
        let result2 = await reviewLikeDAO.insertAddReviewLikeCntQuery(rno, user_no);
        if (result.changedRows <= 0) {
            return null;
        }
        if (result2.affectedRows <= 0) {
            return null;
        }

        return true;
    }
    //리뷰좋아요 취소
    async cancelReviewLikeCnt(rno, user_no) {
        let result2 = await reviewLikeDAO.updateMinusReviewLikeCntQuery(rno);
        let result3 = await reviewLikeDAO.deleteMinusReviewLikeCntQuery(rno, user_no);
        if (result2.changedRows >= 0) {
            return null;
        }
        if (result3.affectedRows >= 0) {
            return null;
        }
        return true;
    }
    //관련상품 4개 리스트
    async getrelationProductList(cno, ptype) {
        let result = await productDAO.relationProductListQuery(cno, ptype);
        return result;
    }
}

module.exports = ProductService;