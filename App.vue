<script>
	export default {
		globalData: {
			userInfo: {},
			version: '',
			Apushid: '',
			cid: '',
			Todo: null,
			warning: null
		},
		onLaunch: function () {
			// #ifdef APP-PLUS
			// 页面加载时触发
			var pinf = plus.push.getClientInfo();
			var cid = pinf.clientid; //客户端标识
			this.globalData.cid = pinf.clientid;
			let timer = null;
			plus.push.addEventListener(
				'click',
				msg => {
					// {"__UUID__":"androidPushMsg250386936","title":"content","appid":"__UNI__A9A3937","content":"body","payload":{"path":"/pages/dangerList/hiddenDetails?id=710","receiver":"10492","text":"没有","type":"notify"}}
					// type ： notify=推送 ，需要处理path  alert=弹窗提示 ,显示text的内容  
					let userText = uni.getStorageSync('userInfo');

					let userInfo = null;
					if (userText) {
						userInfo = JSON.parse(userText);
					}
					if (userInfo && userInfo.userId == msg.payload.receiver) {
						if (msg.payload.type === 'notify') {
							console.error(msg.payload.path);
							uni.navigateTo({
								url: msg.payload.path
							});
							uni.switchTab({
								url: msg.payload.path
							});
						} else if (msg.payload.type === 'alert') {
							uni.showModal({
								title: '提示',
								content: msg.payload.text,
								showCancel: false,
								confirmText: '确定'
							});

						}

					}



					clearTimeout(timer);
					timer = setTimeout(() => {
						if (uni.getStorageSync('token')) {
							uni.switchTab({
								url: '/pages/home/index'
							});
						} else {
							uni.navigateTo({
								url: '/pages/login/index'
							});
						}
					}, 1000);
				},
				false
			);
			plus.push.addEventListener(
				'receive',
				msg => {
					console.error('receive', msg);
					if ((msg.type = 'receive' && msg.payload)) {
						let options = {
							cover: false,
							sound: 'system',
							title: msg.title
						};
						plus.push.createMessage(msg.payload.content, msg.payload, options);
						this.monitorMessage();
					}
				},
				false
			);
			// #endif
		},
		onLoad() {},
		onShow: function () {},
		onHide() {},
		onError(err) {
			console.log(err, '0000');
		},
		mounted: function () {},
		methods: {
			monitorMessage() {
				this.$http(
						'/upcoming/page',
						'POST', {
							readStatus: 0,
							page: '',
							limit: ''
						},
						false
					)
					.then(res => {
						if (res.code == 0) {
							this.globalData.Todo = res.page.totalCount;
							uni.showTabBarRedDot({
								index: 4
							});
						}
					})
					.catch(err => {
						console.log(err);
					});
				this.$http('/notification/cameraAlarmList', 'GET', {}, false)
					.then(res => {
						if (res.code == 0) {
							if (res.data == 0) {} else {
								let list = res.data.filter(val => val.alarmStatus == 0);
								this.globalData.warning = list.length;
								uni.showTabBarRedDot({
									index: 4
								});
							}
						}
					})
					.catch(err => {
						console.log(err);
					});
			}
		}
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