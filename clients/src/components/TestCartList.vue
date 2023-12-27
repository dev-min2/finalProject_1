<template>
  <div class="container">
    <template
      v-for="(company, companyIndex) in cartList" :key="companyIndex">
      <h1>업체명 : {{company[0].company_name}}</h1>
      <table class="cart_list">
        <thead>
          <tr>
            <td><input type="checkbox" id="allcheck" /></td>
            <td colspan="3">상품정보</td>
            <td>옵션</td>
            <td>상품금액</td>
            <td>
              배송비
            </td>
          </tr>
        </thead>
        <tbody>
          <tr
            class="cart_list_detail"
            v-for="(products, productsIndex) in cartList[companyIndex]" :key="productsIndex">
            <td>
              <input
                type="checkbox"
                checked="checked"
                class="chk"
                name="product"
                value="상품가격"
                onclick="checkfunction()"
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="pno"
                name="pno"
                value="상품번호"
                style="display: none"
              />
              
            </td>
            <td>
              <a href=""><img src="" /></a>
            </td>
            <td>
              <a href="">상품설명</a
              ><span class="cart_list_smartstore">스마트스토어</span>
              <br />
              <span class="price">가격 : {{ products.product_price }}</span>
              <br />
              <span class="stock">재고 : {{products.product_stock}}</span>
            </td>
            <td class="cart_list_option">
              <p>모델명 : {{ products.product_name }}</p>
              <p>선택수량 : {{ products.product_sel_cnt }}</p>
              <p>업체명 : {{products.company_name}}</p>
              <input
                type="button"
                value="▲"
                class="cart_list_optionbtn"
                @click="upfunction(products)"
              />
              <input
                type="button"
                value="▼"
                class="cart_list_optionbtn"
                onclick="downfunction()"
              />
              <input
                type="button"
                value="상품 삭제"
                class="cart_list_optionbtn"
                onclick="delfunction()"
              />
            </td>
            <td>
              <span class="price">{{
                products.product_price * products.product_sel_cnt}}</span>
              <br />
            </td>
            <td>{{ products.delivery_fee }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3"></td>
            <td>
              체크된 상품금액 합계:
              <h4 id="total"></h4>
            </td>
            <td>
              배송비 :
              <h4 id="price"></h4>
            </td>
            <td>
              총 금액 = 상품금액 합계 + 배송비 :
              <h3 id="totalPrice"></h3>
            </td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <br>
        </tfoot>
      </table>
    </template>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  name: "CartList",
  data() {
    return {
      cartList: [],
    };
  },
  created() {
    if(this.$store.state.userNo <= 0) {
      this.$showWarningAlert('로그인 먼저 해주세요.');
      this.$router.push({path: '/login'});
      return;
    }
    
    this.getCartList();
  },
  methods: {
    async getCartList(){
      this.$showLoading();
      let result = await axios
                        .get(`/api/user/carts/${this.$store.state.userNo}`)
                        .catch(err => console.log(err));
      this.cartList = result.data;
      console.log(result.data);
      this.cartList = this.groupBy(this.cartList, 'company_name');
      this.$hideLoading();
    },
    
    checkfunction: function(){

    },
    async upfunction(products){
      console.log(products);
      this.$showLoading();
      let result = await axios
                        .put(`/api/user/carts/${products.product_no}`)
                        .catch(err => console.log(err));
      if(result.data.changedRows > 0){
        products.product_sel_cnt++;
      }
      this.$hideLoading();
    },
    downfunction: function(){
      
    },
    delfunction: function(){

    },
    groupBy: function(data, key){
      return data.reduce(function (carry, el){
        var group = el[key];
        if(carry[group] === undefined){
          carry[group] = []
        }
        carry[group].push(el)
        return carry
      },{})
    }
  },
};
</script>
<style>
table {
  border-top: solid 1.5px black;
  border-collapse: collapse;
  width: 100%;
  font-size: 14px;
}
thead {
  text-align: center;
  font-weight: bold;
}
tbody {
  font-size: 12px;
}
td {
  padding: 15px 0px;
  border-bottom: 1px solid lightgray;
}
.cart_list_optionbtn {
    background-color: white;
    font-size: 10px;
    border: lightgrey solid 1px;
    padding: 7px;
}
</style>
