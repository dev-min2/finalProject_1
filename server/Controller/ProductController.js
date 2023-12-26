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
        let result = await productService.getSearchProductList(data);
        res.send(result);
    }
    catch(e){
        console.log(e);
    }
})
module.exports = productRouter;