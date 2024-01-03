let {
    pool,
    query
} = require('../../config/dbPool');

// 판매자 쿼리
let productDAO = {
    selectQueryByPeriod: async function (userNo, period, minPrice, maxPrice) {
        let dateFilter = '';
        switch (period) {
            case '0':
                dateFilter = 'AND payment_date = CURRENT_DATE()';
                break;
            case '1':
                dateFilter = 'AND payment_date BETWEEN DATE_SUB(CURRENT_DATE(), INTERVAL 7 DAY) AND CURRENT_DATE()';
                break;
            case '2':
                dateFilter = 'AND payment_date BETWEEN DATE_SUB(CURRENT_DATE(), INTERVAL 1 MONTH) AND CURRENT_DATE()';
                break;
            case '3':
                dateFilter = 'AND payment_date BETWEEN DATE_SUB(CURRENT_DATE(), INTERVAL 3 MONTH) AND CURRENT_DATE()';
                break;
            case '4':
                dateFilter = 'AND payment_date BETWEEN DATE_SUB(CURRENT_DATE(), INTERVAL 6 MONTH) AND CURRENT_DATE()';
                break;

        }

        let priceFilter = '';

        if (minPrice > 0 && maxPrice > 0) {
            priceFilter = `AND product_price BETWEEN ${minPrice} AND ${maxPrice}`
        } else if (minPrice > 0 && maxPrice == '') {
            priceFilter = `AND product_price >= ${minPrice}`;
        } else if (minPrice == '' && maxPrice > 0) {
            priceFilter = `AND product_price <= ${maxPrice}`
        } else if (minPrice == '' && maxPrice == '') {
            priceFilter = ''
        }



        const SellerProductListQuery = `
                    SELECT A.product_no,A.product_name,A.product_price,A.product_stock,B.buy_cnt,(B.real_payment_amount * B.buy_cnt) as 'allamount', payment_date 
                        FROM product AS A
                        JOIN payment_product AS B ON A.product_no = B.product_no 
                        JOIN payment C ON B.payment_no = C.payment_no
                        WHERE A.user_no = ?
                        ${dateFilter}
                        ${priceFilter}
                        ORDER BY allamount desc
                    `;

        return query(SellerProductListQuery, userNo);
    },


    //판매자 상품 조회
    getMyProductList: async function (userNo) {
        const getMyProductList = `
                SELECT A.product_no,A.pet_type, A.product_name,A.product_price,A.product_registdate, A.product_image, A.product_public_state, C.category_name AS Parent_category_name, B.category_name AS child_category_name
                FROM product AS A
                JOIN category AS B ON A.category_no = B.category_no
                JOIN category AS C ON C.category_no = B.category_pno
                WHERE user_no = ?
                `;
        return query(getMyProductList, userNo)
    },

    //판매자 상품 필터 조회
    getMyProductListFilter: async function (userNo,categoryNo,publicStateNo) {
        //category_no 1~4는 대분류라서 중분류인 5부터 조회. 중분류 뒤 괄호안의 숫자는 대분류
        let categoryFilter = '';
        switch (categoryNo) {
            case '0':
                categoryFilter = 'AND A.category_no = 5'; //건식사료(1)
                break;
            case '1':
                categoryFilter = 'AND A.category_no = 6'; //습식사료(1)
                break;
            case '2':
                categoryFilter = 'AND A.category_no = 7'; //수제간식(2)
                break;
            case '3':
                categoryFilter = 'AND A.category_no = 8'; //캔.파우치(2)
                break;
            case '4':
                categoryFilter = 'AND A.category_no = 9'; //통살(2)
                break;
            case '5':
                categoryFilter = 'AND A.category_no = 10';//종합영양제(3)
                break;
            case '6':
                categoryFilter = 'AND A.category_no = 11';//피부.모질(3)
                break;
            case '7':
                categoryFilter = 'AND A.category_no = 12';//뼈.관절(3)
                break;
            case '8':
                categoryFilter = 'AND A.category_no = 13';//샴푸/린스(4)
                break;      
            case '9':
                categoryFilter = 'AND A.category_no = 14';//브러쉬(4)
                break;   
            case '10':
                categoryFilter = 'AND A.category_no = 15';//발톱.발관리(4)
                break;   
        }

        let publicState = '';
        //h1은 공개, h2는 비공개
        switch (publicStateNo) {
            case '0':
                categoryFilter = `'AND A.product_public_state = 'h1'`; 
                break;
            case '1':
                categoryFilter = `'AND A.product_public_state = 'h2'`; 
                break;
        }


        const getMyProductListFilter = `
                SELECT A.product_no,A.pet_type, A.product_name,A.product_price,A.product_registdate, A.product_image, A.product_public_state, C.category_name AS Parent_category_name, B.category_name AS child_category_name
                FROM product AS A
                JOIN category AS B ON A.category_no = B.category_no
                JOIN category AS C ON C.category_no = B.category_pno
                WHERE user_no = ?
                ${categoryFilter}
                ${publicState}
                `;
        return query(getMyProductListFilter, userNo)
    },


    //판매자 상품검색
    sellerProductSearchName: async function (search) {
        const searchQuery = "%" + search + "%"
        const sellerProductSearchName = `
                SELECT A.product_no,A.pet_type, A.product_name,A.product_price,A.product_registdate, A.product_image, A.product_public_state, C.category_name AS Parent_category_name, B.category_name AS child_category_name
                FROM product AS A
                JOIN category AS B ON A.category_no = B.category_no
                JOIN category AS C ON C.category_no = B.category_pno
                WHERE A.product_name like ?
                `;
        return query(sellerProductSearchName, searchQuery)
    },

    // 판매자 상품등록
    uploadProduct: async function (productInfo) {
        const uploadProduct = `
                    INSERT INTO product SET ?  
                `;
        return query(uploadProduct, productInfo);
    },
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
    selectNewProductCntQuery: async function (ptype) {
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
    selectBestProductCntQuery: async function (ptype) {
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
        return query(selectRecProductQuery, [ptype, state, startpageList, endpageList]);
    },
    selectRecProductCntQuery: async function (ptype) {
        const state = 'i1';
        const selectRecProductCntQuery =
            `select count(*) as cnt from product where pet_type=? and product_public_state=?`;
        return query(selectRecProductCntQuery, [ptype, state]);
    },
};

module.exports = productDAO;





// let productDAO = {
//     selectQueryByPeriod: async function (userNo, period) {
//         let dateFilter = '';
//         switch (period) {
//             case 'today':
//                 dateFilter = 'AND payment_date = CURRENT_DATE()';
//                 break;
//             case '1week':
//                 dateFilter = 'AND payment_date BETWEEN DATE_SUB(CURRENT_DATE(), INTERVAL 7 DAY) AND CURRENT_DATE()';
//                 break;
//             case '1month':
//                 dateFilter = 'AND payment_date BETWEEN DATE_SUB(CURRENT_DATE(), INTERVAL 1 MONTH) AND CURRENT_DATE()';
//                 break;
//             case '3months':
//                 dateFilter = 'AND payment_date BETWEEN DATE_SUB(CURRENT_DATE(), INTERVAL 3 MONTH) AND CURRENT_DATE()';
//                 break;
//             case '6months':
//                 dateFilter = 'AND payment_date BETWEEN DATE_SUB(CURRENT_DATE(), INTERVAL 6 MONTH) AND CURRENT_DATE()';
//                 break;
//             // 필요에 따라 더 많은 case를 추가하세요.
//         }

//         const consolidatedQuery = `
//         SELECT A.product_no,A.product_name,A.product_price,A.product_stock,B.buy_cnt,(B.real_payment_amount * B.buy_cnt) as 'allamount', payment_date 
//         FROM product AS A
//         JOIN payment_product AS B ON A.product_no = B.product_no 
//         JOIN payment C ON B.payment_no = C.payment_no
//         WHERE A.user_no = ?
//         ${dateFilter}
//         ORDER BY payment_date
//         `;

//         return query(consolidatedQuery, userNo);
//     },
// };

// module.exports = productDAO;