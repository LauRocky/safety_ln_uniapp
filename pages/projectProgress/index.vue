<template>
	<view style="height: 200%;background-color: #F2F2F2;">
		<view class="end-title">
		　　<view @tap="change(0)" :class="{btna:btnnum == 0}">进度滞后</view>
		  　<view @tap="change(1)" :class="{btna:btnnum == 1}">进度正常</view>
		</view>
		 
		<view class="end-cont" :class="{dis:btnnum == 0}">
			<u-tag  style="margin-left: 18rpx;" :inverted="true" 
				:text="tag" v-for="(tag,index) in tagName" :key=index
				@click="changeTags(index)" :class="{'tagsBackground' : index==currentIndex}">
			</u-tag >
			
			<uni-card :is-shadow="true" v-for="(project,index) in projectMessage"   :title="project.name">
				
				<view v-for="(item,index) in project.list" > 
					<!-- <u-tag  :text="item.type"></u-tag> -->
					<text style="margin-left: 20rpx;color: #000000;">{{item.content}}({{item.status}})</text>
				</view>
				
			</uni-card>
		 　　
		</view>
		
		<view class="end-cont" :class="{dis:btnnum == 1}">
		 　　<uni-card class="card1" :is-shadow="true" v-for="(project,index) in projectMessage" :title="project.name">
				
				<view v-for="(item,index) in project.list" :key="index"> 
					<u-tag :text="item.type"></u-tag>
					<text style="margin-left: 20rpx;color: #000000;">{{item.content}}({{item.status}})</text>
				</view>
				
			</uni-card>
		</view>
		
	</view>
	
</template>

<script>
	export default {
		components:{},
		data(){
			return {
				 btnnum: 0,
				 tagName:['全部','一般','较重','严重','特别严重'],
				 currentIndex:0,
				 projectMessage:[{
					 name:'郑州鲁能花园一号院二期项目',
					 list:[{
						 type:'较重',
						 content:'外装饰完成',
						 status:'未开始,未涉及'
					 }]
					 
				 },{
					 name:'郑州鲁能花园一号院二期项目',
					 list:[{
						 type:'较重',
						 content:'外装饰完成',
						 status:'未开始,未涉及'
					 }]
					 
				 }]
			}
		},
		methods: {
			change(e) {
			    this.btnnum = e
			},
			changeTags(index){
				this.currentIndex = index
			},
		},
		
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
	.end-cont{
		display: none;
		margin-top: 5rpx;
		padding: 30rpx;
	}
	.end-cont .card1 {
		margin-top: -15rpx !important;
	}
	.btna{
		color: #000000;
		border-bottom: 6rpx solid #2297F4;
	}
	.dis{
		display: block;
	} 
</style>
