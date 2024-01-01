const express = require('express');
const productRouter = express.Router();
const ProductService = require('../Service/ProductService');


//판매자 기간지정 상품조회

productRouter.get('/seller-main/:userNo/:period/:minPrice/:maxPrice',async(req,res)=>{
    //let userNo = req.params.userNo;
    let period = req.params.period;
    let minPrice = req.params.minPrice;
    let maxPrice = req.params.maxPrice;
    console.log(minPrice);
    console.log(typeof minPrice);
    
    const userNo = 1;
    //req.session.userNo;
    try {     
        const productService = new ProductService();
        //1일조회
        if(period == "0",minPrice,maxPrice) {
            result = await productService.selectQueryByPeriod(userNo,period,minPrice,maxPrice);
        }
        //1주조회
        else if(period == "1",minPrice,maxPrice) {
            result = await productService.selectQueryByPeriod(userNo,period,minPrice,maxPrice);
        }
        //1달조회
        else if(period == "2",minPrice,maxPrice) {
            result = await productService.selectQueryByPeriod(userNo,period,minPrice,maxPrice);
        }
        //3달조회
        else if(period == "3",minPrice,maxPrice) {
            result = await productService.selectQueryByPeriod(userNo,period,minPrice,maxPrice);
        }
        //6달조회
        else if(period == "4",minPrice,maxPrice) {
            result = await productService.selectQueryByPeriod(userNo,period,minPrice,maxPrice);
        }
        res.send(result);
    }
    catch(e) {
        console.log(e);
    }
})

//판매자-내 상품 전체 조회
productRouter.get('/SellerProductList/:userNo',async(req,res)=>{
   // let userNo = req.params.userNo;
    const userNo = 1;
 try{
    const productService = new ProductService();
    result = await productService.getMyProductList(userNo);
    console.log(result);
    res.send(result);
    
 }
 catch(e){
    console.log(e)
 }
})

//판매자-상품 등록
productRouter.post('/uploadProduct',async(req,res)=>{
    let data=request.body.param
     
    try{
        const productService = new ProductService();
        result = await productService.uploadProduct(data);
            res.send(result);
    }catch(e){
        console.log(e)
    }
})

//판매자 - 리뷰 조회
productRouter.get('/SellerReviewList/:userNo',async(req,res)=>{
    // let userNo = req.params.userNo;
     const userNo = 1;
  try{
     const productService = new ProductService();
     result = await productService.getSellerReview(userNo);
     console.log(result);
     res.send(result);
     
  }
  catch(e){
     console.log(e)
  }
 })

 //판매자-리뷰 삭제
 productRouter.get('/SellerReviewList/:reviewNo',async(req,res)=>{
     let reviewNo = req.params.reviewNo;
  try{
     const productService = new ProductService();
     result = await productService.removeSellerReview(reviewNo);
     
     res.send(result);
     
  }
  catch(e){
     console.log(e)
  }
 })

 //판매자 - 리뷰 검색
 productRouter.get('/SellerReviewList/:userNo/:search',async(req,res)=>{
    let search = req.params.search;
 try{
    const productService = new ProductService();
    result = await productService.searchSellerReview(search);
    
    res.send(result);
    
 }
 catch(e){
    console.log(e)
 }
})

//판매자 - 배송 조회
productRouter.get('/SellerDelivery/:userNo',async(req,res)=>{
    // let userNo = req.params.userNo;
     const userNo = 1;
  try{
     const productService = new ProductService();
     result = await productService.sellerDelivery(userNo);
     res.send(result);
     
  }
  catch(e){
     console.log(e)
  }
 })

 //판매자 - 배송 조회-회원이름으로 검색
productRouter.get('/sellerDeliverySearchUserName/:search',async(req,res)=>{
    // let userNo = req.params.userNo;
    // const userNo = 1;
    const search = req.params.search;
  try{
     const productService = new ProductService();
     result = await productService.sellerDeliverySearchUserName(search);
     res.send(result)
     
  }
  catch(e){
     console.log(e)
  }
 
 })



module.exports = productRouter;