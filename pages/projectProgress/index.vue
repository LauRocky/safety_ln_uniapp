<template>
	<view>
		<nav-bar :title="company" @seach="handseach"></nav-bar>
		
		<view class="project-container">
			
			<view class="project" :class="{first : index == 0}" v-for="(project,index) in projectList" :key="project.projectId">
				
				<view class="title">
					<text>{{project.projectName}}</text>
					<u-icon color="#303133" :bold="true" name="arrow-right" @click="goDetail(project.projectId,project.projectName,project.companyId)"></u-icon>
				</view>
				
				<view class="status" v-if="getprocess(project.projectId) == 0">
					<u-tag style="margin-top: 8rpx;" size="mini" bgColor="#00B490" color="#ffffff" text="进度正常"></u-tag>
					<text style="margin-left: 20rpx;">项目各个环节进度正常</text>
				</view>
				
				<view class="status" v-else>
					<u-tag style="margin-top: 8rpx;" size="mini" bgColor="#FF0000" color="#ffffff" text="进度异常"></u-tag>
					<text style="margin-left: 20rpx;">项目{{getprocess(project.projectId)}}个环节进度异常</text>
				</view>
				
			</view>			
		</view>
				
	</view>
	
</template>

<script>
	import navBar from '../../components/navBar/navBar.vue'
	export default {
		components:{
			navBar
		},
		data(){
			return {
				company:"所有城市",
				queryForm:{
					companyId: JSON.parse(uni.getStorageSync('user')).companyId,
					projectId: '',
					status:'',
				},
				 projectList:[],
			}
		}, 
		methods: {
			handseach(){
				console.log('搜索~~~')
			},
			getProjectList(){
				this.$http('/project/plan/withStatus','POST',this.queryForm).then(res=>{
					this.projectList = res.data.page 
				})
			},
			/* 根据项目id判断节点状态 返回有几个异常 */
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
			},
			/* 跳转到详情页面 */
			goDetail(projectId,projectName,companyId){
				uni.navigateTo({
					url:`./detail?projectId=${projectId}&projectName=${projectName}&companyId=${companyId}`
				})
			}
		},
		onShow() {
			this.getProjectList()
		}
		
	}
</script>

<style scoped>
	.first{
		margin-top: 30rpx !important;
	}
	.status{
		border-top: 2rpx solid #F6F8F7;
		padding: 20rpx;
		padding-left: 0;
		display: flex;
		align-items: center;
	}
	.status text{
		font-size: 28rpx;
		font-weight: 500;
	}
	.project{
		margin: 20rpx;
		border-radius: 10rpx;
		padding: 20rpx;
		box-shadow: 0px 0px 11px 0px rgba(0, 0, 0, 0.06);
	}
	.project .title{
		display: flex;
		align-items: center;
		padding-bottom: 21rpx;
		justify-content: space-between;
	}
	.project .title text{
		font-size: 32rpx;
		font-weight: bold;
		color: #333333;
	}
	>>> .u-tag--primary[data-v-95cf93f4]{
		border: none;
	}
	.u-nav-left{
		color: #FFFFFF;
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
