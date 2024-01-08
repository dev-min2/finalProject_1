let {
    pool,
    query
} = require('../../config/dbPool');

// 쿼리문 만들기
let reviewLikeDAO = {
    selectQuery: async function () {},
    //상세에서 리뷰 리스트불러오기
    selectReviewLikeQuery: async function (pno,pageno) {
        const startReviewPage = (pageno -1) * 5;
        const endReviewPage = 5;
        const selectReviewLikeQuery = 
        `SELECT B.*, c.user_name, A.like_cnt
        FROM (
           SELECT r.review_no, COUNT(rl.review_like_no) AS like_cnt
              FROM review r
              LEFT JOIN review_like rl ON r.review_no = rl.review_no
              GROUP BY r.review_no
           ) AS A
             JOIN review AS B ON A.review_no = B.review_no
             Join USER AS C ON B.user_no = c.user_no
             WHERE B.product_no=? order by B.review_date desc limit ?,?`;
        return query(selectReviewLikeQuery,[pno, startReviewPage, endReviewPage])
    },
    //리뷰 페이징 cnt쿼리
    selectReviewLikeCntQuery: async function (pno) {
        
        const selectReviewLikeCntQuery =
        `SELECT COUNT(*) AS cnt
        FROM review 
        WHERE product_no=?`;
        return query(selectReviewLikeCntQuery,pno);
    },
    selectReviewLikeUserNoQuery : async function(reviewNoArray, userNo) {
        let array = [];
        for(let i = 0; i < reviewNoArray.length; ++i) {
            array.push(reviewNoArray[i].review_no);
        }
        let reviewNoStr = '';
        for(let i = 0; i < array.length; ++i) {
            if(array.length - 1 == i) {
                reviewNoStr += '?)'
            }
            else {
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
    updateAddReviewLikeCntQuery : async function(rno){
        const updateAddReviewLikeCntQuery = 
        `update review set review_like_cnt = review_like_cnt + 1 where review_no =?`;
        return query(updateAddReviewLikeCntQuery, rno)
    },
    insertAddReviewLikeCntQuery : async function(rno, user_no){
        const insertAddReviewLikeCntQuery = 
        `insert into review_like SET review_no = ?, user_no =?`;
        return query(insertAddReviewLikeCntQuery, [rno, user_no])
    },
    updateMinusReviewLikeCntQuery : async function(){
        
    },
    deleteMinusReviewLikeCntQuery : async function(){

    },

};

module.exports = reviewLikeDAO;