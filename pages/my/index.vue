<template>
	<view>
		<u-navbar :fixed="true" style="display:flex;align-items: center;color: #FFFFFF;" :placeholder="true" :safeAreaInsetTop="true" bgColor="#11B38C" leftIcon="">
			<view class="u-nav-left" style="color: #FFFFFF;font-size: 36upx;font-weight: bold;" slot="left">首页</view>
			<view class="u-nav-right" slot="right"><image @click="handscanCode" src="../../static/home/sao.png" style="width: 50upx;height: 50upx;margin-top: 10upx;" mode=""></image></view>
		</u-navbar>
		<view class="my">
			<view class="info">
				<view class="name">
					<view style="font-size: 40rpx;">
						{{ user.fullname }}
						<text v-if="user.role" style="font-size: 35rpx;"> （{{ user.role }})</text>
					</view>
					<uni-icons @click="quit" size="28" style="color: #838383;" type="loop"></uni-icons>
				</view>
				<view class="phone" style="margin-top: 20rpx;">
					<text>手机：{{ user.mobile }}</text>
				</view>
				<view class="role-info" style="margin-top: 20rpx;">
					<text>{{ user.position }}</text>
				</view>
			</view>

			<view class="image">
				<view style="margin-left: 30rpx;text-align: center;">
					<view><image style="width: 55px; height: 55px;" mode="aspectFill" src="../../static/my/messsage.png"></image></view>
					<text>消息</text>
				</view>
				<view style="margin-left: 60rpx;text-align: center;">
					<view><image style="width: 55px; height: 55px;" mode="aspectFill" src="../../static/my/remark.png"></image></view>
					<text>评论</text>
				</view>
				<view style="margin-left: 60rpx; text-align: center;">
					<view><image style="width: 55px; height: 55px;" mode="aspectFill" src="../../static/my/technicalSupportss.png"></image></view>
					<text>技术支持</text>
				</view>
			</view>

			<view class="app-plug">
				<view style="padding-bottom: 8px;">
					<uni-icons size="22" color="#54AB54" type="reload"></uni-icons>
					<text style="margin-left: 20rpx;">检查更新</text>
				</view>
				<view style="border-top: 1px solid #F2F2F2; padding-bottom: 8px;padding-top: 8px;">
					<uni-icons size="22" color="#FD9B07" type="paperplane-filled"></uni-icons>
					<text style="margin-left: 20rpx;">分享</text>
				</view>
				<view style="border-top: 1px solid #F2F2F2 ;padding-bottom: 8px;padding-top: 8px;display: flex; align-items: center;justify-content: space-between;">
					<view>
						<uni-icons size="22" color="#9E9E9E" type="trash-filled"></uni-icons>
						<text style="margin-left: 20rpx;">清除缓存</text>
					</view>
					<view>
						<text style="font-size: 28rpx;color: #868686;">0.0KB</text>
						<uni-icons type="right"></uni-icons>
					</view>
				</view>
				<view style="border-top: 1px solid #F2F2F2 ;padding-top: 8px;display: flex; align-items: center;justify-content: space-between;">
					<view>
						<uni-icons size="22" color="#515151" type="info"></uni-icons>
						<text style="margin-left: 20rpx;">关于智慧安质平台</text>
					</view>
					<uni-icons type="right"></uni-icons>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { scanCode } from '../../utils/utils.js';
export default {
	components: {},
	data() {
		return {
			user: JSON.parse(uni.getStorageSync('user'))
		};
	},
	onLoad() {
	},
	methods: {
		handscanCode(){
			const that = this;
			uni.scanCode({
				onlyFromCamera: true,
				success: function(res) {
					let userInfo = JSON.parse(uni.getStorageSync("userInfo"));
					userInfo.cacheKey = res.result.split("|")[1];
					that.$http('/loginAppWithQrcode', 'POST', userInfo, false)
						.then(resp => {
							uni.showToast({
								icon: 'none',
								title: '登录成功',
								duration: 1500
							})
						}).catch(err => {
							uni.showToast({
								title:'登录失败，请刷新二维码或稍后重试',
								duration:1500
							})
						})
				}
			})
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
						uni.removeStorageSync('user');
						uni.removeStorageSync('token');
						uni.navigateTo({
							url: '../login/index'
						});
					} else if (res.cancel) {
						console.log('用户点击取消');
					}
				}
			});
		}
	}
};
</script>

<style scoped>
.name {
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.info {
	background-color: #ffffff;
	margin-top: 40rpx;
	padding: 30rpx;
	font-size: 28rpx;
	box-shadow: 10rpx 10rpx 10rpx #d8d8d8;
	border-radius: 15rpx;
}
.image {
	display: flex;
	box-shadow: 10rpx 10rpx 10rpx #d8d8d8;
	background-color: #ffffff;
	color: #929292;
	margin-top: 40rpx;
	padding: 30rpx;
	border-radius: 15rpx;
}
.app-plug {
	background-color: #ffffff;
	box-shadow: 10rpx 10rpx 10rpx #d8d8d8;
	padding: 30rpx;
	margin-top: 40rpx;
	border-radius: 15rpx;
}
.my {
	margin: 40rpx;
}
>>> .u-navbar__content__left__text {
	color: #ffffff !important;
	font-size: 40rpx;
	margin-left: 22rpx;
}
>>> .u-icon__icon {
	color: #ffffff !important;
	font-size: 60rpx !important;
	margin-right: 22rpx;
}
</style>
