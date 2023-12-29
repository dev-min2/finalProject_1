let { pool,query } = require('../../config/dbPool');

// 쿼리문 만들기
let noticeBoardDAO = {
    selectQuery : async function() {
    },

    insertNoticeBoardQuery : async function(noticeVO) {
        const insertNoticeBoardQuery = `
            INSERT INTO notice SET ?
        `
        return query(insertNoticeBoardQuery, noticeVO);
    },
    deleteNoticeBoardQuery : async function(pkValue) {
        const deleteNoticeBoardQuery = `
            DELETE FROM notice WHERE notice_board_no = ?
        `
        return query(deleteNoticeBoardQuery, pkValue);
    },
    selectNoticeBoardQuery : async function(pageNo) {
        // 한번에 10개씩 리스트 보여줌
        const pageStartList = (pageNo - 1) * 10;
        const pageEndList = pageNo * 10;

        const selectNoticeBoardQuery = `
            SELECT *
                FROM notice
                ORDER BY created_date DESC
                LIMIT ?, ?
        `;

        return query(selectNoticeBoardQuery, [pageStartList, pageEndList]);
    },
    selectNoticeBoardCountQuery : async function() {
        const selectCountQuery = `SELECT count(*) AS CNT FROM notice`;
        return query(selectCountQuery);
    }
};

module.exports = noticeBoardDAO;