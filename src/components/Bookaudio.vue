<template>
    <div class="audio-view">
        <div class="fk_ashole">
            <img :src="bookInfo.cover" alt="">
        </div>
        <div class="main">
            <van-nav-bar :border="false">
                <template #left>
                    <van-icon @click="test() " name="arrow-left" color="white" size="18" />
                </template>
                <template #title>
                    <p class="bar-title">{{ bookInfo.title }}</p>
                </template>
                <template #right>
                    <van-icon name="weapp-nav" color="white" size="18" />
                </template>
            </van-nav-bar>
            <div class="book-info">
                <div class="img">
                    <img :src="bookInfo.cover" alt="">
                </div>
                <div class="desc">
                    <ul>
                        <li>主播:{{ bookInfo.author }}</li>
                        <li>每集价格:{{ bookInfo.wprice }}阅点</li>
                    </ul>
                    <p class="content">书籍简介:</p>
                    <p class="content" v-html="bookInfo.content"></p>
                </div>
            </div>
            <div class="line">
                <van-slider v-model="$store.state.currentTime" :min="0" :max="$store.state.TotalTime" active-color="rgb(219,110,99)"
                @drag-start="Draging(true)"
                @drag-end="Draging(false)" 
                @change="sliderChange">
                    <template #button>
                        <div class="custom-button"></div>
                    </template>
                </van-slider>
                <p class="time" ><span>{{ formaTime(currentTime)  }}</span><span>{{ formaTime(TotalTime)  }}</span></p>
            </div>
            <div class="control">
                <ul>
                    <li @click="show = true"><img :src="moreSrc" alt=""></li>
                    <li @click="prePlay"><img :src="preImgsrc" alt=""></li>
                    <li @click="play" v-if="$store.state.isBtnShow"><img class="playimg" :src="playImgSrc" alt=""></li>
                    <li @click="play" v-else><img class="playimg" :src="pauseSrcImg" alt=""></li>
                    <li @click="nextPlay"><img :src="lastclickSrc" alt=""></li>
                    <li><img :src="durtimeSrc" alt=""></li>
                </ul>
            </div>
            <div class="user-sele">
                <ul>
                    <li>
                        <div class="se-box">
                            <div class="icon">
                                <van-icon name="add-o" size="18" color="white" />
                            </div>
                            <div class="desc">加入书架</div>
                        </div>
                    </li>
                    <li>
                        <div class="se-box" @click="closeListen">
                            <div class="icon">
                                  <van-icon name="service-o" size="18" color="white"/>
                            </div>
                            <div class="desc">关闭听书</div>
                        </div>
                    </li>
                  
                    <li>
                        <div class="se-box">
                            <div class="icon">
                                <van-icon name="down" size="18" color="white" />
                            </div>
                            <div class="desc">批量下载</div>
                        </div>
                    </li>
                    <li>
                        <div class="se-box">
                            <div class="icon">
                                <van-icon name="comment-o" size="18" color="white" />
                            </div>
                            <div class="desc">评论</div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <van-popup v-model="show" position="bottom" :style="{ height: '60%' }">
            <p class="title">目录:</p>
            <ul class="tinul">
                <li v-for="item in tingList" :key="item.articleUuid"><van-tag type="warning" color="rgb(220,108,104)">免费</van-tag>&nbsp;{{ item.title }}</li>
            </ul>
        </van-popup>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
