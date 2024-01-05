let { pool,query } = require('../../config/dbPool');

// 쿼리문 만들기
let couponDAO = {
    //My쿠폰 가져오기
    selectMyCouponQuery : async function(userNo) {
        const selectMyCouponQuery = 
            `SELECT m.my_coupon_no, c.coupon_name, c.discount_pct, m.coupon_state, m.receive_date , ADDDATE(m.receive_date, interval +c.expire_date DAY) as expire_date
            FROM coupon c LEFT JOIN my_coupon m
            ON c.coupon_no = m.coupon_no
            WHERE m.user_no = ?`;
            return query(selectMyCouponQuery, userNo);
    },
    deleteMyCouponQuery : async function(couponNo){
        const deleteMyCouponQuery = 
        `DELETE FROM my_coupon WHERE my_coupon_no =?`;
        return query(deleteMyCouponQuery,couponNo);
    }
};

module.exports = couponDAO;