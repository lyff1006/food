<template>
  <div>
      <m-header title="详情" fixed back ></m-header>
      <div class="main">
        <Fdetail></Fdetail>
        <Fcomment v-on:display_callback="display_callback"></Fcomment>
        <div style="height: 8rem"></div>
      </div>
      <Popup v-show="popup_display" :popup_info="popup_info" :popup_title="popup_title" :popup_btn="popup_btn"v-on:display_callback_false="display_callback_false"></Popup>
  </div>
</template>
<style type="text/css">
  .color-blue{
    color: #0a90ea
  }
</style>
<script>
  import mHeader from '../../components/header'
  import Fdetail from '../../components/food_detail'
  import Fcomment from '../../components/comment'
  export default {
    name: 'detail',
    components: {
      mHeader,
      Fdetail,
      Fcomment
    },
    data(){
      return{
        popup_display:"",
        popup_info:"",
        popup_title:"提示",
        popup_btn:true,
        footShow:true
      }
    },
    methods:{
      display_callback:function(text){
        this.popup_display=true;
        this.popup_info=text;
      },
      display_callback_false:function(text){
        this.popup_display=false;
        this.popup_info="";
      }
    }
  }
</script>