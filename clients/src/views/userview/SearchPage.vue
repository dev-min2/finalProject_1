<template>
    <div>
        
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            myKeyword : '',
        }
    },
    created() {
        this.myKeyword = this.$route.params.keyword;
        this.getProductList(this.myKeyword);
        console.log(this.myKeyword);
    },
    methods : {
        async getProductList(keyword) {
            const result = await axios.get(`/api/product/search?q=${keyword}`);
            console.log(result);
        }
    }
}
</script>
