<template>
  <div id="search-options">
    <!-- 기간 선택 -->
    <div>
      <table>
        <tr class>
          <td class="A">
            <span>기간</span>
          </td>
          <td class="B">
            <div class = "labels">
            <label :class="{ active: selectedPeriod === 'today' }" @click="changePeriod(0)">오늘</label>
            <label :class="{ active: selectedPeriod === '1week' }" @click="changePeriod(1)">7일</label>
            <label :class="{ active: selectedPeriod === '1month' }" @click="changePeriod(2)">1개월</label>
            <label :class="{ active: selectedPeriod === '3month' }" @click="changePeriod(3)">3개월</label>
            <label :class="{ active: selectedPeriod === '6month' }" @click="changePeriod(4)">6개월</label>
            </div>
            <div class = "date">
            <input type="date" v-model="date1">~<input type="date" v-model="date2">
            </div>
          </td>
        </tr>
        <tr>
          <td class="A">
            <div>
              <span>상품 판매가격</span>
            </div>
          </td>
          <td class="B">
            <input type="text" v-model="minPrice"  style="width: 80px" placeholder="최소 가격" /> ~
            <input type="text" v-model="maxPrice"  style="width: 80px" placeholder="최대 가격"/>
            
          </td>
        </tr>
      </table>
      <button @click="search">검색</button>
    </div>
  
  </div>
  
</template>

<script>

export default {
  components: {
  
  },
  data() {
    return {
     selectedPeriod: '1month',
     date1:'',
     date2:'',
     period : 2,
     minPrice:'', 
     maxPrice:''
    
    };
  },

  methods: {
    changePeriod(period) {
      if(period == 0) {
        this.selectedPeriod = 'today'
      }
      else if(period == 1){
        this.selectedPeriod = '1week'
      }
      else if(period == 2){
        this.selectedPeriod = '1month'
      }
      else if(period == 3){
        this.selectedPeriod = '3month'
      }
      else if(period == 4){
       this.selectedPeriod = '6month'
      }
      this.period = period
      // this.$emit('emit-name',period);
      // this.$emit('emit2-name',period);

    },

    // 검색버튼 동작
    search() {
      const sendObject = {
        period : this.period,
        minPrice : this.minPrice == '' ? 0.1 : this.minPrice,
        maxPrice : this.maxPrice == '' ? 99999999999999 : this.maxPrice
      }

      this.$emit('send-period-price',sendObject);
   
    },
  },
  watch : {
    minPrice(newVal, o) {
      console.log(newVal);
    },
    maxPrice(newVal, o) {
      console.log(newVal);
    }
  }
};
</script>

<style scoped>
#search-options {
  margin-top: 10px;
  display: inline-block;
  width: 1200px;
}

.A {
  width: 180px;
  text-align: center;
  background-color: #d1d1d1;
}

.B {
  text-align: left;
  background-color: #eeeded;
}


label {
  display: inline-block;
  cursor: pointer;
  padding: 5px 10px;
  margin-right: 10px;
  background-color: #ffffff;
  border: 1px solid #000000;
  border-radius: 4px;
}

.labels{
  display: inline-block;
  margin: 10px;
  padding-top: 8px;
  padding-left: 10px;
  border: 2px solid;
  margin: 0px;
  
 
  
}

label.active {
  background-color: rgb(0, 68, 146);
  color: rgb(255, 255, 255);
}

button {
  margin-top: 10px;
  margin-left: 10px;
  padding: 5px 10px;
  background-color: #dfdfdf;
  color: rgb(0, 0, 0);
  border: 0.5px solid;
  border-radius: 3px;
  cursor: pointer;
  font-weight: bold;
}

button:hover {
  background-color: #b6b6b6;
}

.date{
  margin-left: 30px;
  display: inline-block;
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
