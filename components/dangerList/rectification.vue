<template>
	<view class="rectification">
		<u-popup :show="showR" @close="handIcon" :closeable="true" :round="10" mode="bottom">
			<view class="titles">
				请选择整改人
				<!-- <u-icon class="icon" @click="handIcon" name="close" color="#b5b5b5 " size="28"></u-icon> -->
			</view>
			<view class="main">
				<u-search placeholder="请输入" @clear="handclear" @search="handsearch" :show-action="false" :clearabled="true" v-model="listBy.searchKey"></u-search>
				<scroll-view class="scroll-a" @scrolltolower="handtolower" scroll-y>
					<view class="text-a" :class="[cooindex == i1 ? 'active' : '']" @click="handcoo(i1, val1)" v-for="(val1, i1) in dictLsit" :key="i1">
						<view class="t-a">{{ val1.fullname }} :</view>
						<view class="t-x">{{ val1.mobile }}</view>
					</view>
				</scroll-view>
			</view>
		</u-popup>
	</view>
</template>
<script>
export default {
	name: 'rectification',
	props: ['showR'],
	components: {},
	data() {
		return {
			dictLsit: [],
			cooindex: null,
			listBy: {
				page: 1,
				limit: 20,
				searchKey: '',
				companyId: JSON.parse(uni.getStorageSync('userInfo')).companyId
			},
			obj: {}
		};
	},
	onLoad() {},
	//组件生命周期
	created() {
		this.handlistByProjectId();
		let obj = uni.getStorageSync('rectification');
		if (obj) {
			//缓存下标
			this.cooindex = obj.cooindex;
			this.$emit('handEndR', obj);
		}
	},
	mounted() {},
	methods: {
		handclear() {
			this.dictLsit = [];
			this.listBy.page = 1;
			this.listBy.searchKey = '';
			this.handlistByProjectId();
			
		},
		handcache() {
			//缓存数据
			if (this.obj.fullname) {
				uni.setStorageSync('rectification', this.obj);
			}
		},
		handsearch() {
			this.dictLsit = [];
			this.listBy.page = 1;
			this.handlistByProjectId();
		},
		handtolower() {
			this.handlistByProjectId();
		},
		handcoo(val, v) {
			this.cooindex = val;
			this.obj.cooindex = val;
			this.obj.fullname = v.fullname;
			this.obj.userId = v.userId;
			this.$emit('handEndR', v);
		},
		handIcon() {
			this.$emit('closeR');
		},
		handlistByProjectId() {
			if (this.listBy.page >= 2) {
				uni.showLoading({ title: '加载中', mask: true });
			}
			//renyuan人员列表
			this.$http('/users/pageByProjectId', 'POST', this.listBy, false)
				.then(res => {
					if (res.code == 0) {
						uni.hideLoading();
						if (this.dictLsit.length < res.data.totalCount) {
							this.listBy.page++;
							this.dictLsit = this.dictLsit.concat(res.data.list);
						} else {
							console.log('444444');
						}
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
.rectification {
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
		padding: 20upx 54upx 0 54upx;
		.title2 {
			font-size: 32upx;
			font-family: PingFang SC;
		}
		.scroll-a {
			padding-top: 30upx;
			height: 70vh;
			.text-a {
				display: flex;
				padding: 20upx 0;
				font-size: 28upx;
				font-weight: bold;
				color: #333333;
				font-family: PingFang SC;
				.t-a {
				}
				.t-x {
				}
			}
			.active {
				color: #00b490;
			}
		}
	}
}
</style>
