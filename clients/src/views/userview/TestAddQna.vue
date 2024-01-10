<template>   
<section class="py-5">
<div class="container px-4 px-lg-5 mt-5">
    <div class="container-fluid">
        <form action="addUserQna.do" name="addQnaForm" method="post"
            style="text-align: center">
            
            <h3>문의글 작성</h3>
            <br>
            <hr>
            <table class="table" border="1">
            <tr>
                <th colspan="3">작성자</th>
                <td><input type="hidden" name="userName"
                    value="">{{this.$store.state.userName}}</td>

                <th colspan="2">문의상태</th>
                <td>
                        문의대기중
                </td>
            </tr>
            <tr>
            
                <th colspan="6">문의종류</th>
                <td>
                    <select class="productName" name="category" @change="categoryBox($event)">
                        <option value="" selected disabled >선택해주세요</option>
                        <option value="G1" >상품문의</option>
                        <option value="G2" >배송문의</option>
                        <option value="G3" >교환/환불문의</option>
                        <option value="G4" >기타문의</option>                       
                    </select>
                </td>

            </tr>
            <tr>
                <th >글제목</th>
                <td colspan="4"><input style="width: 100%" type=text name="title"
                    placeholder="제목을 입력해주세요" onfocus="this.placeholder=''"
                    v-model="title"></td>
                <th>공개여부</th>
                <td>
                    <input type="radio" name="radio" value="H1" @change="radioBox($event)">
                    공개글
                    <input type="radio" name="radio" value="H2" @change="radioBox($event)">
                    비공개글
                </td>
            </tr>

            <tr>
                <td colspan="14">
                    <textarea 
                        v-if="this.category == 'G1'"
                        rows="10" cols="40"
                        class="form-control" name="contents"
                        placeholder= "" onfocus="this.placeholder=''"
                        v-model="content">
                        </textarea>
                    <textarea 
                        v-else
                        rows="10" cols="40"
                        class="form-control" name="contents"
                        placeholder="글을 입력해주세요" onfocus="this.placeholder=''"
                        v-model="content">
                        </textarea>
                        </td>
            </tr>
            <tr>
                <td colspan="14" align="center">
                <button type="button" @click="addQna()">등록하기</button></td>
            </tr>
            </table>
        </form>
    </div>
</div>
</section>
</template>
<script>
import axios from 'axios';
export default {
    data(){
        return{
            pno : '',
            pname : '',
            radio : '',
            category : ''
        }
    },
    created(){
        this.pno = this.$route.query.pno;
        this.pname = this.$route.query.pname;
    },
    methods:{
        async addQna(){
            let obj = {
                qnaCategory : this.category,
                title : this.title,
                boardPublic : this.radio,
                content : this.content,
                userNo : this.$store.state.userNo,
                pno : this.pno
            }
            this.$showLoading();
            if(this.title == ''||this.category == undefined || this.radio == '' || this.content == ''){
                this.$showWarningAlert('미입력 정보가 있습니다.');
                console.log(this.category)
                console.log(this.radio)
                console.log(this.content)
                this.$hideLoading();
                return;
            }
            let result = await axios
                        .post(`/api/board/qna`,obj)
                        .catch(err => console.log(err));
        if(result.data.affectedRows > 0){
            this.$showSuccessAlert("문의 등록이 완료되었습니다.");
            this.$hideLoading();
            this.$router.go(-1);
        }
        },
        categoryBox(event){
            if(event.target.value == 'G1') {
                if(this.pname != undefined) {
                    this.content = `상품명 : ${this.pname}\n 주문자 : ${this.$store.state.userName} \n 문의내용 :  `
                }
                else {
                    this.content = `상품명 : <입력해주세요> \n 주문자 : ${this.$store.state.userName} \n 문의내용 :  `
                }
            }
            else {
                this.content = '';
            }
            let result = event.target.value;
            this.category = result;
        },
        radioBox(){
            let result = event.target.value;
            this.radio = result;
        }
    }
}
</script>
<style scoped>
.table th{
    vertical-align: middle;
}
.table td{
    vertical-align: middle;
}

</style>