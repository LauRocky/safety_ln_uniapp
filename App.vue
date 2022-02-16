<script>
export default {
	globalData: {
		version: ''
	},
	onLaunch: function() {
		// #ifdef APP-PLUS
				// 页面加载时触发
				var pinf = plus.push.getClientInfo();
				var cid = pinf.clientid; //客户端标识
				console.error(cid,'pppp')
		// #endif
	},
	onShow: function() {},
	onHide() {},
	mounted: function() {},
	methods: {
		toLogin() {
			uni.navigateTo({
				url: '/pages/login/index'
			});
		},
		getCode(code) {
			uni.showLoading({
				title: '正在登陆中'
			});
			this.$http('/lvxin/loginByCode', 'POST', {
				code: code
			})
				.then(res => {
					uni.hideLoading();
					console.log(res);
					if (res.code == 0) {
						uni.setStorageSync('userInfo', res.user);
						uni.setStorageSync('token', res.token);

						uni.switchTab({
							url: '/pages/home/index'
						});
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
					console.log(err);
					uni.hideLoading();
					uni.showToast({
						icon: 'error',
						duration: 1500,
						title: '登录失败'
					});
				});
		}
	}
};
</script>

<style lang="scss">
@import 'uview-ui/index.scss';
/*每个页面公共css */
html body {
	width: 100%;
	height: 100%;
	background-color: #f6f8f7;
}
</style>
