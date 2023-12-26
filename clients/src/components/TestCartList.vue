<template>
  <h1>업체명</h1>
  <table class="cart_list">
    <thead>
      <tr>
        <td><input type="checkbox" id="allcheck" /></td>
        <td colspan="3">상품정보</td>
        <td>옵션</td>
        <td>상품금액</td>
        <td>
          배송비
          <p>3만원 이상 구매시 무료배송</p>
        </td>
      </tr>
    </thead>
    <tbody>
      <tr
        class="cart_list_detail"
        v-for="products in productList"
        :key="products.product_name"
      >
        <td>
          <input
            type="checkbox"
            class="chk"
            name="product"
            value="가격"
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
          <span class="price">{{ products.product_price }}</span>
        </td>
        <td class="cart_list_option">
          <p>모델명 : {{ products.product_name }}</p>
          <p>수량 : {{ products.product_stock }}</p>
          <input
            type="button"
            value="▲"
            class="cart_list_optionbtn"
            onclick="upfunction()"
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
            products.product_price * products.product_stock
          }}</span>
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
    </tfoot>
  </table>
  <div class="cart_mainbts">
    <button
      class="cart_bigorderbtn left"
      type="button"
      onclick="location.href='main.do'"
    >
      쇼핑계속하기
    </button>
    <button
      class="cart_bigorderbtn right"
      type="button"
      id="tess"
      onclick="paymentfunction()"
    >
      주문하기
    </button>
  </div>
</template>
<script>
export default {
  name: "CartList",
  data() {
    return {
      productList: [],
    };
  },
  mounted() {
    this.test();
  },
  methods: {
    async test() {
      // A업체
      this.productList.push(
        {
          product_no: 1,
          product_name: "칫솔",
          product_price: 15000,
          product_stock: 2,
          delivery_fee: 3000,
        },
        {
          product_no: 2,
          product_name: "치약",
          product_price: 10000,
          product_stock: 5,
          delivery_fee: 3000,
        }
      );
    },
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
</style>
