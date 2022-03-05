<template>
	<view class="enclosure">
		<u-popup :show="showl" @close="handIcon" :closeable="false" :round="10" mode="bottom">
			<!-- <view class="titles" @click="uploadImg">
				添加照片
			</view> -->
			<view class="bont"></view>
			<l-file ref="lFile" :logo="logo" @up-success="onSuccess"></l-file>
			<view class="titles" @tap="onUpload">
				添加系统文件
			</view>
			<view class="bont"></view>
			<view class="titles" @click="closefile">
				取消
			</view>
		</u-popup>
		<!-- <uploadImg class="uploadImg" ref="uploadImg" :mode="imgList" @chooseFile="chooseFile" @imgDelete="imgDelete" :control="control" :columnNum="columnNum" /> -->
	</view>
</template>
<script>
	import uploadImg from '../../components/xiaohuang-uploadImg/uploadImg.vue';
	import {
		getDictList
	} from '../../utils/api.js';
	import {
		BASE_URL
	} from '../../utils/request.js';
	export default {
		name: 'enclosure',
		props: ['showl', 'category2','fileList'],
		components: {
			uploadImg,
		},
		data() {
			return {
				maxCount: 3,
				sourceType: ['album'],
				imgList: [],
				showList: [],
				showUploadControl: true,
				logo: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F00%2F00%2F07%2F155788a6d8a5c42.jpg&refer=http%3A%2F%2Fbpic.588ku.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1619847627&t=2da40b583002205c204d980b54b35040',
			};
		},
		watch: {},
		onLoad() {},
		//组件生命周期
		created() {},
		mounted() {

		},
		methods: {
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
				this.fileList.push(uploadFile)
				uni.showToast({
					title: res.data.data.name,
					icon: 'none'
				})
				this.$emit('successfile',this.fileList)
			},
			// 上传图片
			uploadImg() {
				uni.chooseImage({
					sizeType: ['compressed'],
					sourceType: this.sourceType,
					count: this.maxCount,
					success: chooseImageRes => {
						chooseImageRes.tempFilePaths.forEach(val => {
							this.imgList.push(val);
							this.chooseFile(this.imgList, val)
						});
					}
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
						// 'Content-Type': 'application/x-www-form-urlencoded',
						'Content-Type': 'multipart/form-data',
						token: uni.getStorageSync('token')
					},
					success: res => {
						console.log(res.data, '------------------')
						const imgRes = JSON.parse(res.data);
						this.$set(this.imgList, this.imgList.length, imgRes.data.file_full_url);
					}
				});
			},
			closefile() {
				this.$emit('closeL')
			},
		}
	};
</script>
<style lang="less" scoped>
	.enclosure {
		.titles {
			position: relative;
			padding: 40upx 0;
			text-align: center;
			font-size: 32upx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #333333;


			.icon {
				position: absolute;
				top: 30upx;
				right: 20upx;
			}
		}

		.bont {
			width: 95%;
			height: 2upx;
			background-color: #BCBCBC;
			opacity: 0.2;
			margin: 0 auto;
			border-bottom: 2upx solid #BCBCBC;
		}

		.main {
			padding: 20upx 29upx 0 64upx;

			.title2 {
				font-size: 32upx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #333333;
			}

			.scroll-a {
				padding-top: 30upx;
				height: 40vh;

				.text-a {
					padding: 20upx 0;
					font-size: 28upx;
					font-family: PingFang SC;
					font-weight: bold;
				}

				.active {
					color: #00b490;
				}
			}
		}
	}
</style>
