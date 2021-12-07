<template>
	<view>
		
		<uni-nav-bar :fixed="true" statusBar="false"  color="#fff" backgroundColor="#11B38C" left-text="首页" right-icon="scan" @clickRight="scan" />
		
		<view class="content">
			<view class="summary">
				<uni-section type="line" title="汇总情况" :padding="true">
					<view style="font-size: 36rpx;" 
					class="summary-item" v-for="(item,index) in summaryList" 
					:key="index" :class="{'danger-color':item.name=='风险'}">
					
						<view>{{item.name}}</view>
						<view style="margin-top: 15rpx;font-weight: 550;">{{item.number}}</view>
						
					</view>
				</uni-section>
			</view>
			<view class="danger-data">
				<uni-section type="line" title="隐患数据" :padding="true">
					<view class="danger-item" v-for="(item,index) in dangerList" :key="index" 
					:class="{'overtime':item.name=='超期','finish-edit':item.name=='已整改','finish-check':item.name=='已复核'}">
						<view>{{item.name}}</view>
						<view style="font-weight: 550;">{{item.number}}</view>
						<view style="font-size: 25rpx;" v-if="item.name!='超期'"><text style="color: #7F7F7F;">今日+</text>{{item.now}}</view>
					</view>
				</uni-section>
			</view>
			<view class="danger-trend">
				<uni-section type="line" title="每日隐患趋势">
					<view class="charts-box">
					  <qiun-data-charts type="line" :chartData="chartsDataLine" :echartsH5="true" :echartsApp="true"/>
					</view>
				</uni-section>
			</view>
		</view>
		
	</view>
</template>

<script>
	import uniSection from '../../components/uni-section/uni-section.vue'
	
	export default {
		components:{uniSection},
		data() {
			return {
				title: 'Hello',
				chartsDataLine:{
					categories: ["2016", "2017", "2018", "2019", "2020", "2021"],
					series: [{
						name: "发现",
						data: [3, 8, 2, 3, 4, 2]
					}, {
						name: "整改",
						data: [7, 4, 6, 1, 4, 6]
					}, {
						name: "复核",
						data: [5, 8, 9, 1, 1, 1]
					}]
				},
				summaryList:[
					{name:'公司',number:'4'},
					{name:'用户',number:'5407'},
					{name:'摄像头',number:'4'},
					{name:'风险',number:'0'},
				],
				dangerList:[
					{name:'发现',number:0,now:0},
					{name:'已整改',number:0,now:0},
					{name:'已复核',number:0,now:0},
					{name:'超期',number:0,now:0},
				]
			}
		},
		onLoad() {

		},
		methods: {
			scan() {
				uni.showToast({
					title: '扫码'
				})
			},
		}
	}
</script>

<style scoped>
	.charts-box{
		width: 100%;
		height: 300px;
	}
	.danger-item{
		display: inline-block;
		text-align: center;
		width: 24%;
		margin-left: 2rpx;
		color: #F94939;
	}
	.finish-check{
		color: #33B29A;
	}
	.overtime{
		position: absolute;
		color: #5F7385;
	}
	.finish-edit{
		color:#E9861C;
	}
	.danger-color{
		color: #F09F80;
	}
	.summary-item{
		display: inline-block;
		text-align: center;
		width: 24%;
		margin-left: 2rpx;
	}
	>>> .uni-navbar__header[data-v-6bda1a90]{
		height: 110rpx;
		line-height: 110rpx;
	}
	>>> .uni-navbar__header-btns-left[data-v-6bda1a90]{
		margin-left: 10rpx;
		width: 170rpx;
	}
	>>> .uni-navbar__content_view[data-v-6bda1a90] uni-text span{
		font-size: 38rpx !important;
	}
	>>> .uni-navbar__content_view[data-v-6bda1a90] uni-text{
		font-size: 55rpx !important;
	}
	
</style>
