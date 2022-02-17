<script>
export default {
	globalData: {
		version: '',
		Apushid: '',
		cid: '',
		monitoring:null,
	},
	onLaunch: function() {
		// #ifdef APP-PLUS
		// 页面加载时触发
		if (plus.os.name == 'iOS') {
			var pinf = plus.push.getClientInfo();
			var cid = pinf.clientid; //客户端标识
			this.globalData.cid = pinf.clientid;
			let timer = null;
			plus.push.addEventListener(
				'click',
				msg => {
					console.log(msg, '11111', uni.getStorageSync('token'));
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
					if ((msg.type = 'receive')) {
						let content = JSON.parse(msg.content.content);
						let options = { cover: false, sound: 'system', title: msg.title };
						plus.push.createMessage(content, msg.payload, options);
					}
				},
				false
			);
		}
		// #endif
	},
	onLoad() {},
	onShow: function() {},
	onHide() {},
	mounted: function() {},
	methods: {}
};
</script>

<style lang="scss">
@import 'uview-ui/index.scss';
html body{
	background: #fafafa;
}
</style>
