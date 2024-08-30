<template>
    <div class="hourt" v-if="hour">
        <HomeTitleVue :title="hour.name" :show-more="true" :src="`/more/dayrank`"></HomeTitleVue>
        <div class="hourt-box">
            <ul>
                <li v-for="(item, index) in hour.list" :key="item.id" @click="bookHandler(item)">
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
</template>
<script>
import HomeTitleVue from './HomeTitle.vue';
import { Rank_icon } from '@/utils/tools';
import { mapMutations, mapState } from 'vuex';
export default {
    name: 'Hour',
    props: {
        hour: Object
    },
    components: {
        HomeTitleVue
    },
    data() {
        return {
            RankImgSrc: Rank_icon
        }
    },
    methods: {
        bookHandler(item) {

            console.log(item)

            this.updateBookInfo({
                id: item.id,
                title: item.title
            })
            this.$router.push({
                path: '/booksub',
            })
        },
        ...mapMutations(['updateBookInfo'])
    }

}
</script>

<style lang="scss" scoped>
@import '../assets/css/root.css';

.hourt {
    width: 100%;
    border-bottom: 1px solid var(--sliver-color-gray);

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
</style>