const express = require("express");
const userRouter = express.Router();

const UserService = require("../Service/UserService");


//경석-마이페이지 내 쿠폰조회
userRouter.get('/myCoupon/:userNo/:pageNo', async(req, res)=>{
    const pageNo = req.params.pageNo;
    const userNo = 1;
    //let userNo = req.params.userNo;
    try{
        const userService = new UserService();
        const result = await userService.getMyCoupon(userNo,pageNo);
        res.send(result);
    }catch(e) {
        console.log(e);
    }
});

//마이페이지-내 반려동물관리
userRouter.get('/mypetinfo/:userNo', async(req,res)=>{ //전체조회
    let userNo = req.params.userNo;
    try{
        const userService = new UserService();
        let result = await userService.getMyCoupon(userNo);
        //console.log('test',result);
        res.send(result);
    }
    catch(e){
        console.log(e);
    }
});

userRouter.get('/mypetform/:petNo', async(req,res)=>{ //해당유저 전체조회
    let petNo = req.params.petNo;
    try{
        const userService = new UserService();
        let result = await userService.getPetInfo(petNo);
        res.send(result);
    }
    catch(e){
        console.log(e);
    }
});

userRouter.post('/mypetform', async(req, res)=>{
    let data = req.body.param;
    try{
        const userService = new UserService();
        let result = await userService.createPet(data);
        res.send(result);
    }catch(e){
        console.log(e);
    }
})

userRouter.put('/mypetform/:petNo', async(req, res)=>{
    let data = req.body.param;
    let petNo = req.params.petNo;
    console.log(req.body,req.params);
    try{
        const userService = new UserService();
        let result = await userService.updatePet(data,petNo);
        res.send(result);
    }catch(e){
        console.log(e);
    }
})

userRouter.delete('/mypetinfo/:petNo', async(req, res)=>{
    let data = req.params.petNo;
    try{
        const userService = new UserService();
        let result = await userService.deletePet(data);
        res.send(result);
    }catch(e){
        console.log(e);
    }

})

//user 기본기능
userRouter.post('/join', async(req,res) =>{
    let user = req.body.user;
    let sns = req.body.sns;
    try {
        const userService = new UserService();
        let result = await userService.createUser(user,sns);
        res.send(result);
    }
    catch(e) {
        console.log(e);
    } 
});

userRouter.post('/checkId', async (req, res) => {
    let id = req.body.id;
    try {
        const userService = new UserService();
        let result = await userService.checkDuplicateUserId(id);
        res.send(result);
    }
    catch(e) {
        console.log(e);
    }
})

userRouter.post('/login', async(req,res) =>{
    let user = req.body.user;
    try {
        const userService = new UserService();
        let result = await userService.loginUser(user);
        if(result.length > 0) {
            req.session.userNo = result[0].user_no; //session저장
            req.session.userName = result[0].user_name;
            console.log(req.session.userName);
        }
        res.send(result);
    }
    catch(e) {
        console.log(e);
    }  
});

userRouter.get("/logout", async (req, res) => {
    req.session.destroy((err) => {
    if (err) {
        console.log(err);
        res.status(500).send("Error");
    } 
    else {
        res.status(200).send("OK");
    }});
});

userRouter.post('/email-auth', async(req, res) => {
    const email = req.body.email;
    const isCreateAccount = req.body.isCreateAccount;
    console.log(email);
    try {
        const userService = new UserService();
        let result = await userService.createEmailAuthInfo(email,isCreateAccount);
        res.send(result);
    }
    catch(e) {
        console.log(e);
    }
})

userRouter.post('/email-auth/confirm', async(req, res) => {
    let { email, authcode } = req.body;
    try {
        const userService = new UserService();
        let result = await userService.confirmEmailAuth(email,authcode);
        res.send(result);
    }
    catch(e) {
        console.log(e);
    }
})

userRouter.post('/forgot-account', async(req, res) => {
    let forgotInfo = req.body.forgotInfo;
    try {
        const userService = new UserService();
        let result = await userService.sendForgotAccountInfoMail(forgotInfo);
        if(result === "일치하는 회원이 없음") {
            res.status(500).send("일치하는 회원이 없음");
            return;
        }

        if(result) {
            res.status(200).send("OK");
        }
        else {
            res.status(500).send("FAIL");
        }
    }
    catch(e) {
        console.log(e);
    }
})
//하랑
userRouter.get('/carts/:userNo', async (req, res) => {
    let userNo = req.params.userNo;
    try {
        console.log(userNo);
        const userService = new UserService();
        let result = await userService.showCart(userNo);
        res.send(result);
    } catch (error) {
        console.log(error);
    }
})

userRouter.get('/cart-count/:userNo', async (req, res) => {
    let userNo = req.params.userNo;
    try {
        console.log(userNo);
        const userService = new UserService();
        let result = await userService.showCartCount(userNo);
        res.send(result);
    } catch (err) {
        console.log(err);
    }
})

userRouter.put('/carts/:productNo/:updown', async (req, res) => {
    let productNo = req.params.productNo;
    let updownState = req.params.updown;
    try {
        console.log(productNo);
        const userService = new UserService();
        let result = [];
        if (updownState == "up") {
            result = await userService.UpCnt(productNo);
        }
        else {
            result = await userService.DownCnt(productNo);
        }
        if (result == null) {
            res.send("알림");
            return;
        }
        res.send(result);
    } catch (err) {
        console.log(err);
    }
})
userRouter.delete('/carts/:userNo/:productNo', async (req, res) => {
    let userNo = req.params.userNo;
    let productNo = req.params.productNo;
    try {
        const userService = new UserService();
        result = await userService.DelProd(userNo, productNo);
        res.send(result);
        }catch(err) {
            console.log(err);
        }
})

