<template>
    <div id="layoutSidenav_content">
        <main>
            <div class="container-fluid px-4">
                <div class="px-4 py-1 my-3 text-center">
                    <h2 class="fw-bold mb-3">내 반려동물 정보</h2>
                </div>
                <div class="d-flex justify-content-center">
                            <table class="table w-75">
                                <tr>
                                    <th>test</th>
                                    <th>이름</th>
                                    <th>반려동물종류</th>
                                    <th>반려동물생일</th>
                                    <th>성별</th>
                                    <th>수정</th>
                                    <th>삭제</th>
                                </tr>
                                <tr :key="i" v-for="(pet, i) in selectPetQuery">
                                    <td>{{pet.pet_no}}</td>
                                    <td>{{pet.pet_name}}</td>
                                    <td>{{pet.pet_type}}</td>
                                    <td>{{pet.pet_birth}}</td>
                                    <td>{{pet.pet_gender}}</td>
                                    <td><button type="button" class="btn text-white" style="background-color: #9999FF;">수정</button></td>
                                    <td><button type="button" class="btn text-white" style="background-color: #a4a4a4;"
                                            @click="buttonTest(pet)">삭제</button></td>
                                </tr>
                                <tr>
                                    <td colspan="4">
                                        <div class="d-grid gap-2">
                                            <button type="button" class="btn text-white" style="background-color: #fc97bf;"
                                              @click="petInsert()">내 반려동물 추가등록하기</button>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                            <!-- <div class="px-4 py-1 my-3 text-center">
                                <h2 class="fw-bold mb-3">아직 등록된 반려동물정보가 없습니다</h2>
                                <button type="button" onclick="location.href='myPetForm.do'">내 반려동물 등록하기</button>
                            </div> -->
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
            this.petNo = this.$route.query.petNo;
        },
        methods : {
            async getSelectPetQuery(){
                let result 
                    = await axios.get(`/api/user/mypetinfo/${this.userNo}`)
                                .catch(err => console.log(err));
                this.selectPetQuery = result.data;
            },
            petInsert() {
                this.$router.push({ path: '/mypetform'});
            },
            async buttonTest(pet){
                console.log(pet.pet_no);
            },
            //삭제
            async deletePetQuery(petNo){
                let result 
                    = await axios.delete(`/api/user/mypetinfo/${this.petNo}`)
            
            }
            // async deleteInfo(userNo){
            //     let result = await axios.delete(`/api/users/${userNo}`)
            //                             .catch(err=>console.log(err));
            //     console.log(result.data);
            //     let count = result.data.affectedRows;
            //     if(count == 0){
            //         alert('정상적으로 삭제되지 않았습니다.');
            //     }else{
            //         alert('정상적으로 삭제되었습니다.');
            //         this.$router.push({name:'userList'});
            //     }
            // },
        }
    }
</script>

<style>

</style>