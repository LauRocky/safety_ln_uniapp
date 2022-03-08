<template>
	<view class="filedetail">
		<TwoNavbar :name="name" :rightText='rightText' @rightcilck='rightcilck()' />
		<view class="all">
			<view class="top">
				<view class="top-1">
					<image class="top-imgs" src="../../static/user/tou.png" mode=""></image>
					<view class="cet">
						<view class="title">
							<view class="fullname">
								{{ user.fullname }}
							</view>
						<view class="bot-1">
							<view class="">
								<image class="bot-imgs" src="../../static/danger/shij.png" mode=""></image>
							</view>
							<view class="bot-w">创建时间：{{dataList.createTime}}</view>
						</view>
						</view>
						<view class="title-1">{{ deptNames }}</view>
					</view>
				</view>
				<!-- <view class="top-right">2022/11/02</view> -->
				<!-- <view class="top-right">{{dataList.createTime}}</view> -->
			</view>
			<view class="detailname">
				<rich-text :nodes="dataList.content"></rich-text>
			</view>

			<view class="bot">
				<!-- <view class="bot-1">
					<view class="">
						<image class="bot-imgs" src="../../static/danger/shij.png" mode=""></image>
					</view>
					<view class="bot-w">创建时间：{{dataList.createTime}}</view>
				</view> -->
				<view class="bot-1">
					<view class="">
						<image class="bot-imgs" src="../../static/danger/shij.png" mode=""></image>
					</view>
					<view class="bot-w">报送截止日期：{{dataList.feedbackExpireTime}}</view>
				</view>
				<view class="bot-1 bot-top">
					<view class="bot-flex" v-if="num!=0">
						<image class="bot-imgs" src="../../static/add/accessory.png" mode=""></image>
					</view>
					<view class="bot-w" v-if="num!=0">附件（{{num}}）
						<text class="save" @click="saveAll">保存全部</text>
						<!-- <text class="save">用wps打开</text> -->
					</view>
				</view>
			</view>
			<view class="wordlist">
				<view class="word" v-for="(item,index) in dataList.fileList" :key='index' @click="xiazai(item.url)">
					<view class="nickname">
						{{item.name}}
					</view>
					<view class="downWord">
						<u-icon name="arrow-down" color="#666666" size="18"></u-icon>
					</view>
				</view>
			</view>
		</view>
		<view class="bsinfo">
			报送信息：
		</view>
		<view class="all" v-for="(li,i) in List" :key='i'>
			<view class="top">
				<view class="top-1">
					<!-- <image class="top-imgs" src="../../static/user/tou.png" mode=""></image> -->
					<view class="cet">
						<view class="title">{{ li.company.name }}</view>
					</view>
				</view>
				<!-- <view class="top-right">2022/11/02</view> -->
				<!-- <view class="top-right">{{li.createTime}}</view> -->
			</view>
			<view class="detailname">
				<view class="bot-1">
					<!-- {{li.content}} -->
					<rich-text :nodes="li.content"></rich-text>
				</view>
			</view>
			<view class="bot">

				<view class="bot-1">
					<view class="">
						<image class="bot-imgs" src="../../static/danger/shij.png" mode=""></image>
					</view>
					<view class="bot-w">报送时间：{{li.feedbackExpireTime}}</view>
				</view>
				<view class="bot-1 bot-top">
					<view class="bot-flex" v-if="li.fileList.length!=0">
						<image class="bot-imgs" src="../../static/add/accessory.png" mode=""></image>
					</view>
					<view class="bot-w" v-if="li.fileList.length!=0">附件（{{li.fileList.length}}）
						<text class="save" @click="saveAll">保存全部</text>
						<!-- <text class="save">用wps打开</text> -->
					</view>
				</view>
			</view>
			<view class="wordlist">
				<view class="word" v-for="(item,index) in li.fileList" :key='index' @click="xiazai(item.url)">
					<view class="nickname">
						{{item.name}}
					</view>
					<view class="downWord">
						<u-icon name="arrow-down" color="#666666" size="18"></u-icon>
					</view>
				</view>
			</view>
		</view>
		<image class="submission" @click="handPush" src="../../static/danger/submission.png" mode=""
			v-if="needFeedback"></image>
		<!-- v-if="dataList.status==='1'&&dataList.feedback==='1'"></image> -->
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
				needFeedback: false,
				user: JSON.parse(uni.getStorageSync('userInfo')),
				id: '',
				// name: this.dataList.title,
				name: null,
				rightText: '编辑',
				dataList: [],
				num: 0,
				numTwo: 0,
				deptInfoList: [],
				deptNames: '',
				luj: null,
				dd: '',
				List: {},
				dataForm: {
					fileNoticeId: '',
					readStatus: '',
					status: '1',
					limit: 999
				},
			};
		},
		onLoad(val) {
			this.id = val.id;
			this.dataForm.fileNoticeId = val.id;
			// uni.$once("xiazai", )
		},
		onShow() {
			this.getDataList();
			this.deptInfo();
			this.overSubmission()
			uni.setNavigationBarTitle({
				title: this.dataList.title //此处写页面的title
			});
		},
		methods: {
			rightcilck() {
				uni.navigateTo({
					url: `/pages/my/fileAdd?id=${this.id}`
				});
			},
			handPush() {
				uni.navigateTo({
					url: `/pages/my/submission?id=${this.id}`
				})
			},
			// 获取登录人部门信息
			deptInfo() {
				this.$http(
					'/lvxin/deptInfo',
					'POST', {
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
							if(res.data){
								this.dataList = res.data;
								this.rightText = this.dataList.createBy === this.user.userId ? "编辑" : null;
								this.needFeedback = this.dataList.status === '1' && this.dataList.feedback === '1' &&
									this.dataList.companyIds.indexOf(this.user.companyId) > -1 && this.user.jobId === 3;
								this.num = this.dataList.fileList.length;
								this.name=this.dataList.title;
								this.dataList.content = this.dataList.content.replace(/\<p/gi, '<p class="conspan"', );
							}
							
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
									duration: 1000,
								});
								setTimeout(() => {
									//打开文档查看
									uni.openDocument({
										filePath: res.savedFilePath,
										success: function(res) {
											console.log('打开文档成功');
										}
									});
								}, 1000)
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
			// 报送完信息
			overSubmission() {
				uni.showLoading({
					title: '加载中',
				});
				this.$http('/filenotice/feedbackPage', 'GET', this.dataForm, false)
					.then(res => {
						if (res.code == 0) {
							this.List = res.page.list

						}
					})
					.catch(err => {
						console.log(err);

					});
			},

		},
	}
</script>

<style lang="scss" scoped>
	.bsinfo {
		font-size: 36upx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #333333;
		margin-bottom: 28upx;
		margin-left: 20upx;
	}

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
						display: flex;
						font-size: 32upx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #333333;
						.fullname{
							font-size: 32upx;
							font-family: PingFang SC;
							font-weight: bold;
							color: #333333;
							margin-right: 20upx;
						}
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
