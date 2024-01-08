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
// 댓글삭제와 수정을 동시에 처리함.
boardRouter.put('/notice-reply', async(req, res) => {
    const replyNo = req.query.replyNo;
    let modifyReplyObject = null;
    if(typeof replyNo == "undefined") {
        modifyReplyObject = req.body;
    }

    try {
        const boardService = new BoardService();
        let result = '';
        if(modifyReplyObject == null) {
            result = await boardService.deleteNoticeReply(replyNo);
        }
        else {
            result = await boardService.modifyNoticeReply(modifyReplyObject);
        }
        
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
})

boardRouter.put('/notice', async(req, res) => {
    const { notice_board_no, noticeBoardInfo, randNoticeValue, curTimeVal } = req.body.param;
    if(typeof req.session.userNo === "undefined") {
        res.status(403).send("FAIL");
        return;
    }

    try {
        const boardService = new BoardService();
        const result = await boardService.modifyNotice(req.session.userNo, 
                        notice_board_no,randNoticeValue,curTimeVal,noticeBoardInfo);
        
        res.send("OK");
    }
    catch(e) {
        console.log(e);
    }
})
//하랑
boardRouter.get('/qna/:productNo', async (req, res) => {
    let productNo = req.params.productNo
    try {
        const boardService = new BoardService();
        let result = await boardService.getQnaList(productNo);
        res.send(result);
    } catch(err) {
        console.log(err);
    }
})
boardRouter.post('/qna', async (req, res) => {
    let qnaCategory = req.body.qnaCategory;
    let title = req.body.title;
    let boardPublic = req.body.boardPublic;
    let content = req.body.content;
    let productNo = req.query.pno;
    let userNo = req.body.userNo;
    try {
        const boardService = new BoardService();
        let result = await boardService.addQna(qnaCategory, title, boardPublic, content, productNo, userNo);
        res.send(result);
    } catch(err) {
        console.log(err);
    }
})
boardRouter.get('/qna', async (req, res) => {
    let qno = req.query.qno
    try {
        const boardService = new BoardService();
        let result = await boardService.detailQna(qno);
        res.send(result);
    } catch (err) {
        console.log(err);
    }
})

module.exports = boardRouter;