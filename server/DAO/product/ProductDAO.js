let {
    pool,
    query
} = require('../../config/dbPool');

// 판매자 쿼리
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
        WHERE A.user_no = ?
        order by allamount desc   
        `

        return query(myProductPayRank,userNo);
    },

    //판매자 - 오늘 기간 조회
    selectTodayQuery: async function(userNo){
        const selectTodayQuery = `
        SELECT A.product_no,A.product_name,A.product_price,A.product_stock,B.buy_cnt,(B.real_payment_amount * B.buy_cnt) as 'allamount', payment_date 
        FROM product AS A
        join payment_product AS B ON A.product_no = B.product_no join payment C ON B.payment_no = C.payment_no
        WHERE A.user_no = ?
        AND payment_date = CURRENT_DATE()
        order by payment_date
        `
        return query(selectTodayQuery,userNo);
    },
    //판매자 - 일주일 기간 조회
    select1weekQuery: async function(userNo){
        const select1weekQuery = `
        SELECT A.product_no,A.product_name,A.product_price,A.product_stock,B.buy_cnt,(B.real_payment_amount * B.buy_cnt) as 'allamount', payment_date 
        FROM product AS A
        join payment_product AS B ON A.product_no = B.product_no join payment C ON B.payment_no = C.payment_no
        WHERE A.user_no = ?
        AND payment_date BETWEEN DATE_SUB(CURRENT_DATE(), INTERVAL 7 DAY) AND CURRENT_DATE()
        order by payment_date
        `
        return query(select1weekQuery,userNo);
    },

    //판매자 - 1달 기간 조회
    select1monthQuery: async function(userNo){
        const select1monthQuery = `
        SELECT A.product_no,A.product_name,A.product_price,A.product_stock,B.buy_cnt,(B.real_payment_amount * B.buy_cnt) as 'allamount', payment_date 
        FROM product AS A
        join payment_product AS B ON A.product_no = B.product_no join payment C ON B.payment_no = C.payment_no
        WHERE A.user_no = ?
        AND payment_date BETWEEN DATE_SUB(CURRENT_DATE(), INTERVAL 1 MONTH) AND CURRENT_DATE()
        order by payment_date
        `
        return query(select1monthQuery,userNo);
    },

    //판매자 - 3달 기간 조회
    select3monthQuery: async function(userNo){
        // if(minMoney=''){
        //     asdasd
        // }else{

        // }
        const select3monthQuery = `
        SELECT A.product_no,A.product_name,A.product_price,A.product_stock,B.buy_cnt,(B.real_payment_amount * B.buy_cnt) as 'allamount', payment_date 
        FROM product AS A
        join payment_product AS B ON A.product_no = B.product_no join payment C ON B.payment_no = C.payment_no
        WHERE A.user_no = ?
        AND payment_date BETWEEN DATE_SUB(CURRENT_DATE(), INTERVAL 3 MONTH) AND CURRENT_DATE()
        order by payment_date
        `
        return query(select3monthQuery,userNo);
    },

    //판매자 - 6달 기간 조회
    select6monthQuery: async function(userNo){
        const select6monthQuery = `
        SELECT A.product_no,A.product_name,A.product_price,A.product_stock,B.buy_cnt,(B.real_payment_amount * B.buy_cnt) as 'allamount', payment_date 
        FROM product AS A
        join payment_product AS B ON A.product_no = B.product_no join payment C ON B.payment_no = C.payment_no
        WHERE A.user_no = ?
        AND payment_date BETWEEN DATE_SUB(CURRENT_DATE(), INTERVAL 6 MONTH) AND CURRENT_DATE()
        order by payment_date
        `
        return query(select6monthQuery,userNo);
    },
    //1년 조회 추가하려면 AND payment_date BETWEEN DATE_SUB(CURRENT_DATE(), INTERVAL 1 YEAR) AND CURRENT_DATE()


    
};

module.exports = productDAO;