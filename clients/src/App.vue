<template>
  <Header />
  <Banner />  
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
    Banner
  }
}
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
