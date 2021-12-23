<script>
	export default {
		onLaunch:function(){
			// #ifdef APP-PLUS
			plus.runtime.getProperty(plus.runtime.appid,(wgtinfo)=>{
				console.log(JSON.stringify(wgtinfo))
			})
			// #endif
			
		},
		onShow:function(){
			console.log('App show')
		},
		mounted:function(){
			
		},
		methods:{
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

<style lang="scss">
	@import "uview-ui/index.scss";
	/*每个页面公共css */
	html body{
		width: 100%;
		height: 100%;
		background-color: #F6F8F7;
	}
</style>
