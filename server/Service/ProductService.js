
const paymentDAO = require('../DAO/product/PaymentDAO');
const paymentProductsDAO = require('../DAO/product/PaymentProductsDAO');
const { getConnection } = require('../config/dbPool');

const productDAO = require("../DAO/product/ProductDAO");
const categoryDAO = require("../DAO/product/CategoryDAO");
const couponDAO = require("../DAO/product/CouponDAO");
const userDAO = require("../DAO/user/UserDAO");
const PageDTO = require("../commonModule/PageDTO");


class ProductService {
    constructor() {
     
    }

    //결제폼 회원정보, 장바구니, 쿠폰 가져오기 합침
    async getUserPaymentInfo(userNo, cartNo){
        const cartList = await paymentDAO.selectCartQuery(userNo, cartNo);
        const couponList = await couponDAO.selectMyCouponQuery(userNo);
        const userInfo = await userDAO.selectUserInfoQuery(userNo);
        let result = [cartList, couponList, userInfo[0]];
        return result;
    }

    //결제 완료 처리
    async completePayment(paymentObj, paymentData, userNo){ 
        const connection = await getConnection();
        try{
            //트랜잭션 시작
            await connection.beginTransaction(); 
            let result = await paymentDAO.insertPaymentQuery(paymentObj,connection); //결제정보 삽입
            for(let i = 0; i < paymentData.length; ++i) {
                let result2 = await paymentProductsDAO.insertPaymentQuery(paymentData[i],connection); //개별상품결제정보 삽입
            }
            let result3 = await paymentProductsDAO.deleteCartQuery(userNo,connection); //장바구니 삭제
            await connection.commit(); //결제처리 성공
        }
        catch(e){ 
            console.log(e);
            await connection.rollback(); //결제처리 실패
        }
        finally {
            connection.release(); //사용한 커넥션 다시 풀에 반납
        }
        
    }
    //주문 내역 가져오기
    async getPaymentList(userNo){
        const result = await paymentDAO.selectPaymentList(userNo);
        return result;
    }

    // 상품리스트 가져오기
    async getMainpageProductList(ptype) {
        let result = await productDAO.selectMainpageFirstProductQuery(ptype);
        let result2 = await productDAO.selectMainpageSecondProductQuery(ptype);
        let result3 = await productDAO.selectMainpageLastProductQuery(ptype);
        let resResult = [
            result,result2,result3
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
    async getNewProductList(ptype,pageno) {
        const result = await productDAO.selectNewProductQuery(ptype,pageno);
        const countResult = await productDAO.selectNewProductCntQuery(ptype,pageno);
        const pageDTO = new PageDTO(countResult[0].cnt, Number(pageno), 8);
        const resResult = {
            selectResult : result,
            pageDTO : pageDTO
        }
        return resResult;
    }
    //베스트
    async getBestProductList(ptype,pageno) {
        const result = await productDAO.selectBestProductQuery(ptype,pageno);
        //const countResult = await productDAO.selectBestProductCntQuery(ptype,pageno);
        const pageDTO = new PageDTO(result.length, Number(pageno), 8);
        const resResult = {
            selectResult : result,
            pageDTO : pageDTO
        }
        return resResult;
    }

    // 추천상품
    async getRecProductList(ptype,pageno) {
        const result = await productDAO.selectRecProductQuery(ptype,pageno);
        //const countResult = await productDAO.selectRecProductCntQuery(ptype,pageno);
        const pageDTO = new PageDTO(result.length, Number(pageno), 8);
        const resResult = {
            selectResult : result,
            pageDTO : pageDTO
        }
        return resResult;
    }
    //하랑
    async showProdDetail(product_no) {
        let result = await productDAO.showProductDetailQuery(product_no);
        return result[0];
    }
}

module.exports = ProductService;