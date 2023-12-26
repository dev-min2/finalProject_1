let { pool,query } = require('../config/dbPool');

// 쿼리문 만들기
let myCartDAO = {
    selectQuery: async function () {
        productList:
        `select p.product_no, c.product_sel_cnt, p.product_name, p.product_price, p.product_image, p.product_stock,u.company_name
        from product p 
        join cart c on p.product_no = c.product_no 
        join user u on p.user_no = u.user_no`
    }
};

module.exports = myCartDAO;