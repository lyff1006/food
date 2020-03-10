<template>
	<div class="Dlist main">
		<div class="list1">
			<div style="overflow: hidden;">
				<img src="../assets/images/bg1.jpg">
				<img src="../assets/images/bg1.jpg">
				<img src="../assets/images/bg1.jpg">
			</div>
			<div>
				<div v-if="taps" class="list-tag">
					精品
				</div>
				<div class="list-text">
					美好的一天从早餐开始！！！！！！！！！！！！！！！！！！！！！！！！！！！！
				</div>
			</div>
		</div>
		<div class="list1">
			<div style="overflow: hidden;">
				<img src="../assets/images/bg1.jpg">
				<img src="../assets/images/bg1.jpg">
				<img src="../assets/images/bg1.jpg">
			</div>
			<div>
				<div class="list-tag">
					精品
				</div>
				<div class="list-text">
					美好的一天从早餐开始！！！！！！！！！！！！！！！！！！！！！！！！！！！！
				</div>
			</div>
		</div>
		<button @click="changeData">改变</button>
		<a href="https://v.youku.com/v_show/id_XMjk4NDA3MzM0NA==.html?spm=a2h0k.11417342.soresults.dtitle&s=45ef4dabbde711e69e06">美食台</a>
	</div>
</template>
<style type="text/css">
	.Dlist{
		margin-top: 4rem;
		box-sizing: border-box;
		-webkit-box-sizing: border-box;
	}
	.Dlist .list1{
		box-sizing: border-box;
		-webkit-box-sizing: border-box;
		margin: 0.6rem 0.6rem;
		border-bottom: 1px solid #d9d9d9
	}
	.Dlist .list1 img{
		float: left;
		box-sizing: border-box;
		-webkit-box-sizing: border-box;
		width: 33.33%;
		padding: 0px 0.2rem;
	}
	.Dlist .list1 .list-tag{
		color: #fff;
		background-color: #ff9900;
		border-radius: 5px;
		padding: 2px 10px;
		margin: 2px 0px;
		float: left;
		font-size: 0.6rem;
	}
	.Dlist .list1 .list-text{
		margin: 2px 0px;
		padding: 3px 10px;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
</style>
<script type="text/javascript">
	export default{
		name:'news',
		data(){
			return{
				taps:false,
			}
		},
	    methods:{
		    changeData(){
		    	this.taps=!this.taps;
		    }
	    }
	}
</script>