<template>
	<view class="about">
		<!-- 关于 -->
		<view class="headerTop">
			<u-navbar :title="about.name" :fixed="true" :placeholder="true" :safeAreaInsetTop="true" bgColor="#11B38C"
				@leftClick="back" color="#ffffff">
			</u-navbar>
		</view>
		<view class="body">
			<image class="body-img" src="../../static/my/zhihui.png" mode=""></image>
			<view class="body-title">
				智慧安质平台
			</view>
			<view class="about-http">
				https://esq.cgdg.com/
			</view>
			<view class="version">
				{{versions}}
			</view>
		</view>
	</view>
</template>
<script>
	let App = getApp()
	export default {
		data() {
			return {
				versions: '',
				about: {
					name: '关于',		
				},
			};
		},
		methods: {
			back() {
				uni.navigateBack({
					delta: 1
				});
			},
		},
		onLoad() {
			// #ifdef APP-PLUS
			plus.runtime.getProperty(plus.runtime.appid,(wgtinfo)=>{
				this.versions=wgtinfo.version
			})
			// #endif
		}
	}
</script>
<style lang="scss" scoped>
	.about {
		.headerTop {
			::v-deep span {
				color: #FFFFFF;
				font-weight: bold;
			}
		}
		.body {
			width: 319upx;
			margin: 0 auto;
			margin-top: 188upx;
			text-align: center;

			.body-img {
				width: 171upx;
				height: 171upx;
			}

			.body-title {
				font-size: 40upx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #333333;
			}

			.about-http {
				margin-top: 18upx;
				font-size: 30upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #666666;
			}

			.version {
				margin-top: 18upx;
				font-size: 30upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #666666;
			}
		}
	}
</style>
