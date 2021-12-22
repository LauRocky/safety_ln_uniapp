<template>
	<view class="login">
		<image class="login-imgs" src="../../static/user/banners.png" mode=""></image>
		<image class="login-tou" src="../../static/logo.png"></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		mounted:function(){		
			const that=this;
			uni.onNativeEventReceive((event, data) => {
				uni.sendNativeEvent(data,res=>{
					console.log(res)
				});
				that.getCode(JSON.parse(data).code);
				
			})
		},	
		methods: {
			toLogin() {
				uni.navigateTo({
					url: "/pages/login/index"
				})
			},
			getCode(code) {
				uni.showLoading({
					title:"正在登陆中"
				});
				this.$http(
					'/lvxin/loginByCode',
					'POST', {
						"code": code
					}
				).then(res => {
					uni.hideLoading();
					console.log(res);
					if (res.code == 0) {
						uni.setStorageSync('userInfo', res.user);
						uni.setStorageSync('token', res.token);

						uni.switchTab({
							url: '/pages/home/index'
						});
					}else{
						uni.showToast({
							icon:"error",
							duration:1500,
							title:"登录失败"
						});
					}
				}).catch(err => {
					uni.hideLoading();
					console.log(err)
					uni.hideLoading();
					uni.showToast({
						icon:"error",
						duration:1500,
						title:"登录失败"
					});
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.login {
		height: 100vh;
		background-color: #ffffff;
		text-align: center;

		.login-imgs {
			width: 100vw;
		}

		.login-tou {
			width: 95px;
			height: 95px;
			margin-top: -95upx;
			margin-bottom: 75upx;
			border-radius: 20upx;
		}

		.login-form {
			margin-top: 50upx;
			padding: 0 75upx;

			.u-input {
				border-radius: 50upx;
			}

			/deep/.u-form-item__body__right__message {
				margin-left: 420upx !important;
			}
		}

		.lr {
			padding: 40upx 0;
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 28upx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #00b490;

			.l-1 {
				display: flex;
			}
		}

		.btn {

			width: 60%;
			margin-top: 30upx;
			font-size: 36upx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #FFFFFF;
			background: #00B490;
			box-shadow: 0px 0px 13px 0px rgba(0, 0, 0, 0.22);
			border-radius: 40upx;
		}
	}
</style>
