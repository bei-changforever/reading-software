<template>
    <div class="jinpin" v-if="jin">
        <HomeTitleVue :title="jin.name"></HomeTitleVue>
        <BigTitleBox v-for="item in jinlist" :key="item.id" :obj="item"></BigTitleBox>
    </div>
</template>

<script>
import BigTitleBox from './BigTitleBox.vue';
import HomeTitleVue from './HomeTitle.vue';
    export default {
        name:'JinPin',
        props:{
            jin: Object
        },
        data() {
            return {
                jinlist: ''
            }
        },
        components:{
            HomeTitleVue,
            BigTitleBox
        },
        created() {
            this.jinlist = this.jin.list
        }
    }
</script>

<style lang="scss" scoped>
@import '../assets/css/root.css';
.jinpin {
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