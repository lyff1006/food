<template>
	<div>
		<center class="squared-paper">
			<router-link v-for="(item,index) in iconArray1" :to="{path:item.path}" :key="index">
				<div class="sp-list" align="center">
					<div class="sp-list-one" style="position: relative;left: 50%;margin-left: -1.75rem ">
						<img v-bind:src="item.img">
					</div>
					<span class="sp-list-font">{{item.name}}</span>
				</div>
			</router-link>
		</center>
		<center class="squared-paper">
			<router-link v-for="(item,index) in iconArray2" :to="{path:item.path}" :key="index">
				<div class="sp-list" style="position: relative;">
					<center class="sp-list-one ">
						<img v-bind:src="item.img">
					</center>
					<span class="sp-list-font">{{item.name}}</span>
				</div>
			</router-link>
		</center>
		<!-- <div class="squared-paper main">
			<router-link :to="'/Bdimage'"><div class="sp-list"><div class="sp-list-one left_center_re" ></div><span class="sp-list-font">图片识别</span></div></router-link>
			<router-link :to="'/Bdaudio'"><div class="sp-list"><div class="sp-list-one left_center_re" ></div><span class="sp-list-font">语音识别</span></div></router-link>
			<router-link :to="'/Nearby'"><div class="sp-list"><div class="sp-list-one left_center_re" ></div><span class="sp-list-font">附近美食</span></div></router-link>
			<router-link :to="'/Knowledge'"><div class="sp-list"><div class="sp-list-one left_center_re" ></div><span class="sp-list-font" >新闻常识</span></div></router-link>
			
		</div> -->
	</div>
</template>
<script>
export default {
  data () {
    return {
      iconArray1:[
        {img:'http://images.weblyff.cn/分类.png',name:"分类",path:"Foodlist"},
        {img:'http://images.weblyff.cn/推荐.png',name:"推荐",path:"Recommend"},
        {img:'http://images.weblyff.cn/新闻.png',name:"新闻常识",path:"Knowledge"},
        {img:'http://images.weblyff.cn/放大镜.png',name:"图片识别",path:"Bdimage"},
       /* {img:'http://images.weblyff.cn/视频.png',name:"视频",path:"Foodvideo"},
        {img:'http://images.weblyff.cn/最新.png',name:"最新",path:""},*/
      ],
      iconArray2:[

        /*{img:'http://images.weblyff.cn/语音.png',name:"语音识别",path:"Bdaudio"},
        {img:'http://images.weblyff.cn/餐厅.png',name:"附近美食",path:"Nearby"},*/
      ],
    }
  },
}
</script>