let {
    pool,
    query
} = require('../../config/dbPool');

// 쿼리문 만들기
let reviewDAO = {
    //관리자-모든 상품에 대한 리뷰 조회
    getAdminReview : async function(pageNo,showCnt) {
        let startPage = (pageNo - 1) * showCnt;
        let showPage = showCnt;
        const getAdminReview = `
            SELECT B.user_name,C.product_name,A.content,A.review_like_cnt,A.review_no
            FROM review A JOIN user B ON A.user_no = B.user_no  
            JOIN PRODUCT C ON A.product_no=C.product_no
            LIMIT ${startPage},${showPage}
            `;
        return query(getAdminReview)
    },
    //관리자-리뷰CNT
    adminReviewCnt : async function() {
        const adminReviewCnt = `
            SELECT count(*) AS CNT
                FROM review AS A
                JOIN product AS B ON A.product_no = B.product_no
                JOIN product C ON C.product_no = B.product_no
        `;
        return query(adminReviewCnt);
    },
    //관리자-리뷰삭제
    deleteAdminReview: async function (reviewNo) {
        const deleteAdminReview =
            `
            DELETE FROM review WHERE review_no = ?
            `;
        return query(deleteAdminReview, reviewNo);
    },

    //판매자-내 상품 리뷰 조회
    getSellerReview : async function(userNo,pageNo,showCnt) {
        let startPage = (pageNo - 1) * showCnt;
        let showPage = showCnt;
        const getSellerReview = `
            SELECT B.user_name,C.product_name,A.content,A.review_like_cnt,A.review_no
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


    },
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
    //리뷰등록
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
    },
    // 리뷰 수정
    updateReviewBoardQuery: async function (reviewVO, reviewNo) {
        const updateReviewBoardQuery =
            `UPDATE review SET ? WHERE review_no= ${reviewNo}`;
        return query(updateReviewBoardQuery, reviewVO);
    },
    //리뷰삭제
    deleteReviewBoardQuery: async function (reviewNo) {
        const deleteReviewBoardQuery =
            `DELETE FROM review WHERE review_no=?`;
        return query(deleteReviewBoardQuery, reviewNo);
    }
};

module.exports = reviewDAO;