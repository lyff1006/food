<template>
  <div>
      <m-header title="常识" fixed back >
      </m-header>
      <div class="main">
      	<div style="height: 3rem"></div>
        <Klist></Klist>
        <div style="height: 3rem"></div>
      </div>
  </div>
</template>
<style type="text/css">
</style>
<script>
  import mHeader from '../../components/header'
  import Klist from '../../components/know_list'
  export default {
    name: 'know',
    components: {
      mHeader,
      Klist,
    },
  }
</script>