<template>
	<view class="levelType">
		<u-popup :show="showl" @close="handIcon" :closeable="true" :round="10" mode="bottom">
			<view class="titles">
				隐患类型
				<!-- <u-icon class="icon" @click="handIcon" name="close" color="#b5b5b5 " size="28"></u-icon> -->
			</view>
			<view class="main">
				<view class="title2">
					请选择隐患类型
				</view>
				<scroll-view class="scroll-a" scroll-y>
					<view class="text-a" :class="[cooindex == i1 ? 'active' : '']" @click="handcoo(i1, val1)" v-for="(val1, i1) in dictLsit" :key="i1">{{ val1.value }}</view>
				</scroll-view>
			</view>
		</u-popup>
	</view>
</template>
<script>
import { getDictList } from '../../utils/api.js';
export default {
	name: 'levelType',
	props: ['showl'],
	components: {},
	data() {
		return {
			dictLsit:[],
			cooindex:null,
		};
	},
	onLoad() {
		
	},
	//组件生命周期
	created() {
		this.handgETLIST();
	},
	mounted() {},
	methods: {
		handcoo(val, v){
			this.cooindex = val
			this.$emit('handEndl',v)
		},
		handIcon(){
			this.$emit('closeL');
		},
		handgETLIST() {
			getDictList('PROBLEM_TYPE')
				.then(res => {
					this.dictLsit = res.dict
				})
				.catch(err => {
					console.log(err)
				});
		}
	}
};
</script>
<style lang="less" scoped>
.levelType {
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
	.main{
		padding: 20upx 29upx 0 64upx;
		.title2{
			font-size: 32upx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #333333;
		}
		.scroll-a {
			padding-top: 30upx;
			height: 40vh;
			.text-a {
				padding: 20upx 0;
				font-size: 28upx;
				font-family: PingFang SC;
				font-weight: bold;
			}
			.active {
				color: #00b490;
			}
		}
	}
	
}
</style>
