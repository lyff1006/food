<template>
  <div>
      <m-header title="教学" fixed back>
      </m-header>
      <div class="main">
      	<div style="height: 3rem"></div>
        <Vlist></Vlist>
      </div>
      
  </div>
</template>
<style type="text/css">
  .color-blue{
    color: #0a90ea
  }
</style>
<script>
  import mHeader from '../../components/header'
  import Vlist from '../../components/video_list'
  export default {
    name: 'foodvideo',
    components: {
      mHeader,
      Vlist,
    },
  }
</script>
