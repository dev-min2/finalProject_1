let { pool,query } = require('../../config/dbPool');

// 쿼리문 만들기
let reviewDAO = {
    //내 리뷰정보 전체 가져오기
    selectReviewListQuery : async function(userNo, productNo) {
        const selectReviewListQuery = 
        `select * from review where user_no=? and product_no=?`;
        return query(selectReviewListQuery, [userNo, productNo]);
    }
};

module.exports = reviewDAO;