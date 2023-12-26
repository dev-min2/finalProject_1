let { pool,query } = require('../config/dbPool');

// 쿼리문 만들기
let emailAuthDAO = {
    insertQuery : async function(emailAuthInfo) {
        const insertQuery = `INSERT INTO email_auth SET ?`;
        return query(insertQuery, emailAuthInfo);
    },
    selectQuery : async function(email, authcode) {
        const selectQuery = `SELECT * FROM email_auth WHERE email = ? AND authcode = ?`;
        return query(selectQuery, [email,authcode]);
    },
    deleteQuery : async function(email) {
        const deleteQuey = `DELETE FROM email_auth WHERE email = ?`;
        return query(deleteQuey,email);
    }
};

module.exports = emailAuthDAO;