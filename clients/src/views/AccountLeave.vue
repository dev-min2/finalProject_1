<template>
    <div class="wrapper" ref="div">
        <div class="content">
            <h2 class="text-center mb-4">고객님의 계정은 회원탈퇴 처리중입니다.</h2>
            <h4 class="text-center mb-5">회원탈퇴일자 : {{$dateFormat(leaveDate)}}</h4>
            <p class="text-center mb-5" style="font-size : 16px;">회원탈퇴일로부터 30일의 유예기간 동안에만 회원탈퇴 취소가 가능합니다.<br>회원탈퇴 취소후에는 정상적인 서비스 이용을 위해 다시 로그인 바랍니다.</p>
            <div class="d-flex justify-content-center mt-5">
                <button class="w-25 mx-2" style="height : 60px;" @click="cancleAccount">회원탈퇴 취소</button>
                <button class="w-25 mx-2" style="height : 60px;" @click="$router.push({path : '/main'})">돌아가기</button>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        data() {
            return {
                userNo : '',
                leaveDate : '',
            }
        },
        created() {
            this.userNo = this.$route.query.userNo;
            this.leaveDate = this.$route.query.leaveDate;
            console.log(this.userNo);
        },
        methods : {
            async cancleAccount() {
                const obj = {
                    userNo : this.userNo
                };
                const result = await axios.put('/api/user/cancel-leave',obj);
                if(result.data.changedRows > 0) {
                    this.$showSuccessAlert("회원탈퇴 취소완료");
                    this.$router.push({path : '/main'});
                }
                else {
                    this.$showFailAlert("에러 발생");
                }
            }
        },
        destoryed() {
            this.$refs.div.classList.remove('wrapper');
        }
    }
</script>

<style scoped>
.wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100dvh;
    background: gray;
}

.content {
    padding: 3rem;
    width : 720px;
    height : 480px;
    border-radius: 1rem;
    background: white;
}
</style>
