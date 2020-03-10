<template>
  <div>
      <m-header v-bind="{'title':title}" fixed back >
      </m-header>
      <div class="main">
      	<div style="height: 3rem"></div>
        <div style="width: 100%" class="artical">
          <div style="white-space: pre-wrap;word-wrap: break-word;" v-html="artical"></div>
        </div>
        <div style="height: 3rem"></div>
      </div>
      <div class="know-suspend" align="right" >
        <div class="blue_btn" @click="collect">收藏</div><br>
        <div class="blue_btn" style="margin-top: 0.8rem" @click="translate">翻译</div>
      </div>
      <Popup v-show="popup_display" :popup_info="popup_info" :popup_title="popup_title" :popup_btn="popup_btn" v-on:display_callback_false="display_callback_false"></Popup>
  </div>
</template>
<script>
  import mHeader from '../../components/header'
  import Klist from '../../components/know_list'
  export default {
    name: 'kdetail',
    components: {
      mHeader,
      Klist,
    },
    created(){
      console.log(this.$route.query.artical);
      this.artical=this.$route.query.artical;
      this.title=this.$route.query.title;
    },
    data(){
      return{
        artical:"",
        title:"",
        popup_display:"",
        popup_info:"",
        popup_title:"提示",
        popup_btn:false
      }
    },
    methods:{
      translate:async function(){
        this.popup_display=true;
        this.popup_info="翻译中，请稍后！";
        let res = await this.$http.post('http://php.weblyff.cn/bdai/translate/index1.php',{title:this.$route.query.title},{emulateJSON:true}).then((response)=>{
          console.log(response.body);
          var true_translate1;
          var translate_title=response.body[0].dst;
          translate_title = translate_title.replace('Title=','');
          translate_title = translate_title.replace('Title =','');
          this.title=translate_title;
          return response.data
        })
        console.log(res,this.$route.query.artical)
        //console.log(this.food_jsonlist);
        this.$http.post('http://php.weblyff.cn/bdai/translate/index1.php',{artical:this.$route.query.artical},{emulateJSON:true}).then((response)=>{
          console.log(response);
          //this.food_translate=response.body;
          //var translate_artical=response.body[0].dst;
          //translate_artical = translate_artical.replace('Artical=','');
          var true_translate;
          for (var i =0;i<response.body.length - 1; i++) {
            var translate_artical=response.body[i].dst;
            if(i==0){
              translate_artical = translate_artical.replace('Artical=','');
              translate_artical = translate_artical.replace('Artical =','');
              //this.title=translate_artical;
            }
            if(true_translate==null){
              true_translate=translate_artical+" \n ";
            }else{
              true_translate=true_translate+translate_artical+" \n ";
            }
          }
          this.artical=true_translate;
          //y=y.replace(/"], and \[\"/g,'" , \"');
          this.popup_display=false;
          console.log(true_translate);
          console.log(this.artical);
        })
      },
      collect:function(){
        console.log(this.$route.query.id);
        let mail=localStorage.getItem("mail");
        if(mail){
          this.popup_display=true;
          this.popup_btn=false;
          this.popup_info="正在加入收藏，请稍后！";
            this.$http.post('http://food.weblyff.cn/collect_storage.php',{know_id:this.$route.query.id,know_title:this.$route.query.title,mail:mail},{emulateJSON:true}).then((response)=>{
              console.log(response);
              if (response.body=="新记录插入成功") {
                this.popup_display=true;
                this.popup_btn=true;
                this.popup_info="收藏成功！";
              }else{
                this.popup_display=true;
                this.popup_btn=true;
                this.popup_info="已收藏！";
              }
            }).catch((response)=>{
              this.popup_display=true;
              this.popup_btn=true;
              this.popup_info="网络好像断开了哦！";
           })
        }else{
          this.popup_display=true;
          this.popup_btn=true;
          this.popup_info="请登录后再收藏！";
          /*var that=this;
          setTimeout(function(){
            that.popup_display=false;
          },1000)*/
        }
      },
      display_callback_false:function(text){
        this.popup_display=false;
        this.popup_info="";
      }
    },
  }
</script>