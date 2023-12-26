let {
    pool,
    query
} = require('../../config/dbPool');

// 쿼리문 만들기
let productDAO = {
    //판매자- 판매상품 순위 내역
    selectQuery: async function (userNo) {
        const myProductRank = `
        SELECT A.product_no,A.product_name,A.product_price,A.product_stock,B.buy_cnt,(B.real_payment_amount * B.buy_cnt) as 'AllAmount'
        FROM product AS A
        join payment_product AS B ON A.product_no = B.product_no
        WHERE A.user_no = ?   
        order by 'allamount'   
        `

        return query(myProductRank,userNo);
    }
};

module.exports = productDAO;