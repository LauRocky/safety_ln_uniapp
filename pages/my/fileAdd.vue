<template>
	<view class="add">
		<TwoNavbar :name="twoname" :rightText="rightText" @leftClick="leftClick" @rightcilck='rightcilck' />
		<u--form class="add-form" labelPosition="left" :model="userAdd" :rules="rules" ref="uForm">
			<u-form-item class="form-item" prop="require" @click="showtitle = true" borderBottom>
				<view class="add-1">
					<image class="add-imgs" src="../../static/add/newSubject.png" mode=""></image>
					<view class="add-title">文件主题</view>
				</view>
				<u--input v-model="userAdd.title" maxlength="15" inputAlign="right" disabled placeholder="请输入文件通知主题"
					border="none"></u--input>
				<u-icon slot="right" name="arrow-right" color="#5F5F5F"></u-icon>
			</u-form-item>
			<u-form-item class="form-item" prop="location" @click="showfileNo = true" borderBottom>
				<view class="add-1">
					<image class="add-imgs" src="../../static/add/newFileNumber.png" mode=""></image>
					<view class="add-title">文件号</view>
				</view>
				<u--input v-model="userAdd.fileNo" maxlength="10" inputAlign="right" disabled placeholder="请输入文件号"
					border="none"></u--input>
				<u-icon slot="right" name="arrow-right" color="#5F5F5F"></u-icon>
			</u-form-item>
			<u-form-item class="form-item" prop="location" borderBottom>
				<view class="add-2">
					<view class="add-1">
						<image class="add-imgs" src="../../static/add/newDeadline.png" mode=""></image>
						<view class="add-title">是否报送</view>
					</view>
					<view class="add-1">
						<u-switch v-model="feedbackTwo" @change="change" activeColor="#11B38C"></u-switch>
						<!-- <u-switch v-model="userAdd.value3" @change="change" activeColor="#f56c6c"></u-switch> -->
					</view>
				</view>
			</u-form-item>
			<u-form-item class="form-item" prop="location" @click="feedbackExpireTime = true" borderBottom>
				<view class="add-1">
					<image class="add-imgs" src="../../static/add/qi.png" mode=""></image>
					<view class="add-title">报送截止时间</view>
				</view>
				<u--input v-model="userAdd.feedbackExpireTime" maxlength="10" inputAlign="right" disabled
					placeholder="请选择截止时间" border="none"></u--input>
				<u-icon slot="right" name="arrow-right" color="#5F5F5F"></u-icon>
			</u-form-item>
			<u-form-item class="form-item" prop="name" @click="showcompanyList = true" borderBottom>
				<view class="add-1">
					<image class="add-imgs" src="../../static/add/newUnitLeader.png" mode=""></image>
					<view class="add-title">签阅公司</view>
				</view>
				<u--input v-model="userAdd.companyList" inputAlign="right" disabled placeholder="请选择签阅公司" border="none">
				</u--input>
				<u-icon slot="right" name="arrow-right" color="#5F5F5F"></u-icon>
			</u-form-item>
			<u-form-item class="form-item" prop="require" @click="showcontent = true" borderBottom>
				<view class="add-1">
					<image class="add-imgs" src="../../static/add/newFileContent.png" mode=""></image>
					<view class="add-title">文件内容</view>
				</view>
				<u--input v-model="userAdd.content" maxlength="15" inputAlign="right" disabled placeholder="请输入文件通知主题"
					border="none"></u--input>
				<u-icon slot="right" name="arrow-right" color="#5F5F5F"></u-icon>
			</u-form-item>
			<view class="form-item2">
				<view class="add-1">
					<image class="add-imgs" src="../../static/add/newAddAttachment.png" mode=""></image>
					<view class="add-title">添加附件</view>
				</view>
				<view class="fileimgadd" @click="showfileimg = true">
					<view class="uploadfile">+</view>
				</view>
				<!-- <uploadImg class="uploadImg" ref="uploadImg" :mode="imgList" @chooseFile="chooseFile"
					@imgDelete="imgDelete" :control="control" :columnNum="columnNum" /> -->
			</view>
		</u--form>
		<u-datetime-picker v-model="valueData" :show="feedbackExpireTime" @cancel='cancel' @confirm='confirm'
			mode="date">
		</u-datetime-picker>
		<describe :showD="showtitle" @closeD="showtitle = false" @handEndD="handEndZ">文件主题</describe>
		<describe :showD="showfileNo" @closeD="showfileNo = false" @handEndD="handEndshowfileNo">文件号</describe>
		<signRead ref="signRead" :show="showcompanyList" @close="showcompanyList = false" @handEnd="handEndcompanyList"
			@companyId='companyId' />
		<describe :showD="showcontent" @closeD="showcontent = false" @handEndD="handEndshowcontent">文件内容</describe>
		<enclosure :showl="showfileimg" @closeL="showfileimg = false" @handEndD="handEndshowshowfileimg"></enclosure>
	</view>
