<template>
    <center>
        <div class="m-tabbar">
           <slot></slot>
        </div>
    </center>
    
</template>
<script type="text/javascript">
    import mTabbarItem from './tabbar-item';
    import "../assets/css/main.css"
    export default{
        props:['value']
    }
</script>
<style lang="less">
.m-tabbar{
    display: flex;
    flex-direction: row;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    overflow: hidden;
    height: 50px;
    background: #fff;
    border-top: 1px solid #e4e4e4;
}
</style>
<!-- window.onresize=function(){
      let clientHeight = document.documentElement.clientHeight; //屏幕当前的高度
      let bodyHeight= document.body.clientHeight;
      if(clientHeight < bodyHeight){
        this.footShow=false;

      }else{
        this.footShow=true;
      }
      console.log(clientHeight+"-"+bodyHeight);
      console.log(this.footShow)
    } -->