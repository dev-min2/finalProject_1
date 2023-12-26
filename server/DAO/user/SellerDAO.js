let { pool,query } = require('../../config/dbPool');

// 쿼리문 만들기
let sellerDAO = {
    productRank : async function() {
        const productRank = `
        SELECT 
        
        `;
        return query(productRank,productNo)
    }
};

module.exports = sellerDAO;