userRouter.get('/info', async(req, res) => {
    const userNo = req.query.userNo;
    try {
        const userService = new UserService();
        const result = await userService.getUserInfo(userNo);
        res.status(200).send(result);
    }
    catch(e) {
        console.log(e);
        res.status(500).send("FAIL");
    }
});

userRouter.put('/info', async(req, res) => {
    const userObj = req.body;
    try {
        const userService = new UserService();
        const result = await userService.modifyUserInfo(userObj);
        if(result)
            res.status(200).send("OK");
        else
            res.status(403).send("FAIL");
    }
    catch(e) {
        console.log(e);
        res.status(500).send("FAIL");
    }
});

//작성한 리뷰 목록
userRouter.get('/myreview', async(req, res)=>{
    const userNo = req.query.userNo;
    const pageNo = req.query.pageNo;
    try{
        const userService = new UserService();
        const result = await userService.getMyReviewList(userNo,pageNo);
        res.send(result);
    }catch(e) {
        console.log(e);
    }
});

//리뷰 작성하기



userRouter.put('/password', async(req, res) => {
    try {
        const userService = new UserService();
        const result = await userService.changePassword(req.body);
        res.send(result);
    }   
    catch(e) {
        console.log(e);
        res.status(500).send("FAIL");
    }
})

userRouter.put('/leave', async(req, res) => {
    const userNo = req.session.userNo;
    try {
        const userService = new UserService();
        const result = await userService.leaveAccount(userNo);
        res.send(result);
    }
    catch(e) {
        console.log(e);
    }
})

userRouter.put('/cancel-leave', async(req,res) => {
    const userNo = req.body.userNo;
    try {
        const userService = new UserService();
        const  result = await userService.cancleLeaveAccount(userNo);
        res.status(200).send(result)
    }
    catch(e) {
        console.log(e);
    }
})

userRouter.get('/subcode', async(req, res) => {
    try {
        const userService = new UserService();
        const result = await userService.getSubcode();
        res.status(200).send(result);
    }
    catch(e) {
        console.log(e);
    }
})

// 파일 업로드 테스트용 코드
const multer = require("multer");
const path = require("path");
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         let folderName = '';
//         if(file.fieldname == 'productImage/dog')
//             folderName = 'uploads/productImage/dog';
//         else if(file.fieldname == 'productImage/cat')
//             folderName = 'uploads/productImage/cat';
//         else if(file.fieldname == 'productDetailImage/dog')
//             folderName = 'uploads/productDetailImage/dog';
//         else if(file.fieldname == 'productDetailImage/cat')
//             folderName = 'uploads/productDetailImage/cat';

//         const uploadFolder = folderName;
//         cb(null, uploadFolder);
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.originalname);
//     }
// });

// const upload = multer({ storage: storage }).fields([
//     { name: 'productImage/dog', maxCount: 1 },
//     { name: 'productDetailImage/dog', maxCount: 1 },
//     { name: 'productImage/cat', maxCount: 1 },
//     { name: 'productDetailImage/cat', maxCount: 1 }
// ]);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadFolder = "uploads/productDescInImg/";
    // productimg/sellerno/파일이름 으로 해야할듯.
    // 해당 폴더가 있는지 체크하고 없다면 mkdir처리가 필요할듯
    cb(null, uploadFolder);
  },
  filename: function (req, file, cb) {
    cb(null, new Date().getTime() + file.originalname);
  },
});
const upload = multer({ storage: storage });
userRouter.post("/upload", upload.single("image"), (req, res) => {
  const { body, files } = req;
  console.log(body);
  console.log(files);
  // productName: '',
  //productPrice: '',
  //productStock: '',
  //productDesc: ''

  // 따로 DB INSERT후 처리
  console.log(req.file);
  res.status(200).send(req.file.filename);
});

// 실제 게시글 등록

const multer2 = require('multer'); 
const storage2 = multer2.diskStorage({
  destination: function (req, file, cb) {
    let folderName = "";
    if (file.fieldname == "productImage/dog")
      folderName = "uploads/productImage/dog";
    else if (file.fieldname == "productImage/cat")
      folderName = "uploads/productImage/cat";
    const uploadFolder = folderName;
    cb(null, uploadFolder);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload2 = multer2({ storage: storage2 }).fields([
  { name: "productImage/dog", maxCount: 1 },
  { name: "productImage/cat", maxCount: 1 },
]);

userRouter.post("/uploadProduct", upload2, async (req, res) => {
  const { body, files } = req;
  console.log(body);
  console.log(files);

  try {
    const userService = new UserService();
    let filename = "";
    if (typeof files["productImage/dog"][0].originalname != "undefined")
      filename = files["productImage/dog"][0].originalname;
    else filename = files["productImage/cat"][0].originalname;

    let result = await userService.testUpload(body.deschtml, filename);
    res.send(result);
  } catch (e) {
    console.log(e);
  }
});

/*
CREATE TABLE `productTest` (
	`pr_no` INT PRIMARY KEY AUTO_INCREMENT,
    `product_desc` varchar(5000) not null,
    `product_img` varchar(100) not null
);
위 테이블 구조로 테스트했음. 폼에서 petType, categoryNo,productName,productPrice,productStock
정보도 보내니 실제 테이블에 넣을때는 저 데이터 넣어주면 됨
*/

userRouter.get("/testProductInfo", async (req, res) => {
  try {
    const userService = new UserService();
    console.log("요청옴");
    let result = await userService.testData();
    console.log(result);
    res.send(result);
  } catch (e) {
    console.log(e);
  }
});

module.exports = userRouter;
