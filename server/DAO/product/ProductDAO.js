let { pool,query } = require('../../config/dbPool');

// 쿼리문 만들기
let productDAO = {
    selectQuery : async function() {
        let prQuery = `
            SELECT *
                FROM Product
        `
        
        return query(prQuery);
    }
};

module.exports = productDAO;