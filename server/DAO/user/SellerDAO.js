let { pool,query } = require('../../config/dbPool');

// 쿼리문 
let sellerDAO = {
    //판매자 본인 상품조회
    getMyProductList : async function(userNo) {
        const getMyProductList = `
        select  product_no, product_name, product_price, product_public_state, product_registdate,pet_type
        FROM product
        WHERE user_no = ?   
        `;
        return query(getMyProductList,userNo)
    },

    // 판매자 상품등록
    productRegistration : async function() {
        const productRegistration = `
        INSERT INTO product 
        SET ?     
        `;
        return query(productRegistration,productNo)
    }
};

module.exports = sellerDAO;
