<template>
    <div id="container">
        <div class="delivery-toolbar">
            <div class="display-options">
                <label for="deliveryPerPage"> 표시할 배송 현황 갯수 </label>
                <select v-model="deliveryPerPage" @change="updateDeliveryPerPage($event.target)" style="margin-left:10px">
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
                <button @click="searchSellerDelivery()" type="button" class="btn text-white" style="background-color: #fab3cc; margin-left : 5px">검색</button>
            </div>
        </div>

        <table class="sellerDelivery mb-1">
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
                    <td class="no">{{delivery.payment_no}}</td>
                    <td class="no">{{delivery.payment_product_no}}</td>
                    <td class="name">{{ delivery.user_name }}</td>
                    <td class="addr">{{ delivery.receiver_addr }}</td>
                    <td class="pname">{{ delivery.product_name }}</td>
                    <td class="buycnt">{{ delivery.buy_cnt }}</td>
                    <td class="date">{{$dateFormat(delivery.payment_date)}}</td>
                    <td class="deliveryNo">{{ delivery.delivery_number }}</td>
                    <td class="state">{{$getSubCodeName(delivery.delivery_state)}}</td>
                    <!--<td><button @click="changeDeliveryState">변경하기</button></td>-->
                    <td>
                        <div>
                                <button v-if="delivery.delivery_state == 'C1'" type="button" class="btn text-white" style="background-color: #acb1f8;" data-bs-toggle="modal" @click="test"
                                    :data-bs-target="`#exampleModal${i}`">
                                    변경하기
                                </button>
                                <button v-else-if="delivery.delivery_state == 'C2'" type="button"  class="btn text-white" style="background-color: #acb1f8;" data-bs-toggle="modal" @click="test"
                                    :data-bs-target="`#exampleModal${i}`">
                                    변경하기
                                </button>
                                <button v-else type="button" class="btn btn-secondary">
                                    변경불가
                                </button>
                    </div>
                    </td>

                        <!-- Modal -->
                        <div class="modal fade" :id="`exampleModal${i}`" tabindex="-1" aria-labelledby="exampleModalLabel"
                            aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <template v-if="delivery.delivery_state == 'C1'">
                                            <h5 class="modal-title" id="exampleModalLabel"> </h5>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                aria-label="Close"></button>
                                        </template>
                                    </div>
                                    <div class="modal-header">
                                        <template v-if="delivery.delivery_state == 'C2'">
                                            <h5 class="modal-title" id="exampleModalLabel"> 운송장번호를 입력해 주세요.</h5>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                aria-label="Close"></button>
                                        </template>
                                    </div>
                                    
                                    <div class="modal-body">
                                        <template v-if="delivery.delivery_state == 'C1'">

                                            <h4>[배송 준비중] 상태로 변경하시겠습니까?</h4>

                                        </template>
                                        <template v-else-if="delivery.delivery_state == 'C2'">
                                            <table>
                                                <tr>
                                                    <td>운송장번호</td>
                                                    <td><input type="text" v-model="deliveryNumber" ></td>
                                                </tr>
                                            </table>
                                        </template>
                                    </div>
                                    <div class="modal-footer">
                                        <template v-if="delivery.delivery_state == 'C1'">
                                            <button type="button" class="btn text-white" style="background-color: #fab3cc;"
                                                @click="DeliveryStateChangeC2(delivery.payment_product_no)"
                                                data-bs-dismiss="modal">확인</button>
                                            <button type="button" class="btn btn-secondary"
                                                data-bs-dismiss="modal">닫기</button>
                                        </template>
                                        <template v-if="delivery.delivery_state == 'C2'">
                                            <button type="button" class="btn text-white" style="background-color: #fab3cc;"
                                                @click="sellerDeliveryUpdate(delivery.payment_no,delivery.payment_product_no)" data-bs-dismiss="modal">확인</button>
                                            <button type="button" class="btn btn-secondary"
                                                data-bs-dismiss="modal">닫기</button>
                                        </template>
                                    </div>
                                </div>
                            </div>
                        </div>
                    

                </tr>
            </tbody>
        </table>
        <PaginationComp v-if="page !== null" :page="page" @go-page="getSellerDeliveryList" />
    </div>
</template>

