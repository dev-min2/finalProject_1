let {
    pool,
    query
} = require('../../config/dbPool');

// 쿼리문 만들기
let categoryDAO = {
    selectQuery: async function () {},
    // 카테고리 정보 가져오기
    selectCategoryDataQuery: async function () {
        const selectCategoryDataQuery = 
        `select * from category`;
        return query(selectCategoryDataQuery);
    }
};

module.exports = categoryDAO;