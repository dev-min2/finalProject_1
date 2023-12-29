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
    selectCategorySearchQuery : async function(cno, ptype, pageno){
        const startpageList = (pageno - 1) * 8;
        const endpageList = pageno * 8;
        const selectCategorySearchQuery = 
        `select * from product where category_no=? and pet_type=? order by product_registdate desc
        limit ?,?`;
        return query(selectCategorySearchQuery,[cno,ptype, startpageList, endpageList]);
    },
    //카테고리에 해당하는 상품수
    selectCategoryProductCntQuery : async function(cno, ptype){
        const selectCategoryProductCntQuery = 
        `select count(*) as cnt from category where category_no=? and pet_type=?`;
        return query(selectCategoryProductCntQuery,[cno, ptype]);
    }

};

module.exports = categoryDAO;