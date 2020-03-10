<template>
	<div>
		<m-header title="搜索" fixed back></m-header>
		<div style="height: 3rem"></div>
		<searchlist></searchlist>
		
	</div>
</template>
<script type="text/javascript">
	import searchlist from '../../components/search_list';
	import mHeader from '../../components/header'
	export default {
		name:'Searchlist',
		components: {
	      mHeader,
	      searchlist,
	    },
	    
	}
</script>