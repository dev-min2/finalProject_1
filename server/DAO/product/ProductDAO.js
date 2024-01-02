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
            `select p.product_no, p.product_name, p.product_image, p.pet_type, p.product_price, p.product_registdate, p.product_stock, p.category_no, cnt, a.avg_cnt
            from
            (select p.product_no, count(review_no) as cnt, truncate(avg(r.star_cnt),1) as avg_cnt 
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
            `select p.product_no, p.product_name, p.product_image, p.pet_type, p.product_price, p.product_stock, p.category_no, cnt, a.avg_cnt
            from 
            (select p.product_no, count(review_no) as cnt, truncate(avg(r.star_cnt),1) as avg_cnt 
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
            `select p.product_no, p.product_name ,p.product_image, p.pet_type, p.product_price, p.product_stock, p.category_no, a.avg_cnt, cnt
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
        const endpageList = 8;
        const state = 'i1';
        const selectSearchProductQuery =
            `select p.product_no, p.product_name, p.product_image, p.pet_type,p.product_price, p.product_registdate, p.product_stock, p.category_no, cnt, a.avg_cnt
            from
            (select p.product_no, count(review_no) as cnt, truncate(avg(r.star_cnt),1) as avg_cnt 
            from product p left join review r on p.product_no = r.product_no
            group by p.product_no
            ) as a
            join product as p on a.product_no = p.product_no
            where p.product_name like ? and p.pet_type=? and p.product_public_state=?
            order by p.product_registdate desc
            limit ?,?
            `;
        return query(selectSearchProductQuery, [searchquery, ptype, state, startpageList, endpageList]);
    },
    //검색에 대한 결과 개수
    selectSearchProductCntQuery: async function (search, ptype) {
        const searchcntquery = "%" + search + "%";
        const selectSearchProductCntQuery =
            `select count(*) as cnt from product where product_name like ? and pet_type=?`;
        return query(selectSearchProductCntQuery, [searchcntquery, ptype]);
    },
    //신상품
    selectNewProductQuery: async function (ptype, pageno) {
        const state = 'i1';
        const startpageList = (pageno - 1) * 8;
        const endpageList = 8;
        const selectNewProductQuery =
            `select p.product_no, p.product_name, p.product_image, p.pet_type, p.product_price, p.product_registdate, p.product_stock, p.category_no, cnt, a.avg_cnt
            from
            (select p.product_no, count(review_no) as cnt, truncate(avg(r.star_cnt),1) as avg_cnt 
            from product p left join review r on p.product_no = r.product_no
            group by p.product_no
            ) as a
            join product as p on a.product_no = p.product_no
            where p.pet_type=? and p.product_public_state= ?
            order by p.product_registdate desc limit ?,?`;
        return query(selectNewProductQuery, [ptype, state, startpageList, endpageList]);
    },
    selectNewProductCntQuery : async function(ptype){
        const state = 'i1';
        const selectNewProductCntQuery =
        `select count(*) as cnt from product where pet_type=? and product_public_state=?`;
        return query(selectNewProductCntQuery, [ptype, state]);
    },
    //베스트상품
    selectBestProductQuery: async function (ptype, pageno) {
        const state = 'i1';
        const startpageList = (pageno - 1) * 8;
        const endpageList = 30;
        const selectBestProductQuery =
            `select p.product_no, p.product_name, p.product_image, p.pet_type, p.product_price, p.product_stock, p.category_no, cnt, a.avg_cnt
            from 
            (select p.product_no, count(review_no) as cnt, truncate(avg(r.star_cnt),1) as avg_cnt 
            from product p left join review r on p.product_no = r.product_no
            group by p.product_no
            having count(review_no) > 0 
            ) as a
            join product as p on a.product_no = p.product_no
            where p.pet_type=? and p.product_public_state=?
            order by cnt desc limit ?,?`;
        return query(selectBestProductQuery, [ptype, state, startpageList, endpageList]);
    },
    selectBestProductCntQuery : async function(ptype){
        const state = 'i1';
        const selectBestProductCntQuery =
        `select count(*) as cnt from product where pet_type=? and product_public_state=?`;
        return query(selectBestProductCntQuery, [ptype, state]);
    },
    //추천상품
    selectRecProductQuery: async function (ptype, pageno) {
        const state = 'i1';
        const startpageList = (pageno - 1) * 8;
        const endpageList = 8;
        const selectRecProductQuery =
            `select p.product_no, p.product_name ,p.product_image, p.pet_type, p.product_price, p.product_stock, p.category_no, a.avg_cnt, cnt
            from
                (select p.product_no, count(star_cnt) as cnt, truncate(avg(r.star_cnt),1) as avg_cnt 
                    from product p left join review r on p.product_no = r.product_no
                    group by p.product_no
                    having truncate(avg(r.star_cnt),1) IS NOT NULL
                    ) as a
                    join product p on a.product_no = p.product_no
                    where p.pet_type=? and p.product_public_state=?
                    order by a.avg_cnt desc limit ?,?`;
        return query(selectRecProductQuery, [ptype, state,startpageList, endpageList]);
    },
    selectRecProductCntQuery : async function(ptype){
        const state = 'i1';
        const selectRecProductCntQuery =
        `select count(*) as cnt from product where pet_type=? and product_public_state=?`;
        return query(selectRecProductCntQuery, [ptype, state]);
    },

};

module.exports = productDAO;