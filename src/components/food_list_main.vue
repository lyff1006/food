<template>
	<div class="main">
		<div class="fl_main_list"  v-for="item in list" :key="item.id"  v-bind:id='item.list' >
			<div class="fl_main_list_title">分类{{item.list}}</div>
			<router-link v-for="item1 in item.info" :key="item1.id" :to="{path:'/Foodlist1', query:{food_id:item1.index_name}}" >
				<div class="fl_main_list_one" >
					<div class="fl_main_list_img">
						<img v-lazy="item1.index_img">
					</div>
					<div class="fl_main_list_text">
						{{item1.index_name}}
					</div>
				</div>
			</router-link>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default{
		name:'food_list_main',
		props:{
			list:{
				type: Array,
				default:''
			}
		},
	}
</script>