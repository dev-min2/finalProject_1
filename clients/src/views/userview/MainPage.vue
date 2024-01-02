<template>
  <div>
    <Banner />
    <section class="py-3">
            <div class="container px-4 px-lg-5 mt-5">
              <h4>💗 이 상품 어때요? </h4>
                <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                    <div v-for="(product2,idx) in productList" :key="idx">
                      <Product :product="product2" />
                    </div>
                </div>
            </div>
    </section>

    <section class="py-3">
            <div class="container px-4 px-lg-5 mt-5">
              <h4>💜 구매후기 BEST 상품! </h4>
                <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                    <div v-for="(product2,idx) in productList2" :key="idx">
                      <Product :product="product2" />
                    </div>
                </div>
            </div>
    </section>

    <section class="py-3">
            <div class="container px-4 px-lg-5 mt-5">
              <h4>⭐ 별점 TOP 상품! </h4>
                <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                    <div v-for="(product2,idx) in productList3" :key="idx">
                      <Product :product="product2" />
                    </div>
                </div>
            </div>
    </section>
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
        productList2: [],
        productList3: [],
      };
    },
    created() {
      this.getMainpageProductList();
    },
    methods: {
      async getMainpageProductList() {
        this.$showLoading();
        let result = await axios
          .get(`/api/product/main?type=${this.$store.state.curShowPetType}`)
          .catch((err) => console.log(err));
          console.log(result);
        this.productList = result.data[0];
        this.productList2 = result.data[1];
        this.productList3 = result.data[2];
        
        this.$hideLoading();
      },
    },
  };
</script>