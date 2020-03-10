<template>
	<div >
		<div class="search">
			<input class="search-input" type="text" name="" v-model="search_data" placeholder="请输入搜索内容！">
			<span class="search-btn" @click="refresh">搜索</span>
		</div>
		<div v-show="search_result" class="search-result-text1">以下是搜索<span>{{search_data1}}</span>的结果,一共<span>{{list_length}}</span>条！</div>
        <div style="position: relative;" class="Dlist3" ref="list2">
			<scroller  :on-refresh="refresh" :on-infinite="infinite">
				<div v-for="item0 in list">
					<div v-for="item in item0" class="list2" >
						<router-link :to="{path:'/Detail', query:{food_id:item.food_id}}" style="display: inline-block;width: 100%">
							<div class="list2-img">
								<img v-lazy="item.food_image">
							</div>
							<div class="list2-info">
								<div class="list2-title"><span v-if="item.essence==true">精华</span> {{item.food_name}}</div>
								<div class="list2-text" v-if="item.food_abstract==''">暂无介绍</div>
								<div class="list2-text" v-else>{{item.food_abstract}}</div>
							</div>
						</router-link>
					</div>
				</div>
			</scroller>
		</div>
        
	</div>
</template>
<script type="text/javascript">
	import searchlist1 from  './search_list1';
	import Dlist3 from './discovery_list3'
	export default {
	    name: 'detail',
	    components: {
	    	searchlist1,
	    	Dlist3,
	    },
	    data(){
	    	return{
	    		search_data:"",
	    		list:[],
	    		search_data1:"",
	    		list_length:Number,
	    		search_result:false,
	    		page:0,
	    	}
	    },
	    methods:{
	    	search:function(){
	    		if(this.search_data!=""){
	    			this.$http.post('http://food.weblyff.cn/food_search.php',{search:this.search_data,page:(Number(this.page)+1)},{emulateJSON:true}).then((response)=>{
			        this.list.push(response.body.arr_food);
			        this.search_data1=this.search_data;
			        this.search_result=true;
			        this.list_length=response.body.count;
			        this.page=response.body.page;
			        console.log(this.list);
			        })
	    		}else{
	    			this.$emit('display_callback', "请输入搜索内容！");
	    		}
	    	},
		    refresh (done) {
		        setTimeout(() => {
		        	this.list=Array();
		        	this.page=0;
		        	this.search();
		            done(true);
		        }, 1500)
		    },
		    infinite (done) {
		        setTimeout(() => {
		            //this.getfoodindex1();
		            /*for (var i = this.items.length; i <=this.items.length+20; i++) {
			            this.items.push(this.list[i]);
			        }*/
			        this.search();
		            done(true)
		        }, 1500)
		    },
	    }
	}
</script>