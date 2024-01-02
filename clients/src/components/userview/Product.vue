<template>
  <div>
          <div class="col mb-5" style="height:433px;">
            <div class="card h-100">
              <!-- Product image-->
              <div class="hoverImg">
                <img class="card-img-top" alt="..." v-if="product.pet_type == 'd1'" :src="$store.state.prImg + `dog/` + product.product_image"  />
                <img class="card-img-top" alt="..." v-else :src="$store.state.prImg + `cat/` + product.product_image"  />
                
              </div>
              <!-- Product details-->
              <div class="card-body p-4" style="padding:0;">
                <div class="text-center">
                  <!-- Product name-->
                  <h5 class="fw-bolder">{{product.product_name}}</h5>
                  <!-- Product price-->
                  <p>{{product.product_price}}원</p>
                  <br>
                  <p v-if="product.avg_cnt !== null">
                    {{ '★'+ product.avg_cnt }}{{ '(' + product.cnt + ')' }}
                  </p>
                  <p v-else>
                    {{ '★0.0' }}{{ '(' + product.cnt + ')' }}
                  </p>
                </div>
              </div>
              <!-- Product actions-->
              <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                <div class="text-center">
                  <a class="btn btn-outline-dark mt-auto" href="#">상세보기</a>
                </div>
              </div>
            </div>
          </div>
  </div>
</template>

<script>
  export default {
    props: [
      "product",
    ]
          
    ,
    created() {
    },
  }
  
</script>