<template>
	<view>
		<nav-bar :title="title" @seach="handsearch" @Upqie="handUpqie"></nav-bar>
		<view class="project-container">
			<view
				class="project"
				@click="goDetail(project.projectId, project.projectName, project.companyId)"
				:class="{ first: index == 0 }"
				v-for="(project, index) in projectList"
				:key="index"
			>
				<view class="title">
					<text>{{ project.projectName }}</text>
					<u-icon color="#303133" :bold="true" name="arrow-right"></u-icon>
				</view>
				<view class="status" v-if="getprocess(project.projectId) == 0">
					<view class="status-item" style="background: #00B490;">进度正常</view>
					<text style="margin-left: 23rpx;">项目各个环节进度正常</text>
				</view>
				<view class="status" v-else>
					<view class="status-item" style="background: #FF0000;">进度异常</view>
					<text style="margin-left: 23rpx;">项目{{ getprocess(project.projectId) }}个环节进度异常</text>
				</view>
			</view>
		</view>
		<mypicker :show="show" @handcompany="handcompany" @close="handclose" @deSelect="deSelect" />
	</view>
</template>

<script>
import navBar from '../../components/navBar/navBar.vue';
import mypicker from '../../components/mypicker/mypicker.vue';
import { is_iOS } from '../../utils/utils.js';
export default {
	components: {
		navBar,
		mypicker
	},
	data() {
		return {
			show: false,
			title: '所有城市',
			queryForm: {
				companyId: JSON.parse(uni.getStorageSync('userInfo')).companyId,
				projectId: '',
				status: ''
			},
			rawList: [],
			projectList: []
		};
	},

	methods: {
		deSelect() {
			this.title = '所有城市';
			this.show = false;
			this.getProjectList();
		},
		handUpqie() {
			this.show = true;
		},
		handclose() {
			this.show = false;
		},
		handcompany(v) {
			console.log(v);
			this.title = v.name;
			this.$http(
				'/project/plan/withStatusNew',
				'POST',
				{
					companyId: v.companyId,
					projectId: '',
					status: ''
				},
				false
			).then(res => {
				console.log(res);
				this.rawList = res.page;
				this.projectList = this.rawList;
			});
			this.show = false;
		},
		getProjectList() {
			uni.showLoading({
				title: '加载中',
				mask: true
			});
			this.$http('/project/plan/withStatusNew', 'POST', this.queryForm, false)
				.then(res => {
					uni.hideLoading();
					this.rawList = res.page;
					this.projectList = this.rawList;
				})
				.catch(err => {
					console.log(err);
				});
		},
		handsearch(val) {
			if (val) {
				let result = [];
				this.projectList.forEach(e => {
					let pName = e.projectName;
					if (pName.indexOf(val) > -1) {
						result.push(e);
					}
				});
				this.projectList = result;
			} else {
				this.projectList = this.rawList;
			}
		},
		/* 根据项目id判断节点状态 返回有几个异常 */
		getprocess(projectId) {
			let arr = [];
			if (this.projectList) {
				this.projectList.forEach(item => {
					if (item.projectId == projectId) {
						item.nodes.forEach(node => {
							if (node.nodeState == '3' || node.nodeState == '4') {
								arr.push(node);
							}
						});
					}
				});
			}
			return arr.length;
		},

		/* 跳转到详情页面 */
		goDetail(projectId, projectName, companyId) {
			uni.navigateTo({
				url: `./detail?projectId=${projectId}&projectName=${projectName}&companyId=${companyId}`
			});
		}
	},
	onLoad() {
		this.getProjectList();
	},
	onShow() {}
};
</script>

<style scoped>
.project-container {
	padding-bottom: 80upx;
}

.first {
	margin-top: 30rpx !important;
}

.status {
	border-top: 2rpx solid #f6f8f7;
	padding: 20rpx;
	padding-left: 0;
	display: flex;
	align-items: center;
}

.status-item {
	text-align: center;
	border-radius: 6upx;
	font-size: 24upx;
	color: #ffffff;
	font-family: PingFang SC;
	padding: 10upx 22upx;
}

.project {
	margin: 20rpx;
	border-radius: 10rpx;
	padding: 20rpx;
	box-shadow: 0px 0px 11px 0px rgba(0, 0, 0, 0.06);
}

.project .title {
	display: flex;
	align-items: center;
	padding-bottom: 21rpx;
	justify-content: space-between;
}

.project .title text {
	width: 80%;
	font-size: 32rpx;
	font-weight: bold;
	color: #333333;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

>>> .u-tag--primary[data-v-95cf93f4] {
	border: none;
}

.u-nav-left {
	color: #ffffff;
}

.tips {
	background-color: #e95a4e;
	width: 20px;
	height: 20px;
	position: absolute;
	top: -12px;
	left: 45px;
	border-radius: 50px;
	color: #ffffff;
}

.tagsBackground {
	background-color: #00b48f;
	color: #ffffff !important;
}

.uni-tag[data-v-1516016e] {
	padding: 10rpx 20rpx;
}

.uni-tag--default--inverted[data-v-1516016e] {
	color: #27a386;
	border-color: #27a386;
	font-size: 14px;
}

/* 将三个内容view的display设置为none(隐藏) */
.end-title {
	display: flex;
	color: #707070;
	height: 110rpx;
	line-height: 110rpx;
	font-weight: 750;
	background-color: #f2f2f2;
}

.end-title view {
	flex-grow: 1;
	text-align: center;
}

.btna {
	color: #000000;
	border-bottom: 6rpx solid #2297f4;
}
</style>
