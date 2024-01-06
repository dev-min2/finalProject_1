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
      
    } 
  }
}
</script>


<style>
  @import "./assets/css/styles.css";
</style>