<template>
	<div>
		<div class="fl_tap">
			<ul>
				<li v-for="item in list"><a :href="'#'+item.list">分类{{item.list}}</a></li>
			</ul>
		</div>
	</div>
</template>

<script type="text/javascript">
	export default{
		name:'food_list_tap',
		props:{
			list:{
				type: Array,
				default:''
			}
		},
	}
</script>