let { pool,query } = require('../../config/dbPool');

// 쿼리문 만들기

//판매자 배송현황
let deliveryDAO = {
    sellerDelivery : async function(userNo) {
        const sellerDelivery = `
        SELECT A.payment_no,C.user_name,C.user_addr,D.product_name,A.buy_cnt,B.payment_date,A.delivery_state
        FROM payment_product A JOIN payment B ON A.payment_no = B.payment_no
        JOIN USER C ON B.user_no = C.user_no
        Join product D ON D.product_no = A.product_no
        where D.user_no = ?
        `;
        return query(sellerDelivery,userNo)
    },
    

//판매자 배송현황-회원이름으로 검색
    sellerDeliverySearchUserName : async function(search) {
        const searchQuery = "%"+search+"%"
        const sellerDeliverySearchUserName = `
        SELECT A.payment_no,C.user_name,C.user_addr,D.product_name,A.buy_cnt,B.payment_date,A.delivery_state
        FROM payment_product A JOIN payment B ON A.payment_no = B.payment_no
        JOIN USER C ON B.user_no = C.user_no
        Join product D ON D.product_no = A.product_no
        where C.user_name LIKE ?
        `;
        return query(sellerDeliverySearchUserName,searchQuery)
        
 }
};



module.exports = deliveryDAO;