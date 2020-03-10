<template>
	<center>
		<div class="Dlist2" style="position: relative;text-align: left;" >
			<scroller :on-refresh="refresh" :on-infinite="infinite" ref="food_list">
				<div v-for="item in items" class="list2" >
					<router-link :to="{path:'/Detail', query:{food_id:item.food_id}}" style="display: inline-block;width: 100%">
						<div class="list2-img">
							<img v-lazy="item.food_image"><span></span>
						</div>
						<div class="list2-info">
							<div class="list2-title"><span v-if="item.essence==true">精华</span> {{item.food_name}}</div>
							<div class="list2-text" v-if="item.food_abstract==''">暂无介绍</div>
							<div class="list2-text" v-else>{{item.food_abstract}}</div>
						</div>
					</router-link>
				</div>
			</scroller>
		</div>
	</center>
</template>
<style type="text/css">
	.Dlist2{
		height: 30rem;
		box-sizing: border-box;
		-webkit-box-sizing: border-box;
		overflow: hidden;
	}
</style>
<script type="text/javascript">
	export default{
		name:'food_data',
		data(){
			return{
				food_body:[],
				items: [],
        		food_body_length:0,
			}
		},
	    created(){
	    	this.fetchData();
	    },
	    methods:{
	      	fetchData:function(){                       
		        this.$http.get('http://food.weblyff.cn/food_guess.php').then((response)=>{
		          this.food_body=response.body;
		          this.food_body_length=this.food_body.length;
		          console.log(this.food_body)
		          for (var i = 0; i <= this.food_body_length-1; i++) {
		            this.items.push(this.food_body[i]);
		          }
		        }).catch((response)=>{
		        	console.log("error!");
		        })
		      },
		    refresh (done) {
		       	setTimeout(() => {
		          	this.items= new Array();
		          	this.fetchData();
		          	done()
		        }, 1500)
		    },

		    infinite (done) {
		        setTimeout(() => {
		          	this.fetchData();
		         	done()
		        }, 1500)
		    },
	    } 
	}
</script>