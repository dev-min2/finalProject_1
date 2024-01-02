const express = require('express');
const productRouter = express.Router();
const ProductService = require("../Service/ProductService");

productRouter.get('/main', async (req, res) => {
    try {
        const productService = new ProductService();
        let ptype = req.query.type;
        let result = await productService.getMainpageProductList(ptype);
        console.log(result);
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
        console.log(data);
        console.log(ptype);
        console.log(pageno);

        const result = await productService.getCategoryProductCnt(data, ptype, pageno);
        console.log(result);
        res.send(result);
    } catch (e) {
        console.log(e);
    }
});
module.exports = productRouter;