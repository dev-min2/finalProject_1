<template>
  <router-view/>
</template>

<script>
import axios from 'axios'
export default {
  created() {
    this.getSubcode();
  },
  methods : {
    async getSubcode() {
      const result = await axios.get('/api/user/subcode');
      this.$store.commit('setSubCode', result.data);

      console.log(this.$store.state.subCode);
      // const myresult = this.$store.getters.getSubCodeName('C1');
      // console.log(myresult);
    } 
  }
}
</script>


<style>
  @import "./assets/css/styles.css";
</style>