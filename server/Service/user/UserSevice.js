const UserDAO = require('../../DAO/user/UserDAO');

class UserService {
    constructor() {

    }

    async checkDuplicateUserId(userId) {
        let result = await UserDAO.selectUserIdQuery(userId);
        return result.length <= 0 ? true : false;
    }

    async createUser(userObj) {
        //emailCheckReg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        //phoneCheckReg = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
        let result = await UserDAO.insertUserQuery(userObj);
        return result;
    }

    async loginUser(userObj) {
        const userId = userObj.userId;
        const userPw = userObj.userPw;

        let result = await UserDAO.selectUserQuery(userId,userPw);
        return result;
    }
}

module.exports = UserService;