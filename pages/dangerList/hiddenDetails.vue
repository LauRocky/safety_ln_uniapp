<template>
	<view class="hiddenDetails">
		<view class="top">
			<view class="top-1">
				<image class="top-imgs" :src="problem.images" mode=""></image>
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
				{{ problem.problemDesc }}:请
				<text>@{{ problem.problemSolverDisplay }}</text>
				{{ problem.problemRequire }}
			</view>
			<view class="main-a">通知@{{ problem.notifyPersonDisplay }}</view>
			<view class="imgs"><image class="img-ist" :src="val" mode="" v-for="(val, i) in problem.imglist" :key="i"></image></view>
			<view class="bot">
				<view class="bot-1">
					<image class="bot-imgs" src="../../static/danger/shij.png" mode=""></image>
					<view class="bot-w">整改到期：{{ problem.createTime }}</view>
				</view>
				<view class="bot-1">
					<image class="bot-imgs" src="../../static/danger/adersstwo.png" mode=""></image>
					<view class="bot-w">{{ problem.location }}</view>
				</view>
			</view>
		</view>
		<movarea />
	</view>
</template>
<script>
import { getDictList } from '../../utils/api.js';
import  movarea from'../../components/movarea/movarea.vue'
export default {
	name: 'hiddenDetails',
	props: [],
	components: {
		movarea
	},
	data() {
		return {
			id: '',
			problem: {},
			dictLsit: []
		};
	},
	onLoad(val) {
		this.id = val.id;
	},
	onShow() {
		this.handgETLIST();
		this.handbacklog();
	},
	//组件生命周期
	created() {},
	mounted() {},
	methods: {
		handgETLIST() {
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
		}
	}
};
</script>
<style lang="less" scoped>
.hiddenDetails {
	padding: 27upx 20upx;
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
			background: #c3c334;
			color: #ffffff;
			border-radius: 6upx;
			padding: 10upx 15upx;
		}
		.top-right4 {
			font-size: 28upx;
			font-family: PingFang SC;
			font-weight: 500;
			background: #003fbd;
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
		}
		.imgs {
			margin: 20upx 0;
			.img-ist {
				width: 100%;
				height: 334upx;
				border-radius: 10upx;
			}
		}
		.bot {
			.bot-1 {
				display: flex;
				align-items: center;
				font-size: 28upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #666666;
				.bot-imgs {
					margin-right: 10upx;
					width: 40upx;
					height: 40upx;
				}
				.bot-w{
					width: 90vw;
				}
			}
		}
	}
}
</style>
