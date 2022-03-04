<template>
	<view class="filedetail">
		<TwoNavbar :name="name" @leftClick="leftClick" />
		<view class="all">
			<view class="top">
				<view class="top-1">
					<image class="top-imgs" src="../../static/user/tou.png" mode=""></image>
					<view class="cet">
						<view class="title">{{ user.fullname }}</view>
							<!-- <view class="title-1">崔菜菜爱吃菠菜</view> -->
							<view class="title-1">{{ deptNames }}</view>


					</view>
				</view>
				<view class="top-right">2022/11/02</view>
			</view>
			<view class="detailname">
				<rich-text :nodes="dataList.content"></rich-text>
			</view>
			<view class="bot">
				<view class="bot-1">
					<view class="">
						<image class="bot-imgs" src="../../static/danger/shij.png" mode=""></image>
					</view>
					<view class="bot-w">报送截止日期：{{dataList.statusTime}}</view>
				</view>
				<view class="bot-1 bot-top">
					<view class="bot-flex">
						<image class="bot-imgs" src="../../static/add/newAddAttachment.png" mode=""></image>
					</view>
					<view class="bot-w">附件（1）
						<text class="save" @click="saveAll">保存全部</text>
						<!-- <text class="save">用wps打开</text> -->
					</view>
				</view>
			</view>
			<view class="wordlist">
				<view class="word" v-for="(item,index) in dataList.fileList" :key='index'>
					<view class="nickname">
						{{item.name}}
					</view>
					<view class="downWord" @click="xiazai(item.url)">
						<u-icon name="arrow-down" color="#666666" size="18"></u-icon>
					</view>
				</view>
			</view>

		</view>
		<image class="submission" @click="handPush" src="../../static/danger/submission.png" mode=""></image>
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
				user: JSON.parse(uni.getStorageSync('userInfo')),
				id: '',
				name: "文件通知",
				dataList: [],
				deptInfoList: [],
				deptNames: '',
				luj: null,
				dd: '',
				List: {
					menuId: "",
					limit: 10,
					page: 1,
					readStatus: '',
					status: '',
					fileNoticeId: '',
				},
			};
		},
		onLoad(val) {
			this.id = val.id;
		},
		onShow() {
			this.getDataList();
			this.deptInfo();
		},
		methods: {
			handPush() {
				uni.navigateTo({
					url: `/pages/my/submission?id=${this.id}`
				})
			},
			//获取人员信息
			// deptInfo() {
			// 	const userInfo = uni.getStorageSync('userInfo')
			// 	let userinfo = JSON.parse(userInfo);
			// 	console.log(userinfo)
			// 	console.log(userinfo.parentId.toString())
			// 	console.log(userinfo.companyId.toString())
			// 	uni.showLoading({
			// 		title: '加载中',
			// 	});
			// 	this.$http(`/lvxin/deptInfo`, "POST", {
			// 			parentId: userinfo.parentId.toString()
			// 		}, false).then(res => {
			// 			uni.hideLoading();
			// 			if (res.code == 0) {
			// 				this.deptInfoList = res.data
			// 				// this.dataList.content = this.dataList.content.replace(/\<p/gi, '<p class="conspan"', );
			// 				console.log(res.data)
			// 			}
			// 		})
			// 		.catch(err => {
			// 			console.log(err)
			// 		})
			// },
			// 获取登录人部门信息
			deptInfo() {
				this.$http(
					'/lvxin/deptInfo',
					'POST',
					{
						parentId: this.user.companyId
					},
					false
				).then(res => {
					let deptName = '';
					let array = res.data.reverse();
					for (var i = 0; i < array.length; i++) {
						if (i == 0) {
							continue;
						}
						deptName += array[i].name;
					}
					this.deptNames = deptName;
				});
			},
			// 获取数据列表
			getDataList(id) {
				uni.showLoading({
					title: '加载中',
				});
				this.$http(`/filenotice/get/${this.id}`, "GET", false).then(res => {
						uni.hideLoading();
						if (res.code == 0) {
							this.dataList = res.data
							this.dataList.content = this.dataList.content.replace(/\<p/gi, '<p class="conspan"', );
							console.log(res.data)
						}
					})
					.catch(err => {
						console.log(err)
					})
			},
			// 保存全部
			saveAll() {
				this.dataList.fileList.forEach(item => {
					this.xiazai(item.url)
				});
			},
			xiazai(url) {
				const downloadTask = uni.downloadFile({
					url: url, //仅为示例，并非真实的资源
					success: (res) => {
						if (res.statusCode === 200) {
							console.log('下载成功');
						}

						console.log(res.tempFilePath)
						//文件保存到本地
						// var tempFilePaths = res.tempFilePaths;
						// uni.saveFile({
						// 	tempFilePath: tempFilePathsn,
						// 	success: function(res) {
						// 		var savedFilePath = res.savedFilePath;
						// 	}
						// });
						uni.saveFile({
							tempFilePath: res.tempFilePath, //临时路径
							success: function(res) {
								uni.showToast({
									icon: 'none',
									mask: true,
									title: '文件已保存：' + res.savedFilePath, //保存路径
									duration: 3000,
								});
								setTimeout(() => {
									//打开文档查看
									uni.openDocument({
										filePath: res.savedFilePath,
										success: function(res) {
											console.log('打开文档成功');
										}
									});
								}, 3000)
							}
						});
					}
					// this.dd = res.tempFilePath;
					// console.log(res.tempFilePath);

				});

				downloadTask.onProgressUpdate((res) => {
					console.log('下载进度' + res.progress);
					console.log('已经下载的数据长度' + res.totalBytesWritten);
					console.log('预期需要下载的数据总长度' + res.totalBytesExpectedToWrite);
				});
			},

		},
	}
</script>

<style lang="scss" scoped>
	.filedetail {
		.all {
			padding: 27upx 20upx;
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

					.deptInfotitle {
						display: flex;
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
				font-size: 24upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #666666;
			}
		}

		.detailname {
			font-size: 28upx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #333333;
			line-height: 42upx;
			text-indent: 60upx;
			margin-top: 33upx;
		}

		.bot {
			margin-top: 25upx;

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

					.save {
						font-size: 26upx;
						font-family: PingFang SC;
						font-weight: bold;
						margin-left: 30upx;
						color: #11B38C;
					}
				}
			}

			.bot-top {
				margin-top: 10upx;
			}
		}

		.wordlist {
			display: flex;
			flex-wrap: wrap;
			margin-bottom: 100upx;
		}

		.word {
			width: 282upx;
			height: 160upx;
			background: #F6F6F6;
			border-radius: 10upx;
			margin-right: 30upx;
			margin-top: 25upx;
			position: relative;

			.nickname {
				font-size: 24upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #666666;
				padding: 18upx 0 0 15upx;
			}

			.downWord {
				position: absolute;
				right: 20upx;
				bottom: 15upx;
			}
		}
	}

	.submission {
		position: fixed;
		bottom: 80upx;
		right: 10upx;
		width: 160upx;
		height: 160upx;
	}
</style>
