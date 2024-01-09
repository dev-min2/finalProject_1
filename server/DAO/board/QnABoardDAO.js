let { pool,query } = require('../../config/dbPool');

// 쿼리문 만들기
let qnaBoardDAO = {
    showQnaQuery : async function(product_no, pageNo) {
        const pageStartList = (pageNo - 1) * 5;
        const endPageList = 5;
        const showQnaQuery = `
        SELECT *
        FROM qna_board q join user u on q.user_no = u.user_no
        WHERE q.product_no = ?
        LIMIT ?, ?
        `;
        return query(showQnaQuery, [product_no, pageStartList, endPageList]);
    },
    selectQnaCountQuery: async function () {
        const countQuery = `
        SELECT count(*) as CNT
        FROM qna_board
        `  ;
        return query(countQuery);
    },
    addQnaQuery: async function (qna_category, title, board_public, content, product_no, user_no) {
        const addQnaQuery = `
        INSERT INTO qna_board
        SET qna_state = 'K1' , qna_category = ?, title = ?, board_public = ? , content = ?, product_no = ?, user_no = ?, created_date = current_date()
        `;
        return query(addQnaQuery, [qna_category, title, board_public, content, product_no, user_no]);
    },
    showDetailQnaQuery: async function (qno) {
        const showDetailQnaQuery = `
        SELECT *
        FROM qna_board
        WHERE qna_board_no = ?
        `;
        return query(showDetailQnaQuery, qno);
    },
    modQnaQuery: async function (qna_category, title, board_public, content, qna_board_no) {
        const modQnaQuery = `
        UPDATE qna_board
        SET qna_category = ?, title = ?, board_public = ? , content = ?
        WHERE qna_board_no = ?
        `;
        return query(modQnaQuery, [qna_category, title, board_public, content, qna_board_no]);
    },
    delQnaQuery: async function (qna_board_no) {
        const delQnaQuery = `
        DELETE FROM qna_board
        WHERE qna_board_no = ?
        `;
        return query(delQnaQuery, qna_board_no);
    },
    addReQnaQuery: async function (qna_admin_reply,qna_board_no) {
        const addReQnaQuery = `
        UPDATE qna_board
        SET qna_state = 'K2', qna_admin_reply = ?
        WHERE qna_board_no = ? 

        `;
        return query(addReQnaQuery, [qna_admin_reply, qna_board_no]);
    },
    myQnaQuery: async function (user_no) {
        const myQnaQuery = `
        SELECT *
        FROM qna_board
        WHERE user_no = ?
        `;
        return query(myQnaQuery, user_no);
    },
    allQnaQuery: async function (pageNo) {
        const pageStartList = (pageNo - 1) * 10;
        const endPageList = 10;
        const allQnaQuery = `
        SELECT *
        FROM qna_board
        LIMIT ?, ?
        `;
        return query(allQnaQuery, [pageStartList, endPageList]);
    }
    

};

module.exports = qnaBoardDAO;