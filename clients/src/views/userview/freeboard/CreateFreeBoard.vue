<template>
      <section class="pt-2 pb-4">
          <div class="container px-4 px-lg-5 mt-3">
            <h3 v-if="curModifyForm == false"> 게시글 작성</h3>
            <h3 v-else>게시글 수정</h3>
            <form @submit.prevent="uploadProduct" ref="uploadForm" class="row">
              <table class="table">
                <tr>
                  <th>제목</th>
                  <td colspan="2"><input type="text" name="productName" class="form-control" v-model="freeBoardInfo.title"></td>
                </tr>
                <tr ref="target">
                  <th>내용</th>
                  <!-- <td colspan="3"><textarea cols="100" rows="6" name="productDesc"
                      class="form-control"></textarea></td> -->
                  <td colspan="2">
                    <TextEditor v-if="curModifyForm == false" 
                      :boardType="'free'" :userNo="$store.state.userNo" :randBoardValue="randFreeValue" :curTimeVal="curTimeVal" ref="editor"/>
                    <TextEditor v-else-if="curModifyForm == true && freeBoardInfo.html !== null" 
                      :html="freeBoardInfo.html" :boardType="'free'" :userNo="$store.state.userNo" :randBoardValue="randFreeValue" :curTimeVal="curTimeVal" ref="editor"/>
                  </td>
                </tr>
                  <tr>
                    <th>파일 첨부</th>
                    <td colspan="2">
                      <InsertAttachFileList v-if="curModifyForm == false" 
                        :attachFileList="null" :boardNo="''" :boardType="'free'" :userNo="$store.state.userNo" :randBoardValue="randFreeValue" :curTimeVal="curTimeVal" />
                      <InsertAttachFileList v-else-if="curModifyForm == true && realAttachFileNameList !== null" 
                        :attachFileList="realAttachFileNameList" :boardNo="boardNo" :boardType="'free'" :userNo="$store.state.userNo" :randBoardValue="randFreeValue" :curTimeVal="curTimeVal" />
                    </td>
                  </tr>
                <tr>
                  <td colspan="2" style="text-align:center;">
                    <input v-if="curModifyForm == false" type="submit" value="저장" class="btn text-white" style="background-color: #fab3cc; margin : 10px;" @click="registPost">
                    <input v-else type="submit" value="수정" class="btn text-white" style="background-color: #acb1f8; margin : 10px;" @click="modifyPost">
                    <router-link class="btn text-white" style="background-color: #bbbbbb;" to="/freeboard">작성취소</router-link>
                  </td>
                </tr>
              </table>
            </form>
          </div>
        </section>
</template>

<script>
import TextEditor from '../../../components/common/TextEditor.vue'
import InsertAttachFileList from '../../../components/common/InsertAttachFileList.vue'
import axios from 'axios'

export default {
    components : {
        TextEditor,
        InsertAttachFileList
      },
    data() {
      return {
          freeBoardInfo : {
              title : '',
              startDate : null,
              endDate : null,
              html : null,
          },
          subCodes : {},

			// 꼭 부모에서 초기화해서 TextEditor 및 InsertAttachFileList 컴포넌트에 바인딩해야함.
			randFreeValue : '',
			curTimeVal : '',

			// 수정폼에서 쓰이는변수
			curModifyForm : false,
			realAttachFileNameList : null,
			boardNo : '',
      }
    },
    created() {
            //this.getSubcode();
        // 111111 ~ 999999 랜덤 값.
        
        this.boardNo = this.$route.query.modify;
        if(this.boardNo > 0) {
          this.curModifyForm = true;
          this.getFreeBoardInfo(this.boardNo);
        }

        this.randFreeValue = Math.floor(Math.random() * (999999 - 111111 + 1)) + 111111;
        this.curTimeVal = new Date().getTime();
    },
    computed : {
    },
    methods : {
        async registPost() {
          if(!this.checkValidation()) {
            return false;
          }

          const editor = this.$refs.editor.editor;
          this.freeBoardInfo.html = editor.getHTML();
          this.freeBoardInfo.importanceLevel = this.freeBoardInfo.sel;
          const sendObj = {
            param : {
              randFreeValue : this.randFreeValue,
              curTimeVal : this.curTimeVal,
              freeBoardInfo : this.freeBoardInfo
            }
		    	}
			const result = await axios.post('/api/board/freeboard', sendObj, { headers : {"Content-Type" : "application/json"}});
			if(result.status == 200) {
				this.$showSuccessAlert('등록성공',null);
				this.$router.push({path : '/freeboard'});
			}
		},

		async getFreeBoardInfo(boardNo) {
			this.$showLoading();
            const result = await axios.get(`/api/board/freeboard/${boardNo}`);
            if(result.status == 200) {
                this.freeBoardInfo.title = result.data.freeBoard.title;
				this.freeBoardInfo.html = result.data.freeBoard.content;
                this.realAttachFileNameList = result.data.attachFileList;
            }
            else {
                this.$showFailAlert('데이터를 불러오는데 실패했습니다.');
                this.$router.push({path : "/free"});
            }
            this.$hideLoading();
            return 1;
		},
		async modifyPost() {
			if(!this.checkValidation()) {
				return false;
			}

			const editor = this.$refs.editor.editor;
			this.freeBoardInfo.html = editor.getHTML();
			const sendObj = {
				param : {
					free_board_no : this.boardNo,
					randFreeValue : this.randFreeValue,
					curTimeVal : this.curTimeVal,
					freeBoardInfo : this.freeBoardInfo
				}
			}
			const result = await axios.put('/api/board/freeboard', sendObj, { headers : {"Content-Type" : "application/json"}});
			if(result.status == 200) {
				this.$showSuccessAlert('수정성공',null);
				this.$router.push({path : `/freeboard/${this.boardNo}`});
			}
		},

      checkValidation() {
        if(this.freeBoardInfo.title == '') {
          this.$showWarningAlert('제목을 입력해주세요.');
          return false;
        }

        const editorLength = this.$refs.editor.editor.getHTML().length;
              if(editorLength >= 8000) {
                  this.$showWarningAlert('글자수 길이 8000자를 넘길 수 없습니다.');
          return false;
              }

        return true;
        }
    }


}
</script>

<style>

</style>