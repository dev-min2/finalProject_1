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
    }
};

module.exports = noticeBoardDAO;