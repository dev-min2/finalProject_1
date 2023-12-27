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
}
</script>