const express = require('express');
const productRouter = express.Router();
const ProductService = require("../Service/ProductService");


//결제폼-회원정보,쿠폰,장바구니 같이 불러오기
productRouter.get('/paymentform', async(req, res)=>{
    let userNo = req.query.userNo;
    let cartList = req.query.cno;
    try{
        const productService = new ProductService();
        let result = await productService.getUserPaymentInfo(userNo, cartList);
        res.send(result);
    }
    catch(e){
        console.log(e);
    }
})

//결제 완료 처리
 productRouter.post('/payment', async(req, res) => {
    let data = req.body.param;

    console.log(data);
    try{
        const productService = new ProductService();
        let result 
            = await productService.completePayment(data.paymentObj, data.paymentData, data.userNo, data.cartNo, data.couponNo);
        res.send(result);
    }
    catch(e){
        console.log(e);
    }
 })

//주문 전체 취소 테이블 처리
 productRouter.post('/paymentdetail/cancel', async(req, res)=>{
    let paymentNo = req.body.param.paymentNo;
    const impUid = req.body.param.impUid;
    const cancelRequestAmount= req.body.param.cancelRequestAmount;
    const cancelableAmount= req.body.param.cancelableAmount;    

    console.log('prdController주문전체취소!',paymentNo);
    try{
        const productService = new ProductService();
        let result = await productService.cancelAllPayment(paymentNo, impUid, cancelRequestAmount, cancelableAmount);
        res.send(result);
    }
    catch(e){
        console.log(e);
    }
 })

 //주문 일부 취소 테이블처리
 productRouter.put('/paymentdetail/cancelselect/:paymentProductNo', async(req, res)=>{
    let data = req.params.paymentProductNo;
    console.log('prdController주문부분취소!', data);
    try{
        const productService = new ProductService();
        let result = await productService.cancelSelectPayment(data);
        console.log('빠샤', result);
        res.send(result);
    }
    catch(e){
        console.log(e);
    }
 })

 
//주문 전체 내역 리스트 불러오기 (전체페이지)
 productRouter.get('/orderdetail/:userNo', async(req, res) => {
    let userNo = req.params.userNo;
    try{
        const productService = new ProductService();
        let result = await productService.getPaymentList(userNo);
        res.send(result);
    }
    catch(e){
        console.log(e);
    }
 })


//주문 전체내역 단건 조회(상세페이지)
 productRouter.get('/paymentdetail/all/:userNo', async(req, res) => {
    let userNo = req.params.userNo;
    try{
        const productService = new ProductService();
        let result = await productService.getPaymentInfo(userNo);
        res.send(result);
    }
    catch(e){
        console.log(e);
    }
 })
 
 //주문 상세 내역 불러오기 (상세페이지)
 productRouter.get('/paymentdetail/:paymentNo', async(req,res) => {
    let paymentNo = req.params.paymentNo;
    try{
        const productService = new ProductService();
        let result = await productService.getPaymentDetail(paymentNo);
        res.send(result);
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
//하랑
productRouter.get('/productDetail', async (req, res) => {
    let productNo = req.query.pno;
    try {
        const productService = new ProductService();
        let result = await productService.showProdDetail(productNo);
        res.send(result);
    } catch (err) {
        console.log(err);
    }
});
module.exports = productRouter;