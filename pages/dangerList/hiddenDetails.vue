<template>
	<view class="hiddenDetails">
		<TwoNavbar :name="titles" />
		<view class="all">
			<view class="top">
				<view class="top-1">
					<image class="top-imgs" src="../../static/user/tou.png" mode=""></image>
					<view class="cet">
						<view class="title">{{ problem.problemCreatorDisplay }}</view>
						<view class="title-1">{{ problem.problemType2 }}</view>
					</view>
				</view>
				<view class="top-right2" v-if="problem.statusTime == 1">已超期</view>
				<view class="top-right3" v-else-if="problem.statusTime == 2">待整改</view>
				<view class="top-right4" v-else-if="problem.statusTime == 3">待复核</view>
				<view class="top-right" v-else-if="problem.statusTime == 4">已解决</view>
			</view>
			<view class="main">
				<view class="main-a">
					{{ problem.problemDesc }}请
					<text>@{{ problem.problemSolverDisplay }}</text>
					{{ problem.problemRequire }}
				</view>
				<view class="main-a" v-if="problem.notifyPersonDisplay != null && problem.notifyPersonDisplay != ''">
					<!-- 知会 -->
					通知
					<text>{{ problem.notifyPersonDisplay }}</text>
				</view>
				<view class="main-a" v-if="problem.status !== -1">
					请
					<text>@{{ problem.problemCheckerDisplay }}</text>
					<!-- 复核 -->
					复核
				</view>
				<view class="imgs"><image :src="val" mode="widthFix" v-for="(val, i) in problem.imglist" :key="i"></image></view>
				<view class="bot">
					<view class="bot-1">
						<view class=""><image class="bot-imgs" src="../../static/danger/shij.png" mode=""></image></view>
						<view class="bot-w">发现时间：{{ problem.createTimeStr }}</view>
					</view>
					<view class="bot-1 bot-top">
						<view class="bot-flex"><image class="bot-imgs" src="../../static/danger/adersstwo.png" mode=""></image></view>
						<view class="bot-w">{{ problem.location }}</view>
					</view>
					<view class="bot-1 bot-top">
						<view class=""><image class="bot-imgs" src="../../static/danger/chao.png" mode=""></image></view>
						<view class="bot-w">超期时间：{{ problem.expireTimeStr }}</view>
					</view>
				</view>
			</view>

			<template v-if="problem && problem.id">
				<view class="all-2" v-for="val in tableData" :key="val.id">
					<view class="top">
						<view class="top-1">
							<image class="top-imgs" src="../../static/user/tou.png" mode=""></image>
							<view class="cet">
								<view class="title">{{ val.creatorDisplay }}</view>
							</view>
						</view>
					</view>
					<view class="main">
						<view class="main-a" v-if="val.fallbackUserName">
							回复给
							<text>@{{ val.fallbackUserName }}</text>
						</view>
						<view class="main-a" v-if="parseInt(val.status) === 1 && problem.checkerUserEntity">
							请
							<text>@{{ problem.checkerUserEntity.fullname }}</text>
							复核
						</view>
						<view class="imgs"><image :src="val.statusImages" mode="widthFix"></image></view>
					</view>
				</view>
			</template>
		</view>
		<image class="xuan-imgsa" @click="handZgup" v-if="problem.status == -1 && userId == problem.problemSolver" src="../../static/danger/xuan.png" mode=""></image>
		<uni-fab
			v-if="problem.status == 1 && userId == problem.problemChecker"
			:pattern="pattern"
			:content="content"
			horizontal="right"
			vertical="bottom"
			direction="vertical"
			:popMenu="true"
			@trigger="trigger"
			@fabClick="fabClick"
		/>
	</view>
