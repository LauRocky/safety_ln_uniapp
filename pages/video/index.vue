<template>
	<view>
		<u-navbar :fixed="true" :placeholder="true" :safeAreaInsetTop="true" bgColor="#11B38C" leftIcon="">
			
			<view class="u-nav-left"slot="left">
				视频名称
			</view>
			
			<view class="u-nav-right" slot="right">
				 <u-search  shape="round" height="50" bgColor="#ffffff" :showAction="false"></u-search>
			</view>
			
		</u-navbar>
		
		<view class="video">
			<view class="video-item" v-for="(item,index) in dataList">
				<view class="ball"><text>{{item.name.substring(0,1)}}</text></view>
				<view class="main">
					
					<view style="display: flex; align-items: center;justify-content: space-between; color: #737373;font-size: 33rpx;">
							<text style="margin-left: 20rpx;font-weight: 900;">{{item.name}}</text>
							<uni-icons size="20" color=" #737373" type="right"></uni-icons>
					</view>
					
					<view style="margin-top: 15rpx;font-size: 28rpx;color: #7D7D7D;">
						<text style="margin-left: 20rpx;"><uni-icons type="videocam-filled" color=" #7D7D7D;"></uni-icons>监控数量: {{item.videocam}}</text>
						<text style="margin-left: 20rpx;"><uni-icons type="camera-filled" color=" #7D7D7D;"></uni-icons>单兵数量: {{item.camera}}</text>
					</view>
					
				</view>
			</view>
		</view>
		
	</view>
	
</template>

<script>
	export default {
		components:{},
		data(){
			return {
				dataList:[{
					name:"鲁能领秀城花山峪B地块",
					videocam:0,
					camera:0
				},{
					name:"鲁能领秀城花山峪B地块",
					videocam:0,
					camera:0
				},{
					name:"鲁能领秀城花山峪B地块",
					videocam:0,
					camera:0
				},]
			}
		},
		onLoad() {
			
		},
		methods: {
			search() {
				uni.showToast({
					title: '搜索'
				})
			},
		},
		
	}
</script>

<style scoped>
	.u-nav-left{
		color: #FFFFFF;
		font-weight: 550;
	}
	.video{
		margin-top: 25rpx;
	}
	.main{
		width: 80%;
	}
	.ball{
		background-color: #03B293;
		width: 20%;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #FFFFFF;
		font-size: 40rpx;
		width: 100rpx;
		height: 100rpx;
		border-radius: 50px;
	}
	.video-item{
		display: flex;
		padding: 40rpx;
		padding-top: 20rpx;
		padding-right: 10rpx;
	}
</style>
