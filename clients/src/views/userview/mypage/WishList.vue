<template>
  <div>
	<h3 class="mt-4" style= text-align:center>찜 목록</h3>
    <div class="col mb-5" style="height: 400px">
      <div class="card h-100">
        <!-- Product image-->
            <router-link style="text-decoration : none; color : black"
              :to="{
                path: '/productdetail',
                query: { pno: product.product_no },
              }"
            >
        <div class="card-image">
          <div class="hoverImg">
              <img
                class="card-img-top"
                style="height: 200px"
                alt="..."
                v-if="product.pet_type == 'd1'"
                :src="$store.state.prImg + `dog/` + product.product_image"
              />
              <img
                class="card-img-top"
                style="height: 200px"
                alt="..."
                v-else
                :src="$store.state.prImg + `cat/` + product.product_image"
              />
          </div>
        </div>
        <!-- Product details-->
        <div class="card-body p-4">
          <div class="text-left">
            <!-- Product name-->
            <p></p>
            <h6 class="fw-bolder">{{ product.product_name }}</h6>
          </div>
          <br />
          <div class="text-left">
            <!-- Product price-->
            <p style="text-align : right">{{ product.product_price }}원</p>
          </div>
          <div class="text-left">
            <p v-if="product.avg_cnt !== null">
              {{ "★" + product.avg_cnt }}{{ "(" + product.cnt + ")" }}
            </p>
            <p v-else>{{ "★0.0" }}{{ "(" + product.cnt + ")" }}</p>
          </div>
        </div>
        </router-link>
        <!-- Product actions-->
        <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
          <div class="text-center">
            <!--<a class="btn btn-outline-dark mt-auto" href="/productdetail?pno=${products.product_no}&cno=${products.category_no}&type=${products.pet_type}">상세보기</a>-->
            <!--<router-link :to="{ path : '/productdetail', query : { pno : product.product_no}}">상세보기</router-link>-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["product"],

  created() {},
};
</script>