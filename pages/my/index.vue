<template>
	<view style="height: 100%;background-color: #F2F2F2;">
		
		<uni-nav-bar :fixed="true" statusBar="false"  color="#fff" backgroundColor="#11B38C" left-text="我的" right-icon="scan" @clickRight="scan" />
		
		<view class="my">
			
			<view class="info">
				<view class="name">
					<view style="font-size: 40rpx;">
						{{user.name}} <text style="font-size: 35rpx;">&nbsp;&nbsp; （{{user.role}})</text>
					</view>
					<uni-icons @click="quit" size="28" style="color: #838383;" type="loop"></uni-icons>
				</view>
				<view class="phone" style="margin-top: 20rpx;">
					<text>手机：{{user.phone}}</text>
				</view>
				<view class="role-info" style="margin-top: 20rpx;">
					<text>{{user.position}}</text>
				</view>
			</view>
			
			<view class="image">
				<view style="margin-left: 30rpx;text-align: center;">
					<view><image style="width: 55px; height: 55px;" mode="aspectFill" src="../../static/my/messsage.png" ></image></view>
					<text>消息</text>
				</view>
				<view style="margin-left: 60rpx;text-align: center;">
					<view> <image style="width: 55px; height: 55px;" mode="aspectFill" src="../../static/my/remark.png" ></image></view>
					<text>评论</text>
				</view>
				<view style="margin-left: 60rpx; text-align: center;">
					<view><image style="width: 55px; height: 55px;" mode="aspectFill" src="../../static/my/technicalSupportss.png" ></image></view>
					<text>技术支持</text>
				</view>
			</view>
			
			<view class="app-plug">
				
				<view style="padding-bottom: 8px;">
					<uni-icons size="22" color="#54AB54" type="reload"></uni-icons> <text style="margin-left: 20rpx;">检查更新</text>
				</view>
				<view style="border-top: 1px solid #F2F2F2; padding-bottom: 8px;padding-top: 8px;">
					<uni-icons size="22" color="#FD9B07" type="paperplane-filled"></uni-icons> <text style="margin-left: 20rpx;">分享</text>
				</view>
				<view style="border-top: 1px solid #F2F2F2 ;padding-bottom: 8px;padding-top: 8px;display: flex; align-items: center;justify-content: space-between;">
					<view>
						<uni-icons size="22" color="#9E9E9E" type="trash-filled"></uni-icons> <text style="margin-left: 20rpx;">清除缓存</text>
					</view>
					<view>
						<text style="font-size: 28rpx;color: #868686;">0.0KB</text>
						<uni-icons type="right"></uni-icons>	
					</view>
				</view>
				<view style="border-top: 1px solid #F2F2F2 ;padding-top: 8px;display: flex; align-items: center;justify-content: space-between;">
					<view>
						<uni-icons size="22" color="#515151" type="info"></uni-icons> <text style="margin-left: 20rpx;">关于智慧安质平台</text>
					</view>
					<uni-icons type="right"></uni-icons>
				</view>
				
			</view>
		
		</view>
		
	</view>
	
</template>

<script>
	export default {
		components:{},
		data() {
			return {
				user:{
					name:"苏长斌",
					role:"公司领导",
					phone:"18501017309",
					position:"低碳城市南京鲁能地产有限公司公司领导"
				}
			}
		},
		onLoad() {
	
		},
		methods: {
			scan() {
				uni.showToast({
					title: '扫码'
				})
			},
			quit(){
				uni.showModal({
					title: '提示',
					content: '确定要退出当前用户？',
					success: function (res) {
						if (res.confirm) {
							uni.navigateTo({
								url: '../login/index'
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
				
			}
		}
	}
</script>

<style scoped>
	.name{
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.info{
		background-color: #FFFFFF;
		margin-top: 40rpx;
		padding: 30rpx;
		font-size: 28rpx;
		box-shadow: 10rpx 10rpx 10rpx #D8D8D8;
		border-radius: 15rpx;
	}
	.image{
		display: flex;
		box-shadow: 10rpx 10rpx 10rpx #D8D8D8;
		background-color: #FFFFFF;
		color: #929292;
		margin-top: 40rpx;
		padding: 30rpx;
		border-radius: 15rpx;
	}
	.app-plug{
		background-color: #FFFFFF;
		box-shadow: 10rpx 10rpx 10rpx #D8D8D8;
		padding: 30rpx;
		margin-top: 40rpx;
		border-radius: 15rpx;
	}
	.my{
		margin: 40rpx;
	}
	>>> .uni-navbar__header[data-v-6bda1a90]{
		height: 110rpx;
		line-height: 110rpx;
	}
	>>> .uni-navbar__header-btns-left[data-v-6bda1a90]{
		margin-left: 10rpx;
		width: 170rpx;
	}
	>>> .uni-navbar__content_view[data-v-6bda1a90] uni-text span{
		font-size: 38rpx !important;
	}
	>>> .uni-navbar__content_view[data-v-6bda1a90] uni-text{
		font-size: 55rpx !important;
	}
</style>