</template>
<script>
import { getDictList } from '../../utils/api.js';
import TwoNavbar from '../../components/TwoNavbar/TwoNavbar.vue';
export default {
	name: 'hiddenDetails',
	props: [],
	components: {
		TwoNavbar
	},
	data() {
		return {
			titles: '隐患详情',
			id: '',
			problem: {},
			dictLsit: [],
			userId: null,
			tableData: [],
			pattern: {
				color: 'gray',
				backgroundColor: '#FFFFFF',
				selectedColor: '#007AFF',
				buttonColor: 'orange'
			},
			content: [
				{
					iconPath: '../../static/danger/dian.png',
					text: '',
					active: false
				},
				{
					iconPath: '../../static/danger/dianb.png',
					text: '',
					active: false
				}
			]
		};
	},
	onLoad(val) {
		this.id = val.id;
		this.status = val.status;
		this.userId = JSON.parse(uni.getStorageSync('userInfo')).userId.toString();
	},
	onShow() {
		this.handgETLIST();
		this.handbacklog();
		this.getApproveHisList();
	},
	//组件生命周期
	created() {},
	mounted() {},
	methods: {
		trigger(e) {
			//点击悬浮
			if (e.index == 0) {
				//复核
				uni.navigateTo({
					url: `/pages/dangerList/review?id=${this.problem.id}`
				});
			} else {
				//驳回
				uni.navigateTo({
					url: `/pages/dangerList/rejected?id=${this.problem.id}`
				});
			}
		},
		fabClick() {
			/* uni.showToast({
						title: '点击了悬浮按钮',
						icon: 'none'
			}); */
		},
		handZgup() {
			//整改页面
			uni.navigateTo({
				url: `/pages/dangerList/dangers?id=${this.problem.id}&problemChecker=${this.problem.problemChecker}`
			});
		},
		handgETLIST() {
			//获取字典数据
			getDictList('PROBLEMS_LEVEL_TYPE')
				.then(res => {
					this.dictLsit = res.dict;
				})
				.catch(err => {
					console.log(err);
				});
		},
		handbacklog() {
			var myDate = new Date();
			this.$http(`/problems/${this.id}`, 'GET', {}, false)
				.then(res => {
					if (res.code == 0) {
						this.problem = res.problem;
						this.problem.imglist = [];
						this.problem.imglist = res.problem.images.split('|');
						//整改图片
						res.problem.solutionImages ? (this.problem.solutionimglist = res.problem.solutionImages.split('|')) : '';
						res.problem.solutionTime ? (this.problem.solutionTime2 = res.problem.solutionTime.split(' ')[0]) : '';
						//复核图片
						res.problem.recheckImages ? (this.problem.recheckImages = res.problem.recheckImages.split('|')) : '';
						res.problem.recheckTime ? (this.problem.recheckTime2 = res.problem.recheckTime.split(' ')[0]) : '';
						let obj = {};
						obj = this.dictLsit.filter(item => this.problem.problemType == item.code); //判断安全等级对比
						this.problem.problemType2 = obj[0].value;
						if (this.problem.status == -1) {
							var oDate2 = new Date(this.problem.expireTime); //时间状态判断
							if (!myDate.getTime() > oDate2.getTime()) {
								this.problem.statusTime = 1; //超期
							} else {
								this.problem.statusTime = 2; //未超期
							}
						} else if (this.problem.status == 1) {
							this.problem.statusTime = 3; //待复核
						} else if (this.problem.status == 0) {
							this.problem.statusTime = 4; //已解决
						}
					}
				})
				.catch(err => {
					console.log(err);
				});
		},
		getApproveHisList() {
			this.tableData = [];
			if (this.id) {
				this.$http('/problems/status/' + this.id, 'POST', { page: 1, limit: 1000 }, false).then(res => {
					if (res && res.code === 0) {
						this.tableData = res.problemStatus.filter(item => {
							if (parseInt(item.status) !== -1) {
								return item;
							}
						});
						if (this.tableData.length > 1) {
							for (var i = 0; i < this.tableData.length; i++) {
								for (var j = 0; j < this.tableData.length - 1 - i; j++) {
									let temp = {};
									if (this.tableData[j].createTime > this.tableData[j + 1].createTime) {
										temp = this.tableData[j];
										this.tableData[j] = this.tableData[j + 1];
										this.tableData[j + 1] = temp;
									}
								}
							}
						}
					} else {
						this.tableData = [];
					}
				});
			}
		}
	}
};
</script>
<style lang="less" scoped>
.hiddenDetails {
	.all {
		padding: 27upx 20upx;
	}
	.all-2 {
		margin-top: 40upx;
	}
	.top {
		display: flex;
		justify-content: space-between;
		align-items: center;
		.top-1 {
			display: flex;
			align-items: center;
			.top-imgs {
				width: 110upx;
				height: 110upx;
				border-radius: 50upx;
			}
			.cet {
				margin-left: 20upx;
				.title {
					font-size: 32upx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #333333;
				}
				.title-1 {
					margin-top: 17upx;
					font-size: 28upx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #666666;
				}
			}
		}

		.top-right {
			font-size: 28upx;
			font-family: PingFang SC;
			font-weight: 500;
			background: #00b490;
			color: #ffffff;
			border-radius: 6upx;
			padding: 10upx 15upx;
		}
		.top-right2 {
			font-size: 28upx;
			font-family: PingFang SC;
			font-weight: 500;
			background: #ff0000;
			color: #ffffff;
			border-radius: 6upx;
			padding: 10upx 15upx;
		}
		.top-right3 {
			font-size: 28upx;
			font-family: PingFang SC;
			font-weight: 500;
			background: #999999;
			color: #ffffff;
			border-radius: 6upx;
			padding: 10upx 15upx;
		}
		.top-right4 {
			font-size: 28upx;
			font-family: PingFang SC;
			font-weight: 500;
			background: #ff6c00;
			color: #ffffff;
			border-radius: 6upx;
			padding: 10upx 15upx;
		}
	}
	.main {
		margin-top: 30upx;
		.main-a {
			text-indent: 2em;
			font-size: 28upx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #333333;
			letter-spacing: 4upx;
			text {
				color: #00b490;
			}
			.textcoo {
				color: #fe0000;
			}
		}
		.imgs {
			text-align: center;
			margin: 20upx 0;
			text-align: center;
			.img-ist {
				width: 100%;
				height: 334upx;
				border-radius: 10upx;
			}
		}
		.bot {
			.bot-1 {
				display: flex;
				font-size: 28upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #666666;
				.bot-imgs {
					margin-right: 10upx;
					width: 40upx;
					height: 40upx;
				}
				.bot-flex {
					margin-top: 4upx;
				}
				.bot-w {
					width: 100%;
				}
			}
			.bot-top {
				margin-top: 10upx;
			}
		}
	}
	.xuan-imgsa {
		position: fixed;
		bottom: 100upx;
		right: 30upx;
		width: 160upx;
		height: 160upx;
	}
	.names {
		margin: 60upx 0 20upx 0;
		font-size: 36upx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #333333;
	}
}
</style>
