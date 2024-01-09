let {
    pool,
    query
} = require('../../config/dbPool');

// 쿼리문 만들기


let reviewLikeDAO = {
    selectQuery: async function () {},
    //상세에서 리뷰 리스트불러오기
    selectReviewLikeQuery: async function (userNo, pno, pageno) {
        if (typeof userNo == "undefined") {
            userNo = null
        }
        const startReviewPage = (pageno - 1) * 5;
        const endReviewPage = 5;
        const selectReviewLikeQuery =
            `SELECT 
             A.*, B.user_name,A.review_like_cnt, IF(C.user_no IS NULL, false, true) AS like_click
          FROM review AS A
          JOIN user AS B ON A.user_no = B.user_no
          LEFT JOIN review_like AS C ON A.review_no = C.review_no AND C.user_no =?
          WHERE A.product_no =? order by A.review_date desc limit ?,?`;
        return query(selectReviewLikeQuery, [userNo, pno, startReviewPage, endReviewPage])
    },
    //리뷰 페이징 cnt쿼리
    selectReviewLikeCntQuery: async function (pno) {

        const selectReviewLikeCntQuery =
            `SELECT COUNT(*) AS cnt
        FROM review 
        WHERE product_no=?`;
        return query(selectReviewLikeCntQuery, pno);
    },
    selectReviewLikeUserNoQuery: async function (reviewNoArray, userNo) {
        let array = [];
        for (let i = 0; i < reviewNoArray.length; ++i) {
            array.push(reviewNoArray[i].review_no);
        }
        let reviewNoStr = '';
        for (let i = 0; i < array.length; ++i) {
            if (array.length - 1 == i) {
                reviewNoStr += '?)'
            } else {
                reviewNoStr += '?,'
            }
        }
        const myQuery = `
            SELECT *
	            FROM review_like
                WHERE user_no = ? AND review_no IN(${reviewNoStr}
        `
        return query(myQuery, [userNo, ...array]);
    },
    updateAddReviewLikeCntQuery: async function (rno) {
        const updateAddReviewLikeCntQuery =
            `update review set review_like_cnt = review_like_cnt + 1 where review_no =?`;
        return query(updateAddReviewLikeCntQuery, rno)
    },
    insertAddReviewLikeCntQuery: async function (rno, user_no) {
        const insertAddReviewLikeCntQuery =
            `insert into review_like SET review_no = ?, user_no =?`;
        return query(insertAddReviewLikeCntQuery, [rno, user_no])
    },
    updateMinusReviewLikeCntQuery: async function (rno) {
        const updateMinusReviewLikeCntQuery = 
        `update review set review_like_cnt = review_like_cnt - 1 where review_no =?`;
        return query(updateMinusReviewLikeCntQuery, rno)
    },
    deleteMinusReviewLikeCntQuery: async function (rno, user_no) {
        const deleteMinusReviewLikeCntQuery = 
        `delete from review_like WHERE review_no = ? AND user_no = ?`;
        return query(deleteMinusReviewLikeCntQuery,[rno, user_no]);
    },

};

module.exports = reviewLikeDAO;