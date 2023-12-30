const ProductDAO = require('../DAO/product/ProductDAO');

class ProductService {
    constructor() {

    }

    async selectQueryByPeriod(userNo,period,minPrice,maxPrice) {
        let result = await ProductDAO.selectQueryByPeriod(userNo,period,minPrice,maxPrice);
        console.log('테스트')
        console.log(result)
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