<template>
  <div class="container">
    <template
      v-for="(company, companyIndex, idx) in cartList" :key="companyIndex">
      <h2>업체명 : {{company[0].company_name}}</h2>
      <table class="cart_list">
        <thead>
          <tr>
            <td>
              <input 
              type="checkbox" 
              name="company"
              id="allcheck" 
              v-model="companyChecked[companyIndex]"
              @change="checkComp($event.target.checked, companyIndex, idx)"
              />
              </td>
            <td colspan="2">상품이미지</td>
            <td>상품정보</td>
            <td>옵션</td>
            <td>상품금액</td>
          </tr>
        </thead>
        <tbody>
          <tr
            class="cart_list_detail"
            v-for="(products, productsIndex) in cartList[companyIndex]" :key="productsIndex">
            <td>
              <input
                type="checkbox"
                name="product"
                value="products.product_price"
                id="products.product_no"
                @change="checkProd($event.target, products, idx)"
              />
            </td>
            <td>
              <input
                type="checkbox"
                name="pno"
                value="상품번호"
                style="display: none"
              />
              
            </td>
            <td>
              <a href=""><img src="../assets/logo.png" style="width:100px" /></a>
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
                @click="downfunction(products)"
              />
              <input
                type="button"
                value="상품 삭제"
                class="cart_list_optionbtn"
                @click="delfunction(products,cartList[companyIndex])"
              />
            </td>
            <td>
              <span class="price">{{products.product_price * products.product_sel_cnt}}</span>
              <br />
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3"></td>
            <td><h4>체크된 상품금액 합계 : {{companyPriceList[idx]}}원</h4></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <br>
          <br>
          <br>
        </tfoot>
      </table>
    </template>
    <td class="total"><h4>총 결제 금액 : {{checkedPrice}}</h4></td>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  name: "CartList",
  data() {
    return {
      cartList: [],
      cartPriceList:[],

      checkedPrice:0,
      companyPrice:0,

      companyChecked : [],
      companyPriceList : []
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
    //전체리스트
    async getCartList(){
      this.$showLoading();
      let result = await axios
                        .get(`/api/user/carts/${this.$store.state.userNo}`)
                        .catch(err => console.log(err));
      this.cartList = result.data;
      this.cartList = this.groupBy(this.cartList, 'company_name');
      
      for(const object in this.cartList) {
          object;
          this.companyPriceList.push(0);
      }

      console.log(this.cartList);
      this.$hideLoading();
    },
    //상품선택수량증가
    async upfunction(products){
      console.log(products);
      this.$showLoading();
      let result = await axios
                        .put(`/api/user/carts/${products.product_no}/up`)
                        .catch(err => console.log(err));
      this.$hideLoading();
      console.log(result.data);
      if(result.data == "알림"){
        this.$showWarningAlert('재고보다 많은 수량을 선택했습니다.');
        return;
      }
      if(result.data.changedRows > 0){
        products.product_sel_cnt++;
      }
      // if(target.checked){
      //   this.checkedPrice += products.product_price;
      //   this.companyPriceList[idx] += products.product_price * products.product_sel_cnt ;
      // }
    },
    //상품선택수량감소
    async downfunction(products){
      console.log(products);
      this.$showLoading();
      let result = await axios
                          .put(`/api/user/carts/${products.product_no}/down`)
                          .catch(err => console.log(err));
      this.$hideLoading();
      console.log(result.data);
      if(result.data == "알림"){
        this.$showWarningAlert('상품을 1개 이상 선택해주세요.');
        return;
      }
      if(result.data.changedRows > 0){
        products.product_sel_cnt--;
        // this.checkedPrice -= products.product_price;
      }
    },
    //상품삭제
    async delfunction(products, companyPrArray){
      this.$showLoading();
      let result = await axios  
                            .delete(`/api/user/carts/${this.$store.state.userNo}/${products.product_no}`)
                            .catch(err => console.log(err));
      this.$hideLoading();
      console.log(result.data);
      if(result.data.affectedRows > 0){
        this.$showSuccessAlert("상품이 삭제되었습니다.");
      
      for(let i=0; i< companyPrArray.length; i++){
        if(companyPrArray[i].product_no == products.product_no){
            companyPrArray.splice(i,1);
          break;
        }
      }  
      }
      this.checkedPrice -= products.product_price * products.product_sel_cnt;
    },
    //체크박스
    //상품별
    checkProd(target, products,idx){
      if(target.checked) {
        this.companyPriceList[idx] += products.product_price * products.product_sel_cnt ;
        this.checkedPrice += products.product_price * products.product_sel_cnt ;
      }
      else {
        this.companyPriceList[idx] -= products.product_price * products.product_sel_cnt;
        this.checkedPrice -= products.product_price * products.product_sel_cnt ;
      }
    },
    //그룹별
    checkComp(checked, companyIndex, idx){
      if(checked) {
          const productArray = this.cartList[companyIndex];
          let sum = 0;
          for(let i = 0; i < productArray.length; ++i) {
            sum += productArray[i].product_price * productArray[i].product_sel_cnt;
          }
          // console.log(sum);
          // console.log(idx);
          this.companyPriceList[idx] = sum;
          this.checkedPrice += sum;
      }
      else {
          const productArray = this.cartList[companyIndex];
          let sum = 0;
          for(let i = 0; i < productArray.length; ++i) {
            sum += productArray[i].product_price * productArray[i].product_sel_cnt;
          }
          this.companyPriceList[idx] = 0;
          this.checkedPrice -= sum;
      }
      
      // for(let i in this.cartList[companyIndex]){
      //     let item = this.cartList[companyIndex][i]; 
      //     if(this.checkProd != checked){  
      //      if(checked){
      //         this.companyPrice += item.product_price * item.product_sel_cnt;
      //        return;
      //       }this.companyPrice -= item.product_price * item.product_sel_cnt;
      //       return;
      //     }
      //   }
    },
    //함수
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
  }
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
  text-align: center;
  border-top: 1px solid lightgray;
  border-bottom: 1px solid lightgray;
}
.cart_list_optionbtn {
    background-color: white;
    font-size: 10px;
    border: lightgrey solid 1px;
    padding: 7px;
}
h4{
  text-align: right;
}
.total{
  width: 2000px;
}
</style>
