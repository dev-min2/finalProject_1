const ProductDAO = require('../DAO/product/ProductDAO');

class ProductService {
    constructor() {

    }

    async selectQueryByPeriod(userNo,period) {
        let result = await ProductDAO.selectQueryByPeriod(userNo,period,minPrice,maxPrice);
        return result;
    }

    // async myProductPayRank(userNo) {
    //     let result = await ProductDAO.selectQuery2(userNo);
    //     return result;
    // }

    // async selectTodayQuery(userNo) {
    //     let result = await ProductDAO.selectTodayQuery(userNo);
    //     return result;
    // }

    // async select1weekQuery(userNo) {
    //     let result = await ProductDAO.select1weekQuery(userNo);
    //     return result;
    // }

    // async select1monthQuery(userNo) {
    //     let result = await ProductDAO.select1monthQuery(userNo);
    //     return result;
    // }

    // async select3monthQuery(userNo) {
    //     let result = await ProductDAO.select3monthQuery(userNo);
    //     return result;
    // }

    // async select6monthQuery(userNo) {
    //     let result = await ProductDAO.select6monthQuery(userNo);
    //     return result;
    // }


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