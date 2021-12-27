<template>
	<view class="home">
		<u-navbar :fixed="true" :placeholder="true" :safeAreaInsetTop="true" bgColor="#11B38C" leftIcon="">
			<view class="u-nav-left" slot="left" style="color: #FFFFFF;font-size: 32upx;font-weight: bold;">首页</view>
			<view class="u-nav-right" slot="right">
				<image @click="handscanCode" src="../../static/home/sao.png"
					style="width: 50upx;height: 50upx;margin-top: 10upx;" mode=""></image>
			</view>
		</u-navbar>
		<image class="home-img" src="../../static/banner.png" mode=""></image>
		<view class="main">
			<view class="main-top">
				<u-tabs lineColor="#00B490" lineWidth="80" :activeStyle="{ color: '#00B490' }" :scrollable="false"
					:list="list1" @click="handtabs"></u-tabs>
				<view class="main-scroll">
					<view class="scroll">
						<view v-for="(item, index) in indexList" :key="index">
							<view class="main-all">
								<view class="main-left">
									<view class="main-yuan"></view>
									<view class="main-sao">{{ item.title }}</view>
								</view>
								<view class="main-right">{{ item.time }}</view>
							</view>
						</view>
					</view>
				</view>
				<view class="look" @click="handGp">查看更多 ({{ totalCount }})</view>
			</view>
			<view class="main-cet main-top">
				<view class="title">隐患数据</view>
				<view class="zho">
					<view class="zho-1">
						<view class="zho-he">
							<view class="fa">发现</view>
							<view class="nums">{{ problem.problemSolve + problem.problemFind + problem.problemRecheck }}
							</view>
						</view>
						<view class="zho-text">今日+{{ problem.problemCntToday }}</view>
					</view>
					<view class="zho-1">
						<view class="zho-he zho-he2">
							<view class="fa">已整改</view>
							<view class="nums">{{ problem.problemSolve }}</view>
						</view>
						<view class="zho-text">今日+{{ problem.problemSolveToday }}</view>
					</view>
					<view class="zho-1">
						<view class="zho-he zho-he3">
							<view class="fa">已复核</view>
							<view class="nums">{{ problem.problemRecheckToday }}</view>
						</view>
						<view class="zho-text">今日+{{ problem.problemRecheckToday }}</view>
					</view>
					<view class="zho-1">
						<view class="zho-he zho-he4">
							<view class="fa">超期</view>
							<view class="nums">{{ problem.expireUnSolve }}</view>
						</view>
						<view class="zho-text"></view>
					</view>
				</view>
			</view>
			<view class="main-cet main-top">
				<view class="title">安全风险分布</view>
				<barecharts />
			</view>
		</view>
	</view>
</template>

<script>
	import {
		scanCode
	} from '../../utils/utils.js';
	import barecharts from '../../components/home/barecharts.vue';
	import upApp from '@/uni_modules/uni-upgrade-center-app/utils/check-update.js';
	export default {
		components: {
			barecharts
		},
		data() {
			return {
				project: {
					projectName: '',
					companyId: JSON.parse(uni.getStorageSync('userInfo')).companyId
				},
				backlog: {
					readStatus: '0',
					page: 1,
					limit: 10
				},
				receiver: {
					searchValues: '',
					page: 1,
					limit: 10
				},
				problem: {},
				list1: [{
						name: '项目预警',
						value: 1
					},
					{
						name: '隐患通知',
						value: 2
					},
					{
						name: '公告',
						value: 3
					}
				],
				status: 1, //点击状态控制  1.项目预警 2.隐患通知 3. 公告
				totalCount: 0,
				indexList: [],
				showScanLogin: false
			};
		},

		onLoad() {
			upApp()
		},
		mounted: function() {
			this.handbacklog();
			this.handdetailByUser();
		},
		methods: {
			handGp() {
				uni.navigateTo({
					url: `/pages/home/particulars?status=${this.status}`
				});
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
								uni.showToast({
									icon: 'none',
									title: '登录成功',
									duration: 1500
								});
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
			handtolower() {},
			handtabs(val) {
				if (val.value == 1) {
					this.status = 1;
					this.handbacklog();
				} else if (val.value == 2) {
					this.status = 2;
					this.handmsglist();
				} else if (val.value == 3) {
					this.status = 3;
					this.handquerylist();
				}
			},
			handbacklog() {
				//项目预警
				this.$http('/project/plan/page', 'POST', this.project, false)
					.then(res => {
						if (res.code == 0) {
							res.page.forEach(val => {
								val.title = val.projectName;
								let list = [];
								list = val.createTime.split(' ');
								val.time = list[0];
							});
							this.indexList = res.page.slice(0, 6);
							this.totalCount = res.page.length;
						}
					})
					.catch(err => {
						console.log(err);
					});
			},
			handmsglist() {
				//隐患通知
				this.$http('/msg/list', 'POST', this.backlog, false)
					.then(res => {
						if (res.code == 0) {
							res.page.list.forEach(val => {
								val.title = val.content;
								let list = [];
								list = val.createTime.split(' ');
								val.time = list[0];
							});
							this.indexList = res.page.list.splice(0, 6);
							this.totalCount = res.page.totalCount;
						}
					})
					.catch(err => {
						console.log(err);
					});
			},
			handquerylist() {
				//公告
				this.$http('/news/all/list', 'GET', this.receiver, false)
					.then(res => {
						if (res.code == 0) {
							res.page.list.forEach(val => {
								val.title = val.newsName;
								let list = [];
								list = val.createTime.split(' ');
								val.time = list[0];
							});
							this.indexList = res.page.list.splice(0, 6);
							this.totalCount = res.page.totalCount;
						}
					})
					.catch(err => {
						console.log(err);
					});
			},
			handdetailByUser() {
				//隐患数据
				this.$http('/statistics/project/detailByUser', 'POST', {}, false)
					.then(res => {
						if (res.code == 0) {
							this.problem = res.problemMap;
						}
					})
					.catch(err => {
						console.log(err);
					});
			}
		}
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
					padding: 40upx 20upx 0;

					.scroll {
						height: 500upx;
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
								width: 60vw;
								font-size: 28upx;
								font-family: PingFang SC;
								font-weight: 500;
								color: #333333;
								overflow: hidden;
								white-space: nowrap;
								text-overflow: ellipsis;
							}
						}

						.main-right {
							font-size: 28upx;
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
