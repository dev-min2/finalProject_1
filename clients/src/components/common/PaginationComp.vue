<template>
    <div>
        <nav aria-label="Page navigation example">
            <ul class="pagination justify-content-center">
                <li class="page-item" v-if="page.prev == true">
                    <a class="page-link" href="#" style="border-color:#dee2e6;" @click="goPage(page.curPage - 1)">
                        <span aria-hidden="true" style="color: #fc97bc;">&laquo;</span>
                        <span class="sr-only">Previous</span>
                    </a>
                </li>
                <li class="page-item" v-for="(n,idx) in array" :key="idx">
                    <a v-if="(n) == page.curPage" class="page-link" href="#" style="background-color:#fab3cc; border-color:#dee2e6; color:white;" @click="goPage(n)">{{n}}</a>
                    <a v-else class="page-link" href="#" style="border-color:#dee2e6; color:black;" @click="goPage(n)">{{n}}</a>
                </li>
                <li class="page-item" v-if="page.next == true">
                    <a class="page-link" href="#" style="border-color:#dee2e6;" @click="goPage(page.curPage + 1)">
                        <span aria-hidden="true" style="color: #fc97bc;">&raquo;</span>
                        <span class="sr-only">Next</span>
                    </a>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
export default {    
    props : {
        page : Object
    },
    data() {
        return {
            array : []
        }
    },
    watch : {
        page(newVal, oldVal) {
            this.array = [];
            for(let i = this.page.startPage; i <= this.page.endPage; ++i) {
                this.array.push(i);
            }   
        }
    },
    created() {
        for(let i = this.page.startPage; i <= this.page.endPage; ++i) {
            this.array.push(i);
        }
    },
    methods : {
        // 페이징 이동은 부모 컴포넌트에서 처리. 자식은 페이지 값만 전달한다
        goPage(pageNo) {
            this.$emit('goPage',pageNo);
        }
    }
}
</script>
