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


module.exports = productRouter;