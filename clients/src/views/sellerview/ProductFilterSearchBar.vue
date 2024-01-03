<template>
<div id="container">
  <table>
    <tr>
      <td>대분류</td>
      <td>
        <input type="radio" v-model="selectedCategory" value="feed"> 사료
        <input type="radio" v-model="selectedCategory" value="snack"> 간식
        <input type="radio" v-model="selectedCategory" value="health"> 건강관리
        <input type="radio" v-model="selectedCategory" value="beauty"> 목욕/미용
      </td>
    </tr>
    <tr>
      <td>중분류</td>
      <td>
        <div v-if="selectedCategory === 'feed'" class="subcategory">
          <input type="checkbox" v-model="subCategories.dryFood"> 건식사료
          <input type="checkbox" v-model="subCategories.wetFood"> 습식사료
        </div>
        <div v-if="selectedCategory === 'snack'" class="subcategory">
          <input type="checkbox" v-model="subCategories.homemadeSnack"> 수제간식
          <input type="checkbox" v-model="subCategories.canPouch"> 캔/파우치
          <input type="checkbox" v-model="subCategories.wholeMeat"> 통살
        </div>
        <div v-if="selectedCategory === 'health'" class="subcategory">
          <input type="checkbox" v-model="subCategories.nutritionalSupplement"> 종합영양제
          <input type="checkbox" v-model="subCategories.skinCoat"> 피부/모질
          <input type="checkbox" v-model="subCategories.boneJoint"> 뼈/관절
        </div>
        <div v-if="selectedCategory === 'beauty'" class="subcategory">
          <input type="checkbox" v-model="subCategories.shampooConditioner"> 샴푸/린스
          <input type="checkbox" v-model="subCategories.brush"> 브러쉬
          <input type="checkbox" v-model="subCategories.nailCare"> 발톱/발관리
        </div>
      </td>
    </tr>
    <tr>
      <td>공개 여부</td>
      <td>
        <input type="checkbox" v-model="visibility.public"> 공개
        <input type="checkbox" v-model="visibility.private"> 비공개
      </td>
    </tr>
 </table>
    <button @click="searchProducts">검색</button>
</div>
  </template>


<script>

  export default {
    data() {
      return {
      selectedCategory: '',
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
      visibility: {
        public: true,
        private: false,
      },
      }
    },
    methods: {
    searchProducts() {
      const sendObject = {
        categoryNo : this.categoryNo,
        publicStateNo : this.publicStateNo
      }

      this.$emit('send-categoryNo-publicStateNo',sendObject);
   
    },
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