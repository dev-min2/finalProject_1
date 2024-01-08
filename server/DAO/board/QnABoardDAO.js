let { pool,query } = require('../../config/dbPool');

// 쿼리문 만들기
let qnaBoardDAO = {
    showQnaQuery : async function(product_no) {
        const showQnaQuery = `
        SELECT *
        FROM qna_board q join user u on q.user_no = u.user_no
        WHERE q.product_no = ?
        `;
        return query(showQnaQuery, product_no);
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
    }

};

module.exports = qnaBoardDAO;