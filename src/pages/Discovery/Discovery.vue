<template>
  <div>
      <m-header title="发现" fixed>
      </m-header>
      <div class="main">
        <!-- <Dlist></Dlist> -->
        
        <div style="height: 3rem"></div>
        <Search v-on:display_callback="display_callback"></Search>
        <Popup v-show="popup_display" :popup_info="popup_info" :popup_title="popup_title" :popup_btn="popup_btn" v-on:display_callback_false="display_callback_false"></Popup>
      </div>
      
  </div>
</template>
<style type="text/css">
  .color-blue{
    color: #0a90ea
  }
</style>
<script>
  import mHeader from '../../components/header'
  import Dlist from '../../components/discovery_list'
  import sr from '../../components/scroll'
  import Search from '../../components/search'
  export default {
    name: 'discovery',
    components: {
      mHeader,
      Dlist,
      sr,
      Search,
    },
    data(){
      return{
        popup_display:"",
        popup_info:"",
        popup_title:"提示",
        popup_btn:true,
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
