<template>
  <div>
    <m-header title="我的" fixed></m-header>
    <Myinfo></Myinfo>
    <div style="height: 5rem"></div>
  </div>
</template>
<script>
  import mHeader from '../../components/header'
  import Myinfo from '../../components/my_info'
  export default {
    name: 'my',
    components: {
      mHeader,
      Myinfo,
    }
    
  }
</script>
