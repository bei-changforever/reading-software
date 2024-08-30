import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [{
    path: '/',
    // name:'Home',
    redirect: '/Homecontent',
    component: () => import('../views/HomeView.vue'),
    children: [{
        path: '',
        // alias:'',
        name: 'Homecontent',
        component: () => import('../views/HomeContent.vue')
      },
      {
        path: 'free',
        name: 'Free',
        component: () => import('../views/FreeView.vue')
      },
      {
        path: 'boy',
        name: 'Boy',
        component: () => import('../views/BoysView.vue')
      },
      {
        path: 'girls',
        name: 'Girls',
        component: () => import('../views/GirlsView.vue')
      },
      {
        path: 'publish',
        name: 'Publish',
        component: () => import('../views/PublishView.vue')
      },
      {
        path: 'listen',
        name: 'Listen',
        component: () => import('../views/ListenView.vue')
      },
    ]
  },
  {
    path: '/bookshelf',
    name: 'bookshelf',
    component: () => import('../views/Bookshelf.vue')
  },
  {
    path: '/cate',
    name: 'cate',
    component: () => import('../views/Cate.vue')
  },
  {
    path: '/my',
    name: 'my',
    component: () => import('../views/MyView.vue')
  },
  {
    path: '/more',
    redirect: 'dayrank',
    component: () => import('../views/MoreRankView.vue'),
    children: [{
        path: 'dayrank',
        // alias:'',
        name: 'dayrank',
        component: () => import('../views/DayRank.vue')
      },
      {
        path: 'weekrank',
        name: 'weekrank',
        component: () => import('../views/WeekRank.vue')
      },
      {
        path: 'monthrank',
        name: 'monthrank',
        component: () => import('../views/MonthRank.vue')
      }
    ]
  },
  {
    path: '/stro',
    name: 'stro',
    component: () => import('../views/Strongly.vue')
  },
  {
    path: '/pm',
    name: 'pm',
    component: () => import('../views/PopularityMoreView.vue')
  },
  {
    path: '/act',
    name: 'act',
    component: () => import('../views/ActurllyBook.vue')
  },
  {
    path: '/booksub',
    name: 'booksub',
    component: () => import('../views/BookSub.vue')
  },
  {
    path: '/bookcontent',
    name: 'bookcontent',
    component: () => import('../views/BookContentView.vue')
  },
  {
    path: '/search',
    name:'Search',
    component:() => import('../views/SearchView.vue') 
   },
   {
    path:'/login',
    name:'Login',
    component:()=>import('../views/LoginView.vue')
   },
   {
    path:'/homerank',
    name:'HomeRank',
    component:()=>import('../views/HomeRankView.vue')
   }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})




export default router