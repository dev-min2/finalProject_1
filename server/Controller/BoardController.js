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
    const keyword = req.query.keyword;
    try {
        const boardService = new BoardService();
        const result = await boardService.getNoticeBoardList(pageNo,keyword);
        res.status(200).send(result);
    }
    catch(e) {
        console.log(e);
        res.status(500).send("FAIL");
    }
});


boardRouter.get('/notice/:no', async(req, res) => {
    const boardNo = req.params.no;

    try {
        const boardService = new BoardService();
        const result = await boardService.getNoticeBoardInfo(boardNo);
        res.status(200).send(result);
    }
    catch(e) {
        console.log(e);
    }
})

boardRouter.put('/notice/:no', async(req, res) => {
    const boardNo = req.params.no;

    try {
        const boardService = new BoardService();
        boardService.updateNoticeBoardViewCnt(boardNo);
        res.status(200).send("OK");
    }
    catch(e) {
        console.log(e);
    }
})

boardRouter.post('/notice-reply', async(req, res) => {
    const body = req.body;
    try {
        const boardService = new BoardService();
        const result = await boardService.registNoticeReply(body.param);
        if(result) {
            res.status(200).send(result);
        }
        else {
            res.status(500).send('FAIL');
        }
    }
    catch(e) {
        console.log(e);
    }
});

module.exports = boardRouter;