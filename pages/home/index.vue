<template>
	<view class="home">
		<u-navbar :fixed="true" :placeholder="true" :safeAreaInsetTop="true" bgColor="#11B38C" leftIcon="">
			<view class="u-nav-left" slot="left" style="color: #FFFFFF;font-size: 32upx;font-weight: bold;">首页</view>
			<view class="u-nav-right" slot="right">
				<image @click="handscanCode" src="../../static/home/sao.png" style="width: 50upx;height: 50upx;margin-top: 10upx;" mode=""></image>
			</view>
		</u-navbar>
		<image class="home-img" src="../../static/banner.png" mode=""></image>
		<view class="main">
			<view class="main-top">
				<u-tabs lineColor="#00B490" lineWidth="80" :activeStyle="{ color: '#00B490' }" :scrollable="false" :list="list1" @click="handtabs"></u-tabs>
				<view class="main-scroll">
					<view class="scroll" v-if="indexList.length !== 0">
						<view v-for="(item, index) in indexList" :key="index" @click="handXq(item)">
							<view class="main-all">
								<view class="main-left">
									<view class="main-yuan"></view>
									<view class="main-sao">{{ item.title }}</view>
								</view>
								<view class="main-right">{{ item.time }}</view>
							</view>
						</view>
					</view>
					<image v-else src="../../static/danger/kong.png" mode=""></image>
				</view>
				<view class="look" @click="handGp">查看更多 ({{ totalCount }})</view>
			</view>
			<!-- 说明 -->
			<view class="main-prompt main-top">
				<u-notice-bar bgColor="#ffffff" duration="3000" color="#333333" direction="column" :text="swiperList"></u-notice-bar>
				<!-- <image src="../../static/home/prompt.png" mode=""></image> -->
				<!-- 说明：登录电脑端请访问 -->
				<!-- <text class="prompt-text" style="color: #00B490 ;">https://esq.cgdg.com/</text> -->
			</view>
			<view class="main-cet main-top">
				<view class="title">隐患数据</view>
				<view class="zho">
					<view class="zho-1">
						<view class="zho-he">
							<view class="fa">发现</view>
							<view class="nums">{{ problem.problemSolve + problem.problemFind + problem.problemRecheck }}</view>
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
				<barecharts v-if="dataList[0].value" :dataList="dataList" />
				<image v-else src="../../static/danger/kong.png" mode=""></image>
			</view>
		</view>
		<u-popup :show="show" @close="close" :closeOnClickOverlay="false" closeable mode="center" round="10">
			<view class="mask">
				<view class="mask-title">电脑端登录指南</view>
				<view class="mask-text">
					<view class="mask-text1">
						1.推荐使用
						<text style="color: #00B490;">Chrome</text>
						浏览器进行访问
					</view>
					<view class="mask-text1">
						2.打开Chrome浏览器，输入网址：
						<view class="" style="color:#00B490;padding-left: 24upx;">https://esq.cgdg.com</view>
					</view>
					<view class="mask-text1">
						3.请使用智慧安质平台app的右上角
						<text style="color: #00B490;">扫码功能</text>
						<text style="padding-left: 24upx;">进行免密快捷登录，</text>
						<text class="" style="color: #00B490;">如下图:</text>
					</view>
				</view>
				<view class="mask-img"><image src="../../static/home/quickImg.png" mode=""></image></view>
				<view class="consult">
					<text style="color: #FF0101;">*</text>
					<text>登陆中如有问题请咨询：</text>
					<view class="contact">李工：13954133995 崔工：13611301359</view>
				</view>
				<button class="btn" type="default" @click="loginCode">扫码登录</button>
				<u-checkbox-group placement="row" @change="checkboxChange(!showPopup)">
					<view class="maskRadio"><u-checkbox :checked="showPopup" label="勾选后下次不再弹窗提示" name="勾选后下次不再弹窗提示"></u-checkbox></view>
				</u-checkbox-group>
			</view>
		</u-popup>
	</view>
</template>

