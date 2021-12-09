<template>
	<view class="mypicker">
		<u-popup :show="show" :round="10" mode="bottom" @close="close" @open="open">
			<view class="titles">
				请选择所在公司
				<u-icon class="icon" @click="handIcon" name="close" color="#b5b5b5 " size="28"></u-icon>
			</view>
			<view class="main">
				<view class="main-left">
					<view class="left-1" @click="handleft(i)" :class="[leftIndex == i ? 'active' : '']" v-for="(val, i) in leftList" :key="i">{{ val.name }}</view>
				</view>
				<view class="main-right">
					<scroll-view class="right-scroll" @scrolltolower="handtolower" scroll-y>
						<view class="gg" :class="[ggIndex == i1 ? 'ggactive' : '']" @click="handGcompany(i1)" v-for="(val1, i1) in list" :key="i1">{{ val1.name }}</view>
					</scroll-view>
				</view>
			</view>
		</u-popup>
	</view>
</template>
<script>
export default {
	name: '',
	props: ['show', 'rightList'],
	components: {},
	data() {
		return {
			leftIndex: 0,
			ggIndex: 0,
			list: [],
			leftList: [
				{
					name: '低碳城市',
					value: 1
				},
				{
					name: '绿色服务',
					value: 1
				},
				{
					name: '绿色能源',
					value: 1
				}
			]
		};
	},
	onLoad() {},
	//组件生命周期
	created() {
		this.list = this.rightList.c;
	},
	mounted() {},
	methods: {
		handtolower() {},
		handGcompany(val){
			console.log(val)
			this.ggIndex = val
		},
		handleft(val) {
			this.ggIndex = 0
			this.leftIndex = val;
			if (val == 0) {
				this.list = this.rightList.c;
			} else if (val == 1) {
				this.list = this.rightList.fu;
			} else if (val == 2) {
				this.list = this.rightList.ne;
			}
		},
		
		handIcon() {
			this.$emit('close');
		},
		open() {
			// console.log('open');
		},
		close() {
			this.$emit('close');
		}
	}
};
</script>
<style lang="less" scoped>
.mypicker {
	.titles {
		position: relative;
		padding: 40upx 0;
		text-align: center;
		font-size: 32upx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #333333;
		.icon {
			position: absolute;
			top: 30upx;
			right: 20upx;
		}
	}
	.main {
		display: flex;
		.main-left {
			text-align: center;
			flex: 3;
			.left-1 {
				height: 100upx;
				line-height: 100upx;
				font-size: 32upx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #333333;
			}
			.active {
				background: #f6f7f8;
				color: #00b490;
			}
		}
		.main-right {
			flex: 7;
			background: #f6f7f8;
			padding-left: 40upx;
			.right-scroll {
				width: 100%;
				height: 50vh;
				.ggactive {
					color: #00b490;
				}
				.gg {
					width: 100%;
					height: 100upx;
					line-height: 100upx;
				}
			}
		}
	}
}
</style>
