<template>
	<view class="levelType">
		<u-popup :show="showl" @close="handIcon" :closeable="true" :round="10" mode="bottom">
			<view class="titles">
				隐患类型
			</view>
			<view class="main">
				<view class="title2">请选择隐患类型</view>
				<view class="text-city" :class="[cooindexss == i1 ? 'activecity' : '']" @click="handcooCC(i1, val1)" v-for="(val1, i1) in category" :key="i1">{{ val1.name }}</view>
				
				<!-- <scroll-view class="scroll-a" scroll-y>
					<view class="text-a" :class="[cooindex == i1 ? 'active' : '']" @click="handcoo(i1, val1)" v-for="(val1, i1) in dictLsit" :key="i1">{{ val1.value }}</view>
				</scroll-view> -->
			</view>
		</u-popup>
	</view>
</template>
<script>
import { getDictList } from '../../utils/api.js';
export default {
	name: 'levelType1',
	props: ['showl'],
	components: {},
	data() {
		return {
			dictLsit: [],
			string:'QUALITY_PROBLEM_TYPE',
			category:[{
				name:'安全',
				id:1
			},{
				name:'质量',
				id:2
			}
			],
			cooindex: null,
			cooindexss:null,
			obj: {}
		};
	},
	onLoad() {},
	//组件生命周期
	created() {
		// this.handgETLIST();
		let obj = uni.getStorageSync('levelType1');
		if (obj) {
			//缓存下标
			this.cooindex = obj.cooindex;
			this.$emit('handEndl', obj);
		}
	},
	mounted() {},
	methods: {
		handcooCC(val,v){
			console.log(val,v)
			this.cooindex = val;
			this.obj.cooindex = val;
			// this.obj.code = v.code;
			this.obj.value=v.name;

		},
		// handcoo(val, v) {
		// 	this.cooindex = val;
		// 	this.obj.cooindex = val;
		// 	this.obj.value = v.value;
		// 	this.obj.code = v.code;
		// 	this.$emit('handEndl', v);
		// },
		handcache() {
			//缓存数据
			if (this.obj.name) {
				//判断有新选择的存储
				uni.setStorageSync('levelType1', this.obj);
			}
		},
		handIcon() {
			this.$emit('closeL');
		},
		handgETLIST() {
			getDictList(this.string)
				.then(res => {
					console.log(res)
					this.dictLsit = res.dict;
				})
				.catch(err => {
					console.log(err);
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
	.main {
		padding: 20upx 29upx 0 64upx;
		.title2 {
			font-size: 32upx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #333333;
		}
		.text-city{
			padding: 20upx 0;
			font-size: 28upx;
			font-family: PingFang SC;
			font-weight: bold;
		}
		.activecity {
			color: #00b490;
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
