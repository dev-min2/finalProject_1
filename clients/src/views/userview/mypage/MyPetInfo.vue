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
                                    <th>이름</th>
                                    <th>반려동물종류</th>
                                    <th>반려동물생일</th>
                                    <th>성별</th>
                                </tr>
                                <tr>
                                    <td>pet.petName</td>
                                    <td>
                                        강아지/고양이
                                    </td>
                                    <td>
                                        생일
                                    </td>
                                    <td>
                                        암/수
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="4">
                                        <div class="d-grid gap-2">
                                            <button type="button" class="btn text-white"
                                                style="background-color: #9999FF;"
                                                onclick="location.href='myPetForm.do'">내 반려동물 추가등록하기</button>
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
            console.log(this.userNo);
            this.getSelectPetQuery();
        },
        methods : {
            async getSelectPetQuery(){
                let result 
                    = await axios.get(`/api/user/mypetinfo/${this.userNo}`)
                                .catch(err => console.log(err));
                this.selectPetQuery = result.data;
                console.log('MyPetInfo' + this.selectPetQuery);
            }
        }
    }
</script>

<style>

</style>