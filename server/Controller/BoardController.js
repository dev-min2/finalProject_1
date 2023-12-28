const express = require('express');
const boardRouter = express.Router();
const BoardSevice = require('../Service/BoardService');

boardRouter.post('/notice', async(req,res) => {
    const { noticeBoardInfo, randNoticeValue, curTimeVal } = req.body.param;
    console.log(noticeBoardInfo);
    console.log(randNoticeValue);
    console.log(curTimeVal);
    try {
        const boardService = new BoardService();
        
        res.send("OK");
    }
    catch(e) {
        console.log(e);
    }
});

module.exports = boardRouter;