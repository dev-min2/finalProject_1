<template>
<div id="layoutSidenav_content">
		<main>
			<div class="container-fluid px-4">
				<div class="px-4 py-1 my-3 text-center">
					<h2 class="fw-bold mb-3">문의사항</h2>
				</div>
				<div class="d-flex justify-content-center">
					<table class="table w-85">
						<thead>
							<tr align="center">
								<th>공개여부</th>
								<th>글번호</th>
								<th>문의정보</th>
								<th>제목</th>
								<th>작성자</th>
								<th>작성일</th>
								<th>문의상태</th>
							</tr>
						</thead>
						<tbody>
							<!-- <tr :key="idx" v-for="(wish, idx) in wishInfo" align="center">
								<td style="vertical-align : middle">
                                    <router-link :to="{ path : '/productdetail', query : { pno : wish.product_no}}">
                                    <img v-if="wish.pet_type == 'd1'" :src="$store.state.prImg + `dog/` + wish.product_image" style="width:100px" />
                                    <img v-else :src="$store.state.prImg + `cat/` + wish.product_image" style="width:100px" />
                                    </router-link>               
                                </td>
                                <td style="vertical-align : middle">    
                                    <router-link :to="{ path : '/productdetail', query : { pno : wish.product_no}}" style="text-decoration : none; color : black">
								    <p><span>{{wish.product_name}}</span></p>
                                    </router-link>
                                </td>                   
								<td style="vertical-align : middle"><p><span>{{wish.product_price}}원</span></p></td>
							</tr> -->
						</tbody>
					</table>
				</div>
			</div>
		</main>
	</div>
</template>

<script>
    import axios from 'axios'

    export default {
        components: {
        },
        data() {
            return {
                // wishInfo: [],
                // page: null,
            }
        },
        created() {
        //    this.wishResult();
        },
        methods: {
        //     async wishResult(){
        //         this.$showLoading();
        //         let result = await axios
        //                 .get(`/api/product/wish/${this.$store.state.userNo}`)
        //                 .catch(err => console.log(err));
        //                 this.wishInfo = result.data;
        //         this.$hideLoading();
        //     },
        //     async delfunction(wish){
        //         this.$showLoading();
        //         let result = await axios  
        //                     .delete(`/api/product/wish/${this.$store.state.userNo}/${wish.product_no}`)
        //                     .catch(err => console.log(err));
        //     if(result.data.affectedRows > 0){
        //         this.$showSuccessAlert("찜이 취소되었습니다.");
        //             }
        //             const wishResult = await axios
        //                 .get(`/api/product/wish/${this.$store.state.userNo}`)
        //                 .catch(err => console.log(err));
        //                 this.wishInfo = wishResult.data;
        //             this.$hideLoading();
        // }
    }
}    
</script>
<style scoped>
</style>