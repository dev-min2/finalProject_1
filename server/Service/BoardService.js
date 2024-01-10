const fxExtra = require('fs-extra');
const path = require('path');
const fs = require('fs');
const noticeBoardDAO = require('../DAO/board/NoticeBoardDAO');
const QnABoardDAO = require('../DAO/board/QnABoardDAO');
const { groupBy } = require('../commonModule/commonModule');
const freeBoardDAO = require('../DAO/board/FreeBoardDAO');
const reviewDAO = require('../DAO/user/ReviewDAO');
const PageDTO = require('../commonModule/PageDTO');

class BoardService {
    constructor() {

    }

    // 게시판 타입의 tempAttachFolder에 있는 파일들을 전부 옮김.
    // 옮기는 경로는 uploads/게시판타입/pk/~
    moveAttachFile(boardType, userNo, pkValue, randValue, curTimeVal) {
        const sourceDir = __dirname + `/../uploads/${boardType}/tempAttachFile/`;
        const destDir = __dirname + `/../uploads/${boardType}/${pkValue}/`;
        if (!fs.existsSync(destDir)) {
            fs.mkdirSync(destDir);
        }

        const files = fs.readdirSync(sourceDir)
        files.forEach((file) => {
            if (file.includes(`${boardType}_${userNo}_${randValue}_${curTimeVal}`)) {
                const sourceFilePath = path.join(sourceDir, file);
                const destinationFilePath = path.join(destDir, file);
                fs.renameSync(sourceFilePath, destinationFilePath);
            }
        });

        return true;
    }

    // 게시판 첨부파일 리스트 이름값들 불러오기
    getAttachFileList(boardType, pkValue) {
        let attachFileList = [];
        const sourceDir = __dirname + `/../uploads/${boardType}/${pkValue}/`;
        if (!fs.existsSync(sourceDir)) {
            return attachFileList;
        }

        const files = fs.readdirSync(sourceDir)
        files.forEach((file) => {
            attachFileList.push(file);
        })

        return attachFileList;
    }

    async registNoticeBoard(userNo, randNoticeValue, curTimeVal, noticeBoardInfo) {
        let noticeVO = {
            title: noticeBoardInfo.title,
            content: noticeBoardInfo.html,
            user_no: userNo,
            importance_level: noticeBoardInfo.importanceLevel,
            notice_start_date: noticeBoardInfo.startDate,
            notice_end_date: noticeBoardInfo.endDate,
            created_date: new Date()
        }

        const result = await noticeBoardDAO.insertNoticeBoardQuery(noticeVO);
        if (result == null && result.affectedRows <= 0) {
            return null;
        }
        // tempAttach폴더에 있는 첨부파일들을 모두 옮긴다.
        const moveResult = this.moveAttachFile('notice', userNo, result.insertId, randNoticeValue, curTimeVal);
        if (!moveResult) {
            return null;
        }

        return result;
    }

    async getNoticeBoardList(pageNo, keyword) {
        const result = await noticeBoardDAO.selectNoticeBoardListQuery(pageNo, keyword);
        const countResult = await noticeBoardDAO.selectNoticeBoardCountQuery(keyword); // 총 카운트.
        const importanceNoticeResult = await noticeBoardDAO.selectImportanceNoticeBoardListQuery();

        const pageDTO = new PageDTO(countResult[0].CNT, Number(pageNo), 10);
        const resResult = {
            selectResult: result,
            pageDTO: pageDTO,
            selectImportance: importanceNoticeResult
        }

        return resResult;
    }

    async getNoticeBoardInfo(boardNo) {
        const result = await noticeBoardDAO.selectNoticeBoardQuery(boardNo);
        let replyResult = await noticeBoardDAO.selectNoticeBoardReplyQuery(boardNo);
        const replyCountResult = await noticeBoardDAO.selectNoticeBoardReplyCountQuery(boardNo);
        replyResult = groupBy(replyResult, 'parent_reply_no');

        const attachList = this.getAttachFileList('notice', result[0].notice_board_no);

        const resResult = {
            noticeBoard: result[0],
            reply: replyResult,
            replyCount: replyCountResult[0].CNT,
            attachFileList: attachList
        }

        return resResult;
    }

    async updateNoticeBoardViewCnt(boardNo) {
        const result = await noticeBoardDAO.updateNoticeViewCntQuery(boardNo);
        return result;
    }

