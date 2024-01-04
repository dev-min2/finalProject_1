let {
    pool,
    query
} = require('../../config/dbPool');

// 쿼리문 만들기
let reviewDAO = {
    //내 리뷰정보 전체 가져오기
    selectReviewListQuery: async function (userNo, pageNo) {
        const startpageList = (pageNo - 1) * 10;
        const endpageList = 10;
        const selectReviewListQuery =
            `SELECT r.review_no, p.payment_no, a.product_no, a.product_name, a.product_price, b.buy_cnt, p.payment_date
        FROM user u
        JOIN review r ON u.user_no = r.user_no
        JOIN payment p ON u.user_no = p.user_no
        JOIN product a ON a.product_no = r.product_no
        LEFT JOIN payment_product b ON a.product_no = b.product_no
        WHERE u.user_no =?
        order by p.payment_date desc limit ?,?`;
        return query(selectReviewListQuery, [userNo, startpageList, endpageList]);
    },
    selectReviewCntQuery: async function (userNo) {
        const selectReviewCntQuery =
            `select count(*) as cnt from review where user_no=?`;
        return query(selectReviewCntQuery, userNo);
    },
    insertReviewQuery: async function (reviewVO) {
        const insertReviewQuery =
            `INSERT INTO review SET ?`;
        return query(insertReviewQuery, reviewVO);
    },
    //리뷰 단건조회
    selectReviewBoardQuery: async function (reviewNo) {
        const selectReviewBoardQuery =
            `select * from review
            where review_no=${reviewNo}`;
        return query(selectReviewBoardQuery, reviewNo);
    }


};

module.exports = reviewDAO;