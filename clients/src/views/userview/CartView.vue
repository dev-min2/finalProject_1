<template>
  <div class="cart">
    <hr />
    <div class="cart_information">
      <ul>
        <li>장바구니 상품은 최대 30일간 저장됩니다.</li>
        <li>가격, 옵션 등 정보가 변경된 경우 주문이 불가할 수 있습니다.</li>
        <li>
          오늘 출발 상품은 판매자 설정 시점에 따라 오늘출발 여부가 변경될 수
          있으니 주문 시 꼭 다시 확인해 주시기 바랍니다.
        </li>
        <li>기본 배송료 3000원 ==> *3만원 이상 구매시 무료배송*</li>
      </ul>
    </div>
    <div>
      <CartList @product-no="cartList"/>
    </div>
    <div class="cart_mainbts">
      <button
        class="cart_bigorderbtn left"
        type="button"
        onclick="location.href='/main'"
      >
        쇼핑계속하기
      </button>
      <button
        class="cart_bigorderbtn right"
        type="button"
        id="tess"
        @click="paymentBtn()"
      >
        주문하기
      </button>
    </div>
  </div>
</template>
<script>
import CartList from "../../components/CartList.vue";

export default {
  data(){
    return {
      cartNo : [],
      deliveryPrice : []
    }
  },
  components: { 
    CartList 
    },
  methods : {
    paymentBtn: function(){
      let cartData = this.cartNo;
      let deliveryData = this.deliveryPrice;
      let data = [cartData,deliveryData];
      this.$router.push({path:`/paymentform`, query : data});
    },
    //장바구니 선택 cart_no 자식컴포넌트에서 불러오기
    cartList(cart, delivery){
      this.cartNo = cart;
      this.deliveryPrice = delivery;
      console.log('나왓으면좋겟당',this.cartNo);
      console.log('배송비',this.deliveryPrice);
    }
  }
};
</script>
<style scoped>
.cart {
  width: 80%;
  margin: auto;
  padding: 30px;
}
.cart ul {
  background-color: whitesmoke;
  padding: 30px;
  margin-bottom: 50px;
  border: whitesmoke solid 1px;
  border-radius: 5px;
  font-size: 13px;
  font-weight: 300;
}
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
.cart_mainbts{
  width: 420px;
  height: 200px;
  padding-top: 40px;
  display: block;
  margin: auto;
}
.cart_bigorderbtn {
			width: 200px;
			height: 50px;
			font-size: 16px;
			margin: auto;
			border-radius: 5px;
		}
.cart_bigorderbtn.left{
  background-color: white;
  border: 1px lightgray solid;
  margin-right: 5px;
}
.cart_bigorderbtn.right{
  background-color: pink;
  color: white;
  border: none;
}
</style>
