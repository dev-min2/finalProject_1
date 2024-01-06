<template>
  <router-view/>
</template>

<<<<<<< HEAD
=======
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

      console.log(this.$getSubCodeName('C5'));
    } 
  }
}
</script>


>>>>>>> develop
<style>
  @import "./assets/css/styles.css";
</style>