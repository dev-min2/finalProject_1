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
    deleteCartQuery : async function(userNo, cartNo, conn = null){
        let url = '';
        let arrayConfirm = Array.isArray(cartNo);
        if(!arrayConfirm){
            url = '?)'
        } else {
            for(let i = 0; i < cartNo.length; i++) {
                if(i == cartNo.length - 1)
                    url += '?)';
                else 
                    url += '?,'
            }
        }

        const deleteCartQuery =
            `DELETE FROM cart WHERE user_no = ? AND cart_no IN (${url}`;

        if(conn != null){
            if(!arrayConfirm) {
                return conn.query(deleteCartQuery, [userNo,cartNo]);
            }
            else {
                return conn.query(deleteCartQuery, [userNo,...cartNo]);
            }
        }
        if(!arrayConfirm) {
            return query(deleteCartQuery, [userNo,cartNo]);
        }
        else {
            return query(deleteCartQuery, [userNo,...cartNo]);
        }
    }
};

module.exports = paymentProductsDAO;