const fxExtra = require('fs-extra');
const path = require('path');
const fs = require('fs');
const noticeBoardDAO = require('../DAO/board/NoticeBoardDAO');
const { groupBy } = require('../commonModule/commonModule');
const PageDTO = require('../commonModule/PageDTO');

class BoardService {
    constructor() {

    }

    // 게시판 타입의 tempAttachFolder에 있는 파일들을 전부 옮김.
    // 옮기는 경로는 uploads/게시판타입/pk/~
    moveAttachFile(boardType, userNo, pkValue, randValue, curTimeVal) {
        const sourceDir = __dirname + `/../uploads/${boardType}/tempAttachFile/`;
        const destDir = __dirname + `/../uploads/${boardType}/${pkValue}/`;
        if(!fs.existsSync(destDir)) {
            fs.mkdirSync(destDir);
        }

        const files = fs.readdirSync(sourceDir)
        files.forEach((file) => {
            if(file.includes(`${boardType}_${userNo}_${randValue}_${curTimeVal}`)) {
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
        if(!fs.existsSync(sourceDir)) {
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
            title : noticeBoardInfo.title,
            content : noticeBoardInfo.html,
            user_no : userNo,
            importance_level : noticeBoardInfo.importanceLevel,
            notice_start_date : noticeBoardInfo.startDate,
            notice_end_date : noticeBoardInfo.endDate,
            created_date : new Date()
        }
        
        const result = await noticeBoardDAO.insertNoticeBoardQuery(noticeVO);
        if(result == null && result.affectedRows <= 0) {
            return null;
        }
        // tempAttach폴더에 있는 첨부파일들을 모두 옮긴다.
        const moveResult = this.moveAttachFile('notice', userNo, result.insertId, randNoticeValue, curTimeVal);
        if(!moveResult) {
            return null;
        }

        return result;
    } 

    async getNoticeBoardList(pageNo,keyword) {
        const result = await noticeBoardDAO.selectNoticeBoardListQuery(pageNo,keyword);
        const countResult = await noticeBoardDAO.selectNoticeBoardCountQuery(keyword); // 총 카운트.
        const importanceNoticeResult = await noticeBoardDAO.selectImportanceNoticeBoardListQuery();

        const pageDTO = new PageDTO(countResult[0].CNT, Number(pageNo), 10);
        const resResult = {
            selectResult : result,
            pageDTO : pageDTO,
            selectImportance : importanceNoticeResult
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
            noticeBoard : result[0],
            reply : replyResult,
            replyCount : replyCountResult[0].CNT,
            attachFileList : attachList
        }

        return resResult;
    }

    async updateNoticeBoardViewCnt(boardNo) {
        const result = await noticeBoardDAO.updateNoticeViewCntQuery(boardNo);
        return result;
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
            title : noticeBoardInfo.title,
            content : noticeBoardInfo.html,
            importance_level : noticeBoardInfo.importanceLevel,
            notice_start_date : noticeBoardInfo.startDate,
            notice_end_date : noticeBoardInfo.endDate
        };

        const result = await noticeBoardDAO.updateNoticeBoardQuery(noticeVO,boardNo);
        if(result == null && result.affectedRows <= 0) {
            return null;
        }
        // tempAttach폴더에 있는 첨부파일들을 모두 옮긴다.
        const moveResult = this.moveAttachFile('notice', userNo, boardNo, randNoticeValue, curTimeVal);
        if(!moveResult) {
            return null;
        }

        return result;
    }
}

module.exports = BoardService;