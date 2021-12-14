<template>
	<view class="detail">
		<u-navbar :title="project.projectName" :fixed="true" :placeholder="true" :safeAreaInsetTop="true"
			bgColor="#11B38C" @leftClick="back">
		</u-navbar>
		<view class="detail-container">
			<view class="title">
				<text>项目基本信息</text>
				<u-tag style="font-size: 24rpx;" size="mini" :text="getProjectStatus(projectInfo.status)"
					borderColor="#00B490" bgColor="#00B490" color="#ffffff">
				</u-tag>
			</view>
			<view class="msg-item">
				1
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
				<view class="container">{{projectInfo.partnerProjectManager}}
					{{projectInfo.partnerProjectManagerMobile}}
				</view>
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
			<view class="project-node" v-for="item in timeOver" :key=item.id>
				<view class="node-tag">
					<u-tag size="mini" :borderColor="bgColor(item.type)" :bgColor="bgColor(item.type)" color="#ffffff"
						:text="item.value"></u-tag>
				</view>
				<view :class="{'node-info' : item.value.length==2,'node-info1' : item.value.length==4,}">
					{{item.taskName}}
				</view>
			</view>
			<view class="project-status">
				<u-icon v-show="isShow" name="arrow-down" @click="showStatus"></u-icon>
				<view class="status-container" v-show="!isShow">
					<view class="status-tag-container" style="margin-bottom: 60rpx;">
						<view v-for="(item,index) in statusList" :key=item.code :class="{
								'no-margin-left':index==0||index==3,
								'item-margin-top':index==3||index==4||index==5,
								'active-tags':currentIndex==index}" class="tags" @click="changeTags(index)">
							<text> {{item.name}} </text>
						</view>
					</view>
					<!-- 竖形进度条 -->
					<view class="progress" v-if="currentIndex==0">
						<view class="plan" style="display: flex; " v-for="(item,index) in projectInfo.nodes"
							:key="item.id">
							<view class="line" style="width: 1rpx;  border-left: 1rpx dashed #7E7E7E;">
							</view>
							<view class="plan-border" style="position: relative;">
								<view class="imgs"
									style="width: 38rpx;height:38rpx;background-color: #FFFFFF; position: absolute;  left: -20rpx; overflow: hidden;">
									<image v-if="index==0||index==1||index==2||index==5||index==9"
										style="width: 38rpx;height:38rpx; " src="../../static/projectdetail/yuan.png"
										mode=""></image>
									<image v-if="index==3" style="width: 38rpx;height:38rpx;"
										src="../../static/projectdetail/zise.png" mode=""></image>
									<image v-if="index==4||index==8||index==11||index==12||index==13||index==14"
										style="width: 38rpx;height:38rpx;" src="../../static/projectdetail/hui.png"
										mode=""></image>
									<image v-if="index==6||index==10" style="width: 38rpx;height:38rpx;"
										src="../../static/projectdetail/green.png" mode=""></image>
									<image v-if="index==7" style="width: 38rpx;height:38rpx;"
										src="../../static/projectdetail/red.png" mode=""></image>
								</view>
								<view class="plan-title" style="padding-left: 20rpx;">
									<view class="plan-left">
										{{item.taskName}}
									</view>
									<view class="title-time" v-if="item.finishTime">
										计划完成时间:&nbsp;{{item.finishTime}}
									</view>
									<view class="title-time" v-else>
										计划完成时间:无
									</view>
								</view>
								<view class="statusList">
									{{item.expireStatus==0?'未开始/未涉及':''}}
									{{item.expireStatus==1?'正在进行中':''}}
									{{item.expireStatus==2?'已完成':''}}
									{{item.expireStatus==3?'超期未完成':''}}
									{{item.expireStatus==4?'超期已完成':''}}
									{{item.expireStatus==5?'未超期已完成':''}}
								</view>
							</view>
						</view>
					</view>
					<view class="progress" v-if="currentIndex==1">
						<view class="plan" style="display: flex; " v-for="item in ongoing" :key="item.id">
							<view class="line" style="width: 1rpx;  border-left: 1rpx dashed #7E7E7E;">
							</view>
							<view class="plan-border" style="position: relative;">
								<view class="imgs"
									style="width: 38rpx;height:38rpx;background-color: #FFFFFF; position: absolute;  left: -20rpx; overflow: hidden;">
									<image v-if="item.taskName=='拆完外架'" style="width: 38rpx;height:38rpx;"
										src="../../static/projectdetail/red.png" mode=""></image>
									<image v-if="item.taskName=='外装饰完成'" style="width: 38rpx;height:38rpx;"
										src="../../static/projectdetail/hui.png" mode=""></image>
									<image
										v-if="item.taskName=='精装启动会'||item.taskName=='策划方案审批完成'||item.taskName=='总包监理招标完成'||item.taskName=='取得施工证'||item.taskName=='项目出零米' "
										style="width: 38rpx;height:38rpx;" src="../../static/projectdetail/yuan.png"
										mode=""></image>
									<image v-if="item.taskName=='幕墙园林进场'||item.taskName=='主体全封顶' "
										style="width: 38rpx;height:38rpx;" src="../../static/projectdetail/green.png"
										mode=""></image>
									<image v-if="item.taskName=='召开工程启动会'" style="width: 38rpx;height:38rpx;"
										src="../../static/projectdetail/zise.png" mode=""></image>
								</view>
								<view class="plan-title" style="padding-left: 20rpx;">
									<view class="plan-left">
										{{item.taskName}}
									</view>
									<view class="title-time" v-if="item.finishTime">
										计划完成时间:&nbsp;{{item.finishTime}}
									</view>
									<view class="title-time" v-else>
										计划完成时间:无
									</view>
								</view>
								<view class="statusList">
									{{item.expireStatus==0?'未开始/未涉及':''}}
									{{item.expireStatus==1?'正在进行中':''}}
									{{item.expireStatus==2?'已完成':''}}
									{{item.expireStatus==3?'超期未完成':''}}
									{{item.expireStatus==4?'超期已完成':''}}
									{{item.expireStatus==5?'未超期已完成':''}}
								</view>
							</view>
						</view>
					</view>
					<view class="progress" v-if="currentIndex==2">
						<view class="plan" style="display: flex; " v-for="item in complete" :key="item.id">
							<view class="line" style="width: 1rpx;  border-left: 1rpx dashed #7E7E7E;">
							</view>
							<view class="plan-border" style="position: relative;">
								<view class="imgs"
									style="width: 38rpx;height:38rpx;background-color: #FFFFFF; position: absolute;  left: -20rpx; overflow: hidden;">
									<image style="width: 38rpx;height:38rpx;" src="../../static/projectdetail/yuan.png"
										mode=""></image>
								</view>
								<view class="plan-title" style="padding-left: 20rpx;">
									<view class="plan-left">
										{{item.taskName}}
									</view>
									<view class="title-time" v-if="item.finishTime">
										计划完成时间:&nbsp;{{item.finishTime}}
									</view>
									<view class="title-time" v-else>
										计划完成时间:无
									</view>
								</view>
								<view class="statusList">
									{{item.expireStatus==0?'未开始/未涉及':''}}
									{{item.expireStatus==1?'正在进行中':''}}
									{{item.expireStatus==2?'已完成':''}}
									{{item.expireStatus==3?'超期未完成':''}}
									{{item.expireStatus==4?'超期已完成':''}}
									{{item.expireStatus==5?'未超期已完成':''}}
								</view>
							</view>
						</view>
					</view>
					<view class="progress" v-if="currentIndex==3">
						<view class="plan" style="display: flex; " v-for="item in overundone" :key="item.id">
							<view class="line" style="width: 1rpx;  border-left: 1rpx dashed #7E7E7E;">
							</view>
							<view class="plan-border" style="position: relative;">
								<view class="imgs"
									style="width: 38rpx;height:38rpx;background-color: #FFFFFF; position: absolute;  left: -20rpx; overflow: hidden;">
									<image v-if="item.taskName=='拆完外架'" style="width: 38rpx;height:38rpx;"
										src="../../static/projectdetail/red.png" mode=""></image>
									<image v-if="item.taskName=='外装饰完成'" style="width: 38rpx;height:38rpx;"
										src="../../static/projectdetail/hui.png" mode=""></image>
									<image
										v-if="item.taskName=='精装启动会'||item.taskName=='策划方案审批完成'||item.taskName=='总包监理招标完成'||item.taskName=='取得施工证'||item.taskName=='项目出零米' "
										style="width: 38rpx;height:38rpx;" src="../../static/projectdetail/yuan.png"
										mode=""></image>
									<image v-if="item.taskName=='幕墙园林进场'||item.taskName=='主体全封顶' "
										style="width: 38rpx;height:38rpx;" src="../../static/projectdetail/green.png"
										mode=""></image>
									<image v-if="item.taskName=='召开工程启动会'" style="width: 38rpx;height:38rpx;"
										src="../../static/projectdetail/zise.png" mode=""></image>
								</view>
								<view class="plan-title" style="padding-left: 20rpx;">
									<view class="plan-left">
										{{item.taskName}}
									</view>
									<view class="title-time" v-if="item.finishTime">
										计划完成时间:&nbsp;{{item.finishTime}}
									</view>
									<view class="title-time" v-else>
										计划完成时间:无
									</view>
								</view>
								<view class="statusList">
									{{item.expireStatus==0?'未开始/未涉及':''}}
									{{item.expireStatus==1?'正在进行中':''}}
									{{item.expireStatus==2?'已完成':''}}
									{{item.expireStatus==3?'超期未完成':''}}
									{{item.expireStatus==4?'超期已完成':''}}
									{{item.expireStatus==5?'未超期已完成':''}}
								</view>
							</view>
						</view>
					</view>
					<view class="progress" v-if="currentIndex==4">
						<view class="plan" style="display: flex; " v-for="item in overcomplete" :key="item.id">
							<view class="line" style="width: 1rpx;  border-left: 1rpx dashed #7E7E7E;">
							</view>
							<view class="plan-border" style="position: relative;">
								<view class="imgs"
									style="width: 38rpx;height:38rpx;background-color: #FFFFFF; position: absolute;  left: -20rpx; overflow: hidden;">
									<image v-if="item.taskName=='拆完外架'" style="width: 38rpx;height:38rpx;"
										src="../../static/projectdetail/red.png" mode=""></image>
									<image v-if="item.taskName=='外装饰完成'" style="width: 38rpx;height:38rpx;"
										src="../../static/projectdetail/hui.png" mode=""></image>
									<image
										v-if="item.taskName=='精装启动会'||item.taskName=='策划方案审批完成'||item.taskName=='总包监理招标完成'||item.taskName=='取得施工证'||item.taskName=='项目出零米' "
										style="width: 38rpx;height:38rpx;" src="../../static/projectdetail/yuan.png"
										mode=""></image>
									<image v-if="item.taskName=='幕墙园林进场'||item.taskName=='主体全封顶' "
										style="width: 38rpx;height:38rpx;" src="../../static/projectdetail/green.png"
										mode=""></image>
									<image v-if="item.taskName=='召开工程启动会'" style="width: 38rpx;height:38rpx;"
										src="../../static/projectdetail/zise.png" mode=""></image>
								</view>
								<view class="plan-title" style="padding-left: 20rpx;">
									<view class="plan-left">
										{{item.taskName}}
									</view>
									<view class="title-time" v-if="item.finishTime">
										计划完成时间:&nbsp;{{item.finishTime}}
									</view>
									<view class="title-time" v-else>
										计划完成时间:无
									</view>
								</view>
								<view class="statusList">
									{{item.expireStatus==0?'未开始/未涉及':''}}
									{{item.expireStatus==1?'正在进行中':''}}
									{{item.expireStatus==2?'已完成':''}}
									{{item.expireStatus==3?'超期未完成':''}}
									{{item.expireStatus==4?'超期已完成':''}}
									{{item.expireStatus==5?'未超期已完成':''}}
								</view>
							</view>
						</view>
					</view>
					<view class="progress" v-if="currentIndex==5">
						<view class="plan" style="display: flex; " v-for="item in noovercomplete" :key="item.id">
							<view class="line" style="width: 1rpx;  border-left: 1rpx dashed #7E7E7E;">
							</view>
							<view class="plan-border" style="position: relative;">
								<view class="imgs"
									style="width: 38rpx;height:38rpx;background-color: #FFFFFF; position: absolute;  left: -20rpx; overflow: hidden;">
									<image style="width: 38rpx;height:38rpx;" src="../../static/projectdetail/yuan.png"
										mode=""></image>
								</view>
								<view class="plan-title" style="padding-left: 20rpx;">
									<view class="plan-left">
										{{item.taskName}}
									</view>
									<view class="title-time" v-if="item.finishTime">
										计划完成时间:&nbsp;{{item.finishTime}}
									</view>
									<view class="title-time" v-else>
										计划完成时间:无
									</view>
								</view>
								<view class="statusList" v-if="item.expireStatus==3">
									超期{{item.comtime}}未完成
								</view>
								<view class="statusList" v-else-if="item.expireStatus==4">
									超期{{item.fourtime}}已完成
								</view>
								<view class="statusList" v-else>
									{{item.expireStatus==0?'未开始/未涉及':''}}
									{{item.expireStatus==1?'正在进行中':''}}
									{{item.expireStatus==2?'已完成':''}}
									{{item.expireStatus==5?'未超期已完成':''}}
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getDictList
	} from '../../utils/api.js'

	export default {
		components: {},
		data() {
			return {
				currentIndex: 0,
				isShow: true,
				project: {
					projectId: '',
					projectName: '',
					companyId: '',
				},
				projectInfo: {},
				projectStatus: [],
				ongoing: [], //正在进行中
				complete: [], //已完成
				overundone: [], //超期未完成
				overcomplete: [], //超期已完成
				noovercomplete: [], //未超期已完成
				timeOver: [],
				statusList: [{
						code: '',
						name: '全部'
					},
					{
						code: '1',
						name: '正在进行中'
					},
					{
						code: '0',
						name: '未开始/未涉及'
					},
					{
						code: '5',
						name: '未超期已完成'
					},
					{
						code: '3',
						name: '超期未完成'
					},
					{
						code: '4',
						name: '超期已完成'
					}
				]
			}
		},
		computed: {

		},
		methods: {
			// plantime() {
			// 	this.projectInfo.nodes.forEach(el => {
			// 		console.log(el.expireStatus)
			// 		// 计算时间差
			// 		if (el.expireStatus == 3) {
			// 			el.comtime = this.timeCalc(el.plannedTime, el.finishTime)
			// 			console.log(el.comtime)
			// 		}
			// 		if (el.expireStatus == 4) {
			// 			el.fourtime = this.timeCalc(el.plannedTime, el.finishTime)
			// 			console.log(el.comtime)
			// 		}
			// 		console.log(el)
			// 	})
			// },
			showStatus() {
				this.isShow = false
			},
			/* 处理颜色 */
			bgColor(type) {
				switch (type) {
					case '0':
						return '#FF0000'
					case '1':
						return '#ff620d'
					case '2':
						return '#E4D708'
					case '3':
						return '#29ABE2'
				}
			},
			changeTags(index) {
				this.currentIndex = index
			},
			back() {
				this.timeOver = []
				uni.navigateBack({
					delta: 2
				});
			},
			getProject() {
				this.$http('/project/plan/withStatus', 'POST', this.project).then(res => {
					this.projectInfo = res.page[0]
					this.projectInfo.nodes.forEach(item => {
						if (item.expireStatus == 1) {
							this.ongoing.push(item)
						}
						if (item.expireStatus == 2) {
							this.complete.push(item)
						}
						if (item.expireStatus == 3) {
							this.overundone.push(item)
						}
						if (item.expireStatus == 4) {
							this.overcomplete.push(item)
						}
						if (item.expireStatus == 5) {
							this.noovercomplete.push(item)
						}
					})
					this.projectInfo.nodes.forEach(item => {
						// 项目进度信息时间判断
						if (item.plannedTime && item.finishTime) {
							let count = this.getDate(item.plannedTime, item.finishTime)
							// 大于7天一般 大于15天较重 大于30天严重 大于60天特别严重
							// 0特别严重 1 严重 2较重 3一般	
							if (count >= 60) {
								this.timeOver.push({
									id: item.id,
									type: '0',
									value: '特别严重',
									taskName: item.taskName,
								})
							} else if (count >= 30) {
								this.timeOver.push({
									id: item.id,
									type: '1',
									value: '严重',
									taskName: item.taskName,
								})
							} else if (count >= 15) {
								this.timeOver.push({
									id: item.id,
									type: '2',
									value: '较重',
									taskName: item.taskName,
								})
							} else if (count >= 7) {
								this.timeOver.push({
									id: item.id,
									type: '3',
									value: '一般',
									taskName: item.taskName,
								})
							}
						}
					})
				})
			},
			/* 获得地址 */
			getAddress(address) {
				if (address) {
					return address.replace(/,/g, "")
					// return ''
				} else {
					return ''
				}
			},
			/* 获得项目的状态 */
			getProjectStatus(status) {
				let str = ''
				this.projectStatus.forEach(item => {
					if (item.code == status) {
						str = item.value
					}
				})
				return str
			},
			/* 将字符串转换为日期的方法 */
			timeCalc(dateString1, dateString2) {
				let time1 = dateString1.split("-")
				let time2 = dateString2.split("-")
				let startDate = new Date(time1[0], time1[1], time1[2])
				let endDate = new Date(time2[0], time2[1], time2[2])
				var days = (endDate - startDate) / (1 * 24 * 60 * 60 * 1000);
				return days;
			},
			/* 将字符串转换为日期的方法 */
			getDate(dateString1, dateString2) {
				let time1 = dateString1.split("-")
				let time2 = dateString2.split("-")
				let startDate = new Date(time1[0], time1[1], time1[2])
				let endDate = new Date(time2[0], time2[1], time2[2])
				if (startDate > endDate) {
					return 0;
				}
				if (startDate == endDate) {
					return 1;
				}
				var days = (endDate - startDate) / (1 * 24 * 60 * 60 * 1000);
				return days;
			}
		},
		onLoad: function(option) {
			this.project.projectId = option.projectId
			this.project.projectName = option.projectName
			this.project.companyId = option.companyId
			this.getProject()
			getDictList('PROJECT_STATUS').then(data => {
				this.projectStatus = data.dict
			})
		},
	}
