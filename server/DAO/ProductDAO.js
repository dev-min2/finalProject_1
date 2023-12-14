let { pool } = require('../config/dbPool');

// 쿼리문 만들기
let productDAO = {
    query : function(sql, values) {
        return new Promise((resolve,reject) => {
            pool.query(sql, values, (err, results) => {
                if(err) {
                    reject( { err } );
                }
                else {
                    resolve(results);
                }
            })
        })
    },
    
    selectQuery : async function() {
        let query = `
            SELECT *
                FROM Product
        `

        return this.query(query);
    }
};

module.exports = productDAO;