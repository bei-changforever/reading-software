<template>
    <div class="search">
        <van-search @cancel="onCancel" clear-trigger="always" v-model="value" shape="round" show-action
            @focus="searchFocusHandle" placeholder="请输入搜索关键词" @input="getSuggestList" />
        <div class="hotsearch-box" v-show="!showSearchResult && !showSuggest">
            <p class="title">热门搜索</p>
            <ul>
                <li v-for="(item, index) in hotSearchList" :key="item.id" @click="searchKeyWord(item.name)">
                    <p>
                        <span :class="`rank${item.hot}`">{{ item.hot + 1 }}</span><span class="name">{{ item.name }}
                        </span>
                    </p>
                </li>
            </ul>
        </div>
        <div class="actull-search" v-show="!showSearchResult && !showSuggest">
            <div class="zu-b">
                <span>最近搜索</span>
                <van-icon name="delete-o" size="18" @click="delHistory"/>
            </div>
            <ul>
                <li v-for="(item, index) in keyWorldList" :key="index" @click="searchKeyWord(item)">
                    <p>{{ item }}</p>
                </li>
            </ul>
        </div>
        <div class="suggest-list-box" v-show="showSuggest">
            <div class="suggest-view">
                <p class="title">搜索建议</p>
                <ul v-if="Object.prototype.toString.call(suggestList) == '[object Object]' ">
                    <li 
                        @click="searchKeyWord(suggestList.text)">
                        <div class="icon">
                            <van-icon name="search" />
                            <span>{{ suggestList.text  }}</span>
                        </div>
                        <van-icon name="arrow" />
                    </li>
                </ul>
                <ul v-else>
                    <li  v-for="(item, index) in suggestList" :key="index"
                        @click="searchKeyWord(item.text)">
                        <div class="icon">
                            <van-icon name="search" />
                            <span>{{ item.text  }}</span>
                        </div>
                        <van-icon name="arrow" />
                    </li>
                </ul>
            </div>
        </div>
        <div class="search-res" v-show="showSearchResult">
            <div class="padding-box" v-if="resList">       
                <div class="common-bookele" v-if="item.cover" v-for="(item, index) in resList" @click="bookHandler(item)">
                    <div class="img">
                        <img  :src="item.cover" alt="">
                    </div>
                    <div class="desc-box">
                        <p class="title">{{ item.title }}</p>
                        <p class="author">{{ item.category }} / {{ item.author }} </p>
                        <div class="description" v-html="item.summary"></div>
                    </div>
                </div>
        
        </div>
        </div>
    </div>
</template>
<script>
import SuggestView from '@/components/SuggestView.vue'
import { mapMutations,mapState } from 'vuex';
import { getHotSearch, getSuggest, getBookSearchRes } from '@/apis/homeApi/homeApi'
export default {
    name: 'SearchView',
    components: {
        SuggestView
    },
    data() {
        return {
            value: '',
            hotSearchList: '',
            keyWorldList: [],
            resList: [],
            suggestList: '',
            showSearchResult: false,
            timer: null
        }
    },
    computed: {
        showSuggest() {
            return this.value.trim() && !this.showSearchResult
        }
    },
    mounted() {
        this.getHotSearchList()
        this.getSearchHistory()
    },
    methods: {
        async getHotSearchList() {
            let { data } = await getHotSearch()
            this.hotSearchList = data.list.reverse()
        },
        searchKeyWord(kw) {
            // 将点击的label 关键字设置为输入框的内容
            this.value = kw.trim()

            // 将本次搜索存入到历史记录中
            // 先拿旧数据
            let searchHistory = JSON.parse(localStorage.keyWorldList || '[]')

            // 搜索历史记录去重,把与本次搜索的关键字重复的删除,并将本次搜索的关键字放在数组最前面
            searchHistory = [this.value, ...searchHistory.filter(k => k !== this.value)]

            // 再将搜索历史记录数组存入 localStorage, 并更新 this.searchHistory

            this.keyWorldList = searchHistory

            localStorage.keyWorldList = JSON.stringify(searchHistory)

            // 显示搜索结果
            this.showSearchResultHandle(kw)
        },
        async showSearchResultHandle(kw) {
            this.showSearchResult = true
            console.log(kw)

            let {data} = await getBookSearchRes(kw)
            this.resList = data.data.books

            console.log('reslist==>', this.resList)
        },
        getSearchHistory() {
            this.keyWorldList = JSON.parse(localStorage.keyWorldList || '[]')
        },
        onCancel() {
            this.$router.go(-1)
        },
        getSuggestList() {
            if (this.timer) {
                clearTimeout(this.timer)
            }
            let str = this.value.trim()
            if (!str) {
                return
            }
            // this.keyWorldList.unshift(str)
            // this.keyWorldList = [...new Set(this.keyWorldList)]
            // localStorage.keyWorldList = JSON.stringify(this.keyWorldList)
            this.timer = setTimeout(async () => {

                let { data } = await getSuggest(str)
                this.suggestList = data.words.w
            }, 500)


        },
        searchFocusHandle() {
            if (this.showSearchResult) {
                this.getSuggestList()
                this.showSearchResult = false
            }
        },
        bookHandler(item) {
            this.updateBookInfo({
                id: item.bookId,
                title: item.title
            })
            this.$router.push({
                path: '/booksub',
                query: {
                    book_id: item.bookId
                }
            })
        },
        delHistory() {
            localStorage.removeItem("keyWorldList");
            this.keyWorldList = [];
        },
        ...mapMutations(['updateBookInfo'])
    },
    watch:{
        suggestList(newVal) {
            console.log(newVal)
            this.suggestList = newVal
        }
    }
}
</script>

