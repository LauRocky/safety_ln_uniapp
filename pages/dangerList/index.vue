<template>
	<view class="danger">
		<nav-bar :title="title" @seach="handseach" @Upqie="handUpqie"></nav-bar>
		<u-tabs lineColor="#00B490" lineWidth="120" :activeStyle="{ color: '#00B490' }" :scrollable="false" :list="list1" @click="handclick"></u-tabs>
		<view class="danger-list">{{totalCount}}个隐患</view>
		<scroll-view class="lists" scroll-y @scrolltolower="handtolower" v-if="numsList.length !== 0">
			<view class="list-1" v-for="(val, i) in numsList" :key="i">
				<view class="list-top">
					<image class="list-imgs" :src="val.images" mode=""></image>
					<view class="list-right">
						<view class="list-top-1">
							<view class="top-left">{{ val.problemType2 }}</view>
							<view class="top-right2" v-if="val.statusTime == 1">已超期</view>
							<view class="top-right" v-if="val.statusTime == 2">未超期</view>
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
		</scroll-view>
		<image class="add" @click="handPush" src="../../static/danger/jia.png" mode=""></image>
		<mypicker :show="show" @handcompany="handcompany" @close="handclose" />
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
			title: '所有城市',
			show: false,
			btnnum: 0,
			dangerName: '',
			showTitle: true,
			dictLsit: [], //隐患等级列表
			page: 1,
			limit: 10,
			numsList: [],
			totalCount:0,
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
	onLoad() {
		this.handclick({ value: 1 });
		this.handgETLIST();
	},
	methods: {
		handclick(v) {
			if (v.value == 1) {
				this.handDangerList({ page: this.page, limit: this.limit, problemSolver: JSON.parse(uni.getStorageSync('userInfo')).userId });
			} else if (v.value == 2) {
				this.handDangerList({ page: this.page, limit: this.limit, problemChecker: JSON.parse(uni.getStorageSync('userInfo')).userId });
			} else {
				this.handDangerList({ page: this.page, limit: this.limit, all: '1' });
			}
		},
		handcompany(v) {
			this.title = v;
			this.show = false;
		},
		handgETLIST() {
			getDictList('PROBLEMS_LEVEL_TYPE')
				.then(res => {
					this.dictLsit = res.dict;
				})
				.catch(err => {
					console.log(err);
				});
		},
		handDangerList(obj) {
			var myDate = new Date('2021-12-25 13:17:02');
			this.$http('/problem/app/list', 'POST', obj, false)
				.then(res => {
					if (res.code == 0) {
						if(this.numsList.length){
							
						}
						res.page.list.forEach(val => {
							let obj = {};
							obj = this.dictLsit.filter(item => val.problemType == item.code); //判断安全等级对比
							val.problemType2 = obj[0].value;
							val.crtime = val.createTime.split(' ')[0];
							var oDate2 = new Date(val.expireTime); //时间状态判断
							if (myDate.getTime() > oDate2.getTime()) {
								val.statusTime = 1; //超期
							} else {
								val.statusTime = 2; //未超期
							}
						});
						this.numsList = res.page.list;
						this.totalCount = res.page.totalCount
					}
				})
				.catch(err => {
					console.log(err);
				});
		},
		handPush() {
			uni.navigateTo({
				url: '/pages/dangerList/add'
			});
		},
		handclose() {
			this.show = false;
		},
		handtolower() {},

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
	.danger-list {
		padding: 20upx 20upx;
		font-size: 28upx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #333333;
	}
	.lists {
		width: 100vw;
		height: calc(100vh - 400upx);
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
							color: #666666;
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
						.top-right2 {
							font-size: 24upx;
							font-family: PingFang SC;
							font-weight: bold;
							color: #ff0000;
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
		bottom: 100upx;
		right: 10upx;
		width: 160upx;
		height: 160upx;
	}
}
</style>
