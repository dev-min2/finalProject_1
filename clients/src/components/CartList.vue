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
            <td>나중에 hidden하기 </td>
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
                @change="checkProd($event.target, products, idx, companyIndex,productsIndex)"
              />
            </td>
            <td>{{products.cart_no}}</td>
            <td>
              <router-link :to="{ path : '/productdetail', query : { pno : products.product_no}}">
                  <img v-if="products.pet_type == 'd1'" :src="$store.state.prImg + `dog/` + products.product_image" style="width:100px" />
                  <img v-else :src="$store.state.prImg + `cat/` + products.product_image" style="width:100px" />
                  </router-link>               
              </td>
            <td>
              <router-link :to="{ path : '/productdetail', query : { pno : products.product_no}}">{{products.product_name}}</router-link>
              <br />
              <span class="price">가격 : {{ products.product_price }}</span>
            </td>
            <td class="cart_list_option">
              <p>선택수량 : {{ products.product_sel_cnt }}</p>
              <input
                type="button"
                value="▲"
                class="cart_list_optionbtn"
                @click="upfunction($event.target, products, idx, companyIndex)"
              />
              <input
                type="button"
                value="▼"
                class="cart_list_optionbtn"
                @click="downfunction($event.target, products, idx, companyIndex)"
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
            <td colspan="2"><h4>선택 상품금액 : {{companyPriceList[idx]}}원 <br> 배송비 : {{deliveryPriceList[idx]}}원 <hr>결제금액 : {{companyPriceList[idx] + deliveryPriceList[idx]}}원</h4></td>
          </tr>
          <br>
          <br>
          <br>
        </tfoot>
      </table>
    </template>
    <td class="total">
      <h4 v-if="cartList && Object.keys(cartList).length > 0">총 선택 상품금액 : {{checkedPrice}}원<br>총 배송비 : {{totalPrice()}}원 <hr>총 결제금액 : {{checkedPrice + totalPrice()}}원</h4> 
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
      //전체 상품배열
      cartList: [],
      //총 선택 상품금액
      checkedPrice:0,
      //상품 개별 선택할때 업체 그룹체크 확인하는 배열
      companyChecked : [],
      //업체별 선택한 상품금액 배열
      companyPriceList : [],
      //업체별 선택한 상품 배송비 배열
      deliveryPriceList : [],
      //선택상품 cart_no
      CartNoList : []
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
          this.deliveryPriceList.push(0);
      }
      this.$hideLoading();
    },
    //상품선택수량증가
    async upfunction(target, products, idx, companyIndex){
     companyIndex
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
          if(this.companyPriceList[idx] >= 30000){
            this.deliveryPriceList[idx] = 0;
            }else if(this.companyPriceList[idx] > 0){
              this.deliveryPriceList[idx] = 3000;
            }else if(this.companyPriceList[idx] <= 0){
              this.deliveryPriceList[idx] = 0;
            }  
                    
        }
        if(!products.selected) {
          products.selected = true;
          target.checked = true;
          this.checkProd(target,products,idx,companyIndex);
        }
      }
    },
    //상품선택수량감소
    async downfunction(target, products, idx, companyIndex){
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
          if(this.companyPriceList[idx] >= 30000){
            this.deliveryPriceList[idx] = 0;
            }else if(this.companyPriceList[idx] > 0){
              this.deliveryPriceList[idx] = 3000;
            }else if(this.companyPriceList[idx] <= 0){
              this.deliveryPriceList[idx] = 0;
            }
        }if(!products.selected) {
          products.selected = true;
          target.checked = true;
          this.checkProd(target,products,idx,companyIndex);
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
        if(this.companyPriceList[idx] >= 30000){
              this.deliveryPriceList[idx] = 0;
            }else if(this.companyPriceList[idx] > 0){
              this.deliveryPriceList[idx] = 3000;
            }else if(this.companyPriceList[idx] <= 0){
              this.deliveryPriceList[idx] = 0;
            }
      }  
    },
    //상품별 체크박스
    checkProd(target, products,idx,companyIndex, productsIndex){
      if(target.checked) {
        //상품 체크됐을 때 가격
        this.companyPriceList[idx] += products.product_price * products.product_sel_cnt ;
        this.checkedPrice += products.product_price * products.product_sel_cnt;
        const productArray = this.cartList[companyIndex];


        //선택한 카트 번호 배열에 담기 (민)
        if(this.CartNoList.indexOf(productArray[productsIndex].cart_no) < 0){
              this.CartNoList.push(productArray[productsIndex].cart_no); //선택한 번호 추가
        }

        let isAllCheck = true;
        for(let i = 0; i < productArray.length; ++i) {
          if(!this.cartList[companyIndex][i].selected) {
            isAllCheck = false;
            break;
          }

        }
        //상품 체크했을 때 배송비 추가
        if(isAllCheck && !this.companyChecked[idx]) {
          this.companyChecked[idx] = true;
        }
        if(this.companyPriceList[idx] >= 30000){
              this.deliveryPriceList[idx] = 0;
            }else if(this.companyPriceList[idx] > 0){
              this.deliveryPriceList[idx] = 3000;
            }else if(this.companyPriceList[idx] <= 0){
              this.deliveryPriceList[idx] = 0;
            }      
      }
      else {
        //체크 해제했을 때 상품 총가격, 배송비 빼기
        this.companyPriceList[idx] -= products.product_price * products.product_sel_cnt;
        this.checkedPrice -= products.product_price * products.product_sel_cnt;
        if(this.companyChecked[idx]) {
          this.companyChecked[idx] = false;
        }
        if(this.companyPriceList[idx] >= 30000){
              this.deliveryPriceList[idx] = 0;
            }else if(this.companyPriceList[idx] > 0){
              this.deliveryPriceList[idx] = 3000;
            }else if(this.companyPriceList[idx] <= 0){
              this.deliveryPriceList[idx] = 0;
            }    

        //선택한 카트 번호 배열에서 삭제 (민)
        const productArray = this.cartList[companyIndex];
        const index = this.CartNoList.indexOf(productArray[productsIndex].cart_no);
        this.CartNoList.splice(index, 1);

        return;
      }
      //데이터 부모한테 보내기 (민)
      this.$emit('productNo', this.CartNoList, this.deliveryPriceList);
    },
    //총배송비 함수
    totalPrice() {
      let sum = 0;
      for(let i = 0; i < this.deliveryPriceList.length; ++i) {
        sum += this.deliveryPriceList[i];
      }
      
      return sum;
    },
    //그룹별 체크박스
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
          if(this.companyPriceList[idx] >= 30000){
              this.deliveryPriceList[idx] = 0;
            }else if(this.companyPriceList[idx] > 0){
              this.deliveryPriceList[idx] = 3000;
            }else if(this.companyPriceList[idx] <= 0){
              this.deliveryPriceList[idx] = 0;
            }

            //선택한 카트 번호 배열에 담기 (민)
            for(let i = 0; i<productArray.length; i++ ){
                if(this.CartNoList.indexOf(productArray[i].cart_no) >= 0){
                  continue;
                }
                this.CartNoList.push(productArray[i].cart_no)
            }
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
          if(this.companyPriceList[idx] >= 30000){
              this.deliveryPriceList[idx] = 0;
            }else if(this.companyPriceList[idx] > 0){
              this.deliveryPriceList[idx] = 3000;
            }else if(this.companyPriceList[idx] <= 0){
              this.deliveryPriceList[idx] = 0;
            }
          //선택한 번호 카트번호 배열에서 삭제 (민)
          for(let i = 0; i< productArray.length; i++ ){
                const index = this.CartNoList.indexOf(productArray[i].cart_no);
                this.CartNoList.splice(index, 1);
          }
      }
      //데이터 부모한테 보내기 (민)
      this.$emit('productNo', this.CartNoList, this.deliveryPriceList); 
    },
    //그룹바이함수
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
