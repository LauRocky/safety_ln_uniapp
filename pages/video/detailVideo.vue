<template>
	<view>
		<view class="headerTop">
			<u-navbar :title="status.names" :fixed="true" :show-fullscreen-btn="isIOS" :placeholder="true" :safeAreaInsetTop="true" bgColor="#11B38C"
				@leftClick="back" color="#ffffff">
			</u-navbar>
		</view>
		<view class="header" v-if="this.status.ezv==0">
			<video class="vid" id="myVideo" @fullscreenchange="fullscreenchange" @error="videoErrorCallback"  :src="monitorUrl" controls></video>
		</view>
		<view class="header" v-if="this.status.ezv==1">
			<video class="vid" id="myVideo" @fullscreenchange="fullscreenchange" @error="videoErrorCallback" :src="yinshiyun" controls></video>
		</view>
		<view class="mask">
			<view class="left" @click="address">
				<image style="width: 60upx;height: 60upx;" src="../../static/video/xunjiandian.png" mode=""></image>
			</view>
			<view class="right">
				<image @click="recording" class="right-img1" src="../../static/video/shexiangji.png" mode=""></image>
				<image @click="screenshots" class="right-img2" src="../../static/video/jiandao.png" mode=""></image>
				<image @click="full"  class="right-img3" src="../../static/video/last.png" mode=""></image>
			</view>
		</view>
		<!-- 监控下面部分 -->
		<view class="middle">
			<view class="titles">
				{{status.names}}
			</view>
			<!-- 中间图片 -->
			<view class="middle-body">
				<view class="middle-body11" @click="address">
					<image src="../../static/video/address1.png" mode=""></image>
				</view>
				<view class="middle-body11">
					<image src="../../static/video/shexiang1.png" mode=""></image>
				</view>
			</view>
			<!-- 底部照片 -->
			<view class="soleBase">
				<view class="zoom1" @click="bianjiao">
					<image src="../../static/video/bianbei.png" mode=""></image>
					<view  class="zoom1-text">
						变倍+
					</view>
				</view>
				<view class="zoom1" @click="bianjiao">
					<image  src="../../static/video/bianbei1.png" mode=""></image>
					<view  class="zoom1-text">
						变倍-
					</view>
				</view>
				<view class="zoom1" @click="bianjiao">
					<image src="../../static/video/bianjiao1.png" mode=""></image>
					<view class="zoom1-text">
						变焦+
					</view>
				</view>
				<view class="zoom1" @click="bianjiao">
					<image  src="../../static/video/bianjiao2.png" mode=""></image>
					<view  class="zoom1-text">
						变焦-
					</view>
				</view>
			</view>
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
				isIOS:false,
				monitorUrl: '',
				videoContext: null,
				apiUrl: 'http://140.249.223.78:12003/',
				status: {},
				yinshiyun: ""
			};
		},
		methods: {
			// 录屏
			recording(){
				uni.showToast({
					title:'暂不支持',
					icon:'none',
				})
			},
			// 变焦
			bianjiao(){
				uni.showToast({
					title:'暂不支持',
					icon:'none',
				})
			},
			devicesIsAndroid(){
			var res = uni.getSystemInfoSync();
			var platform = res.platform;
			return (platform == 'android');
			},
			fullscreenchange(e){
				console.log(e)
				this.videoContext=uni.createVideoContext("myVideo",this);
				if(this.devicesIsAndroid()){
					this.videoContext.requestFullScreen();
					this.isIOS=false
				}else{
					this.isIOS=true;
				}
			},
			videoErrorCallback(){
				
			},
			// 全屏
			full(){
				this.videoContext=uni.createVideoContext("myVideo",this);
				this.videoContext.showStatusBar()   //显示状态栏,仅在ios全屏下有效
				this.videoContext.requestFullScreen()
				// this.videoContext=uni.createVideoContext("myVideo",this);
				// console.log(this.videoContext)
				// if(this.devicesIsAndroid()){
				// 	this.videoContext.requestFullScreen();
				// 	this.isIOS=false
				// }else{
				// 	this.isIOS=true;
				// }
				// this.fullscreenchange();
			},
			// 截屏
			screenshots(){
				uni.showToast({
					title:'暂不支持',
					icon:'none',
				})
				// var pages=getCurrentPages();  //获取当前页面信息
				// var page=pages[pages.length-1];
				// var bitmap=null;
				// var currentWebview = page.$getAppWebview(); 
				// console.log(pages)
				// console.log(page)
			},
			// 萤石云台控制
			// /ptzOption/{deviceSerial}/{channelNo}/{command}
			ptzOption(){
				let channel = 1;
				// 获取萤石云播放url
				// 0上.1下,2左,3右,4左上,5左下,6右上,7右下,8放大,9缩小,10近焦距,11远焦距
				let url = `/getEzNewLiveAddress/${this.status.nvr}/${channel}/${0}`;
				console.log(url)
				this.$http(url,'POST',{}, false).then(res=>{
					console.log(11)
				})
			},
			// 两个地址部分
			address(){
				uni.showToast({
					title:'暂不支持',
					icon:'none'
				})
			},
			back() {
				uni.navigateBack({
					delta: 1
				});
			},
			videodetail() {
				if (this.status.ezv == 0) {
					// 如果为0则是海康
					this.$http(`/ehome/camera/previewurl/hls/${this.status.camera}`,
							'POST', {}, false)
						.then(res => {
							console.log(res)
							this.monitorUrl = this.apiUrl + res.url
						})
				} else {
					let channel = 1;
					// 获取萤石云播放url
					let url = `/getEzNewLiveAddress/${this.status.nvr}/${channel}/${this.status.ezviz}`;
					// console.log(url)
					this.$http(url,
							'POST', {}, false)
						.then(res => {
							this.yinshiyun = res.result.data.url	
						})
				}
			},
		},
		onLoad(option) {
			this.status = option
			console.log(this.status)
			this.videodetail()
		}
	}
</script>

<style lang="scss" scoped>
	.headerTop {
		::v-deep span {
			color: #FFFFFF;
			font-weight: bold;
		}
	}
	.header {
		width: 100vw;
		height: 448upx;

		.vid {
			width: 100%;
			height: 100%;
		}
	}

	.mask {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100vw;
		height: 100upx;
		background: #464950;

		.left {
			margin: 20upx 0 20upx 27upx;
		}

		.right {
			margin-right: 15upx;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.right-img1 {
				width: 60upx;
				height: 60upx;
				margin-right: 28upx;
			}

			.right-img2 {
				width: 60upx;
				height: 60upx;
				margin-right: 24upx;
			}

			.right-img3 {
				width: 60upx;
				height: 60upx;
			}
		}
	}

	.middle {
		overflow: hidden;

		.titles {
			margin: 34upx 0 0 29upx;
			font-size: 32upx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #333333;
		}

		.middle-body {
			margin-top: 188upx;
			display: flex;
			align-items: center;
			justify-content: space-around;

			.middle-body11 {
				width: 141upx;
				height: 141upx;

				image {
					width: 100%;
					height: 100%;
				}
			}
		}
		.soleBase {
			margin: 159upx 50upx 247upx 50upx;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.zoom1 {
				width: 96upx;
				height: 135upx;
				image {
					width: 96upx;
					height: 96upx;
				}
				.zoom1-text{
					font-size: 30upx; color: #666666; text-align: center;font-family: PingFang SC;
				}
			}
		}
	}
</style>
