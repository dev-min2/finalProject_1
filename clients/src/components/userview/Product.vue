<template>
  <div>
          <div class="col mb-5">
            <div class="card h-100">
              <!-- Product image-->
              <div class="hoverImg">
                <img class="card-img-top" src="../../assets/products/dog/ANF 치킨야채 캔 95g.png" alt="..." />
              </div>
              <!-- Product details-->
              <div class="card-body p-4">
                <div class="text-center">
                  <!-- Product name-->
                  <h5 class="fw-bolder">{{product.product_name}}</h5>
                  <!-- Product price-->
                  {{product.product_price}}
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