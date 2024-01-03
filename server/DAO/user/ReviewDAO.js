let { pool,query } = require('../../config/dbPool');

// 쿼리문 만들기
let reviewDAO = {
    //내 리뷰정보 전체 가져오기
    selectReviewListQuery : async function(userNo, pageno) {
        const startpageList = (pageno -1) * 10;
        const endpageList = 10;
        const selectReviewListQuery = 
        `SELECT p.payment_no, a.product_name, a.product_price, b.buy_cnt, p.payment_date
        FROM user u
        JOIN review r ON u.user_no = r.user_no
        JOIN payment p ON u.user_no = p.user_no
        JOIN product a ON a.product_no = r.product_no
        JOIN payment_product b ON a.product_no = b.product_no
        WHERE u.user_no =?
        order by p.payment_date desc limit ?,?`;
        return query(selectReviewListQuery, [userNo, startpageList, endpageList]);
    },
    selectReviewCntQuery : async function(userNo, productNo){
        const selectReviewCntQuery = 
        `select count(*) as cnt from review where user_no=? and product_no=?`;
        return query(selectReviewCntQuery,[userNo, productNo]);
    }
};

module.exports = reviewDAO;