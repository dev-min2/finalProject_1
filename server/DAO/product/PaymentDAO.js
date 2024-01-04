let { pool,query } = require('../../config/dbPool');

// 쿼리문 만들기
let paymentDAO = {
    //결제폼 카트 정보 불러오기
    selectCartQuery : async function(userNo,cartNo){
        let url = '';
        for(let i = 0; i < cartNo.length; ++i) {
            if(i == cartNo.length - 1)
                url += '?)';
            else 
                url += '?,'
        }

        const selectCartQuery = 
        `SELECT p.user_no, p.product_no, c.product_sel_cnt, p.product_name, p.product_price, c.product_sel_cnt * p.product_price as price_sum
        FROM cart c LEFT JOIN product p
        ON c.product_no = p.product_no
        WHERE c.user_no = ? AND c.cart_no IN(${url}`;
        
        return query(selectCartQuery, [userNo,...cartNo]);
    },
    //결제완료 후 결제 정보 넣기 (1)
    insertPaymentQuery : async function(paymentObj, conn = null){
        const insertPaymentQuery = 
            `INSERT INTO payment SET ?`;

        if (conn != null){
            return query (insertPaymentQuery, paymentObj);
        }
        return query (insertPaymentQuery, paymentObj);
    },

    //결제 주문내역 불러오기
    selectPaymentList : async function(userNo){
        const selectPaymentList =
            `SELECT * FROM payment WHERE user_no = ?`;
            
            return query(selectPaymentList, userNo);
    }
};

module.exports = paymentDAO;