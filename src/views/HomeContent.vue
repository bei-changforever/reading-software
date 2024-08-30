<template>
    <div class="home-content">
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
            <van-swipe-item v-for="item in bannerList.banners" :key="item.id">
                <van-image :src="item.cover" />
            </van-swipe-item>
        </van-swipe>
        <van-grid :border="false" :column-num="5" >
            <van-grid-item v-for="item in navBarList.shortCut" @click="gotoRank(item)" :key="item.msgId">
                <van-image :src="item.cover" />
                <P>{{ item.name }}</P>
            </van-grid-item> 
        </van-grid>

        <!-- 本周强推 -->
        <Week_Strongly v-if="ComponentsProps.week" :week="ComponentsProps.week"></Week_Strongly>
        <!-- 人气NO.1-本周爆款来了 -->
        <PopularityView v-if="ComponentsProps.ren" :ren="ComponentsProps.ren"></PopularityView>
        <!-- 24小时热销榜 -->
        <HourTw v-if="ComponentsProps.hour" :hour="ComponentsProps.hour"></HourTw>
        <!-- 精品必读 -->
        <JinPin v-if="ComponentsProps.jin" :jin="ComponentsProps.jin"></JinPin>
        <!-- 高能剧情 -->
        <High_Energy v-if="ComponentsProps.gao" :gao="ComponentsProps.gao"></High_Energy>
        <!-- 优质好文 -->
        <HighGuality v-if="ComponentsProps.youzhi" :youzhi="ComponentsProps.youzhi"></HighGuality>
        <!-- 大家都在看 -->
        <Everyone_watching v-if="ComponentsProps.dajia" :every="ComponentsProps.dajia"></Everyone_watching>

        <div class="dianzi" style="height: 10vh"></div>
    </div>
</template>

<script>
import { getHomeRecommend } from '@/apis/homeApi/homeApi';
import HighGuality from '@/components/High-Guality.vue';
import High_Energy from '@/components/High_Energy.vue';
import HourTw from '@/components/HourTw.vue';
import PopularityView from '@/components/PopularityView.vue';
import Week_Strongly from '@/components/Week_Strongly.vue';
import Everyone_watching from '@/components/Everyone_watching.vue';
import JinPin from '@/components/JinPin.vue';
import { mapState } from 'vuex';
export default {
    name: 'HomeContent',
    components: {
        HighGuality,
        High_Energy,
        HourTw,
        JinPin,
        PopularityView,
        Week_Strongly,
        Everyone_watching
    },
    data() {
        return {
            bannerList: [],
            navBarList: [],
            ComponentsProps: {}
        }
    },
    computed:{
        ...mapState(['url'])
    },
    mounted() {
        console.log('挂载')
        // /store/show.json?type=female_recommend&uuid=b229b022871941fea
        // '/store/show.json?type=recommend&uuid=f2cb32ff209f4010911a77a617add8c4'
        let url = this.$store.state.url
        this.getHomeList(url)
    },
    methods: {

        async getHomeList(url) {
            const { data } = await getHomeRecommend(url)
            console.log(data)
            this.bannerList = data.data.list[0]
            this.navBarList = data.data.list[1]

            this.ComponentsProps.week = data.data.list[2]
            this.ComponentsProps.ren = data.data.list[3]
            this.ComponentsProps.hour = data.data.list[4]
            this.ComponentsProps.jin = data.data.list[5]
            this.ComponentsProps.gao = data.data.list[6]
            this.ComponentsProps.wanjie = data.data.list[7]
            this.ComponentsProps.youzhi = data.data.list[8]
            this.ComponentsProps.dajia = data.data.list[9]

        },
        gotoRank(e) {
            if(e.name == '排行') {
                this.$router.push({
                    path:'/homerank'
                })
            }
        }

    },
    watch:{
        "$store.state.url":{
            deep: true,
            handler(newVal) {
                console.log('newVal==>',newVal)
                let url  = newVal
                this.getHomeList(url)
            }
        }
    }
}
</script>

<style lang="scss" scoped >
@import '../assets/css/root.css';

.home-content {
    width: 100%;
    // background-color: pink;

    .my-swipe .van-swipe-item {
        width: 100%;
        padding: 10px;
        box-sizing: border-box;

        .van-image {
            width: 100%;
            height: auto;
            display: block;
        }
    }

    .van-grid {
        border-bottom: 1px solid var(--sliver-color-gray);
        margin-bottom: 10px;

        .van-grid-item {
            p {
                margin: 5px 0 10px 0;
                font-size: 16px;
            }

            .van-grid-item__content {
                padding: 5px;
            }
        }

    }
}
</style>