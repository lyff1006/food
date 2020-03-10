import Vue from 'vue'
import Router from 'vue-router'
import Index from '../pages/Index/Index'
import Discovery from '../pages/Discovery/Discovery'
import Group from '../pages/Group/Group'
import My from '../pages/My/My'
import Register from '../pages/My/Register'
import Detail from '../pages/Detail/Detail'
import Foodlist from '../pages/Foodlist/Foodlist'
import Foodlist1 from '../pages/Foodlist/Foodlist1'
import Foodvideo from '../pages/Foodvideo/Foodvideo'
import Knowledge from '../pages/Knowledge/Knowledge'
import Knowdetail from '../pages/Knowledge/Knowdetail'
import BDaudio from '../pages/BDai/BDaudio'
import BDimage from '../pages/BDai/BDimage'
import Searchlist from '../pages/Search/Searchlist'
import Recommend from '../pages/Recommend/Recommend'
import Nearby from '../pages/Nearby/Nearby'

Vue.use(Router);
mode:'hash';
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      meta:{
        keepAlive:true,
        footShow:true
      }
    },
    {
      path: '/discovery',
      name: 'Discovery',
      component: Discovery,
      meta:{
        keepAlive:true,
        footShow:true
      }
    },
    {
      path: '/group',
      name: 'Group',
      component: Group
    },
    {
      path: '/my',
      name: 'My',
      component: My,
      meta:{
        footShow:true
      }
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register,
      meta:{
        keepAlive:true,
      }
    },
    {
      path: '/detail',
      name: 'Detail',
      component: Detail,
    },
    {
      path: '/foodlist',
      name: 'Foodlist',
      component: Foodlist,
      meta:{
        keepAlive:true
      }
    },
    {
      path: '/foodlist1',
      name: 'Foodlist1',
      component: Foodlist1,
      meta:{
        keepAlive:false
      }
    },
    {
      path: '/Foodvideo',
      name: 'Foodvideo',
      component: Foodvideo,
      meta:{
        keepAlive:true
      }
    },
    {
      path: '/Knowledge',
      name: 'Knowledge',
      component: Knowledge,
    },
    {
      path: '/Knowdetail',
      name: 'Knowdetail',
      component: Knowdetail,
      meta:{
        keepAlive:false
      }
    },
    {
      path: '/BDaudio',
      name: 'BDaudio',
      component: BDaudio,
      meta:{
        keepAlive:true
      }
    },
    {
      path: '/BDimage',
      name: 'BDimage',
      component: BDimage,
      meta:{
        keepAlive:true
      }
    },
    {
      path: '/Recommend',
      name: 'Recommend',
      component: Recommend,
      meta:{
        keepAlive:true
      }
    },
    {
      path: '/Searchlist',
      name: 'Searchlist',
      component: Searchlist,
    },
    {
      path: '/Nearby',
      name: 'Nearby',
      component: Nearby,
      meta:{
        keepAlive:true
      }
    },
    {
      path: '/Index',
      redirect: '/'
    },
    {
      path: '*',
      redirect: '/'
    },
  ],
  
  scrollBehavior (to, from, savedPosition) {
    if(to.hash){
      return to.hash
    }else if (savedPosition) {
      return savedPosition
    }else {
      return { x: 0, y: 0 }
    }
  }
})
