let {
    pool,
    query
} = require('../../config/dbPool');

// 쿼리문 만들기
let reviewLikeDAO = {
    selectQuery: async function () {},
    selectReviewLikeQuery: async function () {
        `SELECT r.review_no, r.content, r.star_cnt, r.review_date, r.review_like_cnt, r.product_no, r.user_no,
            COUNT(rl.review_like_no) AS review_like_cnt
        FROM review r LEFT JOIN review_like rl ON r.review_no = rl.review_no
        GROUP BY r.review_no, r.content, r.star_cnt, r.review_date, r.review_like_cnt, r.product_no, r.user_no`;
        return query(selectReviewLikeQuery)
    },
    selectReviewLikeCntQuery: async function () {

        return query(selectReviewLikeCntQuery);
    }
};

module.exports = reviewLikeDAO;