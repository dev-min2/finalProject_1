const express = require('express');
const productRouter = express.Router();
const ProductService = require('../Service/ProductService');

productRouter.get('/seller-main/:userNo',async(req,res)=>{
        let userNo = req.params.userNo;
        try {
            console.log('하이여');
            const productService = new ProductService();
            let result = await productService.myProductRank(userNo);
            console.log(result);
            res.send(result);
        }
        catch(e) {
            console.log(e);
        }
})

module.exports = productRouter;