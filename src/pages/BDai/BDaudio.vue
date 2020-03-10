<template>
	<div>
		<mHeader title="录音" fixed back></mHeader>
		<div style="height: 2.5rem"></div>
		<audiodemo></audiodemo>
	</div>
</template>
<script type="text/javascript">
	import mHeader from '../../components/header'
	import audiodemo from '../../components/audio_demo'
	export default {
	    name: 'BDaudio',
	    components: {
	      	mHeader,
	      	audiodemo
	    },
	}
</script>