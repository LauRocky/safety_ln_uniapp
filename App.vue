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
	onLaunch: function() {
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
				console.log('click', msg);
				let userInfo = uni.getStorageSync('userInfo') ? JSON.parse(uni.getStorageSync('userInfo')) : '';
				if (plus.os.name == 'iOS') {
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
								uni.navigateTo({
									url: obj.path
								});
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
								uni.navigateTo({
									url: msg.payload.path
								});
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
				console.error('receive22', msg);
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
						this.monitorMessage();
					}
				} else {
					if (msg.type == 'receive' && msg.payload) {
						let options = {
							cover: false,
							sound: 'system',
							title: msg.title
						};
						plus.push.createMessage(msg.payload.content, msg.payload, options);
						this.monitorMessage();
					}
				}
			},
			false
		);
		// #endif
	},
	onLoad() {},
	onShow: function() {},
	onHide() {},
	onError(err) {
		console.error('onError', err);
	},
	mounted: function() {},
	methods: {
		monitorMessage() {
			this.$http(
				'/todo/page',
				'GET',
				{
					status: "0",
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
						if (res.data == 0) {
						} else {
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
