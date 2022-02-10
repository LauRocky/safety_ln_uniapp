<script>
	import {
		monitoring,
		alerts
	} from './utils/api.js'
	export default {
		globalData:{
			version:""
		},
		onLaunch:function(){
			// // #ifdef APP-PLUS
			// plus.runtime.getProperty(plus.runtime.appid,(wgtinfo)=>{
			// 	this.globalData.version = wgtinfo.version
			// })
			// // #endif
			this.warning()
			this.remind()
			setInterval(function(){
				monitoring().then(res => {
						console.log("444", res)
						if (res.code == 0) {
							if (res.data == 0) {
							
							} else {
								res.data.forEach(el => {
									if (el.alarmStatus == 0) {
										uni.showTabBarRedDot({
											index: 4,
										})
									}
								})
							}
						}
					})
					.catch(err => {
						console.log(err)
					});
					alerts().then(res => {
							if (res.code == 0) {
								if (res.page.totalCount == 0) {} else {
									res.page.list.forEach(el => {
										if (el.readStatus == 0) {
											console.log(this.tabberShow)
											uni.showTabBarRedDot({
												index: 4,
											})
										}
									})
								}
							}
						})
						.catch(err => {
							console.log(err)
						})
			},20000)
		},
		onShow:function(){

		},
		onHide() {

		
		},
		mounted:function(){
			
		},
		methods:{
			// 监控预警
			warning() {
				monitoring().then(res => {
						console.log("444", res)
						if (res.code == 0) {
							if (res.data == 0) {
			
							} else {
								res.data.forEach(el => {
									if (el.alarmStatus == 0) {
										uni.showTabBarRedDot({
											index: 4,
										})
									}
								})
							}
						}
					})
					.catch(err => {
						console.log(err)
					})
			},
			// 待办提醒
			remind() {
				alerts().then(res => {
						if (res.code == 0) {
							if (res.page.totalCount == 0) {} else {
								res.page.list.forEach(el => {
									if (el.readStatus == 0) {
										console.log(this.tabberShow)
										uni.showTabBarRedDot({
											index: 4,
										})
									}
								})
							}
						}
					})
					.catch(err => {
						console.log(err)
					})
			},
			
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
