<template>
	<view class="review">
		 <TwoNavbar :name="twoname" :rightText="rightText" @rightcilck="submit" />
		<u--form class="review-form" labelPosition="left" :model="userAdd" :rules="rules" ref="uForm">
			<u-form-item class="form-item" prop="name" @click="show = true" borderBottom>
				<view class="add-1">
					<image class="add-imgs" src="../../static/danger/wei.png" mode=""></image>
				</view>
				<u--input v-model="userAdd.name"   placeholder="请输入" border="none"></u--input>
			</u-form-item>
			<view class="form-item2">
				<view class="add-1">
					<image class="add-imgs" src="../../static/add/pp.png" mode=""></image>
					<view class="add-title">点击上传整改照片</view>
				</view>
				<uploadImg class="uploadImg" ref="uploadImg" :mode="imgList" @chooseFile="chooseFile" @imgDelete="imgDelete" :control="control" :columnNum="columnNum" />
			</view>
		</u--form>
	</view>
</template>
<script>
import uploadImg from '../../components/xiaohuang-uploadImg/uploadImg.vue';
import TwoNavbar from '../../components/TwoNavbar/TwoNavbar.vue'
import { BASE_URL } from '../../utils/request.js';
export default {
	name: 'review',
	props: [],
	components: {
		uploadImg,
		TwoNavbar
	},
	data() {
		return {
			twoname:'隐患复核',
			rightText:"提交",
			showR:false,
			userAdd: {
				name: '',
				images:'',
			},
			control: true,
			columnNum: 4,
			imgList: [],
			objId:{},
			rules: {
				name: [
					{
						required: true,
						message: '请输入复核情况',
						trigger: ['blur', 'change']
					}
				],
			}
		};
	},
	onLoad(val) {
		this.objId = val
		
	},
	//组件生命周期
	created() {},
	mounted() {},
	methods: {
		handReview(){
			uni.showLoading({ title: '提交中', mask: true });
			this.$http(`/problems/recheck/${this.objId.id}`, 'POST', {
				recheckDesc:this.userAdd.name,
				solutionImages:this.userAdd.images
			}, false)
				.then(res => {
					uni.hideLoading();
					if (res.code == 0) {
						uni.showToast({
							title: '提交成功',
							duration: 1500
						});
						setTimeout(() => {
							uni.navigateBack({
								delta:1
							})
						},1500)
					}
				})
				.catch(err => {
					console.log(err);
				});
		},
		imgDelete(list, eq) {
			//删除图片
			this.imgList = list
		},
		chooseFile(list, v) {
			uni.uploadFile({
				url: BASE_URL + '/upload/image',
				filePath: v,
				name: 'pic',
				header: {
					accept: '*/*',
					'Content-Type': 'application/x-www-form-urlencoded',
					token: uni.getStorageSync('token')
				},
				success: res => {
					console.log(res,'222111111')
					const imgRes = JSON.parse(res.data);
					this.$set(this.imgList,this.imgList.length,imgRes.data.file_full_url)
				}
			});
		},
		submit() {
			this.$refs.uForm
				.validate()
				.then(res => {
					// if (this.imgList.length == 0) {
					// 	return uni.$u.toast('请上传图片');
					// }
					this.imgList.forEach(val => {
						this.userAdd.images += val + '|';
					});
					this.userAdd.images = this.userAdd.images.substr(0, this.userAdd.images.length - 1);
					this.handReview();
					uni.navigateBack({
						delta:1
					})
					/* uni.$u.toast('校验通过'); */
				})
				.catch(err => {
					console.log(err)
					/* uni.$u.toast('校验失败'); */
				});
		}
	},
};
</script>
<style lang="less" scoped>
.review {
	
	.review-form{
		padding: 10upx 24upx;
	}
	.form-item {
		.add-title {
			font-size: 28upx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #333333;
		}
		.add-1 {
			display: flex;
			align-items: center;
			.add-t {
				display: flex;
				align-items: center;
			}
			.add-imgs {
				margin-right: 10upx;
				width: 40upx;
				height: 40upx;
			}
		}
		/deep/.u-form-item__body {
			padding: 36upx 0;
		}
	}
	.form-item2 {
		padding: 40upx 0;
		.add-1 {
			display: flex;
			align-items: center;
			.add-t {
				display: flex;
				align-items: center;
			}
			.add-title {
				font-size: 28upx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #333333;
			}
			.add-imgs {
				margin-right: 10upx;
				width: 40upx;
				height: 40upx;
			}
		}
		.uploadImg {
			margin: 20upx 0;
		}
	}
}
</style>
