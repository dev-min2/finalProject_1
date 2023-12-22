<template>
  <Header />
  <router-view/>
  <Footer />

</template>

<script>
import Footer from './layouts/Footer.vue'
import Header from './layouts/Header.vue'
import Banner from './layouts/Banner.vue'
export default {
  components : {
    Footer,
    Header,
    Banner,
  },
  methods : {
   checkPermission() {
    
   } 
  }
  
}
</script>


<style>

</style>
