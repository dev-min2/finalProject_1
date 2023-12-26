<template>
    <SellerHeader />
    <router-view />
   
    <SellerFooter />
</template>
<script>
import SellerHeader from '../layouts/SellerHeader.vue'
import SellerFooter from '../layouts/SellerFooter.vue'

export default {
  components : {
    SellerHeader,
    SellerFooter,
   
  },
  created() {
    this.$router.push( { path : '/seller' });
  }
}
</script>
 