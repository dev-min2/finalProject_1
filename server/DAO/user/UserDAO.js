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
            SELECT user_no
                FROM user
                WHERE user_id = ? AND user_pw = ?
        `;

        return query(selectUserQuery, [userId, userPw]);
    },
    selectForgotIDQuery : async function(user_name, user_email) {
        const selectForgotIDQuery = `
            SELECT user_id,DATE_FORMAT(user_joindate, '%Y-%m-%d') as user_joindate
                FROM user
                WHERE user_name = ? AND user_email = ?
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
        console.log(user_pw);
        const updateResetPWQuery = `
            UPDATE user SET user_pw = ? WHERE user_id = ? AND user_email = ?
        `;

        return query(updateResetPWQuery,[user_pw,user_id,user_email]);
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