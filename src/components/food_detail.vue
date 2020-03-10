<template>
	<center style="text-align: left;">
		<div class="food-img">
			<img v-bind:src='food_image'>
		</div>
		<!-- <div class="food_button" align="right">
			<div style="display: inline-block;background: #26a8ff;color: #fff">收藏</div>
			<div style="display: inline-block;background: #26a8ff;color: #fff" @click="translate">翻译</div>
		</div> -->
		<div class="list1-list">
			<div class="list1-food-title">{{food_name}}</div>
			<div v-if="food_abstract!=''">
				<div class="list1-title">
					<img src="../assets/images/home2.png">
					<span>介绍</span>
				</div>
				<div class="tips-text"></div>
				<div class="list1-info1">
					<fieldset>
						<legend>{{food_name}}</legend>
						<ul>
							<li style="list-style: none;">{{food_abstract}}</li>
						</ul>
					</fieldset>
				</div>
				
			</div>
			
			<div class="list1-title">
				<img src="../assets/images/home2.png" :onerror="this.src='http://www.weblyff.cn/img/no_img.jpg'">
				<span>食材明细</span>
			</div>
			<div class="list1-info1">
				<fieldset>
					<legend>主料</legend>
					<ul v-for="material in main_material">
						<li>{{material[0]}}<span>{{material[1]}}</span></li>
					</ul>
				</fieldset>
				<fieldset>
					<legend>辅料</legend>
					<ul v-for="material in sup_material">
						<li>{{material[0]}}<span>{{material[1]}}</span></li>
					</ul>
				</fieldset>
				<!--<fieldset>
					<ul>
						<li>甜味<span>口味</span></li>
						<li>烤<span>工艺</span></li>
						<li>20分钟<span>耗时</span></li>
					</ul>
				</fieldset>-->
			</div>
			
			<div class="list1-title">
				<img src="../assets/images/home2.png">
				<span>做法步骤</span>
			</div>
			<div class="list1-info2" v-for="item in food_step" style="box-sizing: border-box;">
				<img v-lazy='item[1]'>
				<div>
					<!--<div class="step-num">1</div>-->
					<div class="step-text">{{item[0]}}</div>
				</div>
			</div>
			<div class="list1-title">
				<img src="../assets/images/home2.png">
				<span>提示</span>
			</div>
			<div class="tips-text">{{food_tips}}</div>
			
			<!--<div class="tag">
				<ul>
					<li>烘培</li>
					<li>高颜值</li>
					<li>下午茶</li>
				</ul>
			</div>-->
		</div>
	</center>
	
</template>
<style type="text/css">
	.food-img{
		height: 20rem;
		overflow: hidden;
		line-height: 20rem;
	}
	.food-img img{
	    margin-top: 1rem;
	    width: 100%;
	    background-color: #fff;
	    vertical-align: middle;
	}
	.list1-food-title{
		color: #26a8ff;
		text-align: center;
		font-size: 2rem;
		margin-bottom: 1rem;
	}
	.list1-list{
		overflow: hidden;
		margin: 2rem;
	}
	.list1-title {
		overflow: hidden;
		margin-bottom: 1rem;
	}
	.list1-title img{
		width: 1.5rem;
		height: 1.5rem;
		float: left;
	}
	.list1-title span{
		color: #26a8ff;
		font-size: 1.2rem;
	}
	.list1-info1 fieldset{
		border: 1px solid #ddd;
		border-radius: 10px;
		padding: 1rem 2rem;
		color: #606060;
		margin: 1rem 0rem;
	}
	.list1-info1 legend{
		padding: 0rem 1rem;
		font-size: 1.2rem
	}
	.list1-info1 span{
		margin: 0rem 1rem;
		font-size: 0.7rem;
		color: #8c8c8c;
	}
	.list1-info2{
		overflow: hidden;
		margin-bottom: 0.5rem;
		padding: 8px;
		border-bottom: 1px solid #d9d9d9;
		box-sizing: border-box;
		-webkit-box-sizing: border-box;
	}
	.list1-info2 img{
		float: left;
		padding-right:5px; 
		box-sizing: border-box;
		width: 100%;
	}
	.step-text{
		color: #8c8c8c;
		float: left;
		text-indent: 2em;
	}
	.step-num{
		width: 1.2rem;
		height: 1.2rem;
		border-radius: 50%;
		background-color: #26a8ff;
		text-align: center;
		color: #fff;
		float: left;
	}
	.tips-text{
		color: #8c8c8c;
	}
	.tag li{
		border: 1px solid #26a8ff;
		border-radius: 5px;
		float: left;
		padding: 3px 10px;
		list-style: none;
		margin: 5px;
		color: #26a8ff;
	}
</style>
<script type="text/javascript">
	export default{
		name:'food_data',
		data(){
			return{
				food_abstract:"",
				main_material:[],
				sup_material:[],
				food_image:"",
				food_name:"",
				food_step:[],
				food_tips:"",
				food:{},
				food_jsonlist:{},
				food_translate:{},
			}
		},
		created(){
			console.log(this.$route.query.food_id);
	      	this.fetchData();
	    },
	    methods:{
	      	fetchData(){                       
	        	this.$http.post('http://food.weblyff.cn/food_detail.php',{food_id:this.$route.query.food_id},{emulateJSON:true}).then((response)=>{
		        	console.log(response.body);
	        		var food_0=JSON.parse(response.body[0].food);
	        		this.food_jsonlist=food_0;
	        		this.main_material=food_0.main_material;
	        		this.sup_material=food_0.sup_material;
	        		this.food_abstract=food_0.food_abstract;
	        		this.food_image=food_0.food_image;
	        		this.food_name=food_0.food_name;
	        		this.food_step=food_0.food_step;
	        		this.food_tips=food_0.food_tips;
	        		//this.food=food_0;
	        		console.log(food_0);
		        		/*for (var i = response.body.length - 1; i >= 0; i--) {
		        			var food=JSON.parse(response.body[i].food);
		        			console.log(food);
		        		}*/
	        	})
	        },
	        /*translate:function(){
	        	console.log(this.food_jsonlist);
	        	this.$http.post('http://php.weblyff.cn/bdai/translate/index.php',{food_id:this.$route.query.food_id},{emulateJSON:true}).then((response)=>{
	        		//console.log(response.body);
	        		this.food_translate=response.body;
	        		var res=JSON.parse(this.food_translate)
					var y = res.replace(/" and \"/g,'" , \"');//'xbcdx'
					y=y.replace(/"], and \[\"/g,'" , \"');
					console.log(y);
	        	})
	        },*/
	    }
	    
	}

    
    
</script>