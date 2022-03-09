<template>
	<view class="fileNotification">
		<TwoNavbar :name="name" @leftClick="leftClick" />
		<view v-if="dataList.length!=0">
			<view class="card" v-for="(item,index) in dataList" :key='index' @click="navgetDetail(item)">
				<view class="card_top">
					<text class="theme">{{item.title}}</text>
					<text class="read" v-if="item.statusText=='未报送' || item.statusText=='未读'"
						style="color: #ff0000;">{{item.statusText}}</text>
					<text class="read" v-if="item.statusText=='已报送'" style="color: #11B38C;">{{item.statusText}}</text>
					<text class="read" v-if="item.statusText=='已读'" style="color: #666666;">{{item.statusText}}</text>
					<!-- 	<text class="read" v-if="item.status=='1'">已发布</text>
					<text class="read" v-if="item.status=='0'">未发布</text> -->
				</view>
				<view class="card_content">
					<rich-text :nodes="item.content"></rich-text>
				</view>
				<view class="card_bot">
					{{item.statusTime}}
				</view>
				<view class="divider" style="width: 100%;">
					<u-divider lineColor="#b9b9b9" :hairline="false" style="opacity: 0.2"></u-divider>
				</view>
			</view>
		</view>
		<view v-else>
			<image class="kong" src="../../static/danger/kong.png" mode=""></image>
		</view>
		<!-- <image class="add" @click="handPush" src="../../static/danger/jia.png" mode=""></image> -->
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
				id: '',
				name: "文件通知",
				List: {
					menuId: "",
					limit: 10,
					page: 1
				},
				totalCount: 0,
				totalPage: 0,
				dataList: [],
				dataForm: {
					searchKey: ''
				},
			};
		},
		onLoad() {
			// location.reload()
			// this.getDataList()
		},
		onReachBottom() {
			this.List.page++
			this.getDataList()
		},
		onShow() {
			this.getDataList()
		},
		methods: {
			leftClick() {
				console.log('leftClick');
				uni.navigateBack({
					delta: 1
				});
			},
			handPush() {
				//添加通知
				uni.navigateTo({
					url: '/pages/my/fileAdd'
				});
			},
			// 进入详情
			navgetDetail(item) {
				uni.navigateTo({
					url: `/pages/my/fileDetail?id=${item.id}`
				});
			},
			// 获取数据列表
			// getDataList() {
			// 	uni.showLoading({
			// 		title: '加载中',
			// 	});
			// 	this.$http('/filenotice/page', "GET", this.List, false).then(res => {
			// 			uni.hideLoading();
			// 			if (res.code == 0) {
			// 				if (this.List.page > res.page.totalPage) {
			// 					uni.showToast({
			// 						title: '已到最后一页',
			// 						duration: 1500
			// 					});
			// 					return
			// 				}
			// 				// this.List.page++;
			// 				this.dataList = this.dataList.concat(res.page.list);
			// 				const dataarr = this.getCurrentTime()
			// 				this.dataList.forEach(item => {
			// 					let zuo = this.aa()
			// 					if (item.statusTime.substr(0, 4) === dataarr[0] && item.statusTime.substr(
			// 							5, 2) === dataarr[1] && item.statusTime.substr(8, 2) === dataarr[
			// 							2]) {
			// 						item.statusTime = item.statusTime.substr(14, 5)
			// 					} else if (item.statusTime.substr(0, 4) === dataarr[0] && item.statusTime
			// 						.substr(5, 2) === dataarr[1]) {
			// 						if (item.statusTime.substr(9, 1) === zuo[0].substr(2, 1)) {
			// 							item.statusTime = '昨天'
			// 						}
			// 					}
			// 				});
			// 				// }
			// 				this.totalPage ++;
			// 			}
			// 		})
			// 		.catch(err => {
			// 			console.log(err)
			// 		})
			// },
			getDataList() {
				uni.showLoading({
					title: '加载中',
				});
				this.$http(`/app/fileNotice/getReceivePage`, "POST", false).then(res => {
						uni.hideLoading();
						if (res.code == 0) {
							if (this.List.page > res.page.totalPage) {
								uni.showToast({
									title: '已到最后一页',
									duration: 1500
								});
								return
							}
							// this.List.page++;
							this.dataList = this.dataList.concat(res.page.list);
							const dataarr = this.getCurrentTime()
							this.dataList.forEach(item => {
								let zuo = this.aa()
								if (item.statusTime.substr(0, 4) === dataarr[0] && item.statusTime.substr(
										5, 2) === dataarr[1] && item.statusTime.substr(8, 2) === dataarr[
										2]) {
									item.statusTime = item.statusTime.substr(14, 5)
								} else if (item.statusTime.substr(0, 4) === dataarr[0] && item.statusTime
									.substr(5, 2) === dataarr[1]) {
									if (item.statusTime.substr(9, 1) === zuo[0].substr(2, 1)) {
										item.statusTime = '昨天'
									}
								}
							});
							// }
							this.totalPage++;
						}else {
						this.dataList = [];
					}
					})
					.catch(err => {
						console.log(err)
					})
			},
			// 获取当前时间
			getCurrentTime() {
				let yy = new Date().getFullYear();
				let mm = new Date().getMonth() + 1 < 10 ? '0' + (new Date().getMonth() + 1) : new Date().getMonth() + 1;
				let dd = new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate();
				let hh = new Date().getHours();
				let mf = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes();
				let ss = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds();
				let dataarr = [yy, mm, dd]
				return dataarr
			},
			aa() {
				var myDate = new Date() // 获取今天日期
				myDate.setDate(myDate.getDate() - 1)
				var dateArray = []
				var dateTemp
				var flag = 1
				dateTemp = (myDate.getMonth() + 1) + '-' + myDate.getDate()
				dateArray.push(dateTemp)
				myDate.setDate(myDate.getDate() + flag)
				console.log('123456+', dateArray)
				return dateArray
			},
		}
	}
</script>

<style lang="scss" scoped>
	.fileNotification {
		width: 100%;
		height: 100vh;

		.card {
			padding: 35upx 20upx;
			height: 156upx;

			.card_top {
				display: flex;
				justify-content: space-between;

				.theme {
					width: 300upx;
					font-size: 32upx;
					font-weight: bold;
					color: #333333;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}

				.read {
					font-size: 28upx;
					color: #000000;
				}
			}

			.card_bot {
				display: flex;
				justify-content: flex-end;
				font-size: 24upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #666666;
			}

			.card_content {
				margin-top: 25upx;
				// text-indent: 80upx;
				line-height: 42upx;
				font-size: 28upx;
				color: #666666;
				text-overflow: -o-ellipsis-lastline;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				line-clamp: 2;
				-webkit-box-orient: vertical;

				p {
					line-height: 42upx;
					font-size: 28upx !important;
					color: #666666 !important;
				}
			}

		}

		.conspan {
			line-height: 42upx !important;
			font-size: 28upx !important;
			color: #666666;

			span {
				line-height: 42upx !important;
				font-size: 28upx !important;
				color: #666666;
			}
		}

		.kong {
			position: fixed;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}

		.add {
			position: fixed;
			bottom: 80upx;
			right: 10upx;
			width: 160upx;
			height: 160upx;
		}
	}
</style>
