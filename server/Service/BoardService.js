const fxExtra = require('fs-extra');
const path = require('path');
const fs = require('fs');
const noticeBoardDAO = require('../DAO/board/NoticeBoardDAO');
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
            console.log(file);
            if(file.includes(`${boardType}_${userNo}_${randValue}_${curTimeVal}`)) {
                const sourceFilePath = path.join(sourceDir, file);
                const destinationFilePath = path.join(destDir, file);
                fs.renameSync(sourceFilePath, destinationFilePath);
            }
        });

        return true;
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

    async getNoticeBoardList(pageNo) {
        const result = await noticeBoardDAO.selectNoticeBoardQuery(pageNo);
        const countResult = await noticeBoardDAO.selectNoticeBoardCountQuery(); // 총 카운트.

        const pageDTO = new PageDTO(countResult[0].CNT, Number(pageNo), 10);
        const resResult = {
            selectResult : result,
            pageDTO : pageDTO
        }

        return resResult;
    }
}

module.exports = BoardService;
