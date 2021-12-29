<template>
	<view class="detail">
		<TwoNavbar :name="project.projectName"></TwoNavbar>
		<view class="detail-container">
			<view class="title">
				<text>项目基本信息</text>
				<u-tag style="font-size: 24upx;" size="mini" :text="getProjectStatus(projectInfo.status)"
					borderColor="#00B490" bgColor="#00B490" color="#ffffff">
				</u-tag>
			</view>
			<view class="msg-item ">
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
			<view class="pull-down" v-if="isPullDown">
				<view class="msg-item">
					<view class="name">地址</view>
					<view class="container">{{getAddress(projectInfo.shortAddress)}}</view>
				</view>
				<view class="msg-item">
					<view class="name">总包</view>
					<view class="container">{{projectInfo.unit?projectInfo.unit:'无'}}</view>
				</view>
			</view>
			<!-- 查看 -->
			<view class="gradual-one" v-show="isPullDown">
				<view class="button">
					<!-- <u-button @click="showPullDown()" color="#00B490">查看</u-button> -->
					<view @click="showPullDown()">查看更多</view>
				</view>
			</view>
			<view class="pull-down" v-if="!isPullDown">
				<view class="msg-item">
					<view class="name">地址</view>
					<view class="container">{{getAddress(projectInfo.shortAddress)}}</view>
				</view>
				<view class="msg-item">
					<view class="name">总包</view>
					<view class="container">{{projectInfo.unit?projectInfo.unit:'无'}}</view>
				</view>
				<view class="msg-item">
					<view class="name">项目经理（总包）</view>
					<view class="container">{{projectInfo.partnerProjectManager?projectInfo.partnerProjectManager:'无'}}
						{{projectInfo.partnerProjectManagerMobile}}
					</view>
				</view>
				<view class="msg-item">
					<view class="name">项目经理（甲包）</view>
					<view class="container">{{projectInfo.projectManager?projectInfo.projectManager:'无'}}
						{{projectInfo.projectManagerMobile}}
					</view>
				</view>
			</view>
		</view>

		<view class="process-container">
			<view class="title">
				<text style="margin-bottom: 14upx;">项目进度信息</text>
				<view style="margin: o auto;text-align: center;">
					<view v-show="isShow" @click="showStatus" style="display: flex;flex-wrap: nowrap;font-size: 32upx;
		font-weight: bold;">查看<u-icon
							name="arrow-down"></u-icon>
					</view>
					<view v-show="!isShow" @click="noShowStatus" style="display: flex;flex-wrap: nowrap;font-size: 32upx;
		font-weight: bold;">收起<u-icon
							name="arrow-up"></u-icon>
					</view>
				</view>
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
				<view class="status-container" v-show="!isShow">
					<view class="status-tag-container" style="margin-bottom: 60upx;">
						<view v-for="(item,index) in statusList" :key=item.code :class="{
								'no-margin-left':index==0||index==3,
								'item-margin-top':index==3||index==4||index==5,
								'active-tags':currentIndex==index}" class="tags" @click="changeTags(index)">
							<text> {{item.name}} </text>
							<view v-if="ongoing.length!=0">
								<view class="yuan" v-if="index==1">
									{{ongoing.length}}
								</view>
							</view>
							<view v-if="complete.length!=0">
								<view class="yuan" v-if="index==2">
									{{complete.length}}
								</view>
							</view>
							<view v-if="noovercomplete.length!=0">
								<view class="yuan" v-if="index==3">
									{{noovercomplete.length}}
								</view>
							</view>
							<view v-if="overundone.length!=0">
								<view class="yuan" v-if="index==4">
									{{overundone.length}}
								</view>
							</view>
							<view v-if="overcomplete.length!=0">
								<view class="yuan" v-if="index==5">
									{{overcomplete.length}}
								</view>
							</view>
						</view>
					</view>
					<!-- 竖形进度条 -->
					<view class="progress" v-if="currentIndex==0">
						<view class="plan" v-for="(item,index) in projectInfo.nodes" :key="item.id">
							<view class="plan-border" style="position: relative;">
								<view class="imgs">
									<image v-if="item.nodeState==0" src="../../static/projectdetail/hui.png" mode="">
									</image>
									<image v-if="item.nodeState==3" src="../../static/projectdetail/red.png" mode="">
									</image>
									<image v-if="item.nodeState==1" src="../../static/projectdetail/zise.png" mode="">
									</image>
									<image v-if="item.nodeState==4" src="../../static/projectdetail/yuan.png" mode="">
									</image>
									<image v-if="item.nodeState==5" src="../../static/projectdetail/green.png" mode="">
									</image>
								</view>
								<view class="plan-title" style="padding-left: 20upx;">
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
								<view class="statusList" v-if="item.nodeState==3">
									超期{{item.threeTime}}未完成
								</view>
								<view class="statusList" v-if="item.nodeState==4">
									超期{{item.fourTime}}已完成
								</view>
								<view class="statusList" v-if="item.nodeState==0">
									未开始/未涉及
								</view>
								<view class="statusList" v-if="item.nodeState==1">
									正在进行中
								</view>
								<view class="statusList" v-if="item.nodeState==2">
									已完成
								</view>
								<view class="statusList" v-if="item.nodeState==5">
									未超期已完成
								</view>

							</view>
						</view>
					</view>
					<!-- 正在进行中 -->
					<view class="progress" v-if="currentIndex==1">
						<view class="plan" style="display: flex; " v-for="item in ongoing" :key="item.id">
							<view class="plan-border" style="position: relative;">
								<view class="imgs">
									<image v-if="item.nodeState==0" src="../../static/projectdetail/hui.png" mode="">
									</image>
									<image v-if="item.nodeState==3" src="../../static/projectdetail/red.png" mode="">
									</image>
									<image v-if="item.nodeState==1" src="../../static/projectdetail/zise.png" mode="">
									</image>
									<image v-if="item.nodeState==4" src="../../static/projectdetail/yuan.png" mode="">
									</image>
									<image v-if="item.nodeState==5" src="../../static/projectdetail/green.png" mode="">
									</image>
								</view>
								<view class="plan-title" style="padding-left: 20upx;">
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
								<view v-if="item.nodeState==1">
									<view class="statusList" v-if="item.nodeState==3">
										超期{{item.threeTime}}未完成
									</view>
									<view class="statusList" v-if="item.nodeState==4">
										超期{{item.fourTime}}已完成
									</view>
									<view class="statusList" v-if="item.nodeState==0">
										未开始/未涉及
									</view>
									<view class="statusList" v-if="item.nodeState==1">
										正在进行中
									</view>
									<view class="statusList" v-if="item.nodeState==2">
										已完成
									</view>
									<view class="statusList" v-if="item.nodeState==5">
										未超期已完成
									</view>
								</view>

							</view>
						</view>
					</view>
					<view class="progress" v-if="currentIndex==2">
						<view class="plan" style="display: flex; " v-for="item in complete" :key="item.id">
							<view class="plan-border" style="position: relative;">
								<view class="imgs">
									<image v-if="item.nodeState==0" src="../../static/projectdetail/hui.png" mode="">
									</image>
									<image v-if="item.nodeState==3" src="../../static/projectdetail/red.png" mode="">
									</image>
									<image v-if="item.nodeState==1" src="../../static/projectdetail/zise.png" mode="">
									</image>
									<image v-if="item.nodeState==4" src="../../static/projectdetail/yuan.png" mode="">
									</image>
									<image v-if="item.nodeState==5" src="../../static/projectdetail/green.png" mode="">
									</image>
								</view>
								<view class="plan-title" style="padding-left: 20upx;">
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
								<!-- 未涉及/未进行 -->
								<view v-if="item.nodeState==0">
									<view class="statusList" v-if="item.nodeState==3">
										超期{{item.threeTime}}未完成
									</view>
									<view class="statusList" v-if="item.nodeState==4">
										超期{{item.fourTime}}已完成
									</view>
									<view class="statusList" v-if="item.nodeState==0">
										未开始/未涉及
									</view>
									<view class="statusList" v-if="item.nodeState==1">
										正在进行中
									</view>
									<view class="statusList" v-if="item.nodeState==2">
										已完成
									</view>
									<view class="statusList" v-if="item.nodeState==5">
										未超期已完成
									</view>
								</view>


							</view>
						</view>
					</view>
					<!-- 未超期已完成 -->
					<view class="progress" v-if="currentIndex==3">
						<view class="plan" style="display: flex; " v-for="item in noovercomplete" :key="item.id">
							<view class="plan-border" style="position: relative;">
								<view class="imgs">
									<image v-if="item.nodeState==0" src="../../static/projectdetail/hui.png" mode="">
									</image>
									<image v-if="item.nodeState==3" src="../../static/projectdetail/red.png" mode="">
									</image>
									<image v-if="item.nodeState==1" src="../../static/projectdetail/zise.png" mode="">
									</image>
									<image v-if="item.nodeState==4" src="../../static/projectdetail/yuan.png" mode="">
									</image>
									<image v-if="item.nodeState==5" src="../../static/projectdetail/green.png" mode="">
									</image>
								</view>
								<view class="plan-title" style="padding-left: 20upx;">
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
								<view class="statusList" v-if="item.nodeState==3">
									超期{{item.threeTime}}未完成
								</view>
								<view class="statusList" v-if="item.nodeState==4">
									超期{{item.fourTime}}已完成
								</view>
								<view class="statusList" v-if="item.nodeState==0">
									未开始/未涉及
								</view>
								<view class="statusList" v-if="item.nodeState==1">
									正在进行中
								</view>
								<view class="statusList" v-if="item.nodeState==2">
									已完成
								</view>
								<view class="statusList" v-if="item.nodeState==5">
									未超期已完成
								</view>
							</view>
						</view>
					</view>
					<view class="progress" v-if="currentIndex==4">
						<view class="plan" style="display: flex; " v-for="item in overundone" :key="item.id">
							<view class="plan-border" style="position: relative;">
								<view class="imgs">
									<image v-if="item.nodeState==0" src="../../static/projectdetail/hui.png" mode="">
									</image>
									<image v-if="item.nodeState==3" src="../../static/projectdetail/red.png" mode="">
									</image>
									<image v-if="item.nodeState==1" src="../../static/projectdetail/zise.png" mode="">
									</image>
									<image v-if="item.nodeState==4" src="../../static/projectdetail/yuan.png" mode="">
									</image>
									<image v-if="item.nodeState==5" src="../../static/projectdetail/green.png" mode="">
									</image>
								</view>
								<view class="plan-title" style="padding-left: 20upx;">
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
								<view class="statusList" v-if="item.nodeState==3">
									超期{{item.threeTime}}未完成
								</view>
								<view class="statusList" v-if="item.nodeState==4">
									超期{{item.fourTime}}已完成
								</view>
								<view class="statusList" v-if="item.nodeState==0">
									未开始/未涉及
								</view>
								<view class="statusList" v-if="item.nodeState==1">
									正在进行中
								</view>
								<view class="statusList" v-if="item.nodeState==2">
									已完成
								</view>
								<view class="statusList" v-if="item.nodeState==5">
									未超期已完成
								</view>
							</view>
						</view>
					</view>
					<view class="progress" v-if="currentIndex==5">
						<view class="plan" style="display: flex; " v-for="item in overcomplete" :key="item.id">
							<view class="plan-border" style="position: relative;">
								<view class="imgs">
									<image src="../../static/projectdetail/yuan.png" mode=""></image>
								</view>
								<view class="plan-title" style="padding-left: 20upx;">
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
								<view class="statusList" v-if="item.nodeState==3">
									超期{{item.threeTime}}未完成
								</view>
								<view class="statusList" v-if="item.nodeState==4">
									超期{{item.fourTime}}已完成
								</view>
								<view class="statusList" v-if="item.nodeState==0">
									未开始/未涉及
								</view>
								<view class="statusList" v-if="item.nodeState==1">
									正在进行中
								</view>
								<view class="statusList" v-if="item.nodeState==2">
									已完成
								</view>
								<view class="statusList" v-if="item.nodeState==5">
									未超期已完成
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
	import TwoNavbar from '../../components/TwoNavbar/TwoNavbar.vue'
	export default {
		components: {
			TwoNavbar
		},
		data() {
			return {
				// title:'',
				currentIndex: 0,
				isShow: true,
				isPullDown: true,
				project: {
					projectId: '',
					projectName: '',
					companyId: '',
				},
				projectInfo: {},
				projectStatus: [],
				ongoing: [], //正在进行中
				complete: [], //未涉及/未进行
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
			noshowPullDown() {
				this.isPullDown = true
			},
			showPullDown() {
				this.isPullDown = false
			},
			noShowStatus() {
				this.isShow = true
			},
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
				this.$http('/project/plan/withStatusNew', 'POST', this.project).then(res => {
					console.log(res)
					this.projectInfo = res.page[0]
					console.log(this.projectInfo)
					this.projectInfo.nodes.forEach(item => {
						// 正在进行中
						if (item.nodeState == 1) {
							this.ongoing.push(item)
						}
						// 未涉及/未进行
						if (item.nodeState == 0) {
							this.complete.push(item)
						}
						// 未超期已完成
						if (item.nodeState == 5) {
							this.noovercomplete.push(item)
						}
						// 超期未完成
						if (item.nodeState == 3) {
							this.overundone.push(item)
						}
						if (item.nodeState == 4) {
							this.overcomplete.push(item)
						}
					})
					this.projectInfo.nodes.forEach(item => {
						// 计算天数
						if (item.nodeState == 3) {
							item.threeTime = this.timeCalc(item.plannedTime, item.finishTime) + '天'
							// console.log(item)
						}
						if (item.nodeState == 4) {
							item.fourTime = this.timeCalc(item.plannedTime, item.finishTime) + '天'
							// console.log(item)
						}
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
			console.log(option)
			this.project.projectId = option.projectId
			this.project.companyId = option.companyId
			this.project.projectName = option.projectName
			this.getProject()
			getDictList('PROJECT_STATUS').then(data => {
				this.projectStatus = data.dict
			})
		},
	}
</script>

<style scoped>
	/* 查看 */
	.gradual-one {
		width: 90%;
		height: 164upx;
		display: flex;
		justify-content: center;
		align-items: center;
		background-image: linear-gradient(#ffffff40, #ffffff) !important;
		position: absolute;
		bottom: 0;
	}

	.gradual {
		/* background-image: linear-gradient(#0000001a, #ffffff); */
		text-align: center;
	}

	.button {
		width: 40%;
		height: 40upx;
		background-color: #00B490;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 6upx;
	}

	.detail {
		overflow: hidden;
	}

	.active-tags {
		background: #00B490;
		color: #FFFFFF !important;
		font-weight: bold;
	}

	.no-margin-left {
		margin-left: 0 !important;
	}

	.item-margin-top {
		margin-top: 31upx !important;
	}

	.imgs {
		width: 38upx;
		height: 38upx;
		background-color: #FFFFFF;
		position: absolute;
		left: -20upx;
		overflow: hidden;
	}

	.imgs image {
		width: 38upx;
		height: 38upx;
	}

	.status-tag-container .tags {
		position: relative;
		border: 2upx solid #00B490;
		font-size: 28upx;
		font-weight: 500;
		color: #333333;
		border-radius: 6upx;
		margin-left: 35upx;
		width: 190upx;
		height: 56upx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.tags .yuan {
		position: absolute;
		width: 32upx;
		height: 32upx;
		line-height: 32upx;
		top: -16upx;
		right: -16upx;
		font-size: 24upx;
		font-family: PingFang SC;
		color: #FFFFFF;
		text-align: center;
		background: #E65749;
		border-radius: 50%;
	}

	.status-tag-container {
		display: flex;
		flex-wrap: wrap;
	}

	.project-status {
		margin-top: 60upx;
	}

	/* 修改下箭头样式 */
	>>>.project-status .u-icon__icon[data-v-6e20bb40] {
		font-size: 40upx !important;
		font-weight: bold !important;
		color: #333333 !important;
		margin: 0 auto;
	}

	.node-info {
		margin-left: 119upx;
	}

	.node-info1 {
		margin-left: 70upx;
	}

	.project-node {
		display: flex;
		font-size: 28upx;
		align-items: center;
		margin-top: 20upx;
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
		margin-top: 27upx;
		font-size: 27upx;
		font-weight: bold;
	}

	.title text {
		font-size: 32upx;
		font-weight: bold;
	}

	.title {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.statusList {
		height: 24upx;
		/* margin: 24upx 0 41upx 32upx; */
		padding: 23upx 0 41upx 31upx;
		font-size: 24upx;
		line-height: 24upx;
		font-weight: bold;
		color: #666666;
	}

	.progress .plan {
		display: flex;
		border-left: 1upx dashed #7E7E7E;
	}

	.progress .plan:last-child {
		border: none;
	}

	.title .unitag {
		width: 80px;
		height: 38px;
		background: #00B490;
		border-radius: 6px;
	}

	.plan-title {
		width: 685upx;
		margin-left: 20upx;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}

	.title-time {
		width: 300upx;
		height: 24upx;
		font-size: 24upx;
		font-weight: bold;
		margin-right: 72upx;
		color: #666666;
	}

	.plan-left {
		width: 224upx;
		height: 28upx;
		font-size: 28upx;
		font-weight: bold;
		color: #333333;
	}

	.detail-container,
	.process-container {
		margin: 20upx;
		padding: 20upx;
		border-radius: 10upx;
		box-shadow: 0upx 0upx 50upx 0upx rgba(0, 0, 0, 0.06);
		background-color: #FFFFFF;
		position: relative;
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
