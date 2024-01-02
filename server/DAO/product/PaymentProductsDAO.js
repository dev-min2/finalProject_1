let { pool,query } = require('../config/dbPool');

// 쿼리문 만들기
let paymentProductsDAO = {
    //개별상품 주문 데이터 넣기
    insertPaymentQuery : async function(paymentData, conn = null){
        const insertPaymentQuery = 
            `INSERT INTO payment_product SET ?`;
        if(conn != null){
            // 인자로 넘겨받은 커넥션을 통한 쿼리문 
            return conn.query(insertPaymentQuery, paymentData);
        }
        // 커넥션풀에 있는 커넥션중 하나가 쿼리처리
        return query (insertPaymentQuery, paymentData);
    }
};

module.exports = paymentProductsDAO;