</template>
<script>
	import TwoNavbar from '../../components/TwoNavbar/TwoNavbar.vue';
	import describe from '../../components/dangerList/describe.vue';
	import signRead from '../../components/my/signRead.vue';
	import uploadImg from '../../components/xiaohuang-uploadImg/uploadImg.vue';
	import enclosure from '../../components/my/enclosure.vue';
	import {
		BASE_URL
	} from '../../utils/request.js';
	export default {
		name: 'add',
		props: [],
		components: {
			TwoNavbar,
			describe,
			uploadImg,
			signRead,
			enclosure,
		},
		data() {
			return {
				valueData: Number(new Date()),
				control: true, //上传图片变量
				columnNum: 4,
				imgList: [],
				twoname: '文件通知',
				rightText: '上传',
				showtitle: false, //文件主题
				showfileNo: false, // 文件号
				feedbackExpireTime: false, // 报送截止时间
				showcompanyList: false, // 签约公司
				showcontent: false, // 文件内容
				showfileimg: false, // 添加附件
				feedbackTwo: true,
				userAdd: {
					title: '',
					fileNo: '',
					feedback: 0,
					feedbackExpireTime: '',
					// feedbackExpireTime: new Date().getFullYear() + '/' + (new Date().getMonth() + 1) + '/' + new Date()
					// .getDate(),
					companyIds: '',
					companyList: '',
					content: '',
					companyId: '',
				},
				rules: {
					value: [{
						required: true,
						message: '请填写要求',
						trigger: ['blur', 'change']
					}],
				},
			};
		},
		methods: {
			// 文件主题
			handEndZ(v) {
				//要求
				this.userAdd.title = v;
				this.showtitle = false;
			},
			// 文件号
			handEndshowfileNo(v) {
				this.userAdd.fileNo = v
				this.showfileNo = false
			},
			// 是否报送
			change(e) {
				console.log('change', e);
			},
			// 报送截止时间
			cancel(e) {
				console.log(e)
				this.feedbackExpireTime = false
			},
			confirm(e) {
				console.log(this.valueData)
				console.log(e)
				var data = new Date().getTime();
				if (data > e.value) {
					uni.showToast({
						title: '请选择正确的时间',
						icon: 'none',
						duration: 2000
					});
				} else {
					var d = new Date(e.value);
					this.userAdd.feedbackExpireTime = this.dateToStr(d)
					console.log(this.userAdd.feedbackExpireTime)
					this.feedbackExpireTime = false
				}

			},
			// 签约公司
			handEndcompanyList(v) {
				console.log(v)
				this.userAdd.companyList = v.name
				this.showcompanyList = false
			},
			companyId(v) {
				console.log(v)
				this.userAdd.companyId = v
				this.userAdd.companyIds = v
			},
			// 文件内容
			handEndshowcontent(v) {
				this.userAdd.content = v
				this.showcontent = false
			},
			handEndshowshowfileimg() {

			},
			// 添加文件
			addFile() {
				uni.showLoading({
					title: '加载中',
				});
				if (this.feedbackTwo) {
					this.userAdd.feedback = 1
				} else {
					this.userAdd.feedback = 0
				}
				// this.userAdd.companyIds = this.userAdd.companyList.join(',')
				this.$http('/filenotice/save', 'POST', this.userAdd, false)
					.then(res => {
						if (res.code == 0) {
							uni.showToast({
								title: '创建成功',
								duration: 1500
							});
						}
					})
					.catch(err => {
						console.log(err);
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
			},
			leftClick() {
				uni.navigateBack({
					delta: 1
				});
			},
			rightcilck() {
				this.addFile()
			},
			ultZeroize(v, l) {
				var z = "";
				l = l || 2;
				v = String(v);
				for (var i = 0; i < l - v.length; i++) {
					z += "0";
				}
				return z + v;
			},
			dateToStr(d) {
				if (typeof(d) == "string") d = new Date(d * 1000);
				return (d.getFullYear() + '-' + this.ultZeroize(d.getMonth() + 1) + '-' + this.ultZeroize(d.getDate()));
			},
			// 获取数据
		}
	};
</script>
<style lang="less" scoped>
	.add {
		background: #ffffff;

		.add-form {
			padding: 0upx 24upx 36upx 24upx;

			.u-form-item__body {
				background: #ffffff;
			}

			/deep/.u-input__content {
				background: #ffffff;
			}

			/deep/.uni-input-placeholder {
				position: absolute;
				right: 0;
			}
		}

		.add-1 {
			margin-right: 20upx;
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

		.add-2 {
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: space-between;
		}

		.form-item {
			.add-title {
				font-size: 28upx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #333333;
			}

			/deep/.u-form-item__body {
				padding: 36upx 0;
			}

			/deep/.u-form-item__body__right__message {
				margin-left: 75vw !important;
			}
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
		}

		.fileimgadd {
			width: 162upx;
			height: 170upx;
			.uploadfile{
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
		}
	}
</style>
