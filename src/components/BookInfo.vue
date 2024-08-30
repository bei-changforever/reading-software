<template>
    <div class="bookinfo-com">
        <van-skeleton title :row="10" :loading="loading">

            <div class="book-box">
                <div class="img" v-if="feed.entry.link[1]">
                    <img class="auto-img" :src="feed.entry.link[1].href" alt="">
                </div>
                <div class="desc-box">
                    <h1>{{ feed.entry.title }}</h1>
                    <p><span v-if="feed.entry['pris:book'].category"> {{
                        feed.entry['pris:book'].category
                    }}&nbsp;|&nbsp;</span><span class="href">{{
    feed.entry.author.name
}}</span> </p>

                    <van-rate v-model="value" :size="20" allow-half color="#ffd21e" void-icon="star" void-color="#eee" />

                    <p><span>{{ changeCount(feed.entry['pris:book'].words) }}</span>&nbsp;&nbsp;<span>{{
                        feed.entry['pris:subscribe'].clicks
                    }}</span></p>
                    <p>{{ feed.entry['pris:book'].wprice }}阅点/千字</p>
                </div>
            </div>
            <div class="detail-box">

                <!-- <p class="summary">{{ feed.entry.summary }}</p> -->
                <van-collapse v-model="activeName" accordion>
                    <van-collapse-item name="1">
                        <template #title>
                            <div class="van-co-aum" v-if="activeName !==
                                '1'">{{ feed.entry.summary }}</div>
                            <div class="van-co-aum" v-else>更多简介:</div>
                        </template>
                        {{ feed.entry.summary }}</van-collapse-item>
                </van-collapse>

                <p>授权方: <span class="href">{{ feed.entry['pris:book'].authorizer }}</span> </p>
                <p v-if="feed.entry['pris:book'].vip == 1">作品类型: <span class="href">付费作品</span></p>
            </div>
        </van-skeleton>
    </div>
</template>

<script>
export default {
    name: 'BookInfo',
    props: {
        feed: {
            type: Object || Array
        },
        value: {
            type: Number
        }
    },
    data() {
        return {
            activeName: ['0', '1'],
            loading: true
        }
    },
    methods: {
        changeCount(num) {
            if (num >= 10000) {
                return (num / 10000).toFixed(1) + '万'
            }
        }
    },
    mounted() {
        if (this.feed) {
            this.loading = false
        }

    }
}
</script>

<style lang="scss" >
@import '../assets/css/root.css';

.bookinfo-com {
    width: 100%;

    .href {
        color: var(--href-color);
    }


    .detail-box {
        padding: 10px;
        box-sizing: border-box;
        color: #888;

        .van-collapse {
            .van-collapse-item {

                .van-cell__title {
                    height: 24px;
                    color: #888;

                    .van-co-aum {
                        width: 280px;
                        height: 100%;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        word-wrap: break-word;
                    }

                }

                .van-collapse-item__title {
                    padding: 10px 0 10px 0;
                }

                .van-collapse-item__content {
                    padding: 10px 0 10px 0;
                }



            }
        }

        p {
            display: block;
            margin-block-start: 0.5em;
            margin-block-end: 0.5em;
        }

        .summary {
            line-height: 1.5em;
        }
    }

    .book-box {
        padding: 10px;
        padding-bottom: 0;
        background: #FFF;
        color: #888;
        display: flex;
        box-sizing: border-box;
        justify-content: space-between;

        .desc-box {
            width: 250px;

            p {
                display: block;
                margin-block-start: 1em;
                margin-block-end: 1em;
                margin-inline-start: 0px;
                margin-inline-end: 0px;
            }

            h1 {
                font-size: 1.5em;
                color: black;
                font-weight: 500;
            }
        }

        .img {
            width: auto;

            .auto-img {
                width: 93px;
                height: 130px;

            }
        }



    }
}
</style>