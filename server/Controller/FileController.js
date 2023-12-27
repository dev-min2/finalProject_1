// 파일처리를 위한 컨트롤러
const express = require('express');
const fs = require('fs');
const multipart = require('connect-multiparty')
const fileRouter = express.Router();

const fxExtra = require('fs-extra');

// 에디터 및 첨부파일 게시판은 created 랜덤한 숫자를 발급하고, 상세설명에 이미지 업로들할떄마다
// 현재 랜덤값_시간값_파일이름을 보내도록 해서 temp/tempAttachFile폴더에 저장. -> 이후 게시판
// 만약 공지작성을 안하고 나가는경우 temp폴더에있는 시간값+랜덤값의 이미지를 삭제.(요청을 보내야함)
// temp폴더들은 말그대로 임시폴더이기에 게시판 작성요청이가면 게시판의 pk폴더를 만든 후 그안에 데이터를 삽입해야한다.


// 밑의 경우엔 고려하지 않기로함. 현재는 서버껏다키면 temp폴더쪽 파일들은 모두 삭제됨.
// 1. 만약 창을 그냥 닫는경우 (BeforeUnload)
// 2. 그냥 컴퓨터를 꺼버린경우

// 텍스트 에디터의 이미지 업로드
fileRouter.post('/uploadDescImg', multipart(), async(req,res) => {
    const {body, files} = req;
    let fileName = req.body.fileName;
    const board = req.body.board;
    const typeStr = files.image.type;
    console.log(files);

    fs.readFile(req.files.image.path, (err,data) => {
        const tempSavePath = __dirname + `/../uploads/${board}/temp/` + fileName;
        fs.writeFile(tempSavePath,data, (err) => {
            if(err) {
                console.log(err);
            }
            res.send(`/uploads/${board}/temp/` + fileName);
        })
    })
});

// 첨부파일 업로드요청
fileRouter.post('/uploadAttachFile', multipart(), async(req,res) => {
    const {body, files} = req;
    const fileName = req.body.fileName;
    const board = req.body.board;
    
    fs.readFile(req.files.attachFile.path, (err,data) => {
        const tempSavePath = __dirname + `/../uploads/${board}/tempAttachFile/` + fileName;
        fs.writeFile(tempSavePath, data, (err) => {
            if(err) {
                console.log(err);
            }
            res.send("OK");
        })
    })
});

// 첨부파일 삭제요청(만약 fileName을 -1로 보내는경우 모두 첨부파일 및 에디터 모두 삭제처리)
fileRouter.delete('/uploadAttachFile/:boardType/:fileName', async(req, res) => {
    const { boardType, fileName } = req.params;
    console.log(fileName);
    console.log(boardType);
    if(fileName == -1) {
        fxExtra.emptyDirSync(`./uploads/${boardType}/tempAttachFile`);
        fxExtra.emptyDirSync(`./uploads/${boardType}/temp`);
        res.status(200).send("OK");
    }
    else {
        const tempPath = __dirname + `/../uploads/${boardType}/tempAttachFile/` + fileName;
        fs.unlink(tempPath, (err) => {
            if(err) {
                console.log(err);
                res.status(500).send("Fail");
                return;
            }
    
            res.status(200).send("OK");
        });
    }
});


fileRouter.post('/notice/regist', async(req, res) => {

});

fileRouter.post('/notice/cancle', async(req, res) => {
    // 여기에서는 에디터에서 업로드한 이미지를 제거하는 로직이 필요.
});

module.exports = fileRouter;