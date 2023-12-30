<template>
    <div>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                boardNo : 0
            }
        },
        created() {
            this.boardNo = this.$route.params.no;
        },
        methods: {
            async getNoticeData() {

            }
        }
    }
</script>

<style scoped>

</style>