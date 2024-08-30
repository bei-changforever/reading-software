<template>
    <div class="book-content" v-if="bookDirectoryList" ref="Wrap">
        <div v-show="isShow" class="setting-header">
            <van-icon @click="$router.go(-1)" color="#999999" class="arrow" name="arrow-left" size="40" />
            <div class="right-box">
                <ul>
                    <li>
                        <div class="set-box">
                            <div class="icon">
                                <van-icon name="balance-o" size="20" />
                            </div>
                            <div class="desc">充值</div>
                        </div>
                    </li>
                    <li>
                        <div class="set-box">
                            <div class="icon">
                                <van-icon name="description" size="20" />

                            </div>
                            <div class="desc">加入书架</div>
                        </div>
                    </li>
                    <li>
                        <div class="set-box">
                            <div class="icon">
                                <van-icon name="wap-home-o" size="20" />

                            </div>
                            <div class="desc">首页</div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <v-touch @swipedown="swipedown" v-on:swipeup="swiperup" v-on:swipeleft="swiperleft" v-on:swiperight="swiperright"
            class="wrapper">
            <div class="menu-container" ref="menuContainer">
                <div class="box" :style="{ marginLeft: left + 'px' }">
                    <div class="left-diectory">
                        <div class="laozi-ikun">
                            <van-button class="btn f" @click="subArticleIndex" type="default">上100章</van-button><van-button
                                @click="addArticleIndex" class="btn" type="default">下100章</van-button>
                            <ul>
                                <li class="left-di-li" v-for="(item, index) in bookDirectoryList[readConfig.articleIndex]"
                                    @click="chooseZhanjie(item, index)" :key="item.secId">
                                    <p v-if="item.needPay">
                                        <span class="vip">
                                            {{ item.title }}
                                        </span>
                                        <span><van-tag color="#ffe1e1" text-color="#ad0000">VIP</van-tag></span>
                                    </p>
                                    <p :class="index == readDiectoryIndex ? 'activecolor' : ''" v-else><span>{{ item.title
                                    }}</span></p>
                                </li>
                            </ul>
                            <van-button class="btn f" @click="subArticleIndex" type="default">上100章</van-button><van-button
                                @click="addArticleIndex" class="btn" type="default">下100章</van-button>
                        </div>
                    </div>
                    <div class="right-box">
                        <div class="cnm" :class="bgColor[currentTypr].classN" :style="{ fontSize: fize + `px` }"
                            @click="Showpanel" ref="outerDom" @scroll="getScrollTop" v-if="contentDetail.successful"
                            v-html="contentDetail.data.content">
                        </div>
                        <div v-else><van-empty description="VIP资源" /></div>
                    </div>
                </div>
            </div>
        </v-touch>
        <div v-show="isShow" class="setting-bottom">
            <div class="right-box">
                <ul>
                    <li>
                        <div class="set-box">
                            <div class="icon">
                                <van-icon name="orders-o" size="20" />
                            </div>
                            <div class="desc">目录</div>
                        </div>
                    </li>
                    <li>
                        <div class="set-box">
                            <div class="icon">
                                <van-icon name="underway-o" size="20" />
                            </div>
                            <div class="desc">最近阅读</div>
                        </div>
                    </li>
                    <li>
                        <div class="set-box" @click="toggleShow">
                            <div class="icon">
                                <van-icon name="setting-o" size="20" />
                            </div>
                            <div class="desc">设置</div>
                        </div>
                    </li>
                    <li>
                        <div class="set-box">
                            <div class="icon">
                                <van-icon name="closed-eye" size="20" />
                            </div>
                            <div class="desc">夜间模式</div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <van-popup v-model="show" position="bottom" :style="{ height: '30%' }">
            <div class="size-font">
                <p><span>设置字体大小:</span><van-slider v-model="value" @change="onChange" :step="1" min="12" max="24" /></p>
            </div>
            <div class="bg-color-set">
                <p><span>设置背景颜色:</span><span @click="toggleBgColor(item)" v-for=" (item, index) in bgColor" :key="index"
                        :class="['bg', item.classN]"></span></p>
            </div>
        </van-popup>
    </div>
