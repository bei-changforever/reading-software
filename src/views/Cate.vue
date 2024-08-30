<template>
    <div class="cateview" v-if="cateList">
        <div class="cateview-header">
            <van-tabs swipeable @click="onClick" ellipsis title-active-color="rgb(198, 91, 62)" lazy-render v-model="activeIndex">
                <van-tab v-for="(item, index) in cateList" :title="item.name">
                    <div class="tab-containers">
                        <ul>
                            <li :class="Sonactive == j ? 'active' : ''" v-for="(i, j) in item.cates"
                                @click="chooseCatId(i, j)">
                                {{ i.name }}
                            </li>
                        </ul>
                    </div>
                </van-tab>
            </van-tabs>
        </div>
        <div class="cate-list-box">
            <van-collapse v-model="activeNames" is-link lazy-render>
                <van-collapse-item name="1">
                    <template #title>
                        <div class="fuck-asshole" v-if="categories"><span :class="sortActive == 0 ? 'active' : ''">{{
                            categories[3].catArray[0].name
                        }}</span>&nbsp;|&nbsp;<span :class="sortActive == 1 ? 'active' : ''">{{
    categories[3].catArray[1].name }}</span></div>
                    </template>
                    <ul class="pay" v-if="categories">
                        <li :class="PaySonActive == index ? 'active' : ''" v-for="(item, index) in categories[0].catArray"
                            @click="choosePay(item, index)">
                            <span>{{ item.name }}</span>
                        </li>
                    </ul>
                    <ul class="bookStatus" v-if="categories">
                        <li :class="bookStatusActive == index ? 'active' : ''" @click="choosebookStatus(item, index)"
                            v-for="(item, index)  in categories[1].catArray"><span>{{ item.name }}</span></li>
                    </ul>
                    <ul class="wordCount" v-if="categories">
                        <li :class="wordCountActive == index ? 'active' : ''" @click="choosewordCount(item, index)"
                            v-for="(item, index)  in categories[2].catArray"><span>{{ item.name }}</span></li>
                    </ul>
                </van-collapse-item>
            </van-collapse>
        </div>
        <div class="good-books" v-if="fuckres">
            <div class="good-books-box">
                <div class="good-books-content" v-for="(item, index) in fuckres" @click="bookHandle(item)" :key="item.id"
                    v-if="item.cover">
                    <div  class="img">
                            <img :id="item.id" class="auto-img" :src="item.cover" @error="defImg"  alt="">
                        </div>
                    <div class="desc">
                        <p class="title">{{ item.title }}</p>
                        <p><span v-show="item.category">{{ item.category }} / </span>{{ item.author }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="dianzi" style="height: 10vh"></div>
    </div>
</template>

<script>
import { getCate, getCat, getCateBookDetail } from '@/apis/homeApi/homeApi';
import { mapMutations, mapState } from 'vuex';
import { ErrorImgSrc } from '@/utils/tools';
export default {
    name: 'CateView',
    data() {
        return {
            cateList: '',
            activeIndex: 0,
            Sonactive: 0,
            PaySonActive: 0,
            bookStatusActive: 0,
            wordCountActive: 0,
            sortActive: 0,
            activeNames: ['0'],
            categories: '',
            fuckres: '',
            options: {
                catId: 7,
                wordCount: 0,
                pay: 0,
                bookStatus: 0,
                sort: 1
            },
            errimgSrc : ErrorImgSrc,
            defaultImg: require("@/assets/images/book-login.png"),
        }
    },
    mounted() {
        this.getCateList()
        this.getCatList()
        this.$nextTick(() => {
            this.getCateBookDe(this.options)
        })
    },
    computed: {
    
    },
    methods: {
        async getCateList() {
            let { data } = await getCate()
            this.cateList = data
            console.log('cateList==>', this.cateList)
        },
        async getCatList() {
            let { data } = await getCat()
            this.categories = data.categories
            console.log(this.categories)
        },
        async getCateBookDe(options) {
            // /source/v2/cat.json?catId=7
            let { data } = await getCateBookDetail(options)
            this.fuckres = data.list || []
        },
        defImg(){
            let img = event.srcElement;
            img.src = this.defaultImg;
            img.onerror = null; //防止闪图
        },
        onClick(title) {
            // console.log('触发了',title)
            this.Sonactive = 0
            this.PaySonActive = 0
            this.bookStatusActive = 0
            this.wordCountActive = 0
        },
        bookHandle(item) {
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
        chooseCatId(obj, j) {
            // console.log(obj.url.split('=')[1])
            if (this.Sonactive == j) return
            this.Sonactive = j
            this.options.catId = obj.url.split('=')[1]
            this.getCateBookDe(this.options)

        },
        choosePay(item, index) {
            if (this.PaySonActive == index) return
            this.PaySonActive = index
            this.options.pay = item.value
            this.getCateBookDe(this.options)
        },
        choosebookStatus(item, index) {
            if (this.bookStatusActive == index) return
            this.bookStatusActive = index
            this.options.bookStatus = item.value
            this.getCateBookDe(this.options)
        },
        choosewordCount(item, index) {
            if (this.wordCountActive == index) return
            this.wordCountActive = index
            this.options.wordCount = item.value
            this.getCateBookDe(this.options)
        },
        ...mapMutations(['updateBookInfo'])
    },
    watch: {
        Sonactive: {
            deep: true,
            handler(newVal) {

            }
        }
    }
}
</script>

<style lang="scss" >
.cateview {
    width: 100%;

    .cateview-header {
        width: 100%;
        position: sticky;
        top: 0;
        left: 0;
        z-index: 2;
    }

    .tab-containers {
        width: 100%;
        padding: 10px;
        box-sizing: border-box;
        background-color: rgb(246, 246, 246);

        ul {
            width: 100%;
            display: flex;
            flex-wrap: wrap;

            li {
                min-width: 20%;
                height: 25px;
                text-align: center;
                line-height: 25px;
                font-size: 15px;
                position: relative;

                &.active {

                    color: rgb(198, 91, 62);
                }
            }
        }
    }

    .fuck-asshole {
        padding: 0 10px;
        color: #969799;

        span.active {
            color: rgb(198, 91, 62);
        }
    }

    .pay,
    .bookStatus,
    .wordCount {
        padding: 0 10px;
        width: 100%;
        display: flex;
        flex-wrap: wrap;


        li {
            min-width: 25%;
            height: 25px;
            line-height: 25px;

            &.active {

                color: rgb(198, 91, 62);
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

                    .auto-img {
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
}
</style>