<script>
import {
	scanCode,
	is_iOS
} from '../../utils/utils.js';
import {
	monitoring,
	alerts
} from '../../utils/api.js'
import barecharts from '../../components/home/barecharts.vue';
export default {
	components: {
		barecharts
	},
	data() {
		return {
			tabberShow: true, //待办
			tabberShowL: true, //监控
			swiperList: [
				"说明：登录电脑端请访问https://esq.cgdg.com/"
			],
			showPopup: false,
			show: false, //true是显示,false是隐藏
			project: {
				projectName: '',
				companyId: JSON.parse(uni.getStorageSync('userInfo')).companyId
			},
			backlog: {
				readStatus: '0',
				page: 1,
				limit: 6
			},
			receiver: {
				searchValues: '',
				page: 1,
				limit: 6
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
			dataList: [{
					value: 75,
					name: '重大风险'
				},

				{
					value: 63,
					name: '较大风险'
				},

				{
					value: 43,
					name: '一般风险'
				},

				{
					value: 30,
					name: '低风险'
				}
			],
			showScanLogin: false
		};
	},
	onBackPress(e) {
		if (is_iOS()) {
			return
		}
		uni.showModal({
			content: '是否要退出应用？',
			confirmText: '确定',
			cancelText: '取消',
			success: function(res) {
				if (res.confirm) {
					if (!is_iOS()) {
					uni.sendNativeEvent("colseapp", res => {
						console.log(res);
					});
					}
				} else if (res.cancel) {

				}
				return true;
			}
		});
		return true;
	},
	onShow() {

	},
	onLoad() {
		this.handProbleBar();
		this.monitorMessage();
		this.alertsMessage();
	},
	mounted: function() {
		this.handbacklog();
		this.handdetailByUser();
	},
	methods: {
		monitorMessage() {
			monitoring().then(res => {
					if (res.code == 0) {
						if (res.data == 0) {

						} else {
							res.data.forEach(el => {
								if (el.alarmStatus == 0) {
									uni.showTabBarRedDot({
										index: 4,
									})
								}
							})
						}
					}
				})
				.catch(err => {
					console.log(err)
				});
				setInterval(function() {
					monitoring().then(res => {
							if (res.code == 0) {
								if (res.data == 0) {

								} else {
									res.data.forEach(el => {
										if (el.alarmStatus == 0) {
											uni.showTabBarRedDot({
												index: 4,
											})
										}
									})
								}
							}
						})
						.catch(err => {
							console.log(err)
						});
				}, 20000)
		},
		alertsMessage() {
			alerts().then(res => {
					if (res.code == 0) {
						if (res.page.totalCount == 0) {} else {
							res.page.list.forEach(el => {
								if (el.readStatus == 0) {
									uni.showTabBarRedDot({
										index: 4,
									})
								}
							})
						}
					}
				})
				.catch(err => {
					console.log(err)
				})
				setInterval(function() {
					alerts().then(res => {
							if (res.code == 0) {
								if (res.page.totalCount == 0) {} else {
									res.page.list.forEach(el => {
										if (el.readStatus == 0) {
											uni.showTabBarRedDot({
												index: 4,
											})
										}
									})
								}
							}
						})
						.catch(err => {
							console.log(err)
						})
				}, 20000)
		},
		handXq(v) {
			if (this.status == 1) {
				uni.navigateTo({
					url: `/pages/projectProgress/detail?projectId=${v.projectId}&projectName=${v.projectName}&companyId=${v.companyId}`
				});
			} else if (this.status == 2) {
				this.handProblemsId(v);
			} else if (this.status == 3) {
				uni.navigateTo({
					url: `/pages/home/affiche?id=${v.id}`
				});
			}
		},
		handProbleBar() {
			//获取饼状图类型
			this.$http(
					`/risk/list`,
					'GET', {
						page: 1,
						limit: 100000,
						searchKey: null,
						evaluate: '',
						level: '',
						status: '',
						riskMark: ''
					},
					false
				)
				.then(res => {
					if (res.code == 0) {
						let majorList = []
						let moreList = []
						let commonlyList = []
						let low = []
						res.page.list.forEach(item => {
							if (item.level == '1') {
								majorList.push(item);
							} else if (item.level == '2') {
								moreList.push(item);
							} else if (item.level == '3') {
								commonlyList.push(item);
							} else if (item.level == '4') {
								low.push(item);
							}
						});
						this.dataList[0].value = majorList.length
						this.dataList[1].value = moreList.length
						this.dataList[2].value = commonlyList.length
						this.dataList[3].value = low.length
					}
				})
				.catch(err => {
					console.log(err);
				});
		},
		handProblemsId(val) {
			//获取隐患类型
			this.$http(`/problems/${val.eventId}`, 'GET', {}, false)
				.then(res => {
					if (res.code == 0) {
						if (!res.problem) {
							return uni.showToast({
								icon: 'none',
								title: '暂无此项目',
								duration: 1500
							});
						}
						switch (res.problem.status) {
							case -1:
								uni.navigateTo({
									url: `/pages/dangerList/hiddenDetails?id=${res.problem.id}&status=1`
								});
								break;
							case 1:
								uni.navigateTo({
									url: `/pages/dangerList/hiddenDetails?id=${res.problem.id}&status=2`
								});
								break;
						}
					}
				})
				.catch(err => {
					console.log(err);
				});
		},
		handGp() {
			uni.navigateTo({
				url: `/pages/home/particulars?status=${this.status}`
			});
		},
		close() {
			this.show = false
			uni.showTabBar();
		},
		checkboxChange(e) {
			this.showPopup = !this.showPopup;
			if (this.showPopup) {
				uni.setStorageSync('show', 2) //2是隐藏
			} else {
				uni.setStorageSync('show', 1) //1是显示
			}
		},
		loginCode() {
			uni.showTabBar();
			const that = this;
			that.show = false;
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
		handscanCode() {
			console.log(uni.getStorageSync('show'))
			if (!uni.getStorageSync('show') || uni.getStorageSync('show') == 1) {
				// 点击弹出一个弹窗
				this.show = true
			} else {
				this.show = false
				this.loginCode();
			}

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
			let url = '/project/plan/page?companyId=' + JSON.parse(uni.getStorageSync('userInfo')).companyId;
			this.$http(url, 'GET', {}, false)
				.then(res => {
					if (res.code == 0) {
						let list = [];
						res.page.forEach(val => {
							if (val.nodes) {
								val.nodes.forEach(e => {
									let item = {};
									item.title = val.projectName + e.taskName;
									let listT = [];
									listT = val.createTime.split(' ');
									item.time = listT[0];
									item.projectId = val.projectId;
									item.projectName = val.projectName;
									item.companyId = val.companyId;
									list.push(item);
								})
							}

						});
						if (list.length >= 6) {
							this.indexList = list.slice(0, 6);
						} else {
							this.indexList = list;
						}
						this.totalCount = list.length;
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

	.mask {
		position: relative;
		width: 90vw;
		// height: 70vh;
		border-radius: 5upx;

		.mask-title {
			margin-top: 26upx;
			text-align: center;
			font-size: 32upx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #333333;
		}

		.mask-text {
			width: 88%;
			margin: 34upx 37upx 34upx 47upx;

			.mask-text1 {
				font-size: 30upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #333333;
				line-height: 46upx;
			}
		}

		.mask-img {
			margin: 0 auto 43upx;
			width: 88%;
			height: 240upx;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.consult {
			width: 88%;
			margin: 34upx 37upx 36upx 47upx;
			font-size: 28upx;
			font-family: PingFang SC;
			font-weight: 500;
			line-height: 44upx;

			.contact {
				padding-left: 20upx;
			}
		}

		.btn {
			width: 88%;
			margin: 0 auto;
			text-align: center;
			height: 80upx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #ffffff;
			font-size: 36upx;
			line-height: 80upx;
			background: #00b490;
			border-radius: 40upx;
		}

		button::after {
			border: none;
		}

		.maskRadio {
			width: 88%;
			margin: 20upx auto;
			height: 60upx;
			line-height: 60upx;
		}
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

		.main-prompt {
			margin-top: 20upx;
			// padding: 10upx 0;
			display: flex;
			align-items: center;
			border-radius: 16upx;

			/deep/ .u-notice-bar {
				border-radius: 16upx;
			}

			// image {
			// 	margin: 10upx 14upx 10upx 27upx;
			// 	width: 40upx;
			// 	height: 40upx;
			// }
			// u-icon__icon uicon-volume
			/deep/ .uicon-volume {
				color: #f51948 !important;
			}

			.prompt-text {
				width: 100%;
				font-size: 28upx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #333333;
			}
		}
	}
}
</style>
