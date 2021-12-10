<template>
	<view class="mypicker">
		<u-popup :show="show" :round="10" mode="bottom" @close="close" @open="open">
			<view class="titles">
				请选择所在公司
				<u-icon class="icon" @click="handIcon" name="close" color="#b5b5b5 " size="28"></u-icon>
			</view>
			<view class="main">
				<view class="main-top">
					<view class="main-title">
						<view class="main-1">
							<view class="main-2">
								<view :class="[one ? 'yuan' : 'yuan1']"></view>
								<text v-if="one">{{ one }}</text>
								<text v-else>请选择城市</text>
							</view>
							<u-icon v-if="one" name="arrow-right" color="#5F5F5F"></u-icon>
						</view>
						<view class="main-1" v-if="one">
							<view class="main-2">
								<view :class="[two ? 'yuan' : 'yuan1']"></view>
								<text v-if="two">{{ two }}</text>
								<text v-else>请选择城市公司</text>
							</view>

							<u-icon v-if="two" name="arrow-right" color="#5F5F5F"></u-icon>
						</view>
						<view class="main-1" v-if="one && two">
							<view class="main-2">
								<view class="yuan1"></view>
								<text v-if="three">{{ three }}</text>
								<text v-else>请选择项目</text>
							</view>
							<u-icon v-if="three" name="arrow-right" color="#5F5F5F"></u-icon>
						</view>
					</view>
				</view>
				<image class="heng" src="../../static/danger/heng.png" mode=""></image>
				<view class="main-cet">
					<view class="p-titles">
						{{titles}}
					</view>
					<scroll-view class="scroll-a" scroll-y >
						<view class="text-a" :class="[cooindex == i1 ?'active':'']" @click="handcoo(i1,val1)" v-for="(val1, i1) in list" :key="i1">{{ val1 }}</view>
					</scroll-view>
				</view>
			</view>
		</u-popup>
	</view>
</template>
<script>
export default {
	name: '',
	props: ['show'],
	components: {},
	data() {
		return {
			one: '',
			two: '',
			three: '',
			titles:'选择所在项目',
			list: [],
			cooindex:0,
			allList: {} //所有数据
		};
	},
	onLoad() {},
	//组件生命周期
	created() {
		this.handSelectData();
	},
	mounted() {},
	methods: {
		handcoo(val,v){
			this.cooindex = val
			this.list = this.allList.second[v]
		},
		handtolower() {},
		handIcon() {
			this.$emit('close');
		},
		handSelectData() {
			//shujui
			this.$http(
				'/lvxin/getCompanySelectData',
				'GET',
				{
					companyId: JSON.parse(uni.getStorageSync('userInfo')).companyId
				},
				false
			)
				.then(res => {
					if (res.code == 0) {
						this.list = res.data.first;
						this.allList = res.data;
					}
				})
				.catch(err => {
					console.log(err);
				});
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
		.main-top {
			padding: 60upx 22upx 0 70upx;
			.main-1 {
				height: 100upx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				.main-2 {
					display: flex;
					align-items: center;
					font-size: 28upx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #333333;
					.yuan {
						position: relative;
						margin-right: 58upx;
						width: 18upx;
						height: 18upx;
						background: #00b490;
						border-radius: 50%;
						&::after {
							display: block;
							content: '';
							width: 4upx;
							height: 85upx;
							background: #00b490;
							position: absolute;
							bottom: -85upx;
							left: 7upx;
						}
					}
					.yuan1 {
						margin-right: 58upx;
						width: 17upx;
						height: 17upx;
						border: 2upx solid #00b490;
						border-radius: 50%;
					}
				}
			}
		}
		.heng {
			height: 6upx;
			width: 100%;
		}
		.main-cet{
			padding: 60upx 22upx 0 70upx;
			.p-titles{
				padding-bottom: 60upx;
				font-size: 32upx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #333333;
			}
			.scroll-a{
				height: 50vh;
				.text-a{
					padding: 20upx 0;
					font-size: 28upx;
					font-family: PingFang SC;
					font-weight: bold;
				}
				.active{
					color: #00B490;
				}
			}
			
		}
	}
}
</style>
