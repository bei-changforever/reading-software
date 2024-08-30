<template>
    <div class="bookcommet">
        <van-nav-bar>
            <template #left>
                <span class="left-span"></span>
                <p class="left-text">评论</p>
            </template>
            <template #right>
                <van-button size="small " type="default" icon="edit">
                    <p>
                        写评论
                    </p>
                </van-button>
            </template>
        </van-nav-bar>
        <div class="comment-box">
            <CommentListView v-if="commentObj.totalcount > 0" v-for="item in commentObj.list"  :item-info="item"></CommentListView>
            <div v-if="commentObj.totalcount == 0"><van-empty description="暂无评论资源~" /></div>
        </div>
        <div class="dianzi" style="height: 10vh"></div>
    </div>
</template>

<script>
import CommentListView from './CommentListView.vue'
export default {
    name: "BookComment",
    props:['commentObj'],
    data() {
        return {

        }
    },
    components:{
        CommentListView
    },
    computed: {

    },
    methods: {

    },
    mounted() {

    }
}
</script>

<style lang="scss" scoped>
.bookcommet {
    width: 100%;

    .van-nav-bar {
        position: sticky;
        top: 0px;
        .left-text {
            color: rgb(104, 104, 104);
            padding: 0 5px 0 5px;
        }

        .left-span {
            display: block;
            width: 4px;
            height: 17px;
            background-color: rgb(104, 104, 104);
            border-radius: 9px;
        }
    }
    .comment-box {
        width: 100%;
        padding: 10px;
        box-sizing: border-box;
    }


}
</style>