<template>
	<view class="detail">
		<u-navbar :title="project.projectName" :fixed="true" :placeholder="true" 
		:safeAreaInsetTop="true" bgColor="#11B38C" @leftClick="back">
		</u-navbar>
		
		<view class="detail-container">
			
			<view class="title">
				<text>项目基本信息</text>
				<u-tag style="font-size: 24rpx;" size="mini" :text="getProjectStatus(projectInfo.status)" borderColor="#00B490" bgColor="#00B490" color="#ffffff" ></u-tag>
			</view>
			
			<view class="msg-item">
				<view class="name">项目名称</view>
				<view class="container">{{projectInfo.projectName}}</view>
			</view>
			<view class="msg-item">
				<view class="name">计划开工时间</view>
				<view class="container">{{projectInfo.beginTime}}</view>
			</view>
			<view class="msg-item">
				<view class="name">计划竣工时间</view>
				<view class="container">{{projectInfo.finishTime}}</view>
			</view>
			<view class="msg-item">
				<view class="name">地址</view>
				<view class="container">{{getAddress(projectInfo.shortAddress)}}</view>
			</view>
			<view class="msg-item">
				<view class="name">总包</view>
				<view class="container">{{projectInfo.unit?projectInfo.unit:''}}</view>
			</view>
			<view class="msg-item">
				<view class="name">项目经理（总包）</view>
				<view class="container">{{projectInfo.partnerProjectManager}} {{projectInfo.partnerProjectManagerMobile}}</view>
			</view>
			<view class="msg-item">
				<view class="name">项目经理（甲包）</view>
				<view class="container">{{projectInfo.projectManager}} {{projectInfo.projectManagerMobile}}</view>
			</view>
			
		</view>
		
		<view class="process-container">
			
			<view class="title">
				<text style="margin-bottom: 14rpx;">项目进度信息</text>
			</view>
			
			<view class="project-node">
				<view class="node-tag">
					<u-tag size="mini" borderColor="#FF0000" bgColor="#FF0000" color="#ffffff" text="特别严重"></u-tag>
				</view>
				<view class="node-info">拆完外架节点超期未完成</view>
			</view>
			<view class="project-node">
				<view class="node-tag">
					<u-tag size="mini" borderColor="#29ABE2" bgColor="#29ABE2" color="#ffffff" text="一般"></u-tag>
				</view>
				<view class="node-info">外装饰完成节点一般滞后</view>
			</view>
			<view class="project-node">
				<view class="node-tag">
					<u-tag size="mini" borderColor="#E4D708" bgColor="#E4D708" color="#ffffff" text="较重"></u-tag>
				</view>
				<view class="node-info">外装饰完成节点一般滞后</view>
			</view>
			
		</view>
		
	</view>
</template>

<script>
	import {getDictList} from '../../utils/utils.js'
	export default {
		components:{}, 
		data(){
			return {
				project:{
					projectId:'',
					projectName:'',
					companyId:'',
				},
				projectInfo:{},
				projectStatus:[],
				
			}
		}, 
		
		methods: {
			back(){
				uni.navigateBack({
				    delta: 2
				});
			},
			getProject(){
				this.$http('/project/plan/withStatus','POST',this.project).then(res=>{
					this.projectInfo = res.data.page[0]
					console.log(this.projectInfo)
				})
			},
			getAddress(address){
				if(address){
					return address.replaceAll(",","")
				}else{
					return ''
				}
				
			},
			getProjectStatus(status){
				let str = ''
				this.projectStatus.forEach(item=>{
					if(item.code == status){
						str = item.value
					}
				})
				return str
			}
		},
		
		onLoad: function (option) {
			this.project.projectId = option.projectId
			this.project.projectName = option.projectName
			this.project.companyId = option.companyId
			this.getProject()
			getDictList('PROJECT_STATUS').then(data => {
				this.projectStatus = data
			})
		},
		onShow() {
			
		}
		
	}
</script>

<style>
	.node-info{
		margin-right: 191rpx;
	}
	.project-node{
		display: flex;
		font-size: 28rpx;
		align-items: center;
		justify-content: space-between;
		margin-top: 20rpx;
	}
	.name{
		flex: 1;
		color: #666666;
	}
	.container{
		flex: 2;
		color: #333333;
	}
	.msg-item{
		display: flex;
		margin-top: 27rpx;
		font-size: 27rpx;
		font-weight: bold;
	}
	.title text{
		font-size: 32rpx;
		font-weight: bold;
	}
	.title{
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.detail-container,.process-container{
		margin: 20rpx; 
		padding: 19rpx;
		border-radius: 10rpx;
		box-shadow: 0rpx 0rpx 50rpx 0rpx rgba(0, 0, 0, 0.06);
		background-color: #FFFFFF;
	}
	.u-icon__icon[data-v-6e20bb40]{
		color: #FFFFFF !important;
		font-weight: 900 !important;
	} 
	.u-navbar__content__title[data-v-1194bf80]{
		color: #FFFFFF;
		font-weight: 550;
	}
</style>
