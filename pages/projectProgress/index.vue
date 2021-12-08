<template>
	<view>
		
		<view class="project-container">
			<uni-card title="1111">
				111
			</uni-card>
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
					 projectId:0,
					 status:'',
				 },
			}
		}, 
		methods: {
			getProjectList(){
				this.$http('/project/plan/withStatus','POST',this.queryForm).then(res=>{
					console.log(res)
				})
			}
		},
		onLoad() {
			// this.getProjectList()
		}
		
	}
</script>

<style scoped>
	>>> .u-navbar__content__left__text{
		color: #FFFFFF !important;
		font-size:40rpx;
		margin-left: 22rpx;
	}
	>>> .u-icon__icon{
		color: #FFFFFF !important;
		font-size: 60rpx !important;
		margin-right: 22rpx;
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
