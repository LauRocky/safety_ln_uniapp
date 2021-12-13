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
			<u-form-item class="form-item" prop="dagner"  @click="showl = true" borderBottom>
				<view class="add-1">
					<image class="add-imgs" src="../../static/add/yihuan.png" mode=""></image>
					<view class="add-title">隐患等级</view>
				</view>
				<u--input v-model="userAdd.dagner" inputAlign="right" disabled placeholder="请选择" border="none"></u--input>
				<u-icon slot="right" name="arrow-right" color="#5F5F5F"></u-icon>
			</u-form-item>
			<u-form-item class="form-item" prop="rectification" borderBottom>
				<view class="add-1">
					<image class="add-imgs" src="../../static/add/zheng.png" mode=""></image>
					<view class="add-title">整改人</view>
				</view>
				<u--input v-model="userAdd.rectification" inputAlign="right" placeholder="请选择" border="none"></u--input>
				<u-icon slot="right" name="arrow-right" color="#5F5F5F"></u-icon>
			</u-form-item>
			<u-form-item class="form-item" prop="person" borderBottom>
				<view class="add-1">
					<image class="add-imgs" src="../../static/add/zhi.png" mode=""></image>
					<view class="add-title">知会人</view>
				</view>
				<u--input v-model="userAdd.person" inputAlign="right" placeholder="请选择" border="none"></u--input>
				<u-icon slot="right" name="arrow-right" color="#5F5F5F"></u-icon>
			</u-form-item>
			<u-form-item class="form-item" prop="Details" borderBottom>
				<view class="add-1">
					<image class="add-imgs" src="../../static/add/xq.png" mode=""></image>
					<view class="add-title">隐患详情描述</view>
				</view>
				<u--input v-model="userAdd.Details" inputAlign="right" placeholder="请选择" border="none"></u--input>
				<u-icon slot="right" name="arrow-right" color="#5F5F5F"></u-icon>
			</u-form-item>
			<u-form-item class="form-item" prop="require" borderBottom>
				<view class="add-1">
					<image class="add-imgs" src="../../static/add/gai.png" mode=""></image>
					<view class="add-title">整改要求</view>
				</view>
				<u--input v-model="userAdd.require" inputAlign="right" placeholder="请选择" border="none"></u--input>
				<u-icon slot="right" name="arrow-right" color="#5F5F5F"></u-icon>
			</u-form-item>
			<u-form-item class="form-item" prop="location" borderBottom>
				<view class="add-1">
					<image class="add-imgs" src="../../static/add/wei.png" mode=""></image>
					<view class="add-title">详细发生位置</view>
				</view>
				<u--input v-model="userAdd.location" inputAlign="right" placeholder="请选择" border="none"></u--input>
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
		</u--form>
		<projectPicker :show="show" @close="handclose" @handEnd="handEnd" />
		<levelPicker :showl="showl" @closeL="handcloseL" @handEndl="handEndl" />
		<rectification :showR="showR" @closeL="handcloseR" @handEndl="handEndR" />
	</view>
</template>
<script>
import projectPicker from '../../components/dangerList/projectPicker.vue';
import levelPicker from '../../components/dangerList/levelPicker.vue'
import rectification from '../../components/dangerList/rectification.vue'
export default {
	name: 'add',
	props: [],
	components: {
		projectPicker,
		levelPicker,
		rectification
	},
	data() {
		return {
			show: false,
			showl: false,
			showR:true,
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
		handEnd(v) {
			this.userAdd.name = v.name;
			this.show = false;
		},
		handEndl(v){
			this.userAdd.dagner = v.value;
			this.showl = false;
		},
		handformpick() {
			console.log('123123');
		},
		handclose() {
			this.show = false;
		},
		handcloseL(){
			this.showl = false;
		},
		submit() {
			this.$refs.uForm.validate()
				.then(res => {
					uni.$u.toast('校验通过');
				})
				.catch(errors => {
					uni.$u.toast('校验失败');
				});
		}

	},
	onNavigationBarButtonTap() {
		this.submit()
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
