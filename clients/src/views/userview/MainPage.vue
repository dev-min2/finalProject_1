<template>
  <div>
    <Banner />
    <h4>이런 상품 어때요? </h4>
<!-- 한줄에 컴포넌트 4개 띄우기 먼저 하기 -->
    <Product /> 
    <Product />
    <Product />
    <Product />
  </div>
</template>

<script>
  import axios from "axios";
  import Banner from "../../layouts/Banner.vue";
  import Product from '../../components/userview/Product.vue';
  // import { useLoading } from "vue3-loading-overlay/dist/index";
  // import "vue3-loading-overlay/dist/vue3-loading-overlay.css"

  export default {
    components: {
      Banner,
      Product
    },
    data() {
      return {
        productList: [],
      };
    },
    created() {
      //this.getMainpageProductList();
    },
    methods: {
      async getMainpageProductList() {
        this.$showLoading();
        let result = await axios
          .get(`/api/product/main`)
          .catch((err) => console.log(err));
        this.productList = result.data;
        this.$hideLoading();
      },
    },
  };
</script>