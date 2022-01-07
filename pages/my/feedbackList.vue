<template>
	<view class="yijian">
		<TwoNavbar :name="name" @leftClick="leftClick" />
		<template v-if="indexList.length !== 0">
			<view class="par" v-for="(item, i) in indexList" :key="i" @click="handXq(item)">
				<view class="par-1">
					<view class="par-2">
						{{item.createUser.fullname}}-{{item.company.name}}
					</view>
					<view class="par-3" v-if="item.status==0">
						未解决
					</view>
					<view class="par-31" v-if="item.status==1">
						已解决
					</view>
				</view>
				<view class="tags">
					<view class="par-4" v-if="item.content">
						{{item.content}}
					</view>
					<view class="par-4" v-else>
						当前用户没有输入意见
					</view>
					<view class="times">
						{{item.createTime}}
					</view>
				</view>
			</view>
		</template>
		<template v-else>
			<image class="kong" src="../../static/danger/kong.png" mode=""></image>
		</template>
		<image class="add" @click="handPush" src="../../static/danger/jia.png" mode=""></image>
	</view>
</template>

<script>
	import TwoNavbar from '../../components/TwoNavbar/TwoNavbar.vue';
	export default {
		components: {
			TwoNavbar
		},
		data() {
			return {
				value1: '',
				type: "",
				name: "意见反馈",
				indexList: [],
				totalCount: 0,
				List: {
					menuId: "",
					limit: 10,
					page: 1
				}
			};
		},
		methods: {
			// 新增意见
			handPush(){
				uni.navigateTo({
					url:'/pages/my/feedbackAdd'
				})
			},
			// 意见详情
			handXq(item) {
				uni.navigateTo({
					url:`/pages/my/details?id=${item.id}`
				})
			},
			// 获取列表
			getList() {
				uni.showLoading({
					title: '加载中',
				});
				this.$http('/problem/feedback/page', "GET", this.List, false).then(res => {
						uni.hideLoading();
						if (res.code == 0) {
							if (this.indexList.length < res.page.totalCount) {
								this.List.page++;
								this.indexList = this.indexList.concat(res.page.list);
							}
							this.totalCount = res.page.totalCount;
						}
					})
					.catch(err => {
						console.log(err)
					})
			},
			// 删除反馈
			// /problem/feedback/delete/{id}
			leftClick() {
				console.log('leftClick');
				uni.navigateBack({
					delta: 1
				});
			},
		},
		onShow() {
			this.List.page=1;
			this.indexList=[];
			this.getList();
		},
		// 页面上拉处理事件函数
		onReachBottom() {
			this.getList();
		}
	}
</script>

<style lang="scss" scoped>
	.yijian {
		width: 100%;
		height: 100vh;
		padding: 15upx 0;

		.par {
			margin: 20upx;
			border-bottom: 2upx solid #dadada;

			.par-1 {
				display: flex;
				justify-content: space-between;
				padding-bottom: 20upx;

				.par-2 {
					width: 60%;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					font-size: 32upx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #333333;
				}

				.par-3 {
					font-size: 28upx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #FF0000;
				}

				.par-31 {
					font-size: 28upx;
					color: #11B38C;
					font-family: PingFang SC;
					font-weight: bold;
				}
			}

			.tags {
				width: 95vw;
				padding-bottom: 20upx;
				.par-4 {
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
		.add{
			position: fixed;
			bottom: 80upx;
			right: 10upx;
			width: 160upx;
			height: 160upx;
		}

		.textarea {
			margin: 23upx;
			border-radius: 16upx;
			box-shadow: 0px 3upx 16upx 0px rgba(0, 0, 0, 0.06);
		}

		.button {
			margin-top: 30upx;
			width: 80%;
			height: 80upx;
			font-size: 36upx;
			font-family: PingFang SC;
			font-weight: bold;
			border-radius: 40upx;
		}
	}
</style>
