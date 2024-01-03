let { pool,query } = require('../../config/dbPool');

// 쿼리문 만들기
let couponDAO = {
    //My쿠폰 가져오기
    selectMyCouponQuery : async function(userNo) {
        const selectMyCouponQuery = 
            `SELECT * FROM my_coupon WHERE user_no = ?`;
            return query(selectMyCouponQuery, userNo);
    }
};

module.exports = couponDAO;