    async deleteNoticeBoard(boardNo) {
        const result2 = await noticeBoardDAO.deleteNoticeBoardReplyQuery(boardNo);
        const result = await noticeBoardDAO.deleteNoticeBoardQuery(boardNo);

        if(result.affectedRows > 0 && result2.affectedRows > 0) {
            return true;
        }
        else {
            return false;
        }
    }

    async registNoticeReply(replyObj) {
        replyObj.reply_date = new Date();
        const result = await noticeBoardDAO.insertNoticeReplyQuery(replyObj);
        return result;
    }

    async deleteNoticeReply(replyNo) {
        const result = await noticeBoardDAO.deleteNotieReplyQuery(replyNo);
        return result;
    }

    async modifyNoticeReply(modifyReplyObj) {
        const result = await noticeBoardDAO.updateNoticeReplyQuery(modifyReplyObj.comment, modifyReplyObj.notice_reply_no);
        return result;
    }

    async modifyNotice(userNo, boardNo, randNoticeValue, curTimeVal, noticeBoardInfo) {
        let noticeVO = {
            title: noticeBoardInfo.title,
            content: noticeBoardInfo.html,
            importance_level: noticeBoardInfo.importanceLevel,
            notice_start_date: noticeBoardInfo.startDate,
            notice_end_date: noticeBoardInfo.endDate
        };

        const result = await noticeBoardDAO.updateNoticeBoardQuery(noticeVO, boardNo);
        if (result == null && result.affectedRows <= 0) {
            return null;
        }
        // tempAttach폴더에 있는 첨부파일들을 모두 옮긴다.
        const moveResult = this.moveAttachFile('notice', userNo, boardNo, randNoticeValue, curTimeVal);
        if (!moveResult) {
            return null;
        }

        return result;
    }
    //하랑
    async getQnaList(product_no, pageNo) {
        let result = await QnABoardDAO.showQnaQuery(product_no, pageNo);
        //위에거는 사실상 최대 5개만가져옴
        const countResult = await QnABoardDAO.selectQnaCountQuery(product_no); // 총 카운트.
        const pageDTO = new PageDTO(countResult[0].CNT, Number(pageNo), 5);
        
        const mulResult = {
            selectResult: result,
            page: pageDTO
        };

        return mulResult;
    }
    async allQnaList(pageNo) {
        let result = await QnABoardDAO.allQnaQuery(pageNo);
        const countResult = await QnABoardDAO.selectQnaCountQuery(); // 총 카운트.
        const pageDTO = new PageDTO(countResult[0].CNT, Number(pageNo), 10);
        
        const mulResult = {
            selectResult: result,
            page: pageDTO
        };
        return mulResult;
    }
    async myQna(user_no, pageNo) {
        let result = await QnABoardDAO.myQnaQuery(user_no, pageNo);
        const countResult = await QnABoardDAO.selectQnaCountQuery(); // 총 카운트.
        const pageDTO = new PageDTO(countResult[0].CNT, Number(pageNo), 10);
        const mulResult = {
            selectResult: result,
            page: pageDTO
        };
        return mulResult;
    }
    async addQna(qna_category, title, board_public, content, product_no, user_no) {
        if (typeof product_no == "undefined") {
            this.product_no = null;
        }
        let result = await QnABoardDAO.addQnaQuery(qna_category, title, board_public, content, product_no, user_no);
        return result;
    }
    async detailQna(qno) {
        let result = await QnABoardDAO.showDetailQnaQuery(qno);
        return result[0];
    }
    async modQna(qna_category, title, board_public, content, qna_board_no) {
        let result = await QnABoardDAO.modQnaQuery(qna_category, title, board_public, content, qna_board_no);
        return result;
    }
    async delQna(qna_board_no) {
        let result = await QnABoardDAO.delQnaQuery(qna_board_no);
        return result;
    }
    async addReQna(qna_admin_reply, qna_board_no) {
        let result = await QnABoardDAO.addReQnaQuery(qna_admin_reply, qna_board_no);
        return result;
    }
    //리뷰작성
    async registReviewBoard(userNo, reviewBoardInfo) {
        let reviewVO = {
            content: reviewBoardInfo.html,
            star_cnt: reviewBoardInfo.star_cnt,
            review_date: new Date(),
            product_no: reviewBoardInfo.product_no,
            user_no: userNo,
            payment_no : reviewBoardInfo.payment_no
        }
        const result = await reviewDAO.insertReviewQuery(reviewVO);
        if (result == null && result.affectedRows <= 0) {
            return null;
        }
        return result;
    }

