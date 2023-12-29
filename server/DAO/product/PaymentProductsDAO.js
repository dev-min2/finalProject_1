let { pool,query } = require('../config/dbPool');

// 쿼리문 만들기
let paymentProductsDAO = {
    selectQuery : async function() {
    },
    insertPaymentQuery : async function(paymentData, conn = null) {
        const insertQuery = `
            INSERT INTO payment...
        `;
        if(conn != null) {
            // 인자로 넘겨받은 커넥션을 통한 쿼리문 
            return conn.query(insertQuery, paymentData);
        }
        // 커넥션풀에 있는 커넥션중 하나가 쿼리처리
        return query(insertQuery, paymentData);
    },
};

module.exports = paymentProductsDAO;