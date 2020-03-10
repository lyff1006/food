<template>
  <div>
    <m-header title="主页" fixed></m-header>
    <ImgSlide></ImgSlide>
    <sPaper></sPaper>
    <!--<Dlist></Dlist>-->
    <div align="center" style="margin: 1rem;font-size: 1.4rem;font-weight: bold;">- 猜你喜欢 -</div>
    <Dlist2></Dlist2>
    <div style="height: 5rem"></div>
    <Popup v-show="popup_disaplay" :popup_info="popup_info" :popup_title="popup_disaplay"></Popup>
  </div>
</template>
<style type="text/css">
  .index-img{
    margin-top: 5rem;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
  }
</style>
<script>
  import mHeader from '../../components/header'
  import sPaper from '../../components/squared_paper'
  import Dlist from '../../components/discovery_list'
  import Dlist2 from '../../components/discovery_list2'
  import Popup from '../../components/popup'
  import ImgSlide from '../../components/imgslide'
  export default {
    name: 'index',
    components: {
      mHeader,
      sPaper,
      Dlist,
      Dlist2,
      Popup,
      ImgSlide,
    },
    data(){
      return{
        popup_disaplay:"",
        popup_info:"加载中。。。"
      }
    },
    created(){
      //this.popup_test();
    },
    methods:{
      popup_test:function(){
        setInterval(()=>{
          this.popup_disaplay=!this.popup_disaplay;
          console.log(this.popup_disaplay);
        },2000)
      }
    }
  }
</script>
