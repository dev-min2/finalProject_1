const express = require('express');
const boardRouter = express.Router();
const BoardService = require('../Service/BoardService');

boardRouter.post('/notice', async(req,res) => {
    const { noticeBoardInfo, randNoticeValue, curTimeVal } = req.body.param;

    if(typeof req.session.userNo === "undefined") {
        res.status(403).send("FAIL");
        return;
    }

    try {
        const boardService = new BoardService();
        const result = await boardService.registNoticeBoard(req.session.userNo,randNoticeValue,curTimeVal,noticeBoardInfo);
        
        res.send("OK");
    }
    catch(e) {
        console.log(e);
    }
});

boardRouter.get('/notice', async(req, res) => { 
    const pageNo = req.query.pg;
    try {
        const boardService = new BoardService();
        const result = await boardService.getNoticeBoardList(pageNo);
        res.status(200).send(result);
    }
    catch(e) {
        console.log(e);
        res.status(500).send("FAIL");
    }
});

module.exports = boardRouter;