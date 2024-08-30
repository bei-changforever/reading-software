<template>
    <div class="pm">
        <van-nav-bar>
            <template #left>
                <van-icon name="arrow-left" size="18" color="white"  @click="$router.go(-1)" />
            </template>
            <template #title>
                <p class="title">人气推荐</p>
            </template>
            <template #right>
                <van-icon name="search" size="18" color="white" />
            </template>
        </van-nav-bar>
        <div class="padding-box">
            <div class="common-bookele" v-for="(item, index) in pmlist" :key="index" @click="bookHandler(item)">
                <div class="img">
                    <img :src="item.cover" alt="">
                </div>
                <div class="desc-box">
                    <p class="title">{{ item.title }}</p>
                    <p class="author">{{ item.category }} / {{ item.author }} </p>
                    <div class="description" v-html="item.description"></div>
                </div>
            </div>

        </div>

    </div>
</template>

<script>
import { getCity } from '@/apis/homeApi/homeApi'
export default {
    name: "PM",
    data() {
        return {
            pmlist: ''
        }
    },
    created() {
        this.getPmlist()
    },
    methods: {
        async getPmlist() {
            let { data: { data } } = await this.axios(getCity())
            this.pmlist = data.books
        },
        bookHandler(item) {
            
            let id = item.sourceUrl.split('/')[2]

            this.updateBookInfo({
                id,
                title: item.title
            })

            this.$router.push({
                path: '/booksub',
                query: {
                    book_id: id
                }
            })
        }
    },

}
</script>

<style lang="scss" scoped>
@import '../assets/css/root.css';

.pm {
    width: 100%;
    height: 100%;
}

.van-nav-bar {
    background-color: var(--navibarTitlecolor);
    position: sticky;
    top: 0;

    .title {
        color: white;
    }
}

.padding-box {
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
    background-color: #FAF7F5;
}

.common-bookele {
    padding: 15px 15px 15px 0;
    border-bottom: #dcdcdc solid 1px;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;

    .img {
        width: 64px;
        height: 88px;

        img {
            width: 64px;
            height: 100%;
            display: block;
        }
    }

    .desc-box {
        width: 270px;
    }

    .title {
        display: block;
        font-size: 16px;
        font-weight: bold;
    }

    .author {

        display: block;
        margin-block-start: 1em;
        margin-block-end: 1em;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
    }

    .description {
        padding-top: 4px;
        height: 32px;
        line-height: 16px;
        color: #aaa;
        font-size: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }

}
</style>