<template>
  <section class="pt-2 pb-4">
    <div class="container px-4 px-lg-5 mt-3">
      <label for="datetimes">날짜 선택</label>
      <input type="date" name="datetimes" v-model="datetimes" />
      <button @click="searchByDate">조회</button>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      datetimes: "", // 선택한 날짜를 저장할 데이터
    };
  },

  methods: {
    getDurationDays(start_date, end_date) {
      // yyyymmdd 형식의 날짜를 받아서 일 수 차이를 계산하는 함수
      let s_time = new Date(
        start_date.substring(0, 4),
        start_date.substring(4, 6) - 1,
        start_date.substring(6, 8)
      );
      let e_time = new Date(
        end_date.substring(0, 4),
        end_date.substring(4, 6) - 1,
        end_date.substring(6, 8)
      );

      let days = (e_time - s_time) / 60 / 60 / 24 / 1000;

      return days;
    },

    searchByDate() {
      // 조회 버튼 클릭 시 실행될 함수
      // this.datetimes에 선택한 날짜가 저장되어 있음
      // 이를 활용하여 조회 로직을 구현
      console.log("Selected Date:", this.datetimes);
    },
  },
};
</script>
