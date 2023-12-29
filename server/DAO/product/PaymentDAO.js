let { pool,query } = require('../../config/dbPool');

// 쿼리문 만들기
let paymentDAO = {
    selectQuery : async function() {
    },
    
    selectCartQuery : async function(userNo){ //카트정보 불러오기
        const selectCartQuery = 
        `SELECT c.product_sel_cnt, p.product_name, p.product_price, c.product_sel_cnt * p.product_price as price_sum
        FROM cart c LEFT JOIN product p
        ON c.product_no = p.product_no
        WHERE c.user_no = ?`;

        return query(selectCartQuery, userNo);
    }
};

module.exports = paymentDAO;