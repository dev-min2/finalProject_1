<template>
<div>
<select id='select'>
  <option value='sell'>판매 수량</option>
  <option value='prodsell'>상품 매출</option>
  <option value='prodname'>상품 이름</option>  
</select>
  <table>
    <thead>
        <tr>
            <th>순위</th>
            <th>상품코드</th>
            <th>상품명/옵션</th>
            <th>판매가</th>
            <th>재고</th>
            <th>결제수량</th>
            <th>판매수량</th>
            <th>환불수량</th>
            <th>판매합계</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>1</td>
            <td>P001</td>
            <td>상품1/옵션1</td>
            <td>5000</td>
            <td>100</td>
            <td>50</td>
            <td>40</td>
            <td>5</td>
            <td>200000</td>
        </tr>
        <tr>
            <td>2</td>
            <td>P002</td>
            <td>상품2/옵션2</td>
            <td>7000</td>
            <td>80</td>
            <td>30</td>
            <td>25</td>
            <td>3</td>
            <td>175000</td>
        </tr>
        <tr>
            <td>3</td>
            <td>P003</td>
            <td>상품3/옵션3</td>
            <td>10000</td>
            <td>120</td>
            <td>60</td>
            <td>50</td>
            <td>8</td>
            <td>500000</td>
        </tr>
      
    </tbody>
</table>
</div>
</template>

<script>
export default {

}
</script>

<style>
        table {
            border-collapse: collapse;
            width: 100%;
            border: 2px solid #000000;
        }

        th, td {
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