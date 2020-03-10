<template>
	<div class="main">
		<div class="know-list" v-for="item in know">
			<router-link :to="{path:'/Knowdetail',query:{artical:item.artical,title:item.title,img:item.img,id:item.id}}">
				<div class="know-list-one">
					<div class="know-list-img" align="center">
						<img class="top_center_re" v-lazy="item.img">
					</div>
					<div class="know-list-info">
						<div class="know-list-title">{{item.title}}</div>
					</div>
				</div>
			</router-link>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default {
	    name: 'knowlist',
	    components: {
	    },
	    data(){
	    	return {
	    		know:[],
	    	}
	    },
	    created(){
	    	this.getknowlist();
	    },
	    methods:{
	    	getknowlist:function(){
	    		var url=this.food_api+"/know_list.php";
				this.$http.get(url).then(res => {
			      this.List = res.data;
			      console.log(res.data);
			      this.know=res.data;
			      console.log(this.know);
			    },res => {
			      console.info('发送失败！');
			    });
	    	},
	    }
	}
</script>