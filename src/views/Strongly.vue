<template>
    <div class="strongly">
        <van-nav-bar>
            <template #left>
                <van-icon name="arrow-left" size="18" color="white" @click="$router.go(-1)"/>
            </template>
            <template #title>
                <p class="title">重磅推荐</p>
            </template>
            <template #right>
                <van-icon name="search" size="18" color="white" />
            </template>
        </van-nav-bar>
        <div class="padding-box">
            <van-list v-model="loading" :immediate-check="false" :finished="finished" finished-text="没有更多了"
                @load="onLoad">
                <div class="common-bookele" v-for="(item, index) in stroList" @click="bookHandler(item)">
                    <div class="img">
                        <img :src="item.cover" alt="">
                    </div>
                    <div class="desc-box">
                        <p class="title">{{ item.title }}</p>
                        <p class="author">{{ item.category }} / {{ item.author }} </p>
                        <div class="description" v-html="item.description"></div>
                    </div>
                </div>
            </van-list>
        </div>
    </div>
</template>

<script>
import { mapMutations,mapState } from 'vuex';
import { getStro } from '@/apis/homeApi/homeApi'
export default {
    name: 'Strongly',
    data() {
        return {
            options: {
                page: 1
            },
            stroList: '',
            pageCount: 0,
            loading: false,
            finished: false,
            timer: null
        }
    },
    created() {
        this.getStroList()
    },
    methods: {
        ...mapMutations(['updateBookInfo']),
        async getStroList() {
            // let data = await getStro(this.options)

            let { data: { data } } = await this.axios(getStro(this.options))

            this.stroList = data.books
            this.pageCount = data.pageQuery.pageCount
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
        },
        onLoad() {
            if (this.timer) {
                clearTimeout(this.timer)
            }

            this.timer = setTimeout(async () => {
                this.options.page++
                let { data: { data } } = await this.axios(getStro(this.options))

                this.stroList = [...this.stroList, ...data.books]

                this.loading = false

                if (this.options.page >= this.pageCount) {
                    this.finished = true
                }
            }, 1500)
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/root.css';

.strongly {
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