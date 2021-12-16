<template>
	<view class="particulars">
		<view class="par" v-for="(val, i) in indexList" :key="i">
			<view class="par-1">
				<view class="tou">{{ val.title }}</view>
				<view class="par-cet">
					<view class="proname">{{ val.projectName }}</view>
					<view class=""></view>
				</view>
			</view>
			<view class="par-2">
				<view class="times">
					{{ val.time }}
				</view>
			</view>
		</view>
	</view>
</template>
<script>
export default {
	name: 'particulars',
	props: [],
	components: {},
	data() {
		return {
			totalCount: 0,
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
			status: 0
		};
	},
	onLoad(val) {
		if (val.status == 1) {
			uni.setNavigationBarTitle({
				title: '项目预警'
			});
			this.status = 1;
			this.handbacklog();
		} else if (val.status == 2) {
			uni.setNavigationBarTitle({
				title: '隐患通知'
			});
			this.status = 2;
			this.handmsglist();
		} else if (val.status == 3) {
			uni.setNavigationBarTitle({
				title: '公告'
			});
			this.status = 3;
			this.handquerylist();
		}
	},
	//组件生命周期
	created() {},
	mounted() {},
	methods: {
		handbacklog() {
			//项目预警
			this.$http('/project/plan/page', 'POST', this.project, false)
				.then(res => {
					if (res.code == 0) {
						res.page.forEach(val => {
							val.title = val.projectName.substr(0, 1);
							let list = [];
							list = val.createTime.split(' ');
							val.time = list[0];
						});
						this.indexList = res.page;
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
						this.indexList = res.page.list;
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
						this.indexList = res.page.list;
						this.totalCount = res.page.totalCount;
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
.particulars {
	padding: 0 20upx;
	.par {
		margin: 35upx 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.par-1 {
			display: flex;
			align-items: center;
			.tou {
				margin-right: 20upx;
				width: 100upx;
				height: 100upx;
				text-align: center;
				line-height: 100upx;
				background: #27a387;
				border-radius: 50upx;
				font-size: 51upx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #feffff;
			}
			.par-cet {
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
				.par-2{
					.times{
						font-size: 24upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #666666;
					}
				}
				
			}
		}
	}
}
</style>
