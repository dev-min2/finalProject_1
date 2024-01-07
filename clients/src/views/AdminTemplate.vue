<template>
<div>
    <AdminHeader />
    <div id="layoutSidenav">
      <AdminSide />
      <div id="layoutSidenav_content">
        <main>
    <router-view />
    </main>
    <AdminFooter />
    </div>
    </div>
</div>
</template>
<script>
import AdminHeader from '../layouts/AdminHeader.vue'
import AdminSide from '../layouts/AdminSide.vue'
import AdminFooter from '../layouts/AdminFooter.vue'
export default {
  components : {
    AdminHeader,
    AdminFooter,
    AdminSide
  },
  created() {
    this.$router.push( { path : '/admin' });
  }
}
</script>