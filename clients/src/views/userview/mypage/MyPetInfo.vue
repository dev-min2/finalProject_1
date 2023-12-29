<template>
    <div id="layoutSidenav_content">
        <main>
            <div class="container-fluid px-4">
                <div class="px-4 py-1 my-3 text-center">
                    <h2 class="fw-bold mb-3">내 반려동물 정보</h2>
                </div>

                <div v-if="selectPetQuery == ''" class="d-flex justify-content-center">
                    <!--테이블 시작-->
                    <table class="table w-75">
                        <tr align="center">
                            <br>
                            <td>아직 등록된 반려동물정보가 없습니다</td>
                            <br>
                        </tr>
                        <tr>
                            <td colspan="6">
                                <div class="d-grid gap-2">
                                    <button type="button" class="btn text-white" style="background-color: #fc97bf;"
                                      @click="goToPetInsert()">내 반려동물 등록하기</button>
                                </div>
                            </td>
                        </tr>  
                    </table> 
                </div> 

                <div v-else class="d-flex justify-content-center">
                    <table class="table w-75">
                        <tr align="center">
                            <th style = "display:none;">test</th>
                            <th>이름</th>
                            <th>반려동물종류</th>
                            <th>반려동물생일</th>
                            <th>성별</th>
                            <th>수정</th>
                            <th>삭제</th>
                        </tr>
                        <tr :key="i" v-for="(pet, i) in selectPetQuery" align="center">
                            <td style = "display:none;">{{pet.pet_no}}</td>
                            <td>{{pet.pet_name}}</td>
                            <td>{{pet.pet_type}}</td>
                            <td>{{this.$dateFormat(pet.pet_birth)}}</td>
                            <td>{{pet.pet_gender}}</td>
                            <td><button type="button" class="btn text-white" style="background-color: #9999FF;"
                                     @click="goToUpdateForm(pet.pet_no)">수정</button></td>
                            <td><button type="button" class="btn text-white" style="background-color: #a4a4a4;"
                                     @click="deletePetQuery(pet)">삭제</button></td>
                        </tr>
                        <tr>
                            <td colspan="6">
                                <div class="d-grid gap-2">
                                    <button type="button" class="btn text-white" style="background-color: #fc97bf;"
                                       @click="goToPetInsert()">내 반려동물 추가 등록하기</button>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        data(){
            return {
                userNo: '',
                selectPetQuery : []
            }
        },
        created(){
            this.userNo = this.$store.state.userNo;
            this.getSelectPetQuery();
        },
        methods : {
            //전체조회
            async getSelectPetQuery(){
                this.$showLoading();
                let result 
                    = await axios.get(`/api/user/mypetinfo/${this.userNo}`)
                                .catch(err => console.log(err));
                this.selectPetQuery = result.data;
                this.$hideLoading();
            },
            //삭제
            async deletePetQuery(pet){
                let petNo = pet.pet_no;
                this.$showLoading();
                let result 
                    = await axios.delete(`/api/user/mypetinfo/${petNo}`)
                                        .catch(err=>console.log(err));
                if(result.data.affectedRows > 0){
                    this.$showSuccessAlert('삭제되었습니다');
                }else{
                    this.$showErrorAlert('삭제에 실패했습니다. ');
                }
                for(let i=0; i<this.selectPetQuery.length;i++){
                    if (this.selectPetQuery[i].pet_no == petNo){
                        this.selectPetQuery.splice(i,1);
                        break;
                    }
                }
                this.$hideLoading();
            },
            //버튼 이동
            goToPetInsert() {
                this.$router.push({ path: '/mypetform'});
            },
            goToUpdateForm(petNo){
                this.$router.push({ path : '/mypetform', query : { petNo : petNo }});
                //this.$router.push({ name : 'mypetform', param : {pet : pet} });
            },
        }
    }
</script>

<style>

</style>