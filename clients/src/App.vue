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
    } 
  }
}
</script>


<style>
  @import "./assets/css/styles.css";
</style>