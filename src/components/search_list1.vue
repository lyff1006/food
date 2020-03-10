<template>
  	<div>
        <div class="main">
        	<scroller ref="food_list" style="position: relative;overflow:hidden;">
          	<Dlist3 v-bind:list="list"></Dlist3>
        	</scroller>
      	</div>
  	</div>
</template>
<style type="text/css">
</style>
<script>
  import Dlist3 from './discovery_list3'
  import Search from './search'
  export default {
    name: 'detail',
    components: {
      Dlist3,
      Search,
    },
    data(){
      return{
        list:[],
        search:'',
      }
    },
    created(){
      this.search=this.$route.query.search;
      //this.getfoodindex1();
      console.log(this.$route.query.food_id);
    },
    methods:{
      getfoodindex1:function(){
        this.$http.post('http://food.weblyff.cn/food_search.php',{search:this.search},{emulateJSON:true}).then((response)=>{
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