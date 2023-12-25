const express = require('express');
const productRouter = express.Router();

productRouter.get('/main', async (req, res) => {
    try {

        const productList = new ProductList();
        let result = await productList.createProduct(product);
        res.send(result);
    } catch (e) {
        console.log(e);
    }
});


module.exports = productRouter;