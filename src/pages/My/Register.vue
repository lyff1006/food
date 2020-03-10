<template>
	<div class="main">
		<m-header title="注册" fixed back></m-header>
		<div style="height: 3rem"></div>
		<div>
			<div class="register-title">注册</div>
			<div class="register-input">
				<span>邮 箱：</span><input type="text" placeholder="请输入邮箱" ref="mail"/></br>
				<span>昵 称：</span><input type="text" placeholder="请输入昵称" ref="name"/></br>
          		<span>密 码：</span><input type="password" placeholder="请输入密码" ref="password1"/></br>
          		<span>确认密码：</span><input type="password" placeholder="再次输入密码" ref="password2"/></br>
          		<span>验证码：</span><input type="text" placeholder="请输入验证码" ref="codeid"/></br>
			</div>
			<div>
				<div class="reg-btn" @click="get_codeid">获取验证码</div>
				<div class="reg-btn" @click="register_func">注册</div>
			</div>
		</div>
		<Popup v-show="popup_display" :popup_info="popup_info" :popup_title="popup_title" :popup_btn="popup_btn" v-on:display_callback_false="display_callback_false"></Popup>
	</div>
</template>
<script>
  	import mHeader from '../../components/header'
  	export default {
	    name: 'register',
	    components: {
	      mHeader,
	    },
	    data(){
	    	return {
	    		popup_display:"",
	            popup_info:"",
	            popup_title:"提示",
	            popup_btn:true,
	    	}
	    },
	    methods:{
	    	get_codeid:function(){
	    		var mail=this.$refs.mail.value;
	    		var reg = new RegExp("^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$"); //正则表达式
	    		var that=this;
	    		if(mail==""||!that.mail_reg(mail)){
	    			that.popup_display=true;
              		that.popup_info="请输入正确的邮箱！";
	    		}else{
    				var url=that.mail_api+"reg_qq.php";
    				/*let param = new URLSearchParams()
					param.append('mail', '821760648@qq.com');
					for(let p of param){
						console.log(p)
					}*/
		    		that.$http.post(url,{mail:mail},{emulateJSON:true}).then((res) => {
				      console.log(res)
				      alert(res.data['data_info']);
				      if(res.data['code_id']!=null&&res.data['mail']!=null){
				      	console.log(res.data['code_id']);
				      	that.setCookie("code_id",res.data['code_id'],5);
				      	that.setCookie("mail",res.data['mail'],5);
				      	console.log(that.getCookie("code_id"));
				      	console.log(that.getCookie("mail"));
				      }
				    }).catch(res=>{
				    	that.popup_display=true;
              			that.popup_info="好像网络出现了问题！";
				    })

	    		}
	    	},
	    	register_func:function(){
	    		var mail=this.$refs.mail.value;
	    		var name=this.$refs.name.value;
	    		var password1=this.$refs.password1.value;
	    		var password2=this.$refs.password2.value;
	    		var codeid=this.$refs.codeid.value;
	    		//console.log(this.getCookie("code_id"));
	    		if (mail==""||!this.mail_reg(mail)) {
	    			this.popup_display=true;
              		this.popup_info="请输入正确的邮箱！";
	    		}else if(name==""||!this.chinese_reg(name,4,10)){
	    			this.popup_display=true;
              		this.popup_info="请输入4-10位的中文昵称！";
	    		}else if(password1==""||!this.word_num_reg(password1,6,16)){
	    			this.popup_display=true;
              		this.popup_info="请输入6-16位的密码！";
	    		}else if(password2==""){
	    			this.popup_display=true;
              		this.popup_info="请确认密码！";
	    		}else if(codeid==""){
	    			this.popup_display=true;
              		this.popup_info="请输入验证码！";
	    		}else{
	    			if (password1!=password2) {
	    				this.popup_display=true;
              			this.popup_info="两次密码不一致！";
	    			}else if(codeid!=this.getCookie("code_id")[2]||mail!=this.getCookie("mail")[2]){
	    				this.popup_display=true;
              			this.popup_info="验证码错误！";
	    			}else{
	    				var url=this.food_api+"/register.php";
	    				this.$http.post(url,{mail:mail,name:name,password1:password1},{emulateJSON:true}).then(res => {
					      this.List = res.data;
					      alert(res.data);
					    }).catch(res=>{
					    	this.popup_display=true;
	              			this.popup_info="好像网络出现了问题！";
					    })
	    			}
	    		}
	    	},
	    	
   			created:function(){
			 	this.setCookie('openId',123,2)
			   	if (this.getCookie('openId')) {
			   		console.log('has cookie')
			  		this.delCookie ('openId')
			   	}else{
			   	console.log('has not cookie')
			   	}
			},
			display_callback_false:function(text){
		        this.popup_display=false;
		        this.popup_info="";
		    }
	    }
	}
</script>