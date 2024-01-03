<template>
  <div id="container">
    <table>
      <tr>
        <td>대분류</td>
        <td>
          <template v-if="categoryList !== null">
            <template  v-for="(category, idx, idx2) in categoryList" :key="idx2">
              <input class="mr-1" type="radio" id="cate" name="cate" v-model="selectedCategory"
                @click="radioCheck($event.target,idx2)" :value="category[0].parent_no">
              <label class="mr-1" for="cate">{{category[0].parent_category_name}}</label>
            </template>
          </template>
        </td>
      </tr>
      <tr>
        <td>중분류</td>
        <td>
          <template v-if="categoryList !== null">
            <template v-for="(category, idx) in categoryList[selectedCategory]" :key="idx">
              <input class="mr-1" type="checkbox" :id="idx" name="subcate" @click="checkMiddle($event.target,selectedCategory, category.children_no)">
              <label class="mr-1" :for="idx">{{category.children_category_name}}</label>
            </template>
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
      </tr>
    </table>
    <button @click="searchProducts">검색</button>
  </div>
</template>


<script>
  import axios from 'axios'
  export default {
    data() {
      return {
        categoryList : [],
        selectedCategory : 0,
        prevSelCategory : 0,
        showTest: false,
        subCate: '',
        selectedSubCategory: [],
        prevIdx: 0,
        ategoryList: '',
        visibility: '',
      }
    },
    watch : {
      // 선택된 대분류 카테고리가 달라지면 중분류 선택했던 배열들을 초기화한다.
      selectedCategory(newVal,oldVal) {
        if(newVal != oldVal) {
          this.selectedSubCategory = [];
        }
      }
    },
    created() {
      this.getCategoryData();
    },
    methods: {
      searchProducts() {
        let categoryNo;
        if(this.selectedCategory <= 0) {
          categoryNo = -1;
        }
        else {
          categoryNo = this.selectedSubCategory;
        }

        const sendObject = {
          categoryNo: categoryNo,
          publicStateNo: this.visibility == true ? 'I1' : 'I2'
        }

        this.$emit('send-search', sendObject)
      },
      radioCheck(target, curIdx) {
        if (this.prevIdx == curIdx) {
          target.checked = false;
          this.prevIdx = -1;
          this.selectedCategory = 0;
          return;
        }
        this.prevIdx = curIdx;
      },
      checkMiddle(target, sel, categoryNo) {
        if(this.prevSelCategory != sel) {
          this.selectedSubCategory = [];
        }

        if(target.checked) {
          this.selectedSubCategory.push(categoryNo);
        }
        this.prevSelCategory = sel;
      },
      async getCategoryData() {
        // 서버에 요청
        const result = await axios.get(`/api/product/category`).catch((err) => console.log(err));
        this.categoryList = result.data; //저장
        console.log(this.categoryList);
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
        console.log(this.categoryList);
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