<template>
    <div class="everyone" v-if="every">
        <HomeTitleVue :title="every.name" :show-more="true" :src="'/act'"></HomeTitleVue>
        <BigTitleBox v-for="item in everyList" :key="item.id" :obj="item"></BigTitleBox>
    </div>
</template>

<script>
import BigTitleBox from './BigTitleBox.vue';
import HomeTitleVue from './HomeTitle.vue';
    export default {
        name:'EveryOne',
        props:{
            every: Object
        },
        data(){
            return {
                everyList: ''
            }
        },
        components:{
            HomeTitleVue,
            BigTitleBox
        },
        created(){
            this.everyList = this.every.list
        }
    }
</script>

<style lang="scss" scoped>
@import '../assets/css/root.css';
.everyone {
    width: 100%;
    border-bottom: 1px solid var(--sliver-color-gray);
    .big-title-box {
        padding: 10px;
        box-sizing: border-box;
        width: 100%;
        height: 170px;
        display: flex;

        justify-content: space-between;

        .img {
            width: 30%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;

            .auto-img {
                width: 100%;
                height: 140px;
            }
        }

        .desc-box {
            width: 65%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-around;


            .name {
                font-size: 20px;
                font-weight: 600;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            .author {
                font-size: 15px;
                color: var(--author-gray);
            }

            .content {
                font-size: 15px;
                height: 90px;
                line-height: 23px;
                color: var(--author-gray);
                display: -webkit-box;
                overflow: hidden;
                -webkit-line-clamp: 4;
                -webkit-box-orient: vertical;

            }
        }




    }
}
</style>