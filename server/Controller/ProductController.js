const express = require('express');
const productRouter = express.Router();

productRouter.get('/main', async(req,res) =>{
    let product = req.body.user;
    try {
        // const userService = new UserSevice();
        // let result = await userService.createUser(product);
        // res.send(result);
        const productList = new ProductList();
        let result = await productList.createProduct(product);
        res.send(result);
    }
    catch(e) {
        console.log(e);
    }  
});

module.exports = productRouter;