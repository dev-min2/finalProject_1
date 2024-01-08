let { pool,query } = require('../../config/dbPool');

// 쿼리문 만들기
let couponDAO = {
    //My쿠폰 가져오기
    selectMyCouponQuery : async function(userNo) {
        const selectMyCouponQuery = 
            `SELECT m.my_coupon_no, c.coupon_name, c.discount_pct, m.coupon_state, m.receive_date , ADDDATE(m.receive_date, interval +c.expire_date DAY) as expire_date
            FROM coupon c LEFT JOIN my_coupon m
            ON c.coupon_no = m.coupon_no
            WHERE m.coupon_state = 'B1'
            AND m.user_no = ?`;
            return query(selectMyCouponQuery, userNo);
    },
    //쿠폰 사용 후 삭제
    updateMyCouponQuery : async function(couponNo, conn = null){
        const updateMyCouponQuery = 
            `UPDATE my_coupon SET coupon_state = 'B2' WHERE my_coupon_no =?`;
        if (conn != null){
            return conn.query(updateMyCouponQuery, couponNo);
        }
        return query(updateMyCouponQuery, couponNo);
    }
};

module.exports = couponDAO;