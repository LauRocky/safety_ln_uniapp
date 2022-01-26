<template>
	<view class="danger">
		<u-navbar class="navbar" :fixed="true" style="display:flex;align-items: center;color: #FFFFFF;" :placeholder="true" :safeAreaInsetTop="true" bgColor="#11B38C" leftIcon="">
			<view class="u-nav-left" @click="darshow = !darshow" style="color: #FFFFFF;font-size: 32upx;" slot="left">
				{{ title }}
			<image class="nav-left-img" style="width: 25upx; height: 15upx;" src="../../static/danger/showAll.png" mode=""></image>
			</view>
		</u-navbar>
		<!-- <view class="fixed-nvb">
		
		</view> -->
		<view class="bav-list" v-if="darshow">
			<image class="bav-imgs" src="../../static/danger/shang.png" mode=""></image>
			<view class="bav-1" v-for="(val, i) in SpinnerList" @click="handgreList(val, i)" :key="i">{{ val.name }}</view>
		</view>
		<u-tabs lineColor="#00B490" lineWidth="120" :activeStyle="{ color: '#00B490' }" :scrollable="false" :list="list1" @click="handclick"></u-tabs>
		<view class="danger-list">{{ totalCount }}个隐患</view>
		<scroll-view class="lists" scroll-y @scrolltolower="handtolower" v-if="numsList.length !== 0">
			<view class="list-1" v-for="(val, i) in numsList" :key="i" @click="handLsit(val.id)">
				<view class="list-top">
					<image class="list-imgs" :src="val.images2" mode=""></image>
					<view class="list-right">
						<view class="list-top-1">
							<view class="top-left">{{ val.problemType2 }}</view>
							<view class="top-right2" v-if="val.statusTime == 1">已超期</view>
							<view class="top-right3" v-else-if="val.statusTime == 2">待整改</view>
							<view class="top-right4" v-else-if="val.statusTime == 3">待复核</view>
							<view class="top-right" v-else-if="val.statusTime == 4">已解决</view>
						</view>
						<view class="list-title" v-if="val.projectInfoEntity">{{ val.projectInfoEntity.projectName }}</view>
						<view class="list-ce">请{{ val.problemSolverDisplay }}{{ val.problemRequire }}{{ val.notifyPersonDisplay }}</view>
					</view>
				</view>
				<view class="list-foo">
					<view class="foo-left">{{ val.problemCreatorDisplay }}</view>
					<view class="foo-time">{{ val.crtime }}</view>
				</view>
			</view>
			<view style="height: 15vh;"></view>
		</scroll-view>
		<template v-else>
			<image class="kong" src="../../static/danger/kong.png" mode=""></image>
		</template>
		<image class="add" @click="handPush" src="../../static/danger/jia.png" mode=""></image>
		<mypicker :show="show" @handcompany="handcompany" @close="handclose" @deSelect="deSelect" />
	</view>
</template>

