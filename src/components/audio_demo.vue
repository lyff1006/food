<template>
  <div>
    <audio v-bind:src="audio_src" ref="my_audio" @ended="ended"></audio>
    <!-- <ul id="recordingslist" v-for="item in url">
      <audio controls="controls">
        <source :src="item">
      </audio>
    </ul> -->
    <div class="audio-ctrl">
      <div class="audio-btn main">
        <button @click="startRecording">录音</button>
        <button @click="stopRecording">停止</button>
        <span v-if="audio_control==false">
          <button @click="start_and_stop">播放</button>
        </span>
        <span v-else>
          <button @click="start_and_stop">停止</button>
        </span>
      </div>
      <div class="audio-progress" ref="audio_ctrl"></div>
      <div class="audio-res">
        识别结果：{{bdai_audio_res}}
        <router-link :to="{path:'/Searchlist', query:{search:bdai_audio_res}}">
          <button>搜索</button>
        </router-link>
      </div>
    </div>
    <Popup v-show="popup_display" :popup_info="popup_info" :popup_title="popup_title"></Popup>
  </div>
</template>
<script type="text/javascript">
  import Recorder from 'recorder-js';
  
   export default {
    name: 'audio_demo',
    components: {
    },
    data(){
      return{
        url:[],
        audio_src:"http://bdai.weblyff.cn/audio/test1.wav",
        audio_control:false,
        audio_duration:0,
        audio_currentTime:0,
        bdai_audio_res:"",
        popup_display:"",
        popup_info:"",
        popup_title:"提示"
      }
    },
    created(){
      const audioContext =  new (window.AudioContext || window.webkitAudioContext)();
      const recorder = new Recorder(audioContext, {
        //onAnalysed: data => console.log(data),
        numChannels:1,
        sampleRate:16000,
      });
      let isRecording = false;
      let blob = null; 
      navigator.mediaDevices.getUserMedia({audio: true})
        .then(stream => {
          recorder.init(stream)
          console.log("success")
        })
        .catch(err => console.log('Uh oh... unable to get stream...', err));
    },
    methods:{
      stopRecording:function(){
        recorder.stop()
        .then(({blob, buffer}) => {
          blob = blob;
          /*console.log(blob);
          var newurl = URL.createObjectURL(blob);
          newurl=newurl.replace("blob:","");
          this.url.push(newurl);
          this.name.push(newurl);
          console.log(this.url);*/
          
          let audio_name="username_"+Date();
          //Recorder.download(blob, audio_name);
          /*let config={
            headers:{'Content-Type':'multipart/form-data'},
          };*/
          let fd=new FormData();
          fd.append('file',blob,audio_name+".wav");
          fd.append('name',audio_name);
          console.log("11111");
          console.log(fd.get("file"));

          var URL = window.URL || window.webkitURL;
          // 通过 file 生成目标 url
          var audioURL = URL.createObjectURL(blob);
          this.audio_src=audioURL;
          var url=this.php_api+"/bdai/audio/audio.php";
          this.popup_display=true;
          this.popup_info="智能识别中，请稍后！";
          this.axios.post(url,fd,{headers:{"Content-Type": "multipart/form-data"}}).then(res => {
            console.log(res.data);
            this.bdai_audio_res=res.data;
            var reg=/，$/gi;
            this.bdai_audio_res=this.bdai_audio_res.replace(reg,""); 
            this.popup_display=false;
            this.popup_info="";
          },res => {
              console.info('发送失败！');
          });
        });
      },
      startRecording:function() {
        console.log("isRecording:"+isRecording);
        recorder.start()
          .then(() => {
            isRecording = true;
            console.log("isRecording:"+isRecording);
          });
      },
      download:function(){
        //console.log(blob)
        Recorder.download(blob, 'my-audio-file');
      },
      audio_recognition:function(){
      },
      start_and_stop:function(){
        if(this.audio_control==false){
          this.$refs.my_audio.play();
          this.audio_control=!this.audio_control;
          this.audio_duration=Math.ceil(this.$refs.my_audio.duration);
          this.audio_currentTime=Math.ceil(this.$refs.my_audio.currentTime);
          console.log( this.audio_currentTime);
          let that= this;
          this.interval=setInterval(function(){
            that.audio_currentTime=that.audio_currentTime+1;
            console.log( that.audio_currentTime);
            console.log("播放中。。。");
            console.log(that.$refs.audio_ctrl.style.width);
            that.$refs.audio_ctrl.style.width=that.audio_currentTime/that.audio_duration*100+"%";
          },1000);
        }else{
          this.$refs.my_audio.pause();
          this.audio_control=!this.audio_control;
          clearInterval(this.interval);
        }
      },
      ended:function(){
        this.audio_control=false;
        this.$refs.audio_ctrl.style.width=100+"%";
        this.$refs.my_audio.pause();
        clearInterval(this.interval);
      },
    },
  }
 
</script>
