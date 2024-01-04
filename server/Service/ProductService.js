
const productDAO = require('../DAO/product/ProductDAO');
const ReviewDAO = require('../DAO/user/ReviewDAO');
const DeliveryDAO = require('../DAO/user/DeliveryDAO');
const categoryDAO = require("../DAO/product/CategoryDAO");
const PageDTO = require("../commonModule/PageDTO");
const fs = require('fs');

class ProductService {
    constructor() {

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
    //판매자 메인-기간,가격으로 검색
    async selectQueryByPeriod(userNo, period, minPrice, maxPrice) {
        let result = await productDAO.selectQueryByPeriod(userNo, period, minPrice, maxPrice);
        console.log('테스트')
        console.log(result)
        return result;
    }
    //판매자 메인-상품리스트
    async getMyProductList(userNo,publicStateNo) {
        
        let result = await productDAO.getMyProductList(userNo,publicStateNo);
        
        return result;
    }

    //판매자 상품관리-필터검색
    async getMyProductListFilter(userNo,publicStateNo, categoryArray) {
        let result = '';
        try {            

            if(categoryArray == -1) //-1 특별한 의미는 없다..
                result = await productDAO.getMyProductList(userNo); //카테고리를 선택하지 않았을때 전체상품 리스트를 조회함
            else //카테고리를 선택했을때 공개상태와 categoryArray를 인수로 보냄
                result = await productDAO.getMyProductListFilter(userNo,publicStateNo, categoryArray);
        }
        catch(e) {
            console.log(e);
        }
        
        return result;
    }


    async uploadProduct(sendObj,fileImage) {
        const productImage = fileImage;
        const petTypeName = sendObj.petType == 'd1' ? 'dog' : 'cat'; 

        let savePath = __dirname + `/../uploads/productImage/${petTypeName}/${productImage.originalFilename}`;
        const rs = fs.createReadStream(productImage.path);
	    const ws = fs.createWriteStream(savePath);
	    rs.pipe(ws);

        const object = {
            pet_type : sendObj.petType,
            category_no : sendObj.categoryNo,
            product_name: sendObj.productName,
            product_detail_desc: sendObj.productDetailDesc,
            product_price: sendObj.productPrice,
            product_stock: sendObj.productStock,
            product_desc: sendObj.product_desc,
            user_no: sendObj.user_no,
            product_public_state: sendObj.product_public_state,
            product_image : productImage.originalFilename
        }
        let result = await productDAO.uploadProduct(object);
        return result;
    }
    //판매자-리뷰조회
    async getSellerReview(userNo) {
        let result = await ReviewDAO.getSellerReview(userNo);
        return result;
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
    async sellerDelivery(userNo) {
        let result = await DeliveryDAO.sellerDelivery(userNo);
        return result;
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