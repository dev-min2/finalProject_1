const express = require('express');
const productRouter = express.Router();

const ProductService = require('../Service/ProductService');

//결제폼-장바구니 리스트
productRouter.get('/paymentform/:userNo', async(req, res)=>{ 
    let userNo = req.params.userNo;
    try{
        const productService = new ProductService();
        let result = await productService.getCartList(userNo);
        console.log('ProductControll', result);
        res.send(result);
    }catch(e){
        console.log(e);
    }
 });

 //결제 완료 처리
 //(1) 결제 정보 넣기
 productRouter.post('/paymentform', async(req, res) => {
    let data = req.body.param;
    try{
        const productService = new ProductService();
        let result 
            = await productService.completePayment(paymentObj, paymentData, userNo);
        console.log('ProController 확인!!', result);
        //res.send(result);
    }
    catch(e){
        console.log(e);
    }
 })
 

module.exports = productRouter;