let {
    pool,
    query
} = require('../../config/dbPool');

// 쿼리문 만들기
let productDAO = {
    selectQuery: async function () {
        let prQuery = `
            SELECT *
                FROM product
        `

        return query(prQuery);
    },
    //메인페이지 첫 라인(최신 등록순)
    selectMainpageFirstProductQuery: async function () {
        const selectMainpageFirstProductQuery =
            `select * from product order by product_registdate limit 0,5
        `;
        return query(selectMainpageFirstProductQuery);
    },
    //메인페이지 두번째라인(리뷰 많은순)
    selectMainpageSecondProductQuery: async function () {
        const selectMainpageSecondProductQuery =
            `select * from product order by product_registdate limit 0,5
        `;
        return query(selectMainpageSecondProductQuery);
    },
    //세번재 라인(별점 높은순)
    selectMainpageLastProductQuery: async function () {
        const selectMainpageLastProductQuery =
            `select * from product order by product_registdate limit 0,5
        `;
        return query(selectMainpageLastProductQuery);
    },
};

module.exports = productDAO;