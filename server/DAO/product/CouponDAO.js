let { pool,query } = require('../../config/dbPool');

// 쿼리문 만들기
let couponDAO = {
    /////////////////////////////////////////////////////////
    ///////관리자쿠폰/////////////////////////////////////////

    //쿠폰 정보 조회
    getAdminCouponInfo : async function(pageNo) {
        let startPage = (pageNo - 1) * 10;
        let endPage = 10;
        const getCouponInfo = 
            `SELECT coupon_no,coupon_name,discount_pct,expire_date
            FROM coupon
            LIMIT ?,?`
            return query(getCouponInfo,[startPage,endPage]);
    },

    //쿠폰정보 조회 CNT
    getAdminCouponInfoCnt : async function() {
        const getCouponInfoCnt = 
            ` SELECT count(*) as CNT
            FROM coupon`;
            return query(getCouponInfoCnt);
    },

    //쿠폰정보 생성
    createAdminCouponInfo : async function(couponInfo) {
        const createAdminCouponInfo = 
            ` INSERT INTO COUPON SET ?`;
            return query(createAdminCouponInfo,couponInfo);
    },

      //관리자-쿠폰 지급
      giveAdminCoupon : async function(giveCouponInfo){
        const giveAdminCoupon = `
        insert into my_coupon set ?
        `;
        return query(giveAdminCoupon,giveCouponInfo)
      },

    //My쿠폰 가져오기
    selectMyCouponQuery : async function(userNo,pageNo) {
        let startPage = (pageNo - 1) * 10;
        let endPage = 10;
        const selectMyCouponQuery = 
            `SELECT m.my_coupon_no, c.coupon_name, c.discount_pct, m.coupon_state, m.receive_date , ADDDATE(m.receive_date, interval +c.expire_date DAY) as expire_date, payment_no,payment_date
            FROM coupon c LEFT JOIN my_coupon m
            ON c.coupon_no = m.coupon_no
            LEFT JOIN payment p ON p.my_coupon_no = m.my_coupon_no
            WHERE m.coupon_state IN ('B1','B2')
            AND m.user_no = ?
            LIMIT ?,?`;
            return query(selectMyCouponQuery, [userNo,startPage,endPage]);
    },

    selectMyCouponQueryCnt : async function(userNo) {
        const selectMyCouponQuery = 
            `SELECT count(*) AS CNT
            FROM coupon c LEFT JOIN my_coupon m
            ON c.coupon_no = m.coupon_no
            WHERE m.coupon_state IN ('B1','B2')
            AND m.user_no = ${userNo}`;
            return query(selectMyCouponQuery);
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