    //리뷰 단건조회
    async getReviewBoardInfo(reviewNo) {
        const result = await reviewDAO.selectReviewBoardQuery(reviewNo);
        return result[0];
    }
    //리뷰 수정
    async modifyReviewBoard(userNo, reviewNo, reviewBoardInfo) {
        console.log(reviewBoardInfo.html);
        let reviewVO = {
            content: reviewBoardInfo.html,
            star_cnt: reviewBoardInfo.star_cnt,
            review_date: new Date(),
            product_no: reviewBoardInfo.product_no,
            user_no: userNo
        }
        const result = await reviewDAO.updateReviewBoardQuery(reviewVO, reviewNo);
        if (result == null && result.affectedRows <= 0) {
            return null;
        }
        return result;

    }
    //리뷰 삭제
    async deleteReviewBoard(reviewNo) {
        const result = await reviewDAO.deleteReviewBoardQuery(reviewNo);
        return result;
    }

    /*자유게시판*/
    //자유게시판 전체조회
    async getFreeBoardList(userNo, pageNo, keyword) {
        const result = await freeBoardDAO.selectFreeBoardListQuery(userNo, pageNo, keyword);
        const countResult = await freeBoardDAO.selectFreeBoardCountQuery(keyword); // 총 카운트.

        const pageDTO = new PageDTO(countResult[0].CNT, Number(pageNo), 10);
        const resResult = {
            selectResult: result,
            pageDTO: pageDTO
        }

        return resResult;
    }
    //자유게시판 단건조회, 댓글
    async getFreeBoardInfo(boardNo) {
        const result = await freeBoardDAO.selectFreeBoardQuery(boardNo);
        let replyResult = await freeBoardDAO.selectFreeBoardReplyQuery(boardNo);
        const replyCountResult = await freeBoardDAO.selectFreeBoardReplyCountQuery(boardNo);
        replyResult = groupBy(replyResult, 'parent_reply_no');

        const attachList = this.getAttachFileList('free', result[0].free_board_no);

        const resResult = {
            freeBoard: result[0],
            reply: replyResult,
            replyCount: replyCountResult[0].CNT,
            attachFileList: attachList
        }
        console.log('보드서비스',resResult );
        return resResult;
    }

    async updateFreeBoardViewCnt(boardNo) {
        const result = await freeBoardDAO.updateFreeViewCntQuery(boardNo);
        return result;
    }

    //자유게시판 등록
    async registFreeBoard(userNo, randFreeValue, curTimeVal, freeBoardInfo) {
        let freeVO = {
            title: freeBoardInfo.title,
            content: freeBoardInfo.html,
            user_no: userNo,
            created_date: new Date()
        }

        const result = await freeBoardDAO.insertFreeBoardQuery(freeVO);
        if (result == null && result.affectedRows <= 0) {
            return null;
        }
        // tempAttach폴더에 있는 첨부파일들을 모두 옮긴다.
        const moveResult = this.moveAttachFile('free', userNo, result.insertId, randFreeValue, curTimeVal);
        if (!moveResult) {
            return null;
        }

        return result;
    }

    //자유게시판 덧글

    async registFreeReply(replyObj) {
        replyObj.reply_date = new Date();
        const result = await freeBoardDAO.insertFreeReplyQuery(replyObj);
        return result;
    }

    async deleteFreeReply(replyNo) {
        const result = await freeBoardDAO.deleteNotieReplyQuery(replyNo);
        return result;
    }

    async modifyFreeReply(modifyReplyObj) {
        const result = await freeBoardDAO.updateFreeReplyQuery(modifyReplyObj.comment, modifyReplyObj.free_reply_no);
        return result;
    }

    async modifyFreeBoard(userNo, boardNo, randFreeValue, curTimeVal, freeBoardInfo) {
        let freeVO = {
            title: freeBoardInfo.title,
            content: freeBoardInfo.html
        };

        const result = await freeBoardDAO.updateFreeBoardQuery(freeVO, boardNo);
        if (result == null && result.affectedRows <= 0) {
            return null;
        }
        // tempAttach폴더에 있는 첨부파일들을 모두 옮긴다.
        const moveResult = this.moveAttachFile('free', userNo, boardNo, randFreeValue, curTimeVal);
        if (!moveResult) {
            return null;
        }

        return result;
    }
}

module.exports = BoardService;