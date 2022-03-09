<template>
	<view class="particulars">
		<TwoNavbar :name="titles" />
		<template v-if="indexList.length !== 0">
			<view class="par" v-for="(val, i) in indexList" :key="i" @click="handXq(val)">
				<view class="par-1">
					<view class="par-cet">
						<view class="proname">
							{{ val.projectName ? val.projectName : '无' }}
							<view class="float-r" v-show="status == 2">
								<!-- <text v-if="val.status == -1" style="color:#ff0000;">待整改</text> -->
								<!-- <text v-if="val.status == 1" style="color:#ff6c00;">待复核</text>
								<text v-else-if="val.status == 0" style="color:#11B38C ;">已完成</text> -->
							</view>
						</view>
						<view class="tags" v-if="status == 1">
							<view class="tt">
								<text v-if="val.expireStatus == '1'">[一般]</text>
								<text v-else-if="val.expireStatus == '2'">[较重]</text>
								<text v-else-if="val.expireStatus == '3'">[严重]</text>
								<text v-else-if="val.expireStatus == '4'">[特别严重]</text>
								<text>{{ val.taskName }}</text>
							</view>
							<view class="par-2" v-show="status !== 3">
								<view class="times">{{ val.time }}</view>
								<!-- <button class="btn">点击查看</button> -->
							</view>
						</view>
						<view class="tags" v-else-if="status == 2">
							<view class="tt">
								<text>[{{ val.expireStatus }}]</text>
								<text>{{ val.taskName }}</text>
							</view>
							<view class="par-2" v-show="status !== 3">
								<view class="times">{{ val.time }}</view>
								<!-- <button class="btn">点击查看</button> -->
							</view>
						</view>
						<view class="tags2" v-else-if="status == 3">
							<view class="tag-text">{{ val.content }}</view>
							<view class="times">{{ val.time }}</view>
						</view>
					</view>
				</view>
			</view>
		</template>
		<template v-else>
			<image class="kong" src="../../static/danger/kong.png" mode=""></image>
		</template>
	</view>
