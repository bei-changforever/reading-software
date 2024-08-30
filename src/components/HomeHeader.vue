<template>
    <div class="home-header">
        <!-- 首页头部 -->
        <!-- 左边切换按钮 -->
        <div class="change-sex">
            <div class="btn" @click="toggleSex">
                <!-- icon-nv -->
                <i :class="['iconfont', sex == 1 ?   'icon-nan'  : 'icon-nv']"></i>
            </div>
        </div>

        <!-- 右边搜索框 -->
        <div class="search-box">
            <input type="text" placeholder="请输入关键字......" @click="$router.push({
                name: 'Search'
            })">
            <van-icon name="search" class="search-icon" size="20" />
        </div>
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'

export default {
    name: 'HomeHeader',

    data() {
        return {
            sex: 1
        }
    },
    computed: {
        ...mapState(['sexy'])
    },
    mounted() {

    },
    methods: {
        ...mapMutations(['updateSex']),
        toggleSex() {
            if (this.sex == 1) {
                this.sex = 2
                this.updateSex(this.sex)
            }
            else {
                this.sex = 1
                this.updateSex(this.sex)
            }

            this.$emit('fixrecommend')
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/root.css';

.home-header {
    width: 100%;
    height: 15vmin;
    background-color: white;
    display: flex;
    justify-content: space-between;
    padding: 10px;
    box-sizing: border-box;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;

    .change-sex {
        width: 50px;
        height: 100%;
        display: flex;
        align-items: center;
        background-color: white;

        .btn {
            width: 35px;
            height: 35px;
            border-radius: 50%;
            text-align: center;
            background-color: white;
            line-height: 35px;
            box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
        }
    }

    .search-box {
        width: calc(100% - 60px);
        height: 100%;
        background-color: white;
        border-radius: 15px;
        display: flex;
        align-items: center;
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

        input {
            width: 250px;
            height: 80%;
            border: none;
            outline: none;
            margin-left: 5px;
            text-indent: 1em;
            letter-spacing: 2px;
        }

        .search-icon {
            width: 36px;
            height: 100%;
            text-align: center;
            line-height: 10vmin;
            color: var(--search-icon-gray);
        }
    }
}
</style>