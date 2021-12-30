<template>
	<view>
		<u-navbar :fixed="true" style="display:flex;align-items: center;color: #FFFFFF;" :placeholder="true"
			:safeAreaInsetTop="true" bgColor="#11B38C" leftIcon="">
			<view class="u-nav-left" slot="left">我的</view>
			<view class="u-nav-right" slot="right">
				<image @click="handscanCode" src="../../static/home/sao.png" mode=""></image>
			</view>
		</u-navbar>
		<view class="my">
			<view class="info">
				<view class="info-item">
					<image src="../../static/my/detailimg.png" mode=""></image>
				</view>
				<view class="name">
					<view class="name-item">
						{{ user.fullname }}
						<text v-if="user.role" style="font-size: 32upx;"> （{{ user.role }})</text>
					</view>
					<view class="iphone">
						手机:{{user.mobile}}
					</view>
					<view class="company">
						{{deptNames}}
					</view>
				</view>
				<!-- <view class="name-right">
					<image src="../../static/my/fanhui.png" mode=""></image>
				</view> -->
			</view>

			<view class="images">
				<view class="image-item" @click="warning">
					<image class="image-imgs" src="../../static/my/project1.png" mode=""></image>
					<view class="image-text">
						项目预警
					</view>
				</view>
				<view class="image-item" @click="dangerNotice">
					<image class="image-imgs" src="../../static/my/project2.png" mode=""></image>
					<view class="image-text">
						隐患通知
					</view>
				</view>
				<view class="image-item" @click="publicNotice">
					<image class="image-imgs" src="../../static/my/project3.png" mode=""></image>
					<view class="image-text">
						公告
					</view>
				</view>
				<!-- <view class="image-item" @click="skill">
					<image class="image-imgs" src="../../static/my/project4.png" mode=""></image>
					<view class="image-text">
						技术支持
					</view>
				</view> -->
			</view>

			<view class="app-plug" style="margin-top: 20upx;">
				<view class="update" @click="check">
					<image style="width: 50upx;height: 50upx;" src="../../static/my/gengxin.png" mode=""></image>
					<view class="updata-font">检查更新</view>
				</view>
				<!-- <view class="share" @click="share">
					<image style="width: 50upx;height: 50upx;" src="../../static/my/fenxiang.png" mode=""></image>
					<view class="share-font">
						分享</view>
					<image class="share-img" src="../../static/my/erweima.png" mode=""></image>
				</view> -->
				<!-- <u-line ></u-line> -->
				<u-divider :dashed="false" :hairline="false"></u-divider>
				<view class="about" @click="about">
					<image style="width: 50upx;height: 50upx;" src="../../static/my/guanyu.png" mode=""></image>
					<view class="about-font">
						关于</view>
					<image class="about-img" src="../../static/my/fanhui.png" mode=""></image>
				</view>
			</view>
			<view class="exit" @click="quit" style="margin-top: 30upx;">
				退出登录
			</view>
		</view>
		<u-popup :show="show" @close="close" mode="center" round="10">
			<view class="mask">
				<!-- <view class="mask-title">
					技术支持
				</view> -->
				<image @click="back" class="mask-imgs1" src="../../static/my/tuichu.png" mode=""></image>
				<image class="mask-imgs2" src="../../static/my/erji.png" mode=""></image>
				<view class="telephone">
					电话:{{user.mobile}}
				</view>
				<view class="call" @click="callphone">
					拨打
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {
		scanCode
	} from '../../utils/utils.js'
	export default {
		components: {},
		data() {
			return {
				user: JSON.parse(uni.getStorageSync('userInfo')),
				show: false,
				status: 1,
				danger: 2,
				public: 3,
				deptNames: "",
			};
		},
		methods: {
			// 3. 获取登录人部门信息
			deptInfo() {
				this.$http('/lvxin/deptInfo', 'POST', {
					'parentId': this.user.companyId
				}, false).then(res => {
					let deptName = '';
					let array = res.data.reverse();
					for (var i = 0; i < array.length; i++) {
						if (i == 0) {
							continue;
						}
						deptName += array[i].name;
					}
					this.deptNames = deptName;
				})
			},
			// 跳转到项目预警
			warning() {
				uni.navigateTo({
					url: `/pages/home/particulars?status=${this.status}`
				})
			},
			dangerNotice() {
				uni.navigateTo({
					url: `/pages/home/particulars?status=${this.danger}`
				})
			},
			publicNotice() {
				uni.navigateTo({
					url: `/pages/home/particulars?status=${this.public}`
				})
			},
			// 拨打电话
			callphone() {
				uni.makePhoneCall({
					phoneNumber: this.user.mobile.toString()
				})
			},

			// 关闭模态框
			back() {
				this.show = false
			},
			// 个人信息
			info() {
				console.log("info")
				uni.navigateTo({
					url: '/pages/my/personal'
				})
			},
			close() {
				this.show = false
			},
			// 更新
			check() {

				//android 更新
				uni.sendNativeEvent("checkUpdate", res => {
					console.log(res)
				});
			},
			//技术支持
			// skill() {
			// 	this.show = true
			// },
			// 分享
			share() {
				console.log(111)
			},
			// 关于
			about() {
				uni.navigateTo({
					url: '/pages/my/about'
				})
			},
			handscanCode() {
				const that = this;
				uni.scanCode({
					onlyFromCamera: true,
					success: function(res) {
						let userInfo = JSON.parse(uni.getStorageSync('userInfo'));
						userInfo.cacheKey = res.result.split('|')[1];
						that.$http('/loginAppWithQrcode', 'POST', userInfo, false)
							.then(resp => {
								if (resp.code == 0) {
									uni.showToast({
										icon: 'none',
										title: '登录成功',
										duration: 1500
									});
								} else {
									uni.showToast({
										icon: 'none',
										title: '登录失败，请刷新二维码或稍后重试' + resp.msg,
										duration: 1500
									});
								}

							})
							.catch(err => {
								uni.showToast({
									title: '登录失败，请刷新二维码或稍后重试',
									duration: 1500
								});
							});
					}
				});
			},
			scan() {
				uni.showToast({
					title: '扫码'
				});
			},
			quit() {
				uni.showModal({
					title: '提示',
					content: '确定要退出当前用户？',
					success: function(res) {
						if (res.confirm) {
							uni.removeStorageSync('userInfo');
							uni.removeStorageSync('token');
							uni.navigateTo({
								url: '../login/index'
							});
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
		},
		onLoad() {
			this.deptInfo()
		},
		onShow() {
			//刷新用户数据
			this.user = JSON.parse(uni.getStorageSync('userInfo'))
		}
	};
</script>

<style scoped>
	.u-nav-right image {
		width: 50upx;
		height: 50upx;
		margin-top: 10upx;
	}

	.mask {
		position: relative;
		width: 80vw;
		background: url('../../static/my/jishuzhichi.png') no-repeat;
		background-size: 100% 100%;
		height: 60vh;
		border-radius: 5upx;
	}

	.mask .mask-imgs1 {
		position: absolute;
		top: 26upx;
		width: 26upx;
		height: 26upx;
		right: 26upx;
	}

	.mask .mask-imgs2 {
		position: absolute;
		top: 102upx;
		left: 50%;
		width: 164upx;
		height: 184upx;
		transform: translateX(-82upx);
	}

	.mask .mask-title {
		margin-top: 26upx;
		text-align: center;
		font-size: 32upx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #FFFFFF;
		line-height: 24upx;
	}

	.mask .telephone {
		position: absolute;
		left: 162upx;
		bottom: 260upx;
		font-size: 32upx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #333333;
		line-height: 24upx;
	}

	.mask .call {
		position: absolute;
		left: 126upx;
		bottom: 120upx;
		width: 350upx;
		height: 60upx;
		line-height: 60upx;
		text-align: center;
		border: 2upx solid #45A28D;
		border-radius: 10upx;
		font-size: 30upx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #45A28D;
	}

	.u-nav-left {
		color: #FFFFFF;
		font-size: 36upx;
		font-weight: bold;
		font-family: PingFang SC;
	}

	.name {
		margin-left: 53upx;
	}

	.image-item {
		text-align: center;
	}

	.iphone {
		margin-top: 22upx;
		font-size: 26upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #666666;
	}

	.company {
		margin-top: 14upx;
		font-size: 26upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #666666;
	}

	.name-item {
		height: 32upx;
		font-size: 32upx;
		font-weight: bold;
		color: #333333;
		font-family: PingFang SC;
	}

	.name-right {
		position: absolute;
		right: 9upx;
		top: 76upx;
	}

	.name-right image {
		width: 40upx;
		height: 40upx;
	}


	.info {
		display: flex;
		height: 128upx;
		position: relative;
		background-color: #ffffff;
		margin-top: 40upx;
		padding: 24upx;
		padding-bottom: 32upx;
		font-size: 28upx;
		box-shadow: 0px 0px 11upx 0px rgba(0, 0, 0, 0.06);
		border-radius: 15upx;
	}

	.info .info-item {
		width: 128upx;
		height: 128upx;
	}

	.info .info-item image {
		width: 100%;
		height: 100%;
	}

	.images {
		display: flex;
		justify-content: space-around;
		color: #929292;
		width: 90xw;
		height: 240upx;
		background: #FFFFFF;
		box-shadow: 0px 0px 11upx 0px rgba(0, 0, 0, 0.06);
		border-radius: 10upx;
		padding-top: 52upx;
		margin: 0 auto;
		margin-top: 20upx;
	}

	.image-imgs {
		width: 106upx;
		height: 106upx;
	}

	.image-text {
		margin-top: 17upx;
		font-size: 28upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #666666;
	}

	.update {
		display: flex;
	}

	.update .updata-font {
		margin-left: 24upx;
		height: 50upx;
		line-height: 50upx;
		font-size: 28upx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #333333;
	}

	.share {
		position: relative;
		display: flex;
		padding-bottom: 8px;
		padding-top: 8px;
	}

	.share-font {
		margin-left: 24upx;
		height: 50upx;
		line-height: 50upx;
		font-size: 28upx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #333333;
	}

	.share .share-img {
		width: 40upx;
		height: 40upx;
		position: absolute;
		right: 15upx;
		top: 26upx;
	}

	.about {
		display: flex;
		position: relative;
		/* padding-bottom: 8px; */
		/* padding-top: 8px; */
	}


	.about-font {
		margin-left: 24upx;
		height: 50upx;
		line-height: 50upx;
		font-size: 28upx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #333333;
	}

	.about .about-img {
		width: 40upx;
		height: 40upx;
		position: absolute;
		right: 0upx;
		top: 8upx;
	}

	.app-plug {
		background-color: #ffffff;
		box-shadow: 0px 0px 11upx 0px rgba(0, 0, 0, 0.06);
		padding: 26upx 30upx 30upx 35upx;
		border-radius: 15upx;
	}

	.exit {
		margin: 0 auto;
		height: 100upx;
		background: #FFFFFF;
		box-shadow: 0px 0px 11upx 0upx rgba(0, 0, 0, 0.06);
		border-radius: 10upx;
		text-align: center;
		line-height: 100upx;
		font-size: 32upx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #24A98A;
	}

	.my {
		margin: 20upx;
	}

	>>>.u-navbar__content__left__text {
		color: #ffffff !important;
		font-size: 40upx;
		margin-left: 22upx;
	}

	>>>.u-icon__icon {
		color: #ffffff !important;
		font-size: 60upx !important;
		margin-right: 22upx;
	}
</style>
