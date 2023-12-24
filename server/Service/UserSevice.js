const UserDAO = require('../DAO/user/UserDAO');
const emailAuthDAO = require('../DAO/EmailAuthDAO');
const nodemailer = require('nodemailer');

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

    async createEmailAuthInfo(email) {
        const { NODEMAILER_ID, NODEMAILER_PW } = process.env;

        // 해당 이메일 인증하는 번호가 있다면 지워준다.
        await emailAuthDAO.deleteQuery(email);
        
        const transporter = nodemailer.createTransport({
            service: 'naver',
            host: 'smtp.naver.com',  // SMTP 서버명
            port: 465,  // SMTP 포트
            auth: {
                user: NODEMAILER_ID,
                pass: NODEMAILER_PW
            }
        });
        const randNumber = Math.floor(Math.random() * (999999 - 111111 + 1)) + 111111;
        const mailOptions = {
            from : NODEMAILER_ID,
            to: email,
            subject: '마이디어 펫 인증메일',
            html: `<h1>인증번호를 입력해주세요.</h1><br><h2>${randNumber}</h2>`
        };

        const result = await this.sendMail(transporter, mailOptions);
        if(result == false) {
            return false;
        }

        let expireDate = new Date();
        expireDate.setMinutes(expireDate.getMinutes() + 3);
        const emailAuthInfo = {
            email : email,
            authcode : randNumber,
            auth_expire_date : expireDate
        }

        let insertResult = {};
        try {
            insertResult = await emailAuthDAO.insertQuery(emailAuthInfo);
        }
        catch(e) {
            console.log(e);
            return false;
        }

        if(insertResult.affectedRows > 0) {
            return true;
        }
        else {
            return false;
        }
    }

    async confirmEmailAuth(email, authCode) {
        const result = await emailAuthDAO.selectQuery(email,authCode);
        if(result.length > 0) {
            return true;
        }

        return false;
    }

    async sendMail(transporter,mailOptions) {
        return new Promise((resolve,reject) => {
            transporter.sendMail(mailOptions,(err, res) => {
                if(err) {
                    reject(false);
                    return;
                }

                resolve(true);
            });
        });  
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