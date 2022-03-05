<template>
	<view class="mypicker">
		<u-popup :show="show" @close="handIcon" :closeable="true" :round="10" mode="bottom">
			<view class="titles">
				请选择签阅公司
				<!-- <u-icon class="icon" @click="handIcon" name="close" color="#b5b5b5 " size="28"></u-icon> -->
			</view>
			<view class="main">
				<view class="main-top">
					<view class="main-title">
						<view class="main-1" @click="handOne">
							<view class="main-2">
								<view :class="[one ? 'yuan' : 'yuan1']"></view>
								<text v-if="one">{{ one }}</text>
								<text v-else>请选择城市</text>
							</view>
							<u-icon v-if="one" name="arrow-right" color="#5F5F5F"></u-icon>
						</view>
						<view class="main-1" v-if="one" @click="handtwo">
							<view class="main-2">
								<view :class="[two ? 'yuan2' : 'yuan1']"></view>
								<text v-if="two">{{ two }}</text>
								<text v-else>请选择城市公司</text>
							</view>

							<!-- <u-icon v-if="two" name="arrow-right" color="#5F5F5F"></u-icon> -->
						</view>
						<!-- <view class="main-1" v-if="one && two" @click="handthree">
							<view class="main-2">
								<view :class="[three ? 'yuan2' : 'yuan1']"></view>
								<text v-if="three">{{ three }}</text>
								<text v-else>请选择项目</text>
							</view>
							<u-icon v-if="three" name="arrow-right" color="#5F5F5F"></u-icon>
						</view> -->
					</view>
				</view>
				<image class="heng" src="../../static/danger/heng.png" mode=""></image>
				<view class="main-cet">
					<view class="p-titles">{{ titles }}</view>
					<scroll-view class="scroll-a" scroll-y>
						<u-checkbox-group 
						v-if="one"
						    v-model="checked"
						    iconPlacement="right" 
							@change="checkboxChange"
						    placement="row">
							<u-checkbox activeColor="red" :checked="hasChecked(val1.id)" v-for="(val1, i1) in list" :key="val1.id" :value="val1" :label="val1.name" :name="val1.id" :id="val1.id"></u-checkbox>
						</u-checkbox-group>
						<view class="text-a" v-if="!one" :class="[cooindex == i1 ? 'active' : '']" @click="handcoo(i1, val1)"
							v-for="(val1, i1) in list" :key="i1">{{ val1.name }}</view>
							
					</scroll-view>
					
<!-- 					<scroll-view class="scroll-a" scroll-y>
						<u-checkbox-group v-model="checkboxValue1" placement="column" @change="checkboxChange">
							<u-checkbox :customStyle="{marginBottom: '8px'}" v-for="(val1, i1) in list" :key="i1" :label="val1.name" :name="val1.name">
							</u-checkbox>
						</u-checkbox-group>
					</scroll-view> -->
				</view>
			</view>
		</u-popup>
	</view>
