<template>
    <div>
        
    </div>
</template>

<script>
    export default {
        beforeRouteEnter() {
            document.body.style.backgroundColor = "gray";
        },
        data() {
            return {
                userNo : '',
                leaveDate : '',
            }
        },
        created() {
            this.userNo = this.$route.query.userNo;
            this.leaveDate = this.$route.query.leaveDate;
            if(typeof leaveDate == "undefined" || leaveDate == null || leaveDate == ""){
                this.$router.push({path : "/main"});
            }
        },
        beforeDestroy() {
            document.body.style.backgroundColor = "";
        }
    }
</script>

<style scoped>
    body {
        background-color : gray;
    }
</style>