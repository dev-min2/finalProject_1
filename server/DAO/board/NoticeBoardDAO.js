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
    selectNoticeBoardListQuery : async function(pageNo,keyword) {
        // 한번에 10개씩 리스트 보여줌
        const pageStartList = (pageNo - 1) * 10;
        const pageEndList = pageNo * 10;

        let selectNoticeBoardQuery = null;
        let inputArray = [];
        if(keyword == '') {
            selectNoticeBoardQuery = `
                SELECT *
                    FROM notice
                    WHERE importance_level = 'J2' OR (importance_level = 'J1' AND current_date() Not Between notice_start_date AND notice_end_date)
                    ORDER BY created_date DESC
                    LIMIT ?, ?
            `;
            inputArray.push(pageStartList);
            inputArray.push(pageEndList);
        }
        else {
            const searchquery = "%" + keyword + "%";
            selectNoticeBoardQuery = `
                SELECT *
                    FROM notice
                    WHERE title like ? AND importance_level = 'J2' OR (importance_level = 'J1' AND current_date() Not Between notice_start_date AND notice_end_date)
                    ORDER BY created_date DESC
                    LIMIT ?, ?
            `;
            inputArray.push(searchquery);
            inputArray.push(pageStartList);
            inputArray.push(pageEndList);
        }
        

        return query(selectNoticeBoardQuery, inputArray);
    },
    selectNoticeBoardCountQuery : async function(keyword) {
        let selectCountQuery = null;
        if(keyword == '') {
            selectCountQuery = `SELECT count(*) AS CNT FROM notice`;
            return query(selectCountQuery);
        }
        else {
            const searchquery = "%" + keyword + "%";
            selectCountQuery = `SELECT count(*) AS CNT FROM notice WHERE title like ?`
            return query(selectCountQuery,searchquery);
        }
    },
    selectNoticeBoardQuery : async function(boardNo) {
        const selectNoticeQuery = `
            SELECT *
                FROM notice
                WHERE notice_board_no = ${boardNo}
        `
        return query(selectNoticeQuery, boardNo);
    },
    selectImportanceNoticeBoardListQuery : async function() {
        const selectQuery = `
            SELECT *
            FROM notice
            WHERE importance_level = 'J1' AND current_date() Between notice_start_date AND notice_end_date
        `
        return query(selectQuery);
    },
    updateNoticeViewCntQuery : async function(boardNo) {
        const updateNoticeViewCntQuery = `
            UPDATE notice SET view_cnt = view_cnt + 1 WHERE notice_board_no = ?
        `
        return query(updateNoticeViewCntQuery, boardNo);
    }
};

module.exports = noticeBoardDAO;