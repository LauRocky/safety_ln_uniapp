<template>
	<view class="imglistbx">
		<view :class="['imglistItem', columnNum == 3 ? 'column3' : 'column4']" v-for="(item, index) in showList" :key="index">
			<image :src="item" class="itemImg" @click="previewImage(index)" mode="aspectFill"></image>
			<icon size="18" type="cancel" class="cancelBtn" @click="deleteImg(index)" v-if="deleteBtn"></icon>
		</view>
		<!-- 上传控件 -->
		<view :class="['imglistItem', columnNum == 3 ? 'column3' : 'column4']" @click="uploadImg"><view class="itemImg uploadControl">+</view></view>
		<view class="clear"></view>
	</view>
</template>

<script>
export default {
	props: {
		//是否显示上传控件
		control: {
			type: Boolean,
			default: true
		},
		//是否显示上删除按钮
		deleteBtn: {
			type: Boolean,
			default: true
		},
		//行数量
		columnNum: {
			type: [Number, String],
			default: 4
		},
		//album 从相册选图，camera 使用相机
		sourceType: {
			type: Array,
			default: function() {
				return ['album'];  //让删除了使用相机
			}
		},
		//最大上传数量
		maxCount: {
			type: [Number, String],
			default: 9
		},
		//服务返回回调的图片数组--回填
		mode: {
			type: Array,
			default: function() {
				return [];
			}
		}
	},
	data() {
		return {
			imgList: [],
			showList: [],
			showUploadControl: true
		};
	},
	watch: {
		mode:{
			 handler (v) {
			       this.init(v);
			      },
			      deep: true
		},
		control(v) {
			this.showUploadControl = v;
		}
	},
	created() {
		
		this.init(this.mode);
	},
	methods: {
		init(v) {
			if (this.mode.length != 0) {
				this.showList = v;
				return;
			}
			this.showList = this.imgList
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
						this.$emit('chooseFile', this.imgList, val);
					});
				}
			});
		},
		//删除图片
		deleteImg(eq) {
			uni.showModal({
				title: '提示',
				content: '您确定删除吗？',
				success: res => {
					if (res.confirm) {
						this.showList.splice(eq, 1);
						this.imgList.splice(eq, 1)
						this.$emit('imgDelete', this.showList, eq);
					}
				}
			});
		},
		// 预览图片
		previewImage(eq) {
			uni.previewImage({
				current: this.showList[eq],
				urls: this.showList
			});
		},
		//返回需要操作的图片数组
		//如果是回调了则操作回填后的数组 否则操作临时路径的图片数组
		// handleImg() {
		// 	return this.mode.length > 0 ? this.showList : this.imgList;
		// },
		//判断图片数量是否已经到最大数量
		// isMaxNum() {
		// 	if (this.showList.length >= this.maxCount) {
		// 		this.showUploadControl = false;
		// 	} else {
		// 		this.showUploadControl = true;
		// 	}
		// }
	}
};
</script>

<style scoped>
/* 上传  str */
.imglistbx {
	width: 100%;
	height: 100%;
}

.imglistItem {
	position: relative;
	float: left;
	margin-bottom: 20rpx;
	border-radius: 10rpx;
}

.column3 {
	width: 33.3333%;
	height: 160rpx;
}

.column4 {
	width: 25%;
	height: 130rpx;
}

.itemImg {
	width: 70%;
	height: 100%;
	margin: 0 auto;
	display: block;
	border-radius: 10rpx;
}

.cancelBtn {
	position: absolute;
	top: -10rpx;
	right: 10rpx;
}

/* 上传控件 */
.uploadControl {
	font-size: 50rpx;
	color: #888;
	background-color: #eeeeee;
	display: flex;
	justify-content: center;
	align-items: center;
}

/*  上传  str end*/
.clear {
	clear: both;
}
</style>
