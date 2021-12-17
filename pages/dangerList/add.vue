<template>
	<view class="add">
		<u--form labelPosition="left" :model="userAdd" :rules="rules" ref="uForm">
			<u-form-item class="form-item" prop="name" @click="show = true" borderBottom>
				<view class="add-1">
					<image class="add-imgs" src="../../static/add/xiangmu.png" mode=""></image>
					<view class="add-title">所属项目部（必填）</view>
				</view>
				<u--input v-model="userAdd.name" inputAlign="right" disabled placeholder="请选择" border="none"></u--input>
				<u-icon slot="right" name="arrow-right" color="#5F5F5F"></u-icon>
			</u-form-item>
			<u-form-item class="form-item" prop="dagner" @click="showl = true" borderBottom>
				<view class="add-1">
					<image class="add-imgs" src="../../static/add/yihuan.png" mode=""></image>
					<view class="add-title">隐患等级</view>
				</view>
				<u--input v-model="userAdd.dagner" inputAlign="right" disabled placeholder="请选择" border="none"></u--input>
				<u-icon slot="right" name="arrow-right" color="#5F5F5F"></u-icon>
			</u-form-item>
			<u-form-item class="form-item" prop="type" @click="showT = true" borderBottom>
				<view class="add-1">
					<image class="add-imgs" src="../../static/add/leixing.png" mode=""></image>
					<view class="add-title">隐患类型</view>
				</view>
				<u--input v-model="userAdd.type" inputAlign="right" disabled placeholder="请选择" border="none"></u--input>
				<u-icon slot="right" name="arrow-right" color="#5F5F5F"></u-icon>
			</u-form-item>
			<u-form-item class="form-item" prop="rectification" @click="showR = true" borderBottom>
				<view class="add-1">
					<image class="add-imgs" src="../../static/add/zheng.png" mode=""></image>
					<view class="add-title">整改人</view>
				</view>
				<u--input v-model="userAdd.rectification" inputAlign="right" disabled placeholder="请选择" border="none"></u--input>
				<u-icon slot="right" name="arrow-right" color="#5F5F5F"></u-icon>
			</u-form-item>
			<u-form-item class="form-item" prop="person" @click="showP = true" borderBottom>
				<view class="add-1">
					<image class="add-imgs" src="../../static/add/zhi.png" mode=""></image>
					<view class="add-title">知会人</view>
				</view>
				<u--input v-model="userAdd.person" maxlength="15" inputAlign="right" disabled placeholder="请选择" border="none"></u--input>
				<u-icon slot="right" name="arrow-right" color="#5F5F5F"></u-icon>
			</u-form-item>
			<u-form-item class="form-item" prop="Details" @click="showD = true" borderBottom>
				<view class="add-1">
					<image class="add-imgs" src="../../static/add/xq.png" mode=""></image>
					<view class="add-title">隐患详情描述</view>
				</view>
				<u--input v-model="userAdd.Details" maxlength="15" inputAlign="right" disabled placeholder="请选择" border="none"></u--input>
				<u-icon slot="right" name="arrow-right" color="#5F5F5F"></u-icon>
			</u-form-item>
			<u-form-item class="form-item" prop="require" @click="showZ = true" borderBottom>
				<view class="add-1">
					<image class="add-imgs" src="../../static/add/gai.png" mode=""></image>
					<view class="add-title">整改要求</view>
				</view>
				<u--input v-model="userAdd.require" maxlength="15" inputAlign="right" disabled placeholder="请选择" border="none"></u--input>
				<u-icon slot="right" name="arrow-right" color="#5F5F5F"></u-icon>
			</u-form-item>
			<u-form-item class="form-item" prop="location" @click="showA = true" borderBottom>
				<view class="add-1">
					<image class="add-imgs" src="../../static/add/wei.png" mode=""></image>
					<view class="add-title">详细发生位置</view>
				</view>
				<u--input v-model="userAdd.location" maxlength="10" inputAlign="right" disabled placeholder="请选择" border="none"></u--input>
				<u-icon slot="right" name="arrow-right" color="#5F5F5F"></u-icon>
			</u-form-item>
			<u-form-item class="form-item" prop="period" borderBottom>
				<view class="add-1">
					<image class="add-imgs" src="../../static/add/qi.png" mode=""></image>
					<view class="add-title">整改期限</view>
				</view>
				<u-input v-model="userAdd.period" inputAlign="right" placeholder="请选择" border="none">
					<template slot="suffix">
						<text style="color:#5F5F5F;">天</text>
					</template>
				</u-input>
			</u-form-item>
			<view class="form-item2">
				<view class="add-1">
					<image class="add-imgs" src="../../static/add/pp.png" mode=""></image>
					<view class="add-title">隐患照片</view>
				</view>
				<uploadImg class="uploadImg" ref="uploadImg" :mode="imgList" @chooseFile="chooseFile" @imgDelete="imgDelete" :control="control" :columnNum="columnNum" />
			</view>
		</u--form>
		<projectPicker :show="show" @close="show = false" @handEnd="handEnd" />
		<levelPicker :showl="showl" @closeL="showl = false" @handEndl="handEndl" />
		<levelType :showl="showT" @closeL="showT = false" @handEndl="handEndT" />
		<rectification :showR="showR" @closeR="showR = false" @handEndR="handEndR" />
		<InformPerson :showP="showP" @closeP="showP = false" @handEndP="handEndP" />
		<describe :showD="showD" @closeD="showD = false" @handEndD="handEndD">隐患详情描述</describe>
		<describe :showD="showZ" @closeD="showZ = false" @handEndD="handEndZ">整改要求</describe>
		<aderss :showA="showA" @closeA="showA = false" @handEndA="handEndA"></aderss>
	</view>
