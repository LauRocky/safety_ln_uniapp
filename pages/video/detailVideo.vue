<template>
	<view class="detailVideo">
		<TwoNavbar :name="status.names"></TwoNavbar>
		<view class="header" v-if="this.status.ezv==0">
			<video class="vid" @fullscreenchange="playerFullScreen" id="myVideo" :src="monitorUrl" :controls="false" :show-play-btn="false" :show-fullscreen-btn="false">
			</video>
		</view>
		<view class="header" v-if="this.status.ezv==1">
			<video class="vid" @fullscreenchange="playerFullScreen" id="myVideo" :src="yinshiyun" :controls="false" :show-play-btn="false" :show-fullscreen-btn="false">
			</video>
		</view>
		<view class="mask">
			<view class="left">
			</view>
			<view class="right">
				<view class="right-img3" @click="full">
					全屏
				</view>
			</view>
		</view>
		<!-- 监控下面部分 -->
		<view class="middle">
			<!-- 中间图片 -->
			<view class="middle-content">
				<view @touchstart="down(index)" @touchend="up" class="content-1" v-for="(item,index) in Content"
					:key="index" :style="`transform: rotate(${90*index}deg);`">
					<image v-if="index!=img" class="a" src="../../static/video/a.png" mode="">
					</image>
					<image class="a" v-else src="../../static/video/c.png" mode=""></image>
					<image class="b" src="../../static/video/b.png" mode=""></image>
				</view>
			</view>
			<!-- 底部照片 -->
			<view class="soleBase">
				<view class="zoom1" @click="bianbeijia">
					<image src="../../static/video/bianbei.png" mode=""></image>
					<view class="zoom1-text">
						变倍+
					</view>
				</view>
				<view class="zoom1" @click="bianbeijian">
					<image src="../../static/video/bianbei1.png" mode=""></image>
					<view class="zoom1-text">
						变倍-
					</view>
				</view>
				<view class="zoom1" @click="bianjiaojia">
					<image src="../../static/video/bianjiao1.png" mode=""></image>
					<view class="zoom1-text">
						变焦+
					</view>
				</view>
				<view class="zoom1" @click="bianjiaojian">
					<image src="../../static/video/bianjiao2.png" mode=""></image>
					<view class="zoom1-text">
						变焦-
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import navBar from '../../components/navBar/navBar.vue'
	import TwoNavbar from '../../components/TwoNavbar/TwoNavbar.vue'
	export default {
		components: {
			navBar,
			TwoNavbar
		},
		data() {
			return {
				screen: true,
				currentSelect: '',
				fullControl: false,
				isIOS: false,
				monitorUrl: '',
				videoContext: null,
				status: {},
				yinshiyun: "",
				img: -1,
				Content: [0, 1, 2, 3]
			};
		},
		methods: {
			down(index) {
				this.img = index
				console.log(index)
				if (index == 0) {
					// 云台控制 上
					let onControl = 0;
					let ehomeControl = 'UP';
					if (this.status.ezv == 0) {
						this.$http(`/ehome/ptzOption/${this.status.camera}/${ehomeControl}`, "POST", {}, false).then(
						res => {
							console.log(res)
						})
					} else {
						let channel = 1;
						this.$http(`/ptzOption/${this.status.nvr}/${channel}/${onControl}`, "POST", {}, false).then(
						res => {
							console.log(res)
							if (!res.data) {
								console.log(res.msg)
								uni.showToast({
									title: res.msg,
									icon: 'none'
								})
							} else {
								uni.showToast({
									title: res.data.msg,
									icon: 'none'
								})
							}
						})
					}
				} else if (index == 2) {
					// 云台控制 下
					let downControl = 1;
					let ehomeControl1 = 'DOWN';
					if (this.status.ezv == 0) {
						this.$http(`/ehome/ptzOption/${this.status.camera}/${ehomeControl1}`, "POST", {}, false).then(
							res => {
								console.log(res)
							})
					} else {
						let channel = 1;
						this.$http(`/ptzOption/${this.status.nvr}/${channel}/${downControl}`, "POST", {}, false).then(
							res => {
								console.log(res)
								if (!res.data) {
									console.log(res.msg)
									uni.showToast({
										title: res.msg,
										icon: 'none'
									})
								} else {
									uni.showToast({
										title: res.data.msg,
										icon: 'none'
									})
								}
							})
					}
				} else if (index == 3) {
					// 云台控制 左
					let leftControl = 2;
					let ehomeControl2 = 'LEFT';
					if (this.status.ezv == 0) {
						this.$http(`/ehome/ptzOption/${this.status.camera}/${ehomeControl2}`, "POST", {}, false).then(
							res => {
								console.log(res)
							})
					} else {
						let channel = 1;
						this.$http(`/ptzOption/${this.status.nvr}/${channel}/${leftControl}`, "POST", {}, false).then(
							res => {
								console.log(res)
								if (!res.data) {
									console.log(res.msg)
									uni.showToast({
										title: res.msg,
										icon: 'none'
									})
								} else {
									uni.showToast({
										title: res.data.msg,
										icon: 'none'
									})
								}
							})
					}
				} else if (index == 1) {
					// 云台控制 右
					let rightControl = 3;
					let ehomeControl3 = 'RIGHT';
					if (this.status.ezv == 0) {
						this.$http(`/ehome/ptzOption/${this.status.camera}/${ehomeControl3}`, "POST", {}, false).then(
							res => {
								console.log(res)
							})
					} else {
						let channel = 1;
						this.$http(`/ptzOption/${this.status.nvr}/${channel}/${rightControl}`, "POST", {}, false).then(
							res => {
								console.log(res)
								if (!res.data) {
									console.log(res.msg)
									uni.showToast({
										title: res.msg,
										icon: 'none'
									})
								} else {
									uni.showToast({
										title: res.data.msg,
										icon: 'none'
									})
								}
							})
					}
				}
				// else if(index==1){
				// 	//云台控制  右上
				// 	let OnrightControl = 6;
				// 	if (this.status.ezv == 0) {
				// 		this.$http(`/ehome/ptzOption/${this.status.camera}/${OnrightControl}`, "POST", {}, false).then(res => {
				// 			console.log(res)
				// 		})
				// 	} else {
				// 		let channel = 1;
				// 		this.$http(`/ptzOption/${this.status.nvr}/${channel}/${OnrightControl}`, "POST", {}, false).then(res => {
				// 			console.log(res)
				// 			if(!res.data){
				// 				console.log(res.msg)
				// 				uni.showToast({
				// 					title:res.msg,
				// 					icon:'none'
				// 				})
				// 			}else {
				// 				uni.showToast({
				// 					title:res.data.msg,
				// 					icon:'none'
				// 				})
				// 			}
				// 		})
				// 	}
				// }else if(index==3){
				// 	//云台控制  右下
				// 	let DownrightControl = 7;
				// 	if (this.status.ezv == 0) {
				// 		this.$http(`/ehome/ptzOption/${this.status.camera}/${DownrightControl}`, "POST", {}, false).then(res => {
				// 			console.log(res)
				// 		})
				// 	} else {
				// 		let channel = 1;
				// 		this.$http(`/ptzOption/${this.status.nvr}/${channel}/${DownrightControl}`, "POST", {}, false).then(res => {
				// 			console.log(res)
				// 			if(!res.data){
				// 				console.log(res.msg)
				// 				uni.showToast({
				// 					title:res.msg,
				// 					icon:'none'
				// 				})
				// 			}else {
				// 				uni.showToast({
				// 					title:res.data.msg,
				// 					icon:'none'
				// 				})
				// 			}
				// 		})
				// 	}
				// }else if(index==5){
				// 	//云台控制  左下
				// 	let DownLeftControl = 5;
				// 	if (this.status.ezv == 0) {
				// 		this.$http(`/ehome/ptzOption/${this.status.camera}/${DownLeftControl}`, "POST", {}, false).then(res => {
				// 			console.log(res)
				// 		})
				// 	} else {
				// 		let channel = 1;
				// 		this.$http(`/ptzOption/${this.status.nvr}/${channel}/${DownLeftControl}`, "POST", {}, false).then(res => {
				// 			console.log(res)
				// 			if(!res.data){
				// 				console.log(res.msg)
				// 				uni.showToast({
				// 					title:res.msg,
				// 					icon:'none'
				// 				})
				// 			}else {
				// 				uni.showToast({
				// 					title:res.data.msg,
				// 					icon:'none'
				// 				})
				// 			}
				// 		})
				// 	}
				// }else if(index==7){
				// 	//云台控制  左上
				// 	let OnLeftControl = 4;
				// 	if (this.status.ezv == 0) {
				// 		this.$http(`/ehome/ptzOption/${this.status.camera}/${OnLeftControl}`, "POST", {}, false).then(res => {
				// 			console.log(res)
				// 		})
				// 	} else {
				// 		let channel = 1;
				// 		this.$http(`/ptzOption/${this.status.nvr}/${channel}/${OnLeftControl}`, "POST", {}, false).then(res => {
				// 			console.log(res)
				// 			if(!res.data){
				// 				console.log(res.msg)
				// 				uni.showToast({
				// 					title:res.msg,
				// 					icon:'none'
				// 				})
				// 			}else {
				// 				uni.showToast({
				// 					title:res.data.msg,
				// 					icon:'none'
				// 				})
				// 			}
				// 		})
				// 	}
				// }
			},
			up() {
				this.img = -1
			},
			playerFullScreen(e) {
				console.log('full screen',e)
				if (e.detail.fullScreen) {
					this.videoContext.showStatusBar(); //显示状态栏,仅在ios全屏下有效
					
				} else {
					this.screen = false;
					this.fullControl = false
				}
			},
			// 录屏
			recording() {
				uni.showToast({
					title: '暂不支持',
					icon: 'none',
				})
			},
			// 变倍+
			bianbeijia() {
				// 萤石云是1,
				// 海康是0
				let bianbei = 8;
				let ehomebianbei = 'ZOOM_IN';
				if (this.status.ezv == 0) {
					this.$http(`/ehome/ptzOption/${this.status.camera}/${ehomebianbei}`, "POST", {}, false).then(res => {
						console.log(res)
					})
				} else {
					let channel = 1;
					this.$http(`/ptzOption/${this.status.nvr}/${channel}/${bianbei}`, "POST", {}, false).then(res => {
						console.log(res)
						if (res.code == 0) {
							uni.showToast({
								title: res.msg,
								icon: "none"
							})
						}
					})
				}
			},
			// 变倍-
			bianbeijian() {
				let bianbei = 9;
				let ehomebianbei1 = 'ZOOM_OUT';
				if (this.status.ezv == 0) {
					this.$http(`/ehome/ptzOption/${this.status.camera}/${ehomebianbei1}`, "POST", {}, false).then(res => {
						console.log(res)
					})
				} else {
					let channel = 1;
					this.$http(`/ptzOption/${this.status.nvr}/${channel}/${bianbei}`, "POST", {}, false).then(res => {
						console.log(res)
						if (res.code == 0) {
							uni.showToast({
								title: res.msg,
								icon: "none"
							})
						}
					})
				}
			},
			// 变焦+
			bianjiaojia() {
				let bianbei = 11;
				let ehomebianbei2 = 'FOCUS_FAR';
				if (this.status.ezv == 0) {
					this.$http(`/ehome/ptzOption/${this.status.camera}/${ehomebianbei2}`, "POST", {}, false).then(res => {
						console.log(res)
					})
				} else {
					let channel = 1;
					this.$http(`/ptzOption/${this.status.nvr}/${channel}/${bianbei}`, "POST", {}, false).then(res => {
						console.log(res)
						if (res.code == 0) {
							uni.showToast({
								title: res.msg,
								icon: "none"
							})
						}
					})
				}
			},
			// 变焦-
			bianjiaojian() {
				let bianbei = 10;
				let ehomebianbei3 = 'FOCUS_NEAR';
				if (this.status.ezv == 0) {
					this.$http(`/ehome/ptzOption/${this.status.camera}/${ehomebianbei3}`, "POST", {}, false).then(res => {
						console.log(res)
					})
				} else {
					let channel = 1;
					this.$http(`/ptzOption/${this.status.nvr}/${channel}/${bianbei}`, "POST", {}, false).then(res => {
						console.log(res)
						if (res.code == 0) {
							uni.showToast({
								title: res.msg,
								icon: "none"
							})
						}
					})
				}
			},
			devicesIsAndroid() {
				var res = uni.getSystemInfoSync();
				var platform = res.platform;
				return (platform == 'android');
			},
			// 退出全屏
			exitFull() {
				this.videoContext = uni.createVideoContext("myVideo", this);
				this.videoContext.exitFullScreen()
			},
			// 全屏
			full() {
				this.videoContext = uni.createVideoContext("myVideo", this);
				this.videoContext.requestFullScreen();
				// exitFullScreen
			},
			// 截屏
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
							let apiUrl = 'http://140.249.223.78:12003/'
							this.monitorUrl = apiUrl + res.url
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
			}
		},
		onLoad(option) {
			this.status = option
			console.log(this.status)
			this.videodetail()
		}
	}
</script>

<style lang="scss" scoped>
.detailVideo{
	width: 100vw;
	height: 100vh;
	overflow: hidden;
	.header {
		height: 40vh;
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
				text-align: center;
				font-size: 28upx;
				width: 100upx;
				height: 60upx;
				line-height: 60upx;
				color: #FFFFFF;
			}
		}
	}
	
	.middle {
		overflow: hidden;
		.middle-content {
			width: 360upx;
			height: 360upx;
			display: flex;
			justify-content: center;
			margin: 10upx auto 0;
	
			.content-1 {
				width: fit-content;
				height: fit-content;
				position: absolute;
				transform-origin: center 180upx;
	
				.a {
					width: 230upx;
					height: 130upx;
				}
	
				.b {
					width: 50upx;
					height: 52upx;
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -70%);
				}
			}
		}
	
		.soleBase {
			margin: 50upx 50upx 10upx;
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
	
				.zoom1-text {
					font-size: 30upx;
					color: #666666;
					text-align: center;
					font-family: PingFang SC;
				}
			}
		}
	}
	
}
	
</style>
