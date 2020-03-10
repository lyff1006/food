<template>
	<div>
		<div class="img-slide" v-on:mouseover="stop()" v-on:mouseout="move()">
		    <div class="img-slidebox">
		      <transition-group tag="ul" name="image">
		        <li class="everl-img" v-for="(img, index) in imgArray" v-show="index===mark" :key="index">
		          <a href="#">
		            <img width="100%" :src='img'>
		          </a>
		        </li>
		      </transition-group>
		    </div>
		    <div class="bar">
		      <span v-for="(item, index) in imgArray" :class="{ 'img-active':index===mark, 'img-no-active':index!==mark}" :key="index" @click="change(index)"></span>
		    </div>
        <div class="bar-left" @click="last()"><</div>
        <div class="bar-right" @click="next()">></div>
	  	</div>
	  	<div style="height: 2rem"></div>
	</div>
</template>
<style scoped="scoped">
  .img-slide {
    width: 100%;
    height: 250px;
    margin: 0 auto;
    margin-top: 40px;
    overflow: hidden;
    position: relative;
    box-shadow: 0 2px 3px #999;
  }
  .img-slidebox {
    width: 100%;
    height: 250px;
  }
  .img-slidebox li ul a img{
  	width: 100%;
  }
  .img-slidebox li {
    position: absolute;
  }
  .everl-img{
  	width: 100%;
  	display: inline-block;
  }
  .bar {
    position: absolute;
    width: 100%;
    bottom: 0;
    height: 28px;
    margin: 0 auto;
    z-index: 1;
    text-align: center;
  }
  .bar span {
    width: 40px;
    height: 4px;
    background: white;
    display: inline-block;
    margin-right: 10px;
  }
  .img-active{
  	background: linear-gradient(to right,#26a8ff,#00E5EE) !important;
  }
  .img-no-active{
  	background: #999 !important;
  }
  .bar-left{
    position: absolute;
    color: #fff;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    background: #000;
    opacity: 0.6;
    padding: 0.5rem;
    display: table-cell;
    vertical-align: middle;
    text-align: center;
  }
  .bar-right{
    position: absolute;
    color: #fff;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    background: #000;
    opacity: 0.6;
    padding: 0.5rem;
    display: table-cell;
    vertical-align: middle;
    text-align: center;
  }





  .image-enter-active {
    transform: translateX(0);
    transition:  1s ease;
  }
  .image-leave-active {
    transform: translateX(-100%);
    transition:  1s ease;
  }
  .image-enter {
    transform: translateX(100%);
  }
  .image-leave {
    transform: translateX(0);
  }

</style>
<script>
export default {
  data () {
    return {
      timer: null, //定时器
      mark: 0, //比对图片索引的变量
      imgArray: [
        'http://images.weblyff.cn/food1.jpg',
        'http://images.weblyff.cn/food2.jpg',
        'http://images.weblyff.cn/food3.jpg',
        'http://images.weblyff.cn/food4.jpg',
      ]
    }
  },
  methods: {
    next () {
      this.mark++;
      if (this.mark === this.imgArray.length) {
        this.mark = 0
      }
    },
    last(){
      this.mark--;
      if (this.mark === -1) {
        this.mark = this.imgArray.length-1
      }
    },
    play () {
      this.timer = setInterval(this.next, 4500)
    },
    change (i) {
      this.mark = i
    },
    stop () {
      clearInterval(this.timer)
    },
    move () {
      this.timer = setInterval(this.next, 4500)
    },
  },
  created () {
    this.play()
  }
}
</script>