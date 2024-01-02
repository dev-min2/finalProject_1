const paymentDAO = require('../DAO/product/PaymentDAO');
const paymentProductsDAO = require('../DAO/product/PaymentProductsDAO');
const { getConnection } = require('../config/dbPool');

class ProductService {
    constructor() {
     
    }
    //결제 폼
    async getCartList(userNo){ //장바구니 정보 가져오기
        const result = await paymentDAO.selectCartQuery(userNo);
        return result;

    }
    
    //결제 완료 처리
    async completePayment(paymentObj, paymentData, userNo){ 
        const connection = await getConnection();
        try{
            //트랜잭션 시작
            await connection.beginTransaction(); 
            let result = await paymentDAO.insertPaymentQuery(paymentObj,connection); //결제정보 삽입
            let result2 = await paymentProductsDAO.insertPaymentQuery(paymentData,connection); //개별상품결제정보 삽입
            let result3 = await paymentProductsDAO.deleteCartQuery(userNo,connection); //장바구니 삭제
            await connection.commit(); //결제처리 성공
        }
        catch(e){ 
            await connection.rollback(); //결제처리 실패
        }
        finally {
            connection.release(); //사용한 커넥션 다시 풀에 반납
        }
        
    }
}

module.exports = ProductService;