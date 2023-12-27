let { pool,query } = require('../../config/dbPool');

// 쿼리문 만들기
let myPetDAO = {
    selectPetQuery : async function(userNo) {
        const selectPetQuery = 
            `SELECT p.pet_name, s1.sub_code_name as pet_type, p.pet_birth, s2.sub_code_name as pet_gender
            FROM pet p 
            LEFT JOIN sub_code_tbl s1
            ON p.pet_type = s1.sub_code
            LEFT JOIN sub_code_tbl s2
            ON p.pet_gender = s2.sub_code
            WHERE user_no = ?`;
            return query(selectPetQuery, userNo);
    }
};

module.exports = myPetDAO;