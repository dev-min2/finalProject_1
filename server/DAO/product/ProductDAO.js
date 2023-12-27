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
        order by buy_cnt desc  
        `

        return query(myProductRank,userNo);
    },
    //판매자- 판매액 순위
    selectQuery2: async function (userNo) {
        const myProductPayRank = `
        SELECT A.product_no,A.product_name,A.product_price,A.product_stock,B.buy_cnt,(B.real_payment_amount * B.buy_cnt) as 'allamount'
        FROM product AS A
        join payment_product AS B ON A.product_no = B.product_no
        WHERE A.user_no = 1
        order by allamount desc;   
        `

        return query(myProductPayRank,userNo);
    }

    
};

module.exports = productDAO;