<template>
  <div id="container">
    <table>
      <tr>
        <td>대분류</td>
        <td>
          <template v-if="categoryList !== null">
            <template v-for="(category, idx, idx2) in categoryList" :key="idx2">
              <input class="mr-1" type="radio" :id="'cate' + idx2" name="cate" v-model="selectedCategory"
                @click="radioCheck($event.target, idx2)" :value="category[0].parent_no" />
              <label :for="'cate' + idx2" class="mr-1">{{ category[0].parent_category_name }}</label>
            </template>
          </template>
        </td>
      </tr>
      <tr>
        <td>중분류</td>
        <td>
          <template v-if="categoryList !== null">
            <template v-for="(category, idx) in categoryList[selectedCategory]" :key="idx">
              <input class="mr-1" type="checkbox" :id="'subcate' + idx" name="subcate"
                @click="checkMiddle($event.target, selectedCategory, category.children_no)"
                :checked="selectedSubCategory.includes(category.children_no)" /><!-- selectedSubCategory.includes(category.children_no)는 selectedSubCategory 배열에 category.children_no 값이 포함되어 있는지 여부를 확인합니다.
                                                                                  이 값이 true이면 checkbox가 선택된 상태가 되고, false이면 선택되지 않은 상태가 됩니다.
                                                                                  따라서 이 부분은 특정 category.children_no가 selectedSubCategory에 포함되어 있으면 checkbox가 체크된 상태가 되도록 하는 것입니다. -->
              <label :for="'subcate' + idx" class="mr-1">{{ category.children_category_name }}</label> 
            </template>
          </template>
        </td>
      </tr>
      <tr>
        <td>공개 여부</td>
        <td>
          <input class="mr-1" type="radio" :id="'visibility'" name="visibility" v-model="visibility" :value="'I1'" />
          <label :for="'visibility1'" class="mr-1">공개</label> 
          <input class="mr-1" type="radio" :id="'visibility'" name="visibility" v-model="visibility" :value="'I2'" />
          <label :for="'visibility2'" class="mr-1">비공개</label> 
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
        categoryList: [],
        selectedCategory: 0,
        prevSelCategory: 0,
        showTest: false,
        subCate: '',
        selectedSubCategory: [],
        prevIdx: 0,
        ategoryList: '',
        visibility: 'I1',
      }
    },
    watch: {
      // 선택된 대분류 카테고리가 달라지면 중분류 선택했던 배열들을 초기화한다.
      selectedCategory(newVal, oldVal) {
        if (newVal != oldVal) {
          this.selectedSubCategory = [];
        }
      }
    },
    created() {
      this.getCategoryData();
    },
    methods: {
      searchProducts() {
        console.log('search:', this.visibility, this.selectedSubCategory);

        let categoryArray
        if (this.selectedCategory <= 0) {
          categoryArray = -1;

        } else {
          categoryArray = this.selectedSubCategory;
        }

        const sendObject = {
          categoryArray: categoryArray,
          publicStateNo: this.visibility //v-model="visibility" I1,I2값을 담아두었다가 여기서 꺼내씀
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
      checkMiddle(target, sel, categoryArray) {
        if (this.prevSelCategory != sel) {
          this.selectedSubCategory = [];
        }
        if (target.checked) {
          this.selectedSubCategory.push(categoryArray);
        }else {
        // 중분류를 선택 해제할 때 해당 항목을 배열에서 제거
        const indexToRemove = this.selectedSubCategory.indexOf(categoryArray);
        if (indexToRemove !== -1) {
            this.selectedSubCategory.splice(indexToRemove, 1);
        }
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