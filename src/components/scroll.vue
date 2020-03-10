<template>
  <div >
    <div class="header">
      <h1 class="title">Refresh & Infinite</h1>
    </div>

    <scroller style="top: 44px"
      :on-refresh="refresh"
      :on-infinite="infinite">
      <div v-for="(item, index) in items" class="row" :class="{'grey-bg': index % 2 == 0}">
        {{ item.food_name }}
      </div>
    </scroller>
  </div>
</template>
<style>
  html, body {
    margin: 0;
  }
  * {
    box-sizing: border-box;
  }
  .row {
    width: 100%;
    height: 50px;
    padding: 10px 0;
    font-size: 16px;
    line-height: 30px;
    text-align: center;
    color: #444;
    background-color: #fff;
  }
  .grey-bg {
    background-color: #eee;
  }
  .header {
    position: fixed;
    top: 0;
    left: 0;
    height: 44px;
    width: 100%;
    box-shadow: 0 2px 10px 0 rgba(0,0,0,0.1);
    background-color: #fff;
    z-index: 1000;
    color: #666;
  }
  .header > .title {
    font-size: 16px;
    line-height: 44px;
    text-align: center;
    margin: 0 auto;
  }
</style>
<script>

  export default {
    data() {
      return {
        items: [],
        food_body:[],
        food_body_length:0,
        clean_items:[],
      }
    },
    mounted() {
      
    	this.fetchData();
      this.top = 1
      this.bottom = 10
    },

    methods: {
      fetchData:function(){                       
        this.$http.get('http://food.weblyff.cn/food_test.php').then((response)=>{
          this.food_body=response.body;
          this.food_body_length=this.food_body.length
          console.log(this.food_body_length);
          console.log(this.food_body)
          for (var i = 0; i <= this.food_body_length-1; i++) {
            this.items.push(this.food_body[i]);
          }
        })
      },
      refresh (done) {
        setTimeout(() => {
          this.items= new Array();
          this.fetchData();
          done()
        }, 1000)
      },

      infinite (done) {
        setTimeout(() => {
          this.fetchData();
          done()
        }, 1000)
      },
      
    }
  }
</script>
