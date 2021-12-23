<template>
	<view class="mypicker">
		<u-popup :show="show" :round="10" mode="bottom" @close="handIcon" :closeable="true" @open="open">
			<view class="titles">
				<view type="default" @click="clear">取消</view>
				请选择所在公司
			</view>
			<view class="main">
				<view class="main-left">
					<view class="left-1" @click="handleft(val, i)" :class="[leftIndex == i ? 'active' : '']" v-for="(val, i) in leftList" :key="i + 'a'">{{ val }}</view>
				</view>
				<view class="main-right">
					<scroll-view class="right-scroll" @scrolltolower="handtolower" scroll-y>
						<view class="gg" :class="[ggIndex == i1 ? 'ggactive' : '']" @click="handGcompany(val1, i1)" v-for="(val1, i1) in rightlist" :key="i1">{{ val1 }}</view>
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
			leftIndex: 0,
			ggIndex: null,
			rightlist: [],
			alldata: {},
			leftList: []
		};
	},
	onLoad() {},
	//组件生命周期
	created() {
		this.handSelectData();
	},
	mounted() {},
	methods: {
		clear(){
			this.rightlist=""
			 return false 
		},
		handtolower() {},
		handGcompany(v, val) {
			this.ggIndex = val;
			this.$emit('handcompany', v.name);
			this.$emit('companyId',v.id)
		},
		handleft(v, val) {
			this.ggIndex = 0;
			this.leftIndex = val;
			if (val == 0) {
				this.rightlist = this.alldata[v];
			} else if (val == 1) {
				this.rightlist = this.alldata[v];
			} else if (val == 2) {
				this.rightlist = this.alldata[v];
			}
		},
		handSelectData() {
			//shujui  两级
			this.$http(
				'/lvxin/getCompanySelectDataNew',
				'GET',
				{
					companyId: JSON.parse(uni.getStorageSync('userInfo')).companyId
				},
				false
			)
				.then(res => {
					if (res.code == 0) {
						this.alldata = res.data.second;
						this.leftList = res.data.first;
						this.rightlist = res.data.second['低碳城市'];
						
						// console.log(this.leftlist);
					}
					
				})
				.catch(err => {
					console.log(err);
				});
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
			width: 30vw;
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
			width: 70vw;
			background: #f6f7f8;
			.right-scroll {
				height: 50vh;
				.gg {
					padding: 0 40upx;
					height: 100upx;
					line-height: 100upx;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}
				.ggactive {
					color: #00b490;
				}
			}
		}
	}
}
</style>
