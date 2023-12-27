const express = require('express');
const fs = require('fs');
const multipart = require('connect-multiparty')
const boardRouter = express.Router();
//boardRouter.use(multipart());

// CreateNotice에 created안에서 랜덤한 숫자를 발급하고, 상세설명에 이미지 업로들할떄마다
// 현재 랜덤값_시간값_파일이름을 보내도록 해서 temp폴더에 저장.
// 만약 공지작성을 안하고 나가는경우(버튼을통해서) temp폴더에있는 시간값+랜덤값의 이미지를 삭제.(요청을 보내야함)
// 그냥 나가버린경우? (BeforeRouteLeave에서 처리?)
// 만약 창을 그냥 닫는경우? (BeforeUnload)
// 그냥 컴퓨터를 꺼버린경우?(-> 서버킬 때 temp폴더를 비우도록처리 -> temp는 실제 작성을 해야 temp에 있는 이미지파일들을 실제 폴더로 옮기므로.)

// 텍스트 에디터의 이미지
boardRouter.post('/notice/uploadDescImg', multipart(), async(req,res) => {
    const {body, files} = req;
    let fileName = req.body.fileName;
    const typeStr = files.image.name;
    
    const fileType = typeStr.substr(typeStr.indexOf('.') + 1, typeStr.length);
    fs.readFile(req.files.image.path, (err,data) => {
        fileName = fileName + "." + fileType;
        const tempSavePath = __dirname + "/../uploads/notice/temp/" + fileName;
        fs.writeFile(tempSavePath,data, (err) => {
            if(err) {
                console.log(err);
            }
            res.send("/uploads/notice/temp/" + fileName);
        })
    })
});

// 첨부파일
boardRouter.post('/notice/uploadDescImg', multipart(), async(req,res) => {
    const {body, files} = req;
    const fileName = req.body.fileName;
    const typeStr = files.image.name;
    
    const fileType = typeStr.substr(typeStr.indexOf('.') + 1, typeStr.length);
    fs.readFile(req.files.image.path, (err,data) => {
        const tempSavePath = __dirname + "/../uploads/notice/temp/" + fileName + "." + fileType;
        fs.writeFile(tempSavePath,data, (err) => {
            if(err) {
                console.log(err);
            }
            res.send("OK");
        })
    })
});

boardRouter.post('/notice/regist', async(req, res) => {

});

module.exports = boardRouter;