</template>
<script>
import TwoNavbar from '../../components/TwoNavbar/TwoNavbar.vue';
import { removeTag } from '../../utils/utils.js';
import { _handIds } from '../../utils/api.js';
export default {
	name: 'particulars',
	props: [],
	components: {
		TwoNavbar
	},
	data() {
		return {
			totalCount: 0,
			titles: '',
			indexList: [],
			project: {
				page: 1,
				limit: 10,
				projectName: '',
				companyId: JSON.parse(uni.getStorageSync('userInfo')).companyId
			},
			backlog: {
				isRead: '0',
				readStatus: '0',
				page: 1,
				limit: 10
			},
			receiver: {
				searchValues: '',
				page: 1,
				limit: 10
			},
			status: 1
		};
	},
	onLoad(val) {
		this.status = val.status;
		if (val.status == 1) {
			this.titles = '项目预警';
			this.handbacklog();
		} else if (val.status == 3) {
			this.titles = '公告';
			this.handquerylist();
		}
	},
	onShow() {
		if (this.status == 2) {
			this.titles = '隐患通知';
			this.backlog.page = 1;
			this.indexList = [];
			this.handmsglist();
		}
	},
	//组件生命周期
	created() {},
	mounted() {},
	methods: {
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
		handProblemsId(val) {
			//获取隐患类型
			uni.showLoading({
				title: '跳转中'
			});
			_handIds(val.id);
			console.log(val.id, val.eventId);
			this.$http(`/problems/${val.eventId}`, 'GET', {}, false)
				.then(res => {
					uni.hideLoading();
					if (res.code == 0) {
						uni.navigateTo({
							url: `/pages/dangerList/hiddenDetails?id=${res.problem.id}`
						});
					}
				})
				.catch(err => {
					console.log(err);
				});
		},
		leftClick() {
			uni.navigateBack({
				delta: 1
			});
		},

		handbacklog() {
			//项目预警
			uni.showLoading({
				title: '加载中'
			});
			this.$http('/app/project/getNodePage', 'POST', this.project, false)
				.then(res => {
					uni.hideLoading();

					if (res.code == 0) {
						if (this.indexList.length < res.page.totalCount) {
							this.project.page++;
							res.page.list.forEach(val => {
								val.time = val.projectCreateTime.split(' ')[0];
							});
						}
						this.indexList = this.indexList.concat(res.page.list);
						this.totalCount = res.page.totalCount;
					}
				})
				.catch(err => {
					console.log(err);
				});
		},
		handmsglist() {
			//隐患通知
			console.log(this.backlog, '------------');
			uni.showLoading({
				title: '正在加载'
			});
			this.$http('/app/problem/msg/page', 'POST', this.backlog, false)
				.then(res => {
					uni.hideLoading();
					if (res.code == 0) {
						if (this.indexList.length < res.page.totalCount) {
							this.backlog.page++;
							res.page.list.forEach(val => {
								val.title = val.content.substr(0, 1);
								val.payload2 = JSON.parse(val.payload);
								if (val.payload2) {
									val.projectName = val.payload2.projectName;
									val.expireStatus = val.payload2.level;
									val.status = val.payload2.status;
								} else {
									val.projectName = '';
									val.expireStatus = '';
									val.status = '';
								}
								val.taskName = val.content;
								val.time = val.createTime.split(' ')[0];
							});
							this.indexList = this.indexList.concat(res.page.list);
						}
						this.totalCount = res.page.totalCount;
					}
				})
				.catch(err => {
					console.log(err);
				});
		},
		handquerylist() {
			//公告
			uni.showLoading({
				title: '正在加载'
			});
			this.$http('/news/all/list', 'GET', this.receiver, false)
				.then(res => {
					uni.hideLoading();
					if (res.code == 0) {
						if (this.indexList.length < res.page.totalCount) {
							this.receiver.page++;
							res.page.list.forEach(val => {
								val.title = val.newsName.substr(0, 1);
								val.projectName = val.newsName;
								val.time = val.createTime.split(' ')[0];
								val.content = removeTag(val.newsText);
							});
							this.indexList = this.indexList.concat(res.page.list);
						}
						this.totalCount = res.page.totalCount;
					}
				})
				.catch(err => {
					console.log(err);
				});
		}
	},
	onReachBottom() {
		if (this.status == 1) {
			this.handbacklog();
		} else if (this.status == 2) {
			this.handmsglist();
		} else if (this.status == 3) {
			this.handquerylist();
		}
	}
};
</script>
<style lang="less" scoped>
.particulars {
	width: 100%;
	height: 100vh;
	padding: 15upx 0;
	.par {
		margin: 20upx;
		border-bottom: 2upx solid rgba(188, 188, 188, 0.2);
		.par-1 {
			padding-bottom: 20upx;
			.tou {
				margin-right: 20upx;
				width: 100upx;
				height: 100upx;
				text-align: center;
				line-height: 100upx;
				background: #27a387;
				border-radius: 50upx;
				font-size: 40upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #feffff;
			}
			.par-cet {
				width: 100%;
				padding-top: 10upx;
				.proname {
					font-size: 32upx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #333333;
					.float-r {
						float: right;
						font-size: 26upx;
						font-weight: 500;
					}
				}
				.tags {
					display: flex;
					align-items: center;
					justify-content: space-between;
					font-size: 26upx;
					color: #666666;
					.tt {
						flex: 1;
						margin: 20upx 20upx 0 0;
						overflow: hidden;
						-webkit-line-clamp: 2;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-box-orient: vertical;
					}
					.par-2 {
						padding-top: 15upx;
						.times {
							width: 20vw;
							font-size: 24upx;
						}
					}
				}
				.tags2 {
					width: 95vw;
					color: #666666;
					.tag-text {
						padding-top: 20upx;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2; //多行在这里修改数字即可
						overflow: hidden;
						-webkit-box-orient: vertical;
						font-size: 28upx;
					}
					.times {
						text-align: right;
						font-size: 24upx;
					}
				}
			}
		}
	}
	.kong {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
}
</style>
