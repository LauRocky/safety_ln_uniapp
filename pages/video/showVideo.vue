<template>
	<view class="video">
		<twoNavbar :name="project.projectName"></twoNavbar>
		<!-- 视频展示 -->
		<view class="list">
			<!-- 搜索框 -->
			<view style="padding:30upx 30upx 0">
				<u-search class="searchs" v-model="seach" @search="handsearch" shape="round" height="50" bgColor="#ffffff" searchIconColor="#333333" :showAction="false"></u-search>
			</view>
			<view v-if="this.showList.length == 0"><image class="kong" src="../../static/danger/kong.png" mode=""></image></view>
			<view class="videolist" v-else>
				<view class="item" v-for="(item, index) in showList" :key="index" @click="videodetail(item)">
					<text class="item-status">
						<view class="item-color" v-if="item.status == 0" style="background-color:#E43D33;"></view>
						<view class="item-color" v-else></view>
						{{ item.status == 0 ? '不在线' : '在线' }}
					</text>
					<image class="imgs" :src="item.image" mode="" @error="img" :data-index="index"></image>
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
			showImg: require('../../static/video/detailVideo.png'),
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
		img(e) {
			console.log(e);
			const index = e.target.dataset.index;
			this.showList[index].image = this.showImg;
		},
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
			// console.error(JSON.stringify(item));
			// 如果设备处于离线,弹出提示,不让他跳转
			if (item.status == 0) {
				uni.showToast({
					title: '当前设备离线',
					icon: 'none'
				});
			} else {
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
						console.log('da', this.showList);
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
				width: 92vw;
				margin: 20upx auto;
				height: 379upx;
				.imgs {
					width: 100%;
					height: 100%;
					border-radius: 10upx;
				}

				.mask {
					position: absolute;
					// left: 19upx;
					bottom: 0;
					width: 92vw;
					height: 60upx;
					background: #000000;
					opacity: 0.6;
					border-radius: 0px 0px 10upx 10upx;
				}

				.mask-name {
					position: absolute;
					left: 30upx;
					bottom: 12upx;
					font-size: 28upx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #ffffff;
				}
				.item-status {
					position: absolute;
					right: 0upx;
					top: 0upx;
					z-index: 5;
					width: 110upx;
					height: 50upx;
					font-family: PingFang SC;
					font-size: 24upx;
					font-weight: bold;
					color: #ffffff;
					line-height: 50upx;
					text-align: center;
					border-radius: 10upx;
					background-color: rgba(0, 0, 0, 0.3);
					.item-color {
						position: absolute;
						top: 20upx;
						left: 4upx;
						width: 10upx;
						height: 10upx;
						border-radius: 50%;
						background-color: #00b48f;
					}
				}
			}
		}
		.kong {
			position: fixed;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}
	}
}
</style>
