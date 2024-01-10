<template>

    <div id="container" class="flex-container">
        <div class="table-header">검색 조건</div>
        <product-research-bar @send-period-price="getProductList"/>

        <div class="table-header mt-2">통계 차트</div>
        <div class="chart-container">
            <div id="donutchart" class="chart w-50"></div>
            <div id="BarChart" class="chart w-50"></div>
        </div>
        <div class="table-header">판매상품 순위 내역</div>
        <div class="my-1 mx-3 d-flex flex-row-reverse">
            <select>
                <option value='sell'>판매 수량</option>
                <option value='prodsell'>상품 매출</option>
                <option value='prodname'>상품 이름</option>
            </select>
        </div>
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
                    <td>{{i+1}}</td>
                    <td>{{product.product_no}}</td>
                    <td>{{product.product_name}}</td>
                    <td>{{product.product_price}}</td>
                    <td>{{product.product_stock}}</td>
                    <td>{{product.buy_cnt}}</td>
                    <td>{{product.allamount}}</td>
                </tr>
            </tbody>
        </table>
                <PaginationComp v-if="page !== null" :page="page" @go-page="getPage" />
    </div>
</template>

<script>
    import PaginationComp from '../../components/common/PaginationComp.vue'
    import axios from 'axios';
    import ProductResearchBar from './ProductResearchBar.vue';
    export default {
        components: {
            ProductResearchBar,
            PaginationComp
        },
        data() {
            return {
                ProductList: [],
                page : null,
                pageNo : 1,
                searchObject : {
                    period : 2,
                    minPrice : 0,
                    maxPrice : 0
                }
            };
        },
        created() {
            this.getProductList(this.searchObject);
            //this.initSellerChart();
        },


        methods: {
            async getPage(pageNo){
                this.pageNo = pageNo;
                this.getProductList(this.searchObject);

            },

            async getProductList(obj) {
                console.log('asd123',obj);
                this.searchObject = obj;
                let result = '';
                //const userNo = this.$store.state.userNo;
                const userNo = 1; // 나중에 위코드로 수저해야함.
                try {
                    result = await axios.get(`/api/product/seller-main/${userNo}/${obj.period}/${obj.minPrice}/${obj.maxPrice}/${this.pageNo}`);
                   // let period = req.params.period;

                } catch (e) {
                    console.log(e);
                }

                this.ProductList = result.data.selectResult;
                this.page = result.data.pageDTO;
                console.log(this.page);

                ////////////////////////////////차트
                google.charts.load("current", {
                    packages: ["corechart"]
                });
                google.charts.setOnLoadCallback(drawChart);

                //myThis를 선언해주는 이유 = drawChart 안에서 this.를 쓰면 인식이 안된다 console.log(this)하면 undefined뜸
                //콜백 경우에 따라 this가 있을수도 있고 없을수도 있다
                //const myThis = this    => 이 시점의 this를 myThis라는 변수에 담아주고 밑 함수에서 그걸 쓴다

                const myThis = this;

                function drawChart() {
                    let table = [];
                    table.push(['상품', '판매량']);

                    for (let i = 0; i < myThis.ProductList.length; ++i) {
                        let row = [];
                        //console.log(myThis.ProductList[i]);
                        row.push(myThis.ProductList[i].product_name);
                        row.push(myThis.ProductList[i].buy_cnt);

                        table.push(row);
                    }
                    var data = google.visualization.arrayToDataTable(table);
                    var options = {
                        title: '상품 판매량',
                        pieHole: 0.4,
                       
                    };
                    var chart = new google.visualization.PieChart(document.getElementById('donutchart'));
                    chart.draw(data, options);
                }
                google.charts.load("current", {
                    packages: ["corechart"]
                });
                
                google.charts.setOnLoadCallback(drawChart1);

                function drawChart1() {
                    let table = [];
                    table.push(['상품', '판매액']);
                    console.log('asdasdasd: '+ myThis.ProductList)
                    console.log('날짜선택 : '+myThis.selectedPeriod)
                    console.log('최소 : '+obj.minPrice+'최대 : '+obj.maxPrice)
                    for (let i = 0; i < myThis.ProductList.length; ++i) {
                        let row = [];
                        row.push(myThis.ProductList[i].product_name);
                        row.push(myThis.ProductList[i].allamount);

                        table.push(row);
                    }
                    console.log(table);

                    var data = google.visualization.arrayToDataTable(table);
                    var options = {
                        title: '상품 판매액',
                        colors: ['#5b83b5', '']

                    };

                    var chart = new google.visualization.BarChart(document.getElementById('BarChart'));
                    chart.draw(data, options);
                }
            },
         
        }

    }
</script>

<style scoped>
    .table-header {
        background-color: #5f5f5f;
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



    .flex-container {
        display: flex;
        flex-direction: column;
    }

    .chart-container {
        display: flex;
        justify-content: space-between;
    }

    .chart {
        width: 48%;
        /* 차트 너비 조절 */
        height: 500px;
    }

    .select {
        width: 30px;
        display: block;
        margin-left: 20px;
    }
</style>