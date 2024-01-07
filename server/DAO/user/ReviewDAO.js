let { pool,query } = require('../../config/dbPool');

// 쿼리문 만들기
let reviewDAO = {
    //판매자-내 상품 리뷰 조회
    getSellerReview : async function(userNo,pageNo,showCnt) {
        let startPage = (pageNo - 1) * showCnt;
        let showPage = showCnt;
        const getSellerReview = `
        SELECT B.user_name,C.product_name,A.content,A.review_like_cnt
        FROM review A JOIN user B ON A.user_no = B.user_no  
        JOIN PRODUCT C ON A.product_no=C.product_no
        WHERE A.USER_NO = ?
        LIMIT ${startPage},${showPage}
        `;
        return query(getSellerReview,userNo)
    },

    sellerReviewCnt : async function(userNo) {
        const sellerReviewCnt = `
            SELECT count(*) AS CNT
                FROM review AS A
                JOIN product AS B ON A.product_no = B.product_no
                JOIN product C ON C.product_no = B.product_no
                WHERE B.user_no = ${userNo}
        `;
        return query(sellerReviewCnt);
    },

    //판매자 - 내 리뷰 삭제
    removeSellerReview : async function(reviewNo){
        const removeSellerReview = `
        DELETE review 
        from review
        where review_no = ?
        `;
        return query(removeSellerReview,reviewNo)
    },

    //판매자 - 내 리뷰 검색
    searchSellerReview : async function(){
        const searchSellerReview=`
        SELECT B.user_name,C.product_name,A.content,A.review_like_cnt
        FROM review A JOIN user B ON A.user_no = B.user_no  
        JOIN PRODUCT C ON A.product_no=C.product_no
        WHERE A.USER_NO = ? AND A.content LIKE ?
        `;
        return query(searchSellerReview)
    }
};

module.exports = reviewDAO;