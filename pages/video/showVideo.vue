<template>
	<view class="video">
		<twoNavbar :name="project.projectName"></twoNavbar>
		<!-- 视频展示 -->
		<view class="list">
			<!-- 搜索框 -->
			<view style="padding:30upx 30upx 0">
				<u-search class="searchs" v-model="seach" @search="handsearch" shape="round" height="50" bgColor="#ffffff" searchIconColor="#333333" :showAction="false"></u-search>
			</view>
			<view class="videolist">
				<view class="item" v-for="(item, index) in showList" :key="index" @click="videodetail(item)">
					<image class="imgs" src="../../static/video/detailVideo.png" mode=""></image>
					<view class="mask"></view>
					<span class="mask-name">{{ item.ipcName }}</span>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
import navBar from '../../components/navBar/navBar.vue';
import twoNavbar from '../../components/TwoNavbar/TwoNavbar.vue';
import { request } from '../../utils/request.js';
export default {
	components: {
		navBar,
		twoNavbar
	},
	data() {
		return {
			seach: '',
			project: {
				projectId: '',
				projectName: ''
			},
			ehomeList: [],
			flag: false,
			etEznew: '',
			showList: [],
			rawList: []
		};
	},
	methods: {
		handsearch(val) {
			if (this.rawList) {
				this.showList = this.rawList;
				if (val) {
					let result = [];
					this.showList.forEach(e => {
						let pName = e.ipcName;
						if (pName.indexOf(val) > -1) {
							result.push(e);
						}
					});
					this.showList = result;
				}
			}
		},
		videodetail(item) {
			// if(item.)
			if (item.cameraIndexCode) {
				uni.navigateTo({
					url: `/pages/video/detailVideo?ezv=${0}&camera=${item.cameraIndexCode}&names=${item.ipcName}&ipcId=${item.ipcId}`
				});
			} else if (item.ezvizAccountId) {
				uni.navigateTo({
					url: `/pages/video/detailVideo?ezv=${1}&nvr=${item.nvrDeviceSerial}&ezviz=${item.ezvizAccountId}&names=${item.ipcName}&channel=${item.channel}`
				});
			} else {
				uni.showToast({
					title: '获取播放地址失败',
					icon: 'none'
				});
			}
		},
		back() {
			uni.navigateBack({
				delta: 2
			});
		},
		// 2. 获取特定项目下的摄像头列表
		show() {
			this.$http(
				'/camera/project/show',
				'POST',
				{
					projectId: this.project.projectId
				},
				false
			)
				.then(res => {
					console.log(res);
					if (res.code == 0) {
						this.rawList = res.projectInfoEntities[0].cameraEntities;
						this.showList = res.projectInfoEntities[0].cameraEntities;
					}
				})
				.catch(err => {
					console.log(err);
				});
		}
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
};
</script>

<style lang="scss" scoped>
.video {
	overflow: hidden;

	.list {
		.searchs {
			width: 92vw;
			margin: 0 auto;
			height: 60upx;
			background: #ffffff;
			border: 1upx solid #333333;
			opacity: 0.4;
			border-radius: 30upx;
		}

		.ipt {
			margin: 30upx auto;
			width: 92vw;
			height: 60upx;
			background: #ffffff;
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
					color: #ffffff;
				}
			}
		}
	}
}
</style>
