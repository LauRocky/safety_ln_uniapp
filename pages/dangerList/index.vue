<template>
	<view>
		<nav-bar :title="title" @seach="handseach"></nav-bar>
		<view class="end-title">
			<view @tap="change(0)" :class="{ btna: btnnum == 0 }">全部</view>
			<view @tap="change(1)" :class="{ btna: btnnum == 1 }">我的</view>
		</view>

		<view class="end-cont" :class="{ dis: btnnum == 0 }">0信息</view>

		<view class="end-cont" :class="{ dis: btnnum == 1 }">1信息</view>
	</view>
</template>

<script>
import navBar from '../../components/navBar/navBar.vue'
export default {
	components: {
		navBar
	},
	data() {
		return {
			title:'隐患列表',
			btnnum: 0,
			dangerName: '',
			showTitle: true
		};
	},
	onLoad() {},
	methods: {
		handseach(val){
			console.log(val,'1231231')
		},
		change(e) {
			this.btnnum = e;
		},
		search() {
			uni.showToast({
				title: '搜索'
			});
		}
	}
};
</script>

<style scoped>
>>> .u-navbar__content__left__text {
	color: #ffffff !important;
	font-size: 40rpx;
	margin-left: 22rpx;
}
>>> .u-icon__icon {
	color: #ffffff !important;
	font-size: 60rpx !important;
	margin-right: 22rpx;
}
.input-item {
	background-color: #ffffff;
	color: #000000;
	border-radius: 50px;
	height: 45rpx;
	width: 300rpx;
}
/* 将三个内容view的display设置为none(隐藏) */
.end-title {
	display: flex;
	color: #707070;
	height: 50px;
	line-height: 50px;
	font-weight: 750;
	background-color: #f2f2f2;
}
.end-title view {
	flex-grow: 1;
	text-align: center;
}
.end-cont {
	display: none;
	background: #c8c7cc;
}
.btna {
	color: #000000;
	border-bottom: 3px solid #2297f4;
}
.dis {
	display: block;
}
</style>
