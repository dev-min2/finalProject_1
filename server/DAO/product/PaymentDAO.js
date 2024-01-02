let { pool,query } = require('../../config/dbPool');

// 쿼리문 만들기
let paymentDAO = {
    //결제폼 카트 정보 불러오기
    selectCartQuery : async function(userNo){
        const selectCartQuery = 
        `SELECT p.product_no, c.product_sel_cnt, p.product_name, p.product_price, c.product_sel_cnt * p.product_price as price_sum
        FROM cart c LEFT JOIN product p
        ON c.product_no = p.product_no
        WHERE c.user_no = ?`;

        return query(selectCartQuery, userNo);
    },
    //결제완료 후 결제 정보 넣기 (1)
    insertPaymentQuery : async function(paymentObj, conn = null){
        const insertPaymentQuery = 
            `INSERT INTO payment SET =?`;

        if (conn != null){
            return query (insertPaymentQuery, paymentObj);
        } 
        return query (insertPaymentQuery, paymentObj);
    },

};

module.exports = paymentDAO;