let { pool,query } = require('../../config/dbPool');

// 쿼리문 만들기
let paymentProductsDAO = {
    //개별상품 주문 데이터 넣기 (2)
    insertPaymentQuery : async function(paymentData, conn = null){
        const insertPaymentQuery = 
            `INSERT INTO payment_product SET ?`;
        if(conn != null){
            // 인자로 넘겨받은 커넥션을 통한 쿼리문 
            return conn.query(insertPaymentQuery, paymentData);
        }
        // 커넥션풀에 있는 커넥션중 하나가 쿼리처리
        return query (insertPaymentQuery, paymentData);
    },
    //장바구니 비우기 (3)
    deleteCartQuery : async function(userNo, conn = null){
        const deleteCartQuery =
            `DELETE FROM cart WHERE user_no = ?`;

        if(conn != null){
            return conn.query(deleteCartQuery, userNo);
        }
        return query (deleteCartQuery, userNo);
    }
};

module.exports = paymentProductsDAO;