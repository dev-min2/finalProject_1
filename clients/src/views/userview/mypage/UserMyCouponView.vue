<template>
  <div class = "container">
    <div class="top-bar">나의 쿠폰</div>
    <table>
      <thead>
        <tr>
          <td>쿠폰이름</td>
          <td>할인율</td>
          <td>쿠폰 수령일</td>
          <td>쿠폰 만료일</td>
          <td>쿠폰상태</td>
        </tr>
      </thead>
      <tbody>
        <tr :key="i" v-for="(coupon,i) in UserCouponList">
          <td>{{coupon.coupon_name}}</td>
          <td>{{coupon.discount_pct}}</td>
          <td>{{coupon.receive_date}}</td>
          <td>{{coupon.expire_date}}일 후 만료</td>
          <td>{{coupon.coupon_state}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.top-bar {
        background-color: #ffdcee;
        color: rgb(255, 255, 255);
        padding: 10px;
        margin-bottom: 10px;
        margin-top: 5px;
        margin-left: 5px;
        font-weight: bold;
        font-size: 18px;
        text-shadow: -1px 0px rgb(0, 0, 0), 0px 1px rgb(0, 0, 0), 1px 0px rgb(0, 0, 0), 0px -1px rgb(0, 0, 0);
    }
    table {
        border-collapse: collapse;
        width: 100%;
        border: 2px solid #000000;
        text-align: center;
        margin-left: 10px;
    }

    th,
    td {
        border-collapse: collapse;
        padding: 8px;
        text-align: center;
        border: 2px solid #000000;
    }

    th {
        border: 2px solid #000000;
        background-color: #f2f2f2;

    }

</style>