<script>
import navBar from '../../components/navBar/navBar.vue';
import mypicker from '../../components/mypicker/mypicker.vue';
import { getDictList } from '../../utils/api.js';
export default {
	components: {
		navBar,
		mypicker
	},
	data() {
		return {
			qualityDictList:[],
			title: '全部',
			category: '',
			darshow: false,
			show: false,
			btnnum: 0,
			dangerName: '',
			showTitle: true,
			dictLsit: [], //隐患等级列表
			page: 1,
			limit: 10,
			numsList: [],
			totalCount: 0,
			status: '1', //状态值
			SpinnerList: [
				{
					name: '全部',
					value: ''
				},
				{
					name: '安全隐患',
					value: '安全'
				},
				{
					name: '质量隐患',
					value: '质量'
				}
			],
			list1: [
				{
					name: '待整改',
					value: '1'
				},
				{
					name: '待复核',
					value: '2'
				},
				{
					name: '全部',
					value: '3'
				}
			]
		};
	},
	onBackPress(e) {
		uni.showModal({
			content: '是否要退出应用？',
			confirmText: '确定',
			cancelText: '取消',
			success: function(res) {
				if (res.confirm) {
					uni.sendNativeEvent("colseapp", res => {
						console.log(res);
					});
				} else if (res.cancel) {
		
				}
				return true;
			}
		});
		return true;
	},
	onLoad() {},
	onShow() {
		this.handclick({
			value: this.status
		});
		this.handgETLIST();
	},
	methods: {
		handgreList(val, i) {
			this.numsList = [];
			this.darshow = false;
			this.page = 1
			this.title = val.name
			this.category = val.value;
			this.handDangerList();
		},
		deSelect() {
			this.title = '所有城市';
			this.show = false;
		},
		handLsit(id) {
			//跳转详情
			uni.navigateTo({
				url: `/pages/dangerList/hiddenDetails?id=${id}&status=${this.status}`
			});
		},
		handclick(v) {
			//tab获取数据
			this.page = 1;
			this.status = v.value;
			this.numsList = [];
			this.handDangerList();
		},
		handcompany(v) {
			//选择项目
			this.title = v.name;
			this.show = false;
		},
		handgETLIST() {
			//获取公司项目数据
			getDictList('QUALITY_PROBLEM_LEVEL')
			.then(res=>{
				this.qualityDictList=res.dict;
			})
			.catch(e=>{});
			
			
			getDictList('PROBLEMS_LEVEL_TYPE')
				.then(res => {
					this.dictLsit = res.dict;
				})
				.catch(err => {
					console.log(err);
				});
		},
		handDangerList() {
			//列表数据
			uni.showLoading({
				title: '加载中',
				mask: true
			});
			let obj = {};
			if (this.status == '1') {
				obj = {
					status: '-1',
					category: this.category,
					page: this.page,
					limit: this.limit,
					problemSolver: JSON.parse(uni.getStorageSync('userInfo')).userId
				};
			} else if (this.status == '2') {
				obj = {
					status: '1',
					category: this.category,
					page: this.page,
					limit: this.limit,
					problemChecker: JSON.parse(uni.getStorageSync('userInfo')).userId
				};
			} else {
				obj = {
					status: '-1,1,0',
					category: this.category,
					page: this.page,
					limit: this.limit,
					all: '1'
				};
			}
			var myDate = new Date();
			this.$http('/problem/app/list', 'POST', obj, false)
				.then(res => {
					uni.hideLoading();
					if (res.code == 0) {
						if (this.numsList.length < res.page.totalCount) {
							this.page++;
							res.page.list.forEach(val => {
								let obj = {};
								if (val.problemType) {
									if(val.category&&val.category=='安全'){
										obj = this.dictLsit.filter(item => val.problemType == item.code); //判断安全等级对比
										val.problemType2 = obj[0].value;
									}else if(val.category&&val.category=='质量'){
										obj = this.qualityDictList.filter(item => val.problemType == item.code); //判断安全等级对比
										val.problemType2 = obj[0].value;
									}
								}
								val.crtime = val.createTime.split(' ')[0];
								if (val.images) {
									val.images2 = val.images.split('|')[0];
								}
								if (val.status == -1) {
									var oDate2 = new Date(val.expireTime.replace(/-/g, '/'));
									oDate2 = new Date(oDate2); //时间状态判断
									if (myDate.getTime() > oDate2.getTime()) {
										val.statusTime = 1; //超期
									} else {
										val.statusTime = 2; //未超期
									}
								} else if (val.status == 1) {
									val.statusTime = 3; //待复核
								} else if (val.status == 0) {
									val.statusTime = 4; //已解决
								}
							});
							this.numsList = this.numsList.concat(res.page.list);
						} else {
						}
						this.totalCount = res.page.totalCount;
					}
				})
				.catch(err => {
					console.log(err);
				});
		},
		handPush() {
			//添加隐患
			uni.navigateTo({
				url: '/pages/dangerList/add'
			});
		},
		handclose() {
			this.show = false;
		},
		handtolower() {
			if (this.status == '1') {
				this.handDangerList({
					status: '-1',
					page: this.page,
					limit: this.limit,
					problemSolver: JSON.parse(uni.getStorageSync('userInfo')).userId
				});
			} else if (this.status == '2') {
				this.handDangerList({
					status: '1',
					page: this.page,
					limit: this.limit,
					problemChecker: JSON.parse(uni.getStorageSync('userInfo')).userId
				});
			} else {
				this.handDangerList({
					status: '-1,1,0',
					page: this.page,
					limit: this.limit,
					all: '1'
				});
			}
		},
		handUpqie() {
			this.show = true;
		},
		handseach(val) {
			console.log(val, '1231231');
		},
		change(e) {
			this.btnnum = e;
		}
	}
};
</script>

<style lang="less" scoped>
.danger {
	width: 100vw;
	height: 100%;
	overflow: hidden;
	.navbar {
	
	}
	.bav-list {
		z-index: 999;
		font-size: 35upx;
		padding: 20upx 30upx 30upx;
		width: 160upx;
		position: absolute;
		top: 120upx;
		left: 20upx;
		color: #FFFFFF;
		background: #4c4c4c;
		border-radius: 15rpx;
		.bav-1 {
			padding: 20upx 0;
			border-bottom: 2upx solid #8a8a8a;
		}
		.bav-imgs {
			position: absolute;
			top: -23upx;
			width: 35upx;
			height: 30upx;
		}
	}
	.danger-list {
		padding: 20upx 20upx;
		font-size: 28upx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #333333;
	}
	.lists {
		width: 100vw;
		height: calc(100vh - 256upx);
		.list-1 {
			padding: 27upx 20upx 0;
			.list-top {
				display: flex;
				.list-imgs {
					margin-right: 24upx;
					width: 154upx;
					height: 154upx;
					border-radius: 16upx;
				}
				.list-right {
					flex: 8;
					.list-top-1 {
						display: flex;
						justify-content: space-between;
						.top-left {
							font-size: 28upx;
							font-family: PingFang SC;
							font-weight: bold;
							color: #666666;
						}
						.top-right {
							display: flex;
							align-items: center;
							font-size: 24upx;
							font-family: PingFang SC;
							font-weight: 500;
							color: #00b490;
						}
						.top-right2 {
							font-size: 24upx;
							font-family: PingFang SC;
							font-weight: bold;
							color: #ff0000;
						}
						.top-right3 {
							display: flex;
							align-items: center;
							font-size: 24upx;
							font-family: PingFang SC;
							font-weight: bold;
							&:after {
								content: ' ';
								display: block;
								margin-left: 10upx;
								width: 20upx;
								height: 20upx;
								background: #ff0000;
								border-radius: 50%;
							}
						}
						.top-right4 {
							font-size: 24upx;
							font-family: PingFang SC;
							font-weight: bold;
							color: #ff6c00;
						}
					}
					.list-title {
						padding: 23upx 0;
						font-size: 32upx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #333333;
					}
					.list-ce {
						font-size: 28upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #666666;
					}
				}
			}
			.list-foo {
				display: flex;
				align-items: center;
				font-size: 24upx;
				font-family: PingFang SC;
				color: #666666;
				.foo-left {
					flex: 2;
				}
				.foo-time {
					padding: 20upx 0;
					flex: 8;
					text-align: right;
					border-bottom: 2upx solid #e9e9e9;
				}
			}
		}
	}
	.add {
		position: fixed;
		bottom: 80upx;
		right: 10upx;
		width: 160upx;
		height: 160upx;
	}
	.kong {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
}
</style>