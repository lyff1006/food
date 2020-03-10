<template>
  <div>
      <m-header title="列表" fixed back >
      </m-header>
      <div style="overflow: hidden;">
        <div style="height: 2.5rem"></div> 
        <Fltap v-bind:list="list"></Fltap>
      </div>
      <!-- <div style="height: 100rem;background: #f00"></div> -->
      <div class="main">
          <Flmain v-bind:list="list"></Flmain>
      </div> 
  </div>
</template>
<style type="text/css">
</style>
<script>
  import mHeader from '../../components/header'
  import Flmain from '../../components/food_list_main'
  import Fltap from '../../components/food_list_tap'
  export default {
    name: 'detail',
    components: {
      mHeader,
      Fltap,
      Flmain,
      
    },
    data(){
      return{
        list:[],
      }
    },
    created(){
      this.getfoodindex();
    },
    methods:{
      getfoodindex:function(){
        var url=this.food_api+"/food_index.php";
        this.$http.get(url).then(res => {
            console.log(res.data);
            for (var i = 0; i<res.data.length; i++) {
              var ob=new Object();
              ob.list=i+1;
              ob.info=JSON.parse(res.body[i].list);
              //console.log(ob);
              this.list.push(ob);
            }
            console.log(this.list);
            
          },res => {
            console.info('发送失败！');
          });
        },
    }
  }
</script>