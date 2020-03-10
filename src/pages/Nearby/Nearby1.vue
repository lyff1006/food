<template>
  <div>
    
    <div class="amap-wrapper">
      <el-amap vid="amap" :zoom="zoom" :plugin="plugin" class="amap-demo" :center="center">
        <el-amap-marker v-for="item in SearchRes" :key="item.number" vid="marker" :position="item.position">
          <div class="my-amap-marker">{{item.number}}</div>
        </el-amap-marker>
        <el-amap-circle  vid="circle"
          :center="center" 
          :radius="radius" 
          fill-opacity="0.2"
          strokeColor="#38f"
          strokeOpacity="0.8"
          strokeWeight="1"
          fillColor="#38f"
          >
        </el-amap-circle>
      </el-amap>
      <button @click="MapSearch">查询</button>
    </div>
    <div id="panel"></div>
  </div>
</template>
<script>
export default {
  name:'home',
  mounted(){
  },
  /*data(){
    let vm=this;
    return{
      zoom:16,
      center:[113.57842,23.06074],
      SearchRes:{},
      label:{
        content:'',
        offset:[10,12]
      },
      radius:100,
      plugin: [
        {
          pName: 'ToolBar',//工具条插件
          position:'LB',
        },
        {
          pName: 'MapType',//卫星与地图切换
          defaultType: 0,
          showTraffic:false,//实时交通图层
        },
        {
          pName:'OverView',
          //isOpen:true//鹰眼是否打开
        },
        {
          pName:'Scale'
        },
        {
          pName:'Geolocation',//定位插件
          showMarker:false,
          events:{
            init(o){
              //定位成功 自动将marker和circle移到定位点
              o.getCurrentPosition((status, result) => {
                console.log(result);
                vm.center=[result.position.lng,result.position.lat]
              });
            }
          }
        }
      ]
    }*/
    data() {
      let self = this;
      return {
        SearchRes:{},
        center: [121.59996, 31.197646],
        lng: 0,
        lat: 0,
        loaded: false,
        zoom:15,
        radius:300,
        plugin: [{
          pName: 'Geolocation',
          events: {
            init(o) {
              // o 是高德地图定位插件实例
              o.getCurrentPosition((status, result) => {
                if (result && result.position) {
                  self.lng = result.position.lng;
                  self.lat = result.position.lat;
                  self.center = [self.lng, self.lat];
                  //self.loaded = true;
                  self.$nextTick();
                }
              });
            }
          }
        }]
      };
  },
  methods:{
    MapSearch(){
      const that=this;
      var placeSearch = new AMap.PlaceSearch({ 
        type: '餐饮服务', // 兴趣点类别
        pageSize: 7, // 单页显示结果条数
        pageIndex: 1, // 页码
        city: "全国", // 兴趣点城市
        citylimit: false,  //是否强制限制在设置的城市内搜索
        map: amap, // 展现结果的地图实例
        //panel: "panel", // 结果列表将在此容器中进行展示。
        //autoFitView: true // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
      });
      placeSearch.searchNearBy('', that.center, 300, function(status, result) {
        console.log(that.SearchRes);
        that.SearchRes=result.poiList.pois;
        for (var i = that.SearchRes.length - 1; i >= 0; i--) {
          that.SearchRes[i].position=new Array;
          that.SearchRes[i].position.push(that.SearchRes[i].location.lng);
          that.SearchRes[i].position.push(that.SearchRes[i].location.lat)
          that.SearchRes[i].number=i+1;
          //[that.SearchRes[i].location.lng,that.SearchRes[i].location.lat]
        }
        console.log(that.SearchRes);
      });
    },
    
  }
}
</script>
<style scoped>
.amap-wrapper{
  height: 300px;
}
.my-amap-marker{
  color: #fff;
  width: 20px;
  text-align: center;
  height: 35px;
  background: url(https://webapi.amap.com/theme/v1.3/markers/n/mark_bs.png);
  background-repeat: no-repeat;
}
</style>
