// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import './assets/css/main.css';
import VueResource from 'vue-resource';
import VueLazyload from 'vue-lazyload';
import axios from 'axios';
import vueAxios from 'vue-axios';
import qs from 'qs';
import Recorder from 'recorder-js';
import VueScroller from 'vue-scroller'
import {AudioRecorder, AudioPlayer} from 'vue-audio-recorder'
import Popup from './components/popup'
import VueAMap from "vue-amap";

Vue.use(VueLazyload,{
    loading:'../static/images/loading.gif',
    error:'./static/images/error.jpg'
});
Vue.use(VueResource);
Vue.use(VueScroller);
Vue.component(AudioPlayer);
Vue.component(AudioRecorder);
Vue.component('Popup',Popup);
Vue.use(VueAMap);

VueAMap.initAMapApiLoader({
  key: "ea403b1df4069b4b50866bb64b9f052c",
  plugin: [
    "AMap.Autocomplete", //输入提示插件
    "AMap.PlaceSearch", //POI搜索插件
    "AMap.Scale", //右下角缩略图插件 比例尺
    "AMap.OverView", //地图鹰眼插件
    "AMap.ToolBar", //地图工具条
    "AMap.MapType", //类别切换控件，实现默认图层与卫星图、实施交通图层之间切换的控制
    "AMap.PolyEditor", //编辑 折线多，边形
    "AMap.CircleEditor", //圆形编辑器插件
    "AMap.Geolocation" //定位控件，用来获取和展示用户主机所在的经纬度位置
  ],
  uiVersion: "1.0"
});


axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.prototype.axios = axios;
Vue.prototype.Recorder=Recorder;
/*Vue.prototype.food_api = '/food_api';
Vue.prototype.mail_api = '/mail_api';
Vue.prototype.php_api = '/php_api';
Vue.prototype.bdai_api = '/bdai_api';*/
Vue.prototype.food_api = 'http://food.weblyff.cn';
Vue.prototype.mail_api = 'http://www.weblyff.cn/php/phpmail/';
Vue.prototype.php_api = 'http://php.weblyff.cn';
Vue.prototype.bdai_api = 'http://www.websgf.com/bdai';
Vue.config.productionTip = false;
/* eslint-disable no-new */
if (!window.Promise) {
  window.Promise = Promise;
}





new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
})

Vue.prototype.word_num_reg=function(data,num1,num2){
	var input_reg_data=new RegExp("^[a-zA-Z0-9]{"+num1+","+num2+"}$");
	if (data.match(input_reg_data)){
		return true;
	}else{
		return false;
	}
},

Vue.prototype.chinese_reg=function(data,num1,num2){
	var input_reg_data=new RegExp("^[\u4e00-\u9fa5]{"+num1+","+num2+"}$");
	if (data.match(input_reg_data)){
		return true;
	}else{
		return false;
	}
},
Vue.prototype.mail_reg=function(data){
	var reg = new RegExp("^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$"); //正则表达式
	if(reg.test(data)){
		return true;
	}else{
		return false;
	}
},
Vue.prototype.getCookie=function(name){
	var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	if (arr = document.cookie.match(reg)){
		return arr;
		// return (arr[2]);
	}else{
		return false;
	}
},
Vue.prototype.getCookietext=function(name){
	var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	if (arr = document.cookie.match(reg)){
		//return arr;
		return unescape(arr[2]);
	}else{
		return false;
	}
},
Vue.prototype.setCookie=function(name, value, expiretime) {
	/*var exdate = new Date();
	exdate.setDate(exdate.getDate() + expiredays);
document.cookie = name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());*/
var d = new Date();
d.setTime(d.getTime()+(expiretime*60*1000));
var expires = ";expires="+d.toGMTString();
document.cookie = name + "=" + escape(value) + expires;
},
Vue.prototype.delCookie=function(name) {
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval = this.getCookie(name);
	if (cval != null)
	document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}
   			