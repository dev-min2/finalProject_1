<template>
  <div class="container">
    <template
      v-for="(company, companyIndex, idx) in cartList" :key="idx">
      <h2>업체명 : {{company[0].company_name}}</h2>
      <table class="cart_list">
        <thead>
          <tr>
            <td>
              <input 
              type="checkbox" 
              name="company"
              id="allcheck" 
              v-model="companyChecked[idx]"
              @change="checkComp($event.target.checked, companyIndex, idx)"
              />
              </td>
            <td>상품이미지</td>
            <td class="fixedcol1">상품정보</td>
            <td class="fixedcol2">옵션</td>
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
                v-model="products.selected"
                @change="checkProd($event.target, products, idx, companyIndex)"
              />
            </td>
            <td>
                <a href="">
                  <img v-if="products.pet_type == 'd1'" :src="$store.state.prImg + `dog/` + products.product_image" style="width:100px" />
                  <img v-else :src="$store.state.prImg + `cat/` + products.product_image" style="width:100px" />
                  </a>
              </td>
            <td>
              <a href="">{{products.product_name}}</a>
              <br />
              <span class="price">가격 : {{ products.product_price }}</span>
            </td>
            <td class="cart_list_option">
              <p>선택수량 : {{ products.product_sel_cnt }}</p>
              <input
                type="button"
                value="▲"
                class="cart_list_optionbtn"
                @click="upfunction(products, idx)"
              />
              <input
                type="button"
                value="▼"
                class="cart_list_optionbtn"
                @click="downfunction(products, idx)"
              />
              <input
                type="button"
                value="상품 삭제"
                class="cart_list_optionbtn"
                @click="delfunction(products,cartList[companyIndex],idx, companyIndex)"
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
            <td></td>
            <td></td>
            <td></td>
            <td colspan="2"><h4>선택 상품금액 : {{companyPriceList[idx]}}원</h4></td>
          </tr>
          <br>
          <br>
          <br>
        </tfoot>
      </table>
    </template>
    <td class="total">
      <h4 v-if="cartList && Object.keys(cartList).length > 0">총 결제 금액 : {{checkedPrice}}</h4>
      <h4 v-else style="text-align : center">장바구니가 비어있습니다.</h4>
    </td>
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
      companyPriceList : [],
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
      if(result.data.length <= 0){
        this.$showWarningAlert('장바구니가 비었습니다.');
      }
      this.cartList = this.groupBy(this.cartList, 'company_name');
      
      for(const object in this.cartList) {
          object;
          this.companyPriceList.push(0);
      }
      this.$hideLoading();
    },
    //상품선택수량증가
    async upfunction(products, idx){
     
      this.$showLoading();
      let result = await axios
                        .put(`/api/user/carts/${products.product_no}/up`)
                        .catch(err => console.log(err));
      this.$hideLoading();

      if(result.data == "알림"){
        this.$showWarningAlert('재고보다 많은 수량을 선택했습니다.');
        return;
      }
      if(result.data.changedRows > 0){
        products.product_sel_cnt++;
        if(products.selected){
          this.checkedPrice += products.product_price;
          this.companyPriceList[idx] += products.product_price ;          
        }
      }
    },
    //상품선택수량감소
    async downfunction(products, idx){
     
      this.$showLoading();
      let result = await axios
                          .put(`/api/user/carts/${products.product_no}/down`)
                          .catch(err => console.log(err));
      this.$hideLoading();
      if(result.data == "알림"){
        this.$showWarningAlert('상품을 1개 이상 선택해주세요.');
        return;
      }
      if(result.data.changedRows > 0){
        products.product_sel_cnt--;
        if(products.selected){
          this.checkedPrice -= products.product_price;
          this.companyPriceList[idx] -= products.product_price ;
        }
      }
    },
    //상품삭제
    async delfunction(products, companyPrArray, idx, companyIndex){
      this.$showLoading();
      let result = await axios  
                            .delete(`/api/user/carts/${this.$store.state.userNo}/${products.product_no}`)
                            .catch(err => console.log(err));
      this.$hideLoading();
      if(result.data.affectedRows > 0){
        this.$showSuccessAlert("상품이 삭제되었습니다.");
      
      for(let i=0; i< companyPrArray.length; i++){
        if(companyPrArray[i].product_no == products.product_no){
            if(companyPrArray.length == 1) {
              delete this.cartList[companyIndex];
            }
            else 
              companyPrArray.splice(i,1);
            break;
        }
      }  
      }
      if(products.selected){
        this.checkedPrice -= products.product_price * products.product_sel_cnt;
        this.companyPriceList[idx] -= products.product_price * products.product_sel_cnt ;
      }  
    },
    //체크박스
    //상품별
    checkProd(target, products,idx,companyIndex){
      if(target.checked) {
        this.companyPriceList[idx] += products.product_price * products.product_sel_cnt ;
        this.checkedPrice += products.product_price * products.product_sel_cnt;

        const productArray = this.cartList[companyIndex];
        let isAllCheck = true;
        for(let i = 0; i < productArray.length; ++i) {
          if(!this.cartList[companyIndex][i].selected) {
            isAllCheck = false;
            break;
          }
        }

        if(isAllCheck && !this.companyChecked[idx]) {
          this.companyChecked[idx] = true;
        }
      }
      else {
        this.companyPriceList[idx] -= products.product_price * products.product_sel_cnt;
        this.checkedPrice -= products.product_price * products.product_sel_cnt;

        if(this.companyChecked[idx]) {
          this.companyChecked[idx] = false;
        }
        return;
      }
    },
    //그룹별
    checkComp(checked, companyIndex, idx){
      const productArray = this.cartList[companyIndex];
      if(checked) {
          let sum = 0;
          for(let i = 0; i < productArray.length; ++i) {
            if(!this.cartList[companyIndex][i].selected) {
              sum += productArray[i].product_price * productArray[i].product_sel_cnt;
              this.cartList[companyIndex][i].selected = true;
            }
          }
          this.companyPriceList[idx] += sum;
          this.checkedPrice += sum;
      }
      else { // 그룹별 체크가 풀린상태. (기존에 풀린건 냅두고, 선택된것만 풀어야함.)
          let sum = 0;
          for(let i = 0; i < productArray.length; ++i) {
            if(this.cartList[companyIndex][i].selected) {
              sum += productArray[i].product_price * productArray[i].product_sel_cnt;
              this.cartList[companyIndex][i].selected = false;
            }
          }
          this.companyPriceList[idx] = 0;
          this.checkedPrice -= sum;
      }
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
<style scoped>
table {
  border-top: solid 1.5px black;
  border-collapse: collapse;
  width: 100%;
  font-size: 14px;
  /* table-layout: fixed; */
}
thead {
  text-align: center;
  font-weight: bold;
}
tbody {
  font-size: 12px;
}
td.fixedcol1{
  width: 450px;
}
td.fixedcol2{
  width: 400px;
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
