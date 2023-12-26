<template>
  <div class="container">
    <template
      v-for="(company, companyIndex) in productList" :key="companyIndex"
    >
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
            v-for="(products, productsIndex) in productList[companyIndex]" :key="productsIndex"
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
              <!--{{ productsIndex + 1 }}.{{ products.product_no }}-->
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
              <p>업체명 : {{products.company_name}}</p>
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
          <br>
        </tfoot>
      </table>
    </template>
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
      // [ [A업체 상품배열], [B업체 상품배열]]
      this.productList.push(
        [
          {
            company_name: 'A사',
            product_no: 11,
            product_name: "칫솔",
            product_price: 15000,
            product_stock: 2,
            delivery_fee: 3000,
          },
          {
            company_name: 'A사',
            product_no: 12,
            product_name: "치약",
            product_price: 10000,
            product_stock: 5,
            delivery_fee: 3000,
          },
        ],
        [
          {
            company_name: 'B사',
            product_no: 13,
            product_name: "치실",
            product_price: 5000,
            product_stock: 15,
            delivery_fee: 3000,
          },
        ]
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
.cart_list_optionbtn {
    background-color: white;
    font-size: 10px;
    border: lightgrey solid 1px;
    padding: 7px;
}
</style>
