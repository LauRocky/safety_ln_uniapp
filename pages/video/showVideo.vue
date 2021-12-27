<template>
	<view class="video">
			<twoNavbar :name="project.projectName"></twoNavbar>
		<!-- 视频展示 -->
		<view class="list">
			<!-- 搜索框 -->
			<view style="padding:30upx 30upx 0">
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
	import twoNavbar from '../../components/TwoNavbar/TwoNavbar.vue'
	export default {
		components: {
			navBar,
			twoNavbar
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
				rawList:[],
			};
		},
		methods: {
			handsearch(val) {
				if(val){
					let result=[]
					this.showList.cameraEntities.forEach(e=>{
						let pName=e.ipcName;
						if(pName.indexOf(val)>-1){
							result.push(e)
							console.log(result)
						}
					})
					this.showList.cameraEntities=result
				}else{
					this.showList=this.rawList
				}
			},
			videodetail(item) {
				if (item.cameraIndexCode) {
					console.log(item)
					uni.navigateTo({
						url: `/pages/video/detailVideo?ezv=${0}&camera=${item.cameraIndexCode}&names=${item.ipcName}`
					})	
				}else if (item.ezvizAccountId) {
					uni.navigateTo({
						url: `/pages/video/detailVideo?ezv=${1}&nvr=${item.nvrDeviceSerial}&ezviz=${item.ezvizAccountId}&names=${item.ipcName}`
					})		
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
					this.rawList=JSON.parse(JSON.stringify(res.projectInfoEntities[0]))
					this.showList = JSON.parse(JSON.stringify(res.projectInfoEntities[0]))
				})
			},
			// 传值方式  this.$http(`/ehome/camera/previewurl/hls/${el.cameraIndexCode}`,'POST',{},false)
			
		},
		onLoad(options) {
			this.project.projectId = options.projectId;
			this.project.projectName = options.projectName;
			// uni.setNavigationBarTitle({
			// 	title:this.project.projectName
			// })
		},
		onShow() {
			this.show();
		}
	}
</script>

<style lang="scss" scoped>
	/deep/.u-navbar {
		.u-icon--right {
			.u-icon__icon {
				color: #ffffff !important;
			}
		}
		.u-navbar__content__title,
		.u-navbar__content__right {
			color: #ffffff !important;
		}
	}
	.video {	
		.list {
			.searchs{
				width: 92vw;
				margin: 0 auto;
				height: 60upx;
				background: #FFFFFF;
				border: 1upx solid #333333;
				opacity: 0.4;
				border-radius: 30upx;
			}
			.ipt {
				margin: 30upx auto;
				width: 92vw;
				height: 60upx;
				background: #FFFFFF;
				padding-left: 24upx;
				font-size: 28upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #333333;
				opacity: 0.8;
				border: 1upx solid #333333;
				opacity: 0.4;
				border-radius: 30upx;
			}

			.videolist {
				.item {
					position: relative;
					width: 97vw;
					margin: 0 auto;
					height: 379upx;
					.imgs {
						width: 100%;
						height: 100%;
					}
					.mask {
						position: absolute;
						left: 19upx;
						bottom: 20upx;
						width: 92vw;
						height: 60upx;
						background: #000000;
						opacity: 0.6;
						border-radius: 0px 0px 10upx 10upx;
					}

					.mask-name {
						position: absolute;
						left: 39upx;
						bottom: 34upx;
						font-size: 28upx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #FFFFFF;
					}
				}

			}
		}
	}
</style>
