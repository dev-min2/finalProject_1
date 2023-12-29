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

module.exports = productRouter;