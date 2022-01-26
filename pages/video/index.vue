<template>
	<view>
		<u-navbar :fixed="true" :placeholder="true" :safeAreaInsetTop="true" bgColor="#11B38C" leftIcon="">
			<view class="u-nav-right" slot="right"><nav-bar :title="title" @seach="handseach" @Upqie="handUpqie"></nav-bar></view>
		</u-navbar>
		<view class="video">
			<view class="video-item" v-for="(item, index) in videoList" :key="item.projectId" @click="video(item)">
				<view class="ball">
					<text>{{ item.projectName.substring(0, 1) }}</text>
				</view>
				<view class="main">
					<view class="main-item">
						<text class="main-text">{{ item.projectName }}</text>
						<uni-icons size="20" color=" #737373" type="right"></uni-icons>
					</view>
					<view class="main-item1">
						<text class="item1-text">
							<image src="../../static/video/jiankong.png" mode=""></image>
							监控数量: {{ item.MonitorMumber }}
						</text>
						<text class="item1-text">
							<image src="../../static/video/danbing.png" mode=""></image>
							单兵数量: {{ item.individual }}
						</text>
					</view>
				</view>
			</view>
		</view>
		<mypicker :show="show" @handcompany="handcompany" @close="handclose" @deSelect="deSelect" />
	</view>
</template>

<script>
import navBar from '../../components/navBar/navBar.vue';
import mypicker from '../../components/mypicker/mypicker.vue';
import { is_iOS } from '../../utils/utils.js';
export default {
	components: {
		navBar,
		mypicker
	},
	data() {
		return {
			title: '所有城市',
			show: false,
			videoList: [],
			dataList: []
		};
	},
	onBackPress(e) {
		if (is_iOS()) {
			return;
		}
		uni.showModal({
			content: '是否要退出应用？',
			confirmText: '确定',
			cancelText: '取消',
			success: function(res) {
				if (res.confirm) {
					uni.sendNativeEvent('colseapp', res => {
						console.log(res);
					});
				} else if (res.cancel) {
				}
				return true;
			}
		});
		return true;
	},
	methods: {
		deSelect() {
			this.title = '所有城市';
			this.show = false;
			this.getCompanySelectData();
		},
		handUpqie() {
			this.show = true;
		},
		handclose() {
			this.show = false;
		},
		handcompany(v) {
			this.title = v.name;
			this.show = false;
			uni.showLoading({
				title: '加载中',
				mask: true
			});
			this.$http(
				'/getCompanyProjectWithCameraNew',
				'POST',
				{
					companyId: v.companyId
				},
				false
			)
				.then(res => {
					console.log(res);
					if (res.code == 0) {
						uni.hideLoading();
						res.data.forEach(el => {
							el.individual = 0;
							el.MonitorMumber = 0;
							el.cameraEntities.forEach(e => {
								if (e.ipcType == 3) {
									el.individual += 1;
								} else {
									el.MonitorMumber += 1;
								}
							});
						});
						this.dataList = res.data;
						this.videoList = this.dataList;
					} else {
						uni.showLoading({
							title: '加载失败',
							mask: true
						});
					}
				})
				.catch(err => {
					console.log(err);
				});
		},
		video(e) {
			if (e.cameraEntities.length != 0) {
				uni.navigateTo({
					url: `/pages/video/showVideo?projectId=${e.projectId}&projectName=${e.projectName}`
				});
			} else {
				uni.showToast({
					title: '当前没有监控',
					icon: 'none'
				});
			}
		},
		// 获取当前公司下所有项目
		getCompanySelectData() {
			uni.showLoading({
				title: '加载中',
				mask: true
			});
			this.$http(
				'/getCompanyProjectWithCameraNew',
				'POST',
				{
					companyId: JSON.parse(uni.getStorageSync('userInfo')).companyId
				},
				false
			)
				.then(res => {
					console.log(res);
					if (res.code == 0) {
						uni.hideLoading();
						res.data.forEach(el => {
							el.individual = 0;
							el.MonitorMumber = 0;
							el.cameraEntities.forEach(e => {
								if (e.ipcType == 3) {
									el.individual += 1;
								} else {
									el.MonitorMumber += 1;
								}
							});
						});
						this.dataList = res.data;
						this.videoList = this.dataList;
					} else {
						console.log(res);
					}
				})
				.catch(err => {
					console.log(err);
				});
		},
		//模糊查询
		handseach(val) {
			if (this.dataList) {
				this.videoList = this.dataList;
				if (val) {
					let result = [];
					this.videoList.forEach(e => {
						let pName = e.projectName;
						if (pName.indexOf(val) > -1) {
							result.push(e);
						}
					});
					this.videoList = result;
				}
			}
		}
	},
	onLoad() {
		this.getCompanySelectData();
	}
};
</script>

<style scoped>
.main-item {
	display: flex;
	align-items: center;
	justify-content: space-between;
	color: #737373;
	font-size: 33upx;
}

.main-text {
	margin-left: 20upx;
	font-weight: 900;
}

.main-item1 {
	margin-top: 15upx;
	font-size: 28upx;
	color: #7d7d7d;
}

.item1-text image {
	width: 30upx;
	height: 30upx;
}

.item1-text {
	margin-left: 20upx;
	font-family: PingFang SC;
}

.u-nav-left {
	color: #ffffff;
	font-weight: 550;
}

.video {
	margin-top: 25upx;
	padding-bottom: 80upx;
}

.main {
	width: 82%;
	padding-bottom: 20upx;
	border-bottom: 2upx solid rgba(188, 188, 188, 0.2);
}

.ball {
	background-color: #03b293;
	width: 20%;
	display: flex;
	justify-content: center;
	align-items: center;
	color: #ffffff;
	font-size: 40upx;
	width: 100upx;
	height: 100upx;
	border-radius: 50upx;
}

.video-item {
	display: flex;
	padding: 20upx 0upx 10upx 30upx;
}
</style>
