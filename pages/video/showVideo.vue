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
				etEznew: '',
				showList: [],
			};
		},
		methods: {
			// 2. 获取特定项目下的摄像头列表
			show() {
				this.$http('camera/project/show', 'POST', {
					'projectId': this.projectId
				}, false).then(res => {
					// console.log(res)
					this.showList = res.projectInfoEntities
					console.log(this.showList)
				})
			},
			ehome(){
				if(this.showList){
					this.showList.forEach(e => {
					 e.cameraEntities.forEach(el=>{
						 if (el.cameraIndexCode) {
						 	this.$http(`ehome/camera/previewurl/${protocol}/${indexCode}`, 'POST', {
						 		'protocol': 'hls',
						 		'indexCode': e.cameraIndexCode
						 	}).then(res => {
						 		console.log(res)
						 	})
						 }
					 })
					})
				}
			},
			//     萤石第一个参数 nvrDeviceSerial
			//		channelNo 默认1
			// ezvizAccountId  ezvizAccountId
			// 3. 获取萤石云播放URL
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

			// 获取海康播放url   ehome/camera/previewurl/{protocol}/{indexCode
			//  protocol 默认值
			//  indexCode对应  cameraIndexCode


		},
		onLoad(options) {
			console.log(options)
			this.projectId = options.projectId;
			console.log(this.projectId)
			this.show();
			this.ehome();
			// this.etEzNewLiveAddress()
		}
	}
</script>

<style lang="scss" scoped>

</style>
