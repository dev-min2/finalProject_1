<template>
    <div class="container py-3">
        <h1 class="py-4" style="text-align:center;">공지사항</h1>
        <button v-if="$store.state.userPermission == 'F3'" 
            class="btn btn-primary my-2 float-right" style="text-align:right; background-color:#fc97bf; border:0;"
            @click="goWriteNotice"
            >
            글쓰기
        </button>
        <table class="table table-hover">
            <thead>
                <tr>
                    <th>번호</th>
                    <th class="w-50">제목</th>
                    <th>글쓴이</th>
                    <th>작성일</th>
                    <th>조회</th>
                </tr>
            </thead>
            <tbody>
                
            </tbody>
        </table>
    </div>
</template>

<script>
    export default {
        data() {
            return {

            }
        },
        created() {
            console.log(this.$store.state.userPermission);
        },
        methods : {
            goWriteNotice() {
                if(this.$store.state.userPermission != 'F3')
                    return;
                
                this.$router.push({path : "/notice/write"});
            }
        }
    }
</script>

<style scoped>

</style>