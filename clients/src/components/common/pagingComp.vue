<template>
    <div>
        <nav aria-label="Page navigation example">
            <ul class="pagination justify-content-center">
                <li class="page-item" v-for="(n,idx) in array" :key="idx">
                    <a v-if="idx == curPageIdx " class="page-link" href="#" style="background-color:#fc97bf; border-color:#dee2e6;">1</a>
                    <a v-else class="page-link" href="#" style="border-color:#dee2e6;">1</a>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
export default {
    data() {
        return {
            array : [],
        }
    },
    created() {
        // console.log('하잉');
        // for(let i = this.pageDTO.startPage; i <= this.pageDTO.endPage; ++i) {
        //     array.push(i);
        // }
    },
    props : {
        pageDTO : {
            type : Object
        }
    },
    
}
</script>
