<template>
	<center>
		<mHeader title="图片识别" fixed back></mHeader>
		<div>
			<div style="height: 4rem"></div>
			<div class="shoot-image ">
				<span><img v-bind:src="img_src"></span>
			</div>
			<div>
				<div align="center">
					<form class="img-file" ref="photo_form" enctype="multipart/form-data">
						<input type="file" name="photo" value="" accept="image/*" ref="photo" @change="getFile($event)"/>更换图片
					</form>
				</div>
				<div>
					<div class="shoot-imgbtn" @click="submit">识别图片</div>
				</div>
			</div>
			<div style="height: 3rem"></div>
			<div class="shoot-result">
				<div class="shoot-result-text">识别结果</div>
				<div class="shoot-result-text1">以下是可信度最高的<span>{{list_length}}</span>条结果</div>
				<div class="shoot-result-body" v-for="item in list">
					<div class="shoot-result-info">
						<div class="shoot-result-title">{{item.food_name}}</div>
						<div class="shoot-result-confidence">可信度：{{(Number(item.food_probability).toFixed(3)*100).toFixed(1)}}%</div>
						<router-link :to="{path:'/Searchlist', query:{search:item.food_name}}">
							<span class="shoot-result-search">搜索</span>
						</router-link>
					</div>
					<div v-if="item.food_description!=null" class="shoot-result-description">
						{{item.food_description}}
					</div>
					<div v-else class="shoot-result-description">
						暂无介绍！
					</div>
				</div>
			</div>
			<div style="height: 5rem"></div>
		</div>
		<Popup v-show="popup_display" :popup_info="popup_info" :popup_title="popup_title" :popup_btn="popup_btn" v-on:display_callback_false="display_callback_false"></Popup>
	</center>
	
</template>
<script>
  import mHeader from '../../components/header'
  export default {
    name: 'BDimage',
    components: {
      mHeader,
    },
    data(){
      return{
        list:[],
        list_length:0,
        img_src:"static/images/error.jpg",
        popup_display:"",
        popup_info:"",
        popup_title:"提示",
        popup_btn:false
      }
    },
    created(){
      //this.getBDimage();
    },
    methods:{
      	getBDimage:function(){
        	var url=this.bdai_api+"/image/img.php";
			this.$http.get(url).then(res => {
		      	this.list_length=res.data.length;
		      	console.log(this.list_length);
		      	for (var i = 0; i <= this.list_length-1; i++) {
	            	this.list.push(res.data[i]);
	          	}
	          	console.log(this.list);
		    },res => {
		      	console.info('发送失败！');
		    });
      	},
      	image_submit:function(){
            var form=this.$refs.photo_form;
            console.log(form);
            var formData=new FormData(form);
            console.log(formData)
            var oReq = new XMLHttpRequest();
            oReq.onreadystatechange=function(){
              if(oReq.readyState==4){
                if(oReq.status==200){
                    var res=JSON.parse(oReq.responseText);
                    console.log(res);
                }
              }
            }
            oReq.open("POST", this.bdai_api+"/image/images/uplodeimages.php");
            oReq.send(formData); 
            return false;
        } ,
        getFile(event) {
			this.file = event.target.files[0];
		  	console.log(this.file);
		  	var URL = window.URL || window.webkitURL;
	        // 通过 file 生成目标 url
	        var imgURL = URL.createObjectURL(this.file);
	        this.img_src=imgURL;
		},
		submit(event) {
		  	event.preventDefault();//取消默认行为
		  	//创建 formData 对象
		  	let formData = new FormData();
		  	// 向 formData 对象中添加文件
		  	formData.append('file',this.file);
        	var url=this.bdai_api+"/image/images/uplodeimages.php";
        	this.popup_display=true;
        	this.popup_btn=false;
        	this.popup_info="智能识别中，请稍后！";
		  	this.axios.post(url,formData,{headers:{"Content-Type": "multipart/form-data"}})
		  	.then(res => {
		  		this.list=new Array();
		  		if(res.data[0].food_name=="非菜"){
		  			this.popup_display=true;
		  			this.popup_btn=true;
        			this.popup_info="请不要上传非菜品图片！";
		  		}else{
		  			this.list_length=res.data.length;
			      	console.log(this.list_length);
			      	for (var i = 0; i <= this.list_length-1; i++) {
		            	this.list.push(res.data[i]);
		          	}
		          	console.log(this.list);
		          	this.popup_display=false;
	        		this.popup_info="";
		  		}
		    },res => {
		      	console.info('发送失败！');
		    });
		},
		display_callback_false:function(text){
	        this.popup_display=false;
	        this.popup_info="";
	    },
    }
  }
</script>