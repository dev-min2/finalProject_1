const express = require('express');
const productRouter = express.Router();
const ProductService = require("../Service/ProductService");


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
 


productRouter.get('/main', async (req, res) => {
    try {
        const productService = new ProductService();
        let ptype = req.query.type;
        let result = await productService.getMainpageProductList(ptype);
        res.send(result);
    } catch (e) {
        console.log(e);
    }
});

productRouter.get('/search', async (req, res) => {
    try {
        // /search?q='검색한거'
        const productService = new ProductService();
        let data = req.query.q;
        let ptype = req.query.type;
        let pageno = req.query.pageno;
        const result = await productService.getSearchResultCnt(data, ptype, pageno);
        res.send(result);
    } catch (e) {
        console.log(e);
    }
});

//서비스 객체 생성 - 함수안에 category dao 갖구와서 보냄
productRouter.get('/category', async (req, res) => {
    try {
        const productService = new ProductService();
        let result = await productService.getCategoryData();
        res.send(result);
    } catch (e) {
        console.log(e);
    }
});

// 카테고리 -> 검색으로 넘어가는 라우터(카테고리 번호를 받아와야함)
productRouter.get('/search/category', async (req, res) => {
    try {
        const productService = new ProductService();
        let data = req.query.cno;
        let ptype = req.query.type;
        let pageno = req.query.pageno;
        const result = await productService.getCategoryProductCnt(data, ptype, pageno);
        res.send(result);
    } catch (e) {
        console.log(e);
    }
});

//신상품
productRouter.get('/search/newproduct', async (req, res)=>{
    try{
        const productService = new ProductService();
        let ptype = req.query.type;
        let pageno = req.query.pageno;
        const result = await productService.getNewProductList(ptype, pageno);
        res.send(result);
    } catch (e){
        console.log(e);
    }
});
//베스트
productRouter.get('/search/bestproduct', async (req, res)=>{
    try{
        const productService = new ProductService();
        let ptype = req.query.type;
        let pageno = req.query.pageno;
        const result = await productService.getBestProductList(ptype, pageno);
        res.send(result);
    } catch (e){
        console.log(e);
    }
});
//추천
productRouter.get('/search/recproduct', async (req, res)=>{
    try{
        const productService = new ProductService();
        let ptype = req.query.type;
        let pageno = req.query.pageno;
        const result = await productService.getRecProductList(ptype, pageno);
        res.send(result);
    } catch (e){
        console.log(e);
    }
});
module.exports = productRouter;