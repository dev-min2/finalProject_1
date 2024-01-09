const paymentDAO = require('../DAO/product/PaymentDAO');
const paymentProductsDAO = require('../DAO/product/PaymentProductsDAO');
const {
    getConnection
} = require('../config/dbPool');

const productDAO = require("../DAO/product/ProductDAO");
const categoryDAO = require("../DAO/product/CategoryDAO");
const couponDAO = require("../DAO/product/CouponDAO");
const userDAO = require("../DAO/user/UserDAO");
const PageDTO = require("../commonModule/PageDTO");
const reviewLikeDAO = require('../DAO/user/ReviewLikeDAO');


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
        const connection = await getConnection();
        try {
            //트랜잭션 시작
            await connection.beginTransaction();
            let result = await paymentDAO.insertPaymentQuery(paymentObj, connection); //결제정보 삽입
            for (let i = 0; i < paymentData.length; ++i) {
                let result2 = await paymentProductsDAO.insertPaymentQuery(paymentData[i], connection); //개별상품결제정보 삽입
            }
            let result3 = await paymentProductsDAO.deleteCartQuery(userNo, cartNo, connection); //장바구니 삭제
            let result4 = await couponDAO.updateMyCouponQuery(couponNo);
            await connection.commit(); //결제처리 성공
        } catch (e) {
            console.log(e);
            await connection.rollback(); //결제처리 실패
        } finally {
            connection.release(); //사용한 커넥션 다시 풀에 반납
        }

    }
    //결제 전체 취소 처리
    async cancelAllPayment(paymentNo) {
        const result = await paymentDAO.cancelAllPayment(paymentNo);
        return result;
    }

    //주문 전체 내역 가져오기
    async getPaymentList(userNo) {
        const result = await paymentDAO.selectPaymentList(userNo);
        return result;
    }
    //주문 상세 내역 가져오기
    async getPaymentDetail(paymentNo) {
        const result = await paymentProductsDAO.selectPaymentDetail(paymentNo);
        return result;
    }


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
    async showProdDetail(product_no) {
        let result = await productDAO.showProductDetailQuery(product_no);
        let result2 = await productDAO.relationProductListQuery(result[0].category_no);
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

    async addReviewLikeCnt(rno, user_no, pno) {
        let result = await reviewLikeDAO.updateAddReviewLikeCntQuery(rno);
        let result2 = await reviewLikeDAO.insertAddReviewLikeCntQuery(rno, user_no);
        if (result.changedRows <= 0) {
            return null;
        }
        if (result2.affectedRows <= 0) {
            return null;
        }

        const result3 = await reviewLikeDAO.selectReviewLikeQuery(pno);
        return result3;
    }
    //관련상품 4개 리스트
    async getrelationProductList(cno) {
        let result = await productDAO.relationProductListQuery(cno);
        return result;
    }
}

module.exports = ProductService;