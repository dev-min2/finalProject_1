<template>
  <table class="cart_list">
    <h1>업체명</h1>
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
    <tbody></tbody>
    <tfoot></tfoot>
  </table>
</template>
<script>
export default {
  data() {
    return {
      cartLists: [{}],
    };
  },
};
</script>
