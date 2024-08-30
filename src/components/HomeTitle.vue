<template>
     <div class="home-title">
           {{ title }}
           <div class="more-btn" v-if="showMore" @click="replaceUrl">更多</div>
    </div>
</template>

<script>
    export default {
        name:'HomeTitle',
        props:{
            title: String,
            showMore: {
                type: Boolean,
                default: false
            },
            src: String,
            query: Object
        },
        methods:{
            replaceUrl(){
                this.$router.push({
                    path: this.src,
                    query: this.query
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
.home-title {
    
    width: 100%;
    height: 40px;
    padding: 10px;
    box-sizing: border-box;
    line-height: 20px;
    font-size: 20px;
    font-weight: 600;
    display: flex;
    justify-content: space-between;

    .more-btn {
        font-size: 12px;
        width: 50px;
        height: 22px;
        border: 1px solid var(--mord-gray);
        border-radius: 28px;
        text-align: center;
        line-height: 22px;
        font-weight: 400;
        color: var(--more-text);
    }
}
</style>