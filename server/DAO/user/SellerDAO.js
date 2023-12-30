let { pool,query } = require('../../config/dbPool');

// 쿼리문 만들기
let sellerDAO = {
    productRegistration : async function() {
        const productRegistration = `
        INSERT INTO product 
        SET ?     
        `;
        return query(productRegistration,productNo)
    }
};

module.exports = sellerDAO;
