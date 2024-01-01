<template>
    <ul class="scroll_ul">
        <li v-for="(attachFile,idx) in showAttachFileNameList" :key="idx">
			<a href="#" @click="downloadFile(realAttachFileNameList[idx],idx)">{{attachFile}}</a>
		</li>
    </ul>
</template>

<script>
    import axios from 'axios'
    export default {
        data() {
            return {
                showAttachFileNameList : []
            }
        },
        props : {
            realAttachFileNameList : Array,
            boardType : String,
            pk : Number
        },
        created() {
            this.showAttachFileNameList = this.$convertAttachFileNameList(this.realAttachFileNameList);
        },
        methods : {
            async downloadFile(attachFileName,idx) {
                const pkValue = this.boardNo;
                const fileName = attachFileName;

                const sendObj = {
                    boardType : this.boardType,
                    pk : this.pk,
                    fileName : fileName
                }

                const result = await axios.post(`/api/file/download-file`,sendObj,{headers : {'Content-Type' : 'application/json'}, responseType : 'blob'});
                console.log(result);
                // 파일처리법
                const url = window.URL.createObjectURL(new Blob([result.data]));
                const link = document.createElement('a');
                link.href = url;
                link.download =  this.showAttachFileNameList[idx];
                link.target = '_blank'; // 새 창에서 열릴 수 있도록
                link.click();
                window.URL.revokeObjectURL(url);
            }
        }
    }
</script>

<style scoped>
    .scroll_ul {
		overflow-y:scroll;
		list-style: none;
		height : 100px;
	}

    a {
        text-decoration-line: none;
    }
</style>