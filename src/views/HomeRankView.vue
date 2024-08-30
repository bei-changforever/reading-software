<template>
    <div class="home-rank">
        <van-icon name="arrow-left" @click="$router.go(-1)" />
    </div>
</template>

<script>
import { getMergedRank } from "@/apis/homeApi/homeApi";
    export default {
        name:'HomeRank',
        mounted(){
            this.getMerged()
        },
        methods:{
            async getMerged() {
                let data = await getMergedRank()
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>