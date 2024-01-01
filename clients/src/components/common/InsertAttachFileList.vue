<template>
    <div style="padding:0;">
    <ul class="scroll_ul">
		<li v-for="(attachFile,idx) in fileList" :key="idx" style="height:30px;">
			{{attachFile.displayName}}
			<button style="float:right;" @click="deleteAttachFile(attachFile.originName)">삭제</button>
		</li>
	</ul>
    <input ref="prImg" type="file" name="uploadFile" class="form-control" @change="uploadMultipleFile($event.target)">
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        data() {
            return {
                attachFileCount : 0,
                fileList : [],
			    file : { // 이런형태로 넣으란 의미로 선언
                    originName : '',
                    displayName : '',
                }
            }
        },
        props : {
            boardType : String,
            userNo : Number,
            randBoardValue : Number,
            curTimeVal : Number
        },
        methods : {
            async uploadMultipleFile(file) {
                // 파일복사(이렇게 해야 파일 전송이댐)
                const newFiles = new DataTransfer();
                for (let i = 0; i < file.files.length; i++) {
                    newFiles.items.add(file.files[i]);
                }
                file.value = '';
                let realFile = newFiles.files;
                const curFileName = realFile[0].name;

                const formData = new FormData();
                const sendFileName = `${this.boardType}_` + String(this.userNo) + '_' + String(this.randBoardValue) +'_'+ String(this.curTimeVal) + '_' + (this.attachFileCount++) + '_' + curFileName;
                formData.append('sendFileName', sendFileName);
                formData.append('board',this.boardType);
                formData.append('attachFile', realFile[0]);

                let result = await axios.post('/api/file/uploadAttachFile',formData,{"Content-Type": "multipart/form-data"});
                if(result.status == 200) {
                    this.fileList.push({
                        originName : result.data,
                        displayName : curFileName
                    });
                }
                else {
                    this.$showFailAlert('파일첨부에 실패했습니다.','메인화면으로 돌아갑니다.');
                    this.$router.push({path : '/main'});
                }
		},
            async deleteAttachFile(fileOriginName) {
                const result = await axios.delete(`/api/file/uploadAttachFile/${this.boardType}/${fileOriginName}`);
                if(result.data == "OK") {
                    for(let i = 0; i < this.fileList.length; ++i) {
                        if(this.fileList[i].originName == fileOriginName) {
                            this.fileList.splice(i,1);
                            break;
                        }
                    }
                }
            },
        }
    }
</script>

<style scoped>
	.scroll_ul {
		border : 1px solid black;
		overflow-y:scroll;
		list-style: none;
		height : 100px;
	}
    ul {
        padding : 5px;
    }
</style>