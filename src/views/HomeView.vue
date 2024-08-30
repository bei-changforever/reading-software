<template>
    <div class="home">
        <HomeHeader @fixrecommend="toggleSex"></HomeHeader>
        <div class="home-select">
            <router-link exact v-for="(item, index) in navi" :key="item.id" @click.native="updateUrl(item.url)"
                :to="{ name: routerUrl[index], params: { url: item.url } }" class="link-item">
                {{ item.name }}
            </router-link>
        </div>
        <!-- <div class="container-box">
            <keep-alive include="HomeContent,FreeView,Boys,Girls,Publish,ListenView"> -->
        <router-view />
        <!-- </keep-alive> -->
        <!-- </div> -->
    </div>
</template>
<script>
import HomeHeader from '@/components/HomeHeader.vue';
import { getnovice } from '@/apis/homeApi/homeApi';
import { mapMutations, mapState } from 'vuex';
export default {
    name: 'HomeView',
    components: {
        HomeHeader,
    },
    data() {
        return {
            navi: [],
            routerUrl: ['Homecontent', 'Free', 'Boy', 'Girls', 'Publish', 'Listen']
        }
    },
    mounted() {
        let sex = this.$store.state.sexy
        this.getStoreNavi(sex)
    },
    computed: {
        ...mapState(['sexy'])
    },
    methods: {
        ...mapMutations(['updateUrl']),
        async getStoreNavi(sex) {
            const { data } = await getnovice(sex)
            this.navi = data.data.navi
            // console.log(this.navi)
            this.updateUrl(this.navi[0].url)

        },
        toggleSex() {
            let sex = this.$store.state.sexy
            this.getStoreNavi(sex)
            this.updateUrl(this.navi[0].url)
        }
    },
}
</script>

<style lang="scss" >
@import '../assets/css/root.css';

.home {
    width: 100%;
    height: 100%;

    .home-select {
        width: 100%;
        height: 12vmin;
        display: flex;
        padding: 10px;
        flex-shrink: 0;
        box-sizing: border-box;
        justify-content: space-between;
        align-items: center;
        margin-top: 56.25px;

        .link-item {
            position: relative;
            display: block;
            font-size: 15px;
            color: var(--home-select-gray);
            width: 35px;
            height: 27px;
            text-align: center;
            line-height: 27px;

            &.router-link-exact-active {
                color: black;
                font-size: 17px;

                &::after {
                    content: '';
                    position: absolute;
                    left: 0;
                    bottom: -2px;
                    display: block;
                    width: 100%;
                    height: 2px;
                    background-color: var(--home-select-border);
                }

            }
        }


    }

    .container-box {
        width: 100%;
        height: calc(100% - 151px);
        background-color: white;
        overflow: scroll;
    }

}
</style>