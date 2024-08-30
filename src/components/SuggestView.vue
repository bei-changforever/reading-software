<template>
    <div class="suggest-view">
        <p class="title">搜索建议</p>
        <ul>
            <li v-for="(item , index) in listitem" :key="item.id" @click="gogBookRes(item.text)">
                <div class="icon">
                    <van-icon name="search" />
                    <span>{{ item.text }}</span>
                </div>
                <van-icon name="arrow" />
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "SuggestView",
    props: ['listitem'],
    created(){
    },
    methods:{
        gogBookRes(name) {
            this.$emit('goribi',name)
        }
    }
}
</script>

<style lang="scss" scoped>
.suggest-view {
    width: 100%;
    background-color: rgb(247, 246, 244);
    .title {
            font-size: 16px;
            padding: 5px;
            color: rgb(121, 121, 120);
        }

    ul {
        width: 100%;
        padding: 10px;
        box-sizing: border-box;
        li {
            font-size: 16px;
            width: 100%;
            display: flex;
            color: #aba59a;
            justify-content: space-between;
            padding: 10px 0 10px 0;
        }
    }
}
</style>