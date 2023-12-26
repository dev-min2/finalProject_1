const express = require('express');
const userRouter = express.Router();

const UserSevice = require('../Service/UserSevice');

//마이페이지
userRouter.get('/mypetinfo/:userNo', async(req,res)=>{
    let userNo = req.params.userNo;
    try{
        const userService = new UserService();
        let result = await userService.getPetInfo(userNo);
        console.log(result);
        //res.send(result);
    }
    catch(e){
        console.log(e);
    }
});

//user 기본기능
userRouter.post('/join', async(req,res) =>{
    let user = req.body.user;
    let sns = req.body.sns;
    try {
        const userService = new UserSevice();
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
        const userService = new UserSevice();
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
        const userService = new UserSevice();
        let result = await userService.loginUser(user);
        if(result.length > 0) {
            req.session.userNo = result[0].user_no; //session저장
        }
        res.send(result);
    }
    catch(e) {
        console.log(e);
    }  
});

userRouter.get('/logout', async(req,res) => {
    req.session.destroy((err) => {
        if(err) {
            console.log(err);
            res.status(500).send('Error');
        }
        else {
            res.status(200).send("OK");
        }
    })
})

userRouter.post('/email-auth', async(req, res) => {
    let email = req.body.email;
    console.log(email);
    try {
        const userService = new UserSevice();
        let result = await userService.createEmailAuthInfo(email);
        res.send(result);
    }
    catch(e) {
        console.log(e);
    }
})

userRouter.post('/email-auth/confirm', async(req, res) => {
    let { email, authcode } = req.body;
    try {
        const userService = new UserSevice();
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

// 파일 업로드 테스트용 코드
const multer = require('multer'); 
const path = require('path');
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
        const uploadFolder = 'uploads/productDescInImg/';
        // productimg/sellerno/파일이름 으로 해야할듯.
        // 해당 폴더가 있는지 체크하고 없다면 mkdir처리가 필요할듯
        cb(null, uploadFolder);
    },
    filename: function (req, file, cb) {
        cb(null, new Date().getTime() + file.originalname);
    }
});
const upload = multer({ storage: storage });
userRouter.post('/upload', upload.single('image'), (req, res) => {
    const {body, files} = req;
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
const UserService = require('../Service/UserSevice');
const storage2 = multer2.diskStorage({
    destination: function (req, file, cb) {
        let folderName = '';
        if(file.fieldname == 'productImage/dog')
            folderName = 'uploads/productImage/dog';
        else if(file.fieldname == 'productImage/cat')
            folderName = 'uploads/productImage/cat';
        const uploadFolder = folderName;
        cb(null, uploadFolder);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload2 = multer2({ storage: storage2 }).fields([
    { name: 'productImage/dog', maxCount: 1 },
    { name: 'productImage/cat', maxCount: 1 }
]);

userRouter.post('/uploadProduct',upload2,async(req,res) => {
    const {body, files} = req;
    console.log(body);
    console.log(files);

    try {
        const userService = new UserSevice();
        let filename = '';
        if((typeof files['productImage/dog'][0].originalname) != "undefined")
            filename = files['productImage/dog'][0].originalname;
        else
            filename = files['productImage/cat'][0].originalname;

        let result = await userService.testUpload(body.deschtml, filename);
        res.send(result);
    }
    catch(e) {
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

userRouter.get('/testProductInfo', async(req, res) => {
    try {
        const userService = new UserSevice();
        console.log('요청옴');
        let result = await userService.testData();
        console.log(result);
        res.send(result);
    }   
    catch(e) {
        console.log(e);
    }
})

module.exports = userRouter;