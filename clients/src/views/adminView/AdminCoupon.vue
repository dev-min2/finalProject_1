<template>
    <div class="container">
        <div class="Copon-toolbar">
            <h4>쿠폰 관리</h4>
        </div>
        <table>
            <thead>
                <tr>
                    <th>쿠폰 번호</th>
                    <th>쿠폰 이름</th>
                    <th>할인율</th>
                    <th>만료일</th>
                    <th>쿠폰 지급</th>
                </tr>
            </thead>
            <tbody>
                <tr :key="i" v-for="(coupon, i) in AdminCouponInfoList">
                    <td>{{coupon.coupon_no}}</td>
                    <td>{{coupon.coupon_name}}</td>
                    <td>{{coupon.discount_pct}}</td>
                    <td>{{coupon.expire_date}}일 후 만료</td>
                    <td><button type="button" class="btn btn-primary" data-bs-toggle="modal"
                            data-bs-target="#exampleModal2" @click="loadAdminMemberList(coupon)">쿠폰 지급</button></td>
                </tr>
            </tbody>
            <!-- Modal2 -->
            <div class="modal fade" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"
                id="exampleModal2">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">
                                회원 목록
                            </h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <table>
                                <thead>
                                    <tr>
                                        <th>회원번호</th>
                                        <th>회원ID</th>
                                        <th>회원이름</th>
                                        <th>지급</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr :key="i" v-for="(user,i) in AdminMemberList">
                                        <td>{{user.user_no}}</td>
                                        <td>{{user.user_id}}</td>
                                        <td>{{user.user_name}}</td>
                                        <td><button type="button" class="btn btn-primary" data-bs-dismiss="modal"
                                                @click="giveCoupon(user, selectedCoupon)">지급하기</button></td>
                                    </tr>
                                </tbody>
                            </table>
                            <PaginationComp2 v-if="userPage !== null" :page="userPage" @go-page="getPage2" style="margin-top:5px" />
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" data-bs-dismiss="modal">확인</button>
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
                        </div>
                    </div>
                </div>
            </div>
        </table>
        <PaginationComp v-if="page !== null" :page="page" @go-page="getPage" style="margin-top:5px" />

        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            쿠폰 생성
        </button>
        <!-- Modal -->
        <div class="modal fade" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" id="exampleModal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel"></h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="Copon-toolbar">
                            <h4>쿠폰 정보 생성</h4>
                        </div>
                        <hr>
                        <li>쿠폰 이름 <input type="text" v-model="couponInfo.coupon_name"></li>
                        <li>유효 일수<input type="number" v-model="couponInfo.expire_date"></li>
                        <li>할인율
                            <select v-model="couponInfo.discount_pct">
                                <option value="10" selected>10%</option>
                                <option value="15">15%</option>
                                <option value="20">20%</option>
                                <option value="25">25%</option>
                                <option value="25">30%</option>
                            </select>
                        </li>
                        <hr>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" @click="createCouponInfo()"
                            data-bs-dismiss="modal">확인</button>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import PaginationComp from '../../components/common/PaginationComp.vue'
    import PaginationComp2 from '../../components/common/PaginationComp.vue'
    import axios from 'axios';

    export default {
        data() {
            return {
                AdminCouponInfoList: [],
                AdminMemberList: [],
                page: null,
                pageNo: 1,
                userPage : null,
                userPageNo : 1,
                permission: '0',
                leave: '0',
                couponInfo: {
                    coupon_name: '',
                    expire_date: '',
                    discount_pct: 10
                },
                giveCouponInfo: {
                    receive_date: '2024-01-01',
                    coupon_state: 'B1',
                    user_no: '',
                    coupon_no: '',
                },
                selectedCoupon: '',//Null?
            }
        },
        components: {
            PaginationComp,
            PaginationComp2
        },
        created() {
            if(this.$store.state.userPermission != 'F3') {
                this.$showFailAlert('권한이 없습니다.');
                this.$router.push({path : '/main'})
                return;
            }
            this.getAdminCouponList(1)
           
        },
        methods: {
            async createCouponInfo() {
                let obj = {
                    param: {
                        couponName: this.couponInfo.coupon_name,
                        expireDate: this.couponInfo.expire_date,
                        discountPct: this.couponInfo.discount_pct
                    }
                }
                let result = await axios.post(`/api/product/adminCreateCoupon`, obj);
                if (result.data.insertId > 0) {
                    this.$showSuccessAlert('쿠폰 정보 생성됨');

                    if (this.pageNo < this.page.endPage) { //
                        this.getAdminCouponList(this.page.endPage);
                    } else {
                        // 현재 페이지가 마지막 페이지보다 작다면 현재 페이지를 갱신
                        this.getAdminCouponList(this.pageNo);
                    }
                } else {
                    this.$showFailAlert('쿠폰 정보 생성 실패');
                }
            },
            async getAdminCouponList(pageNo) {
                this.pageNo = pageNo
                let result = '';
                this.$showLoading();
                try {
                    result = await axios.get(`/api/product/AdminCouponInfoList/${this.pageNo}`);
                } catch (e) {
                    console.log(e)
                }
                if (result.status == 200) {
                    this.AdminCouponInfoList = result.data.selectResult;
                    this.page = result.data.pageDTO;
                }
                this.$hideLoading();
            },
            async getPage(pageNo) {
                this.pageNo = pageNo;
                this.getAdminCouponList(this.pageNo);

            },
            async getPage2(userPageNo) {
                this.userPageNo = userPageNo;
                this.loadAdminMemberList(this.coupon);

            },

            async loadAdminMemberList(coupon) {
                this.selectedCoupon = coupon;
                 this.AdminMemberList = [];
                // 쿠폰 지급 버튼 클릭 시 회원 목록을 불러오는 메소드
                try {
                    const result = await axios.get(
                        `/api/product/AdminMemberList2/${this.permission}/${this.leave}/${this.userPageNo}`);
                    this.AdminMemberList = result.data.selectResult;
                    this.userPage = result.data.pageDTO;
                } catch (e) {
                    console.error(e);
                }
            },
            async giveCoupon(user) {
                // 회원에게 쿠폰 발급
                let obj = {
                    param: {
                        receiveDate: this.giveCouponInfo.receive_date,
                        couponState: this.giveCouponInfo.coupon_state,
                        userNo: user.user_no,
                        couponNo: this.selectedCoupon.coupon_no
                    }    
                }
                try {
                    const result = await axios.post(`/api/product/giveAdminCoupon`, obj);
                    if (result.data.insertId > 0) {
                        this.$showSuccessAlert('쿠폰 발급 성공');
                    } else {
                        this.$showFailAlert('쿠폰 발급 실패');
                    }
                } catch (e) {
                    console.log(e)
                }
            },
        }
    }
</script>

<style scoped>
    .modal-dialog {
        max-width: 50%;
    }

    .Copon-toolbar {
        display: flex;
        justify-content: space-between;
        background-color: #5f5f5f;
        padding: 10px;
        color: white;
        margin: 10px;
    }

    .container {
        background-color: #f0f0f0;
        padding: 20px;
        border-radius: 10px;
        width: 80%;
        margin: 20px auto;
        border: 2px solid;
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