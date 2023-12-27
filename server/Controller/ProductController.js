const express = require('express');
const productRouter = express.Router();
const ProductService = require("../Service/ProductService");

productRouter.get('/main', async (req, res) => {
    try {
        const productService = new ProductService();
        let result = await productService.getMainpageProductList();
        console.log(result);
        res.send(result);
    } catch (e) {
        console.log(e);
    }
});

productRouter.get('/search', async(req, res)=>{
    try{
        // /search?q='검색한거'
        const productService = new ProductService();
        let data = req.query.q;
        let ptype = req.query.type;
        let result = await productService.getSearchProductList(data,ptype);
        res.send(result);
    }
    catch(e){
        console.log(e);
    }
});

//서비스 객체 생성 - 함수안에 category dao 갖구와서 보냄
productRouter.get('/category', async(req, res)=>{
    try{
        const productService = new ProductService();
        let result = await productService.getCategoryData();
        res.send(result);
    }
    catch(e){
        console.log(e);
    }
})
module.exports = productRouter;