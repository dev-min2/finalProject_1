let { pool,query } = require('../config/dbPool');

// 쿼리문 만들기
let snsLoginDAO = {
    insertQuery : async function(snsObj) {
        const insertQuery = `
            INSERT INTO sns_login SET ?
        `;
        return query(insertQuery, snsObj);
    }
};

module.exports = snsLoginDAO;