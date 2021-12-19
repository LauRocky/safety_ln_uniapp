<template>
	<view class="navbar">
		<u-navbar :fixed="true" :placeholder="true" :safeAreaInsetTop="true" bgColor="#11B38C" leftIcon="">
			<view class="u-nav-left" @click="handUpqie" slot="left" style="color: #FFFFFF;font-size: 36upx;font-weight: bold;">
				<view class="left-1">{{ title }}</view>
				<image class="sanjiao" src="../../static/home/sanjiao.png" mode=""></image>
			</view>
			<view class="u-nav-right" slot="right">
				<u-search v-model="seach" @search="handsearch" shape="round" height="50" bgColor="#ffffff" searchIconColor="#b3b3b3" :showAction="false"></u-search>
			</view>
		</u-navbar>
	</view>
</template>
<script>
export default {
	name: '',
	props: ['title'],
	components: {},
	data() {
		return {
			seach: ''
		};
	},
	onLoad() {},
	//组件生命周期
	created() {},
	mounted() {},
	methods: {
		handUpqie(){
			this.$emit('Upqie');
		},
		handsearch() {
			this.$emit('seach', this.seach);
		}
	}
};
</script>
<style lang="less" scoped>
.navbar {
	.u-nav-left {
		width: 200upx;
		position: relative;
		.left-1 {
			font-size:32upx;
			width: 190upx;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
		.sanjiao {
			position: absolute;
			right: 0;
			bottom: 7upx;
			width: 20upx;
			height: 20upx;
		}
	}
	/deep/.u-nav-right {
		width: 450upx !important;
		.u-icon__icon {
			font-size: 56upx !important;
			color: #a5a5a5 !important;
		}
	}
}
</style>
