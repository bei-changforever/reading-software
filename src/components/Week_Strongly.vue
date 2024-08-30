<template>
    <div class="week_push" v-if="week">
        <HomeTitleVue :title="week.name" :show-more="true" :src="'/stro'"></HomeTitleVue>
        <!-- 大标题 -->
        <div class="big-title-box" :data-id="mianTitle.id" @click="bookHandler(mianTitle)">
            <!-- 左边 -->
            <div class="img">
                <img class="auto-img" :src="mianTitle.cover" />
            </div>
            <!-- 右边 -->
            <div class="desc-box">
                <p class="name">{{ mianTitle.title }}</p>
                <p class="author">{{ mianTitle.author }} / {{ mianTitle.category }}</p>
                <span class="content">{{ mianTitle.content }}</span>
            </div>
        </div>
        <!-- 副标题 -->
        <div class="subsidiary">
            <ul>
                <li v-for="item in noMainTitle" :key="item.id" @click="bookHandler(item)">
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
    </div>
</template>
<script>
import HomeTitleVue from './HomeTitle.vue';
import { mapMutations, mapState } from 'vuex';
export default {
    name: 'Week',
    components: {
        HomeTitleVue
    },
    props: {
        week: Object
    },
    data() {
        return {

            mianTitle: '',
            noMainTitle: []
        }
    },
    computed: {
        ...mapState(['bookinfo'])
    },
    watch: {
        week() {
            this.mianTitle = this.week.list[0]
            this.noMainTitle = [...this.week.list.splice(1, 4)]
            this.$nextTick()
            console.log('组件week数据', this.week);
        }
    },

    mounted() {

        this.mianTitle = this.week.list[0]
        this.noMainTitle = [...this.week.list.splice(1, 4)]
        console.log(this.noMainTitle)
    },
    methods: {
        bookHandler(item) {
            this.updateBookInfo({
                id: item.id,
                title: item.title,
            })
            this.$router.push({
                path: '/booksub',
                query: {
                    book_id: item.id
                }
            })
        },
        ...mapMutations(['updateBookInfo', 'updatebookShelfList'])
    },

}
</script>

<style lang="scss" scoped>
@import '../assets/css/root.css';

.week_push {
    width: 100%;

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
            }

            .author {
                font-size: 15px;
                color: var(--author-gray);
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

            }
        }




    }
}

.subsidiary {
    width: 100%;
    height: 170px;
    border-bottom: 1px solid var(--sliver-color-gray);


    ul {
        padding: 10px;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;

        li {
            width: 24%;
            height: 100%;

            .subsidiary-box {
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;

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
</style>