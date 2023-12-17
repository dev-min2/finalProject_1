const express = require('express');
const userRouter = express.Router();

userRouter.use(express.json({
    limit: '50mb'
}));

//const employeeDAO = require('./db/DAO/employeeDAO');
const UserSevice = require('../../Service/user/UserSevice');

userRouter.post('/checkId', async (req, res) => {
    let id = req.body.id;
    try {
        const userService = new UserSevice();
        let result = await userService.checkDuplicateUserId(id);
        res.send(result);
    }
    catch(e) {
        console.log(e);
    }
})

userRouter.post('/join', async(req,res) =>{
    let user = req.body.user;
    try {
        console.log(user);
        const userService = new UserSevice();
        let result = await userService.createUser(user);
        console.log(result);
        res.send(result);
    }
    catch(e) {
        console.log(e);
    }  
});

userRouter.post('/login', async(req,res) =>{
    let user = req.body.user;
    try {
        const userService = new UserSevice();
        let result = await userService.loginUser(user);
        if(result.length > 0) {
            req.session.userNo = result[0].user_no; //session저장
        }
        res.send(result);
    }
    catch(e) {
        console.log(e);
    }  
});

module.exports = userRouter;