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

    //결제 전체 주문내역 불러오기 (유저기준)
    selectPaymentList : async function(userNo){
        const selectPaymentList =
            `SELECT * FROM payment WHERE user_no = ?`;
            
            return query(selectPaymentList, userNo);
    },

    //결제 전체 주문내역 단건 불러오기
    selectPaymentInfo : async function(paymentNo){
        const selectPaymentInfo =
            `SELECT * FROM payment WHERE payment_no = ?`;
            
            return query(selectPaymentInfo, paymentNo);
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
    },
    //API 결제 부분취소를 위해 환불 금액, 배송금액 가져오기
    cancelSelectPayPrice: async function(paymentProductNo){
        const cancelSelectPayPrice
            = `SELECT p1.real_payment_amount as payment_price, p1.total_delivery_fee,
                        p2.real_payment_amount as prod_payment_price, p2.delivery_fee
                FROM payment_product p2 JOIN payment p1
                WHERE p1.payment_no = p2.payment_no
                AND p2.payment_product_no = ?`
        return query(cancelSelectPayPrice, paymentProductNo);  

    },
    //결제 부분취소를 위해 업체 합계금액 가져오기
    cancelCompanySum: async function(sellerNo, paymentNo){
        const cancelCompanySum =
            `SELECT SUM(p2.payment_amount) as companyTotalPrice
            FROM payment_product AS p2 LEFT JOIN product AS pd
            ON pd.product_no = p2.product_no
            WHERE pd.user_no = ?
            AND p2.payment_no = ?`;
        
        return query(cancelCompanySum, [sellerNo, paymentNo]);
    },
    


    //결제 부분 취소 (update payment_product)
    cancelSelectPayment: async function(paymentProductNo){
        const cancelSelectPayment = 
             `UPDATE payment_product 
             SET delivery_state = 'C5' 
             WHERE payment_product_no = ?`;
        return query (cancelSelectPayment, paymentProductNo);
     }
};

module.exports = paymentDAO;