<template>
	<view class="personal">
		 <TwoNavbar :name="twoname" :rightText="rightText" @rightcilck="save" />
		 <view class="buddha">
		  <image class="imgs" src="../../static/my/logo222.png" mode=""></image>
		 </view>
	</view>
</template>
<script>
	import TwoNavbar from'../../components/TwoNavbar/TwoNavbar.vue'
 export default {
	 components:{
		 TwoNavbar
	 },
	   data() {
	        return {
			twoname:'编辑个人资料',
			rightText:"保存",
	        };
  	  },
	  methods:{
		  save(){
			  console.log(111)
		  }
	  }
	}
</script>

<style lang="scss" scoped>
	
.personal{
	.buddha{
		margin: 110upx auto 0;
		width: 184upx;
		height: 184upx;
		background: #FFFFFF;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		.imgs{
			width: 90upx;
			height: 88upx;
			// line-height: 88upx;
		}
	}
}
</style>
