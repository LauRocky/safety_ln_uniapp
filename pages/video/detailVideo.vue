<template>
	<view>
		<u-navbar :title="status.names" :fixed="true" :placeholder="true" :safeAreaInsetTop="true"
			bgColor="#11B38C" @leftClick="back" color="#ffffff">
		</u-navbar>
		<view class="header" v-if="this.status.ezv==0">
			<video class="vid" :src="monitorUrl" controls></video>
		</view>
		<view class="header" v-if="this.status.ezv==1">
			<video class="vid" :src="yinshiyun" controls></video>
		</view>
	</view>
</template>
<script>
	import navBar from '../../components/navBar/navBar.vue'
 export default {
	 components: {
	 	navBar,
	 },
	   data() {
	        return {
				monitorUrl:'',
				apiUrl:'http://140.249.223.78:12003/',
				status:{},
				yinshiyun:""
	        };
  	  },
	  methods:{
		  back() {
		  	uni.navigateBack({
		  		delta: 2
		  	});
		  },
		videodetail(){
			if(this.status.ezv==0){
				this.$http(`/ehome/camera/previewurl/hls/${this.status.camera}`,
						'POST', {}, false)
					.then(res => {
						console.log(res)
						this.monitorUrl=this.apiUrl+res.url
					})
			}else{
				let channel=1;
				let url=`/getEzNewLiveAddress/${this.status.nvr}/${channel}/${this.status.ezviz}`;
				console.log(url)
				this.$http(url,
						'POST', {}, false)
					.then(res => {
						// console.log(res)
						// console.log(res.result.data.url)
						this.yinshiyun=res.result.data.url
					})
			}
		},  
	  },
	  onLoad(option) {
		  this.status=option
		  console.log(this.status)
		  this.videodetail()
	  }
	}
</script>

<style lang="scss" scoped>
	.header{
		width: 750rpx;
		height: 448rpx;
		.vid{
			width: 100%;
			height: 100%;
		}
	}
</style>
