<template>
	<view class="login">
		<image class="login-imgs" src="../../static/user/banners.png" mode=""></image>
		<image class="login-tou" src="../../static/logo.png"></image>
		<view class="login-form">
			<u--form labelPosition="left" :model="form" :rules="rules" ref="uForm">
				<u-form-item prop="username">
					<u--input v-model="form.username" placeholder="请输入用户名" prefixIconStyle="font-size: 25px;color: #b0b0b0" prefixIcon="account"></u--input>
				</u-form-item>
				<u-form-item prop="password">
					<u-input v-model="form.password" placeholder="请输入密码" prefixIconStyle="font-size: 25px;color: #b0b0b0" prefixIcon="lock" :type="type">
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
			type: 'password',
			icon: 'eye-off',
			radio: false,
			form: {
				username: '',
				password: ''
			},
			rules: {
				username: [
					{
						required: true,
						message: '请输入用户',
						trigger: ['blur']
					}
				],
				password: [
					{
						required: true,
						message: '请输入密码',
						trigger: ['blur']
					}
				]
			}
		};
	},
	onLoad() {},
	methods: {
		handIcon() {
			this.type = this.type == 'password' ? 'text' : 'password';
			this.icon = this.type ? 'eye-off' : 'eye-fill';
		},
		submit() {
			this.$refs.uForm
				.validate()
				.then(res => {
					this.$http('/loginApp', 'POST', this.form, false)
						.then(res => {
							if (res.code == 0) {
								uni.setStorageSync('userInfo', res.user);
								uni.setStorageSync('token', res.token);

								uni.switchTab({
									url: '/pages/home/index'
								});
							}
						})
						.catch(err => {
							console.log(err);
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
		margin-bottom: 75rpx;
		border-radius: 20upx;
	}
	.login-form {
		margin-top: 50rpx;
		padding: 0 75upx;
		.u-input {
			border-radius: 50upx;
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
		margin-top: 20upx;
		font-size: 36upx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #FFFFFF;
		background: #00B490;
		box-shadow: 0px 0px 13px 0px rgba(0, 0, 0, 0.22);
		border-radius: 40upx;
	}
}
=======
<template>
	<view class="login">
		<image class="login-imgs" src="../../static/user/banners.png" mode=""></image>
		<image class="login-tou" src="../../static/logo.png"></image>
		<view class="login-form">
			<u--form  :model="form" :rules="rules" ref="uForm">
				<u-form-item prop="username">
					<u--input v-model="form.username" placeholder="请输入用户名" prefixIconStyle="font-size: 25px;color: #b0b0b0" prefixIcon="account"></u--input>
				</u-form-item>
				<u-form-item prop="password">
					<u-input v-model="form.password" placeholder="请输入密码" prefixIconStyle="font-size: 25px;color: #b0b0b0" prefixIcon="lock" :type="type">
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
;
export default {
	data() {
		var timer;
		return {
			type: 'password',
			icon: 'eye-off',
			radio: false,
			form: {
				username: '',
				password: ''
			},
			rules: {
				username: [
					{
						required: true,
						message: '请输入用户',
						trigger: ['blur']
					}
				],
				password: [
					{
						required: true,
						message: '请输入密码',
						trigger: ['blur']
					}
				]
			},
			myEventManager:null,
			eventManager:null,
			myListener:null
		};
	},
	onLoad() {
		this.addListener();
	},
	methods: {
		addListener(){
			this.myEventManager = plus.android.importClass("com.ln.safety.EventListenerManager");  
			this.eventManager = this.myEventManager.getMyEventManager(); 
			//新建监听器  
			this.myListener = plus.android.implements("com.ln.safety.LXLoginListener", {  
			"onChange":function(event){  
			                     //导入类  
			         plus.android.importClass(event);  
			                    //获取数据  
			        console.log(event.getData());  
			                    //获取来源  
			        console.log(event.getSource());  
			            }  
			        }); 
							//添加监听器    
			 this.eventManager.addListener("onShow",this.myListener);    
		},
		onShow(){
			let msg={
				data:"data",
				source:"source",
				trigger:"trigger"
			};
			this.myEventManager.postMsg(msg,"onShow");  
		},
		handIcon() {
			this.type = this.type == 'password' ? 'text' : 'password';
			this.icon =  this.type == 'password' ? 'eye-off' : 'eye-fill';
		},
		submit() {
			this.$refs.uForm
				.validate()
				.then(res => {
					this.$http('/loginApp', 'POST', this.form, false)
						.then(res => {
							if (res.code == 0) {
								uni.setStorageSync('userInfo', res.user);
								uni.setStorageSync('token', res.token);
								uni.switchTab({
									url: '/pages/home/index'
								});
							}
						})
						.catch(err => {
							console.log(err);
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
		margin-top: 50upx ;
		padding: 0 75upx;
		.u-input {
			border-radius: 50upx;
		}
		/deep/.u-form-item__body__right__message{
			margin-left:420upx!important;
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
		color: #FFFFFF;
		background: #00B490;
		box-shadow: 0px 0px 13px 0px rgba(0, 0, 0, 0.22);
		border-radius: 40upx;
	}
}

