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
                    <th>회원 이름</th>
                    <th>회원 주소</th>
                    <th>상품 이름</th>
                    <th>구매 수량</th>
                    <th>주문일</th>
                    <th>배송 상태</th>
                </tr>
            </thead>
            <tbody>
                <tr :key="i" v-for="(delivery, i) in displayedDelivery">
                    <td class = "no">{{delivery.payment_no}}</td>
                    <td class="name">{{ delivery.user_name }}</td>
                    <td class="addr">{{ delivery.user_addr }}</td>
                    <td class="pname">{{ delivery.product_name }}</td>
                    <td class="buycnt">{{ delivery.buy_cnt }}</td>
                    <td class="date">{{delivery.payment_date}}</td>
                    <td class="state">{{delivery.delivery_state}}<button @click="changeDeliveryState">변경하기</button></td>
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
                sellerDeliveryList: [],
                search: '',
                deliveryPerPage: 5,
                currentPage: 1,
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
        }

    }
</script>

<style>
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
        width: 200px;
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
        width: 250px;
    }
</style>