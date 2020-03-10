<template>
  <div>
    <m-header title="附近" fixed back ></m-header>
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
      <button @click="MapSearch" class="map-search-btn">查询</button>
      <div v-if="SearchRes!=null" class="map-search-res">
        <div v-for="item in SearchRes" class="map-search-box">
          <div class="map-search-left">
            <span>{{item.number}}</span>
          </div>
          <div class="map-search-right">
            {{item.name}}
            <div class="map-search-detail">
              电话：<span class="color-blue">{{item.tel}}</span>
            </div>
            <div class="map-search-detail">
              地址：<span class="color-red">{{item.adname}}{{item.address}}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div style="height: 5rem"></div>
    </div>
    
  </div>
</template>
<script>
import mHeader from '../../components/header'
export default {
  name:'nearby',
  components: {
      mHeader,
    },
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
      console.log(placeSearch)
      
      placeSearch.searchNearBy('', that.center, 300, function(status, result) {
        
         console.log(that.SearchRes);
         that.SearchRes=result.poiList.pois;
         for (var i = that.SearchRes.length - 1; i >= 0; i--) {
           that.SearchRes[i].position=new Array();
           that.SearchRes[i].position.push(that.SearchRes[i].location.lng);
           that.SearchRes[i].position.push(that.SearchRes[i].location.lat)
           that.SearchRes[i].number=i+1;
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
.map-search-btn{
  width: 60%;
  margin: 20px 20%;
  background: #2d78f4;
  outline: none;
  cursor: pointer;
  border: none;
  padding: 8px;
  color: #fff;
}
.map-search-res{
  margin: 0 5%;
  padding: 0 3%;
  border: 1px solid #999;
  border-radius: 1rem;
  box-shadow: 5px 5px 5px #999;
}
.map-search-box{
  height: 5rem;
  overflow: hidden;
  position: relative;
  border-bottom: 1px solid #999;
  padding: 10px 0;
  box-sizing: border-box;
}
.map-search-left{
  position: absolute;
  width: 20%;
  text-align: center;
  color: #2d78f4;
  display: inline-block;
  height: 100%;
  top: 0;
  
}
.map-search-left span{
  font-size: 1.4rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
}

.map-search-right{
  padding: 0 5%;
  width: 80%;
  text-align: left;
  color: #888;
  display: inline-block;
  position: relative;
  left: 20%;
  height: 100%;
  overflow: hidden;
  box-sizing: border-box;
  white-space: nowrap;
  text-overflow: ellipsis;
  border-left: 1px solid  #2d78f4;
}
.map-search-right .map-search-detail{
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 0.8rem;
}
.map-search-right .map-search-detail span{
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 0.8rem;
}
</style>
