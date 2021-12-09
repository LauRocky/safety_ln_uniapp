<template>
	<view class="detail">
		
			<u-navbar :title="projectInfo.projectName" :fixed="true" :placeholder="true" 
			:safeAreaInsetTop="true" bgColor="#11B38C" @leftClick="back">
				
			</u-navbar>
		详情页面
	</view>
</template>

<script>
	export default {
		components:{},
		data(){
			return {
				projectInfo:{
					projectId:'',
					projectName:'',
				}
			}
		}, 
		methods: {
			back(){
				uni.navigateBack({
				    delta: 2
				});
			}
		},
		onLoad: function (option) {
			this.projectInfo.projectId = option.projectId
			this.projectInfo.projectName = option.projectName
		},
		onShow() {
			
		}
		
	}
</script>

<style>
	.u-icon__icon[data-v-6e20bb40]{
		color: #FFFFFF !important;
		font-weight: 900 !important;
	} 
	.u-navbar__content__title[data-v-1194bf80]{
		color: #FFFFFF;
		font-weight: 550;
	}
</style>
