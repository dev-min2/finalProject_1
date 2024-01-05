let { pool,query } = require('../../config/dbPool');

// 쿼리문 만들기
const myCartDAO = {
    showCartQuery: async function (user_no) {
        const showCartQuery = `
        SELECT p.product_no, c.product_sel_cnt, p.product_name, p.product_desc, p.pet_type,
        p.product_price, p.product_image, p.product_stock, u.company_name
        FROM product p 
        JOIN cart c ON p.product_no = c.product_no 
        JOIN user u ON p.user_no = u.user_no
        WHERE c.user_no = ?
        `;
        return query(showCartQuery, user_no);
    },
    showCartCountQuery: async function (user_no) {
        const showCartCountQuery = `
            SELECT COUNT(*) AS CNT FROM cart
            WHERE user_no = ?
        `;
        return query(showCartCountQuery, user_no);
    },
    selectProductStockQuery: async function (product_no) {
        const selectProductStockQuery = `
        SELECT p.product_no, p.product_stock ,c.product_sel_cnt
        FROM product p join cart c on p.product_no = c.product_no
        WHERE p.product_no = ?
        `;
        return query(selectProductStockQuery, product_no);
    },
    upCntQuery: async function (product_no) {
        const upCntQuery = `
        UPDATE cart
        SET product_sel_cnt = product_sel_cnt + 1
        WHERE product_no = ?
        `;
        return query(upCntQuery, product_no);
    },
    downCntQuery: async function (product_no) {
        const downCntQuery = `
        UPDATE cart
        SET product_sel_cnt = product_sel_cnt - 1
        WHERE product_no = ?
        `;
        return query(downCntQuery, product_no);
    },
    deleteProductQuery: async function (user_no, product_no) {
        const deleteProductQuery = `
        DELETE from cart
        WHERE user_no = ? and product_no = ?
        `;
        return query(deleteProductQuery, [user_no, product_no]);
    },
};

module.exports = myCartDAO;