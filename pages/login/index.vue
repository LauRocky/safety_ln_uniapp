<template>
    <view class="content">
		<image src="../../static/logo.png"></image>
        <view class="login-form">
        	<p>智慧安质平台</p>
			<u--form  labelPosition="left" :model="loginForm" :rules="rules" ref="loginForm">
				<u-form-item prop="username">
					<u--input placeholder="请输入您的用户名" v-model="loginForm.username"></u--input>
				</u-form-item>
				
				<u-form-item prop="username">
					<u--input placeholder="请输入密码" :password="true" v-model="loginForm.password"></u--input>
				</u-form-item>
				
			</u--form>
			
			<view class="submit">
				<button @click="submit" size="default" type="default" >登录</button>
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
					
					this.$http('/loginApp','POST',this.loginForm).then(res=>{
						if(res.data.code==0){
							
							uni.setStorageSync('user', res.data.user);
							uni.setStorageSync('token', res.data.token);
														
							uni.switchTab({
								url: '/pages/home/index'
							});	
						}
					}).catch(err=>{
						console.log(err)
					})
					
				}).catch(err =>{
					// 校验信息
					uni.hideToast({
					    title: err.errorMessage,
					});
				})
				
			}
        }
    }
</script>

<style scoped>
	
	.submit{
		width: 350rpx;
		height: 100rpx;
		margin: 0 auto;
	}
	.submit button{
		color: #FFFFFF;
		background-color: #4CBFA2;
	}
	.login{
		margin-top: 30rpx;
		padding: 30rpx
	}
	.login-form{
		width: 650rpx;
		height: 450rpx;
		text-align: center;
		box-shadow: 3rpx 3rpx 3rpx 3rpx #D4D4D4;
	}
	.login-form p{
		font-size: 45rpx;color: #58CCAF;margin-top: 30rpx;font-weight: 900;
	}
    .content{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
		background-color: #FAFAFA;
	}
	.content image{
		display: block; width: 95px;height: 95px;margin-bottom: 75rpx;
	}
</style>