</script>

<style>
	.active-tags {
		background: #00B490;
		color: #FFFFFF !important;
		font-weight: bold;
	}

	.no-margin-left {
		margin-left: 0 !important;
	}

	.item-margin-top {
		margin-top: 31rpx !important;
	}

	.status-tag-container .tags {
		border: 2rpx solid #00B490;
		font-size: 28rpx;
		font-weight: 500;
		color: #333333;
		border-radius: 6rpx;
		margin-left: 35rpx;
		width: 190rpx;
		height: 56rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.status-tag-container {
		display: flex;
		flex-wrap: wrap;
	}

	.project-status {
		margin-top: 35rpx;
	}

	/* 修改下箭头样式 */
	>>>.project-status .u-icon__icon[data-v-6e20bb40] {
		font-size: 40rpx !important;
		font-weight: bold !important;
		color: #333333 !important;
		margin: 0 auto;
	}

	.node-info {
		margin-left: 119rpx;
	}

	.node-info1 {
		margin-left: 70rpx;
	}

	.project-node {
		display: flex;
		font-size: 28rpx;
		align-items: center;
		margin-top: 20rpx;
	}

	.name {
		flex: 1;
		color: #666666;
	}

	.container {
		flex: 2;
		color: #333333;
	}

	.msg-item {
		display: flex;
		margin-top: 27rpx;
		font-size: 27rpx;
		font-weight: bold;
	}

	.title text {
		font-size: 32rpx;
		font-weight: bold;
	}

	.title {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.statusList {
		width: 172rpx;
		height: 23rpx;
		margin: 24rpx 0 41rpx 32rpx;
		font-size: 24rpx;
		font-weight: bold;
		color: #666666;
	}

	.title .unitag {
		width: 80px;
		height: 38px;
		background: #00B490;
		border-radius: 6px;
	}

	.plan-title {
		width: 685rpx;
		margin-left: 20rpx;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}

	.title-time {
		width: 296rpx;
		height: 24rpx;
		font-size: 24rpx;
		font-weight: bold;
		margin-right: 72rpx;
		color: #666666;
	}

	.plan-left {
		width: 224rpx;
		height: 28rpx;
		font-size: 28rpx;
		font-weight: bold;
		color: #333333;
	}

	.detail-container,
	.process-container {
		margin: 20rpx;
		padding: 20rpx;
		border-radius: 10rpx;
		box-shadow: 0rpx 0rpx 50rpx 0rpx rgba(0, 0, 0, 0.06);
		background-color: #FFFFFF;
	}

	.u-icon__icon[data-v-6e20bb40] {
		color: #FFFFFF !important;
		font-weight: 900 !important;
	}

	.u-navbar__content__title[data-v-1194bf80] {
		color: #FFFFFF;
		font-weight: 550;
	}
</style>
