let { pool,query } = require('../../config/dbPool');

const userDAO = {
    selectUserIdQuery : async function(userId) {
        const selectUserIdQuery = `
            SELECT user_id
                FROM user_tbl
                WHERE user_id = ?
        `;
        return query(selectUserIdQuery, userId);
    },

    insertUserQuery : async function(userObj) {
        const insertUserQuery = `
            INSERT INTO user_tbl SET ?
        `;
        return query(insertUserQuery, userObj);
    },

    selectUserQuery : async function(userId, userPw) {
        const selectUserQuery = `
            SELECT user_no
                FROM user_tbl
                WHERE user_id = ? AND user_pw = ?
        `;

        return query(selectUserQuery, [userId, userPw]);
    }
};

module.exports = userDAO;