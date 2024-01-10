const UserDAO = require('../DAO/user/UserDAO');
const emailAuthDAO = require('../DAO/EmailAuthDAO');
const snsLoginDAO = require('../DAO/SnsLoginDAO');
const nodemailer = require('nodemailer');
const { decryptAES256, encryptSHA256 } = require('../commonModule/commonModule');
const userDAO = require('../DAO/user/UserDAO');
const myCartDAO = require('../DAO/user/MyCartDAO');
const mainCodeDAO = require('../DAO/MainCodeDAO');

//마이페이지
const myPetDAO = require('../DAO/user/MyPetDAO');
const reviewDAO = require('../DAO/user/ReviewDAO');
const PageDTO = require("../commonModule/PageDTO");
const CouponDAO = require('../DAO/product/CouponDAO');


class UserService {
    constructor() {

    }

    //경석 마이페이지-내 쿠폰 조회
    async getMyCoupon(couponType,userNo,pageNo){
        const result = await CouponDAO.selectMyCouponQuery(couponType,userNo,pageNo);
        const cntResult = await CouponDAO.selectMyCouponQueryCnt(couponType,userNo);
        const pageDTO = new PageDTO(cntResult[0].CNT, Number(pageNo), 10);
        const resResult = {
            selectResult: result,
            pageDTO: pageDTO
        }
        return resResult;
    }
    //마이페이지-내반려동물정보
    async getPetList(userNo){
        const result = await myPetDAO.selectPetQuery(userNo);
        return result;
    }

    async getPetInfo(petNo){
        const result = await myPetDAO.infoPetQuery(petNo);
        return result;
    }

    async createPet(petObj){
        let result = await myPetDAO.insertPetQuery(petObj);
        return result;
    }

    async updatePet(petObj,petNo){
        let result = await myPetDAO.updatePetQuery(petObj,petNo);
        return result;
    }

    async deletePet(petNo){
        let result = await myPetDAO.deletePetQuery(petNo);
        return result;
    }

    //user 기본기능
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

    async createEmailAuthInfo(email,isCreateAccount) {
        console.log(email);
        console.log(isCreateAccount);
        if(isCreateAccount) {
            const cnt = await emailAuthDAO.selectEmailCountQuery(email);
            if(cnt[0].cnt >= 5) {
                return '0';
            }
        }
        
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
            return '1';
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
            return '1';
        }

        if(insertResult.affectedRows > 0) {
            return '2';
        }
        else {
            return '1';
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
                let halfLen = Math.floor(result[i].user_id.length / 2);
                result[i].user_id = result[i].user_id.substr(0,halfLen) + ("*".repeat(result[i].user_id.length - halfLen));
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
    //하랑
    async showCart(user_no) {
        let result = await myCartDAO.showCartQuery(user_no);
        return result;
    }
    async showCartCount(user_no) {
        let result = await myCartDAO.showCartCountQuery(user_no);
        console.log(result);
        return result[0];
    }
    async UpCnt(product_no) {
        let stock = await myCartDAO.selectProductStockQuery(product_no);
        if ((stock[0].product_stock - stock[0].product_sel_cnt) <= 0) {
            return null;
        }
        let result = await myCartDAO.upCntQuery(product_no);
        return result;
    }
    async DownCnt(product_no) {
        let cnt = await myCartDAO.selectProductStockQuery(product_no);
        if ((cnt[0].product_sel_cnt) <= 1) {
            return null;
        }
        let result = await myCartDAO.downCntQuery(product_no);
        return result;
    }
    async DelProd(user_no, product_no) {
        let result = await myCartDAO.deleteProductQuery(user_no, product_no);
        return result;
    }

    async getUserInfo(userNo) {
        const result = await userDAO.selectUserInfoQuery(userNo);
        return result[0];
    }

    async modifyUserInfo(userObj) {
        const result = await userDAO.updateUserInfoQuery(userObj);
        if(result.affectedRows > 0)
            return true;
        else
            return false;
    }
    // 내 리뷰 내역 조회
    async getMyReviewList(userNo, pageNo){
        const result = await reviewDAO.selectReviewListQuery(userNo, pageNo);
        const countResult = await reviewDAO.selectReviewCntQuery(userNo);
        const pageDTO = new PageDTO(countResult[0].cnt, Number(pageNo), 10);
        const resResult = {
            selectResult: result,
            pageDTO: pageDTO
        }
        console.log(pageDTO);
        return resResult;
    }

    async changePassword(object) {
        const { user_no, prevPassword, nextPassword } = object;
        
        const hashPrevPW = encryptSHA256(decryptAES256(prevPassword));
        const hashNextPW = encryptSHA256(decryptAES256(nextPassword));
        const checkPassword = await userDAO.selectUserPasswordQuery(hashPrevPW, user_no);
        if(checkPassword.length <= 0) {
            return "FAIL";
        }
        
        const result = await userDAO.updateUserPasswordQuery(hashPrevPW,user_no,hashNextPW);
        if(result.affectedRows > 0) {
            return true;
        }
        else {
            return false;
        }
    }

    async leaveAccount(userNo) {   
        const result = await userDAO.updateUserLeaveDateQuery(userNo);
        return result;
    }

    async cancleLeaveAccount(userNo) {
        const result = await userDAO.updateUserNullLeaveDateQuery(userNo);
        return result;
    }

    async getSubcode() {
        const result = await mainCodeDAO.selectSubcodeQuery();
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