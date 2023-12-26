let { pool,query } = require('../../config/dbPool');

// 쿼리문 만들기
let myPetDAO = {
    selectPetQuery : async function(userNo) {
        const selectPetQuery = 
            `SELECT pet_name, pet_type, pet_birth, pet_gender 
            FROM pet WHERE user_no = ?`;
            return query(selectPetQuery, userNo);
    }
};

module.exports = myPetDAO;