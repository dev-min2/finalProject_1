<!-- 검색바 컴포넌트 -->
<template>
    <div>
        <button class="input-group-text my-1" style="float:right;" @click="sendEmit">
            <i class="fa fa-search pt-2"></i>
        </button>
        <input type="text" @keyup.enter="sendEmit" v-model="searchQuery" class="form-control my-1" style="width:20%; float:right;" placeholder="Search" aria-label="Username" aria-describedby="basic-addon1" />
    </div>
</template>

<script>
    export default {
        data() {
            return {
                searchQuery : ''
            }
        },
        methods : {
            sendEmit(searchQuery) {
                // 검색은 무조건 첫번째 페이지를 보여줌
                this.$emit('boardSearch',1, this.searchQuery);
                this.searchQuery = '';
            }
        }
    }
</script>

<style scoped>

</style>