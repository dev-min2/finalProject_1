<!-- TextViewer아님 TextEditor임 주의. -->
<!-- 필요값 : boardType(notice,freeBoard등..), userNo-->
<template>
    <div ref="editor">
    </div>
</template>

<script>
    import Editor from '@toast-ui/editor'; /* ES6 모듈 방식 */
    import '@toast-ui/editor/dist/toastui-editor.css'; // Editor 스타일
    import axios from 'axios'

    export default {    
        data() {
            return {
                editorImageFileList : [],
                descFileCount : 0,
                editor : null
            }
        },
        props : {
            boardType : String,
            userNo : Number,
            randBoardValue : Number,
            curTimeVal : Number
        },
        methods : {
            
        },
        mounted() {
            const myThis = this;
            this.editor = new Editor({
                el: myThis.$refs.editor,
                height: '600px',
                initialEditType: 'wysiwyg',
                previewStyle: 'vertical',
                hooks: {
                    // 이미지가 올라오면 해당 이미지가 blob매개변수에 담김
                    addImageBlobHook: async (blob, callback) => {
                        const fileType = blob.name.substr(blob.name.indexOf('.') + 1, blob.name.length);
                        if(fileType == 'jpg' || fileType == 'jpeg' || fileType == 'png' || fileType == 'gif') {
                            const formData = new FormData();

                            const sendFileName = `${this.boardType}_` + String(this.userNo) + '_' + String(this.randNoticeValue) +'_'+ String(this.curTimeVal) + '_' + (this.descFileCount++) + '_' + blob.name;
                            
                            formData.append('sendFileName',sendFileName);
                            formData.append('board', this.boardType);
                            formData.append('image', blob);                     

                            let result = await axios.post('/api/file/uploadDescImg',formData,{"Content-Type": "multipart/form-data"});
                            const fileName = result.data;

                            const imageUrl = `${this.$store.state.curIp + result.data}`;
                            const imageAlt = 'image_detect_10954321';
                            this.editorImageFileList.push({
                                imageURL : `![${imageAlt}](${imageUrl})`,
                                imageName : `${sendFileName}`
                            });
                            callback(imageUrl, imageAlt);
                        }
                    },
				    // 글한번칠때마다 발생하는 함수
                    change : async () => {
                        const markdown = this.editor.getMarkdown();
                        for(let i = 0; i < this.editorImageFileList.length; ++i) {
                            // 없는게있다면 삭제 요청한다.
                            if(!markdown.includes(this.editorImageFileList[i].imageURL)) {
                                const result = await axios.delete(`/api/file/uploadDescImg/${this.boardType}/${this.editorImageFileList[i].imageName}`);
                                this.editorImageFileList.splice(i,1);
                            }
                        }
                    }
                }
            });
        }
    }
</script>

<style scoped>

</style>