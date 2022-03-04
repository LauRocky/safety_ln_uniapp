<template>
	<view class="enclosure">
		<u-popup :show="showl" @close="handIcon" :closeable="false" :round="10" mode="bottom">
			<view class="titles" @click="uploadImg">
				添加照片
			</view>
			<view class="bont"></view>
			<view class="titles">
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
	import { BASE_URL } from '../../utils/request.js';
	export default {
		name: 'enclosure',
		props: ['showl', 'category2'],
		components: {
			uploadImg,
		},
		data() {
			return {
				maxCount:3,
				sourceType:['album'],
				imgList: [],
				showList: [],
				showUploadControl: true
			};
		},
		watch:{
		},
		onLoad() {},
		//组件生命周期
		created() {
		},
		mounted() {

		},
		methods: {
			// 上传图片
			uploadImg() {
				uni.chooseImage({
					sizeType: ['compressed'],
					sourceType: this.sourceType,
					count: this.maxCount,
					success: chooseImageRes => {
						chooseImageRes.tempFilePaths.forEach(val => {
							this.imgList.push(val);
							this.chooseFile(this.imgList,val)
						});
					}
				});
			},
			async chooseFile(list,v) {
				//上传图片
				await uni.uploadFile({
					url: BASE_URL + '/upload/image',
					filePath: v,
					name: 'pic',
					header: {
						accept: '*/*',
						'Content-Type': 'application/x-www-form-urlencoded',
						token: uni.getStorageSync('token')
					},
					success: res => {
						console.log(res.data,'------------------')
						const imgRes = JSON.parse(res.data);						
						this.$set(this.imgList, this.imgList.length, imgRes.data.file_full_url);
					}
				});
			},
			closefile(){
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
		.bont{
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
