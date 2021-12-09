<template>
	<view class="home">
		<u-navbar :fixed="true" :placeholder="true" :safeAreaInsetTop="true" bgColor="#11B38C" leftIcon="">
			<view class="u-nav-left" slot="left"  style="color: #FFFFFF;font-size: 36upx;font-weight: bold;">首页</view>
			<view class="u-nav-right" slot="right"><image @click="handscanCode" src="../../static/home/sao.png" style="width: 50upx;height: 50upx;margin-top: 10upx;" mode=""></image></view>
		</u-navbar>
		<image class="home-img" src="../../static/banner.png" mode=""></image>
		<view class="main">
			<view class="main-top">
				<u-tabs lineColor="#00B490" lineWidth="60" :activeStyle="{ color: '#00B490' }" :scrollable="false" :list="list1" @click="click"></u-tabs>
				<view class="main-scroll">
					<scroll-view class="scroll" @scrolltolower="handtolower" scroll-y>
						<view v-for="(item, index) in indexList" :key="index">
							<view class="main-all">
								<view class="main-left">
									<view class="main-yuan"></view>
									<view class="main-sao">{{ item.name }}</view>
								</view>
								<view class="main-right">{{ item.time }}</view>
							</view>
						</view>
					</scroll-view>
				</view>
				<view class="look">查看更多 (15)</view>
			</view>
			<view class="main-cet main-top">
				<view class="title">隐患数据</view>
				<view class="zho">
					<view class="zho-1">
						<view class="zho-he">
							<view class="fa">发现</view>
							<view class="nums">8</view>
						</view>
						<view class="zho-text">今日+0</view>
					</view>
					<view class="zho-1">
						<view class="zho-he zho-he2">
							<view class="fa">发现</view>
							<view class="nums">8</view>
						</view>
						<view class="zho-text">今日+0</view>
					</view>
					<view class="zho-1">
						<view class="zho-he zho-he3">
							<view class="fa">发现</view>
							<view class="nums">8</view>
						</view>
						<view class="zho-text">今日+0</view>
					</view>
					<view class="zho-1">
						<view class="zho-he zho-he4">
							<view class="fa">发现</view>
							<view class="nums">8</view>
						</view>
						<view class="zho-text">今日+0</view>
					</view>
				</view>
			</view>
			<view class=""><barecharts /></view>
		</view>
	</view>
</template>

<script>
import { scanCode } from '../../utils/utils.js';
import barecharts from '../../components/barecharts/barecharts.vue';

export default {
	components: {
		barecharts
	},
	data() {
		return {
			list1: [
				{
					name: '待办事项',
					value: '1'
				},
				{
					name: '预警提醒',
					value: '2'
				},
				{
					name: '消息通知',
					value: '3'
				},
				{
					name: '公告',
					value: '4'
				}
			],
			indexList: [
				{
					name: '12313',
					value: '123123',
					time: '2021-10-22'
				},
				{
					name: '12313',
					value: '123123',
					time: '2021-10-22'
				},
				{
					name: '12313',
					value: '123123',
					time: '2021-10-22'
				},
				{
					name: '12313',
					value: '123123',
					time: '2021-10-22'
				},
				{
					name: '12313',
					value: '123123',
					time: '2021-10-22'
				},
				{
					name: '12313',
					value: '123123',
					time: '2021-10-22'
				},
				{
					name: '12313',
					value: '123123',
					time: '2021-10-22'
				}
			]
		};
	},
	onLoad() {},
	methods: {
		handscanCode(){
			scanCode();
		},
		handtolower() {
			console.log('12321312');
		},
		click(item) {
			console.log('item', item);
		}
	},

};
</script>

<style lang="less" scoped>
.home {
	width: 100vw;
	height: 100%;
	.home-img {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		width: 100vw;
		height: 322upx;
		z-index: -1;
	}
	.main {
		padding: 20upx;
		.main-top {
			background: #ffffff;
			box-shadow: 0px 0px 11px 0px rgba(0, 0, 0, 0.06);
			border-radius: 16upx;
			.main-scroll {
				padding: 40upx 20upx;
				.scroll {
					height: 30vh;
				}
				.main-all {
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding-bottom: 48upx;
					.main-left {
						display: flex;
						align-items: center;
						.main-yuan {
							width: 16upx;
							height: 16upx;
							background: #00b490;
							border-radius: 50%;
							margin-right: 12upx;
						}
						.main-sao {
							font-size: 28upx;
							font-family: PingFang SC;
							font-weight: 500;
							color: #333333;
						}
					}
					.main-right {
						font-size: 26upx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #333333;
					}
				}
			}
			.look {
				padding: 0 0 20upx 20upx;
				font-size: 30upx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #00b490;
			}
		}
		.main-cet {
			padding: 26upx 22upx;
			margin-top: 20upx;
			.title {
				font-size: 32upx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #333333;
			}
			.zho {
				padding-top: 20upx;
				display: flex;
				justify-content: space-around;
				.zho-1 {
					text-align: center;
					.zho-he {
						color: #ff0000;
						width: 120upx;
						height: 120upx;
						border: 8upx solid #ff0000;
						border-radius: 50%;
						.fa {
							padding-top: 30upx;
							font-size: 24upx;
							font-family: Source Han Sans CN;
							font-weight: 500;
						}
					}
					.zho-he2 {
						color: #46df89;
						border: 8upx solid #46df89;
					}
					.zho-he3 {
						color: #f9bc45;
						border: 8upx solid #f9bc45;
					}
					.zho-he4 {
						color: #58b7e7;
						border: 8upx solid #58b7e7;
					}
					.zho-text {
						padding-top: 23upx;
						font-size: 28upx;
						font-family: Source Han Sans CN;
						font-weight: 400;
						color: #333333;
					}
				}
			}
		}
	}
}
</style>
