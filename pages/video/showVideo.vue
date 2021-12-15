<template>
	<view>
		<!-- 视频展示 -->

	</view>
</template>
<script>
	export default {
		data() {
			return {
				projectId: '',
				ehomeList: [],
				etEznew: ''
			};
		},
		methods: {
			// 2. 获取特定项目下的摄像头列表
			show() {
				this.$http('camera/project/show', 'POST', {
					'projectId': this.projectId
				}, false).then(res => {
					console.log(res)

				})
			},
			// etEzNewLiveAddress/{deviceSerial}/{channelNo}/{ezvizAccountId}

			// etEzNewLiveAddress() {
			// 	let dev = deviceSerial
			// 	let cha = channelNo
			// 	let ezv = ezvizAccountId
			// 	let url = 'etEzNewLiveAddress/' + "/" + "dev" + '/' + "cha" + '/' + 'ezv'
			// 	this.$http("url","POST",{
			// 		'deviceSerial':"",
			// 		'channelNo':"",
			// 		'ezvizAccountId':"",
			// 	},false).then(res=>{
			// 		console.log(res)
			// 	})
			// }
		},
		onLoad(options) {
			console.log(options)
			this.projectId = options.projectId;
			console.log(this.projectId)
			this.show()
			// this.etEzNewLiveAddress()
		}
	}
</script>

<style lang="scss" scoped>

</style>
