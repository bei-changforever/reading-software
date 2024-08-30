import Vue from 'vue'
import Vuex from 'vuex'
import {
  Toast
} from 'vant';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //首屏广告加载
    firstIn: true,
    //书籍信息
    bookinfo: {
      id: '',
      title: ''
    },
    // 书架列表
    bookShelfList: [],
    //全局目录
    bookDirectoryList: [],
    //阅读信息
    readConfig: {
      articleIndex: 0,
      maxIndex: 0,
      sec_id: '',
      // 当前阅读章节index,
      currentReadIndex: 0
    },
    contentText: '',
    url: '/store/show.json?type=recommend&uuid=f2cb32ff209f4010911a77a617add8c4',
    //音频播放
    playList: '',
    AudioBookInfo: '',
    //默认的下标为0,
    playListIndex: 0,
    //播放页面状态
    toggleAudioShow: false,
    $audio: null,
    tinbookInfo: '',
    tinglist: '',
    isBtnShow: true,
    currentTime: 0,
    TotalTime: 0,
    isDrag: false,
    //是否展示旋转播放
    roteShow: true,
    // 本地数据持久化记录用户阅读章节
    ordersUserReadInfo:[],
    isLogin: false,
    sexy: 1
  },
  getters: {
  },
  mutations: {
    updateSex(state,val) {
      state.sexy = val
      console.log(state.sexy)
    },
    updateLogin(state,val) {
      state.isLogin = val
    },
    //更新章节Id
    updatereadConfigId(state, val) {
      state.readConfig.sec_id = val
    },
    updatereadConfigIndex(state,val) {
      state.readConfig.currentReadIndex = val
    },
    updateOrdersUserReadInfo(state,val) {
      state.ordersUserReadInfo.push(val)
      console.log(state.ordersUserReadInfo)
    },
    //用户是否第一次进入
    updateFirstIn(state, val) {
      state.firstIn = val;
    },
    //更新书籍信息
    updateBookInfo(state, val) {
      state.bookinfo = val;
    },
    //更新书籍目录
    updateBookDirectoryList(state, val) {
      state.bookDirectoryList = val;
      //切换书籍目录最大值为书籍目录数组的最大值
      state.readConfig.maxIndex = state.bookDirectoryList.length - 1;
      //更新书籍目录的同时存储当前书籍目录第一章的Id
      // state.readConfig.sec_id = state.bookDirectoryList[0][0].secId
    },
    //上一章
    addArticleIndex(state) {
      if (state.readConfig.articleIndex >= state.readConfig.maxIndex) {
        return Toast({
          message: '最后一页啦~',
        });
      };
      state.readConfig.articleIndex++;
    },
    //下一章
    subArticleIndex(state) {
      if (state.readConfig.articleIndex <= 0) {
        return Toast({
          message: '前面没有啦~',
        });
      };
      state.readConfig.articleIndex--;
    },
    //更新书籍章节内容
    updatecontentText(state, val) {
      state.contentText = val
    },
    updateUrl(state, val) {
      state.url = val
      console.log(state.url)
    },
    updateAudioBook(state, val) {
      state.AudioBookInfo = val
    },
    updateToggleAudioShow(state) {
      state.toggleAudioShow = !state.toggleAudioShow
    },
    updateplayList(state, val) {
      state.playList = val
    },
    updateSetAudio(state, val) {
      state.$audio = val
    },
    updatebookInfo(state, val) {
      state.tinbookInfo = val
    },
    updatetinglist(state, val) {
      state.tinglist = val
    },
    updateisBtnShow(state, val) {
      state.isBtnShow = val
    },
    updateCurrentTime(state, val) {
      state.currentTime = val
    },
    updateTotalTime(state, val) {
      state.TotalTime = val
    },
    updateIsDrag(state, val) {
      state.isDrag = val
    },
    updateIndex(state, val) {
      state.playListIndex = val
    },
    updateroteShow(state, val) {
      state.roteShow = val
    },
    updatebookShelfList(state, val) {
      state.bookShelfList.unshift(val)
      console.log('书架==>', state.bookShelfList)
    }
  },
  actions: {


  },
  modules: {}
})