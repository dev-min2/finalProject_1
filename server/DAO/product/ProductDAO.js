let {
    pool,
    query
} = require('../../config/dbPool');

// 판매자 쿼리
let productDAO = {
    selectQueryByPeriod: async function (userNo, period,minPrice,maxPrice) {
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

                let minPriceFilter = '';
                switch(minPrice){
                    case `${minPrice}`:
                        minPriceFilter = `AND product_price BETWEEN ${minPrice}`
                        break; 
                }

                let maxPriceFilter = '';
                switch(maxPrice){
                    case `${maxPrice}`:
                        maxPriceFilter=`AND ${maxPrice}`
                        break; 
                }
        
                const SellerProductListQuery = `
                SELECT A.product_no,A.product_name,A.product_price,A.product_stock,B.buy_cnt,(B.real_payment_amount * B.buy_cnt) as 'allamount', payment_date 
                FROM product AS A
                JOIN payment_product AS B ON A.product_no = B.product_no 
                JOIN payment C ON B.payment_no = C.payment_no
                WHERE A.user_no = ?
                ${dateFilter}
                ${minPriceFilter} ${maxPriceFilter}
                ORDER BY payment_date
                `;
        
                return query(SellerProductListQuery, userNo);
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
