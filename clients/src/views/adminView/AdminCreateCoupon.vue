<template>
  <div class = "container">
    <div class="Copon-toolbar">
        <h4>쿠폰 생성</h4>
    </div>
    <hr>
     <li>쿠폰 이름 <input type="text"></li>
     <li>유효 기간 <input type = "date"></li>
     <li>할인율
        <select>
        <option value= 0>0%</option>
        <option value= 10 selected>10%</option>
        <option value= 15>15%</option>
        <option value= 20>20%</option>
        <option value= 25>25%</option>
        </select>      
    </li>
<hr>
  </div>
  
</template>

<script>
export default {

}
</script>

<style scoped>
.Copon-toolbar {
        display: flex;
        justify-content: space-between;
        background-color: #363636;
        padding: 10px;
        color: white;
        margin: 10px;
    }
</style>