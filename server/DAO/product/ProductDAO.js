let {
    pool,
    query
} = require('../../config/dbPool');

// 판매자 쿼리
let productDAO = {
    selectQueryByPeriod: async function (userNo,period,minPrice,maxPrice) {
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

                if(minPrice > 0 && maxPrice > 0) {
                    priceFilter = `AND product_price BETWEEN ${minPrice} AND ${maxPrice}`
                } 
                else if(minPrice > 0 && maxPrice=='') {
                    priceFilter = `AND product_price >= ${minPrice}`;
                }
                else if(minPrice =='' && maxPrice>0){
                    priceFilter = `AND product_price <= ${maxPrice}`
                }
                else if(minPrice =='' && maxPrice==''){
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
            getMyProductList : async function(userNo) {
                const getMyProductList = `
                SELECT A.product_no,A.pet_type, A.product_name,A.product_price,A.product_registdate, A.product_image, A.product_public_state, C.category_name AS Parent_category_name, B.category_name AS child_category_name
                FROM product AS A
                JOIN category AS B ON A.category_no = B.category_no
                JOIN category AS C ON C.category_no = B.category_pno
                WHERE user_no = ?
                `;
                return query(getMyProductList,userNo)
            },
            //판매자 상품검색
            sellerProductSearchName : async function(search) {
                const searchQuery = "%"+search+"%"
                const sellerProductSearchName = `
                SELECT A.product_no,A.pet_type, A.product_name,A.product_price,A.product_registdate, A.product_image, A.product_public_state, C.category_name AS Parent_category_name, B.category_name AS child_category_name
                FROM product AS A
                JOIN category AS B ON A.category_no = B.category_no
                JOIN category AS C ON C.category_no = B.category_pno
                WHERE A.product_name like ?
                `;
                return query(sellerProductSearchName,searchQuery)        
         },
        
            // 판매자 상품등록
            
            uploadProduct : async function(productInfo) {
                const uploadProduct = `
                    INSERT INTO product SET ?  
                `;
                return query(uploadProduct,productInfo);
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
