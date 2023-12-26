<template>
    <Header />
    <router-view />
    <Footer />
</template>


<script>
import Footer from '../layouts/Footer.vue'
import Header from '../layouts/Header.vue'
export default {
  components : {
    Footer,
    Header,
  },
  computed : {
    curPath() {
      return this.$route.path;
    }
  },
  created() {
    this.$router.push( { path : '/main' });
  },
  watch : {
    curPath(newValue,oldValue) {
      if(newValue == '/') {
        this.$router.push( {path : '/main'});
      }
    }
  }
}
</script>