<template>
	<view class="submission">
		<TwoNavbar :name="name" @leftClick="leftClick" />
		<u--textarea v-model="userAdd.content" @input='addtextarea' placeholder="点击此处输入您的报送内容" height="500upx"
			class="textarea" border="surround">
		</u--textarea>
		<view class="form-item2">
			<view class="add-1">
				<image class="add-imgs" src="../../static/add/newAddAttachment.png" mode=""></image>
				<view class="add-title">添加附件</view>
			</view>
		</view>
		<view class="">
			<u-tag v-for="(item,index) in fileList" :key='index' :text="item.name" size="mini" closable :show="close1"
				@close="close(item,index)"></u-tag>
		</view>
		<l-file ref="lFile" :logo="logo" @up-success="onSuccess"></l-file>
		<view class="uploadfile">
			<view @tap="onUpload">+</view>
		</view>
		<u-button type="success" text="报送" @click="rightcilck" color="#11B38C" class="button"></u-button>
	</view>
</template>

<script>
	import TwoNavbar from '../../components/TwoNavbar/TwoNavbar.vue';
	import uploadImg from '../../components/xiaohuang-uploadImg/uploadImg.vue';
	import {
		BASE_URL
	} from '../../utils/request.js';

	export default {
		components: {
			TwoNavbar,
			uploadImg,
		},
		data() {
			return {
				close1: true,
				logo: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F00%2F00%2F07%2F155788a6d8a5c42.jpg&refer=http%3A%2F%2Fbpic.588ku.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1619847627&t=2da40b583002205c204d980b54b35040',
				name: "报送",
				// rightText: '确认报送',
				userAdd: {
					id: '',
					content: '',
					title: '',
					fileNo: '',
					feedback: '1',
					fileNoticeId: '',
					feedbackExpireTime: '',
					status: '',
					companyIds: '',
					companyList: [],
					receiveUserIds: '',
					remark: '',
					fileList: []
				},
				list: [],
				imgList: [],
				value1: '',
				fileList: [],
				imageValue: []
			};
		},
		onLoad(val) {
			this.id = val.id;
			this.userAdd.fileNoticeId = val.id
			this.selectbaosong()
		},
		methods: {
			/* 查询报送记录 */
			selectbaosong() {
				uni.showLoading({
					title: '加载中',
				});
				this.$http(`/filenotice/feedback/get/${this.id}`, 'GET', false)
					.then(res => {
						if (res.code == 0) {
							uni.hideLoading();
							console.log(res.data)
							this.userAdd = res.data
						} else {
							console.log(res)
							uni.showToast({
								title: res.data.msg,
								icon: 'none',
								duration: 2000
							});
						}
					})
					.catch(err => {
						console.log(err);
					});
			},
			toSubmission() {
				uni.showLoading({
					title: '加载中',
				});
				this.userAdd.id = this.id
				this.$http('/filenotice/save', 'POST', this.userAdd, false)
					.then(res => {
						if (res.code == 0) {
							uni.showToast({
								title: '报送成功',
								duration: 1500
							});
							setTimeout(() => {
								uni.navigateBack({
									delta: 1
								});
							}, 1500);
						} else {
							console.log(res)
							uni.showToast({
								title: res.data.msg,
								icon: 'none',
								duration: 2000
							});
						}
					})
					.catch(err => {
						console.log(err);
					});
			},
			// 确认报送
			rightcilck() {
				console.log('---')
				uni.showLoading({
					title: '加载中',
				});
					this.userAdd.status = 1
				this.$http('/filenotice/feedback', 'POST', this.userAdd, false)
					.then(res => {
						if (res.code == 0) {
							uni.showToast({
								title: '报送成功',
								duration: 1500
							});
							setTimeout(() => {
								uni.navigateBack({
									delta: 1
								});
							}, 1500);
						} else {
							console.log(res)
							uni.showToast({
								title: res.data.msg,
								icon: 'none',
								duration: 2000
							});
						}
					})
					.catch(err => {
						console.log(err);

					});
			},
			// 输入框
			addtextarea(e) {},
			// 关闭
			close(v, index) {
				console.log(v)
				this.fileList.splice(index, 1)
			},
			onUpload2() {

			},
			/* 上传 */
			onUpload() {
				this.$refs.lFile.upload({
					// #ifdef APP-PLUS
					//（app端必传）nvue页面使用时请查阅nvue获取当前webview的api，当前示例为vue窗口
					currentWebview: this.$mp.page.$getAppWebview(),
					// #endif
					//替换为你的上传接口地址
					url: BASE_URL + '/upload/file',
					// 服务端接收附件的key
					name: 'file',
					//根据你接口需求自定义 (优先不传content-type,安卓端无法收到参数再传)
					header: {
						'token': uni.getStorageSync('token'),
					},
				});
			},
			onSuccess(res) {
				// console.log('上传成功回调', JSON.stringify(res));
				let uploadFile = {}
				uploadFile.url = res.data.data.file_full_url
				uploadFile.name = res.data.data.name
				uploadFile.fileImages = res.data.data.file_images
				console.log(uploadFile)
				this.fileList.push(uploadFile)
				uni.showToast({
					title: res.data.data.name,
					icon: 'none'
				})
			},
			leftClick() {
				console.log('leftClick');
				uni.navigateBack({
					delta: 1
				});
			},
			async chooseFile(list, v) {
				//上传图片
				await uni.uploadFile({
					url: BASE_URL + '/upload/image',
					filePath: v,
					name: 'pic',
					header: {
						accept: '*/*',
						'Content-Type': 'multipart/form-data',
						// 'Content-Type': 'application/x-www-form-urlencoded',
						token: uni.getStorageSync('token')
					},
					success: res => {
						const imgRes = JSON.parse(res.data);
						this.$set(this.imgList, this.imgList.length, imgRes.data.file_full_url);
					}
				});
			},
			imgDelete(list, eq) {
				//删除图片
				this.imgList = list;
			}

		}
	}
</script>

<style lang="scss" scoped>
	.submission {
		.uploadfile {
			width: 162upx;
			height: 170upx;
			font-size: 100upx;
			text-align: center;
			font-weight: 200;
			line-height: 170upx;
			border: 1px solid #666666;
			color: #666666;
			margin: 20upx 20upx;
			opacity: 0.4;
		}

		.textarea {
			margin: 20upx;
			border-radius: 16upx;
			box-shadow: 0px 3upx 16upx 0px rgba(0, 0, 0, 0.06);
		}

		/deep/.u-tag-wrapper {
			width: 80%;
			margin: 0 auto;

			span {
				width: 80%;
				display: block;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
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

		.form-item2 {
			padding: 40upx 0;

			.add-title {
				font-size: 28upx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #333333;
			}

			.uploadImg {
				margin: 20upx 0;
			}

			.add-1 {
				margin-right: 20upx;
				display: flex;
				align-items: center;

				.add-imgs {
					margin-right: 10upx;
					width: 40upx;
					height: 40upx;
				}
			}
		}
	}
</style>
