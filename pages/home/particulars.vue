<template>
	<view class="particulars">
		<TwoNavbar :name="titles" />
		<template v-if="indexList.length !== 0">
			<view class="par" v-for="(val, i) in indexList" :key="i" @click="handXq(val)">
				<view class="par-1">
					<view class="tou" v-if="status !== 3">{{ val.title }}</view>
					<view class="par-cet">
						<view class="proname">{{ val.projectName }}</view>
						<view class="tags" v-if="status == 1">
							<view class="tt" v-if="val.expireStatus == '1'">
								【一般】
								<text>{{val.taskName}}</text>
							</view>
							<view class="tt" v-else-if="val.expireStatus == '2'">
								【较重】
							<text>{{val.taskName}}</text>
							</view>
							<view class="tt" v-else-if="val.expireStatus == '3'">
								【严重】
								<text>{{val.taskName}}</text>
							</view>
							<view class="tt" v-else-if="val.expireStatus == '4'">
								【特别严重】
								<text>{{val.taskName}}</text>
							</view>
						</view>
						<view class="tags" v-if="status == 2"></view>
						<view class="tags2" v-if="status == 3">
							<view class="tag-text">{{ val.content }}</view>
							<view class="times">{{ val.time }}</view>
						</view>
					</view>
				</view>
				<view class="par-2" v-if="status !== 3">
					<view class="times">{{ val.time }}</view>
					<!-- <button class="btn">点击查看</button> -->
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
			status: 1
		};
	},
	onLoad(val) {
		if (val.status == 1) {
			this.titles = '项目预警';
			this.status = 1;
			this.handbacklog();
		} else if (val.status == 2) {
			this.titles = '隐患通知';
			this.status = 2;
			this.handmsglist();
		} else if (val.status == 3) {
			this.titles = '公告';
			this.status = 3;
			this.handquerylist();
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
			this.$http(`/problems/${val.eventId}`, 'GET', {}, false)
				.then(res => {
					if (res.code == 0) {
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
		leftClick() {
			uni.navigateBack({
				delta: 1
			});
		},

		handbacklog() {
			//项目预警
			this.$http('/project/plan/page', 'POST', this.project, false)
				.then(res => {
					if (res.code == 0) {
						let list=[];
						res.page.forEach(val => {
							if(val.nodes){
								val.nodes.forEach(e=>{
									let item={};
									item.title=val.projectName.substr(0,1);
									let listT = [];
									listT = val.createTime.split(' ');
									item.time = listT[0];
									item.taskName=e.taskName;
									item.expireStatus=val.expireStatus;
									item.projectId=val.projectId;
									item.projectName=val.projectName;
									item.companyId=val.companyId;
									list.push(item);
								})
							}
							
						});
						
							this.indexList=list;
						
						
						this.totalCount = list.length;
						

					}
				})
				.catch(err => {
					console.log(err);
				});
		},
		handmsglist() {
			//隐患通知
			uni.showLoading({
				title: '正在加载'
			});
			this.$http('/msg/list', 'POST', this.backlog, false)
				.then(res => {
					uni.hideLoading();
					if (res.code == 0) {
						if (this.indexList.length < res.page.totalCount) {
							this.backlog.page++;
							res.page.list.forEach(val => {
								val.title = val.content.substr(0, 1);
								val.projectName = val.content;
								let list = [];
								list = val.createTime.split(' ');
								val.time = list[0];
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
								let list = [];
								list = val.createTime.split(' ');
								val.time = list[0];
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
		if (this.status == 2) {
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
		display: flex;
		justify-content: space-between;
		border-bottom: 2upx solid #dadada;
		.par-1 {
			padding-bottom: 20upx;
			display: flex;
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
				padding-top: 10upx;
				.proname {
					font-size: 32upx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #333333;
					width: 50vw;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}
				.tags {
					width: 50vw;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
					.tt {
						margin-top: 20upx;
						font-size: 24upx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #333333;
						text {
							font-size: 24upx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #8f8f8f;
						}
					}
				}
				.tags2 {
					width: 95vw;
					.tag-text {
						padding-top: 20upx;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2; //多行在这里修改数字即可
						overflow: hidden;
						-webkit-box-orient: vertical;
						font-size: 28upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #666666;
					}
					.times {
						text-align: right;
						font-size: 28upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #666666;
					}
				}
			}
		}
		.par-2 {
			padding-top: 15upx;
			.times {
				font-size: 28upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #666666;
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
