const UserDAO = require('../DAO/user/UserDAO');

class UserService {
    constructor() {

    }

    async createUser(userObj) {
        //한번더 유효성 체크
        //emailCheckReg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        //phoneCheckReg = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
        let result = await UserDAO.insertUserQuery(userObj);
        return result;
    }

    async checkDuplicateUserId(userId) {
        let result = await UserDAO.selectUserIdQuery(userId);
        return result.length <= 0 ? true : false;
    }

    async loginUser(userObj) {
        const userId = userObj.userId;
        const userPw = userObj.userPw;

        let result = await UserDAO.selectUserQuery(userId,userPw);
        return result;
    }

    // 테스트용
    async testUpload(deschtml, fileName) {
        let data = {
            product_desc : deschtml,
            product_img : fileName
        }

        let result = await UserDAO.insertTestQuery(data);
        return result;
    }

    // 테스트용
    async testData() {
        let result = await UserDAO.selectAllTestQuery();
        return result[0];
    }
}

module.exports = UserService;