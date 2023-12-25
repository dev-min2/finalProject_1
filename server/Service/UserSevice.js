const UserDAO = require('../DAO/user/UserDAO');
const emailAuthDAO = require('../DAO/EmailAuthDAO');
const snsLoginDAO = require('../DAO/SnsLoginDAO');
const nodemailer = require('nodemailer');
const { decryptAES256, encryptSHA256 } = require('../commonModule/commonModule');
const userDAO = require('../DAO/user/UserDAO');

class UserService {
    constructor() {

    }

    async createUser(userObj,snsObj) {
        const hashPW = encryptSHA256(decryptAES256(userObj.user_pw));
        userObj.user_pw = hashPW;

        let result = await UserDAO.insertUserQuery(userObj);
        if(typeof snsObj !== "undefined") {
            const sns = {
                user_no : result.insertId,
                sns_type : userObj.user_permission,
                access_token : snsObj.access_token,
                refresh_token : snsObj.refresh_token
            }
            await snsLoginDAO.insertQuery(sns);
        }

        return result;
    }

    async checkDuplicateUserId(userId) {
        let result = await UserDAO.selectUserIdQuery(userId);
        return result.length <= 0 ? true : false;
    }

    async loginUser(userObj) {
        const userId = userObj.userId;
        const userPw = encryptSHA256(decryptAES256(userObj.userPw));
        
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

    async sendForgotAccountInfoMail(forgotInfo) {
        const { NODEMAILER_ID, NODEMAILER_PW } = process.env;
        let mailOptions = {
            from : NODEMAILER_ID
        };

        if(forgotInfo.forgotType == "id") {
            let result = await userDAO.selectForgotIDQuery(forgotInfo.user_name, forgotInfo.user_email);
            if(result.length <= 0)
                return "일치하는 회원이 없음";

            for(let i = 0; i < result.length; ++i) {
                let halfLen = result[i].user_id.length / 2;
                result[i].user_id = result[i].user_id.substr(0,halfLen) + ("*".repeat(halfLen));
            }
            
            mailOptions.subject = "마이디어 펫 아이디 찾기";
            mailOptions.html = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>
            </head>
            <body>`;
            mailOptions.html += "<div><h3>고객님의 정보와 일치하는 아이디 목록입니다.</h3>";
            mailOptions.html += "<ul style='width:400px; list-style:none;'>";
            for(let i = 0; i < result.length; ++i) {
                mailOptions.html += `
                    <li style="display:flex; justify-content: space-between; font-size:18px;">
                        <strong>${result[i].user_id}</strong>
                        <p>가입일 : ${result[i].user_joindate}</p>
                    </li>
                `;
            }
            mailOptions.html += '</div></body></html>';
        }
        else {
            let result = await userDAO.selectForgotPWQuery(forgotInfo.user_id, forgotInfo.user_email);
            if(result.length <= 0)
                return "일치하는 회원이 없음";
            
            // 비밀번호 초기화
            const randPW = Math.floor(Math.random() * (999999 - 111111 + 1)) + 111111;
            console.log(randPW);
            try {
                result = await userDAO.updateResetPWQuery(encryptSHA256(randPW), forgotInfo.user_id, forgotInfo.user_email);
            }
            catch(e) {
                return false;
            }
            
            mailOptions.subject = "마이디어 펫 비밀번호 찾기";
            mailOptions.html = `
                <h2>임시비밀번호 : ${randPW} </h2>
                <strong>로그인 후 반드시 비밀번호를 수정해주세요.</strong>
            `;
        }

        mailOptions.to = forgotInfo.user_email; 
        const transporter = nodemailer.createTransport({
            service: 'naver',
            host: 'smtp.naver.com',  // SMTP 서버명
            port: 465,  // SMTP 포트
            auth: {
                user: NODEMAILER_ID,
                pass: NODEMAILER_PW
            }
        });

        const result = await this.sendMail(transporter, mailOptions);
        if(result == false) {
            return false;
        }

        return true;
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