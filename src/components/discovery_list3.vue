<template>
	<center class="Dlist3" ref="list2">
		<scroller  :on-refresh="refresh" :on-infinite="infinite">
			<div v-for="item in list" class="list2" >
				<router-link :to="{path:'/Detail', query:{food_id:item.food_id}}" style="display: inline-block;width: 100%">
					<div class="list2-img">
						<img class="top_center_re" v-lazy="item.food_image">
					</div>
					<div class="list2-info">
						<div class="list2-title"><span v-if="item.essence==true">精华</span> {{item.food_name}}</div>
						<div class="list2-text" v-if="item.food_abstract==''">暂无介绍</div>
						<div class="list2-text" v-else>{{item.food_abstract}}</div>
					</div>
				</router-link>
			</div>
		</scroller>
	</center>
</template> 
<style type="text/css">
	.Dlist3{
		height: 40rem;
		box-sizing: border-box;
		-webkit-box-sizing: border-box;
		overflow-y: scroll;
	}
	.list2{
		box-sizing: border-box;
		-webkit-box-sizing: border-box;
		margin: 0.6rem 0.6rem;
		border-bottom: 1px solid #d9d9d9;
		overflow: hidden;
		padding: 0.4rem 0.3rem;
	}
	.list2 img{
		width: 8rem;
		padding: 0px 0.8rem;
		box-sizing: border-box;
	}
	.list2-img{
		float: left;
		box-sizing: border-box;
		-webkit-box-sizing: border-box;
		width: 28%;
		height: 6rem;
		overflow: hidden;
	}
	.list2-info{
		margin: 0.4rem 0.6rem; 
		float: left;
		width: 65%;
	}
	.list2-title{
		width: 100%;
		font-size: 1.2rem;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.list2-title span{
		background: #26a8ff;
		color: #fff;
		padding: 2px 3px;
		font-size: 0.9rem;
		display: inline-block;
	}
	.list2-text{
		position:relative;
		font-size: 0.8rem;
		color: #9c9c9c;
		text-indent: 1.6rem;
		line-height:1.4rem;
		height:4.2rem;
		overflow:hidden;
        
	}
	.list2-text:after {
	    background: linear-gradient(to right, rgba(255, 255, 255, 0), #FFFFFF 90%) repeat scroll 0 0 rgba(0, 0, 0, 0);
	    bottom: 0;
	    width: 2rem;
	    height: 1.4rem;
	    content: " ";
	    padding: 0 6px 5px 30px;
	    position: absolute;
	    right: 0;
	}
</style>
<script type="text/javascript">
	export default{
		name:'food_data',
		props:{
			list:{
				type:Array,
				default:[]
			}
		},
		data(){
			return{
				food_body:[],
				items: [],
        		food_body_length:0,
        		food_list:[],
			}
		},
	    created(){
	    	

	    },
	    mounted(){
	    	//this.infinite();
	    	
	    	
	    },
	    methods:{
	      	/*refresh (done) {
		        setTimeout(() => {
		            this.items= new Array();
		            for (var i = 0; i <= 20; i++) {
			            this.items.push(this.list[i]);
			        }
		            done();
		        }, 1500)
		    },*/
		    refresh (done) {
		        setTimeout(() => {
		            done(true);
		        }, 1500)
		    },
		    infinite (done) {
		        setTimeout(() => {
		            //this.getfoodindex1();
		            /*for (var i = this.items.length; i <=this.items.length+20; i++) {
			            this.items.push(this.list[i]);
			        }*/
		            done(true)
		        }, 1500)
		    },
	    } 
	}
</script>