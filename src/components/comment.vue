<template>
	<div>
		<div class="main">
			<div class="comment-title">评论</div>
			<div class="comment-body" v-for="item in comment">
				<div class="comment-body-user">
					<img v-bind:src="item.user_img">
					<span class="top_center_re">{{item.user_name}}</span>
				</div>
				<div class="comment-body-info">
					<div class="comment-body-info-text">{{item.comment_content}}</div>
					<div class="comment-body-info-time">{{item.comment_time}}</div>
				</div>
			</div>
			<div class="edit-comment">
				<div>发表评论</div>
				<textarea rows="3" cols="20" placeholder="请输入评论内容！" ref="comment"></textarea>
				<span @click="releasecomment">发表</span>
			</div>
			<div style="height: 1px;position: absolute;"></div>
		</div>
	</div>
</template>
<style type="text/css">
	.comment-title{
		color: #26a8ff;
		font-size: 1.8rem;
		margin: 0.5rem 5%;
		padding: 0.5rem 1rem;
		border-bottom: 2px dashed #26a8ff;
	}
	.comment-body{
		margin: 1rem 8%;
		padding: 0.5rem 0.8rem;
		border-bottom: 1px solid #d9d9d9;
		overflow: hidden;
	}
	.comment-body .comment-body-user img{
		width: 2rem;
		height: 2rem;
		border-radius: 50%;
		overflow: hidden;
	}
	.comment-body .comment-body-user span{
		display: inline-block;
		font-size: 1.2rem;
		vertical-align: middle;
	}
	.comment-body-info-text{
		text-indent: 2em;
		word-break:keep-all;
		word-wrap:break-word;
		color: #999;
		overflow: hidden;
	}
	.comment-body-info-time{
		margin-top: 0.8rem;
		font-size: 0.8rem;
		text-align: right;
		color: #999;
	}
	.edit-comment{
		margin: 1rem 8%;
		overflow: hidden;
	}
	.edit-comment div{
		margin: 0.5rem 0;
		font-size: 1.2rem;
		padding: 0 0.4rem;
	}
	.edit-comment textarea{
		width: 100%;
		box-sizing: border-box;
		outline: none;
		padding: 0.6rem 0.8rem;
		color: #999;
		border: #26a8ff 1px solid;
		resize:none;
	}
	.edit-comment span{
		float: right;
		background: #26a8ff;
		color: #fff;
		cursor: pointer;
		margin: 0.5rem 0;
		padding: 0.3rem 0.8rem;

	}
</style>
<script type="text/javascript">
	export default{
		name:'food_data',
		data(){
			return{
				comment:[],
				popup_display:"",
		        popup_info:"",
		        popup_title:"提示"
			}
		},
		created(){
			console.log(this.$route.query.food_id);
	      	this.showcomment();
	    },
	    methods:{
	    	popup_timeout:function(text){
	    		this.popup_display=true;
		        this.popup_info=text;
		        
		        var that=this;
		        setTimeout(function(){
		            that.popup_display=false;
		        },1000)
	    	},
	      	showcomment(){                       
	        	this.$http.post('http://food.weblyff.cn/food_comment_look.php',{food_id:this.$route.query.food_id},{emulateJSON:true}).then((response)=>{
		        	//console.log(response.body);
		        	if(response.body!="null"&&response.body!="error"){
		        		
		        		this.comment=response.body;
		        		for(var i=0;i<response.body.length;i++){
		        			this.comment[i].comment_time=this.goodTime(response.body[i].comment_time);
		        			if(this.comment[i].user_img==""||this.comment[i].user_img==null){
		        				this.comment[i].user_img="http://www.weblyff.cn/img/bg1.jpg";
		        			}
		        		}
		        		console.log(this.comment);
		        	}
		        })
	        },
	        releasecomment(){
	        	let mail=localStorage.getItem("mail");
	        	let name=localStorage.getItem("name");
	        	let user_img=localStorage.getItem("user_img");
	        	let comment=this.$refs.comment.value;
	        	//console.log(mail+comment);
	        	console.log(name);
	        	if(mail){
	        		if(comment==""||comment==null){
	        			this.$emit('display_callback', "请输入评论内容！");
	        		}else{
	        			var url=this.food_api+"/food_comment_storage.php"
		        		this.$http.post(url,{food_id:this.$route.query.food_id,mail:mail,comment:comment,name:name,user_img:user_img}).then((response)=>{
				        	console.log(response.body);
				        	if(response.body!="null"&&response.body!="error"){
				        		//this.comment=response.body;
				        		//console.log(this.comment);
				        		this.showcomment();
				        	}
				        }).catch((response)=>{
				        	this.$emit('display_callback', "评论失败");
				        })
	        		}	
	        	}else{
	        		this.$emit('display_callback', "请登录后再评论！")
	        	}
	        },
			goodTime(str){
				var now = new Date().getTime(),
				oldTime = new Date(str).getTime(),
				difference = now - oldTime,
				result='',
				minute = 1000 * 60,
				hour = minute * 60,
				day = hour * 24,
				halfamonth = day * 15,
				month = day * 30,
				year = month * 12,

				_year = difference/year,
				_month =difference/month,
				_week =difference/(7*day),
				_day =difference/day,
				_hour =difference/hour,
				_min =difference/minute;
				if(_year>=1) {result= "发布于 " + ~~(_year) + " 年前"}
				else if(_month>=1) {result= "发布于 " + ~~(_month) + " 个月前"}
				else if(_week>=1) {result= "发布于 " + ~~(_week) + " 周前"}
				else if(_day>=1) {result= "发布于 " + ~~(_day) +" 天前"}
				else if(_hour>=1) {result= "发布于 " + ~~(_hour) +" 个小时前"}
				else if(_min>=1) {result= "发布于 " + ~~(_min) +" 分钟前"}
				else result="刚刚发布";
				return result;
			},
	    }
	    
	}
</script>