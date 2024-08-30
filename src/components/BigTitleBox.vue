<template>
    <div>
        <div class="big-title-box" @click="bookHandler(obj)">
            <!-- 左边 -->
            <div :class="['img', obj.discountDesc ? 'active' : '']">
                <img class="auto-img" :src="obj.cover || obj.iconUrl" />
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
</template>

<script>
import { mapMutations, mapState } from 'vuex';
export default {
    name: "BigTitleBox",
    props: {
        obj: {
            type: Object || Array
        },
        isShow:{
            type: Boolean,
            default: false
        }
    },
    methods: {
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
        ...mapMutations(['updateBookInfo', 'updatereadConfigId','updatebookShelfList'])
    }
}
</script>
<style lang="scss" scoped>
@import '../assets/css/root.css';
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
            bottom: 5px;
            left: 0px;
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
</style>