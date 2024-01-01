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
            `select * from product order by product_registdate limit 0,4`;
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
    selectMainpageLastProductQuery: async function (ptype) {
        const selectMainpageLastProductQuery =
            `SELECT p.product_no, p.product_name, p.product_price, p.product_stock, p.category_no, a.avg_cnt
            FROM
                (
                SELECT p.product_no, TRUNCATE(avg(r.star_cnt),0) as avg_cnt 
                    FROM product AS p
                    LEFT JOIN review AS r on p.product_no = r.product_no
                    Group by p.product_no
                ) as a
                JOIN product as p on a.product_no = p.product_no
                WHERE p.pet_type =?
        `;
        return query(selectMainpageLastProductQuery, ptype);
    },
    //키워드 검색 + 펫타입 추가
    selectSearchProductQuery: async function (search, ptype, pageno) {
        const searchquery = "%" + search + "%";
        const startpageList = (pageno - 1) * 8;
        const endpageList = pageno * 8;
        const selectSearchProductQuery =
            `select * from product where product_name like ? and pet_type=? order by product_registdate desc
            limit ?, ?`;
        return query(selectSearchProductQuery, [searchquery, ptype, startpageList, endpageList]);
    },
    //검색에 대한 결과 개수
    selectSearchProductCntQuery: async function (search, ptype) {
        const searchcntquery = "%" + search + "%";
        const selectSearchProductCntQuery =
            `select count(*) as cnt from product where product_name like ? and pet_type=?`;
        return query(selectSearchProductCntQuery, [searchcntquery, ptype]);
    }



};

module.exports = productDAO;