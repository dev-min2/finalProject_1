const express = require('express');
const boardRouter = express.Router();

// CreateNotice에 created안에서 랜덤한 숫자를 발급하고, 상세설명에 이미지 업로들할떄마다
// 현재 시간값 + 랜덤값을 보내도록 해서 temp폴더에 저장.
// 만약 공지작성을 안하고 나가는경우(버튼을통해서) temp폴더에있는 시간값+랜덤값의 이미지를 삭제.
// 그냥 나가버린경우? (BeforeRouteLeave에서 처리?)
// 만약 창을 그냥 닫는경우? (BeforeUnload)
// 그냥 컴퓨터를 꺼버린경우?(->...)
boardRouter.post('/notice/uploadDescImg', async(req,res) => {
    
});

module.exports = boardRouter;