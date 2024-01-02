let { pool,query } = require('../../config/dbPool');

const userDAO = {
    selectUserIdQuery : async function(userId) {
        const selectUserIdQuery = `
            SELECT user_id
                FROM user
                WHERE user_id = ?
        `;
        return query(selectUserIdQuery, userId);
    },

    insertUserQuery : async function(userObj) {
        const insertUserQuery = `
            INSERT INTO user SET ?
        `;
        return query(insertUserQuery, userObj);
    },

    selectUserQuery : async function(userId, userPw) {
        const selectUserQuery = `
            SELECT user_no, user_permission
                FROM user
                WHERE user_id = ? AND user_pw = ?
        `;

        return query(selectUserQuery, [userId, userPw]);
    },
    selectForgotIDQuery : async function(user_name, user_email) {
        const selectForgotIDQuery = `
        SELECT A.user_id, DATE_FORMAT(A.user_joindate, '%Y-%m-%d') as user_joindate
            FROM user AS A
            LEFT JOIN sns_login AS B ON A.user_no = B.user_no
            WHERE B.user_no IS NULL AND A.user_name = ? AND A.user_email = ?
        `;

        return query(selectForgotIDQuery,[user_name, user_email]);
    },
    selectForgotPWQuery : async function(user_id, user_email) {
        const selectForgotPWQuery = `
            SELECT user_no
                FROM user
                WHERE user_id = ? AND user_email = ?
        `;

        return query(selectForgotPWQuery,[user_id, user_email]);
    },
    updateResetPWQuery : async function(user_pw, user_id, user_email) {
        const updateResetPWQuery = `
            UPDATE user SET user_pw = ? WHERE user_id = ? AND user_email = ?
        `;

        return query(updateResetPWQuery,[user_pw,user_id,user_email]);
    },

    selectUserInfoQuery : async function(userNo) {
        const selectUserInfoQuery = `
            SELECT *
                FROM user
                WHERE user_no = ?
        `
        return query(selectUserInfoQuery, userNo);
    },

    updateUserInfoQuery : async function(userObj) {
        const user_no = userObj.user_no;
        delete userObj.user_no;
        const updateUserInfoQuery = `
            UPDATE user SET ? where user_no = ?
        `
        return query(updateUserInfoQuery, [userObj, user_no]);
    },

    //테스트용 지워야함
    insertTestQuery : async function(data) {
        const insertQuery = `
            INSERT INTO productTest SET ?
        `;

        return query(insertQuery, data);
    },

    // 테스트용 지워야함
    selectAllTestQuery : async function() {
        const selectQuery = `
            SELECT *
                FROM productTest
        `
        return query(selectQuery);
    },
};

module.exports = userDAO;