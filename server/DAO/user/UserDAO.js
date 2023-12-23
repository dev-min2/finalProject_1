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