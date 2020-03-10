<template>
  <div>
      <m-header title="列表" fixed back >
      </m-header> 
      <div>
        <div style="height: 2.5rem"></div>
        <div class="main">
          <scroller ref="food_list" style="position: relative;overflow:hidden;">
            <Dlist3 v-bind:list="list"></Dlist3>
          </scroller>
        </div> 
      </div>
  </div>
</template>
<style type="text/css">
</style>
<script>
  import mHeader from '../../components/header'
  import Flmain from '../../components/food_list_main'
  import Fltap from '../../components/food_list_tap'
  import Dlist3 from '../../components/discovery_list3'
  export default {
    name: 'detail',
    components: {
      mHeader,
      Fltap,
      Flmain,
      Dlist3,
    },
    data(){
      return{
        list:[],
      }
    },
    created(){
      this.getfoodindex1();
      console.log(this.$route.query.food_id);

    },
    methods:{
      getfoodindex1:function(){
        this.$http.post('http://food.weblyff.cn/food_index1.php',{food_id:this.$route.query.food_id},{emulateJSON:true}).then((response)=>{
        this.list=response.body;
        console.log(this.list);
        })
      },
      refresh (done) {
        setTimeout(() => {
            this.items= new Array();
            this.getfoodindex1();
            done();

        }, 1500)
      },

      /*infinite (done) {
        setTimeout(() => {
            this.getfoodindex1();
            done()
        }, 1500)
      },*/
    }
  }
</script>