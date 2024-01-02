const productDAO = require('../DAO/product/ProductDAO');
const ProductDAO = require('../DAO/product/ProductDAO');
const ReviewDAO = require('../DAO/user/ReviewDAO');
const DeliveryDAO = require('../DAO/user/DeliveryDAO');

class ProductService {
    constructor() {

    }

    async selectQueryByPeriod(userNo, period, minPrice, maxPrice) {
        let result = await ProductDAO.selectQueryByPeriod(userNo, period, minPrice, maxPrice);
        console.log('테스트')
        console.log(result)
        return result;
    }

    async getMyProductList(userNo) {
        
        let result = await ProductDAO.getMyProductList(userNo);
        console.log(result)
        return result;
    }

    async uploadProduct(object) {
        // const object = {
        //     pet_type : petType,
        //     category_no : categoryNo,
        //     productName: product_name,
        //     productDetailDesc: product_detail_desc,
        //     productPrice: product_price,
        //     productStock: product_stock,
        //     product_desc: product_desc,
        //     user_no: user_no,
        //     product_public_state: product_public_state
        
        // }
        let result = await ProductDAO.uploadProduct(object);
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
}

module.exports = ProductService;