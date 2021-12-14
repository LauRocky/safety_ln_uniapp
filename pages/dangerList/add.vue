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
				<u--input v-model="userAdd.location" maxlength="15" inputAlign="right" disabled placeholder="请选择" border="none"></u--input>
				<u-icon slot="right" name="arrow-right" color="#5F5F5F"></u-icon>
			</u-form-item>
			<u-form-item class="form-item" prop="period" borderBottom>
				<view class="add-1">
					<image class="add-imgs" src="../../static/add/qi.png" mode=""></image>
					<view class="add-title">整改期限</view>
				</view>
				<u--input v-model="userAdd.period" inputAlign="right" placeholder="请选择" border="none">
					<template slot="suffix">
						<text style="color:#5F5F5F;">天</text>
					</template>
				</u--input>
			</u-form-item>
			<u-form-item class="form-item" prop="period" borderBottom>
				<view class="add-1">
					<image class="add-imgs" src="../../static/add/pp.png" mode=""></image>
					<view class="add-title">隐患照片</view>
				</view>
				<u-upload :fileList="fileList" @afterRead="afterRead" @delete="deletePic"></u-upload>
			</u-form-item>
		</u--form>

		<projectPicker :show="show" @close="handclose" @handEnd="handEnd" />
		<levelPicker :showl="showl" @closeL="handcloseL" @handEndl="handEndl" />
		<rectification :showR="showR" @closeR="handcloseR" @handEndR="handEndR" />
		<InformPerson :showP="showP" @closeP="handcloseP" @handEndP="handEndP" />
		<describe :showD="showD" @closeD="handcloseD" @handEndD="handEndD">隐患详情描述</describe>
		<describe :showD="showZ" @closeD="handcloseZ" @handEndD="handEndZ">整改要求</describe>
		<aderss :showA="showA" @closeA="handcloseA" @handEndA="handEndA"></aderss>
	</view>
</template>
<script>
import projectPicker from '../../components/dangerList/projectPicker.vue';
import levelPicker from '../../components/dangerList/levelPicker.vue';
import rectification from '../../components/dangerList/rectification.vue';
import InformPerson from '../../components/dangerList/InformPerson.vue';
import describe from '../../components/dangerList/describe.vue';
import aderss from '../../components/dangerList/aderss.vue';
import {BASE_URL} from '../../utils/request.js'
export default {
	name: 'add',
	props: [],
	components: {
		projectPicker,
		levelPicker,
		rectification,
		InformPerson,
		describe,
		aderss
	},
	data() {
		return {
			show: false, //项目显隐
			showl: false, //等级
			showR: false, //整改
			showP: false, //知会
			showD: false, //描述
			showZ: false, //整改
			showA: false, //地址
			userAdd: {
				name: '',
				dagner: '',
				rectification: '',
				person: '',
				Details: '',
				require: '',
				location: '',
				period: ''
			},
			fileList:[],
			nameobj: {},
			dagnerobj: {},
			cationobj: {},
			personobj: {},
			rules: {
				name: [
					{
						required: true,
						message: '请填写项目',
						trigger: ['blur', 'change']
					}
				],
				dagner: [
					{
						required: true,
						message: '请填写等级',
						trigger: ['blur', 'change']
					}
				],
				rectification: [
					{
						required: true,
						message: '请填写整改人',
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
		afterRead(file) {
			console.log(file)
			uni.uploadFile({
				url:BASE_URL + '/upload/image', //你上传接口
				pic: file.file, //上传的文件
				name: 'fileName', //后台接收文件的标识
				method:'POST',
				header: {
					'accept': '*/*',
					'content-type': 'application/x-www-form-urlencoded',
					'token': uni.getStorageSync('token')
				},
				success: res => {
					console.log(res);
					if (res.data.status == 'SUCCESS') {
					} else {
					}
				},
				fail: err => {}
			});
		},
		handEnd(v) {
			this.nameobj = v;
			this.userAdd.name = v.name;
			this.show = false;
		},
		handEndl(v) {
			this.dagnerobj = v;
			this.userAdd.dagner = v.value;
			this.showl = false;
		},
		handEndR(v) {
			this.cationobj = v;
			this.userAdd.rectification = v.fullname;
			this.showR = false;
		},
		handEndP(v) {
			this.personobj = v;
			this.userAdd.person = v.titlelist;
			this.showP = false;
		},
		handEndD(v) {
			this.userAdd.Details = v;
			this.showD = false;
		},
		handEndZ(v) {
			this.userAdd.require = v;
			this.showZ = false;
		},
		handEndA(v) {
			this.userAdd.location = v;
			this.showA = false;
		},
		handformpick() {
			console.log('123123');
		},
		handclose() {
			this.show = false;
		},
		handcloseL() {
			this.showl = false;
		},
		handcloseR() {
			this.showR = false;
		},
		handcloseP() {
			this.showP = false;
		},
		handcloseD() {
			this.showD = false;
		},
		handcloseZ() {
			this.showZ = false;
		},
		handcloseA() {
			this.showA = false;
		},
		submit() {
			this.$refs.uForm
				.validate()
				.then(res => {
					uni.$u.toast('校验通过');
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
}
</style>
