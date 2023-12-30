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

//판매자-상품 등록
productRouter.post


module.exports = productRouter;