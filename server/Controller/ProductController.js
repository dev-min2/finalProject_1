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

 //주문 전체 취소
 productRouter.put('/paymentdetail/cancel/:paymentNo', async(req, res)=>{
    let data = req.params.paymentNo;
    console.log('prdController주문전체취소!' ,data);
    try{
        const productService = new ProductService();
        let result = await productService.cancelAllPayment(data);
        res.send(result);
    }
    catch(e){
        console.log(e);
    }
 })

 
 //주문 전체 내역 불러오기
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


 //주문 전체내역 불러오기 2
 productRouter.get('/paymentdetail/all/:userNo', async(req, res) => {
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
 
 //주문 상세 내역 불러오기
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
//장바구니 추가
productRouter.post('/productDetail', async (req, res) => {
    let productNo = req.body.pno;
    let productSelCnt = req.body.cnt;
    let userNo = req.body.userNo
    try {
        const productService = new ProductService();
        result = await productService.addCart(productNo, productSelCnt, userNo);
        res.send(result);
    } catch (err) {
        console.log(err);
    }   
});
productRouter.get('/productDetail/:userNo/:productNo', async (req, res) => {
    let userNo = req.params.userNo;
    let productNo = req.params.productNo;
    try {
        const productService = new ProductService();
        let result = await productService.showCartInfo(userNo, productNo);
        res.send(result);
    } catch (err) {
        console.log(err);
    }
});
productRouter.post('/wish', async(req, res) => {
    let productNo = req.body.pno;
    let userNo = req.body.uno
    try {
        const productService = new ProductService();
        result = await productService.addWish(productNo, userNo);
        res.send(result);
    } catch (err) {
        console.log(err);
    }   
});
productRouter.get('/wish/:userNo', async (req, res) => {
    let userNo = req.params.userNo
    try {
        const productService = new ProductService();
        let result = await productService.wishInfo(userNo);
        res.send(result);
    } catch (err) {
        console.log(err);
    }
});
productRouter.delete('/wish/:userNo/:productNo', async (req, res) => {
    let userNo = req.params.userNo;
    let productNo = req.params.productNo;
    try {
        const productService = new ProductService();
        let result = await productService.delWish(userNo, productNo);
        res.send(result);
    }catch (err) {
        console.log(err);
    }
});


productRouter.get('/productdetails/review/:productNo/:pageNo', async(req, res)=>{
    try {
        let productNo = req.params.productNo;
        let userNo = req.session.userNo;
        let pageNo = req.params.pageNo;
        const productService = new ProductService();
        const result = await productService.showReviewListCnt(productNo, pageNo);
        res.send(result);
    }catch(e){
        console.log(e);
    }
});

productRouter.put('/productdetails/review/:reviewNo/:productNo', async(req, res)=>{
    try{
        let reviewNo = req.params.reviewNo;
        let productNo = req.params.productNo;
        let userNo = req.session.userNo;
        const productService = new ProductService();
        const result = await productService.addReviewLikeCnt(reviewNo, userNo, productNo);
        res.send(result);
    }catch(e){
        console.log(e);
    }
});



module.exports = productRouter;