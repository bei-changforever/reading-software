<template>
    <div class="listen">
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
            <van-swipe-item v-for="item in bannerList" :key="item.id">
                <van-image :src="item.cover" />
            </van-swipe-item>
        </van-swipe>
        <div class="guess-youlike" v-if="listenList[1]">
            <HomeTitle :title="listenList[1].name"></HomeTitle>
            <div class="big-title-box" v-for="(obj, index) in listenList[1].list" :key="obj.id"
                @click="bookAudioHandler(obj)">
                <!-- 左边 -->
                <div :class="['img', obj.discountDesc ? 'active' : '']">
                    <img class="auto-img" :src="obj.cover || obj.iconUrl" />
                    <img class="play-music" :src="AudioImg" alt="">
                </div>
                <!-- 右边 -->
                <div class="desc-box">
                    <p class="name">{{ obj.title }}</p>
                    <p class="author">
                        <span>{{ obj.author }} / {{ obj.category }}</span> <span style="color: #e64d2e;"
                            v-if="obj.discountDesc">{{
                                obj.discountDesc }}</span>
                    </p>
                    <span class="content" v-if="obj.content">{{ obj.content }}</span>
                    <span class="content active" v-else v-html="obj.description"></span>
                    <p class="read" v-show="obj.readCount && obj.showTotalCount"><span>{{ obj.readCount }}点击</span><span>{{
                        obj.showTotalCount }}万字</span></p>
                </div>
            </div>


        </div>
        <van-swipe class="my-swipe" v-if="listenList[2]">
            <van-swipe-item>
                <van-image :src="listenList[2].cover" />
            </van-swipe-item>
        </van-swipe>
        <div class="subsidiary" v-if="listenList[3]">
            <HomeTitle :title="listenList[3].name"></HomeTitle>
            <ul>
                <li v-for="item in listenList[3].list" :key="item.id" @click="bookAudioHandler(item)">
                    <div class="subsidiary-box">
                        <div class="img">
                            <img class="auto-img" :src="item.cover" alt="">
                            <img class="play-music" :src="AudioImg" alt="">
                        </div>
                        <div class="desc-box">
                            <p>{{ item.title }}</p>
                            <p>{{ item.author }}</p>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
      
    </div>
</template>

<script>

import BigTitleBox from '@/components/BigTitleBox.vue';
import HomeTitle from '@/components/HomeTitle.vue';
import { getAudioBook , getBookTingList ,getTingDownload } from '@/apis/homeApi/homeApi';
import { mapMutations, mapState } from 'vuex';
export default {
    name: 'ListenView',
    data() {
        return {
            listenList: '',
            bannerList: '',
            AudioImg: require('@/assets/images/24gf-playCircle.png'),
            // bookInfo: '',
            // tinglist:''
        }
    },
    components: {
        HomeTitle,
        BigTitleBox,
    },
    computed: {
        ...mapState(['toggleAudioShow','playList','tinbookInfo'])
    },
    mounted() {
        this.getNavTab()
    },
    methods: {
        async getNavTab() {
            let { data: { data } } = await getAudioBook()
            this.listenList = data.list
            this.bannerList = data.list[0].banners
        },
        async getTingList(id) {
            let {data} = await getBookTingList(id)
            // this.tinglist = data.data.catalogs
            this.updatetinglist(data.data.catalogs)
        },
        async getTingJosn() {
            let {data} = await getTingDownload()
            this.updateplayList(data.data.urls)
        },
        bookAudioHandler(item) {
            this.updatebookInfo(item)
            this.getTingList(item.id)
            this.getTingJosn()
            this.updateAudioBook({
                id: item.id,
                title: item.title,
                imgSrc: item.cover,
                vip: item.vip
            })
            this.updateToggleAudioShow()
        },
        ...mapMutations(['updateAudioBook', 'updateToggleAudioShow','updateplayList','updatebookInfo','updatetinglist'])
    },
}
</script>

<style lang="scss" scoped>
@import '../assets/css/root.css';

.listen {
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
                        position: relative;


                        .play-music {
                            position: absolute;
                            bottom: 10px;
                            left: 5px;
                            width: 20px;
                            height: 20px;
                        }


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

    .big-title-box {
        padding: 10px;
        box-sizing: border-box;
        width: 100%;
        height: 170px;
        display: flex;
        justify-content: space-between;

        .img {
            width: 30%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;

            .play-music {
                position: absolute;
                bottom: 10px;
                left: 5px;
                width: 20px;
                height: 20px;
            }

            &.active::before {
                position: absolute;
                top: 2px;
                left: -2px;
                display: inline-block;
                content: '';
                width: 32px;
                height: 20px;
                background: url('@/assets/images/icon_free@2x.png') 0 0 no-repeat;
                background-size: contain;
            }

            .auto-img {
                width: 100%;
                height: 140px;
            }
        }

        .desc-box {
            width: 65%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-around;

            .name {
                font-size: 20px;
                font-weight: 600;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }

            .author {
                font-size: 15px;
                color: var(--author-gray);
                display: flex;
                justify-content: space-between;
            }

            .content {
                font-size: 15px;
                height: 90px;
                line-height: 23px;
                color: var(--author-gray);
                display: -webkit-box;
                overflow: hidden;
                -webkit-line-clamp: 4;
                -webkit-box-orient: vertical;

                &.active {
                    font-size: 12px;
                    height: 40px;
                    display: -webkit-box;
                    overflow: hidden;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                }

            }

            .read span {
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
</style>