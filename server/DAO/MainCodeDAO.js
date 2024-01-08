let { pool,query } = require('../config/dbPool');

// 쿼리문 만들기
let mainCodeDAO = {
    selectQuery : async function(mainCodeName) {
        const selectQuery = `
        SELECT b.sub_code, b.sub_code_name
            FROM main_code_tbl AS A
            JOIN sub_code_tbl AS B ON A.main_code = B.main_code
            WHERE A.main_code_name = ?
        `;
        return query(selectQuery, mainCodeName);
    },
    selectSubcodeQuery : async function() {
        const selectSubcodeQuery = `
            SELECT sub_code, sub_code_name
            FROM sub_code_tbl
        `;
        return query(selectSubcodeQuery);
    }
};

module.exports = mainCodeDAO;