export default {
    name: 'AudioView',
    props: {
        bookInfo: {},
        tingList: {},
        play:{}
    },
    computed: {
        ...mapState(['toggleAudioShow', '$audio','currentTime','TotalTime','playListIndex','playList'])
    },
    data() {
        return {
            value: 0,
            fk: '',
            sub: '',
            show: false,
            moreSrc: require('@/assets/images/more.png'),
            preImgsrc: require('@/assets/images/preclick.png'),
            playImgSrc: require('@/assets/images/play.png'),
            lastclickSrc: require('@/assets/images/lastclick.png'),
            durtimeSrc: require('@/assets/images/durtime.png'),
            pauseSrcImg: require('@/assets/images/pasue.png')
        }
    },
    methods: {
        ...mapMutations(['updateToggleAudioShow','updateIsDrag','updateroteShow','updateIndex']),
        test(){
           this.updateToggleAudioShow()
        },
        addZero(num) {
            return num < 10 ? "0" + num : num
        },
        formaTime(totalSeconds) {
            let h = this.addZero(Math.floor(totalSeconds) / 60 / 60 % 24)

            let m = this.addZero(Math.floor(parseInt(totalSeconds) / 60 % 60))

            let s = this.addZero(Math.floor(totalSeconds) % 60)

            return `${m}:${s}`
        },
        Draging(boolean) {
            this.updateIsDrag(boolean)
        },
        sliderChange(val) {
            this.$audio.currentTime = val
        },
        closeListen() {
            this.$audio.pause()
            this.$audio.currentTime = 0
            this.updateroteShow(false)
        },
        prePlay() {
            let index  = this.playListIndex
            index-- 
            if(index < 0) {
                index = this.playList.length - 1
            }
            this.updateIndex(index)
        },
        nextPlay() {
            let index = this.playListIndex 
            index++
            if(index === this.playList.length) {
                index = 0
            }
            this.updateIndex(index)
        }
       
    },
}
</script>

<style lang="scss">
.audio-view {
    width: 100vw;
    height: 100vh;
    overflow: auto;
    position: relative;
    z-index: 99;

    .fk_ashole {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        object-fit: fill;

        img {
            width: 100%;
            height: 100%;
            display: block;
            object-fit: fill;
        }
    }

    .main {

        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        flex-direction: column;
        background: rgba(29, 29, 31, 0.72);
        backdrop-filter: saturate(180%) blur(15px);


        .van-nav-bar {
            background-color: transparent;

            .van-nav-bar__content {
                height: 50px;
            }

            .bar-title {
                color: white;
                font-size: 20px;

            }
        }

        .book-info {
            padding: 10px;
            box-sizing: border-box;
            width: 100%;
            color: white;
            line-height: 20px;
            font-size: 16px;

            .img {
                margin-top: 10px;
                width: 100%;
                height: 170px;
                display: flex;
                justify-content: center;
                align-items: center;

                img {
                    width: 130px;
                    height: 170px;
                    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
                }
            }

            .desc {
                width: 100%;
                font-size: 14px;

                ul {
                    margin-top: 10px;
                    width: 100%;

                    li {
                        margin-bottom: 10px;
                    }
                }

                .content {
                    display: -webkit-box;
                    overflow: hidden;
                    -webkit-line-clamp: 4;
                    -webkit-box-orient: vertical;
                    line-height: 22px;
                    color: rgb(165, 164, 162);
                }
            }
        }

        .line {
            padding: 15px;
            box-sizing: border-box;
            width: 100%;

            .van-slider {
                width: 100%;
                margin-top: 10px;

                .custom-button {
                    width: 15px;
                    height: 15px;
                    background-color: rgb(219, 110, 99);
                    border-radius: 50%;
                    box-shadow: inset 0px 0px 5px 0px white;
                }
            }

            .time {
                margin-top: 10px;
                width: 100%;
                color: white;
                display: flex;
                justify-content: space-between;
            }
        }

        .control {
            width: 100%;

            ul {
                padding: 10px;
                box-sizing: border-box;
                width: 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;

                li {

                    img {
                        width: 20px;
                    }

                    .playimg {
                        width: 50px;
                    }
                }
            }
        }


        .user-sele {
            width: 100%;
            position: absolute;
            bottom: 0;
            left: 0;

            ul {
                width: 100%;
                display: flex;
                justify-content: space-between;

                li {
                    width: 33%;
                    color: white;
                    height: 50px;
                    text-align: center;
                    line-height: 22px;
                    font-size: 16px;
                }
            }
        }

    }

    .van-popup {
        background: rgba(255, 255, 255, 0.2);
        -webkit-backdrop-filter: blur(8px);
        backdrop-filter: blur(8px);
        border-radius: 25px 25px 0 0;
        box-shadow: inset 0 0 6px rgba(255, 255, 255, 0.2);

        .title {
            padding: 10px;
            padding-bottom: 0;
            font-size: 16px;
            color: white;
        }

        .tinul {
            padding: 10px;
            box-sizing: border-box;
            width: 100%;
            color: white;
            font-size: 16px;

            li {
                padding: 15px 0;


                &.active {
                    color: rgb(220, 113, 102);
                }
            }
        }
    }
}
</style>