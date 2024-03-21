let {
    pool,
    query
} = require('../../config/dbPool');
let productDAO = {
    //////////////////////////
    ////////관리자/////////////
    //////////////////////////
    selectQueryByPeriodAdmin: async function (period, minPrice, maxPrice, pageNo) {
        let startPage = (pageNo - 1) * 10;
        let endPage = 10;
        let dateFilter = '';

        switch (period) {
            case '0':
                dateFilter = 'payment_date = CURRENT_DATE()';
                break;
            case '1':
                dateFilter = 'payment_date BETWEEN DATE_SUB(CURRENT_DATE(), INTERVAL 7 DAY) AND CURRENT_DATE()';
                break;
            case '2':
                dateFilter = 'payment_date BETWEEN DATE_SUB(CURRENT_DATE(), INTERVAL 1 MONTH) AND CURRENT_DATE()';
                break;
            case '3':
                dateFilter = 'payment_date BETWEEN DATE_SUB(CURRENT_DATE(), INTERVAL 3 MONTH) AND CURRENT_DATE()';
                break;
            case '4':
                dateFilter = 'payment_date BETWEEN DATE_SUB(CURRENT_DATE(), INTERVAL 6 MONTH) AND CURRENT_DATE()';
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


        const selectQueryByPeriodAdmin = `
    SELECT
           A.product_no,
           A.product_name,
           A.product_price,
           A.product_stock,
           B.product_no AS buy_product_no,
           SUM(B.buy_cnt) AS total_buy_cnt,
           SUM(B.real_payment_amount * B.buy_cnt) AS allamount,
           MAX(C.payment_date) AS latest_payment_date
       FROM
           product AS A
       JOIN
           payment_product AS B ON A.product_no = B.product_no
       JOIN
           payment C ON B.payment_no = C.payment_no
       WHERE
            ${dateFilter}
            ${priceFilter}
       GROUP BY
           A.product_no
           LIMIT ?,?
       `;

        return query(selectQueryByPeriodAdmin, [startPage, endPage]);
    },

    selectQueryByPeriodCntAdmin: async function (period, minPrice, maxPrice) {
        let dateFilter = '';
        switch (period) {
            case '0':
                dateFilter = 'payment_date = CURRENT_DATE()';
                break;
            case '1':
                dateFilter = 'payment_date BETWEEN DATE_SUB(CURRENT_DATE(), INTERVAL 7 DAY) AND CURRENT_DATE()';
                break;
            case '2':
                dateFilter = 'payment_date BETWEEN DATE_SUB(CURRENT_DATE(), INTERVAL 1 MONTH) AND CURRENT_DATE()';
                break;
            case '3':
                dateFilter = 'payment_date BETWEEN DATE_SUB(CURRENT_DATE(), INTERVAL 3 MONTH) AND CURRENT_DATE()';
                break;
            case '4':
                dateFilter = 'payment_date BETWEEN DATE_SUB(CURRENT_DATE(), INTERVAL 6 MONTH) AND CURRENT_DATE()';
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
        const selectQueryByPeriodCntAdmin = `
             SELECT  count(DISTINCT A.product_no) AS CNT
              FROM
                  product AS A
              JOIN
                  payment_product AS B ON A.product_no = B.product_no
              JOIN
                payment C ON B.payment_no = C.payment_no
            WHERE
                 ${dateFilter}
                 ${priceFilter}
                                    `;
        return query(selectQueryByPeriodCntAdmin);
    },
    //관리자-회원조회
    getAdminMemberList: async function (permission, leave, pageNo) {
        let startPage = (pageNo - 1) * 10;
        let endPage = 10;
        let permissionFilter = '';

        switch (permission) {
            case '0':
                permissionFilter = 'F1';
                break;
            case '1':
                permissionFilter = 'F2';
                break;
            case '2':
                permissionFilter = 'F1'
                break;
        }
        let leaveFilter = ''
        switch (leave) {
            case '0':
                leaveFilter = '';
                break;
            case '1':
                leaveFilter = 'NOT';
                break;
        }
        const getAdminMemberList = `
    select user_no, user_id, user_name, user_joindate, user_phone, user_addr
    from user
    WHERE user_permission = '${permissionFilter}'
    AND user_leavedate is ${leaveFilter} null
    LIMIT ?,?`;

        return query(getAdminMemberList, [startPage, endPage])
    },


    getAdminMemberListCnt: async function (permission, leave) {
        let permissionFilter = '';
        switch (permission) {
            case '0':
                permissionFilter = 'F1';
                break;
            case '1':
                permissionFilter = 'F2';
                break;
            case '2':
                permissionFilter = 'F1';
                break;
        }
        let leaveFilter = ''
        switch (leave) {
            case '0':
                leaveFilter = '';
                break;
            case '1':
                leaveFilter = 'NOT';
                break;
        }
        const getAdminMemberListCnt = `
    SELECT count(*) AS CNT
    from user
    WHERE user_permission = '${permissionFilter}'
    AND user_leavedate is ${leaveFilter} null
            `;
        return query(getAdminMemberListCnt)
    },

    //관리자 상품 관리 전체조회
    getAdminProductList: async function ( publicStateNo, pageNo, showCnt) {
        let startPage = (pageNo - 1) * showCnt;
        let showPage = showCnt;

        const getAdminProductList = `
            SELECT false AS selected, A.product_no,A.pet_type, A.product_name,A.product_price,A.product_registdate, A.product_image, A.product_public_state, C.category_name AS Parent_category_name, B.category_name AS child_category_name
            FROM product AS A
            JOIN category AS B ON A.category_no = B.category_no
            JOIN category AS C ON C.category_no = B.category_pno
            WHERE A.product_public_state = ?
            LIMIT ${startPage},${showPage}
            `;
        return query(getAdminProductList, [publicStateNo])
    },

    adminProductCnt: async function ( publicStateNo) {
        const adminProductCnt = `
        SELECT count(*) AS CNT
            FROM user AS A
            JOIN product AS B ON A.user_no = B.user_no
            WHERE B.product_public_state = ?
        `;
        return query(adminProductCnt, publicStateNo);
    },
    //관리자 상품 필터 조회
    getAdminProductListFilter: async function ( publicStateNo, categoryArray) {
        let question = '';
        //let categoryArray = [];
        for (let i = 0; i < categoryArray.length; ++i) {
            if (i == categoryArray.length - 1) { // 배열의 마지막 항목이면 ?후 )로 식을 닫아줌
                question += '?)';
            } else {
                question += '?,'; // 배열의 마지막이 아니면 ?후 ,를 넣어줌
            }
        }

        let getAdminProductListFilter = `
            SELECT A.product_no,A.pet_type, A.product_name,A.product_price,A.product_registdate, A.product_image, A.product_public_state, C.category_name AS Parent_category_name, B.category_name AS child_category_name
            FROM product AS A
            JOIN category AS B ON A.category_no = B.category_no
            JOIN category AS C ON C.category_no = B.category_pno
            WHERE A.product_public_state = ?  
            AND A.category_no IN(${question}
            `;
        // ...(스프레드 연산자)를 사용하지 않으면, query 함수에 배열 전체가 하나의 인수로 전달.
        return query(getAdminProductListFilter, [publicStateNo, ...categoryArray])
    },






//관리자-쿠폰지급-회원조회
getAdminMemberList2: async function (permission, leave, userPageNo) {
    let startPage = (userPageNo - 1) * 10;
    let endPage = 10;
    let permissionFilter = '';

    switch (permission) {
        case '0':
            permissionFilter = 'F1';
            break;
        case '1':
            permissionFilter = 'F2';
            break;
        case '2':
            permissionFilter = 'F1'
            break;
    }
    let leaveFilter = ''
    switch (leave) {
        case '0':
            leaveFilter = '';
            break;
        case '1':
            leaveFilter = 'NOT';
            break;
    }
    const getAdminMemberList2 = `
select user_no, user_id, user_name, user_joindate, user_phone, user_addr
from user
WHERE user_permission = '${permissionFilter}'
AND user_leavedate is ${leaveFilter} null
LIMIT ?,?`;

    return query(getAdminMemberList2, [startPage, endPage])
},


getAdminMemberListCnt2: async function (permission, leave) {
    let permissionFilter = '';
    switch (permission) {
        case '0':
            permissionFilter = 'F1';
            break;
        case '1':
            permissionFilter = 'F2';
            break;
        case '2':
            permissionFilter = 'F1';
            break;
    }
    let leaveFilter = ''
    switch (leave) {
        case '0':
            leaveFilter = '';
            break;
        case '1':
            leaveFilter = 'NOT';
            break;
    }
    const getAdminMemberListCnt2 = `
SELECT count(*) AS CNT
from user
WHERE user_permission = '${permissionFilter}'
AND user_leavedate is ${leaveFilter} null
        `;
    return query(getAdminMemberListCnt2)
},
    //관리자-회원조회
    getAdminMemberList: async function (permission, leave, pageNo) {
        let startPage = (pageNo - 1) * 10;
        let endPage = 10;
        let permissionFilter = '';

        switch (permission) {
            case '0':
                permissionFilter = 'F1';
                break;
            case '1':
                permissionFilter = 'F2';
                break;
            case '2':
                permissionFilter = 'F1'
                break;
        }
        let leaveFilter = ''
        switch (leave) {
            case '0':
                leaveFilter = '';
                break;
            case '1':
                leaveFilter = 'NOT';
                break;
        }
        const getAdminMemberList = `
    select user_no, user_id, user_name, user_joindate, user_phone, user_addr
    from user
    WHERE user_permission = '${permissionFilter}'
    AND user_leavedate is ${leaveFilter} null
    LIMIT ?,?`;

        return query(getAdminMemberList, [startPage, endPage])
    },


    getAdminMemberListCnt: async function (permission, leave) {
        let permissionFilter = '';
        switch (permission) {
            case '0':
                permissionFilter = 'F1';
                break;
            case '1':
                permissionFilter = 'F2';
                break;
            case '2':
                permissionFilter = 'F1';
                break;
        }
        let leaveFilter = ''
        switch (leave) {
            case '0':
                leaveFilter = '';
                break;
            case '1':
                leaveFilter = 'NOT';
                break;
        }
        const getAdminMemberListCnt = `
    SELECT count(*) AS CNT
    from user
    WHERE user_permission = '${permissionFilter}'
    AND user_leavedate is ${leaveFilter} null
            `;
        return query(getAdminMemberListCnt)
    },
    //////////////////////////
    ////////판매자/////////////
    //////////////////////////
    selectQueryByPeriod: async function (userNo, period, minPrice, maxPrice, pageNo) {
        let startPage = (pageNo - 1) * 10;
        let endPage = 10;
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
                SELECT
                A.product_no,
                A.product_name,
                A.product_price,
                A.product_stock,
                B.product_no AS buy_product_no,
                SUM(B.buy_cnt) AS total_buy_cnt,
                SUM(B.real_payment_amount * B.buy_cnt) AS allamount,
                MAX(C.payment_date) AS latest_payment_date
            FROM
                product AS A
            JOIN
                payment_product AS B ON A.product_no = B.product_no
            JOIN
                payment C ON B.payment_no = C.payment_no
            WHERE A.user_no= ?
                 ${dateFilter}
                 ${priceFilter}
            GROUP BY
                A.product_no
                LIMIT ?,?
           `;

        return query(SellerProductListQuery, [userNo, startPage, endPage]);
    },

    selectQueryByPeriodCnt: async function (userNo, period, minPrice, maxPrice) {
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
        const selectQueryByPeriodCnt = `
                 SELECT  count(DISTINCT A.product_no) AS CNT
                 FROM
                     product AS A
                 JOIN
                     payment_product AS B ON A.product_no = B.product_no
                 JOIN
                   payment C ON B.payment_no = C.payment_no
                 WHERE A.user_no = ?
                    ${dateFilter}
                    ${priceFilter}
                 `;
                      return query(selectQueryByPeriodCnt,[userNo]);
    },

    //판매자 상품 조회
    getMyProductList: async function (userNo, publicStateNo, pageNo, showCnt) {
        let startPage = (pageNo - 1) * showCnt;
        let showPage = showCnt;

        const getMyProductList = `
                SELECT false AS selected, A.product_no,A.pet_type, A.product_name,A.product_price,A.product_registdate, A.product_image, A.product_public_state, C.category_name AS Parent_category_name, B.category_name AS child_category_name
                FROM product AS A
                JOIN category AS B ON A.category_no = B.category_no
                JOIN category AS C ON C.category_no = B.category_pno
                WHERE user_no = ? AND A.product_public_state = ?
                LIMIT ${startPage},${showPage}
                `;
        return query(getMyProductList, [userNo, publicStateNo])
    },
    sellerProductCnt: async function (userNo, publicStateNo) {
        const sellerProductCnt = `
            SELECT count(*) AS CNT
                FROM user AS A
                JOIN product AS B ON A.user_no = B.user_no
                WHERE A.user_no = ${userNo} AND B.product_public_state = ?
        `;
        return query(sellerProductCnt, publicStateNo);
    },

    //판매자 상품 필터 조회
    getMyProductListFilter: async function (userNo, publicStateNo, categoryArray,pageNo,showCnt) {
        let startPage = (pageNo - 1) * showCnt;
        let showPage = showCnt;
        let question = '';
        //let categoryArray = [];
        for (let i = 0; i < categoryArray.length; ++i) {
            if (i == categoryArray.length - 1) { // 배열의 마지막 항목이면 ?후 )로 식을 닫아줌
                question += '?)';
            } else {
                question += '?,'; // 배열의 마지막이 아니면 ?후 ,를 넣어줌
            }
        }
        console.log('1', categoryArray)
        console.log('2', categoryArray.length)
        console.log('3', question)

        let getMyProductListFilter = `
                SELECT A.product_no,A.pet_type, A.product_name,A.product_price,A.product_registdate, A.product_image, A.product_public_state, C.category_name AS Parent_category_name, B.category_name AS child_category_name
                FROM product AS A
                JOIN category AS B ON A.category_no = B.category_no
                JOIN category AS C ON C.category_no = B.category_pno
                WHERE user_no = ?
                AND A.product_public_state = ?
                AND A.category_no IN(${question}
                LIMIT ?, ?
                `;
        // ...(스프레드 연산자)를 사용하지 않으면, query 함수에 배열 전체가 하나의 인수로 전달.
        return query(getMyProductListFilter, [userNo, publicStateNo, ...categoryArray,startPage,showPage])
    },

    getMyProductListFilterCnt: async function (userNo, publicStateNo, categoryArray) {
        const getMyProductListFilterCnt = `
            SELECT count(*) AS CNT
                FROM product AS A
                JOIN category AS B ON A.category_no = B.category_no
                JOIN category AS C ON C.category_no = B.category_pno
                WHERE user_no = ?
                AND A.product_public_state = ?
                AND A.category_no IN(${question}
        `;
        return query(getMyProductListFilterCnt, [userNo,publicStateNo,categoryArray]);
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
    //판매자 상품삭제
    //삭제는 상품데이터를 DB상에서 실제로 지우는게 아니라, 재고값을 
    //-9999로 두고 품절로 표시, 실제 재고가 0일때는 재고 없음으로 표시
    deleteProduct: async function (productArray) {
        let delQuestion = '';
        for (let i = 0; i < productArray.length; ++i) {
            if (i == productArray.length - 1) { // 배열의 마지막 항목이면 ?후 )로 식을 닫아줌
                delQuestion += '?)';
            } else {
                delQuestion += '?,'; // 배열의 마지막이 아니면 ?후 ,를 넣어줌
            }
        }
        console.log('1', productArray)
        console.log('2', productArray.length)
        console.log('3', delQuestion)
        console.log('4', ...productArray)

        let deleteProduct = `
            UPDATE PRODUCT
            SET product_stock = -9999, product_public_state = 'I2'
            WHERE product_no IN(${delQuestion}
        `

        return query(deleteProduct, [...productArray]); // 그냥 ...productArray 만 하면 오류남..값이 여러개니까 []붙여야함
    },

    //판매자 상품숨김 

    hidingProduct: async function (productArray) {
        let hidQuestion = '';
        for (let i = 0; i < productArray.length; ++i) {
            if (i == productArray.length - 1) { // 배열의 마지막 항목이면 ?후 )로 식을 닫아줌
                hidQuestion += '?)';
            } else {
                hidQuestion += '?,'; // 배열의 마지막이 아니면 ?후 ,를 넣어줌
            }
        }

        console.log('1', productArray)
        console.log('2', productArray.length)
        console.log('3', hidQuestion)
        console.log('4', ...productArray)
        let hidingProduct = `
            update product
            set product_public_state = 'I2'
            WHERE product_no IN(${hidQuestion}
        `

        return query(hidingProduct, [...productArray]);
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
        const endpageList = 8;
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
    //하랑
    showProductDetailQuery: async function (product_no) {
        const showProductDetailQuery = `
        SELECT *
        FROM product
        where product_no = ?
        `;
        return query(showProductDetailQuery, product_no);
    },
    addCartQuery: async function (product_no, product_sel_cnt, user_no) {
        const addCartQuery = `
        INSERT cart
        SET product_no = ? , product_sel_cnt = ? , user_no = ?
        `;
        return query(addCartQuery, [product_no, product_sel_cnt, user_no]);
    },
    updateCartQuery: async function (product_sel_cnt, user_no, product_no) {
        const updateCartQuery = `
        UPDATE cart
        SET product_sel_cnt = product_sel_cnt + ${product_sel_cnt}
        WHERE user_no = ? AND product_no = ?
        `;
        return query(updateCartQuery, [user_no, product_no]);
    },
    cartInfoQuery: async function (userNo, productNo) {
        const cartInfoQuery = `
        SELECT *
        FROM cart
        WHERE user_no = ? AND product_no = ?
        `;
        return query(cartInfoQuery, [userNo, productNo]);
    },
    addWishQuery: async function (product_no, user_no) {
        const addWishQuery = `
        INSERT wishlist
        SET product_no = ? , user_no = ?
        `;
        return query(addWishQuery, [product_no, user_no]);
    },
    wishInfoQuery: async function (user_no) {
        const wishInfoQuery = `
        SELECT *
        FROM product p join wishlist w on p.product_no = w.product_no
        WHERE w.user_no = ?;
        `;
        return query(wishInfoQuery, user_no);
    },
    delWishQuery: async function (user_no, product_no) {
        const delWishQuery = `
        DELETE from wishlist
        WHERE user_no = ? and product_no = ?
        `;
        return query(delWishQuery, [user_no, product_no]);
    },
    relationProductListQuery: async function (cno, ptype) {
        const limit = 4;
        const relationProductListQuery =
            `select A.* , B.cnt,B.avg_cnt
        From
        (select A.product_no, count(review_no) as cnt, truncate(avg(B.star_cnt),1) as avg_cnt 
        from product A left join review B on A.product_no = B.product_no
        group by A.product_no
        ) as B
        join product as A on A.product_no = B.product_no
        WHERE A.category_no=? and A.pet_type =? order by rand() limit ?`;
        return query(relationProductListQuery, [cno, ptype, limit]);
    }
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