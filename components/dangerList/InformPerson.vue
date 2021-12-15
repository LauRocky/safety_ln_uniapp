<template>
	<view class="InformPerson">
		<u-popup :show="showP" @close="handIcon" :round="10" mode="bottom">
			<view class="titles">
				<u-icon class="icon" @click="handIcon" name="arrow-left" color="#b5b5b5 " size="28"></u-icon>
				<text>请选择知会人</text>
				<text class="text-que" @click="handcoo">确定</text>
			</view>
			</scroll-view>
			<view class="main">
				<u-search placeholder="请输入" @clear="handclear" @search="handsearch" :show-action="false" :clearabled="true" v-model="listBy.searchKey"></u-search>
				<scroll-view class="scroll-a" @scrolltolower="handtolower" scroll-y v-if="dictLsit">
					  <u-checkbox-group
								class="group"
					            v-model="checkboxValue1"
					            placement="column"
								iconPlacement="right" 
					            @change="checkboxChange"
					        >
					            <u-checkbox
								  :disabled="disabled"
								labelSize="17"
								activeColor="#00b490"
								:customStyle="{marginBottom: '40upx'}"
					                v-for="(item, index) in dictLsit"
					                :key="index"
					                :label="item.fullname +'   :'+ item.mobile"
					                :name="item.userId"
					            >
					            </u-checkbox>
					        </u-checkbox-group>
				</scroll-view>
			</view>
		</u-popup>
	</view>
</template>
<script>
export default {
	name: 'InformPerson',
	props: ['showP'],
	components: {},
	data() {
		return {
			checkboxValue1:[],
			dictLsit:[],
			disabled:false,
			cooindex:null,
			listBy:{
				page:1,
				searchKey:'',
				limit:20,
				companyId: JSON.parse(uni.getStorageSync('userInfo')).companyId
			}
		};
	},
	onLoad() {
		
	},
	//组件生命周期
	created() {
		this.handlistByProjectId()
	},
	mounted() {},
	methods: {
		handclear(){
			this.dictLsit = []
			this.listBy.page = 1
			this.listBy.searchKey = '',
			this.handlistByProjectId();
		},
		handsearch(){
			this.dictLsit = []
			this.listBy.page = 1
			this.handlistByProjectId();
		},
		handtolower() {
			this.handlistByProjectId();
		},
		  checkboxChange(n) {
		           if(n.length == 5){
					    uni.showToast({
					        title:"最多选择五个" 
					})
				   }else{
					   this.checkboxValue1 = n
					   
				   }
		        },
		handcoo(){
			let obj = {}
			obj.titlelist = ''
			obj.value = ''
			this.dictLsit.forEach(val => {
				this.checkboxValue1.forEach(v2 => {
					if(val.userId == v2){
						obj.titlelist += val.fullname+','
						obj.value += v2+','
					}
				})
			})
			obj.titlelist=obj.titlelist.slice(0,obj.titlelist.length-1)
			obj.value=obj.value.slice(0,obj.value.length-1)
			this.$emit('handEndP',obj)
		},
		handIcon(){
			this.$emit('closeP');
		},
		handlistByProjectId() {
			if(this.listBy.page >= 2){
				uni.showLoading({ title: '加载中', mask: true });
			}
			//renyuan人员列表
			this.$http('/users/pageByProjectId', 'POST', this.listBy, false)
				.then(res => {
					if (res.code == 0) {
						uni.hideLoading();
						if (this.dictLsit.length < res.data.totalCount) {
							this.listBy.page++;
							this.dictLsit = this.dictLsit.concat(res.data.list);
						} else {
							console.log('444444');
						}
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
.InformPerson {
	.titles {
		padding: 40upx 30upx;
		text-align: center;
		font-size: 32upx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #333333;
		display: flex;
		align-items: center;
		justify-content: space-between;
		
	}
	.main{
		padding: 20upx 29upx 0 64upx;
		.title2{
			font-size: 32upx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #333333;
		}
		.scroll-a {
			padding-top: 30upx;
			height: 70vh;
			/deep/.u-checkbox-group{
				font-weight: bold;
				color: #333333;
				font-family: PingFang SC;
				span{
					font-size: 28upx;
				}
			}
			.active {
				color: #00b490;
			}
		}
	}
	
}
</style>
