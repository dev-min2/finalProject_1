<template>
  <div class="container">
    <div class="top-bar">내 쿠폰 목록</div>
    <table>
      <thead>
        <tr>
          <td>쿠폰번호</td>
          <td>쿠폰이름</td>
          <td>할인율</td>
          <td>쿠폰상태</td>
          <td>쿠폰 수령일</td>
          <td>쿠폰 만료일</td>

        </tr>
      </thead>
      <tbody>
        <tr :key="i" v-for="(coupon,i) in UserCouponList">
          <td>{{coupon.my_coupon_no}}</td>
          <td v-if="coupon.coupon_state == 'B2'" data-bs-toggle="modal" :data-bs-target="'#exampleModal' + i"><a href="#" style="color : blue">{{coupon.coupon_name}}</a></td>
          <td v-else>{{coupon.coupon_name}}</td>
          <td>{{coupon.discount_pct}}%</td>
          <td>{{$getSubCodeName(coupon.coupon_state)}}</td>
          <td>{{$dateFormat(coupon.receive_date)}}</td>
          <td>{{$dateFormat(coupon.expire_date)}}</td>
          <!-- Modal -->
<div class="modal fade" :id="'exampleModal'+ i" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">쿠폰 사용내역</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class = "container2">
          <table>
            <tr>
              <td>쿠폰 이름</td>
              <td>{{coupon.coupon_name}}</td>
            </tr>
             <tr>
              <td>할인율</td>
              <td>{{coupon.discount_pct}}%</td>
            </tr>
            <tr>
              <td>쿠폰 만료일</td>
              <td>{{$dateFormat(coupon.expire_date)}}</td>
            </tr>
            <tr>
              <td>주문 일시</td>
              <td>{{dateFormat1(coupon.payment_date)}}</td>
            </tr>
            <tr>
              <td>주문 번호</td>
              <td><a href="sellerMain">{{coupon.payment_no}}</a></td>
            </tr>
          </table>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
        </tr>
      </tbody>
    </table>

    


    <PaginationComp v-if="page !== null" :page="page" @go-page="getPage" style="margin-top:10px"/>
  </div>
</template>

<script>
  import PaginationComp from '../../../components/common/PaginationComp.vue'
  import axios from 'axios';

  export default {
    components: {
      PaginationComp,
    },
    data() {
      return {
        UserCouponList: [],
        page: null,
        pageNo: 1,
      }
    },
    created() {
      this.getUserCouponList(1)
    },
    methods: {
        dateFormat1(date) {
    if (date) {
      return  new Date(date).toLocaleString();
    } else {
      return '';
    }
  },
      async getPage(pageNo) {
        this.pageNo = pageNo;
        this.getUserCouponList(this.pageNo);
      },
      async getUserCouponList(pageNo) {
        this.pageNo = pageNo
        let result = '';
        this.$showLoading();   
        try {
          result = await axios.get(`/api/user/myCoupon/${this.userNo}/${this.pageNo}`);
        } catch (e) {
          console.log(e);
        }
          this.UserCouponList = result.data.selectResult;
          this.page = result.data.pageDTO;      
          this.$hideLoading();
      },

    }
  }
</script>

<style scoped>
  .top-bar {
    background-color: #f3a1cb;
    color: rgb(255, 255, 255);
    padding: 10px;
    margin-bottom: 10px;
    margin-top: 5px;
    margin-left: 5px;
    font-weight: bold;
    font-size: 18px;
  }

  table {
    border-collapse: collapse;
    width: 100%;
    border: 2px solid #bbbbbb;
    text-align: center;
    margin-left: 10px;
  }

  th,
  td {
    border-collapse: collapse;
    padding: 8px;
    text-align: center;
    border: 2px solid #bbbbbb;
  }

  th {
    border: 2px solid #bbbbbb;
    background-color: #f2f2f2;

  }
  
</style>