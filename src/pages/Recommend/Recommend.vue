<template>
  	<div>
        <mHeader title="推荐" fixed back></mHeader>
        <center>
          <div style="height: 3rem"></div>
        	<scroller ref="food_list" style="position: relative;overflow:hidden;">
          	<Dlist3 v-bind:list="list"></Dlist3>
        	</scroller>
      	</center>
  	</div>
</template>
<style type="text/css">
</style>
<script>
  import mHeader from '../../components/header'
  import Dlist3 from '../../components/discovery_list3'
  export default {
    name: 'detail',
    components: {
      Dlist3,
      mHeader,
    },
    data(){
      return{
        list:[],
        search:'',
      }
    },
    created(){
      this.search=this.$route.query.search;
      this.getfoodindex1();
      console.log(this.$route.query.food_id);
    },
    methods:{
      getfoodindex1:function(){
        this.$http.get('http://food.weblyff.cn/food_recommend.php').then((response)=>{
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