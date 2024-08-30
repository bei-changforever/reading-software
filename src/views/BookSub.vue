<template>
    <div class="booksub" v-if="feed.entry">
        <van-nav-bar>
            <template #left>
                <van-icon name="arrow-left" size="18" color="rgb(104,104,104)"
                    @click="$router.go(-1)" />
            </template>
            <template #title>
                <p class="title"></p>
            </template>
            <template #right>
                <van-icon @click="$router.push({
                    path: '/search'
                })" name="search" size="18" color="rgb(104,104,104)" />
            </template>
        </van-nav-bar>
        <!-- 信息组件 -->
        <BookInfo v-if="feed" :feed="feed" :value="value"></BookInfo>
        <!-- 目录组件 -->
        <DirectoryVue v-if="dilist" :title="dilist.latestArticleTitle" :time="dilist.update"></DirectoryVue>
        <!-- 书籍评论组件 -->
        <CommentView v-if="commentList" :comment-obj="commentList"></CommentView>
        <!-- 用户操作组件 feed.entry -->
        <BookUserSelect :book-obj="feed"></BookUserSelect>
    </div>
</template>

<script>
import BookInfo from '@/components/BookInfo.vue';
import CommentView from '@/components/BookComments.vue';
import { getSub, getNewDirectory ,getBookComments} from '@/apis/homeApi/homeApi';
import BookUserSelect from '@/components/BookUserSelect.vue';
import DirectoryVue from '@/components/Directory.vue';
import { mapState } from 'vuex';
export default {
    name: 'BookSub',
    data() {
        return {
            feed: '',
            value: 0,
            dilist: '',
            commentList: ''
        }
    },
    components: {
        BookInfo,
        BookUserSelect,
        DirectoryVue,
        CommentView
    },
    methods: {
        async getBookInfo() {
            let { data: { feed } } = await getSub(this.bookinfo)
            this.feed = feed
            this.feed.isJoinBookShelf = false
            this.value = Number(feed.entry['pris:ranking'].value)
        },
        async getCurrentBookDirectory() {
            let { data: { item } } = await getNewDirectory(this.bookinfo.id)
            this.dilist = item
        },
        async getComment() {
            let { data :{all}} = await getBookComments(this.bookinfo.id)
            this.commentList = all
        }
    },
    computed: {
        ...mapState(['bookinfo'])
    },
    mounted() {
        this.getBookInfo()
        this.getCurrentBookDirectory()
        this.getComment()
    },
}
</script>

<style lang="scss" scoped>
@import '../assets/css/root.css';
.booksub {
    width: 100%;
    height: 100%;

    .van-nav-bar {
        position: sticky;
        top: 0;
        left: 0;
        z-index: 2;
    }
}
</style>