</template>
<script>
import BScroll from '@better-scroll/core';
import { mapMutations, mapState } from 'vuex';
import { getBookRead, getBookContentJson } from '@/apis/homeApi/homeApi'
export default {
    name: 'BookContent',

    data() {
        return {
            //显示加载提示
            loading: false,

            //是否加载数据完成
            finished: false,

            //总数据量
            myData: [],

            //加载数据量
            count: 50,

            //数据偏移量
            offset: 0,

            //已加载的数据量
            loadedData: [],


            contentDetail: '',
            left: 0,
            bScroll: null,
            timer: null,
            scrollTop: 0, //默认距离顶部的距离
            isShow: false, //控制返回顶部按钮的显隐
            scrollTrigger: false, //默认初始值
            show: false,
            value: 12,
            fize: 12,
            currentTypr: 3,
            bgColor: [
                {
                    type: 0,
                    classN: 'flamingo'
                },
                {
                    type: 1,
                    classN: 'wolverine'
                },
                {
                    type: 2,
                    classN: 'fullMoon'
                },
                {
                    type: 3,
                    classN: 'bgorigin'
                }
            ],
            readDiectoryIndex: 0,
            currentIndex: 0
        }
    },
    computed: {
        renaderCurrenRead() {
            let askArr = JSON.parse(localStorage.getItem('currentReadingBook'))
            askArr.forEach(item => {
                if (item.id == this.bookinfo.id) {
                    this.readDiectoryIndex = item.userSelectIndex
                }
            })
            return this.readDiectoryIndex
        },
        readCurrentBokindex() {
            let askArr = JSON.parse(localStorage.getItem('currentReadingBook'))
            askArr.forEach(item => {
                if (item.id == this.bookinfo.id) {
                    this.currentIndex = item.currentIndex
                }
            })
            return this.currentIndex
        },
        ...mapState(['bookinfo', 'bookDirectoryList', 'readConfig', 'contentText'])
    },
    methods: {
        ...mapMutations(['updateBookDirectoryList', 'addArticleIndex', 'subArticleIndex', 'updatereadConfigId', 'updatereadConfigIndex', 'updateOrdersUserReadInfo']),
        async getReadDi() {
            let { data: { data } } = await getBookRead(this.bookinfo.id)
            this.updateBookDirectoryList(this.curArray(data.catalog, 100))
            this.$nextTick(() => {
                this.bScroll.refresh()
            })
        },
        async getBookJson(options) {

            let { data } = await getBookContentJson(options)
            this.contentDetail = data
        },
        curArray(array, subLength) {
            let index = 0;
            let newArr = [];
            while (index < array.length) {
                newArr.push(array.slice(index, index += subLength))
            }
            return newArr
        },
        clearDouHao(str) {
            str = str.replace(/,/g, '')
            return str
        },
        initLoad() {
            let data = this.myData.slice(this.offset, this.offset + this.count)

            this.loadedData.push(...data)
            this.offset += this.count

            this.loading = false

            setTimeout(() => {
                if (data.length < this.count) {
                    this.finished = true
                }
                else {
                    this.loading = false
                }
            }, 600)

        },
        loadData() {
            if (this.timer) {
                clearTimeout(this.timer)
            }

            this.timer = setTimeout(() => {
                this.timer = null

                this.initLoad()
            }, 1000)
        },
        initalBScroll() {
            this.bScroll = new BScroll(this.$refs.Wrap, {
                click: true, // BScroll 内部的元素才可以被点击
                bounce: true,
                probeType: 3
            })
        },
        swiperleft: function () {
            this.left = 0
        },
        swiperright: function () {
            let now = document.getElementsByClassName("left-diectory")[0]
            now.style.transition = "all .2s ease-out";

            this.left = 300
            this.isShow = false
        },
        swiperup: function () {

        },
        swipedown: function () {

        },
        chooseZhanjie(item, index) {

            if (this.readDiectoryIndex == index) return

            let options = {
                sourceId: this.bookinfo.id,
                contentId: item.secId
            }
            this.getBookJson(options)
            this.goBack()


            this.readDiectoryIndex = index
            this.currentIndex = index

            localStorage.setItem('currentReadIndex', JSON.stringify(this.readDiectoryIndex))

            let askArr = JSON.parse(localStorage.getItem('currentReadingBook'))

            let res = askArr.some(item => {
                return item.id == this.bookinfo.id
            })

            let passage = {
                //当前阅读书本信息，
                //书籍id,
                id: this.bookinfo.id,
                //该书阅读章节，默认0
                currentIndex: 0,
                //用户选择的章节
                userSelectIndex: 0
            }

            if (res) {
                askArr.forEach(item => {
                    if (item.id == this.bookinfo.id) {
                        item.currentIndex = this.readDiectoryIndex
                        item.userSelectIndex = this.readDiectoryIndex
                    }
                })
                localStorage.setItem('currentReadingBook', JSON.stringify(askArr))
            }
            else {
                askArr.push(passage)
                localStorage.setItem('currentReadingBook', JSON.stringify(askArr))
            }




        },
        // 返回顶部事件
        goBack() {
            let that = this; // 防止this指向问题
            // 防止频繁点击，故返回顶部后设置scrollTrigger为初始值
            if (that.scrollTrigger) {
                return;
            }
            // 获取当前距离顶部的距离
            let scrollTop = this.scrollTop;
            // console.log(scrollTop);
            let steep = scrollTop / 2000;
            let timer = setInterval(() => {
                that.scrollTrigger = true;
                // 滚动的速度逐渐变快，第一次走2000/1，然后减去已走的距离，下一次用剩下的距离再减去步进值，步进值也是不断变化，这样速度会越来越快
                scrollTop -= steep;
                // 步进值不改变的话会匀速缓慢上滑，不断增加步进值上滑的距离增加，视觉效果速度变快
                steep += 20;
                if (scrollTop <= 0) {
                    clearInterval(timer);
                    that.scrollTrigger = false;
                }
                that.$refs.outerDom.scrollTop = scrollTop;
            }, 30);
        },
        // 监听滚动条
        getScrollTop(e) {
            // console.log(e)
            let that = this; // 防止this指向问题
            // 设备一屏的高度
            let clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
            let scrollTop = e.srcElement.scrollTop;
            this.scrollTop = scrollTop;
            // console.log(clientHeight);
            // 判断距离顶部多少显示回到顶部图标
            // if (scrollTop > clientHeight) {
            //     that.isShow = true;
            // } else {
            //     that.isShow = false;
            // }
        },
        Showpanel() {
            this.isShow = !this.isShow
        },
        toggleShow() {
            this.show = true
        },
        onChange(e) {
            this.fize = e
        },
        toggleBgColor(item) {
            console.log(item.type)
            if (this.currentTypr == item.type) {
                return
            }
            this.currentTypr = item.type
        }
    },
    mounted() {
        this.getReadDi()
        this.initalBScroll()
        let thisbookindex = JSON.parse(localStorage.getItem('currentReadingBook'))
        if (this.timer) {
            clearTimeout(this.timer)
        }

        this.timer = setTimeout(() => {
            thisbookindex.forEach(item => {
                if (item.id == this.bookinfo.id) {
                    this.readDiectoryIndex = item.userSelectIndex
                    this.currentIndex = item.currentIndex
                }
            })

            if (this.bookDirectoryList[0]) {
                let options = {
                    sourceId: this.bookinfo.id,
                    contentId: this.bookDirectoryList[0][this.readDiectoryIndex].secId
                }
                this.getBookJson(options)
                // console.log(this.bookinfo.id, this.bookDirectoryList[0][this.readDiectoryIndex].secId)
                console.log(this.readDiectoryIndex)
            }
        }, 500)




    },
    watch: {
        bookDirectoryList(newVal) {
            let options = {
                sourceId: this.bookinfo.id,
                contentId: newVal[0][0].secId
            }
            this.getBookJson(options)
        }
    },
    beforeDestroy() {
        // 销毁 bScroll 不然会造成内存泄漏
        this.bScroll.destroy()
    },
}
</script>

