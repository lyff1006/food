<template>
  <div id="app">
    <keep-alive> 
      <router-view v-if="$route.meta.keepAlive"></router-view> 
    </keep-alive> 
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    <div v-show="footShow">
      <m-tabbar v-model="select" v-if="$route.meta.footShow" >
       <m-tabbar-item id='Index' isRouter>
          <img src="./assets/images/home1.png" alt="" slot="icon-normal"> 
          <img src="./assets/images/home2.png" alt="" slot="icon-active"> 
          首页
        </m-tabbar-item>
        <m-tabbar-item id='Discovery' isRouter>
          <img src="./assets/images/discovery1.png" alt="" slot="icon-normal"> 
          <img src="./assets/images/discovery2.png" alt="" slot="icon-active"> 
          发现
        </m-tabbar-item>
         <m-tabbar-item id='My' isRouter>
          <img src="./assets/images/my1.png" alt="" slot="icon-normal"> 
          <img src="./assets/images/my2.png" alt="" slot="icon-active"> 
          我的
        </m-tabbar-item>
      </m-tabbar>
    </div>
  </div>
</template>

<script>
import mTabbar from './components/tabbar'
import mTabbarItem from './components/tabbar-item'
export default {
  name: 'app',
  components:{
    mTabbar,
    mTabbarItem
  },
  data() {
    return {
      select:"Index",
      footShow:true,
      oHeight:0
    }
  },
  created(){
    //this.deviceTest();
    this.oHeight=document.documentElement.clientHeight;
  },
  mounted(){
    this.select=this.$route.name;
    let that=this;
    window.onresize=function(){
      let clientHeight = document.documentElement.clientHeight; //屏幕当前的高度
      if(clientHeight < that.oHeight){
        //this.footShow=false;
        that.$set(that,'footShow',false);
      }else{
        //this.footShow=true;
        that.$set(that,'footShow',true);
      }
    }
  },
  methods:{
    deviceTest(){
      var sUserAgent = navigator.userAgent.toLowerCase();
      var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
      var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
      var bIsMidp = sUserAgent.match(/midp/i) == "midp";
      var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
      var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
      var bIsAndroid = sUserAgent.match(/android/i) == "android";
      var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
      var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
      if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
        //window.location.href = "http://food.weblyff.cn/index_phone.html";
      }else{
        window.location.href = "http://food.weblyff.cn/index_pc.html";
      }
    }
  }
}
</script>

<style>

</style>
