<template>
  <div>
      <m-header title="我的" fixed>
      </m-header>
      <div>
        <img class="my-img" src="../../assets/images/my1.png">
        <div class="color-blue">我的</div>
      </div>
  </div>
</template>
<style type="text/css">
  .my-img{
    margin-top: 5rem;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
  }
  .color-blue{
    color: #0a90ea
  }
</style>
<script>
  import mHeader from '../../components/header'
  export default {
    name: 'mine',
    components: {
      mHeader
    }
  }
</script>
