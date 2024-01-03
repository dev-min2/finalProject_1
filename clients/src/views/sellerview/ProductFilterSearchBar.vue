<template>
<div id="container">
  <table>
    <tr>
      <td>대분류</td>
      <td>
        <template v-for="(category, idx, idx2) in categoryList" :key="idx2">
          <input class="mr-1" type="radio" id="cate" name="cate" v-model="selectedCategory" @click="radioCheck($event.target,idx2)" :value="category[0].parent_no" > 
          <label class="mr-1" for="cate">{{category[0].parent_category_name}}</label>
        </template>
      </td>
    </tr>
    <tr>
      <td>중분류</td>
      <td>
        <template v-for="(category, idx) in categoryList[selectedCategory]" :key="idx2">
          <input class="mr-1" type="checkbox" :id="idx" name="subcate" >
          <label class="mr-1" :for="idx">{{category.children_category_name}}</label>
        </template> 
      </td>
    </tr>
    <tr>
      <td>공개 여부</td>
      <td>
        <input class="mr-1" type="radio" id="visibility" name="visibility" v-model="visibility" :value='"i1"'>
        <label class="mr-1" for="visibility">공개</label>
        <input class="mr-1" type="radio" id="visibility" name="visibility" v-model="visibility" :value='"i2"'>
        <label class="mr-1" for="visibility">비공개</label>
      </td>
      <input type="hidden" ref="hiddenIn">
    </tr>
 </table>
    <button @click="showTest = !showTest">검색</button>
    <p v-show="showTest">{{subCate}}</p>
</div>
  </template>


<script>
  import axios from 'axios'
  export default {
    data() {
      return {
      selectedCategory: 0,
      showTest : false,
      subCate : '',
      selectedSubCategory : [],
      prevIdx : 0,
      subCategories: {
        dryFood: false,
        wetFood: false,
        homemadeSnack: false,
        canPouch: false,
        wholeMeat: false,
        nutritionalSupplement: false,
        skinCoat: false,
        boneJoint: false,
        shampooConditioner: false,
        brush: false,
        nailCare: false,
        },
        categoryList : '',
        visibility : '',
      }
    },
    created() {
      this.prevTarget = this.$refs.hiddenIn;
      this.getCategoryData();
    },
    methods: {
      searchProducts() {
        const sendObject = {
          categoryNo : categoryNo,
          publicStateNo : this.visibility == true ? 'I1' : 'I2'
        }

        this.$emit('send-categoryNo-publicStateNo',sendObject);
        
      },
      radioCheck(target,curIdx) {
        if(this.prevIdx == curIdx) {
          target.checked = false;
          this.prevIdx = -1;  
          this.selectedCategory = -1;
          return;
        }
        this.prevIdx = curIdx;
      },
    async getCategoryData() {
        // 서버에 요청
        const result = await axios.get(`/api/product/category`).catch((err) => console.log(err));
        this.categoryList = result.data; //저장
        
        const groupBy = function (data, key) {
          return data.reduce(function (carry, el) {
            var group = el[key];
            if (carry[group] === undefined) {
              carry[group] = []
            }
            carry[group].push(el)
            return carry
          }, {});
        };

        this.categoryList = groupBy(this.categoryList, "parent_no");
        for(let object in this.categoryList) {
          
        }
      }
   }
  }
</script>



<style scoped>
#container {
  margin-top: 10px;
  display: inline-block;
  width: 1200px;
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