<template>
	<view>
		
		<u-navbar :fixed="true" :placeholder="true" :safeAreaInsetTop="true" bgColor="#11B38C" leftIcon="">
			<view class="u-nav-right" slot="right">
				<nav-bar :title="title" @seach="handseach" @Upqie="handUpqie"></nav-bar>
			</view>
		</u-navbar>
		<view class="video">
			<view class="video-item" v-for="(item,index) in videoList" :key="item.projectId" @click="video(item)">
				<view class="ball"><text>{{item.projectName.substring(0,1)}}</text></view>
				<view class="main">
					<view
						style="display: flex; align-items: center;justify-content: space-between; color: #737373;font-size: 33upx;">
						<text style="margin-left: 20upx;font-weight: 900;">{{item.projectName}}</text>
						<uni-icons size="20" color=" #737373" type="right"></uni-icons>
					</view>
					<view style="margin-top: 15upx;font-size: 28upx;color: #7D7D7D;">
						<text style="margin-left: 20upx;">
							<image src="../../static/video/jiankong.png" mode="" style="width: 30upx;height: 30upx;">
							</image>
							监控数量: {{item.MonitorMumber}}
						</text>
						<text style="margin-left: 20upx;">
							<image src="../../static/video/danbing.png" mode="" style="width: 30upx;height: 30upx;">
							</image>单兵数量: {{item.individual}}
						</text>
					</view>
				</view>
			</view>
		</view>
		<mypicker :show="show" @handcompany="handcompany" @close="handclose" />
	</view>
</template>

<script>
	import navBar from '../../components/navBar/navBar.vue'
	import mypicker from '../../components/mypicker/mypicker.vue';
	export default {
		components:{
			navBar,
			mypicker
		},
		data() {
			return {
				title:"所有城市",
				show: false,
				videoList: [],
				dataList: []
			}
		},
		methods: {
			handUpqie() {
				this.show = true;
			},
			handclose() {
				this.show = false;
			},
			handcompany(v) {
				this.title = v;
				this.show = false;
			},
			video(e){
				console.log(e)
				if(e.cameraEntities.length!=0){
					uni.navigateTo({
						url: `/pages/video/showVideo?projectId=${e.projectId}&projectName=${e.projectName}`,
					});
				}else{
					uni.showToast({
						title:'当前没有监控',
						icon:'none'
					})
				}
			},
			// 获取当前公司下所有项目
			getCompanySelectData() {
				this.$http('/getCompanyProjectWithCamera', 'POST', {
					companyId: JSON.parse(uni.getStorageSync('userInfo')).companyId
				}, false).then(res => {
					res.data.forEach(el => {
						el.individual = 0;
						el.MonitorMumber = 0;
						el.cameraEntities.forEach(e => {
							if (e.ipcType == 3) {
								el.individual += 1;
							}
							if (e.ipcType == 1) {
								el.MonitorMumber += 1;
							}
						})
					})
					this.dataList = res.data
					this.videoList=this.dataList
				})
			},
			
			//模糊查询
			handseach(val) {
				if(val){
					let result=[]
					 this.videoList.forEach(e=>{
						 let pName=e.projectName;
						 if(pName.indexOf(val)>-1){
							 result.push(e)
						 }
					 })
					 this.videoList=result
				}else{
					this.videoList=this.dataList
				}
			},
		},
		onLoad() {
			this.getCompanySelectData()

		},
	}
</script>

<style scoped>
	.u-nav-left {
		color: #FFFFFF;
		font-weight: 550;
	}
	.video {
		margin-top: 25upx;
	}

	.main {
		width: 80%;
	}

	.ball {
		background-color: #03B293;
		width: 20%;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #FFFFFF;
		font-size: 40upx;
		width: 100upx;
		height: 100upx;
		border-radius: 50upx;
	}

	.video-item {
		display: flex;
		padding: 40upx;
		padding-top: 20upx;
		padding-right: 10upx;
	}
</style>
