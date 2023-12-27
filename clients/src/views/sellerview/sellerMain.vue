<template>
<div id = "container" >
<div class="table-header">검색 조건</div>
<div class="table-header">통계 차트</div>
 <div class="table-header">판매상품 순위 내역</div>

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
            <th>판매수량</th>   
            <th>판매합계</th>
        </tr>
    </thead>
    <tbody>
        <tr :key="i" v-for="(product, i) in ProductList">
            <td>{{i}}</td>
            <td>{{product.product_no}}</td>
            <td>{{product.product_name}}</td>
            <td>{{product.product_price}}</td>
            <td>{{product.product_stock}}</td>
            <td>{{product.buy_cnt}}</td>
            <td>{{product.AllAmount}}</td>
        </tr>

      
    </tbody>
</table>
</div>
</template>

<script>
import axios from 'axios';
export default {
    data(){
        return {
            ProductList : []
        };
    },
    created(){
        this.getProductList();
    },
    methods : {
        async getProductList(){
            console.log('ㄴㄴ');
            let result = '';
            try {
                result = await axios.get(`/api/product/seller-main/1`);
            }
            catch(e) {
                console.log(e);
            }
            
            console.log(result);
            this.ProductList = result.data
        }
    }
}
</script>

<style>
 .table-header {
            background-color: #5f5f5f;
            color: rgb(255, 255, 255);
            padding: 10px;
            margin-bottom: 10px;
            font-weight: bold;
            font-size: 18px;
            text-shadow: -1px 0px rgb(0, 0, 0), 0px 1px rgb(0, 0, 0), 1px 0px rgb(0, 0, 0), 0px -1px rgb(0, 0, 0);
            
        }


        table {
            border-collapse: collapse;
            width: 100%;
            border: 2px solid #000000;
            text-align: center;
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