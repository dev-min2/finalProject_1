let {
    pool,
    query
} = require('../../config/dbPool');

// 쿼리문 만들기
let reviewLikeDAO = {
    selectQuery: async function () {},
    selectReviewLikeQuery: async function (pno) {
        `SELECT B.*, A.like_cnt
        FROM (
           SELECT r.review_no, COUNT(rl.review_like_no) AS like_cnt
              FROM review r
              LEFT JOIN review_like rl ON r.review_no = rl.review_no
              GROUP BY r.review_no
           ) AS A
             JOIN review AS B ON A.review_no = B.review_no
             WHERE B.product_no=?`;
        return query(selectReviewLikeQuery,pno)
    },
    selectReviewLikeCntQuery: async function (pno) {
        `SELECT COUNT(*) AS CNT
        FROM review 
        WHERE product_no=?`
        return query(selectReviewLikeCntQuery,pno);
    }
};

module.exports = reviewLikeDAO;