require('dotenv').config({ path : './config/mysql.env' });

const express = require('express');
const app = new express();
const session = require('express-session');

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
const userController = require('./Controller/user/UserController');
app.use('/user',userController);

app.listen(12532, () => {
    console.log('server lisening');
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