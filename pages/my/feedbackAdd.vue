<template>
	<view class="feedbackAdd">
		<TwoNavbar :name="titles" />
		<u--textarea v-model="obj.content" placeholder="您的意见是我进步的动力!" height="500upx" class="textarea" border="surround">
		</u--textarea>
		<view class="picturesUp">
			<text class="onloadimg">上传图片</text>
			<uploadImg class="uploadImg" ref="uploadImg" :mode="imgList" @chooseFile="chooseFile" @imgDelete="imgDelete"
				:control="control" :columnNum="columnNum" />
		</view>
		<u-button type="success" v-if="ids" text="更新" @click="UpdateData" color="#11B38C" class="button"></u-button>
		<u-button type="success" v-else text="提交" @click="SubmitOpinions" color="#11B38C" class="button"></u-button>
	</view>
</template>
<script>
	import uploadImg from '../../components/xiaohuang-uploadImg/uploadImg.vue';
	import TwoNavbar from '../../components/TwoNavbar/TwoNavbar.vue';
	import {
		BASE_URL
	} from '../../utils/request.js';
	export default {
		components: {
			uploadImg
		},
		data() {
			return {
				ids: "",
				titles: '反馈意见',
				value1: '',
				type: "",
				imgList: [],
				picList: [],
				obj: {},
				createUser: {},
				company: {},
				control: true, //上传图片变量
				columnNum: 4,
			};
		},
		methods: {
			// 3. 获取详情
			opinionDetail() {
				this.$http(`/problem/feedback/get/${this.ids}`, 'GET', {}, false)
					.then(res => {
						if (res.code == 0) {
							this.obj = res.data
							this.value1 = this.obj.content
							this.obj.picList.forEach(el => {
								let objdd={}
								objdd=el.url
								this.imgList.push(objdd)
							})
							this.createUser = res.data.createUser
							this.company = res.data.company
							this.picList = res.data.picList
						} else {
							console.log(res)
						}
					})
					.catch(err => {
						console.log(err)
					})
			},
			// 更新
			UpdateData() {
				this.$http('/problem/feedback/update', 'POST',
						this.obj, false)
					.then(res => {
						console.log(res)
						if(res.code==0){
							uni.showToast({
								title:"更新成功",
								icon:"none"
							})
							uni.navigateBack({
								delta:1
							})
						}
					})
					.catch(err => {
						console.log(err)
					})
			},
			async chooseFile(list, v) {
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
						const imgRes = JSON.parse(res.data);
						this.$set(this.imgList, this.imgList.length, imgRes.data.file_full_url)
					}
				});
			},
			imgDelete(list, eq) {
				console.log(list)
				//删除图片
				this.imgList = list
				this.obj.picList.splice(eq,1);
			},
			SubmitOpinions() {
				this.imgList.forEach(el => {
					let objs = {};
					objs.url = el
					this.picList.push(objs);
					// this.obj.picList.push(objs);
				})
				this.$http('/problem/feedback/save', 'POST', {
						'content': this.obj.content,
						'client': this.type,
						'picList': this.picList
					}, false).then(res => {
						if (res.code == 0) {
							this.value1 = '';
							uni.showToast({
								title: '提交成功',
								duration: 1000
							});
							uni.navigateBack({
								delta: 1
							})
						} else {
							console.log(res)
						}
					})
					.catch(err => {
						console.log(err)
					})
			},
		},
		onLoad(options) {
			this.ids = options.id
			if(this.ids){
				this.opinionDetail();
			}
			let type = uni.getSystemInfoSync().platform
			switch (type) {
				case 'android':
					this.type = 1
					break;
				case 'ios':
					this.type = 2
					break;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.feedbackAdd {
		.textarea {
			margin: 20upx;
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

		.picturesUp {
			padding: 40upx 0;

			.onloadimg {
				font-size: 28upx;
				font-family: PingFang SC;
				margin-left: 28upx;
			}

			.uploadImg {
				margin: 20upx 0;
			}
		}
	}
</style>
