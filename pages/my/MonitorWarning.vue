<template>
	<view class="MonitorWarning">
		<TwoNavbar :name="name" @leftClick="leftClick" />
		<view v-if="list.length !== 0">
			<view class="card" v-for="(item,index) in list" :key="index" @click="eachItem(item)"
				:class="{'card_news11':item.alarmStatus==1}">
				<view class="card-yuan" v-if="item.alarmStatus==0">
				</view>
				<view class="card_news">
					<view :class="item.flag ? 'card_content1':'card_content2'">{{item.companyInfo.name + item.cameraInfo.ipcName + '摄像头于' + item.createTime+'离线'}}</view>
					<text class="times">{{item.createTime}}</text>
				</view>
			</view>
		</view>
		<view v-else>
			<image class="kong" src="../../static/danger/kong.png" mode=""></image>
		</view>
		<u-popup :show="show" :closeable="true" mode="center" @close="close" @open="open">
			<view class="main">
				<view class="titles">
					<text>设备离线通知</text>
				</view>
				<view class="text-a">
					<text>{{content}}</text>
				</view>
			</view>
		</u-popup>
	</view>
</template>
<script>
	import TwoNavbar from '../../components/TwoNavbar/TwoNavbar.vue';
	export default {
		components: {
			TwoNavbar
		},
		data() {
			return {
				name: "设备离线通知",
				id: '',
				show: false,
				list: [],
				limit: 15,
				page: 1,
				content: "",
			};
		},
		onShow() {
			this.page=1;
			this.list=[];
			this.monitoring()
		},
		// 页面上拉处理事件函数
		onReachBottom() {
			this.monitoring()
		},
		methods: {
			monitoring() {
				uni.showLoading({
					title: '加载中',
				});
				this.$http('/notification/cameraAlarmPage', 'GET', {
					page:this.page,
					limit:this.limit,
				}, false).then(res => {
					uni.hideLoading();
						if (res.code == 0) {
							if (this.list.length < res.page.totalCount) {
								this.page++;
								this.list = this.list.concat(res.page.list);
							}
						}
					})
					.catch(err => {
						console.log(err)
					})
			},
			open() {
				// console.log('open');
			},
			close() {
				this.show = false
			},
			leftClick() {
				console.log('leftClick');
				uni.navigateBack({
					delta: 1
				});
			},
			eachItem(el) {
			console.log("55", el)
			this.content =  el.companyInfo.name + el.cameraInfo.ipcName + '摄像头于' + el.createTime+'离线'
			this.show = true;
			},
		},
		onLoad() {
		
		}
	}
</script>

<style lang="scss" scoped>
	.MonitorWarning {
		padding: 0 20upx;

		.card {
			// height: 9vh;
			overflow: hidden;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			// align-items: center;
			border-bottom: 1upx solid #ccc;
		
			.card-yuan {
				margin-top: 40upx;
				margin-left: 10upx;
				width: 18upx;
				height: 18upx;
				border-radius: 50%;
				background-color: #FF0006;
			}
		
			.card_news {
				width: 95%;
				margin: 20upx auto;
				display: flex;
				flex-direction: column;
		
				.times {
					text-align: right;
					font-size: 24upx;
				}
		
				.card_title {
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					align-items: flex-end;
					padding: 0 0 10upx 0;
		
					text:first-child {
						font-size: 32upx;
						font-weight: bold;
					}
		
					text:last-child {
						font-size: 20upx;
					}
				}
		
				// 点击详情 展开
				.card_content1 {
					padding: 10upx 0 15upx 0;
					text-indent: 0em;
					font-size: 28upx;
				}
		
				.card_content2 {
					padding: 10upx 0 15upx 0;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
					text-indent: 0em;
					font-size: 28upx;
				}
		
				.card_lookmore {
					width: 100upx;
					height: 14upx;
					padding: 10upx 0;
					font-size: 20upx;
					line-height: 20upx;
					border-bottom: 1upx solid rgb(0, 98, 0);
					color: rgb(0, 98, 0);
				}
			}
		
			.card_news11 {
				width: 100%;
			}
		}
		
		.kong {
			position: fixed;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}
		
		.main {
			width: 80vw;
			padding: 40upx 30upx;
		
			.titles {
				text-align: center;
				font-size: 32upx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #333333;
			}
		
			.text-a {
				font-size: 30upx;
				color: #333333;
				font-family: PingFang SC;
				padding-top: 30upx;
			}
		}
	}
</style>