</template>
<script>
	export default {
		name: 'projectPicker',
		props: ['show', 'objDataP'],
		components: {},
		data() {
			return {
				checked:[],
				one: '', //记录选择的name
				oneindex: 0, //记录选择的index
				two: '',
				twoindex: 0,
				three: '',
				threeindex: 0,
				titles: '选择所在城市公司',
				list: [],
				cooindex: null,
				allList: {}, //所有数据
				companyId: '',
				projectId: '',
				selected:[],
			};
		},
		onLoad() {},
		//组件生命周期
		created() {
			this.handSelectData();
			let obj = uni.getStorageSync('projectPicker');
			if (obj && obj.companyId) {
				//缓存获取上次数据
				this.one = obj.one;
				this.two = obj.two;
				this.oneindex = obj.oneindex;
				this.twoindex = obj.twoindex;
				this.three = obj.three;
				this.companyId = obj.companyId,
					this.projectId = obj.projectId
				this.cooindex = this.threeindex = obj.threeindex;
				this.handByCompanyName();
				console.error(obj);
				// this.$emit('handEnd', obj);
			}
		},
		mounted() {},
		methods: {
			hasChecked(row){
				console.error(row);
				return this.selected.indexOf(row)>-1;
			},
			init(array){
				if(array){
		
					this.selected=array;
				}
			
			},
			checkboxChange(e){
				console.error("end",e);
				let result=this.list.filter(item=>{
					return  e.indexOf(    item.id)>-1; 
				});
				console.error(result);
				
				
				this.$emit('handEnd',result);
				this.$emit('companyId', JSON.parse(uni.getStorageSync('userInfo')).companyId);
			},
			handcache() { //缓存数据
				let obj = {
					one: this.one,
					two: this.two,
					three: this.three,
					name: this.three,
					oneindex: this.oneindex,
					twoindex: this.twoindex,
					threeindex: this.threeindex,
					companyId: this.companyId,
					projectId: this.projectId
				};

				uni.setStorageSync('projectPicker', obj);
			},
			handthree() {
				//点击公司
				this.cooindex = this.threeindex;
				// this.handByCompanyName();
			},
			handtwo() {
				//点击项目
				this.cooindex = this.twoindex;
				this.list = []
				this.list = this.allList.second2[this.one];
			},
			handOne() {
				//选择城市
				this.cooindex = this.oneindex;
				this.list = this.allList.first1;
			},
			handcoo(val, v) {
				//点击下面的选项;
				
				if (v.i == 0) {
					if (this.one !== v.name) {
						this.two = this.three = '';
					}
					this.one = v.name;
					this.oneindex = val; //取消选中下个下标选中的问题
					this.list = this.allList.second2[v.name];
				} else if (v.i == 1) {
					this.two = v.name;
					this.companyId = v.companyId; //缓存数据
					this.projectId = v.projectId;
					this.cooindex = this.threeindex = val;
					console.error(v);
					console.error(val);
					this.$emit('handEnd', v);
				
					// this.$emit('companyId', JSON.parse(uni.getStorageSync('userInfo')).companyId);
					// this.twoindex = val;
					// this.handByCompanyName();
				} else if (v.i == 2) {
					this.three = v.name;
					console.error(this.three);
				}
			},
			handtolower() {},
			handIcon() {
				this.$emit('close');
			},
			handByCompanyName() {
				//项目数据
				this.$http('/lvxin/getCompanyProjectByCompanyName', 'POST', {
						companyName: this.two
					}, false)
					.then(res => {
						if (res.code == 0) {
							console.log(res.code)
							res.data.forEach(val => {
								val.name = val.projectName;
								val.i = 2;
							});
							this.list = res.data;
						}
					})
					.catch(err => {
						console.log(err);
					});
			},
			handSelectData() {
				//shujui  两级
				this.$http(
						'/lvxin/getCompanySelectDataNew',
						'GET', {
							companyId: JSON.parse(uni.getStorageSync('userInfo')).companyId
						},
						false
					)
					.then(res => {
						if (res.code == 0) {
							console.log("data",res)
							
							res.data.first1 = [];
							res.data.second2 = [];
							res.data.first.forEach(val => {
								let obj = {};
								obj.name = val;
				
								obj.i = 0;
								res.data.first1.push(obj);
							});
							for (let i in res.data.second) {
								res.data.second2[i] = [];
								res.data.second[i].forEach(val => {
									let obj = {};
									obj.name = val.name;
									obj.id=val.id;
									obj.i = 1;
									res.data.second2[i].push(obj);
								});
							}
							this.list = res.data.first1;
							this.allList = res.data;
						}
					})
					.catch(err => {
						console.log(err);
					});
			}
		}
	};
</script>
<style lang="less" scoped>
	.mypicker {
		/deep/.u-checkbox-group--row{
			display: block;
			padding-bottom: 30upx;
			.u-checkbox-label--right{
				margin-bottom: 30upx;
				
				// .uni-text{
				// 	color: #333333;
				// 	span{
				// 	color: #333333;	
				// 	}
				// }
			}
		}
		.titles {
			position: relative;
			padding: 40upx 0;
			text-align: center;
			font-size: 32upx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #333333;

			.icon {
				position: absolute;
				top: 30upx;
				right: 20upx;
			}
		}

		.main {
			.main-top {
				padding: 60upx 22upx 0 70upx;

				.main-1 {
					height: 100upx;
					display: flex;
					align-items: center;
					justify-content: space-between;

					.main-2 {
						display: flex;
						align-items: center;
						font-size: 28upx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #333333;

						.yuan {
							position: relative;
							margin-right: 58upx;
							width: 18upx;
							height: 18upx;
							background: #00b490;
							border-radius: 50%;

							&::after {
								display: block;
								content: '';
								width: 4upx;
								height: 85upx;
								background: #00b490;
								position: absolute;
								bottom: -85upx;
								left: 7upx;
							}
						}

						.yuan2 {
							position: relative;
							margin-right: 58upx;
							width: 18upx;
							height: 18upx;
							background: #00b490;
							border-radius: 50%;
						}

						.yuan1 {
							margin-right: 58upx;
							width: 17upx;
							height: 17upx;
							border: 2upx solid #00b490;
							border-radius: 50%;
						}
					}
				}
			}

			.heng {
				height: 6upx;
				width: 100%;
			}

			.main-cet {
				padding: 60upx 22upx 0 70upx;

				.p-titles {
					padding-bottom: 60upx;
					font-size: 32upx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #333333;
				}

				.scroll-a {
					height: 40vh;

					.text-a {
						padding: 20upx 0;
						font-size: 28upx;
						font-family: PingFang SC;
						font-weight: bold;
					}

					.active {
						color: #00b490;
					}
				}
			}
		}
	}
</style>