<script>
    import PaginationComp from '../../components/common/PaginationComp.vue'
    import axios from 'axios';
    export default {
        data() {
            return {
                sellerDeliveryList: [],
                search: '',
                deliveryPerPage: 5,
                currentPage: 1,
                deliveryNumber: '',
                addr: '',
                page : null
            };
        },
        components : {
            PaginationComp,
        },
        watch : {
            deliveryPerPage(newVal,oldVal) {
                if(newVal != oldVal) {
                    this.getSellerDeliveryList(1);
                }
            }
        },
        created() {
            if(this.$store.state.userPermission != 'F2') {
                this.$showFailAlert('권한이 없습니다.');
                this.$router.push({path : '/main'})
                return;
            }
            this.getSellerDeliveryList(1);
        },
        computed: {
            displayedDelivery() {
                const startIndex = (this.currentPage - 1) * this.deliveryPerPage;
                const endIndex = startIndex + this.deliveryPerPage;
                return this.sellerDeliveryList.slice(startIndex, endIndex);
            },
        },
        methods: {
             async getSellerDeliveryList(pageNo) {
                this.$showLoading();
                const result = await axios.get(`/api/product/SellerDelivery?pg=${pageNo}&showCnt=${this.deliveryPerPage}`);
                if(result.status == 200) {
                    this.sellerDeliveryList = result.data.selectResult;
                    this.page = result.data.pageDTO;
                }   
                this.$hideLoading();
            },
            test() {
                this.isModal = true;
            },
            async sellerDeliveryUpdate(paymentNo, paymentProductNo) {
                
                this.isModal = false;
                let result = '';
                let obj = {
                    param: {
                        addr: this.addr,
                        paymentProductNo: paymentProductNo,
                        deliveryNumber: this.deliveryNumber,
                        paymentNo: paymentNo,
                    }
                }
                try {
                    result = await axios.put(
                        `/api/product/sellerDeliveryUpdate`, obj, {
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        });
                } catch (e) {
                    console.log(e);
                }

                if(result.data.changedRows > 0) {
                    this.$showSuccessAlert('상태가 변경되었습니다');
                    //await this.sellerDelivery();
                   
                    for(let i = 0; i < this.sellerDeliveryList.length; ++i) {
                        if(this.sellerDeliveryList[i].payment_product_no == paymentProductNo) {
                            this.sellerDeliveryList[i].delivery_state = 'C3'
                            break;
                        }
                    }
                } else {
                    this.$showFailAlert('변경 실패');
                }
                this.deliveryNumber = '';
                
            },
            async DeliveryStateChangeC2(paymentProductNo) {
                this.isModal = false;
                let result = '';
                let obj = {
                    param: {
                        addr: this.addr,
                        paymentProductNo: paymentProductNo,
                        deliveryNumber: this.deliveryNumber,
                    }
                }
                console.log('현재paymentProductNo : ', paymentProductNo)
                result = await axios.put(`/api/product/DeliveryStateChangeC2`, obj, { headers: {'Content-Type': 'application/json'}});            
                if (result.data.changedRows > 0) {
                    this.$showSuccessAlert('상태가 변경되었습니다');
                    //await this.sellerDelivery();
                    for(let i = 0; i < this.sellerDeliveryList.length; ++i) {
                        if(this.sellerDeliveryList[i].payment_product_no == paymentProductNo) {
                            this.sellerDeliveryList[i].delivery_state = 'C2'
                            break;
                        }
                    }
                } else {
                    this.$showFailAlert('변경 실패');
                }

                //this.sellerDeliveryList = result.data;

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
            updateDeliveryPerPage(target) {
                console.log(target);
                this.currentPage = 1;
            },
        }

    }
</script>

<style scoped>

    .delivery-toolbar {
        display: flex;
        justify-content: space-between;
        background-color: #5f5f5f;
        padding: 10px;
        color: white;
        margin: 10px;
    }

    .no {
        width: 100px;
    }

    .name {
        width: 150px;
    }

    .buycnt {
        width: 100px;
    }

    .pname {
        width: 360px;
    }

    .date {
        width: 300px;
    }

    .state {
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
        border: 2px solid #bbbbbb;
    }

    th {
        border: 2px solid #bbbbbb;
        background-color: #f2f2f2;

    }
</style>