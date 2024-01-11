<template>   
<section class="py-5">
<div class="container px-4 px-lg-5 mt-5">
    <div class="container-fluid">
        <form action="addUserQna.do" name="addQnaForm" method="post"
            style="text-align: center">
            
            <h3 style="font-weight : bold">문의글 수정</h3>
            <br>
            <hr>
            <table class="table" border="1">
            <tr>
                <!-- <th>글번호</th>
							<td>{{qnaDetail.qna_board_no}}</td>	 -->
                <th>작성자</th>
                <td><input type="hidden" name="userName"
                    value="">{{this.$store.state.userName}}</td>

                <th>문의상태</th>
                <td>문의대기중</td>
            </tr>
            <tr>
            
                <th>문의종류</th>
                <td>
                    <select class="form-select" name="category" @change="categoryBox($event)">
                        <option value="" selected disabled >선택해주세요</option>
                        <option value="G1" >상품문의</option>
                        <option value="G2" >배송문의</option>
                        <option value="G3" >교환/환불문의</option>
                        <option value="G4" >기타문의</option>                       
                    </select>
                </td>
                <th >공개여부</th>
                <td>
                    <input type="radio" name="radio" value="H1" @change="radioBox($event)">
                    공개글
                    <input type="radio" name="radio" value="H2" @change="radioBox($event)">
                    비공개글
                </td>
            </tr>
            <tr>
                <th >글제목</th>
                <td colspan="5"><input style="width: 90%" type=text name="title" class="form-control"
                    placeholder="제목을 입력해주세요" onfocus="this.placeholder=''"
                    v-model="title"></td>
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
                <button type="button" @click="modQna()" class="btn text-white" style="background-color: #acb1f8;">수정하기</button></td>
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
            category : '',
            title : '',
            content : '',
            qnaDetail:[],
        }
    },
    created(){
        this.qno = this.$route.query.qno;
        this.pname = this.$route.query.pname;
        this.getDetailQna();
    },
    methods:{
        async getDetailQna(){
            this.$showLoading();
            let result = await axios
                        .get(`/api/board/qna?qno=${this.qno}`)
                        .catch(err => console.log(err));
            this.qnaDetail = result.data;
            this.title = this.qnaDetail.title;
            this.content = this.qnaDetail.content;
            this.$hideLoading();
        },
        async modQna(){
            let obj = {
                qnaCategory : this.category,
                title : this.title,
                boardPublic : this.radio,
                content : this.content,
                qno : this.qno,
            }
            this.$showLoading();
            if(this.title == '' || this.category == '' || this.radio == '' || this.content == ''){
                this.$showWarningAlert('미입력 정보가 있습니다.');
                console.log(this.title)
                this.$hideLoading();
                return;
            }
            let result = await axios
                        .put(`/api/board/qnamod`,obj)
                        .catch(err => console.log(err));
            if(result.data.affectedRows > 0){
            this.$showSuccessAlert("문의 수정이 완료되었습니다.");
            this.$hideLoading();
            this.$router.go(-1);
            }
            },
        categoryBox(event){
            if(event.target.value == 'G1') {
                if(this.qnaDetail.product_name != undefined) {
                    this.content = `상품명 : ${this.qnaDetail.product_name}\n 주문자 : ${this.$store.state.userName} \n 문의내용 :  `
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