<template>
	<view class="login">
		<image class="login-imgs" src="../../static/user/banners.png" mode=""></image>
		<image class="login-tou" src="../../static/logo.png"></image>
		<view class="login-form">
			<u--form :model="form" :rules="rules" ref="uForm">
				<u-form-item prop="username">
					<u--input v-model="form.username" placeholder="请输入用户名"
						prefixIconStyle="font-size: 25px;color: #b0b0b0" prefixIcon="account"></u--input>
				</u-form-item>
				<u-form-item prop="password">
					<u-input v-model="form.password" placeholder="请输入密码"
						prefixIconStyle="font-size: 25px;color: #b0b0b0" prefixIcon="lock" :type="type">
						<template slot="suffix">
							<u-icon :name="icon" @click="handIcon" color="#b0b0b0" size="28"></u-icon>
						</template>
					</u-input>
				</u-form-item>
			</u--form>
			<!-- <view class="lr">
				<view class="l-1">
					   <u-checkbox-group>
					<u-checkbox v-model="radio" activeColor="#00B490"></u-checkbox>
					记住密码
					</u-checkbox-group>
				</view>
				
				<view class="r-1">忘记密码?</view>
			</view> -->
			<button class="btn" @click="submit">登录</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				lastTouch: 0,
				type: 'password',
				icon: 'eye-off',
				radio: false,
				form: {
					username: '',
					password: ''
				},
				rules: {
					username: [{
						required: true,
						message: '请输入用户',
						trigger: ['blur']
					}],
					password: [{
						required: true,
						message: '请输入密码',
						trigger: ['blur']
					}]
				}
			};
		},
		onBackPress(e) {
			uni.showModal({
				content: '是否要退出应用？',
				confirmText: '确定',
				cancelText: '取消',
				success: function(res) {
					if (res.confirm) {
						uni.sendNativeEvent("colseapp", res => {
							console.log(res);
						
						});
					} else if (res.cancel) {
						
					}
					return true;
				}
			});
			return true;
		},
		onReady() {},
		mounted: function() {
			// #ifdef APP-PLUS
			let platform = uni.getSystemInfoSync().platform; //判断ioa还是安卓，第三方登录获取参数
			if (platform == 'ios') {
				let args = plus.runtime.arguments;
				let code = args.split('//')[1];
				if (code) {
					this.getCode(code);
				}
			}
			// #endif
			const that = this;
			uni.onNativeEventReceive((event, data) => {
				//监听安卓端传参
				if (data) {
					uni.sendNativeEvent(data, res => {
						console.log(res);
					});

					that.getCode(JSON.parse(data).code);
				}
			});
		},
		methods: {
			getCode(code) {
				uni.showLoading({
					title: '正在登陆中'
				});
				this.$http('/lvxin/loginByCode', 'POST', {
						code: code
					})
					.then(res => {
						uni.hideLoading();
						if (res.code == 0) {
							uni.sendNativeEvent(res, rest => {
								console.log(rest);
							});
							uni.sendNativeEvent("login", call => {
								console.log(call);
							});
							// 根据用户id,key
							let obj = uni.getStorageSync('show')
							uni.clearStorageSync();
							if (obj) {
								uni.setStorageSync("show", obj)
							}

							uni.setStorageSync('userInfo', JSON.stringify(res.data.user));
							uni.setStorageSync('token', res.data.token.token);
							this.toHome();
						} else {
							uni.showToast({
								icon: 'error',
								duration: 1500,
								title: '登录失败'
							});
						}
					})
					.catch(err => {
						uni.hideLoading();
						console.error(err);
						uni.hideLoading();
						uni.showToast({
							icon: 'error',
							duration: 1500,
							title: '登录失败'
						});
					});
			},
			toHome() {
				uni.switchTab({
					url: '/pages/home/index'
				});
			},
			handIcon() {
				this.type = this.type == 'password' ? 'text' : 'password';
				this.icon = this.type == 'password' ? 'eye-off' : 'eye-fill';
			},
			submit() {
				this.$refs.uForm
					.validate()
					.then(res => {
						uni.showToast({
							title: '正在登录',
							icon: 'loading',
							duration: 30000
						});
						this.$http('/loginApp', 'POST', this.form, false)
							.then(res => {
								if (res.code == 0) {
									uni.hideToast();
									let obj = uni.getStorageSync('show')

									uni.clearStorageSync();
									if (obj) {
										uni.setStorageSync("show", obj)
									}

									uni.sendNativeEvent("login", call => {
										console.log(call);
									});

									uni.setStorageSync('userInfo', res.user);
									uni.setStorageSync('token', res.token);
									uni.switchTab({
										url: '/pages/home/index'
									});
								} else {
									uni.showToast({
										title: '登录失败',
										duration: 2000,
										icon: 'error'
									});
								}
							})
							.catch(err => {
								console.error(err);

								uni.showToast({
									title: '登录失败',
									duration: 2000,
									icon: 'error'
								});
							});
					})
					.catch(err => {
						// 校验信息
						uni.hideToast({
							title: err.errorMessage
						});
					});
			}
		}
	};
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
			margin-top: 30upx;
			font-size: 36upx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #ffffff;
			background: #00b490;
			box-shadow: 0px 0px 13px 0px rgba(0, 0, 0, 0.22);
			border-radius: 40upx;
		}
	}
</style>
