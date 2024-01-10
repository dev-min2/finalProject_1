const express = require('express');
const boardRouter = express.Router();
const BoardService = require('../Service/BoardService');

/*자유게시판*/
boardRouter.get('/freeboard', async (req, res) => {
    const userNo = req.query.userNo;
    const pageNo = req.query.pg;
    const keyword = req.query.keyword;
    try {
        const boardService = new BoardService();
        const result = await boardService.getFreeBoardList(userNo, pageNo, keyword);
        res.status(200).send(result);
    } catch (e) {
        console.log(e);
        res.status(500).send("FAIL");
    }
});

//자유게시판 단건조회
boardRouter.get('/freeboard/:no', async (req, res) => {
    const boardNo = req.params.no;
    console.log('보드컨ㄴ트롤러', req.params);

    try {
        const boardService = new BoardService();
        const result = await boardService.getFreeBoardInfo(boardNo);
        res.status(200).send(result);
    } catch (e) {
        console.log(e);
    }
})
boardRouter.put('/freeboard/:no', async (req, res) => {
    const boardNo = req.params.no;
    console.log('보드컨ㄴ트롤러', req.params);

    try {
        const boardService = new BoardService();
        const result = await boardService.updateFreeBoardViewCnt(boardNo);
        res.status(200).send(result);
    } catch (e) {
        console.log(e);
    }
})
//자유게시판 글 등록
boardRouter.post('/freeboard', async (req, res) => {
    const {
        freeBoardInfo,
        randFreeValue,
        curTimeVal
    } = req.body.param;

    if (typeof req.session.userNo === "undefined") {
        res.status(403).send("FAIL");
        return;
    }

    try {
        const boardService = new BoardService();
        const result = await boardService.registFreeBoard(req.session.userNo, randFreeValue, curTimeVal, freeBoardInfo);

        res.send("OK");
    } catch (e) {
        console.log(e);
    }
});




/*공지게시판*/
boardRouter.post('/notice', async (req, res) => {
    const {
        noticeBoardInfo,
        randNoticeValue,
        curTimeVal
    } = req.body.param;

    if (typeof req.session.userNo === "undefined") {
        res.status(403).send("FAIL");
        return;
    }

    try {
        const boardService = new BoardService();
        const result = await boardService.registNoticeBoard(req.session.userNo, randNoticeValue, curTimeVal, noticeBoardInfo);

        res.send("OK");
    } catch (e) {
        console.log(e);
    }
});

boardRouter.get('/notice', async (req, res) => {
    const pageNo = req.query.pg;
    const keyword = req.query.keyword;
    try {
        const boardService = new BoardService();
        const result = await boardService.getNoticeBoardList(pageNo, keyword);
        res.status(200).send(result);
    } catch (e) {
        console.log(e);
        res.status(500).send("FAIL");
    }
});


boardRouter.get('/notice/:no', async (req, res) => {
    const boardNo = req.params.no;

    try {
        const boardService = new BoardService();
        const result = await boardService.getNoticeBoardInfo(boardNo);
        res.status(200).send(result);
    } catch (e) {
        console.log(e);
    }
})

boardRouter.put('/notice/:no', async (req, res) => {
    const boardNo = req.params.no;

    try {
        const boardService = new BoardService();
        boardService.updateNoticeBoardViewCnt(boardNo);
        res.status(200).send("OK");
    } catch (e) {
        console.log(e);
    }
})

boardRouter.post('/notice-reply', async (req, res) => {
    const body = req.body;
    try {
        const boardService = new BoardService();
        const result = await boardService.registNoticeReply(body.param);
        if (result) {
            res.status(200).send(result);
        } else {
            res.status(500).send('FAIL');
        }
    } catch (e) {
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

boardRouter.put('/notice', async (req, res) => {
    const {
        notice_board_no,
        noticeBoardInfo,
        randNoticeValue,
        curTimeVal
    } = req.body.param;
    if (typeof req.session.userNo === "undefined") {
        res.status(403).send("FAIL");
        return;
    }

    try {
        const boardService = new BoardService();
        const result = await boardService.modifyNotice(req.session.userNo,
            notice_board_no, randNoticeValue, curTimeVal, noticeBoardInfo);

        res.send("OK");
    } catch (e) {
        console.log(e);
    }
});

//리뷰 작성
boardRouter.post('/myreview/write', async (req, res) => {
    const {reviewBoardInfo} = req.body.param;
    try {
        const boardService = new BoardService();
        const result = await boardService.registReviewBoard(req.session.userNo, reviewBoardInfo);
        res.send(result);
    } catch (e) {
        console.log(e);
    }

});

// 리뷰 단건조회
boardRouter.get('/myreview/info', async (req, res) => {
    try {
        const boardService = new BoardService();
        const reviewNo = req.query.rno;
        const result = await boardService.getReviewBoardInfo(reviewNo);
        res.send(result);
    } catch (e) {
        console.log(e);
    }
});
//리뷰 수정
boardRouter.put('/myreview', async(req, res)=>{
    const { review_no, reviewBoardInfo} = req.body.param;
    if(typeof req.session.userNo === "undefined"){
        res.status(403).send("FAIL");
        return;
    }
    
    try{
        const boardService = new BoardService();
        const result = await boardService.modifyReviewBoard(req.session.userNo, review_no, reviewBoardInfo);
        res.send(result);
    }catch (e){
        console.log(e);
    }
});
// 리뷰 삭제
boardRouter.delete('/myreview/:rno', async (req, res)=>{
    let reviewNo = req.params.rno;
    try{
        const boardService = new BoardService();
        const result = await boardService.deleteReviewBoard(reviewNo);
        res.send(result);
    }
    catch(e){
        console.log(e);
    }
});

module.exports = boardRouter;