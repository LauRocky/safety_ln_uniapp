<template>
	<view class="mypicker">
		<u-popup :show="show" @close="handIcon" :closeable="true" :round="10" mode="bottom">
			<view class="titles">
				请选择签阅公司
			</view>
			<view class="main">
				<view class="main-top">
					<view class="main-title">
						<view class="main-1">
							<view class="main-2">
								<view :class="[one ? 'yuan' : 'yuan1']"></view>
								<text v-if="one">{{ one }}</text>
								<text v-else>请选择城市</text>
							</view>
							<u-icon v-if="one" name="arrow-right" color="#5F5F5F" @click="navgetcity"></u-icon>
						</view>
						<view class="main-1" v-if="one" @click="handtwo">
							<view class="main-2">
								<view :class="[two ? 'yuan2' : 'yuan1']"></view>
								<text v-if="two">{{ two }}</text>
								<text v-else>请选择城市公司</text>

							</view>
						</view>
					</view>
				</view>
				<!-- 		<u-checkbox-group v-model="checkboxValue1" placement="column" @change="checkboxChangesss">
					<u-checkbox  v-for="(item, index) in checkboxList1" :key="index"
						:label="item.name" :name="item.name" :checked='item.disabled'>
					</u-checkbox>
				</u-checkbox-group> -->
				<image class="heng" src="../../static/danger/heng.png" mode=""></image>
				<view class="main-cet">
					<view class="p-titles" style="display: flex;">{{ titles }}
						<!-- 	<u-radio-group v-if="one" style="margin-left: 20px;" v-model="radiovalue1" placement="row"
							@change="groupChange">
							<u-radio :customStyle="{marginBottom: '8px'}" activeColor="#11B38C" shape="square"
								v-for="(item, index) in radiolist1" :key="index" :label="item.name" :name="item.name"
								@change="radioChange">
							</u-radio>
						</u-radio-group> -->
					</view>
					<scroll-view class="scroll-a" scroll-y>
						<u-checkbox-group v-if="one" v-model="checked" iconPlacement="right" @change="checkboxChange"
							placement="row">
							<u-checkbox activeColor="#11B38C" :checked='val1.disabled' v-for="(val1, i1) in cityArr"
								:key="val1.id" :value="val1" :label="val1.name" :name="val1.id" :id="val1.id">
							</u-checkbox>
						</u-checkbox-group>
						<!-- 	<u-checkbox-group v-if="!one" v-model="checked" iconPlacement="right" @change="checkboxChange"
							placement="row">
							<u-checkbox activeColor="#11B38C" :checked='val1.disabled' v-for="(val1, i1) in cityArr"
								:key="val1.id" :value="val1" :label="val1.name" :name="val1.id" :id="val1.id">
							</u-checkbox>
						</u-checkbox-group> -->
						<view class="">
							<view class="text-a" v-if="!one" :class="[cooindex == i1 ? 'active' : '']"
								v-for="(val1, i1) in list" :key="i1">
								<view class="" @click="handcitylist(val1,i1)">
									{{ val1.name }}
								</view>
								<view class="" style="margin-left: 30upx;" @click="naaaaa">
									<u-checkbox-group @change="ncheckboxChange">
										<u-checkbox activeColor="#11B38C" :value="val1.name" :name="val1.name"
											v-model="nchecked" shape="circle"></u-checkbox>
									</u-checkbox-group>
								</view>
							</view>

						</view>


					</scroll-view>
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
				checkboxValue1: [{
					name: '香蕉',
					disabled: true,
				}, ],
				// 基本案列数据
				checkboxList1: [{
						name: '苹果',
						disabled: true
					},
					{
						name: '香蕉',
						disabled: true,
					},
					{
						name: '橙子',
						disabled: true
					}
				],
				radiolist1: [{
						name: '全选',
						disabled: false
					},
					{
						name: '全不选',
						disabled: false
					},
				],
				// u-radio-group的v-model绑定的值如果设置为某个radio的name，就会被默认选中
				radiovalue1: '全不选',
				nchecked: [],
				// 这些数据是我新做的时候使用的
				listArr: [], // 总的保存选择的数据，虽然一样，但是有用不要删除
				list: [], // 三大城市
				citylist: [], // 总的城市数据
				cityArr: [], // 二级数据
				one: '', //记录选择的name
				onerlist: [], // 记录选择了哪个种类的城市
				preservation: [], // 保存点击的二级数据
				zongprevlist: [], // 总的保存选择的数据
				zongcitynamelist: [], // 总的选择的数据name
				cityNum: 0, // 用来记录选择的次数，没用，但是不要删除
				listArrto: [], // 总的保存选择的数据，虽然一样，但是有用不要删除
				titles: '选择所在城市公司',
				quanxuan: 0,
				quanxuannum: 0,
				onearrList: [],
				onearrListwo: [],
				// 以下数据不知道有没有用但是不要删，不然怕是会出现不知名bug
				checked: [],
				oneindex: 0, //记录选择的index
				two: '',
				twoindex: 0,
				three: '',
				threeindex: 0,
				cooindex: null,
				allList: {}, //所有数据
				companyId: '',
				projectId: '',
				selected: [],
				cityname: [],
				citynameto: [],
				cityIdlist: [],
				cityIdlisto: [],

			};
		},
		onLoad() {},
		//组件生命周期
		created() {
			this.handSelectData()
		},
		mounted() {},
		methods: {
			naaaaa() {
				console.log('sss')
			},
			ncheckboxChange(e) {
				console.log(e)
				this.nchecked = e
			},
			checkboxChangesss(e) {
				console.log(e)
			},
			groupChange(n) {
				if (n == '全选') {
					console.log(this.listArrto)
					console.log(this.cityArr)
					console.log(this.one)
					this.quanxuan = 1
					this.handcitylist(this.one, this.quanxuannum)
					this.cityNum = 1
					this.onearrList.push(this.one)
				} else {
					this.onearrListwo.push(this.one)
					this.cityNum = 2
					this.quanxuan = 1
					this.handcitylist(this.one, this.quanxuannum)
				}
			},
			radioChange(n) {
				console.log('radioChange', n);
			},
			init(array) {
				// 编辑或者新增选择再次进行选的时候传过来的数据
				if (array) {
					this.selected = array.split(',');
					// 通过传过来的默认id与获取的所有城市id相比较使默认id变为选中状态
					for (let index = 0; index < this.selected.length; index++) {
						for (let i = 0; i < this.citylist.length; i++) {
							for (let it = 0; it < this.citylist[i].length; it++) {
								if (this.selected[index] === this.citylist[i][it].id) {
									this.citylist[i][it].disabled = true
								}
							}
						}
					}
				}
			},
			// 点击获取一级城市
			navgetcity() {
				this.one = ''
			},
			// 点击二级数据
			checkboxChange(e) {
				console.log(e)
				console.log(this.cityArr)
				// onerlist：把所选择的一级城市进行报讯
				if (this.onerlist.length === 0) {
					this.onerlist.push(this.one)
				} else {
					this.onerlist.forEach(item => {
						if (this.one === item) {
							console.log(item)
						} else {
							this.onerlist.push(this.one)
						}
					});
				}

				for (const key in this.listArr) {
					if (this.one === key) {
						this.listArr[key] = e
					}
				}

				this.preservation = e

			},
			// 点击一级数据获取二级数据
			handcitylist(item, index) {
				console.log(item, index)
				this.quanxuannum = index
				this.one = item.name
				for (let i = 0; i < this.citylist.length; i++) {
					if (index === i) {
						this.cityArr = this.citylist[i]
					}
				}
				if (this.quanxuan === 1) {
					this.cityArr.forEach(item => {
						item.disabled = true
					});
				}
				if (this.quanxuan === 2) {
					this.cityArr.forEach(item => {
						item.disabled = false
					});
				}
			},
			// 关闭选择公司
			handIcon() {

				let arrlist = []
				let arrnamelist = []
				let arr = []
				let arr2 = []
				let narrlist = []
				if (this.nchecked.length > 0) {
					for (let i = 0; i < this.nchecked.length; i++) {
						for (const key in this.listArr) {
							if (this.nchecked[i] === key) {
								console.log(key)
								for (let it = 0; it < this.listArr[key].length; it++) {
									console.log(this.listArr[key][i].id)
									arr.push(this.listArr[key][it].id)
								}
							}
						}
					}
				}
				// 获取选择的城市id
				for (const key in this.listArr) {
					for (let i = 0; i < this.onerlist.length; i++) {
						if (this.onerlist[i] === key) {
							this.listArr[key].forEach(item => {
								arr.push(item)
							});
						}
					}
				}
				// 获取所有的城市
				for (let i = 0; i < this.citylist.length; i++) {
					for (let it = 0; it < this.citylist[i].length; it++) {
						arr2.push(this.citylist[i][it])
					}
				}
				// 通过选择的城市id与所有的城市id相比较获取选择城市的name
				for (let it = 0; it < arr.length; it++) {
					for (let i = 0; i < arr2.length; i++) {
						console.log(arr[it])
						if (arr2[i].id == arr[it]) {
							arrnamelist.push(arr2[i].name)
						}
					}
				}

				// 对获取的城市id与城市name去重得到准确的选择的城市
				arr = [...new Set(arr)];
				arrnamelist = [...new Set(arrnamelist)];
				this.$emit('handEnd', arr.join(","));
				this.$emit('handCityName', arrnamelist.join(","));
				this.$emit('companyId', JSON.parse(uni.getStorageSync('userInfo')).companyId);
				this.$emit('close');
			},
			// 获取数据
			handSelectData() {
				this.$http(
						'/lvxin/getFileNotifyCompanySelectDataNew',
						'GET', {
							companyId: JSON.parse(uni.getStorageSync('userInfo')).companyId
						},
						false
					)
					.then(res => {
						if (res.code == 0) {
							this.list = res.data.first
							this.listArr = res.data.second
							this.listArrto = res.data.second
							for (const key in res.data.second) {
								res.data.second[key].forEach(item => {
									this.$set(item, 'disabled', false)
								});
								this.citylist.push(res.data.second[key])
							}
						}
						console.log(this.citylist)
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
		/deep/.u-checkbox-group--row {
			display: block;
			padding-bottom: 30upx;

			.u-checkbox-label--right {
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
						display: flex;
					}

					.active {
						color: #00b490;
					}
				}
			}
		}
	}
</style>
