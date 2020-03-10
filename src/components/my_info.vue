<template>
  <div>
    <div v-bind:class="{'is_hide':myinfo1}">
      <!-- <div class="my-img" align="center">
        <div class="my-img1"></div>
        <div class="my-img-box ">
          <img v-bind:src="user_img">
        </div>
      </div> -->
      <div style="height: 3rem"></div>
      <div class="my-info" style="text-align: left;">
        <div class="info">
          <img src="../assets/images/my1.png">
          <span>用户名：{{name}}</span>
        </div>
        <div class="info">
          <img src="../assets/images/my1.png">
          <span>账号：{{mail}}</span>
        </div>
        <div class="info">
          <img src="../assets/images/my1.png">
          QQ：12345678</div>
      </div>
      <div align="center" class="logout-btn" @click="user_logout">退出登录</div>
    </div>
    <div class="login":class="{'is_hide':login1}" align="center">
      <div style="height: 10rem"></div>
      <div class="login-title ">用户登录</div>
      <div align="center" class="login-body">
        <div class="login-input">账号：<input type="text" placeholder="请输入账号" ref="mail"/></div><br>
        <div class="login-input">密码：<input type="password" placeholder="请输入密码" ref="password1"/></div>
        <div class="login-btn" @click="user_login">登录</div>
        <router-link :to="'/Register'"><div class="register-btn" align="center">没有账号？注册一个</div></router-link>
      </div>
    </div> 
    <Popup v-show="popup_display" :popup_info="popup_info" :popup_title="popup_title" :popup_btn="popup_btn" v-on:display_callback_false="display_callback_false"></Popup>
  </div>
</template>
<script>
   export default{
      created(){
        this.cookie_login();
      },
      data(){
        return{
          myinfo1:true,
          login1:false,
          popup_btn:true,
          name:"",
          mail:"",
          password1:"",
          user_img:"",
          no_user_img:"http://images.weblyff.cn/bg1.jpg",
          popup_display:"",
          popup_info:"",
          popup_title:"提示"
        }
      },
      methods:{
        getback:function(){
          this.$router.back(-1);
        },
        cookie_login(){
          if(localStorage.getItem("mail")&&localStorage.getItem("password1")&&localStorage.getItem("name")){
            this.name=localStorage.getItem("name");
            this.mail=localStorage.getItem("mail");
            this.password1=localStorage.getItem("password1");
            this.user_img=localStorage.getItem("user_img");
            console.log(this.user_img);
            console.log(localStorage.getItem("name"));
            this.myinfo1=false;
            this.login1=true;
          }else{
            this.myinfo1=true;
            this.login1=false;
          }
        },
        user_login:function(){
          var mail=this.$refs.mail.value;
          var password1=this.$refs.password1.value;
          if (mail==""||!this.mail_reg(mail)) {
            this.popup_display=true;
            this.popup_info="请输入正确的邮箱账号！";
          }else{
            var url=this.food_api+"/login.php";
            this.$http.post(url,{mail:mail,password1:password1}).then(res => {
              this.List = res.body[0];
              console.log(this.List);
              if (this.List!="F") {
                console.log(this.List.name);
                /*this.setCookie("mail",this.List.mail,43200);
                this.setCookie("password1",this.List.password1,43200);
                this.setCookie("name",this.List.name,43200);
                this.setCookie("user_img",this.List.user_img,43200);*/
                localStorage.setItem('name',this.List.name);
                localStorage.setItem("mail",this.List.mail);
                localStorage.setItem("password1",this.List.password1);
                localStorage.setItem("user_img",this.List.user_img);
                this.cookie_login();

              }else{
                this.popup_display=true;
                this.popup_info="账号或者密码错误！";
              }
            },res => {
              this.popup_display=true;
              this.popup_info="好像网络出现了问题！";
            });
          }
        },
        user_logout:function(){
          localStorage.removeItem("mail");
          localStorage.removeItem("password1");
          localStorage.removeItem("name");
          localStorage.removeItem("user_img");
          this.cookie_login();
        },
        getCookie:function(name){
          var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
            if (arr = document.cookie.match(reg)){

              return unescape(arr[2]);
            }else{
              return false;
          }
        },
        display_callback:function(text){
          this.popup_display=true;
          this.popup_info=text;
        },
        display_callback_false:function(text){
          this.popup_display=false;
          this.popup_info="";
        }
      }
    }
</script>