<style lang="scss" scoped>
.search {
    width: 100%;
    height: 100%;
    background-color: rgb(247, 246, 244);

    .hotsearch-box {
        width: 100%;
        padding: 10px;
        box-sizing: border-box;

        .title {
            font-size: 16px;
            padding: 5px;
            color: rgb(121, 121, 120);
        }

        ul {
            padding: 4px;
            box-sizing: border-box;
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;

            li {
                margin-bottom: 10px;
                width: 47%;
                font-size: 16px;
                line-height: 20px;


                .rank0 {
                    margin-right: 10px;
                    display: inline-block;
                    width: 20px;
                    height: 20px;
                    text-align: center;
                    border-radius: 50%;
                    background-color: rgb(211, 89, 58);
                    color: white;
                }


                .rank1 {
                    margin-right: 10px;
                    display: inline-block;
                    width: 20px;
                    height: 20px;
                    text-align: center;
                    border-radius: 50%;
                    background-color: rgb(243, 130, 54);
                    color: white;
                }

                .rank2 {
                    margin-right: 10px;
                    display: inline-block;
                    width: 20px;
                    height: 20px;
                    text-align: center;
                    border-radius: 50%;
                    background-color: rgb(240, 191, 62);
                    color: white;
                }


                .rank3 {
                    margin-right: 10px;
                    display: inline-block;
                    width: 20px;
                    height: 20px;
                    text-align: center;
                    border-radius: 50%;
                    background-color: rgb(217, 217, 217);
                    color: white;
                }
            }
        }
    }

    .actull-search {
        width: 100%;
        padding: 10px;
        box-sizing: border-box;


        .zu-b {
            width: 100%;
            display: flex;
            justify-content: space-between;
            font-size: 16px;
            color: rgb(121, 121, 120);
        }

        ul {
            width: 100%;
            padding: 10px;
            box-sizing: border-box;
            background-color: rgb(247, 246, 244);

            li {
                background: #fff;
                font-size: 14px;
                padding: 0 10px;
                line-height: 28px;
                height: 28px;
                margin-right: 15px;
                margin-bottom: 15px;
                display: inline-block;
                color: #aba59a;
                border: 1px solid #c8c8c8;
                border-radius: 4px;
                position: relative;
            }
        }
    }

    .suggest-list-box {
        width: 100%;
        background-color: rgb(247, 246, 244);

        .suggest-view {
            width: 100%;
            background-color: rgb(247, 246, 244);

            .title {
                margin-top: 10px;
                font-size: 16px;
                padding: 10px;
                color: rgb(121, 121, 120);
            }

            ul {
                width: 100%;
                padding: 10px;
                box-sizing: border-box;

                li {
                    font-size: 16px;
                    width: 100%;
                    display: flex;
                    color: #aba59a;
                    justify-content: space-between;
                    padding: 10px 0 10px 0;
                }
            }
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
}
</style>