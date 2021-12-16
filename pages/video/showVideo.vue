<template>
	<view class="video">
		<!-- 视频展示 -->
		<view class="header">
			<u-navbar :title="project.projectName" :fixed="true" :placeholder="true" :safeAreaInsetTop="true"
				bgColor="#11B38C" @leftClick="back" color="#ffffff">
			</u-navbar>
		</view>
		<view class="list">
			<!-- 搜索框 -->
			<view style="padding:30rpx 30rpx 0">
				<u-search class="searchs" v-model="seach" @search="handsearch" shape="round" height="50" bgColor="#ffffff" searchIconColor="#333333" :showAction="false"></u-search>
			</view>
			<view class="videolist" >
				<view class="item" v-for="(item,index) in showList.cameraEntities" :key="index" @click="videodetail(item)">
					<image class="imgs" src="../../static/video/detailVideo.png" mode=""></image>
					<view class="mask">
					</view>
					<span class="mask-name">{{item.ipcName}}</span>
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
				seach:"",
				project: {
					projectId: '',
					projectName: "",
				},
				ehomeList: [],
				flag: false,
				etEznew: '',
				showList: [],
				nvrList: [], //萤石
			};
		},
		methods: {
			handsearch() {
				console.log(111)
			},
			videodetail(item) {
				if (item.cameraIndexCode) {
					console.log(item)
					uni.navigateTo({
						url: `/pages/video/detailVideo?ezv=${0}&camera=${item.cameraIndexCode}&names=${item.ipcName}`
					})
						// this.$http(`/ehome/camera/previewurl/hls/${item.cameraIndexCode}`,
						// 		'POST', {}, false)
						// 	.then(res => {
						// 		if(res.url){
						// 			uni.navigateTo({
						// 				url: `/pages/video/detailVideo?url=${res.url}`
						// 			})
						// 		}else{
						// 			uni.showToast({
						// 				icon:none,
						// 				title:"获取播放地址失败",
						// 				duration:1500
						// 			})
						// 		}
						// 	})
					
				}else if (item.ezvizAccountId) {
					uni.navigateTo({
						url: `/pages/video/detailVideo?ezv=${1}&nvr=${item.nvrDeviceSerial}&ezviz=${item.ezvizAccountId}&names=${item.ipcName}`
					})
					// let channel=1;s
					// let url=`/getEzNewLiveAddress/${item.nvrDeviceSerial}/${item.channel}/${item.ezvizAccountId}`;
					// console.log(url)
					// this.$http(url,
					// 		'POST', {}, false)
					// 	.then(res => {
					// 		console.log(res)
					// 		if(res.result.data.url){
					// 			uni.navigateTo({
					// 				// url: `/pages/video/detailVideo?url=${res.result.data.url}`
									
					// 			})
					// 		}else{
					// 			uni.showToast({
					// 				icon:none,
					// 				title:"获取播放地址失败",
					// 				duration:1500
					// 			})
					// 		}
							
							
					// 	})
				}
				
				
			},
			back() {
				uni.navigateBack({
					delta: 2
				});
			},
			// 2. 获取特定项目下的摄像头列表
			show() {
				this.$http('/camera/project/show', 'POST', {
					'projectId': this.project.projectId
				}, false).then(res => {
					console.log(res)
					this.showList = res.projectInfoEntities[0]
					console.log(this.showList)
				})
			},
			// 传值方式  this.$http(`/ehome/camera/previewurl/hls/${el.cameraIndexCode}`,'POST',{},false)
			ehome() {
				
			},
			// 3. 获取萤石云播放URL
			// nvrDeviceSerial(){
			// 	this.showList.forEach(e=>{
			// 		e.cameraEntities.forEach(el=>{
			// 			if(el.ezvizAccountId){
			// 				this.$http()
			// 			}
			// 		})
			// 	})
			// },



			//  萤石第一个参数 nvrDeviceSerial
			//	channelNo 默认1
			// ezvizAccountId  ezvizAccountId
			// 3. 获取萤石云播放URL
			// etEzNewLiveAddress() {
			// 	this.$http(`/etEzNewLiveAddress?deviceSerial=${}&channelNo=${}ezvizAccountId=${}`,"POST",{},false).then(res=>{
			// 		console.log(res)
			// 	})
			// }

			// 获取海康播放url   ehome/camera/previewurl/{protocol}/{indexCode
			//  protocol 默认值
			//  indexCode对应  cameraIndexCode


		},
		onLoad(options) {
			console.log(options)
			this.project.projectId = options.projectId;
			this.project.projectName = options.projectName;
			this.show();
			// this.etEzNewLiveAddress()
		}
	}
</script>

<style lang="scss" scoped>

// width: 690px;
// height: 60px;
// background: #FFFFFF;
// border: 1px solid #333333;
// opacity: 0.4;
// border-radius: 30px;
// u-search searchs
// ::v-deep u-search .searchs{
// 	margin: 0 auto;
// }
	.video {
		.header{
			::v-deep span {
				color: #FFFFFF;
			}
		}
		.list {
			.searchs{
				width: 690rpx;
				height: 60rpx;
				background: #FFFFFF;
				border: 1rpx solid #333333;
				opacity: 0.4;
				border-radius: 30rpx;
			}
			.ipt {
				margin: 30rpx auto;
				width: 690rpx;
				height: 60rpx;
				background: #FFFFFF;
				padding-left: 24rpx;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #333333;
				opacity: 0.8;
				border: 1rpx solid #333333;
				opacity: 0.4;
				border-radius: 30rpx;
			}

			.videolist {
				.item {
					position: relative;
					width: 729rpx;
					margin: 0 auto;
					height: 379rpx;

					.imgs {
						width: 100%;
						height: 100%;
					}

					.mask {
						position: absolute;
						left: 19rpx;
						bottom: 20rpx;
						width: 690rpx;
						height: 60rpx;
						background: #000000;
						opacity: 0.6;
						border-radius: 0px 0px 10rpx 10rpx;
					}

					.mask-name {
						position: absolute;
						left: 39rpx;
						bottom: 34rpx;
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #FFFFFF;
					}
				}

			}
		}
	}
</style>
