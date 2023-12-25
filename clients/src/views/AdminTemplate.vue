<template>
    <AdminHeader />
    <router-view />
    <AdminFooter />
</template>
<script>
import AdminHeader from '../layouts/AdminHeader.vue'
import AdminFooter from '../layouts/AdminFooter.vue'
export default {
  components : {
    AdminHeader,
    AdminFooter
  },
  created() {
    this.$router.push( { path : '/admin' });
  }
}
</script>