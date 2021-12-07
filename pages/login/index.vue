<template>
    <view class="content">
        <view class="login-form">
        	<p style="font-size: 45rpx;color: #58CCAF;margin-top: 30rpx;font-weight: 900;">智慧安质平台</p>
			
			<uni-forms ref="loginForm" :modelValue="loginForm" :rules="rules" class="login">
				
				<uni-forms-item name="username">
					<input style="background-color: #FFFFFF;border-radius: 5px;" type="text" v-model="loginForm.username" placeholder="请输入您的用户名"></input>
				</uni-forms-item>
				<uni-forms-item name="password">
					<!-- <uni-easyinput type="password" style="margin-top: 30rpx;background-color: #FFFFFF;border-radius: 5px;" placeholder="请输入您的密码" v-model="loginForm.password" /> -->
					<input style="margin-top: 30rpx;background-color: #FFFFFF;border-radius: 5px;" type="password" v-model="loginForm.password" placeholder="请输入您的密码"></input>
				</uni-forms-item>

			</uni-forms>
			
			<view style="width: 350rpx;height: 100rpx;margin: 0 auto;">
				<button @click="submit" style="color: #FFFFFF;background-color: #4CBFA2;" size="default" type="default" >登录</button>
			</view>
			
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                loginForm:{
                    username: '',
                    password: '',
                },
				rules: {
					username:{
						rules:[{
							required: true,
							errorMessage: '请输入用户姓名',
						}]
					},
					password:{
						rules:[{
							required: true,
							errorMessage: '请输入密码',
						}]
					},
				}
            }
        },
        onLoad() {

        },
        methods: {
            submit(){
				this.$refs.loginForm.validate().then(res=>{
					uni.request({
					    url: '/api/loginApp',
						method:'POST',
						dataType:'json',
						header: {
							'Content-Type': 'application/json; charset=utf-8',
						},
					    data: this.loginForm,
					    success: (res) => {
					        console.log(res.data);
					        this.text = 'request success';
					    }
					});
				}).catch(err =>{
					uni.hideToast({
					    title: err.errorMessage,
					});
				})
				/* uni.switchTab({
					url: '../index/index'
				}); */
			}
        }
    }
</script>

<style scoped>

	.login{
		text-align: left;
		margin-top: 30rpx;
		padding: 30rpx
	}
	.login-form{
		width: 650rpx;
		height: 600rpx;
		text-align: center;
		box-shadow: 3rpx 3rpx 3rpx 3rpx #D4D4D4;
	}
    .content{
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
		background-color: #FAFAFA;
	}
</style>