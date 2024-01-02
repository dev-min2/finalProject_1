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
    updateNoticeBoardQuery : async function(noticeVO, boardNo) {
        const updateNoticeBoardQuery = `
            UPDATE notice SET ? WHERE notice_board_no = ?
        `
        return query(updateNoticeBoardQuery, [noticeVO, boardNo]);
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
                    WHERE title like ? AND (importance_level = 'J2' OR (importance_level = 'J1' AND current_date() Not Between notice_start_date AND notice_end_date))
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
    selectNoticeBoardReplyQuery : async function(boardNo) {
        const selectNoticeBoardReplyQuery = `
        SELECT A.notice_reply_no as parent_reply_no,A.comment as parent_comment, A.reply_date as parent_reply_date, A.user_no AS parent_user_no, C.user_name AS parent_user_name, 
                B.notice_reply_no as child_reply_no, B.comment as child_comment, B.notice_reply_pno, B.reply_date as child_reply_date, B.user_no AS child_user_no, (SELECT user_name FROM user WHERE user_no = child_user_no) AS child_name
            FROM notice_reply AS A
            LEFT JOIN notice_reply AS B ON A.notice_reply_no = B.notice_reply_pno
            JOIN user AS C ON A.user_no = C.user_no
            WHERE A.notice_board_no = ? AND A.notice_reply_pno IS NULL
            ORDER BY A.reply_date asc, child_reply_date asc
        `
        return query(selectNoticeBoardReplyQuery, boardNo);
    },
    selectNoticeBoardReplyCountQuery : async function(boardNo) {
        const selectNoticeBoardReplyCountQuery = `
            SELECT count(*) AS CNT
                FROM notice_reply
                WHERE notice_board_no = ?
        `
        return query(selectNoticeBoardReplyCountQuery, boardNo);
    },
    selectImportanceNoticeBoardListQuery : async function() {
        const selectQuery = `
            SELECT *
            FROM notice
            WHERE importance_level = 'J1' AND current_date() Between notice_start_date AND notice_end_date
            ORDER BY created_date DESC
        `
        return query(selectQuery);
    },
    updateNoticeViewCntQuery : async function(boardNo) {
        const updateNoticeViewCntQuery = `
            UPDATE notice SET view_cnt = view_cnt + 1 WHERE notice_board_no = ?
        `
        return query(updateNoticeViewCntQuery, boardNo);
    },
    insertNoticeReplyQuery : async function(obj) {
        const insertNoticeReplyQuery = `
            INSERT INTO notice_reply SET ? 
        `
        return query(insertNoticeReplyQuery,obj);
    }
};

module.exports = noticeBoardDAO;