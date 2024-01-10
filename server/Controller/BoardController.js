const express = require('express');
const boardRouter = express.Router();
const BoardService = require('../Service/BoardService');

/*자유게시판*/
//전체조회
boardRouter.get('/freeboard', async (req, res) => {
    const pageNo = req.query.pg;
    const keyword = req.query.keyword;
    console.log(req.query);
    try {
        const boardService = new BoardService();
        const result = await boardService.getFreeBoardList(pageNo, keyword);
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
//자유게시판 글 수정
boardRouter.put('/freeboard', async (req, res) => {
    const {
        free_board_no,
        freeBoardInfo,
        randFreeValue,
        curTimeVal
    } = req.body.param;
    if (typeof req.session.userNo === "undefined") {
        res.status(403).send("FAIL");
        return;
    }
    console.log('수정테스트', req);

    try {
        const boardService = new BoardService();

        const result = await boardService.modifyFree(req.session.userNo,
            free_board_no, randFreeValue, curTimeVal, freeBoardInfo);

        res.send("OK");
    } catch (e) {
        console.log(e);
    }
});
//자유게시판 글 삭제
boardRouter.delete('/freeboard/:no', async (req, res) => {
    const boardNo = req.params.no;
    try {
        const boardService = new BoardService();
        const result = boardService.deleteFreeBoard(boardNo);
        res.status(200).send(result);
    } catch (e) {
        console.log(e);
    }
})


//자유게시판 덧글
boardRouter.post('/free-reply', async (req, res) => {
    const body = req.body;
    try {
        const boardService = new BoardService();
        const result = await boardService.registFreeReply(body.param);
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
boardRouter.put('/free-reply', async(req, res) => {
    const replyNo = req.query.replyNo;
    let modifyReplyObject = null;
    if(typeof replyNo == "undefined") {
        modifyReplyObject = req.body;
    }

    try {
        const boardService = new BoardService();
        let result = '';
        if(modifyReplyObject == null) {
            result = await boardService.deleteFreeReply(replyNo);
        }
        else {
            result = await boardService.modifyFreeReply(modifyReplyObject);
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

boardRouter.delete('/notice/:no', async (req, res) => {
    const boardNo = req.params.no;
    try {
        const boardService = new BoardService();
        const result = boardService.deleteNoticeBoard(boardNo);
        res.status(200).send(result);
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
        con
        ult = await boardService.modifyNotice(req.session.userNo,
            notice_board_no, randNoticeValue, curTimeVal, noticeBoardInfo);

        res.send("OK");
    } catch (e) {
        console.log(e);
    }
})
//하랑
boardRouter.get('/qna/:productNo/:pageNo', async (req, res) => {
    let productNo = req.params.productNo
    let pageNo = req.params.pageNo
    try {
        const boardService = new BoardService();
        let result = await boardService.getQnaList(productNo, pageNo);
        res.send(result);
    } catch(err) {
        console.log(err);
    }
})
boardRouter.get('/allqna/:pageNo', async (req, res) => {
    let pageNo = req.params.pageNo
    try {
        const boardService = new BoardService();
        let result = await boardService.allQnaList(pageNo);
        res.send(result);
    } catch (err) {
        console.log(err);
    }
})
boardRouter.post('/qna', async (req, res) => {
    let qnaCategory = req.body.qnaCategory;
    let title = req.body.title;
    let boardPublic = req.body.boardPublic;
    let content = req.body.content;
    let productNo = req.body.pno;
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
boardRouter.put('/qnamod', async (req, res) => {
    let qnaCategory = req.body.qnaCategory;
    let title = req.body.title;
    let boardPublic = req.body.boardPublic;
    let content = req.body.content;
    let qno = req.body.qno
    try {
        const boardService = new BoardService();
        let result = await boardService.modQna(qnaCategory, title, boardPublic, content, qno);
        res.send(result);
    } catch(err) {
        console.log(err);
    }
})
boardRouter.delete('/qnadel', async (req, res) => {
    let qno = req.query.qno
    try {
        const boardService = new BoardService();
        let result = await boardService.delQna(qno);
        res.send(result);
    } catch(err) {
        console.log(err);
    }
})
boardRouter.post('/reqna', async (req, res) => {
    let content = req.body.content
    let qno = req.body.qno
    try {
        const boardService = new BoardService();
        let result = await boardService.addReQna(content, qno);
        res.send(result);
    } catch (err) {
        console.log(err);
    }
})
boardRouter.get('/myqna', async (req, res) => {
    let userNo = req.query.userNo
    let pageNo = req.query.pageNo
    try {
        const boardService = new BoardService();
        let result = await boardService.myQna(userNo, pageNo);
        res.send(result);
    } catch(err) {
        console.log(err);
    }
})

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