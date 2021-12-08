<template>
	<view>
		
		<u-navbar :fixed="true" :safeAreaInsetTop="true"
			:placeholder="true" bgColor="#11B38C" 
			leftIcon="" leftText="隐患列表" rightIcon="search"
			 @rightClick="search">
		 
		 </u-navbar>
		 
		<!-- <uni-nav-bar :fixed="true" statusBar="false"  color="#fff" backgroundColor="#11B38C">
				<view class="input-item" v-show="!showTitle">
					<input type="text" :value="dangerName" />
				</view>
			    <view slot="left" style="font-size: 38rpx;" v-show="showTitle">隐患列表</view>
			    <view slot="right" style="color: #FFFFFF;">
					<uni-icons type="search" color="#fff" @click="search()"></uni-icons>
				</view>
		</uni-nav-bar> -->
				
		<view class="end-title">
		　　<view @tap="change(0)" :class="{btna:btnnum == 0}">全部</view>
		  　<view @tap="change(1)" :class="{btna:btnnum == 1}">我的</view>
		</view>
		
		<view class="end-cont" :class="{dis:btnnum == 0}">
		 　　0信息
		</view>
		
		<view class="end-cont" :class="{dis:btnnum == 1}">
		 　　1信息
		</view>
		
	</view>
	
</template>

<script>
	export default {
		components:{},
		data(){
			return {
				 btnnum: 0,
				 dangerName:'',
				 showTitle:true
			}
		},
		onLoad() {
			
		},
		methods: {
			change(e) {
				this.btnnum = e
			},
			search() {
				uni.showToast({
					title: '搜索'
				})
			},
		},
		
	}
</script>

<style scoped>
	>>> .u-navbar__content__left__text{
		color: #FFFFFF !important;
		font-size:40rpx;
		margin-left: 22rpx;
	}
	>>> .u-icon__icon{
		color: #FFFFFF !important;
		font-size: 60rpx !important;
		margin-right: 22rpx;
	}
	.input-item{
		background-color: #FFFFFF;
		color: #000000; 
		border-radius: 50px;
		height: 45rpx;
		width: 300rpx;
	}
	/* 将三个内容view的display设置为none(隐藏) */
	.end-title{
		display: flex;
		color: #707070;
		height: 50px;
		line-height: 50px;
		font-weight: 750;
		background-color: #F2F2F2;
	}
	.end-title view{
		flex-grow: 1;
		text-align: center;
	}
	.end-cont{
		display: none;
		background: #C8C7CC;
	}
	.btna{
		color: #000000;
		border-bottom: 3px solid #2297F4;
	}
	.dis{
		display: block;
	}
</style>
