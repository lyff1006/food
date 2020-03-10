<template>
	<div>
		<center class="popup">
			<div class="popup-title">{{popup_title}}</div>
			<div class="popup-body">{{popup_info}}</div>
			<div align="center" v-if="popup_btn==true"><span class="popup-btn" @click="popup_display">确定</span></div>
		</center>
	</div>
</template>
<script>
   	export default{
	   	props: {
	      popup_info: String,
	      popup_title: "",
	      required: true,
	      popup_btn:true,
	    },
       methods:{
          getback:function(){
            this.$router.back(-1);
          },
          popup_display:function(){
          	this.$emit('display_callback_false', false);
          }
        }
   }
</script>