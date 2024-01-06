let { pool,query } = require('../../config/dbPool');

// 쿼리문 만들기

//판매자 배송현황
let deliveryDAO = {
    sellerDelivery : async function(userNo,pageNo,showCnt) {
        let startPage = (pageNo - 1) * showCnt;
        let showPage = showCnt;
        const sellerDelivery = `
        SELECT A.payment_no,A.payment_product_no, C.user_name,B.receiver_addr,D.product_name,A.buy_cnt,B.payment_date,A.delivery_number,A.delivery_state
        FROM payment_product A JOIN payment B ON A.payment_no = B.payment_no
        JOIN USER C ON B.user_no = C.user_no
        Join product D ON D.product_no = A.product_no
        where D.user_no = ?
        LIMIT ${startPage},${showPage}
        `;
        return query(sellerDelivery,userNo)
    },

    sellerDeliveryCnt : async function(userNo) {
        const sellerDeliveryCnt = `
            SELECT count(*) AS CNT
                FROM user AS A
                JOIN product AS B ON A.user_no = B.user_no
                JOIN payment_product C ON C.product_no = B.product_no
                WHERE A.user_no = ${userNo}
        `;
        return query(sellerDeliveryCnt);
    },
    

//판매자 배송현황-회원이름으로 검색
    sellerDeliverySearchUserName : async function(search) {
        const searchQuery = "%"+search+"%"
        const sellerDeliverySearchUserName = `
        SELECT A.payment_no,A.payment_product_no, C.user_name,B.receiver_addr,D.product_name,A.buy_cnt,B.payment_date,A.delivery_number,A.delivery_state
        FROM payment_product A JOIN payment B ON A.payment_no = B.payment_no
        JOIN USER C ON B.user_no = C.user_no
        Join product D ON D.product_no = A.product_no
        where C.user_name LIKE ?
        `;
        return query(sellerDeliverySearchUserName,searchQuery)        
 },

 //판매자 배송현황-배송상태변경-주소 업데이트
    //  sellerDeliveryAddrUpdate : async function(addr,paymentNo) {
    //     const sellerDeliveryAddrUpdate = `
    //         UPDATE payment
    //         set receiver_addr= ?
    //         where payment_no = ?    
    //     `;
    //     return query(sellerDeliveryAddrUpdate,[addr,paymentNo])        
    // },
    //판매자 배송현황-배송상태변경-운송장 업데이트
    sellerDeliveryNumberUpdate : async function(deliveryNumber,paymentProductNo) {
        const sellerDeliveryNumberUpdate = `
            UPDATE payment_product
            set delivery_number = ?,delivery_state = 'C3', delivery_updatedate = DATE_ADD(sysdate(), INTERVAL 3 DAY)
            where payment_product_no = ?   
        `;
        return query(sellerDeliveryNumberUpdate,[deliveryNumber,paymentProductNo])        
    },

    //C1상태일때 
    DeliveryStateC1 : async function(paymentProductNo,delivery_state) {
        const DeliveryStateC1 = `
        SELECT A.payment_no, A.payment_product_no, C.user_name,B.receiver_addr,D.product_name,A.buy_cnt,B.payment_date,A.delivery_number,A.delivery_state,A.delivery_updatedate
        FROM payment_product A JOIN payment B ON A.payment_no = B.payment_no
        JOIN USER C ON B.user_no = C.user_no
        Join product D ON D.product_no = A.product_no
        where payment_product_no = ?  AND delivery_state = ?
        `;
        return query(DeliveryStateC1,[paymentProductNo,delivery_state])        
    },
    //C2로 바꾸기
    DeliveryStateChangeC2 : async function(paymentProductNo) {
        const DeliveryStateChangeC2 = `
        UPDATE payment_product 
        SET delivery_state = 'C2'
        where payment_product_no = ? 
        `;
        return query(DeliveryStateChangeC2,paymentProductNo)        
    },
};



module.exports = deliveryDAO;