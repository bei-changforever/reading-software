<template>
  <div id="app">
    <Advertising @sonClick="blankHandler" :reflash="firstIn" :src="this.ad.img" :time="time
    "></Advertising>
    <router-view />
    <div class="foot" v-if="roteShow">
      <FooterMusicVue></FooterMusicVue>
    </div>
    
    <van-tabbar route v-model="active" active-color="#1296db"
      v-if="$route.path !== '/stro' && $route.path !== '/pm' && $route.path !== '/act' && $route.path !== '/more/dayrank' && $route.path !== '/more/weekrank' && $route.path !== '/search' && $route.path !== '/more/monthrank' && $route.path !== '/login'  && $route.path !== '/bookcontent' && $route.path !== '/audio' && $route.path !== '/homerank' ">
      <van-tabbar-item to="/bookshelf">
        <span>书架</span>
        <template #icon="font_icon">
          <img :src="font_icon.active ? imgSrc[0] : imgSrc[1]">
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/">
        <span>书城</span>
        <template #icon="font_icon">
          <img :src="font_icon.active ? imgSrc[2] : imgSrc[3]">
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/cate">
        <span>分类</span>
        <template #icon="font_icon">
          <img :src="font_icon.active ? imgSrc[4] : imgSrc[5]">
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/my">
        <span>我的</span>
        <template #icon="font_icon">
          <img :src="font_icon.active ? imgSrc[6] : imgSrc[7]">
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
import FooterMusicVue from './components/FooterMusic.vue';
import Advertising from './components/Advertising.vue';
import { mapState, mapMutations } from 'vuex';
import { getAd } from '@/apis/homeApi/homeApi'
import { Active_icon } from '@/utils/tools'
export default {
  name: 'App',
  components: {
    Advertising,
    FooterMusicVue
  },
  data() {
    return {
      ad: '',
      windowWidth: 375,
      windowHeight: 667,
      active: 1,
      imgSrc: '',
      time: 5,
      timeout: null,
      timer: null
    }
  },
  computed: {
    ...mapState(['firstIn','roteShow'])
  },
  created() {

    //初始化一个已加入书架的书籍id
    if(!localStorage.bookshelfSomeId) {
      localStorage.setItem('bookshelfSomeId',JSON.stringify([]))
    }

    if(!localStorage.currentReadIndex) {
      localStorage.setItem('currentReadIndex',JSON.stringify([]))
    }

    if(!localStorage.currentReadingBook) {
      localStorage.setItem('currentReadingBook',JSON.stringify([]))
    }

    if(!localStorage.phoneNumber) {
      localStorage.setItem('phoneNumber',JSON.stringify({}))
    }



    window.onresize = () => {
      this.windowWidth = document.documentElement.clientWidth
      this.windowHeight = document.documentElement.clientHeight
    };
    this.fun2();

    this.getAdvertising();
    this.$nextTick(() => {
      this.imgSrc = Active_icon
    });

    // console.log(this.$router, this.$route)
  },
  methods: {

    fun2() {
      if (this.timer) {
        clearInterval(this.timer)
      }

      this.timer = setInterval(() => {
        this.time--

        if (this.time == 0) {
          clearInterval(this.timer)
          this.updateFirstIn(false)
        }
      }, 1000);
    },
    async getAdvertising() {
      const { data } = await getAd();
      if (this.windowWidth < 640) {
        this.ad = data[0].ads[0].res_url_detail[0];
      }
      else if (this.windowWidth > 1080) {
        this.ad = data[0].ads[0].res_url_detail[1];
      }
    },
    blankHandler(e) {
      if (this.timer) {
        clearInterval(this.timer)
        this.time = 5
        this.updateFirstIn(e)
      }
    },
    ...mapMutations(['updateFirstIn'])
  },


}
</script>

<style lang="scss">
#app {
  width: 100vw;
  height: 100vh;

  audio {
    display: none;
  }

  .foot {
    position: fixed;
    top: 250px;
    right: 20px;
    z-index: 99;
  }
}
</style>
