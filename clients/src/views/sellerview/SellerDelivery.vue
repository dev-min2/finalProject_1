<template>
    <div id="container">
        <div class="delivery-toolbar">
            <div class="display-options">
                <label for="deliveryPerPage"> 표시할 배송 현황 갯수 </label>
                <select v-model="deliveryPerPage" @change="updateDeliveryPerPage" style="margin-left:10px">
                    <option value="5">5개</option>
                    <option value="10">10개</option>
                    <option value="20">20개</option>
                </select>
            </div>
            <div class="total-delivery">
                <h4>배송 현황</h4>
            </div>
            <div class="search-bar">
                <input type="text" placeholder="      회원 이름 검색" v-model="search" />
                <button @click="searchSellerDelivery()" style="border-radius:8px">검색</button>
            </div>
        </div>

        <table class="sellerDelivery">
            <thead>
                <tr>
                    <th>결제 번호</th>
                    <th>결제상품 번호</th>
                    <th>회원 이름</th>
                    <th>배송지 주소</th>
                    <th>상품 이름</th>
                    <th>구매 수량</th>
                    <th>주문일</th>
                    <th>운송장 번호</th>
                    <th>배송 상태</th>
                    <th>배송 상태 변경</th>
                </tr>
            </thead>
            <tbody>
                <tr :key="i" v-for="(delivery, i) in displayedDelivery">
                    <td class = "no">{{delivery.payment_no}}</td>
                    <td class = "no">{{delivery.payment_product_no}}</td>
                    <td class="name">{{ delivery.user_name }}</td>
                    <td class="addr">{{ delivery.receiver_addr }}</td>
                    <td class="pname">{{ delivery.product_name }}</td>
                    <td class="buycnt">{{ delivery.buy_cnt }}</td>
                    <td class="date">{{delivery.payment_date}}</td>
                    <td class="deliveryNo">{{ delivery.delivery_number }}</td>
                    <td class="state">{{delivery.delivery_state}}</td>
                    <!--<td><button @click="changeDeliveryState">변경하기</button></td>-->
                    <td><button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                          변경하기
                        </button>
                        <!-- Modal -->
                            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                              <div class="modal-dialog">
                                <div class="modal-content">
                                  <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel"> 운송장번호와 주소를 입력해 주세요.</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                  </div>
                                  <div class="modal-body">
                                    <table>                                
                                            <tr>
                                                <td>운송장번호</td>
                                                <td><input type = "text" v-model="deliveryNumber" ></td>
                                            </tr>

                                    </table>    
                                  </div>
                                  <div class="modal-footer">
                                    <button type="button" class="btn btn-primary" 
                                    @click="sellerDeliveryUpdate(delivery.payment_no,delivery.payment_product_no)">확인</button>
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
                                  </div>
                                </div>
                              </div>
                            </div>
                        </td>
                    
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        data() {
            return {
                sellerDeliveryList : [],
                search: '',
                deliveryPerPage: 5,
                currentPage: 1,
                deliveryNumber:'',
                addr:''
            };
        },
        created() {
            this.sellerDelivery();
        },
        computed: {
            displayedDelivery() {
                const startIndex = (this.currentPage - 1) * this.deliveryPerPage;
                const endIndex = startIndex + this.deliveryPerPage;
                return this.sellerDeliveryList.slice(startIndex, endIndex);
            },
        },
        methods: {
            async sellerDelivery() {
                let result = '';
                const userNo = 1;
                try {
                    result = await axios.get(
                        `/api/product/SellerDelivery/${userNo}`);
                } catch (e) {
                    console.log(e);
                }

                this.sellerDeliveryList = result.data;
            },
            async sellerDeliveryUpdate(paymentNo, paymentProductNo) {
                let result = '';
                let obj = {
                    param : {
                        addr : this.addr,
                        paymentProductNo : paymentProductNo,
                        deliveryNumber : this.deliveryNumber,
                        paymentNo : paymentNo
                    }
                }
                try {
                    result = await axios.put(
                        `/api/product/sellerDeliveryUpdate`,obj,{headers:{'Content-Type' : 'application/json'}});
                } catch (e) {
                    console.log(e);
                }
                this.sellerDeliveryList = result.data;
            },
            
 
                //배송상태 회원이름으로 검색
             async searchSellerDelivery() {
                let result = '';
                //const userNo = 1;
                try {
                    result = await axios.get(`/api/product/sellerDeliverySearchUserName/${this.search}`)
                    console.log('배송조회검색 :' + result);
                    
                } catch (e) {
                    console.log(e);
                }
                
                this.sellerDeliveryList = result.data;
            },
            updateDeliveryPerPage() {
                this.currentPage = 1;
            },
        }

    }
</script>

<style scoped>
.delivery-toolbar {
        display: flex;
        justify-content: space-between;
        background-color: #363636;
        padding: 10px;
        color: white;
        margin: 10px;
    }
    .no{
        width: 100px;
    }
    .name{
        width: 150px;
    }
    .buycnt{
        width: 100px;
    }
    .pname{
        width: 360px;
    }
    .date{
        width: 300px;
    }
    .state{
        width: 120px;
    }
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
</style>