</template>
<script>
import projectPicker from '../../components/dangerList/projectPicker.vue';
import levelPicker from '../../components/dangerList/levelPicker.vue';
import levelType from '../../components/dangerList/levelType.vue';
import rectification from '../../components/dangerList/rectification.vue';
import InformPerson from '../../components/dangerList/InformPerson.vue';
import describe from '../../components/dangerList/describe.vue';
import aderss from '../../components/dangerList/aderss.vue';
import uploadImg from '../../components/xiaohuang-uploadImg/uploadImg.vue';
import { BASE_URL } from '../../utils/request.js';

export default {
	name: 'add',
	props: [],
	components: {
		projectPicker,
		levelPicker,
		levelType,
		rectification,
		InformPerson,
		describe,
		aderss,
		uploadImg
	},
	data() {
		return {
			show: false, //项目显隐
			showl: false, //等级
			showT: false, //类型
			showR: false, //整改
			showP: false, //知会
			showD: false, //描述
			showZ: false, //整改
			showA: false, //地址
			userAdd: {
				name: '',
				dagner: '',
				type: '',
				rectification: '',
				person: '',
				Details: '',
				require: '',
				location: '',
				period: '10',
				images: '',
				companyId: '', //项目id
				projectId: '', //隐患id
				assessment: '', //隐患等级，参考字典值。取code
				problemType: '', //选择，隐患类型，参考字典值。取code
				problemSolver: '', //整改人
				notifyPerson: '' //只会人
			},
			control: true,   //上传图片变量
			columnNum: 4,
			imgList: [],
			rules: {
				name: [
					{
						required: true,
						message: '请选择项目',
						trigger: ['blur', 'change']
					}
				],
				dagner: [
					{
						required: true,
						message: '请选择等级',
						trigger: ['blur', 'change']
					}
				],
				type: [
					{
						required: true,
						message: '请选择类型',
						trigger: ['blur', 'change']
					}
				],
				rectification: [
					{
						required: true,
						message: '请选择整改人',
						trigger: ['blur', 'change']
					}
				],
				Details: [
					{
						required: true,
						message: '请填写详情',
						trigger: ['blur', 'change']
					}
				],
				require: [
					{
						required: true,
						message: '请填写要求',
						trigger: ['blur', 'change']
					}
				],
				period: [
					{
						required: true,
						message: '请填写期限',
						trigger: ['blur', 'change']
					}
				]
			}
		};
	},
	onLoad() {},
	//组件生命周期
	created() {},
	mounted() {},
	methods: {
		handAdd() {   //添加隐患
			let expireTime = new Date();
			expireTime = expireTime.getTime() + this.userAdd.period * 24 * 60 * 60 * 1000;
			this.$http(
				'/problems',
				'POST',
				{
					companyId: this.userAdd.companyId,
					projectId: this.userAdd.projectId,
					problemType: this.userAdd.problemType,
					assessment: this.userAdd.assessment,
					problemSolver: this.userAdd.problemSolver,
					notifyPerson: this.userAdd.notifyPerson,
					expireTime: expireTime,
					problemDesc: this.userAdd.Details,
					problemRequire: this.userAdd.require,
					areaDetail: this.userAdd.location,
					images: this.userAdd.images,
					location: this.userAdd.location,
					source: 0
				},
				false
			).then(res => {
					if (res.code == 0) {
						uni.showToast({
							title: '创建成功',
							duration: 1500
						});
						setTimeout(() => {
							uni.navigateBack({
								delta: 1
							});
						}, 1500);
					}
				})
				.catch(err => {
					console.log(err);
				});
		},
		chooseFile(list, v) {   //上传图片
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
					const imgRes = JSON.parse(res.data);
					this.imgList.push(imgRes.data.file_full_url);
				}
			});
		},
		imgDelete(list, eq) {
			this.imgList.splice(eq, 1);
		},
		handEnd(v) {
			//项目
			this.userAdd.name = v.name;
			this.userAdd.companyId = v.companyId;
			this.userAdd.projectId = v.projectId;
			this.show = false;
		},
		handEndl(v) {
			//隐患
			this.userAdd.dagner = v.value;
			this.userAdd.assessment = v.code;
			this.showl = false;
		},
		handEndT(v) {
			//隐患类型
			this.userAdd.type = v.value;
			this.userAdd.problemType = v.code;
			this.showT = false;
		},

		handEndR(v) {
			//整改
			this.userAdd.rectification = v.fullname;
			this.userAdd.problemSolver = v.userId;
			this.showR = false;
		},
		handEndP(v) {
			//知会
			this.userAdd.person = v.titlelist;
			this.userAdd.notifyPerson = v.value;
			this.showP = false;
		},
		handEndD(v) {   //xq
			this.userAdd.Details = v;
			this.showD = false;
		},
		handEndZ(v) {   //要求
			this.userAdd.require = v;
			this.showZ = false;
		},
		handEndA(v) {  //地址
			this.userAdd.location = v;
			this.showA = false;
		},
		handformpick() {
			console.log('123123');
		},
		submit() {
			this.$refs.uForm
				.validate()
				.then(res => {
					if (this.imgList.length == 0) {
						return uni.$u.toast('请上传图片');
					}
					this.imgList.forEach(val => {
						this.userAdd.images += val + "|";
					});
					this.userAdd.images = this.userAdd.images.substr(0, this.userAdd.images.length - 1);
					this.handAdd();
					/* uni.$u.toast('校验通过'); */
				})
				.catch(errors => {
					uni.$u.toast('校验失败');
				});
		}
	},
	onNavigationBarButtonTap() {
		this.submit();
	}
};
</script>
<style lang="less" scoped>
.add {
	padding: 36upx 24upx;
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
}
</style>
