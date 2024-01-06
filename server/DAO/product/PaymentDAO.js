let { pool,query } = require('../../config/dbPool');

// 쿼리문 만들기
let paymentDAO = {
    //결제폼 카트 정보 불러오기
    selectCartQuery : async function(userNo,cartNo){
        let url = '';
        let arrayConfirm = Array.isArray(cartNo);
        //배열인지 아닌지 확인해서 url넘기기
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
        
        const selectCartQuery = 
        `SELECT p.user_no, p.product_no, c.product_sel_cnt, p.product_name, p.product_price, c.product_sel_cnt * p.product_price as price_sum
        FROM cart c LEFT JOIN product p
        ON c.product_no = p.product_no
        WHERE c.user_no = ? AND c.cart_no IN(${url}`;
        if(!arrayConfirm) {
            return query(selectCartQuery, [userNo,cartNo]);
        }
        else {
            return query(selectCartQuery, [userNo,...cartNo]);
        }
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

    //결제 전체 주문내역 불러오기
    selectPaymentList : async function(userNo){
        const selectPaymentList =
            `SELECT * FROM payment WHERE user_no = ?`;
            
            return query(selectPaymentList, userNo);
    },
    

    //결제 전체 취소 (Update payment + payment_product)
    cancelAllPayment: async function(paymentNo){
       const cancelAllPayment = 
            `  UPDATE payment p 
                JOIN payment_product p2
                ON p.payment_no = p2.payment_no
                SET p.order_state = 'C5', p2.delivery_state = 'C5'
                WHERE p.payment_no = ?`;
       return query (cancelAllPayment, paymentNo);
    }
};

module.exports = paymentDAO;