<style lang="scss"  >
.book-content {
    width: 100vmin;
    background-color: rgb(251, 247, 243);
    overflow: hidden;

    .van-popup {
        background:
            linear-gradient(90deg, #7E898F 0%, #636C75 100%),
            radial-gradient(at top, rgba(255, 255, 255, 0.50) 0%, rgba(0, 0, 0, 0.55) 100%),
            radial-gradient(at top, rgba(255, 255, 255, 0.50) 0%, rgba(0, 0, 0, 0.08) 63%);
        background-blend-mode: multiply, screen;


        .size-font {
            padding: 10px;
            color: white;

            p {
                display: flex;
                justify-content: space-around;
                align-items: center;
                font-size: 16px;

                span {
                    margin-right: 10px;
                }

                .van-slider {
                    width: 200px;
                }
            }
        }

        .bg-color-set {
            font-size: 16px;
            padding: 10px;
            color: white;
            display: flex;
            justify-content: space-between;
            align-items: center;

            span {
                display: inline-block;
                margin-left: 10px;
            }

            .bg {
                display: inline-block;
                width: 30px;
                height: 30px;
                border-radius: 50%;
            }

            .bgorigin {
                background-color: rgb(251, 247, 243);
            }

            .flamingo {

                background-image: radial-gradient(73% 147%, #EADFDF 59%, #ECE2DF 100%),
                    radial-gradient(91% 146%, rgba(255, 255, 255, 0.50) 47%, rgba(0, 0, 0, 0.50) 100%);
                background-blend-mode: screen;

            }

            .wolverine {

                background:
                    linear-gradient(90deg, #BDBFBA 4%, #5A5C5B 98%),
                    linear-gradient(74deg, rgba(255, 255, 255, 0.50) 54%, rgba(0, 0, 0, 0.50) 100%);
                background-blend-mode: multiply;

            }

            .fullMoon {

                background-image:
                    linear-gradient(#DEDFE3 2%, #AEB3B9 95%),
                    radial-gradient(33% 100%, rgba(255, 255, 255, 0.50) 0%, rgba(0, 0, 0, 0.50) 100%);
                background-blend-mode: screen;
            }


        }
    }

    .setting-header {
        width: 100%;
        height: 56px;
        background-color: white;
        position: fixed;
        top: 0;
        z-index: 2;
        display: flex;
        justify-content: space-between;

        .arrow {
            text-align: center;
            line-height: 56px;
        }

        .right-box {
            width: 200px;
            height: 100%;

            ul {
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: space-between;

                li {
                    width: 33%;
                    height: 100%;

                    .set-box {
                        width: 100%;
                        height: 100%;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        font-size: 16px;

                        .desc {
                            margin-top: 5px;
                        }
                    }
                }
            }
        }
    }

    .setting-bottom {
        width: 100%;
        height: 56px;
        background-color: white;
        position: fixed;
        bottom: 0;
        z-index: 2;

        .right-box {
            width: 100%;
            height: 100%;

            ul {
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: space-between;

                li {
                    width: 33%;
                    height: 100%;

                    .set-box {
                        width: 100%;
                        height: 100%;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        font-size: 16px;

                        .desc {
                            margin-top: 5px;
                        }
                    }
                }
            }
        }
    }

    .box {
        width: 675px;
        display: flex;
        position: relative;

        .left-diectory {
            padding: 10px;
            box-sizing: border-box;
            width: 300px;
            height: 667px;
            position: absolute;
            left: -300px;
            background-color: rgb(251, 247, 243);

            .laozi-ikun {
                width: 100%;
                height: 100%;
                overflow: scroll;

                .btn {
                    margin-right: 13px;
                    width: 123px;
                    height: 34px;
                    border: none;
                    outline: none;
                    border-radius: 5px;
                    border: 1px solid rgb(209, 204, 199);
                    color: #999999;

                    &.f {
                        background-color: rgb(235, 232, 230);
                    }
                }

                ul {
                    width: 100%;

                    .left-di-li {
                        padding: 10px;
                        border-bottom: 1px dashed rgb(235, 232, 230);

                        p {
                            font-size: 20px;
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                        }

                        .activecolor {
                            color: red;
                            font-weight: bold;
                        }

                        .vip {
                            color: #999999;
                            text-decoration: line-through;
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                        }
                    }
                }
            }
        }

        .right-box {
            width: 375px;
            height: 667px;
            background-color: rgb(247, 245, 242);


            .cnm {
                padding: 10px;
                box-sizing: border-box;
                width: 100%;
                height: 100%;
                overflow: scroll;
                text-indent: 2em;
                margin-bottom: 36px;
                line-height: 35px;

                &.bgorigin {
                    background-color: rgb(251, 247, 243);
                }

                &.flamingo {
                    background-image: radial-gradient(73% 147%, #EADFDF 59%, #ECE2DF 100%),
                        radial-gradient(91% 146%, rgba(255, 255, 255, 0.50) 47%, rgba(0, 0, 0, 0.50) 100%);
                    background-blend-mode: screen;


                }

                &.wolverine {

                    background:
                        linear-gradient(90deg, #BDBFBA 4%, #5A5C5B 98%),
                        linear-gradient(74deg, rgba(255, 255, 255, 0.50) 54%, rgba(0, 0, 0, 0.50) 100%);
                    background-blend-mode: multiply;

                }

                &.fullMoon {

                    background-image:
                        linear-gradient(#DEDFE3 2%, #AEB3B9 95%),
                        radial-gradient(33% 100%, rgba(255, 255, 255, 0.50) 0%, rgba(0, 0, 0, 0.50) 100%);
                    background-blend-mode: screen;
                }

                p {

                    text-indent: 2em;
                    margin-bottom: 36px;
                    line-height: 35px;
                }

                h1 {

                    font-weight: 600;
                    text-indent: 0;
                    line-height: 1.5em;
                    margin-bottom: 20px;
                    color: #222;
                }

            }

        }

        &.transition {
            transition: all .2s ease-out;
        }
    }
}
</style>