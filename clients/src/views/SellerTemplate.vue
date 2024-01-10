<template>
<div>
    <SellerHeader />
    <div id="layoutSidenav">
    <SellerSide />
    <div id="layoutSidenav_content">
        <main>
          <router-view />
        </main>
        <SellerFooter />
    </div>
    </div>
</div>
   
    
</template>
<script>
import SellerHeader from '../layouts/SellerHeader.vue'
import SellerFooter from '../layouts/SellerFooter.vue'
import SellerSide from '../layouts/SellerSide.vue'

export default {
  components : {
    SellerHeader,
    SellerSide,
    SellerFooter,
   
  },
  created() {
    this.$router.push( { path : '/seller' });
  }
}
</script>
 