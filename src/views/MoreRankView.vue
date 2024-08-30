<template>
    <div class="morerank">
        <van-nav-bar >
            <template #left>
                <van-icon name="arrow-left" size="18" color="white" @click="$router.go(-1)"/>
            </template>
            <template #title>
                <p class="title">男生小说畅销榜</p>
            </template>
            <template #right>
                <van-icon name="search" size="18" color="white"/>
            </template>
        </van-nav-bar>
        <nav class="nav-link">
            <router-link class="link-item" exact  to="dayrank">日榜</router-link>
            <router-link class="link-item" exact  to="weekrank">周榜</router-link>
            <router-link class="link-item" exact  to="monthrank">月榜</router-link>
        </nav>
        <keep-alive>
          <router-view></router-view>    
        </keep-alive>
    </div>
</template>

<script>

export default {
    name: 'MoreRank',
    data(){
        return {

        }
    },
    created() {
        console.log(this.$route)
    }
   
 
}
</script>

<style lang="scss" scoped>
@import '../assets/css/root.css';

.van-nav-bar {
    background-color: var(--navibarTitlecolor);
 
    .title {
        color: white;
    }
}

.nav-link {
   display: flex;
   justify-content: space-around;
   position: sticky;
   top: 0;
   background-color: white;
   .link-item {
    position: relative;
    font-size: 15px;
    line-height: 40px;
    color: black;

    &.router-link-exact-active {
      color: var(--text-black);
      font-weight: 600;
      font-size: 17px;


      &::after {
        content: '';
        position: absolute;
        left: 0;
        bottom: 2px;
        display: block;
        width: 100%;
        height: 3px;
        background-color: var(--text-border);
      }
    }
   }
  }
</style>