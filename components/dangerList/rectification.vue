<template>
	<view class="levelPicker">
		<u-popup :show="showR" @close="handIcon" :round="10" mode="bottom">
			<view class="titles">
				请选择整改人
				<u-icon class="icon" @click="handIcon" name="close" color="#b5b5b5 " size="28"></u-icon>
			</view>
			<view class="main">
				<!-- <view class="title2">
					请选择隐患等级
				</view> -->
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
	name: 'rectification',
	props: ['showR'],
	components: {},
	data() {
		return {
			dictLsit:[],
			cooindex:null,
			listBy:{
				page:1,
				limit:10,
				companyId: JSON.parse(uni.getStorageSync('userInfo')).companyId
			}
		};
	},
	onLoad() {
		
	},
	//组件生命周期
	created() {
		this.handlistByProjectId()
	},
	mounted() {},
	methods: {
		handcoo(val, v){
			this.cooindex = val
			this.$emit('handEndR',v)
		},
		handIcon(){
			this.$emit('closeR');
		},
		handlistByProjectId() {
			//renyuan人员列表
			this.$http('/users/pageByProjectId', 'POST', this.listBy, false).then(res => {
					if (res.code == 0) {
						/* if(this.dictLsit.length ) */
					}
				})
				.catch(err => {
					console.log(err);
				});
		},
		
	}
};
</script>
<style lang="less" scoped>
.levelPicker {
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
