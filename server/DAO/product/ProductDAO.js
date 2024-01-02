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
    selectMainpageFirstProductQuery: async function (ptype) {
        const state = 'i1';
        const limit = 4;
        const selectMainpageFirstProductQuery =
            `select p.product_no, p.product_name, p.product_price, p.product_registdate, p.product_stock, p.category_no, cnt
            from
            (select p.product_no, count(review_no) as cnt
            from product p left join review r on p.product_no = r.product_no
            group by p.product_no
            ) as a
            join product as p on a.product_no = p.product_no
            where p.pet_type=? and p.product_public_state= ?
            order by p.product_registdate desc limit ?`;
        return query(selectMainpageFirstProductQuery, [ptype, state, limit]);
    },
    //메인페이지 두번째라인(리뷰 많은순)
    selectMainpageSecondProductQuery: async function (ptype) {
        const state = 'i1';
        const limit = 4;
        const selectMainpageSecondProductQuery =
            `select p.product_no, p.product_name, p.product_price, p.product_stock, p.category_no, cnt
            from 
            (select p.product_no, count(review_no) as cnt
            from product p left join review r on p.product_no = r.product_no
            group by p.product_no
            ) as a
            join product as p on a.product_no = p.product_no
            where p.pet_type=? and p.product_public_state=?
            order by cnt desc limit ?`;
        return query(selectMainpageSecondProductQuery, [ptype, state, limit]);
    },
    //세번재 라인(별점 높은순)
    selectMainpageLastProductQuery: async function (ptype) {
        const state = 'i1';
        const limit = 4;
        const selectMainpageLastProductQuery =
            `select p.product_no, p.product_name , p.product_price, p.product_stock, p.category_no, a.avg_cnt, cnt
            from
                (select p.product_no, count(star_cnt) as cnt, truncate(avg(r.star_cnt),1) as avg_cnt 
                    from product p left join review r on p.product_no = r.product_no
                    group by p.product_no
                    ) as a
                    join product p on a.product_no = p.product_no
                    where p.pet_type=? and p.product_public_state=?
                    order by a.avg_cnt desc limit ?`;
        return query(selectMainpageLastProductQuery, [ptype, state, limit]);
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