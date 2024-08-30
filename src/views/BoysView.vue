<template>
    <div class="boys" >
        <div class="padding-box">
            <van-swipe v-if="bannerList" class="my-swipe" :autoplay="3000" indicator-color="white">
                <van-swipe-item v-for="item in bannerList" :key="item.id">
                    <van-image :src="item.cover" />
                </van-swipe-item>
            </van-swipe>
        </div>
        <div class="guess-youlike" >
            <HomeTitle :title="navBarZhonList[1]?.name"></HomeTitle>
            <BigTitleBox v-for="(item, index) in navBarZhonList[1]?.list" :key="item.id" :obj="item"></BigTitleBox>
        </div>
     
         <div class="guess-youlike" v-if="navBarZhonList[2]">
            <HomeTitle :title="navBarZhonList[2].name"></HomeTitle>
            <BigTitleBox v-for="(item, index) in navBarZhonList[2].list" :key="item.id" :obj="item"></BigTitleBox>
        </div> 

        <div class="guess-youlike" v-if="navBarZhonList[3]">
            <HomeTitle :title="navBarZhonList[3].name"></HomeTitle>
            <BigTitleBox v-for="(item, index) in navBarZhonList[3].list" :key="item.id" :obj="item"></BigTitleBox>
        </div> 

        <div class="hourt" v-if="navBarZhonList[4]">
            <HomeTitle :title="navBarZhonList[4].name"></HomeTitle>
            <div class="hourt-box">
                <ul>
                    <li v-for="(item, index) in navBarZhonList[4].list" :key="item.id" @click="bookHandler(item)">
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
    
        <div class="guess-youlike" v-if="navBarZhonList[5]">
            <HomeTitle :title="navBarZhonList[5].name"></HomeTitle>
            <BigTitleBox v-for="(item, index) in navBarZhonList[5].list" :key="item.id" :obj="item"></BigTitleBox>
        </div>
        
        <div class="hourt" v-if="navBarZhonList[6]">
            <HomeTitle :title="navBarZhonList[6].name"></HomeTitle>
            <div class="hourt-box">
                <ul>
                    <li v-for="(item, index) in navBarZhonList[6].list" :key="item.id" @click="bookHandler(item)">
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
    </div>
</template>

<script>
import BigTitleBox from '@/components/BigTitleBox.vue';
import HomeTitle from '@/components/HomeTitle.vue';
import { getHomeBoys} from '@/apis/homeApi/homeApi';
import { Rank_icon } from '@/utils/tools';
import { mapMutations, mapState } from 'vuex';
export default {
    name: 'Boys',
    components: {

        BigTitleBox,
        HomeTitle
    },
    data() {
        return {
            navBarZhonList: '',
            bannerList: '',
            RankImgSrc: Rank_icon
        }
    },
    mounted() {
        this.getHomeB()
    },
    methods: {

        async getHomeB() {
            let {data} = await getHomeBoys()
           this.navBarZhonList = data.data.list
           this.bannerList = data.data.list[0].banners
        },
        cutArray(array, subALength) {
            let index = 0
            let newArr = []
            while (index < array.length) {
                newArr.push(array.slice(index, index += subALength))
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
            })
        },
        ...mapMutations(['updateBookInfo'])

    },
}
</script>

<style lang="scss"  >
@import '../assets/css/root.css';

.boys {
    width: 100%;
    // background-color: pink;

    .my-swipe .van-swipe-item {
        width: 100%;
        border-radius: 15px;
        padding: 10px;
        box-sizing: border-box;

        .van-image {
            width: 100%;
            height: auto;
            border-radius: 15px;
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



}
</style>