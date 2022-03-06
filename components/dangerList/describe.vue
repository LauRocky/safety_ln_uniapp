<template>
	<view class="describe">
		<u-popup :show="showD" @close="handIcon" :round="10" mode="center">
			<view class="main">
				<view class="titles">
					<u-icon class="icon" @click="handIcon" name="arrow-left" color="#333333" size="28"></u-icon>
					<text><slot></slot></text>
					<text class="text-que" @click="handcoo">确定</text>
				</view>
				<view class="text-a">
					<u--textarea v-model="value2" height="150" border="none" maxlength="100" placeholder="请输入内容" count></u--textarea>
				</view>
			</view>
		</u-popup>
	</view>
</template>
<script>
export default {
	name: 'describe',
	props: ['name','showD'],
	components: {},
	data() {
		return {
			value2: ''
		};
	},
	onLoad() {},
	//组件生命周期
	created() {},
	mounted() {},
	methods: {
		init(val){
			this.value2=val;
		},
		handcoo() {
			this.$emit('handEndD',this.value2);
		},
		handIcon() {
			this.$emit('closeD');
		}
	}
};
</script>
<style lang="less" scoped>
.describe {
	.main {
		width: 80vw;
		padding: 40upx 30upx;
		.titles {
			text-align: center;
			font-size: 32upx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #333333;
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
		.text-a{
			padding-top: 30upx;
		}
	}
}
</style>
