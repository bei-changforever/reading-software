<template>
    <div class="publish">
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
            <van-swipe-item v-for="item in bannerList" :key="item.id">
                <van-image :src="item.cover" />
            </van-swipe-item>
        </van-swipe>
        <van-grid v-if="publishList[1]" :border="false" :column-num="4">
            <van-grid-item v-for="item in publishList[1].shortCut" :key="item.msgId">
                <van-image class="g-img" :src="item.cover" />
                <P>{{ item.name }}</P>
            </van-grid-item>
        </van-grid>
        <div class="hourt" v-if="publishList[2]">
            <HomeTitle :title="publishList[2].name"></HomeTitle>
            <div class="hourt-box">
                <ul>
                    <li v-for="(item, index) in publishList[2].list" :key="item.id" @click="bookHandler(item)">
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
        <div class="guess-youlike" v-if="publishList[3]">
            <HomeTitle :title="publishList[3].name"></HomeTitle>
            <BigTitleBox v-for="(item, index) in publishList[3].list" :key="item.id" :obj="item"></BigTitleBox>
        </div>
        <van-swipe v-if="publishList[4]" class="my-swipe" >
            <van-swipe-item >
                <van-image :src="publishList[4].cover" />
            </van-swipe-item>
        </van-swipe>
        <div class="subsidiary" v-if="publishList[5]">
            <HomeTitle :title="publishList[5].name"></HomeTitle>
            <ul>
                <li v-for="item in publishList[5].list" :key="item.id" @click="bookHandler(item)">
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
        <div class="subsidiary" v-if="publishList[6]">
            <HomeTitle :title="publishList[6].name"></HomeTitle>
            <ul>
                <li v-for="item in publishList[6].list" :key="item.id" @click="bookHandler(item)">
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
        <div class="guess-youlike" v-if="publishList[7]">
            <HomeTitle :title="publishList[7].name"></HomeTitle>
            <BigTitleBox v-for="(item, index) in publishList[7].list" :key="item.id" :obj="item"></BigTitleBox>
        </div>
        <div class="guess-youlike" v-if="publishList[8]">
            <HomeTitle :title="publishList[8].name"></HomeTitle>
            <BigTitleBox v-for="(item, index) in publishList[8].list" :key="item.id" :obj="item"></BigTitleBox>
        </div>
        <div class="guess-youlike" v-if="publishList[9]">
            <HomeTitle :title="publishList[9].name"></HomeTitle>
            <BigTitleBox v-for="(item, index) in publishList[9].list" :key="item.id" :obj="item"></BigTitleBox>
        </div>
        <van-swipe v-if="publishList[10]" class="my-swipe" >
            <van-swipe-item >
                <van-image :src="publishList[10].cover" />
            </van-swipe-item>
        </van-swipe>
    </div>
</template>

<script>
import BigTitleBox from '@/components/BigTitleBox.vue';
import HomeTitle from '@/components/HomeTitle.vue';
import { getPublushHome } from '@/apis/homeApi/homeApi';
import { Rank_icon } from '@/utils/tools';
import { mapMutations, mapState } from 'vuex';
export default {
    name: 'Publish',
    data() {
        return {
            publishList: '',
            bannerList: '',
            RankImgSrc: Rank_icon
        }
    },
    mounted() {
        this.getPublishList()
    },
    components: {
        HomeTitle,
        BigTitleBox
    },
    methods: {
        async getPublishList() {
            let { data } = await getPublushHome()
            console.log(data)
            this.publishList = data.data.list
            this.bannerList = data.data.list[0].banners
            
        },
        cutArray(array, sublength) {
            let index = 0
            let newArr = []
            while (index < array.length) {
                newArr.push(array.slice(index, index += sublength))
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
        ...mapMutations(['updateBookInfo'])
    }
}
</script>

<style lang="scss" >
.publish {
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
    .van-grid {
        border-bottom: 1px solid var(--sliver-color-gray);
        margin-bottom: 10px;

        .van-grid-item {
            p {
                margin: 5px 0 10px 0;
                font-size: 16px;
            }

            .van-grid-item__content {
                padding: 5px;
            }

            .g-img {
                width: 50px;
            }
        }

    }

    .good-books {
        width: 100%;

        .good-books-box {
            margin-top: 10px;
            width: 100%;
            display: flex;
            flex-wrap: wrap;

            .good-books-content {
                width: 33%;
                display: flex;
                flex-direction: column;


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
                // overflow: hidden;
                // text-overflow: ellipsis;
                // white-space: nowrap;
                font-size: 12px;
                color: #999;

                .title {
                    width: 90px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    height: 20px;
                    font-size: 16px;
                    color: black;
                    font-weight: bold;
                    margin-bottom: 10px;
                }

                .author {
                    width: 90px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    height: 20px;
                }


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
            justify-content: space-between;

            li {
                width: 24%;
                height: 100%;

                .subsidiary-box {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
              

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


}
</style>