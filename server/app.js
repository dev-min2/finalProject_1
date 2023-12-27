require('dotenv').config({ path : './config/mysql.env' });
require('dotenv').config({ path : './config/mail.env' });
require('dotenv').config({ path : './config/commonENV.env' });

const express = require('express');
const app = new express();
const session = require('express-session');
const fxExtra = require('fs-extra');

app.use('/uploads', express.static('uploads'));
app.use(express.json({limit : '50mb'}));
app.use(session({
    secret: 'petGoods', // 따로 env파일로 뺴두는게 정석
    resave: false,
    saveUninitialized: true,
    secure: false
}));
app.use(express.urlencoded({extended : false}));

// 라우터(컨트롤러)추가영역
const userController = require('./Controller/UserController');
const boardController = require('./Controller/BoardController');
const productController = require('./Controller/ProductController');
const fileController = require('./Controller/FileController');

app.use('/user', userController);
app.use('/board', boardController);
app.use('/product', productController);
app.use('/file', fileController);
//

app.listen(12532, () => {
    // temp 폴더내 파일들 삭제처리코드 여기서 삽입.
    fxExtra.emptyDirSync('./uploads/notice/tempAttachFile');
    fxExtra.emptyDirSync('./uploads/notice/temp');

    
    console.log('server lisening');
})

// 메인코드가져오는 건 여기서.
const mainCodeDAO = require('./DAO/MainCodeDAO');
app.post('/main-code', async(req, res) => {
    const mainCodeName = req.body.mainCodeName;
    let result = '';
    try {
        result = await mainCodeDAO.selectQuery(mainCodeName);
    }
    catch(e) {
        console.log(e);
    }
    if(result.length <= 0) {
        res.status(404).send('fail');
    }
    else {
        res.status(200).send(result);
    }
})

// 메인페이지 처리.
// 카테고리 정보, 현재 펫타입 정보, 메인 화면 상품리스트등을 받아감.
// app.get('/main', async (req, res) => {
//     let data = null;
//     console.log('요청왔음');
//     try {
//         data = await productDAO.selectQuery();
//     }
//     catch(e) {
//         console.log(e);
//     }
//     //res.header("Access-Control-Allow-Origin", "http://localhost:8080");
//     res.send(data);
// })
