<script>
import { monitorMessage } from 'utils/api.js';
export default {
	globalData: {
		userInfo: {},
		version: '',
		Apushid: '',
		cid: '',
		Todo: null,
		warning: null
	},
	onLaunch: function() {
		// #ifdef APP-PLUS
		// 页面加载时触发
		var pinf = plus.push.getClientInfo();
		var cid = pinf.clientid; //客户端标识
		this.globalData.cid = pinf.clientid;
		let userInfo = uni.getStorageSync('userInfo') ? JSON.parse(uni.getStorageSync('userInfo')) : '';

		plus.push.addEventListener(
			'click',
			msg => {
				// {"__UUID__":"androidPushMsg250386936","title":"content","appid":"__UNI__A9A3937","content":"body","payload":{"path":"/pages/dangerList/hiddenDetails?id=710","receiver":"10492","text":"没有","type":"notify"}}
				// type ： notify=推送 ，需要处理path  alert=弹窗提示 ,显示text的内容
				console.log('click', msg);
				if (plus.os.name == 'iOS') {
					var UIApplication = plus.ios.import('UIApplication');
					var app = UIApplication.sharedApplication();
					//获取应用图标的数量
					var oldNum = app.applicationIconBadgeNumber();
					if (oldNum != 0) {
						console.log('oldNum:' + oldNum);
						var newNum = oldNum - 1;
						console.log('newNum:' + newNum);
						//设置应用图标的数量
						plus.runtime.setBadgeNumber(newNum);
						//导入个推原生类
						var GeTuiSdk = plus.ios.importClass('GeTuiSdk');
						GeTuiSdk.setBadge(newNum);
					}
					let obj = {};
					if (msg.aps) {
						obj = JSON.parse(msg.payload.payload);
					} else {
						let list = msg.payload.split(',');
						obj = {
							path: list[0],
							receiver: list[1],
							status: list[2],
							type: list[3]
						};
					}
					if (userInfo && userInfo.userId == obj.receiver) {
						if (obj.type === 'notify') {
							if (obj.status == '0') {
								uni.switchTab({
									url: obj.path
								});
							} else if (obj.status == '1') {
								let timer = null;
								clearTimeout(timer);
								timer = setTimeout(() => {
									uni.navigateTo({
										url: obj.path
									});
								}, 1000);
							}
						} else if (obj.type === 'alert') {
							uni.showModal({
								title: '提示',
								content: obj.text,
								showCancel: false,
								confirmText: '确定'
							});
						}
					}
				} else {
					if (userInfo && userInfo.userId == msg.payload.receiver) {
						if (msg.payload.type === 'notify') {
							if (msg.payload.status == '0') {
								uni.switchTab({
									url: msg.payload.path
								});
							} else if (msg.payload.status == '1') {
								let timer = null;
								clearTimeout(timer);
								timer = setTimeout(() => {
									uni.navigateTo({
										url: msg.payload.path
									});
								}, 1000);
							}
						} else if (msg.payload.type === 'alert') {
							uni.showModal({
								title: '提示',
								content: msg.payload.text,
								showCancel: false,
								confirmText: '确定'
							});
						}
					}
				}
			},
			false
		);
		plus.push.addEventListener(
			'receive',
			msg => {
				console.error('receive', msg);
				if (plus.os.name == 'iOS') {
					if (msg.type == 'receive' && msg.payload) {
						let options = {
							cover: false,
							sound: 'system',
							title: msg.title
						};

						if (typeof msg.payload == 'string') {
							let payload = JSON.parse(msg.payload);
							let stringA = payload.path + ',' + payload.receiver + ',' + payload.status + ',' + payload.type;
							plus.push.createMessage(msg.content, stringA, options);
						}
						monitorMessage();
					}
				} else {
					if (msg.type == 'receive' && msg.payload) {
						let options = {
							cover: false,
							sound: 'system',
							title: msg.title
						};
						plus.push.createMessage(msg.payload.content, msg.payload, options);
						monitorMessage();
					}
				}
			},
			false
		);
		if (plus.os.name == 'iOS') {
			//启动页跳转和推送跳转
			let args = plus.runtime.arguments;
			let code = args ? args.split('//')[1] : '';
			if (code) {
				// 关闭启动页进入登录
				plus.navigator.closeSplashscreen();
			} else if (userInfo) {
				//不存在则跳转至首页页
				uni.reLaunch({
					url: '/pages/home/index',
					success: () => {
						plus.navigator.closeSplashscreen();
					}
				});
			} else {
				// 关闭启动页进入登录
				plus.navigator.closeSplashscreen();
			}
		} else {
			let lxLogin = uni.requireNativePlugin('zhongqian-lvxin-login');
			lxLogin.getLxCode({}, res => {
				if (res.code) {
					// 关闭启动页进入登录,如果项目在后台运行，直接跳转到首页
					plus.navigator.closeSplashscreen();
				} else if (userInfo) {
					//跳转至首页页
					uni.reLaunch({
						url: '/pages/home/index',
						success: () => {
							plus.navigator.closeSplashscreen();
						}
					});
				} else {
					// 关闭启动页进入登录
					plus.navigator.closeSplashscreen();
				}
			});
		}
		// #endif
	},
	onLoad() {},
	onShow: function() {},
	onHide() {},
	onError(err) {
		console.error('onError', err);
	},
	mounted: function() {},
	methods: {}
};
</script>
<style lang="scss">
@import 'uview-ui/index.scss';

/* #ifndef APP-PLUS-NVUE */
page {
	background-color: #fafafa;
}

/* #endif */
</style>
