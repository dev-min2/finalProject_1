const express = require('express');
const productRouter = express.Router();
const ProductService = require('../Service/ProductService');

// productRouter.get('/seller-main/:userNo',async(req,res)=>{
//         let userNo = req.params.userNo;
//         try {
//             console.log('하이여');
//             const productService = new ProductService();
//             let result = await productService.myProductRank(userNo);
//             console.log(result);
//             res.send(result);
//         }
//         catch(e) {
//             console.log(e);
//         }
// })

// productRouter.get('/seller-main2/:userNo',async(req,res)=>{
//     let userNo = req.params.userNo;
//     try {
//         console.log('하이여2');
//         const productService = new ProductService();
//         let result = await productService.myProductPayRank(userNo);
//         console.log(result);
//         res.send(result);
//     }
//     catch(e) {
//         console.log(e);
//     }
// })


//판매자 기간지정 상품조회
//오늘 날짜 조회
productRouter.get('/seller-main/:userNo/:period/:minprice/:maxprice',async(req,res)=>{
    //let userNo = req.params.userNo;
    let period = req.params.period;
    
    const userNo = 1;
    //req.session.userNo;
    try {     
        const productService = new ProductService();
        //1일조회
        if(period == "0") {
            result = await productService.selectQueryByPeriod(userNo,period);
        }
        //1주조회
        else if(period == "1") {
            result = await productService.selectQueryByPeriod(userNo,period);
        }
        //1달조회
        else if(period == "2") {
            result = await productService.selectQueryByPeriod(userNo,period);
        }
        //3달조회
        else if(period == "3") {
            result = await productService.selectQueryByPeriod(userNo,period);
        }
        //6달조회
        else if(period == "4") {
            result = await productService.selectQueryByPeriod(userNo,period);
        }
        console.log(result);
        res.send(result);
    }
    catch(e) {
        console.log(e);
    }
})

module.exports = productRouter;