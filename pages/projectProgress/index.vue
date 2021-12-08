<template>
	<view>
		
		<u-navbar :fixed="true" :placeholder="true" :safeAreaInsetTop="true" bgColor="#11B38C" leftIcon="">
			
			<view class="u-nav-left"slot="left">
				公司名称
			</view>
			
			<view class="u-nav-right"slot="right">
				 <u-search  shape="round" height="50" bgColor="#ffffff" :showAction="false"></u-search>
			</view>
			
		</u-navbar>
		
		<view class="project-container">
			
			<view class="project">
				
				<view class="title">12</view>
				
				<view class="status">123</view>
				
			</view>
			
			<!-- <uni-card v-for="(project,index) in projectList" :key="project.projectId" :title="project.projectName">
				
				<view v-if="getprocess(project.projectId) == 0">
					<uni-tag  type="default" text="进度正常"></uni-tag>
					<text style="margin-left: 23rpx;">项目各个环节进度正常</text> 
				</view>
				
				<view v-else>
					<uni-tag  type="error" text="进度异常"></uni-tag>
					<text style="margin-left: 23rpx;">项目{{getprocess(project.projectId)}}个环节进度异常</text> 
				</view>
				
			</uni-card> -->
			
		</view>
				
	</view>
	
</template>

<script>
	export default {
		components:{},
		data(){
			return {
				 queryForm:{
					 companyId: JSON.parse(uni.getStorageSync('user')).companyId,
					 projectId: '',
					 status:'',
				 },
				 projectList:[],
			}
		}, 
		methods: {
			getProjectList(){
				this.$http('/project/plan/withStatus','POST',this.queryForm).then(res=>{
					this.projectList = res.data.page 
				})
			},
			getprocess(projectId){
				let arr = []
				if(this.projectList){
					this.projectList.forEach(item=>{
						if(item.projectId==projectId){
							item.nodes.forEach(node=>{
								if(node.nodeState == '3' || node.nodeState == '4'){
									arr.push(node)
								}
							})
						}
					})
				}
				return arr.length
			}
		},
		onShow() {
			this.getProjectList()
		}
		
	}
</script>

<style scoped>
	.status{
		border-top: 1rpx solid #888888;
	}
	.project{
		background-color: #00B48F;
		margin: 20rpx;
		border-radius: 10rpx;
	}
	>>> .u-tag--primary[data-v-95cf93f4]{
		border: none;
	}
	.u-nav-left{
		color: #FFFFFF;
		font-weight: 550;
	}
	.tips{
		background-color: #E95A4E;
		width: 20px;
		height: 20px;
		position: absolute;
		top: -12px;
		left: 45px;
		border-radius: 50px;
		color: #FFFFFF;
	}
	.tagsBackground{
		background-color: #00B48F;
		color: #FFFFFF !important;
	}
	
	.uni-tag[data-v-1516016e]{
		padding: 10rpx 20rpx;
	}
	.uni-tag--default--inverted[data-v-1516016e]{
		color: #27A386;
		border-color: #27A386;
		font-size: 14px;
	}
	/* 将三个内容view的display设置为none(隐藏) */
	.end-title{
		display: flex;
		color: #707070;
		height: 110rpx;
		line-height: 110rpx;
		font-weight: 750;
		background-color: #F2F2F2;
	}
	.end-title view{
		flex-grow: 1;
		text-align: center;
	}
	.btna{
		color: #000000;
		border-bottom: 6rpx solid #2297F4;
	}
</style>
