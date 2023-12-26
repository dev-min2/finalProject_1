<template>
  <div class="cart">
    <hr />
    <div class="cart_information">
      <ul>
        <li>장바구니 상품은 최대 30일간 저장됩니다.</li>
        <li>가격, 옵션 등 정보가 변경된 경우 주문이 불가할 수 있습니다.</li>
        <li>
          오늘출발 상품은 판매자 설정 시점에 따라 오늘출발 여부가 변경될 수
          있으니 주문 시 꼭 다시 확인해 주시기 바랍니다.
        </li>
      </ul>
    </div>
    <div>
      <CartList />
    </div>
  </div>
</template>
<script>
import CartList from "../../components/TestCartList.vue";
export default {
  components: { CartList },
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
</style>
