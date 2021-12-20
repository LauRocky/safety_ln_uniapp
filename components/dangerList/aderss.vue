<template>
	<view class="aderss">
		<u-popup :show="showA" @close="handIcon" :round="10" mode="center">
			<view class="main">
				<view class="titles">
					<u-icon class="icon" @click="handIcon" name="arrow-left" color="#333333" size="28"></u-icon>
					<text>详细发生位置</text>
					<text class="text-que" @click="handcoo">确定</text>
				</view>
				<view class="text-a">
					<u--textarea v-model="address" height="100" border="none" maxlength="100" placeholder="请输入地址"></u--textarea>
					<view class="aderss"><image @click="handAderss" class="aderss-img" src="../../static/danger/aderss.png" mode=""></image></view>
				</view>
			</view>
		</u-popup>
	</view>
</template>
<script>
export default {
	name: 'aderss',
	props: ['showA'],
	components: {},
	data() {
		return {
			addressList:[],
			address:'',
			obj:{}
		};
	},
	onLoad() {},
	//组件生命周期
	created() {
		let obj = uni.getStorageSync('address');
		if (obj.address) {
			this.address = obj.address
			this.$emit('handEndA', obj.address);
		}
	},
	mounted() {},
	methods: {
		handcoo() {
			this.obj.address =  this.address
			this.$emit('handEndA', this.address);
		},
		handcache() {
			//缓存数据
			if (this.obj.address) {
				//判断有新选择的存储
				uni.setStorageSync('address', this.obj);
			}
		},
		handIcon() {
			this.$emit('closeA');
		},
		handAderss() {
			let _this = this
			uni.getLocation({
				type: 'wgs84',
				success: function(res) {
					console.log('当前位置的经度：' + res.longitude);
					console.log('当前位置的纬度：' + res.latitude);
					var point = new plus.maps.Point(res.longitude, res.latitude);
					plus.maps.Map.reverseGeocode(
						point,
						{},
						function(event) {
							var address = event.address; // 转换后的地理位置
							var point = event.coord; // 转换后的坐标信息
							var coordType = event.coordType; // 转换后的坐标系类型
							_this.address = address;
						},
						function(e) {
							console.log("Failed:"+JSON.stringify(e));
						}
					);
				}
			});
		}
	}
};
</script>
<style lang="less" scoped>
.aderss {
	.main {
		width: 80vw;
		padding: 40upx 30upx;
		.titles {
			text-align: center;
			font-size: 32upx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #333333;
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
		.text-a {
			padding-top: 30upx;
			.aderss {
				text-align: right;
				.aderss-img {
					width: 50upx;
					height: 50upx;
				}
			}
		}
	}
}
</style>
