let { pool,query } = require('../../config/dbPool');

// 쿼리문 만들기
let freeBoardDAO = {
    selectFreeBoardListQuery : async function(pageNo, keyword) {
        //10개씩 출력하기
        console.log('넘겨받기');
        console.log(pageNo, keyword)
        const pageStartList = (pageNo - 1) * 10;

        let selectFreeBoardQuery = null;
     
        let inputArray = [];
        if(keyword == '') {
            selectFreeBoardQuery = `
            SELECT u.user_name,
                    f.free_board_no, f.user_no, f.title, f.content, f.view_cnt, f.created_date
                FROM free_board f
                JOIN user u
                WHERE u.user_no = f.user_no
                ORDER BY created_date DESC
                LIMIT ?,?
            `;
            inputArray.push(pageStartList);
            inputArray.push(10);
        }
        else {
            const searchquery = "%" + keyword + "%";
            selectFreeBoardQuery = `
                SELECT u.user_name,
                        f.free_board_no, f.user_no, f.title, f.content, f.view_cnt, f.created_date
                    FROM free_board f
                    JOIN user u
                    WHERE u.user_no = f.user_no
                    AND title like ? 
                    ORDER BY created_date DESC
                    LIMIT ?,?
                `;
            inputArray.push(searchquery);
            inputArray.push(pageStartList);
            inputArray.push(10);
        }

        return query(selectFreeBoardQuery, inputArray);
    },
    selectFreeBoardCountQuery : async function(keyword) {
        let selectCountQuery = null;
        if(keyword == '') {
            selectCountQuery = `SELECT count(*) AS CNT FROM free_board`;
            return query(selectCountQuery);
        }
        else {
            const searchquery = "%" + keyword + "%";
            selectCountQuery = `SELECT count(*) AS CNT FROM free_board WHERE title like ?`
            return query(selectCountQuery,searchquery);
        }
    },
    selectFreeBoardQuery : async function(boardNo) {
        const selectFreeQuery = `
        SELECT  u.user_name, 
                f.free_board_no, f.user_no, f.title, f.content, f.view_cnt, f.created_date
            FROM free_board f
            JOIN user u
            WHERE  u.user_no = f.user_no
            AND free_board_no = ${boardNo}
        `
        return query(selectFreeQuery, boardNo);
    },
    selectFreeBoardReplyQuery : async function(boardNo) {
        const selectFreeBoardReplyQuery = `
        SELECT A.free_reply_no as parent_reply_no,A.comment as parent_comment, A.reply_date as parent_reply_date, A.user_no AS parent_user_no, C.user_name AS parent_user_name, A.delete_date AS parent_delete_date,
        B.free_reply_no as child_reply_no, B.comment as child_comment, B.free_reply_pno, B.reply_date as child_reply_date, B.user_no AS child_user_no, (SELECT user_name FROM user WHERE user_no = child_user_no) AS child_name, B.delete_date AS child_delete_date
            FROM free_reply AS A
            LEFT JOIN free_reply AS B ON A.free_reply_no = B.free_reply_pno
            JOIN user AS C ON A.user_no = C.user_no
            WHERE A.free_board_no = ? AND A.free_reply_pno IS NULL
            ORDER BY A.reply_date asc, child_reply_date asc
        `
        return query(selectFreeBoardReplyQuery, boardNo);
    },
    selectFreeBoardReplyCountQuery : async function(boardNo) {
        const selectFreeBoardReplyCountQuery = `
            SELECT count(*) AS CNT
                FROM free_reply
                WHERE free_board_no = ?
        `
        return query(selectFreeBoardReplyCountQuery, boardNo);
    },
    updateFreeViewCntQuery : async function(boardNo) {
        const updateFreeViewCntQuery = `
            UPDATE free_board SET view_cnt = view_cnt + 1 WHERE free_board_no = ?
        `
        return query(updateFreeViewCntQuery, boardNo);
    },
    
    //등록, 수정, 삭제
    insertFreeBoardQuery : async function(freeVO) {
        const insertFreeBoardQuery = `
            INSERT INTO free_board SET ?
        `
        return query(insertFreeBoardQuery, freeVO);
    },
    updateFreeBoardQuery : async function(freeVO, boardNo) {
        const updateFreeBoardQuery = `
            UPDATE free_board SET ? WHERE free_board_no = ?
        `
        return query(updateFreeBoardQuery, [freeVO, boardNo]);
    },
    deleteFreeBoardQuery : async function(pkValue) {
        const deleteFreeBoardQuery = `
            DELETE FROM free_board WHERE free_board_no = ?
        `
        return query(deleteFreeBoardQuery, pkValue);
    },



    //덧글기능
    selectFreeBoardReplyQuery : async function(boardNo) {
        const selectFreeBoardReplyQuery = `
        SELECT A.free_reply_no as parent_reply_no,A.comment as parent_comment, A.reply_date as parent_reply_date, A.user_no AS parent_user_no, C.user_name AS parent_user_name, A.delete_date AS parent_delete_date,
        B.free_reply_no as child_reply_no, B.comment as child_comment, B.free_reply_pno, B.reply_date as child_reply_date, B.user_no AS child_user_no, (SELECT user_name FROM user WHERE user_no = child_user_no) AS child_name, B.delete_date AS child_delete_date
            FROM free_reply AS A
            LEFT JOIN free_reply AS B ON A.free_reply_no = B.free_reply_pno
            JOIN user AS C ON A.user_no = C.user_no
            WHERE A.free_board_no = ? AND A.free_reply_pno IS NULL
            ORDER BY A.reply_date asc, child_reply_date asc
        `
        return query(selectFreeBoardReplyQuery, boardNo);
    },
    selectFreeBoardReplyCountQuery : async function(boardNo) {
        const selectFreeBoardReplyCountQuery = `
            SELECT count(*) AS CNT
                FROM free_reply
                WHERE free_board_no = ?
        `
        return query(selectFreeBoardReplyCountQuery, boardNo);
    },


    insertFreeReplyQuery : async function(obj) {
        const insertFreeReplyQuery = `
            INSERT INTO free_reply SET ? 
        `
        return query(insertFreeReplyQuery,obj);
    },
    deletFreeReplyQuery : async function(replyNo) {
        const deletFreeReplyQuery = `
            UPDATE free_reply SET delete_date = current_date() where free_reply_no = ${replyNo}
        `
        return query(deletFreeReplyQuery);
    },
    updateFreeReplyQuery : async function(replyContent, replyNo) {
        const updateFreeReplyQuery = `
            UPDATE free_reply SET comment = ? WHERE free_reply_no = ${replyNo}
        `;
        return query(updateFreeReplyQuery, replyContent);
    }

};

module.exports = freeBoardDAO;