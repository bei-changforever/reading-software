<template>
    <div class="free">
        <div class="xianshifree" v-if="list">
            <div class="time">
                <span>精品限时免费</span>
                <CutDownTime :end="time" />
            </div>
            <BigTitleBox v-for="(item, index) in freeList" :key="item.id" :obj="item"></BigTitleBox>
        </div>
        <div class="good-books" v-if="list[1]">
            <HomeTitle v-if="list[1].name" :title="list[1].name"></HomeTitle>
            <div class="good-books-box">
                <div class="good-books-content" v-for="(item, index) in list[1].list" @click="bookHandle(item)" :key="item.id">
                    <div class="img">
                        <img :src="item.cover" alt="">
                    </div>
                    <div class="desc">
                        <p class="title">{{ item.title }}</p>
                        <!-- <p>{{ item.content }}</p> -->
                        <p><span v-show="item.category">{{ item.category }} / </span>{{ item.author }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="guess-youlike" v-if="list[2]">
            <HomeTitle v-if="list[2].name" :title="list[2].name"></HomeTitle>
            <BigTitleBox v-for="(item, index) in list[2].list" :key="item.id" :obj="item"></BigTitleBox>
        </div>
</div>
</template>

<script>
import BigTitleBox from '@/components/BigTitleBox.vue';
import CutDownTime from '@/components/CutDownTime.vue';
import HomeTitle from '@/components/HomeTitle.vue';
import {  getFree } from '@/apis/homeApi/homeApi';
import { mapMutations, mapState } from 'vuex';
export default {
    name: 'FreeView',
    data() {
        return {
            list: '',
            time: '',
            freeList: ''
        }
    },
    computed: {
        ...mapState(['url'])
    },
    components: {
        CutDownTime,
        BigTitleBox,
        HomeTitle
    },
    mounted() {
        this.getFreeList()
    },
    methods: {
        async getFreeList() {
            let { data: { data } } = await getFree()
            this.list = data.list
            this.time = data.list[0].time_limit
            this.freeList = data.list[0].list
        },
        bookHandle(item) {
            this.updateBookInfo({
                id: item.id,
                title: item.title
            })
            this.$router.push({
                path: '/booksub',
                query: {
                    book_id: item.id
                }
            })
        },
        ...mapMutations(['updateBookInfo'])
    },
}
</script>

<style lang="scss" scoped>
.free {
    width: 100%;

    .xianshifree {
        width: 100%;
        display: flex;
        flex-direction: column;

        .time {
            width: 100%;
            height: 45px;
            padding: 10px;
            box-sizing: border-box;
            line-height: 20px;
            font-size: 20px;
            font-weight: 600;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }




    }

    .good-books {
        width: 100%;

        .good-books-box {
            margin-top: 10px;
            width: 100%;
            display: flex;

            .good-books-content {
                width: 33%;
                display: flex;
                flex-direction: column;
                justify-content: space-between;

                .img {
                    width: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    img {
                        width: 107px;
                        height: 140px;
                        box-shadow: 0 5px 7px 0 rgb(0 0 0 / 9%), 0px 2px 2px 0 rgb(0 0 0 / 3%);
                        border-radius: 3px;
                    }
                }
            }

            .desc {
                width: 100%;
                padding: 10px;
                box-sizing: border-box;

                .title {
                    font-size: 16px;
                    color: black;
                    font-weight: bold;
                    margin-bottom: 10px;
                }

                font-size: 12px;
                color: #999;
            }

        }
    }

    .guess-youlike {
        width: 100%;
    }

}
</style>