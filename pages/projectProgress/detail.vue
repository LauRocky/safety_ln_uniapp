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
	import {getDictList} from '../../utils/api.js'
	
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
				timeOver:[],
				
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
					
					this.projectInfo.nodes.forEach(item=>{
						
						if(item.plannedTime && item.finishTime){
							
							let count = this.getDate(item.plannedTime,item.finishTime)
							
							// 大于7天一般 大于15天较重 大于30天严重 大于60天特别严重
							// 0特别严重 1 严重 2较重 3一般	
							if(count>60){
								this.timeOver.push({
									type:'0',
									value:'特别严重',
									taskName:item.taskName,
								})
							}else if(count>30){
								this.timeOver.push({
									type:'1',
									value:'严重',
									taskName:item.taskName,
								})
							}else if(count>15){
								this.timeOver.push({
									type:'2',
									value:'较重',
									taskName:item.taskName,
								})
							}else{
								this.timeOver.push({
									type:'3',
									value:'一般',
									taskName:item.taskName,
								})
							}
							console.log('item',this.timeOver)
							
						}
						
					})
					
				})
			},
			/* 获得地址 */
			getAddress(address){
				if(address){
					return address.replaceAll(",","")
				}else{
					return ''
				}
				
			},
			/* 获得项目的状态 */
			getProjectStatus(status){
				let str = ''
				this.projectStatus.forEach(item=>{
					if(item.code == status){
						str = item.value
					}
				})
				return str
			},
			/* 将字符串转换为日期的方法 */
			getDate(dateString1,dateString2){
				/* var timeArr = str.split("-");
				return new Date(timeArr[0],timeArr[1],timeArr[2]) */
				let time1 = dateString1.split("-")
				let time2 = dateString2.split("-")
				let startDate = new Date(time1[0],time1[1],time1[2])
				let endDate = new Date(time2[0],time2[1],time2[2])
				if (startDate>endDate){
					return 0;
				}
				if (startDate==endDate){
					return 1;
				}
				var days=(endDate - startDate)/(1*24*60*60*1000);
				return  days;
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
