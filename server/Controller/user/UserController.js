const express = require('express');
const userRouter = express.Router();

userRouter.use(express.json({
    limit: '50mb'
}));

//const employeeDAO = require('./db/DAO/employeeDAO');
const UserSevice = require('../../Service/user/UserSevice');

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

userRouter.post('/join', async(req,res) =>{
    let user = req.body.user;
    try {
        console.log(user);
        const userService = new UserSevice();
        let result = await userService.createUser(user);
        console.log(result);
        res.send(result);
    }
    catch(e) {
        console.log(e);
    }  
});

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

// 파일 업로드 테스트용 코드
const multer = require('multer'); 
const path = require('path');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let folderName = '';
        if(file.fieldname == 'productImage/dog')
            folderName = 'uploads/productImage/dog';
        else if(file.fieldname == 'productImage/cat')
            folderName = 'uploads/productImage/cat';
        else if(file.fieldname == 'productDetailImage/dog')
            folderName = 'uploads/productDetailImage/dog';    
        else if(file.fieldname == 'productDetailImage/cat')
            folderName = 'uploads/productDetailImage/cat';    

        const uploadFolder = folderName;
        cb(null, uploadFolder);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage }).fields([
    { name: 'productImage/dog', maxCount: 1 },
    { name: 'productDetailImage/dog', maxCount: 1 },
    { name: 'productImage/cat', maxCount: 1 },
    { name: 'productDetailImage/cat', maxCount: 1 }
]);
userRouter.post('/upload', upload, (req, res) => {
    const {body, files} = req;
    console.log(body);
    console.log(files);
    // productName: '',
    //productPrice: '',
    //productStock: '',
    //productDesc: ''

    // 따로 DB INSERT후 처리
    res.status(200).send('OK');
});

module.exports = userRouter;