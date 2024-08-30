<template>
    <div class="weekrank">
        <div class="ul-box">
            <van-list v-model="loading" :immediate-check="false" :finished="finished" finished-text="没有更多了"
                @load="onLoad">
                <div class="li-box" v-for="(item, index) in WeekList" :key="index" @click="bookHandler(item)">
                    <div class="dayrank-box">
                        <div class="img">
                            <img :src="item.iconUrl" alt="">
                        </div>
                        <div class="desc-box">
                            <p class="title">
                                <span v-show="index == 0 || index == 1 || index == 2" :class="`rank${index}`">TOP.{{
                                index+ 1 }}</span>
                                <span v-show="index > 2" class="rankf">{{ index + 1 }}.</span>
                                {{ item.title }}
                            </p>
                            <p class="author">{{ item.author }}</p>
                            <div class="description" v-html="item.description"></div>
                            <p class="category">
                                <span>{{ item.category }}</span>
                                <span>{{ item.showTotalCount }}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </van-list>
        </div>
    </div>
</template>

<script>
import { getMoreRank } from '@/apis/homeApi/homeApi'
export default {
    name: 'WeekRank',
    data() {
        return {
            WeekList: [],
            options: {
                gender: 'male',
                sortType: 'week',
                type: 'sell',
                page: 1
            },
            pageCount: 0,
            pageSize: 0,
            loading: false,
            finished: false,
            timer: null
        }
    },
    mounted() {
        this.getMore()
    },
    methods: {
        async getMore() {
            let { data: { data } } = await getMoreRank(this.options)
            console.log(data)
            this.WeekList = data.books
            this.pageCount = data.pageQuery.pageCount
            this.pageSize = data.pageQuery.pageSize

        },
        onLoad() {
            if (this.timer) {
                clearTimeout(this.timer)
            }

            this.timer = setTimeout(async () => {
                this.options.page++
                let { data: { data } } = await getMoreRank(this.options)

                this.WeekList = [...this.WeekList, ...data.books]

                // 加载状态结束
                this.loading = false;


                if (this.options.page >= this.pageCount) {
                    this.finished = true
                }


            }, 1500)
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
.weekrank {
    width: 100%;
    height: 100%;

    .ul-box {
        width: 100%;
        padding: 10px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .li-box {
            width: 335px;
            height: 115px;
            cursor: pointer;
            margin-top: 10px;


            .dayrank-box {
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: space-between;

                .img {
                    width: 82px;
                    height: 115px;

                    img {
                        width: 100%;
                        height: 100%;
                        display: block;
                        box-shadow: 0 5px 7px 0 rgb(0 0 0 / 9%), 0px 2px 2px 0 rgb(0 0 0 / 3%);
                        border-radius: 4px;
                    }
                }

                .desc-box {
                    width: 240px;
                    height: 115px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;

                    .title {
                        font-weight: normal;
                        font-size: 17px;
                        color: #222;
                        height: 20px;
                        line-height: 20px;
                        overflow: hidden;
                        margin-bottom: 7px;
                        text-overflow: ellipsis;
                        white-space: nowrap;

                        .rank0 {
                            color: #E64D2E;
                            font-weight: bold;
                        }

                        .rank1 {
                            color: #FF9828;
                            font-weight: bold;
                        }

                        .rank2 {
                            color: #FCC951;
                            font-weight: bold;
                        }

                        .rankf {
                            font-size: 16px;
                            color: #999;
                            font-weight: bold;
                        }
                    }

                    .author {
                        line-height: 14px;
                        height: 14px;
                        margin-bottom: 9px;
                        font-size: 12px;
                        color: #999;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        overflow: hidden;
                    }

                    .description {
                        line-height: 18px;
                        height: 36px;
                        -webkit-line-clamp: 2;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        font-size: 12px;
                        color: #999;
                    }



                    .category>span {
                        display: inline-block;
                        margin-right: 2px;
                        padding: 0 12px;
                        height: 22px;
                        line-height: 22px;
                        font-size: 10px;
                        color: #999;
                        background-image: linear-gradient(3deg, #F9F9F9 0, #F0F0F0 100%);
                        border-radius: 22px;
                    }
                }
            }


        }
    }
}
</style>