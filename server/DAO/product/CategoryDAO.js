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
            `select a.category_no as parent_no , a.category_name as parent_category_name, b.category_no as children_no , b.category_name as children_category_name
        from category as a
        join category as b on a.category_no = b.category_pno`;
        return query(selectCategoryDataQuery);
    },
    //카테고리 상품 가져오기
    selectCategorySearchQuery: async function (cno, ptype, pageno) {
        const startpageList = (pageno - 1) * 8;
        const endpageList = pageno * 8;
        const state = 'i1';
        const limit = 4;
        const selectCategorySearchQuery =
            `select p.product_no, p.product_name, p.product_image, p.pet_type,p.product_price, p.product_registdate, p.product_stock, p.category_no, cnt, a.avg_cnt
            from
            (select p.product_no, count(review_no) as cnt, truncate(avg(r.star_cnt),1) as avg_cnt 
            from product p left join review r on p.product_no = r.product_no
            group by p.product_no
            ) as a
            join product as p on a.product_no = p.product_no
            where p.category_no=? and p.pet_type=? and p.product_public_state=?
            order by p.product_registdate desc limit ?`;
        return query(selectCategorySearchQuery, [cno, ptype, startpageList, endpageList, state, limit]);
    },
    //카테고리에 해당하는 상품수
    selectCategorySearchCntQuery: async function (cno, ptype, pageno) {
        const startpageList = (pageno - 1) * 8;
        const endpageList = pageno * 8;
        const selectCategorySearchCntQuery =
            `select count(*) as cnt from product where category_no=? and pet_type=?`;
        return query(selectCategorySearchCntQuery, [cno, ptype, startpageList, endpageList]);
    },

};

module.exports = categoryDAO;