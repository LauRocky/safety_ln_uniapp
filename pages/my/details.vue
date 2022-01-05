<template>
	<view class="details">
		<TwoNavbar :name="titles" @leftClick="leftClick" />
		<view class="main">
			<view class="titles">
				<image src="../../static/my/detailimg.png" mode=""></image>
				<view class="titlesName">
					{{createUser.fullname}}
				</view>
				<view class="titlesName companyname">
					{{company.name}}
				</view>
				<view class="status" v-if="obj.status==0">
					未解决
				</view>
				<view class="status completed" v-if="obj.status==1">
					已解决
				</view>
				<view class="title-time">
					{{obj.createTime}}
				</view>
			</view>
			<view class="content">
				{{obj.content}}
			</view>
			<view class="content-img">
				<image :src="val.url" mode="widthFix" v-for="(val, i) in obj.picList" :key="i"></image>
			</view>
		</view>
		<uni-fab :pattern="pattern" :content="content" horizontal="right" vertical="bottom" direction="vertical"
			:popMenu="true" @trigger="trigger" @fabClick="fabClick" />
	</view>
</template>
<script>
	import TwoNavbar from '../../components/TwoNavbar/TwoNavbar.vue';
	// import {
	// 	request
	// } from '../../utils/request.js'
	export default {
		data() {
			return {
				pattern: {
					color: 'gray',
					backgroundColor: '#FFFFFF',
					selectedColor: '#007AFF',
					buttonColor: 'orange'
				},
				content: [{
						iconPath: '../../static/my/edit.png',
						text: '',
						active: false
					},
					{
						iconPath: '../../static/my/del.png',
						text: '',
						active: false
					}
				],
				titles: '反馈详情',
				id: '',
				obj: {},
				createUser: {},
				company: {},
				picList: []
			};
		},
		methods: {
			trigger(e) {
				//点击悬浮
				console.log(e)
				if (e.index == 0) {
					//编辑
					uni.navigateTo({
						url: `/pages/my/feedbackAdd?id=${this.id}`
					});
				} else {
					//删除
					this.del();
				}
			},
			del() {
				let that=this;
				uni.showModal({
					title: '提示',
					content: '是否确认删除意见反馈',
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
							that.$http(`/problem/feedback/delete/${that.id}`, "POST", {}, false).then(res => {
								console.log(res)
								if(res.code==0){
									uni.navigateBack({
										delta:1
									})
								}
							}).catch(err=>{
								console.log(err)
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				})
			},
			fabClick() {
				/* uni.showToast({
							title: '点击了悬浮按钮',
							icon: 'none'
				}); */
			},
			leftClick() {
				console.log('leftClick');
				uni.navigateBack({
					delta: 1
				});
			},
			opinionDetail() {
				this.$http(`/problem/feedback/get/${this.id}`, 'GET', {}, false)
					.then(res => {
						if (res.code == 0) {
							this.obj = res.data
							this.createUser = res.data.createUser
							this.company = res.data.company
							this.picList = this.obj.picList
						}
						console.log(this.createUser)
						console.log(this.obj)
					})
					.catch(err => {
						console.log(err)
					})
			},
		},
		onShow() {
			this.opinionDetail()
		},
		onLoad(options) {
			console.log(options)
			this.id = options.id
			// this.opinionDetail()
		}
	}
</script>

<style lang="scss" scoped>
	.details {
		.main {
			padding: 20upx;

			.titles {
				position: relative;
				display: flex;

				image {
					width: 110upx;
					height: 110upx;
				}

				.titlesName {
					font-size: 32upx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #333333;
					padding: 10upx 10upx 10upx 20upx;
				}

				.companyname {
					padding-left: 0;
				}

				.status {
					position: absolute;
					right: 20upx;
					top: 20upx;
					font-size: 28upx;
					font-family: PingFang SC;
					color: #FFFFFF;
					background: #FF0000;
					width: 110upx;
					height: 46upx;
					text-align: center;
					line-height: 46upx;
					border-radius: 6px;
				}

				.completed {
					background: #00b490;
				}

				.title-time {
					position: absolute;
					bottom: 10upx;
					left: 130upx;
					font-size: 28upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #666666;
				}
			}

			.content {
				margin-top: 32upx;
				text-indent: 50upx; //首行间距
				letter-spacing: 2upx; //字体间距
				line-height: 50upx;
			}

			.content-img {
				margin: 20upx 0;
				text-align: center;
			}
		}
	}
</style>
