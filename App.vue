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
				console.error("android click",msg);
				// 安卓离线点击内容如下。重点关注payload中的内容。
				// {"__UUID__":"androidPushMsg259827978","title":"content","appid":"__UNI__A9A3937","content":"body","payload":{"title":"content","content":"body","something":"123"}}
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
				if ((msg.type = 'receive' && msg.payload)) {
					
					console.error("android receive",msg);
					
					let options = { cover: false, sound: 'system', title: msg.title };
					plus.push.createMessage(msg.payload.content, msg.payload, options);
					this.monitorMessage();
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
		console.log(err, '0000');
	},
	mounted: function() {},
	methods: {
		monitorMessage() {
			this.$http(
				'/upcoming/page',
				'POST',
				{
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
