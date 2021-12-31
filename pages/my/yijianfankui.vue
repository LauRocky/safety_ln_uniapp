<template>
	<view class="yijian">
		<TwoNavbar :name="name" @leftClick="leftClick" />
		<u--textarea v-model="value1" placeholder="您的意见是我进步的动力!" height="500upx" class="textarea" border="surround"></u--textarea>
		<u-button type="success" text="提交" @click="SubmitOpinions" color="#11B38C" class="button"></u-button>
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
				value1: '',
				type: "",
				name: "意见反馈"
			};
		},
		onLoad() {
			let type = uni.getSystemInfoSync().platform
			switch (type) {
				case 'android':
					this.type = 1
					break;
				case 'ios':
					this.type = 2
					break;
				default:
					this.type = 0
					break;
			}
		},
		methods: {
			leftClick() {
				console.log('leftClick');
				uni.navigateBack({
					delta: 1
				});
			},
			SubmitOpinions() {
				this.$http('/problem/feedback/save', 'POST', {
					'content': this.value1,
					'client': this.type
				}, ).then(res => {
					this.value1 = '';
					uni.showToast({
						title: '提交成功',
						duration: 1000
					});

					// uni.switchTab({
					// 	url: '/pages/my/index'
					// });
					console.log(res)

				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.yijian {
		/* 	width: 275px;
	    height: 34px; */
		font-size: 36upx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #FFFFFF;
		// display: flex;
		// justify-content: center;
		// align-items: center;

		.textarea {
			// width: 90%;
			margin: 23upx;
			// background-color: #DADBDE;
			border: 1upx solid #DCDFE6;
			// box-shadow: -1upx  -1upx  1upx  1upx  #C6C7CB  inset
			box-shadow:    0px -1px 0px 0px #C6C7CB,   
			
			                -1px 0px 0px 0px #C6C7CB,   
			
			                1px 0px 0px 0px #C6C7CB,   
			
			                0px 1px 0px 0px #C6C7CB;    
		}

		.button {
			margin-top: 30upx;
			width: 80%;
			font-size: 36upx;
			border-radius: 40upx;
		}
	}
</style>
