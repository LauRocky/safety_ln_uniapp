<template>
	<view class="two-nav"><u-navbar :fixed="true" :safeAreaInsetTop="true" class="navbar-coo" safeAreaInsetTop  :title="name" :rightText="rightText" @rightClick="rightClick" bgColor="#11B38C" @leftClick="leftClick"></u-navbar></view>
</template>
<script>
export default {
	name: 'TwoNavbar',
	props: ['name', 'rightText'],
	components: {},
	data() {
		return {};
	},
	onLoad() {},
	//组件生命周期
	created() {},
	mounted() {},
	methods: {
		rightClick() {
			this.$emit('rightcilck');
		},
		leftClick() {
			uni.navigateBack({
				delta: 1
			});
		}
	}
};
</script>
<style lang="less" scoped>
.two-nav {
	/deep/.u-navbar {
		.u-icon--right {
			.u-icon__icon {
				color: #ffffff !important;
			}
		}
		.u-navbar__content__title,
		.u-navbar__content__right {
			color: #ffffff !important;
		}
	}
}
</style>
