<template>
    <div class="girls">
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
            <van-swipe-item v-for="item in bannerKist" :key="item.id">
                <van-image :src="item.cover" />
            </van-swipe-item>
        </van-swipe>
        <div class="guess-youlike" v-if="girlsList[1]">
            <HomeTitle :title="girlsList[1].name"></HomeTitle>
            <BigTitleBox v-for="(item, index) in girlsList[1].list" :key="item.id" :obj="item"></BigTitleBox>
        </div>
        <div class="hourt" v-if="girlsList[2]">
            <HomeTitle :title="girlsList[2].name"></HomeTitle>
            <div class="hourt-box">
                <ul>
                    <li v-for="(item, index) in girlsList[2].list" :key="item.id" @click="bookHandler(item)">
                        <img class="img-rank" :src="RankImgSrc[index]" alt="">
                        <div class="container-box">
                            <div class="img">
                                <img class="auto-img" :src="item.cover" alt="">
                            </div>
                            <div class="desc-box">
                                {{ item.title }}
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="guess-youlike" v-if="girlsList[3]">
            <HomeTitle :title="girlsList[3].name"></HomeTitle>
            <BigTitleBox v-for="(item, index) in girlsList[3].list" :key="item.id" :obj="item"></BigTitleBox>
        </div>
        <div class="subsidiary" v-if="girlsList[4]">
            <HomeTitle :title="girlsList[4].name"></HomeTitle>
            <ul>
                <li v-for="item in girlsList[4].list" :key="item.id" @click="bookHandler(item)">
                    <div class="subsidiary-box">
                        <div class="img">
                            <img class="auto-img" :src="item.cover" alt="">
                        </div>
                        <div class="desc-box">
                            <p>{{ item.title }}</p>
                            <p>{{ item.author }}</p>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="subsidiary" v-if="girlsList[5]">
            <HomeTitle :title="girlsList[5].name"></HomeTitle>
            <ul>
                <li v-for="item in girlsList[5].list" :key="item.id" @click="bookHandler(item)">
                    <div class="subsidiary-box">
                        <div class="img">
                            <img class="auto-img" :src="item.cover" alt="">
                        </div>
                        <div class="desc-box">
                            <p>{{ item.title }}</p>
                            <p>{{ item.author }}</p>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="hourt" v-if="girlsList[6]">
            <HomeTitle :title="girlsList[6].name"></HomeTitle>
            <div class="hourt-box">
                <ul>
                    <li v-for="(item, index) in girlsList[6].list" :key="item.id" @click="bookHandler(item)">
                        <img class="img-rank" :src="RankImgSrc[index]" alt="">
                        <div class="container-box">
                            <div class="img">
                                <img class="auto-img" :src="item.cover" alt="">
                            </div>
                            <div class="desc-box">
                                {{ item.title }}
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="old-love" v-if="girlsList[7]">
            <HomeTitle :title="girlsList[7].name"></HomeTitle>
            <div class="old-love-box">
                <ul>
                    <li v-for="item in girlsList[7].list" :key="item.id" @click="bookHandler(item)">
                        <div class="aa">
                            <div class="img">
                                <img :src="item.cover" alt="">
                            </div>
                            <div class="desc">
                                <p class="title">{{ item.title }}</p>
                                <p>{{ item.category }}</p>
                                <p class="eye"><span><van-icon name="eye-o" />{{ changeCount(item.clickCount) }}</span> </p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import BigTitleBox from '@/components/BigTitleBox.vue';
import HomeTitle from '@/components/HomeTitle.vue';
import { getHomeGirls } from '@/apis/homeApi/homeApi';
import { Rank_icon } from '@/utils/tools';
import { mapMutations, mapState } from 'vuex';
export default {
    name: 'Girls',
    data() {
        return {
            girlsList: '',
            bannerKist: '',
            RankImgSrc: Rank_icon
        }
    },
    components: {
        HomeTitle,
        BigTitleBox
    },
    mounted() {

        this.getFuckGirl()
    },
    methods: {

        async getFuckGirl() {
            let { data } = await getHomeGirls()
            this.girlsList = data.data.list
            this.bannerKist = data.data.list[0].banners
        },
        cutArray(array, subLength) {
            let index = 0
            let newArr = []
            while (index < array.length) {
                newArr.push(array.slice(index, index += subLength))
            }
            return newArr
        },
        bookHandler(item) {
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
        changeCount(num) {
            if (num >= 10000) {
                return (num / 10000).toFixed(1) + '万'
            }
        },
        ...mapMutations(['updateBookInfo'])
    },
}
</script>

<style lang="scss" scoped>
.girls {
    width: 100%;

    .my-swipe .van-swipe-item {
        width: 100%;
        height: 141.3px;
        padding: 10px;
        box-sizing: border-box;

        .van-image {
            width: 100%;
            height: 100%;
            display: block;
        }
    }

    .guess-youlike {
        width: 100%;
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

    .hourt {
        width: 100%;

        .hourt-box {
            margin-top: 5px;
            width: 100%;

            ul {
                padding: 10px;
                width: 100%;
                box-sizing: border-box;
                display: flex;
                justify-content: space-between;

                li {
                    width: 32%;
                    height: 200px;
                    position: relative;

                    .img-rank {
                        width: 100%;
                        position: absolute;
                        top: -15px;
                        left: 0;
                    }

                    .container-box {
                        width: 100%;
                        height: 190px;

                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;


                        .img {
                            width: 100%;
                            height: 150px;

                            .auto-img {
                                width: 100%;
                                height: 100%;
                                display: block;
                            }


                        }

                        .desc-box {
                            width: 100%;
                            height: 40px;
                            line-height: 40px;
                            font-size: 16px;
                        }
                    }
                }
            }
        }
    }

    .subsidiary {
        width: 100%;
        height: auto;


        ul {
            padding: 10px;
            box-sizing: border-box;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;

            li {
                width: 24%;
                height: 100%;

                .subsidiary-box {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;

                    .img {
                        width: 90%;
                        height: 65%;


                        .auto-img {
                            width: 100%;
                            height: 100%;
                            display: block;
                        }
                    }

                    .desc-box {
                        width: 90%;
                        margin-top: 5px;
                        height: 30%;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-around;
                        color: var(--author-gray);
                    }
                }
            }
        }
    }

    .old-love {
        width: 100%;


        .old-love-box {
            width: 100%;
            padding: 10px;
            box-sizing: border-box;

            ul {
                width: 100%;
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;

                li {
                    margin-bottom: 10px;
                    width: 49%;

                    .aa {
                        width: 100%;
                        display: flex;
                        justify-content: space-between;

                        .img {
                            width: 76px;

                            img {
                                width: 100%;
                                height: 97px;
                                display: block;
                            }

                        }

                        .desc {
                            width: 90px;
                            display: flex;
                            flex-direction: column;
                            justify-content: space-between;
                            font-size: 12px;
                            color: #999;


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
                            }

                            .eye {
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
    }
}
</style>