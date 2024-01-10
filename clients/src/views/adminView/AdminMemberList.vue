<template>
  <div class="memberListContainer">
    <h4>회원목록 조회</h4>

    <div class="labels">
      <label :class="{ active: selectedPermission === '일반회원' }" @click="changeMember(0)">일반 회원</label>
      <label :class="{ active: selectedPermission === '판매자' }" @click="changeMember(1)">판매자 회원</label>
      <label :class="{ active: selectedPermission === '탈퇴회원' }" @click="changeMember(2)">탈퇴 회원</label>
    </div>

    <table>
      <thead>
        <tr>
          <th>회원번호</th>
          <th>회원ID</th>
          <th>회원이름</th>
          <th>가입일</th>
          <th>연락처</th>
          <th>배송지</th>
        </tr>
      </thead>
      <tbody>
        <tr :key="i" v-for="(user,i) in AdminMemberList">
          <td>{{user.user_no}}</td>
          <td>{{user.user_id}}</td>
          <td>{{user.user_name}}</td>
          <td>{{$dateFormat(user.user_joindate)}}</td>
          <td>{{user.user_phone}}</td>
          <td>{{user.user_addr}}</td>
        </tr>
      </tbody>
    </table>

    <PaginationComp v-if="page !== null" :page="page" @go-page="getPage" style="margin-top:10px" />

  </div>
</template>

<script>
  import PaginationComp from '../../components/common/PaginationComp.vue'
  import axios from 'axios';

  export default {
    components: {
      PaginationComp
    },
    data() {
      return {
        AdminMemberList: [],
        pageNo: 1,
        page: null,
        selectedPermission: '일반회원',
        permission: '0',
        leave: '0'

      };
    },
    created() {
      if(this.$store.state.userPermission != 'F3') {
                this.$showFailAlert('권한이 없습니다.');
                this.$router.push({path : '/main'})
                return;
            }
      this.getAdminMemberList(1);
    },
    methods: {
      changeMember(permission) {
        if (permission == 0) {
          this.selectedPermission = '일반회원'
          this.leave = '0';
        } else if (permission == 1) {
          this.selectedPermission = '판매자'
          this.leave = '0';
        } else if (permission == 2) {
          this.selectedPermission = '탈퇴회원'
          this.leave = '1';
        }

        this.permission = permission
        this.getAdminMemberList(1);
      },

      async getPage(pageNo) {
        this.pageNo = pageNo;
        this.getAdminMemberList(this.pageNo);
      },
      async getAdminMemberList(pageNo) {
        this.pageNo = pageNo
        let result = '';
        this.$showLoading()
        try {
          result = await axios.get(`/api/product/AdminMemberList/${this.permission}/${this.leave}/${this.pageNo}`);
        } catch (e) {
          console.log(e);
        }
        this.AdminMemberList = result.data.selectResult;
        this.page = result.data.pageDTO;
        this.$hideLoading()
      }
    }
  }
</script>

<style scoped>
  body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
  }

  .memberListContainer {
    background-color: #f0f0f0;
    padding: 20px;
    border-radius: 10px;
    width: 80%;
    margin: 20px auto;
    border: 2px solid;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
    background-color: rgb(255, 255, 255);
  }

  th,
  td {
    padding: 12px;
    text-align: left;
    border: 2px solid #000000;
    text-align: center;
  }

  th {
    background-color: #646464;
    color: rgb(0, 0, 0);
  }

  /* .btn{
       
        border-radius: 3px;
        border: 2px solid;
        border-color: #646464;
    } */
  label {
    display: inline-block;
    cursor: pointer;
    padding: 5px 10px;
    margin-right: 10px;
    background-color: #ffffff;
    border: 1px solid #000000;
    border-radius: 4px;
  }

  label.active {
    background-color: rgb(0, 68, 146);
    color: rgb(255, 255, 255);
  }

  .labels {
    display: inline-block;
    margin: 10px;
    padding-top: 8px;
    padding-left: 10px;
    border: 2px solid;
    margin: 0px;
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

  .A {
    width: 180px;
    text-align: center;
    background-color: #d1d1d1;
  }
</style>